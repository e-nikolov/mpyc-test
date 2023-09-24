import asyncio
from collections.abc import Iterable
import io
import sys

from .debug import *


class TermWriter(io.StringIO):
    def write(self, text):
        displayRaw(text)

    def writelines(self, __lines: Iterable[str]) -> None:
        for line in __lines:
            display(line)


# TODO add error handling?
sys.stdout = TermWriter()
sys.stderr = TermWriter()
