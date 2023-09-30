import asyncio
import logging
import types
import ast
from typing import Any
from mpyc.runtime import Party, mpc

# pyright: reportMissingImports=false
from polyscript import xworker

from .stats import stats

logger = logging.getLogger(__name__)


def run_mpc(options):
    logger.debug("starting mpyc execution...")
    # TODO automatically set the no_async based on the number of parties
    m = len(options.parties)
    mpc.options.threshold = (m - 1) // 2
    mpc.options.no_async = m == 1 and options.no_async
    stats.reset()
    assert 2 * mpc.options.threshold < m, f"threshold {mpc.options.threshold} too large for {m} parties"

    parties = []
    for pid, peerID in enumerate(options.parties):
        parties.append(Party(pid, peerID))
    mpc.options.parties = parties

    # reinitialize the mpyc runtime with the new parties
    mpc.__init__(options.pid, parties, mpc.options)

    exec(options.exec)
    print("mpc done")


def exec(source: str):
    code = compile(source, "_mpc_run_compiled.py", "exec", ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    func = types.FunctionType(code, globals() | {__name__: "__main__"})
    return func()


async def exec_async(source: str):
    source = "__name__ = '__main__'\n" + source + "\n"
    code = compile(source, "_mpc_run_compiled.py", "exec", ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    func = types.FunctionType(code, globals())
    if asyncio.iscoroutinefunction(func):
        return await func()
    else:
        return func()


xworker.sync.run_mpc = run_mpc


xworker.sync.print_stats = stats.print_stats
