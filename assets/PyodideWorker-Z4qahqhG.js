(function(){"use strict";var o="";console.log("PyodideWorker.ts"),console.error("loading pyodide"),self.onmessage=async e=>{await self.pyodide.runPythonAsync(o),console.log("event"),console.error(e)},self.pyodide.runPython(o)})();
//# sourceMappingURL=PyodideWorker-Z4qahqhG.js.map
