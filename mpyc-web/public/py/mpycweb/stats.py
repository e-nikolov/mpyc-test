"""
This module provides a `StatsCollector` class that can be used to collect and print statistics about various events
in the program. The `StatsCollector` class is a subclass of `BaseStatsCollector`, which provides the core functionality
for collecting and updating statistics.

The `StatsCollector` class defines several methods that can be used to collect statistics for different types of events,
such as `total_calls`, `sent_to`, and `received_from`. These methods return dictionaries that can be passed to the
`update` method of a `DeepCounter` object to update the statistics.

The `DeepCounter` class is a subclass of `dict` that provides a way to update nested dictionaries with numeric values.
It defines the `update` and `set` methods, which can be used to update or set the values of nested dictionaries.

The `BaseStatsCollector` class defines a decorator `dec` that can be used to decorate functions and collect statistics
about their calls. The `acc` method of `BaseStatsCollector` returns a decorator that can be used to collect statistics
about the arguments passed to a function.

The `__init__` function at the end of the module initializes a global `stats` object of type `StatsCollector`.
"""

import logging

from typing import TypeVar, Callable, ParamSpec
from functools import wraps


# pyright: reportMissingImports=false
logger = logging.getLogger(__name__)

K = TypeVar("K")
V = TypeVar("V")

NestedDict = dict[K, V | "NestedDict[K, V]"]

Numeric = int | float

N = TypeVar("N", int, float)


class DeepCounter(NestedDict[K, Numeric]):
    """A nested dictionary that stores numeric values and supports recursive updates.

    This class extends the `NestedDict` class and adds two methods for updating its values:
    `set` and `update`. Both methods take a nested dictionary as input and update the values
    in the `DeepCounter` instance recursively, i.e., for each key in the input dictionary,
    the corresponding value is either added to the current value (for `update`) or replaced
    by the input value (for `set`).

    The `DeepCounter` class is parameterized by two type variables: `K` and `Numeric`.
    `K` represents the type of the keys in the nested dictionary, while `Numeric` represents
    the type of the numeric values that can be stored in the dictionary.

    Example usage:
    ```
    >>> counter = DeepCounter[int, float]()
    >>> counter.set({1: {2: 3.0}})
    >>> counter.update({1: {2: 1.5}})
    >>> counter
    {1: {2: 4.5}}
    ```
    """

    def update(self, iterable: NestedDict[K, Numeric]):
        self._update_recursive(self, iterable)

    def set(self, iterable: NestedDict[K, Numeric]):
        """
        Recursively sets the values of the nested dictionary to the values of the given iterable.

        Args:
            iterable (NestedDict[K, Numeric]): A nested dictionary containing the values to set.
        """
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
    """
    A base class for collecting statistics.

    Attributes:
        stats (DeepCounter[str]): A counter object for storing the statistics.
        enabled (bool): A flag indicating whether the statistics collection is enabled.
    """

    stats = DeepCounter[str]({})
    enabled = logging.root.getEffectiveLevel() <= logging.DEBUG

    def dec(
        self, counter_func: Callable[P, NestedDict[str, Numeric]], ff: Callable[[], Callable[[NestedDict[str, Numeric]], None]]
    ) -> Callable[[Callable[P, R]], Callable[P, R]]:
        """
        A decorator function for collecting statistics.

        Args:
            counter_func (Callable[P, NestedDict[str, Numeric]]): A function that returns a dictionary of statistics.
            ff (Callable[[], Callable[[NestedDict[str, Numeric]], None]]): A function that returns a function for updating the statistics.

        Returns:
            Callable[[Callable[P, R]], Callable[P, R]]: A decorated function that collects statistics.
        """

        def decorator(func: Callable[P, R]) -> Callable[P, R]:
            @wraps(func)
            def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
                if self.enabled:
                    d = counter_func(*args, **kwargs)
                    if "$func" in d:
                        d["$func"] = {func.__name__: d.pop("$func")}
                    ff()(d)
                return func(*args, **kwargs)

            return wrapper

        return decorator

    def set(self, counter_func: Callable[P, NestedDict[str, Numeric]]) -> Callable[[Callable[P, R]], Callable[P, R]]:
        """
        Sets the counter function for the statistics module.

        Args:
            counter_func: A callable function that takes a parameter of type P and returns a nested dictionary of string keys and numeric values.

        Returns:
            A callable function that takes a parameter of type R and returns a callable function that takes a parameter of type P and returns a value of type R.
        """
        return self.dec(counter_func, lambda: self.stats.set)

    def acc(self, counter_func: Callable[P, NestedDict[str, Numeric]]) -> Callable[[Callable[P, R]], Callable[P, R]]:
        """
        A decorator function for accumulating statistics.

        Args:
            counter_func (Callable[P, NestedDict[str, Numeric]]): A function that returns a dictionary of statistics.

        Returns:
            Callable[[Callable[P, R]], Callable[P, R]]: A decorated function that accumulates statistics.
        """
        return self.dec(counter_func, lambda: self.stats.update)

    def reset(self):
        """
        Resets the statistics counter and enables statistics collection.
        """
        self.stats = DeepCounter[str]()
        self.enabled = logging.root.getEffectiveLevel() <= logging.DEBUG

    def print_stats(self):
        """
        Prints the collected statistics.
        """
        if self.enabled:
            print(self.stats)


