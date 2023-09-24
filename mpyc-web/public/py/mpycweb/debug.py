import logging

from pathlib import Path
import sys
from typing import Optional, TypeVar, Any, Callable, ParamSpec
from numpy import place
from rich import print
from rich.pretty import pprint
import rich
from rich.console import Console
from rich.logging import RichHandler
from rich.text import Text
from functools import wraps
import builtins

builtins.print = print

# pyright: reportMissingImports=false
from polyscript import xworker


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


CRITICAL = logging.CRITICAL
FATAL = logging.FATAL
ERROR = logging.ERROR
WARNING = logging.WARNING
WARN = logging.WARN
NOTSET = logging.NOTSET
INFO = logging.INFO
DEBUG = logging.DEBUG
from datetime import datetime


class LogHandler(RichHandler):
    def render(self, *, record, traceback, message_renderable):
        path = Path(record.pathname).name
        level = self.get_level_text(record)
        time_format = None if self.formatter is None else self.formatter.datefmt
        log_time = datetime.fromtimestamp(record.created)

        log_renderable = self._log_render(
            self.console,
            [message_renderable] if not traceback else [message_renderable, traceback],
            log_time=log_time,
            time_format=time_format,
            level=level,
            path=f"{path}:{record.lineno}:{record.funcName}",
            link_path=f"{record.pathname}#{record.lineno}" if self.enable_link_path else None,
        )
        return log_renderable


def set_log_level(level):
    console = Console(
        color_system="truecolor",
        force_terminal=True,
        tab_size=4,
        soft_wrap=True,
        safe_box=False,
        legacy_windows=False,
        force_interactive=True,
    )
    rich._console = console

    format = "%(message)s"

    h = LogHandler(
        markup=True,
        show_time=True,
        rich_tracebacks=True,
        tracebacks_word_wrap=False,
        tracebacks_show_locals=True,
        omit_repeated_times=False,
    )

    logging.basicConfig(
        force=True,
        format=format,
        # datefmt="%H:%M:%S",
        datefmt="[%X]",
        level=level,
        handlers=[h],
    )


set_log_level(logging.DEBUG)

logger = logging.getLogger(__name__)


K = TypeVar("K")
V = TypeVar("V")

NestedDict = dict[K, V | "NestedDict[K, V]"]

Numeric = int | float

N = TypeVar("N", int, float)


class DeepCounter(NestedDict[K, Numeric]):
    def update(self, iterable: NestedDict[K, Numeric]):
        self._update_recursive(self, iterable)

    def set(self, iterable: NestedDict[K, Numeric]):
        self._set_recursive(self, iterable)

    def _set_recursive(self, target: NestedDict[K, Numeric], source: NestedDict[K, Numeric]):
        for key, value in source.items():
            if key in target:
                target_val = target[key]
                if isinstance(target_val, dict) and isinstance(value, dict):
                    self._set_recursive(target_val, value)
                elif isinstance(target_val, Numeric) and isinstance(value, Numeric):
                    target[key] = value
                else:
                    raise TypeError(f"Cannot set {type(value)} to {type(target[key])} for key {key}")
            else:
                target[key] = value

    def _update_recursive(self, target: NestedDict[K, Numeric], source: NestedDict[K, Numeric]):
        for key, value in source.items():
            if key in target:
                target_val = target[key]
                if isinstance(target_val, dict) and isinstance(value, dict):
                    self._update_recursive(target_val, value)
                elif isinstance(target_val, Numeric) and isinstance(value, Numeric):
                    target[key] = target_val + value
                else:
                    raise TypeError(f"Cannot add {type(value)} and {type(target_val)} for key {key}")
            else:
                target[key] = value


P = ParamSpec("P")
R = TypeVar("R")


class BaseStatsCollector:
    stats = DeepCounter[str]({"$func": {}})
    enabled = logging.root.getEffectiveLevel() <= logging.DEBUG
    # enabled = True

    def dec(
        self, counter_func: Callable[P, NestedDict[str, Numeric]], ff: Callable[[], Callable[[NestedDict[str, Numeric]], None]]
    ) -> Callable[[Callable[P, R]], Callable[P, R]]:
        def decorator(func: Callable[P, R]) -> Callable[P, R]:
            @wraps(func)
            def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
                if self.enabled:
                    d = {"$func": {}} | counter_func(*args, **kwargs)
                    d["$func"] = {func.__name__: d.pop("$func")}
                    ff()(d)
                return func(*args, **kwargs)

            return wrapper

        return decorator

    def set(self, counter_func: Callable[P, NestedDict[str, Numeric]]) -> Callable[[Callable[P, R]], Callable[P, R]]:
        return self.dec(counter_func, lambda: self.stats.set)

    def acc(self, counter_func: Callable[P, NestedDict[str, Numeric]]) -> Callable[[Callable[P, R]], Callable[P, R]]:
        print(f"!! acc enabled: {self.enabled}")
        return self.dec(counter_func, lambda: self.stats.update)

    def reset(self):
        self.stats = DeepCounter[str]({"$func": {}})
        # self.enabled =

    def print_stats(self):
        logger.debug(self.stats)


class StatsCollector(BaseStatsCollector):
    def stat(self, s: NestedDict[str, float]) -> NestedDict[str, float]:
        return s

    def total_calls(self) -> NestedDict[str, float]:
        return {"$func": {"calls": +1}}

    def sent_to(self, pid: int, msg: bytes) -> NestedDict[str, float]:
        return {
            f"total_messages_sent": +1,
            f"messages_sent_to[{pid}]": +1,
            f"total_bytes_sent": +len(msg),
            f"bytes_sent_to[{pid}]": +len(msg),
        }

    def received_from(self, pid: int, msg: bytes) -> NestedDict[str, float]:
        return {
            f"total_messages_received": 1,
            f"messages_received_from[{pid}]": 1,
            f"total_bytes_received": len(msg),
            f"bytes_received_from[{pid}]": len(msg),
        }


stats = StatsCollector()


def display(msg):
    xworker.sync.display(msg)


def displayRaw(msg):
    xworker.sync.displayRaw(msg)


# print(Path.cwd())


def print_tree(path, prefix="", str=""):
    try:
        for item in path.iterdir():
            display(f"{prefix}├── {item.name}")
            if item.is_dir():
                print_tree(item, prefix + "│   ", str)
    except:
        pass


# print_tree(Path("../"))
