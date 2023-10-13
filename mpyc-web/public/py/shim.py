"""
    Shim for the PyScript port of MPyC.
"""

# pyright: reportMissingImports=false
import asyncio
import sys
import logging
import pyodide

from mpycweb import *

# pyright: reportMissingImports=false

from polyscript import xworker  # pylint: disable=import-error


# logging.debug(f"PyScript {pyscript.version =}")
# logging.debug(f"Polyscript {polyscript.version =}")
logging.debug(f"Python {sys.version=}")
logging.debug(f"Pyodide {pyodide.__version__ =}")

asyncio.get_event_loop().call_soon(xworker.sync.onWorkerReady)
