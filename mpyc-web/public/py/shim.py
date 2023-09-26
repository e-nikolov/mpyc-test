# pyright: reportMissingImports=false
import mpycweb.redirect_stdout

from mpycweb.debug import *

# from mpyc.runtime import mpc
from mpycweb import *

# TODO refactor to fire an event instead of printing
# logging.info("PyScript runtime started.")
xworker.sync.onWorkerReady()
