import"./modulepreload-polyfill-xwJNGKPl.js";import{b as o,$ as e}from"./browser-L5sDYLvP.js";import"./purify.es-PBAgqAjd.js";console.log(o);let t=e("#canvas"),a=e("#image");e("#image2");let l=e("#copy");e("#target");await(async e=>{a.src=await o.toDataURL(t,e,{errorCorrectionLevel:"H"})})("https://e-nikolov.github.io/mpyc-test/?peer=c814d8ce-f1a9-4767-ae18-fec8fc386180");const i=await new Promise((o=>t.toBlob((e=>o(e)))));console.log("blob",i),l.addEventListener("click",(()=>{console.log("copy button clicked"),document.execCommand("Copy")})),window.addEventListener("copy",(function(o){console.log("intercepting copy--------------------------",o.clipboardData);let e=new File([i],"qr.png",{type:"image/png"});o.clipboardData.items.add(e),console.log("text/plain",o.clipboardData.getData("text/plain")),console.log("text/html",o.clipboardData.getData("text/html")),console.log("image/png",o.clipboardData.getData("image/png")),console.log("f1",e),console.log("size 1",e.size),console.log("files",o.clipboardData.files),console.log("items",o.clipboardData.items),console.log("kind",o.clipboardData.items[0].kind),console.log("type",o.clipboardData.items[0].type),console.log(o.clipboardData.setData),o.preventDefault()})),document.addEventListener("paste",(function(o){console.log("intercepting paste--------------------------",o.clipboardData),console.log("image/png",o.clipboardData.getData("image/png")),console.log("text/plain",o.clipboardData.getData("text/plain")),console.log("text/html",o.clipboardData.getData("text/html")),console.log("items[0]",o.clipboardData.items[0]),console.log("type",o.clipboardData.items[0].type),console.log("kind",o.clipboardData.items[0].kind);let e=o.clipboardData.items[0].getAsFile();console.log("f2",e),console.log("size 2",e.size),console.log("paste",o.clipboardData)}));
//# sourceMappingURL=index-VsHOfpuA.js.map
