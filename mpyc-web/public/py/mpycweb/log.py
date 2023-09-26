import io
import datetime
from os import environ
from pathlib import Path
from collections.abc import Iterable
import sys

from rich.console import Console
from rich.logging import RichHandler

import logging

# pyright: reportMissingImports=false
from polyscript import xworker


CRITICAL = logging.CRITICAL
FATAL = logging.FATAL
ERROR = logging.ERROR
WARNING = logging.WARNING
WARN = logging.WARN
NOTSET = logging.NOTSET
INFO = logging.INFO
DEBUG = logging.DEBUG


console = Console(
    color_system="truecolor",
    force_terminal=True,
    tab_size=4,
    soft_wrap=True,
    safe_box=False,
    legacy_windows=False,
    force_interactive=True,
)


from .stats import stats


def set_log_level(level):
    opts: dict = dict(
        force=True,
        format="%(message)s",
        datefmt="[%X]",
        level=level,
        handlers=[
            Handler(
                markup=True,
                show_time=True,
                rich_tracebacks=True,
                tracebacks_word_wrap=False,
                tracebacks_show_locals=True,
                omit_repeated_times=False,
            )
        ],
    )

    logging.basicConfig(**opts)

    sys.argv = ["", "--log-level", logging.getLevelName(level)]
    stats.reset()


class Handler(RichHandler):
    def render(self, *, record, traceback, message_renderable):
        path = Path(record.pathname).name
        level = self.get_level_text(record)
        time_format = None if self.formatter is None else self.formatter.datefmt
        log_time = datetime.datetime.fromtimestamp(record.created)

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


def display(msg):
    xworker.sync.display(msg)


def print_tree(path, prefix="", str=""):
    try:
        for item in path.iterdir():
            display(f"{prefix}├── {item.name}\n")
            if item.is_dir():
                print_tree(item, prefix + "│   ", str)
    except:
        pass


class TermWriter(io.StringIO):
    def write(self, text):
        display(text)

    def writelines(self, __lines: Iterable[str]) -> None:
        for line in __lines:
            display(f"{line}\n")
