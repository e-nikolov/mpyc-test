from os import environ
from .worker_init import *

worker_init.load_env()

from .log import *

import sys

sys.stdout = TermWriter()
sys.stderr = TermWriter()


# pyright: reportMissingImports=false
from polyscript import xworker

rich._console = log.console
import builtins

builtins.print = rich.print
import pprint


import rich.pretty

pprint.pprint = rich.pretty.pprint

set_log_level(DEBUG)

from .transport import *
from .worker import *
from .patches import *


from .worker import *

# # from . import peerjs

# from mpyc.runtime import mpc, Runtime

# # pyright: reportMissingImports=false
# from polyscript import xworker


__all__ = [
    "log",
    "stats",
    "patches",
    "transport",
    "worker",
    "set_log_level",
    "NOTSET",
    "DEBUG",
    "INFO",
    "WARNING",
    "ERROR",
    "CRITICAL",
]
