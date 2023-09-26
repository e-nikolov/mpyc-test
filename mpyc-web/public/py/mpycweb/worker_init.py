from os import environ
import os

# pyright: reportMissingImports=false
from polyscript import xworker


def ping():
    xworker.sync.log("pong")
    return True


def load_env():
    os.environ.update(get_env())


def get_env() -> dict[str, str]:
    e = xworker.sync.getEnv().to_py()
    if "COLUMNS" in e and isinstance(e["COLUMNS"], int):
        e["COLUMNS"] = str(e["COLUMNS"])
        print(f"get_env: COLUMNS is int, converting to str")
        xworker.sync.logWarn(f"get_env: COLUMNS is int, converting to str")
    return e
    # return xworker.sync.getEnv().to_py()


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
