from os import environ
import os

# pyright: reportMissingImports=false
from polyscript import xworker


def ping():
    # xworker.sync.log("pong")
    # xworker.sync.log("pong2")
    return True


def load_env():
    os.environ.update(get_env())


def get_env() -> dict[str, str]:
    return xworker.sync.getEnv().to_py()


import rich


def __update_environ(envProxy):
    env = envProxy.to_py()
    assert isinstance(env, dict)
    environ.update(env)
    cols = os.environ.get("COLUMNS")
    if cols and rich._console:
        rich._console.width = int(cols)


xworker.sync.ping = ping
xworker.sync.update_environ = __update_environ