class StatsCollector(BaseStatsCollector):
    """
    A class for collecting statistics on messages sent and received by MPC parties.

    Attributes:
        None

    Methods:
        stat(s: NestedDict[str, float]) -> NestedDict[str, float]: Returns the input dictionary unchanged.
        total_calls() -> NestedDict[str, float]: Returns a dictionary with a single key-value pair indicating a function call was made.
        sent_to(pid: int, msg: bytes) -> NestedDict[str, float]: Returns a dictionary with statistics on a message sent to a specific MPC party.
        received_from(pid: int, msg: bytes) -> NestedDict[str, float]: Returns a dictionary with statistics on a message received from a specific MPC party.
    """

    def stat(self, s: NestedDict[str, float]) -> NestedDict[str, float]:
        """
        Compute statistics on the input dictionary.

        Args:
            s (NestedDict[str, float]): A nested dictionary of float values.

        Returns:
            NestedDict[str, float]: A nested dictionary of statistics computed on the input dictionary.
        """
        return s

    def total_calls(self) -> NestedDict[str, float]:
        """
        Returns a dictionary with a single key-value pair, where the key is "$func" and the value is another dictionary
        with a single key-value pair, where the key is "calls" and the value is +1. This method is used to track the total
        number of calls to a function.
        """
        return {"$func": {"calls": +1}}

    def sent_to(self, pid: int, msg: bytes) -> NestedDict[str, float]:
        """
        Updates the statistics for a message sent to a specific peer.

        Args:
            pid (int): The ID of the peer the message was sent to.
            msg (bytes): The message that was sent.

        Returns:
            A dictionary containing the updated statistics.
        """
        return {
            "total_messages_sent": +1,
            f"messages_sent_to[{pid}]": +1,
            "total_bytes_sent": +len(msg),
            f"bytes_sent_to[{pid}]": +len(msg),
        }

    def received_from(self, pid: int, msg: bytes) -> NestedDict[str, float]:
        """
        Records statistics for a message received from a given party.

        Args:
            pid (int): The ID of the party that sent the message.
            msg (bytes): The message that was received.

        Returns:
            A dictionary containing the following statistics:
            - total_messages_received: The total number of messages received.
            - messages_received_from[pid]: The number of messages received from the given party.
            - total_bytes_received: The total number of bytes received.
            - bytes_received_from[pid]: The number of bytes received from the given party.
        """
        return {
            "total_messages_received": +1,
            f"messages_received_from[{pid}]": +1,
            "total_bytes_received": +len(msg),
            f"bytes_received_from[{pid}]": +len(msg),
        }


stats = StatsCollector()
