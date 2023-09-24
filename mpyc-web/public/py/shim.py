# pyright: reportMissingImports=false
import mpycweb.redirect_stdout

# import logging_setup
from mpycweb.debug import *

# from mpyc.runtime import mpc
import mpycweb


# TODO refactor to fire an event instead of printing
# logging.info("PyScript runtime started.")
xworker.sync.onWorkerReady()
