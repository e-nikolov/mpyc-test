from os import environ
import os
import asyncio

# pyright: reportMissingImports=false

import rich

loop = asyncio.get_event_loop()


def ping():
    """
    Returns True to indicate that the worker process is running and responsive.
    """
    return True


def update_environ(env):
    assert isinstance(env, dict)
    if rich._console:  # pylint: disable=protected-access
        environ.update(env)
        cols = os.environ.get("COLUMNS")
        lines = os.environ.get("LINES")

        if cols:
            rich._console.width = int(cols)  # pylint: disable=protected-access
        if lines:
            rich._console.height = int(lines)  # pylint: disable=protected-access