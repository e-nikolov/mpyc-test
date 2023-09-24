import json
from asyncio import AbstractEventLoop, Future, Protocol, Transport
import logging
from typing import Any, Callable

logging = logging.getLogger("peerjs.py")

from mpyc import asyncoro
from mpyc.runtime import mpc, Party, Runtime
from .debug import *
from . import worker
from .transport import PeerJSTransport, AbstractClient
from pyodide.ffi import JsProxy


class Client(AbstractClient):
    def __init__(self, worker: Any):
        self.worker = worker

        self.worker.on_ready_message = self.on_ready_message
        self.worker.on_runtime_message = self.on_runtime_message

        self.stats_messages_sent = 0
        self.stats_messages_received = 0
        self.stats_messages_sent_to = {}
        self.stats_messages_received_from = {}

        self.transports = {}

    async def create_connection(
        self, protocol_factory: Callable[[], asyncoro.MessageExchanger], loop: AbstractEventLoop, pid: int, listener: bool
    ) -> tuple[Transport, Protocol]:
        p = protocol_factory()
        t = PeerJSTransport(loop, pid, self, p, listener)
        self.transports[pid] = t
        return t, p

    @stats.acc(lambda self, pid, message: stats.total_calls() | stats.sent_to(pid, message))
    def send_ready_message(self, pid: int, message: str):
        self.worker.sendReadyMessage(pid, message)

    @stats.acc(lambda self, pid, message: stats.total_calls() | stats.received_from(pid, message))
    def on_ready_message(self, pid: int, message: str):
        self.transports[pid].on_ready_message(message)

    @stats.acc(lambda self, pid, message: stats.total_calls() | stats.sent_to(pid, message))
    def send_runtime_message(self, pid: int, message: bytes):
        # logging.debug(f"sending {message} to {pid}")
        self.worker.sendRuntimeMessage(pid, message)

    @stats.acc(lambda self, pid, message: stats.total_calls() | stats.received_from(pid, message.to_py()))
    def on_runtime_message(self, pid: int, message: JsProxy):
        # logging.debug(f"received {runtime_message} from {pid}")
        self.transports[pid].on_runtime_message(message.to_py())
