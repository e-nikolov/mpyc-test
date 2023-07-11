const e=(e,t=document)=>[...t.querySelectorAll(e)],t=(e,t=document)=>{const r=(new XPathEvaluator).createExpression(e).evaluate(t,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE),n=[];for(let e=0,{snapshotLength:t}=r;e<t;e++)n.push(r.snapshotItem(e));return n},r="object"==typeof self?self:globalThis,n=e=>((e,t)=>{const n=(t,r)=>(e.set(r,t),t),s=o=>{if(e.has(o))return e.get(o);const[a,i]=t[o];switch(a){case 0:case-1:return n(i,o);case 1:{const e=n([],o);for(const t of i)e.push(s(t));return e}case 2:{const e=n({},o);for(const[t,r]of i)e[s(t)]=s(r);return e}case 3:return n(new Date(i),o);case 4:{const{source:e,flags:t}=i;return n(new RegExp(e,t),o)}case 5:{const e=n(new Map,o);for(const[t,r]of i)e.set(s(t),s(r));return e}case 6:{const e=n(new Set,o);for(const t of i)e.add(s(t));return e}case 7:{const{name:e,message:t}=i;return n(new r[e](t),o)}case 8:return n(BigInt(i),o);case"BigInt":return n(Object(BigInt(i)),o)}return n(new r[a](i),o)};return s})(new Map,e)(0),s="",{toString:o}={},{keys:a}=Object,i=e=>{const t=typeof e;if("object"!==t||!e)return[0,t];const r=o.call(e).slice(8,-1);switch(r){case"Array":return[1,s];case"Object":return[2,s];case"Date":return[3,s];case"RegExp":return[4,s];case"Map":return[5,s];case"Set":return[6,s]}return r.includes("Array")?[1,r]:r.includes("Error")?[7,r]:[2,r]},c=([e,t])=>0===e&&("function"===t||"symbol"===t),l=(e,{json:t,lossy:r}={})=>{const n=[];return((e,t,r,n)=>{const s=(e,t)=>{const s=n.push(e)-1;return r.set(t,s),s},o=n=>{if(r.has(n))return r.get(n);let[l,u]=i(n);switch(l){case 0:{let t=n;switch(u){case"bigint":l=8,t=n.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+u);t=null;break;case"undefined":return s([-1],n)}return s([l,t],n)}case 1:{if(u)return s([u,[...n]],n);const e=[],t=s([l,e],n);for(const t of n)e.push(o(t));return t}case 2:{if(u)switch(u){case"BigInt":return s([u,n.toString()],n);case"Boolean":case"Number":case"String":return s([u,n.valueOf()],n)}if(t&&"toJSON"in n)return o(n.toJSON());const r=[],f=s([l,r],n);for(const t of a(n))!e&&c(i(n[t]))||r.push([o(t),o(n[t])]);return f}case 3:return s([l,n.toISOString()],n);case 4:{const{source:e,flags:t}=n;return s([l,{source:e,flags:t}],n)}case 5:{const t=[],r=s([l,t],n);for(const[r,s]of n)(e||!c(i(r))&&!c(i(s)))&&t.push([o(r),o(s)]);return r}case 6:{const t=[],r=s([l,t],n);for(const r of n)!e&&c(i(r))||t.push(o(r));return r}}const{message:f}=n;return s([l,{name:u,message:f}],n)};return o})(!(t||r),!!t,new Map,n)(e),n},{parse:u,stringify:f}=JSON,p={json:!0,lossy:!0};var d=Object.freeze({__proto__:null,parse:e=>n(u(e)),stringify:e=>f(l(e,p))}),h="2f6fe6d4-8ba8-424a-83c5-8fadca1ea103",w=e=>({value:new Promise((t=>{let r=new Worker("data:application/javascript,"+encodeURIComponent("onmessage=({data:b})=>(Atomics.wait(b,0),postMessage(0))"));r.onmessage=t,r.postMessage(e)}))})
/*! (c) Andrea Giammarchi - ISC */;const{Int32Array:g,Map:y,SharedArrayBuffer:m,Uint16Array:b}=globalThis,{BYTES_PER_ELEMENT:v}=g,{BYTES_PER_ELEMENT:M}=b,{isArray:S}=Array,{notify:A,wait:P,waitAsync:E}=Atomics,{fromCharCode:k}=String,$=(e,t)=>e?(E||w)(t,0):(P(t,0),{value:{then:e=>e()}}),j=new WeakSet,x=new WeakMap;let _=0;const T=(e,{parse:t,stringify:r}=JSON)=>{if(!x.has(e)){const n=(t,...r)=>e.postMessage({[h]:r},{transfer:t});x.set(e,new Proxy(new y,{has:(e,t)=>"string"==typeof t&&!t.startsWith("_"),get:(r,s)=>"then"===s?null:(...r)=>{const o=_++;let a=new g(new m(v)),i=[];j.has(r.at(-1)||i)&&j.delete(i=r.pop()),n(i,o,a,s,r);const c=e instanceof Worker;return $(c,a).value.then((()=>{const e=a[0];if(!e)return;const r=M*e;return a=new g(new m(r+r%v)),n([],o,a),$(c,a).value.then((()=>t(k(...new b(a.buffer).slice(0,e)))))}))},set(t,n,s){if(!t.size){const n=new y;e.addEventListener("message",(async e=>{const s=e.data?.[h];if(S(s)){e.stopImmediatePropagation();const[o,a,...i]=s;if(i.length){const[e,s]=i;if(!t.has(e))throw new Error(`Unsupported action: ${e}`);{const i=r(await t.get(e)(...s));i&&(n.set(o,i),a[0]=i.length)}}else{const e=n.get(o);n.delete(o);for(let t=new b(a.buffer),r=0;r<e.length;r++)t[r]=e.charCodeAt(r)}A(a,0)}}))}return!!t.set(n,s)}}))}return x.get(e)};T.transfer=(...e)=>(j.add(e),e);const W="object",R="function",O="number",F="string",G="undefined",B="symbol",{defineProperty:I,getOwnPropertyDescriptor:L,getPrototypeOf:J,isExtensible:H,ownKeys:D,preventExtensions:N,set:U,setPrototypeOf:C}=Reflect,z=J(Int8Array),X=(e,t)=>{const{get:r,set:n,value:s}=e;return r&&(e.get=t(r)),n&&(e.set=t(n)),s&&(e.value=t(s)),e},q=(e,t)=>[e,t],V=e=>t=>{const r=typeof t;switch(r){case W:if(null==t)return q("null",t);case R:return e(r,t);case"boolean":case O:case F:case G:case"bigint":return q(r,t);case B:if(Y.has(t))return q(r,Y.get(t))}throw new Error(`Unable to handle this ${r} type`)},Y=new Map(D(Symbol).filter((e=>typeof Symbol[e]===B)).map((e=>[Symbol[e],e]))),K=e=>{for(const[t,r]of Y)if(r===e)return t},Q="apply",Z="construct",ee="defineProperty",te="deleteProperty",re="get",ne="getOwnPropertyDescriptor",se="getPrototypeOf",oe="has",ae="isExtensible",ie="ownKeys",ce="preventExtensions",le="set",ue="setPrototypeOf",fe="delete";let pe=0;const de=new Map,he=new Map,we=new WeakMap;if(globalThis.window===globalThis){const{addEventListener:e}=EventTarget.prototype;I(EventTarget.prototype,"addEventListener",{value(t,r,...n){return n.at(0)?.invoke&&(we.has(this)||we.set(this,new Map),we.get(this).set(t,[].concat(n[0].invoke)),delete n[0].invoke),e.call(this,t,r,...n)}})}const ge=V(((e,t)=>{if(!de.has(t)){let e;for(;he.has(e=pe++););de.set(t,e),he.set(e,t)}return q(e,de.get(t))}));var ye=(e,t,r)=>{const{[r]:n}=e,s=new FinalizationRegistry((e=>{n(fe,q(F,e))})),o=([e,t])=>{switch(e){case W:if(null==t)return globalThis;if(typeof t===O)return he.get(t);if(!(t instanceof z))for(const e in t)t[e]=o(t[e]);return t;case R:if(typeof t===F){if(!he.has(t)){const e=function(...e){return e.at(0)instanceof Event&&(e=>{const{currentTarget:t,target:r,type:n}=e;for(const s of we.get(t||r)?.get(n)||[])e[s]()})(...e),n(Q,q(R,t),ge(this),e.map(ge))},r=new WeakRef(e);he.set(t,r),s.register(e,t,r)}return he.get(t).deref()}return he.get(t);case B:return K(t)}return t},a={[Q]:(e,t,r)=>ge(e.apply(t,r)),[Z]:(e,t)=>ge(new e(...t)),[ee]:(e,t,r)=>ge(I(e,t,r)),[te]:(e,t)=>ge(delete e[t]),[se]:e=>ge(J(e)),[re]:(e,t)=>ge(e[t]),[ne]:(e,t)=>{const r=L(e,t);return r?q(W,X(r,ge)):q(G,r)},[oe]:(e,t)=>ge(t in e),[ae]:e=>ge(H(e)),[ie]:e=>q(W,D(e).map(ge)),[ce]:e=>ge(N(e)),[le]:(e,t,r)=>ge(U(e,t,r)),[ue]:(e,t)=>ge(C(e,t)),[fe](e){de.delete(he.get(e)),he.delete(e)}};return e[t]=(e,t,...r)=>{switch(e){case Q:r[0]=o(r[0]),r[1]=r[1].map(o);break;case Z:r[0]=r[0].map(o);break;case ee:{const[e,t]=r;r[0]=o(e);const{get:n,set:s,value:a}=t;n&&(t.get=o(n)),s&&(t.set=o(s)),a&&(t.value=o(a));break}default:r=r.map(o)}return a[e](o(t),...r)},{proxy:e,window:globalThis,isWindowProxy:()=>!1}};let me=0;const be=new Map,ve=new Map,Me=Symbol(),Se=e=>typeof e===R?e():e,Ae=e=>typeof e===W&&!!e&&Me in e,Pe="isArray",Ee=Array[Pe],ke=V(((e,t)=>{if(Me in t)return Se(t[Me]);if(e===R){if(!ve.has(t)){let e;for(;ve.has(e=String(me++)););be.set(t,e),ve.set(e,t)}return q(e,be.get(t))}if(!(t instanceof z))for(const e in t)t[e]=ke(t[e]);return q(e,t)}));var $e=(e,t,r)=>{const{[t]:n}=e,s=new Map,o=new FinalizationRegistry((e=>{s.delete(e),n(fe,ke(e))})),a=e=>{const[t,r]=e;if(!s.has(r)){const n=t===R?je.bind(e):e,a=new Proxy(n,l),i=new WeakRef(a);s.set(r,i),o.register(a,r,i)}return s.get(r).deref()},i=e=>{const[t,r]=e;switch(t){case W:return typeof r===O?a(e):r;case R:return typeof r===F?ve.get(r):a(e);case B:return K(r)}return r},c=(e,t,...r)=>i(n(e,Se(t),...r)),l={[Q]:(e,t,r)=>c(Q,e,ke(t),r.map(ke)),[Z]:(e,t)=>c(Z,e,t.map(ke)),[ee]:(e,t,r)=>{const{get:n,set:s,value:o}=r;return typeof n===R&&(r.get=ke(n)),typeof s===R&&(r.set=ke(s)),typeof o===R&&(r.value=ke(o)),c(ee,e,ke(t),r)},[te]:(e,t)=>c(te,e,ke(t)),[se]:e=>c(se,e),[re]:(e,t)=>t===Me?e:c(re,e,ke(t)),[ne]:(e,t)=>{const r=c(ne,e,ke(t));return r&&X(r,i)},[oe]:(e,t)=>t===Me||c(oe,e,ke(t)),[ae]:e=>c(ae,e),[ie]:e=>c(ie,e).map(i),[ce]:e=>c(ce,e),[le]:(e,t,r)=>c(le,e,ke(t),ke(r)),[ue]:(e,t)=>c(ue,e,ke(t))};e[r]=(e,t,r,n)=>{switch(e){case Q:return i(t).apply(i(r),n.map(i));case fe:{const e=i(t);be.delete(ve.get(e)),ve.delete(e)}}};const u=new Proxy([W,null],l),f=u.Array[Pe];return I(Array,Pe,{value:e=>Ae(e)?f(e):Ee(e)}),{window:u,isWindowProxy:Ae,proxy:e,get global(){return console.warn("Deprecated: please access `window` field instead"),this.window},get isGlobal(){return function(e){return console.warn("Deprecated: please access `isWindowProxy` field instead"),this.isWindowProxy(e)}.bind(this)}}};function je(){return this}const xe=h+"M",_e=h+"T",Te=new WeakMap,We=(e,...t)=>{const r=T(e,...t);if(!Te.has(r)){const t=e instanceof Worker?ye:$e;Te.set(r,t(r,xe,_e))}return Te.get(r)};We.transfer=T.transfer;const{isArray:Re}=Array,{assign:Oe,create:Fe,defineProperties:Ge,defineProperty:Be,entries:Ie}=Object,{all:Le,resolve:Je}=new Proxy(Promise,{get:(e,t)=>e[t].bind(e)}),He=(e,t=location.href)=>new URL(e,t).href,De=e=>e.arrayBuffer(),Ne=e=>e.json(),Ue=e=>e.text(),Ce=[["beforeRun","codeBeforeRunWorker"],["beforeRunAsync","codeBeforeRunWorkerAsync"],["afterRun","codeAfterRunWorker"],["afterRunAsync","codeAfterRunWorkerAsync"]];class ze{constructor(e,t){this.interpreter=e,this.onWorkerReady=t.onWorkerReady;for(const[e,r]of Ce)this[e]=t[r]?.()}get stringHooks(){const e={};for(const[t]of Ce)this[t]&&(e[t]=this[t]);return e}}var Xe=(...e)=>function(t,r){const n=new Worker(URL.createObjectURL(new Blob(['const e="object"==typeof self?self:globalThis,t=t=>((t,r)=>{const n=(e,r)=>(t.set(r,e),e),s=o=>{if(t.has(o))return t.get(o);const[a,i]=r[o];switch(a){case 0:case-1:return n(i,o);case 1:{const e=n([],o);for(const t of i)e.push(s(t));return e}case 2:{const e=n({},o);for(const[t,r]of i)e[s(t)]=s(r);return e}case 3:return n(new Date(i),o);case 4:{const{source:e,flags:t}=i;return n(new RegExp(e,t),o)}case 5:{const e=n(new Map,o);for(const[t,r]of i)e.set(s(t),s(r));return e}case 6:{const e=n(new Set,o);for(const t of i)e.add(s(t));return e}case 7:{const{name:t,message:r}=i;return n(new e[t](r),o)}case 8:return n(BigInt(i),o);case"BigInt":return n(Object(BigInt(i)),o)}return n(new e[a](i),o)};return s})(new Map,t)(0),r="",{toString:n}={},{keys:s}=Object,o=e=>{const t=typeof e;if("object"!==t||!e)return[0,t];const s=n.call(e).slice(8,-1);switch(s){case"Array":return[1,r];case"Object":return[2,r];case"Date":return[3,r];case"RegExp":return[4,r];case"Map":return[5,r];case"Set":return[6,r]}return s.includes("Array")?[1,s]:s.includes("Error")?[7,s]:[2,s]},a=([e,t])=>0===e&&("function"===t||"symbol"===t),i=(e,{json:t,lossy:r}={})=>{const n=[];return((e,t,r,n)=>{const i=(e,t)=>{const s=n.push(e)-1;return r.set(t,s),s},c=n=>{if(r.has(n))return r.get(n);let[l,u]=o(n);switch(l){case 0:{let t=n;switch(u){case"bigint":l=8,t=n.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+u);t=null;break;case"undefined":return i([-1],n)}return i([l,t],n)}case 1:{if(u)return i([u,[...n]],n);const e=[],t=i([l,e],n);for(const t of n)e.push(c(t));return t}case 2:{if(u)switch(u){case"BigInt":return i([u,n.toString()],n);case"Boolean":case"Number":case"String":return i([u,n.valueOf()],n)}if(t&&"toJSON"in n)return c(n.toJSON());const r=[],f=i([l,r],n);for(const t of s(n))!e&&a(o(n[t]))||r.push([c(t),c(n[t])]);return f}case 3:return i([l,n.toISOString()],n);case 4:{const{source:e,flags:t}=n;return i([l,{source:e,flags:t}],n)}case 5:{const t=[],r=i([l,t],n);for(const[r,s]of n)(e||!a(o(r))&&!a(o(s)))&&t.push([c(r),c(s)]);return r}case 6:{const t=[],r=i([l,t],n);for(const r of n)!e&&a(o(r))||t.push(c(r));return r}}const{message:f}=n;return i([l,{name:u,message:f}],n)};return c})(!(t||r),!!t,new Map,n)(e),n},{parse:c,stringify:l}=JSON,u={json:!0,lossy:!0};var f=Object.freeze({__proto__:null,parse:e=>t(c(e)),stringify:e=>l(i(e,u))}),p="2f6fe6d4-8ba8-424a-83c5-8fadca1ea103",d=e=>({value:new Promise((t=>{let r=new Worker("data:application/javascript,"+encodeURIComponent("onmessage=({data:b})=>(Atomics.wait(b,0),postMessage(0))"));r.onmessage=t,r.postMessage(e)}))})\n/*! (c) Andrea Giammarchi - ISC */;const{Int32Array:w,Map:g,SharedArrayBuffer:y,Uint16Array:h}=globalThis,{BYTES_PER_ELEMENT:m}=w,{BYTES_PER_ELEMENT:b}=h,{isArray:v}=Array,{notify:S,wait:P,waitAsync:A}=Atomics,{fromCharCode:M}=String,E=(e,t)=>e?(A||d)(t,0):(P(t,0),{value:{then:e=>e()}}),_=new WeakSet,j=new WeakMap;let k=0;const x=(e,{parse:t,stringify:r}=JSON)=>{if(!j.has(e)){const n=(t,...r)=>e.postMessage({[p]:r},{transfer:t});j.set(e,new Proxy(new g,{has:(e,t)=>"string"==typeof t&&!t.startsWith("_"),get:(r,s)=>"then"===s?null:(...r)=>{const o=k++;let a=new w(new y(m)),i=[];_.has(r.at(-1)||i)&&_.delete(i=r.pop()),n(i,o,a,s,r);const c=e instanceof Worker;return E(c,a).value.then((()=>{const e=a[0];if(!e)return;const r=b*e;return a=new w(new y(r+r%m)),n([],o,a),E(c,a).value.then((()=>t(M(...new h(a.buffer).slice(0,e)))))}))},set(t,n,s){if(!t.size){const n=new g;e.addEventListener("message",(async e=>{const s=e.data?.[p];if(v(s)){e.stopImmediatePropagation();const[o,a,...i]=s;if(i.length){const[e,s]=i;if(!t.has(e))throw new Error(`Unsupported action: ${e}`);{const i=r(await t.get(e)(...s));i&&(n.set(o,i),a[0]=i.length)}}else{const e=n.get(o);n.delete(o);for(let t=new h(a.buffer),r=0;r<e.length;r++)t[r]=e.charCodeAt(r)}S(a,0)}}))}return!!t.set(n,s)}}))}return j.get(e)};x.transfer=(...e)=>(_.add(e),e);const $="object",T="function",O="number",W="string",F="undefined",R="symbol",{defineProperty:G,getOwnPropertyDescriptor:B,getPrototypeOf:J,isExtensible:I,ownKeys:L,preventExtensions:U,set:N,setPrototypeOf:D}=Reflect,z=J(Int8Array),C=(e,t)=>{const{get:r,set:n,value:s}=e;return r&&(e.get=t(r)),n&&(e.set=t(n)),s&&(e.value=t(s)),e},H=(e,t)=>[e,t],q=e=>t=>{const r=typeof t;switch(r){case $:if(null==t)return H("null",t);case T:return e(r,t);case"boolean":case O:case W:case F:case"bigint":return H(r,t);case R:if(K.has(t))return H(r,K.get(t))}throw new Error(`Unable to handle this ${r} type`)},K=new Map(L(Symbol).filter((e=>typeof Symbol[e]===R)).map((e=>[Symbol[e],e]))),Y=e=>{for(const[t,r]of K)if(r===e)return t},V="apply",Q="construct",X="defineProperty",Z="deleteProperty",ee="get",te="getOwnPropertyDescriptor",re="getPrototypeOf",ne="has",se="isExtensible",oe="ownKeys",ae="preventExtensions",ie="set",ce="setPrototypeOf",le="delete";let ue=0;const fe=new Map,pe=new Map,de=new WeakMap;if(globalThis.window===globalThis){const{addEventListener:e}=EventTarget.prototype;G(EventTarget.prototype,"addEventListener",{value(t,r,...n){return n.at(0)?.invoke&&(de.has(this)||de.set(this,new Map),de.get(this).set(t,[].concat(n[0].invoke)),delete n[0].invoke),e.call(this,t,r,...n)}})}const we=q(((e,t)=>{if(!fe.has(t)){let e;for(;pe.has(e=ue++););fe.set(t,e),pe.set(e,t)}return H(e,fe.get(t))}));var ge=(e,t,r)=>{const{[r]:n}=e,s=new FinalizationRegistry((e=>{n(le,H(W,e))})),o=([e,t])=>{switch(e){case $:if(null==t)return globalThis;if(typeof t===O)return pe.get(t);if(!(t instanceof z))for(const e in t)t[e]=o(t[e]);return t;case T:if(typeof t===W){if(!pe.has(t)){const e=function(...e){return e.at(0)instanceof Event&&(e=>{const{currentTarget:t,target:r,type:n}=e;for(const s of de.get(t||r)?.get(n)||[])e[s]()})(...e),n(V,H(T,t),we(this),e.map(we))},r=new WeakRef(e);pe.set(t,r),s.register(e,t,r)}return pe.get(t).deref()}return pe.get(t);case R:return Y(t)}return t},a={[V]:(e,t,r)=>we(e.apply(t,r)),[Q]:(e,t)=>we(new e(...t)),[X]:(e,t,r)=>we(G(e,t,r)),[Z]:(e,t)=>we(delete e[t]),[re]:e=>we(J(e)),[ee]:(e,t)=>we(e[t]),[te]:(e,t)=>{const r=B(e,t);return r?H($,C(r,we)):H(F,r)},[ne]:(e,t)=>we(t in e),[se]:e=>we(I(e)),[oe]:e=>H($,L(e).map(we)),[ae]:e=>we(U(e)),[ie]:(e,t,r)=>we(N(e,t,r)),[ce]:(e,t)=>we(D(e,t)),[le](e){fe.delete(pe.get(e)),pe.delete(e)}};return e[t]=(e,t,...r)=>{switch(e){case V:r[0]=o(r[0]),r[1]=r[1].map(o);break;case Q:r[0]=r[0].map(o);break;case X:{const[e,t]=r;r[0]=o(e);const{get:n,set:s,value:a}=t;n&&(t.get=o(n)),s&&(t.set=o(s)),a&&(t.value=o(a));break}default:r=r.map(o)}return a[e](o(t),...r)},{proxy:e,window:globalThis,isWindowProxy:()=>!1}};let ye=0;const he=new Map,me=new Map,be=Symbol(),ve=e=>typeof e===T?e():e,Se=e=>typeof e===$&&!!e&&be in e,Pe="isArray",Ae=Array[Pe],Me=q(((e,t)=>{if(be in t)return ve(t[be]);if(e===T){if(!me.has(t)){let e;for(;me.has(e=String(ye++)););he.set(t,e),me.set(e,t)}return H(e,he.get(t))}if(!(t instanceof z))for(const e in t)t[e]=Me(t[e]);return H(e,t)}));var Ee=(e,t,r)=>{const{[t]:n}=e,s=new Map,o=new FinalizationRegistry((e=>{s.delete(e),n(le,Me(e))})),a=e=>{const[t,r]=e;if(!s.has(r)){const n=t===T?_e.bind(e):e,a=new Proxy(n,l),i=new WeakRef(a);s.set(r,i),o.register(a,r,i)}return s.get(r).deref()},i=e=>{const[t,r]=e;switch(t){case $:return typeof r===O?a(e):r;case T:return typeof r===W?me.get(r):a(e);case R:return Y(r)}return r},c=(e,t,...r)=>i(n(e,ve(t),...r)),l={[V]:(e,t,r)=>c(V,e,Me(t),r.map(Me)),[Q]:(e,t)=>c(Q,e,t.map(Me)),[X]:(e,t,r)=>{const{get:n,set:s,value:o}=r;return typeof n===T&&(r.get=Me(n)),typeof s===T&&(r.set=Me(s)),typeof o===T&&(r.value=Me(o)),c(X,e,Me(t),r)},[Z]:(e,t)=>c(Z,e,Me(t)),[re]:e=>c(re,e),[ee]:(e,t)=>t===be?e:c(ee,e,Me(t)),[te]:(e,t)=>{const r=c(te,e,Me(t));return r&&C(r,i)},[ne]:(e,t)=>t===be||c(ne,e,Me(t)),[se]:e=>c(se,e),[oe]:e=>c(oe,e).map(i),[ae]:e=>c(ae,e),[ie]:(e,t,r)=>c(ie,e,Me(t),Me(r)),[ce]:(e,t)=>c(ce,e,Me(t))};e[r]=(e,t,r,n)=>{switch(e){case V:return i(t).apply(i(r),n.map(i));case le:{const e=i(t);he.delete(me.get(e)),me.delete(e)}}};const u=new Proxy([$,null],l),f=u.Array[Pe];return G(Array,Pe,{value:e=>Se(e)?f(e):Ae(e)}),{window:u,isWindowProxy:Se,proxy:e,get global(){return console.warn("Deprecated: please access `window` field instead"),this.window},get isGlobal(){return function(e){return console.warn("Deprecated: please access `isWindowProxy` field instead"),this.isWindowProxy(e)}.bind(this)}}};function _e(){return this}const je=p+"M",ke=p+"T",xe=new WeakMap,$e=(e,...t)=>{const r=x(e,...t);if(!xe.has(r)){const t=e instanceof Worker?ge:Ee;xe.set(r,t(r,je,ke))}return xe.get(r)};$e.transfer=x.transfer;const{isArray:Te}=Array,{assign:Oe,create:We,defineProperties:Fe,defineProperty:Re,entries:Ge}=Object,{all:Be,resolve:Je}=new Proxy(Promise,{get:(e,t)=>e[t].bind(e)}),Ie=(e,t=location.href)=>new URL(e,t).href;Promise.withResolvers||(Promise.withResolvers=function(){var e,t,r=new this((function(r,n){e=r,t=n}));return{resolve:e,reject:t,promise:r}});const Le=e=>e.arrayBuffer(),Ue=e=>e.json(),Ne=e=>e.text(),De=e=>e.replace(/^[^\\r\\n]+$/,(e=>e.trim())),ze=new WeakMap,Ce=e=>{const t=e||console,r={stderr:(t.stderr||console.error).bind(t),stdout:(t.stdout||console.log).bind(t)};return{stderr:(...e)=>r.stderr(...e),stdout:(...e)=>r.stdout(...e),async get(e){const t=await e;return ze.set(t,r),t}}},He=e=>{const t=e.split("/");return t.pop(),t.join("/")},qe=(e,t)=>{const r=[];for(const n of t.split("/"))r.push(n),n&&e.mkdir(r.join("/"))},Ke=(e,t)=>{const r=[];for(const e of t.split("/"))switch(e){case"":case".":break;case"..":r.pop();break;default:r.push(e)}return[e.cwd()].concat(r).join("/").replace(/^\\/+/,"/")},Ye=e=>{const t=e.map((e=>e.trim().replace(/(^[/]*|[/]*$)/g,""))).filter((e=>""!==e&&"."!==e)).join("/");return e[0].startsWith("/")?`/${t}`:t},Ve=new WeakMap,Qe=(e,t,r)=>{console.log(t),Be((e=>{for(const{files:t,to_file:r,from:n=""}of e){if(void 0!==t&&void 0!==r)throw new Error("Cannot use \'to_file\' and \'files\' parameters together!");if(void 0===t&&void 0===r&&n.endsWith("/"))throw new Error(`Couldn\'t determine the filename from the path ${n}, please supply \'to_file\' parameter.`)}return e.flatMap((({from:e="",to_folder:t=".",to_file:r,files:n})=>{if(Te(n))return n.map((r=>({url:Ye([e,r]),path:Ye([t,r])})));const s=r||e.slice(1+e.lastIndexOf("/"));return[{url:e,path:Ye([t,s])}]}))})(r).map((({url:n,path:s})=>((e,t)=>fetch(Ie(t,Ve.get(e))))(r,n).then(Le).then((r=>e.writeFile(t,s,r))))))};function Xe(e,t,r){for(const[t,n]of Ge(r))this.setGlobal(e,t,n)}const Ze=(e,t)=>e.runPython(De(t)),et=(e,t)=>e.globals.get(t),tt=(e,t,r)=>{e.globals.set(t,r)},rt=(e,t)=>{e.globals.delete(t)},nt=(e,t,r)=>{e.registerJsModule(t,r)},st=({FS:e,PATH:t,_module:{PATH_FS:r}},n,s)=>{(({FS:e,PATH:t,PATH_FS:r},n,s)=>{const o=r.resolve(n);e.mkdirTree(t.dirname(o)),e.writeFile(o,new Uint8Array(s),{canOwn:!0})})({FS:e,PATH:t,PATH_FS:r},n,s)};var ot={type:"micropython",module:(e="1.20.0-268")=>`https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${e}/micropython.mjs`,async engine({loadMicroPython:e},t,r){const{stderr:n,stdout:s,get:o}=Ce();r=r.replace(/\\.m?js$/,".wasm");const a=await o(e({stderr:n,stdout:s,url:r}));return t.fetch&&await Qe(this,a,t.fetch),a},getGlobal:et,setGlobal:tt,deleteGlobal:rt,registerJSModule:nt,run:Ze,async runAsync(...e){return this.run(...e)},writeFile:st};var at={type:"pyodide",module:(e="0.23.2")=>`https://cdn.jsdelivr.net/pyodide/v${e}/full/pyodide.mjs`,async engine({loadPyodide:e},t,r){const{stderr:n,stdout:s,get:o}=Ce(),a=r.slice(0,r.lastIndexOf("/")),i=await o(e({stderr:n,stdout:s,indexURL:a}));if(t.fetch&&await Qe(this,i,t.fetch),t.packages){await i.loadPackage("micropip");const e=await i.pyimport("micropip");await e.install(t.packages),e.destroy()}return i},getGlobal:et,setGlobal:tt,deleteGlobal:rt,registerJSModule:nt,run:Ze,runAsync:(e,t)=>e.runPythonAsync(De(t)),writeFile:st};const it="ruby-wasm-wasi";var ct={type:it,experimental:!0,module:(e="2.0.0")=>`https://cdn.jsdelivr.net/npm/ruby-3_2-wasm-wasi@${e}/dist/browser.esm.js`,async engine({DefaultRubyVM:e},t,r){const n=await fetch(`${r.slice(0,r.lastIndexOf("/"))}/ruby.wasm`),s=await WebAssembly.compile(await n.arrayBuffer()),{vm:o}=await e(s);return t.fetch&&await Qe(this,o,t.fetch),o},registerJSModule:Xe,getGlobal(e,t){try{return this.run(e,t)}catch(r){const n=this.run(e,`method(:${t})`);return(...r)=>n.call(t,...r.map((t=>e.wrap(t))))}},setGlobal(e,t,r){const n=`__pyscript_ruby_wasm_wasi_${t}`;globalThis[n]=r,this.run(e,`require "js";$${t}=JS::eval("return ${n}")`)},deleteGlobal(e,t){const r=`__pyscript_ruby_wasm_wasi_${t}`;this.run(e,`$${t}=nil`),delete globalThis[r]},run:(e,t)=>e.eval(De(t)),runAsync:(e,t)=>e.evalAsync(De(t)),writeFile:()=>{throw new Error(`writeFile is not supported in ${it}`)}};var lt={type:"wasmoon",module:(e="1.15.0")=>`https://cdn.jsdelivr.net/npm/wasmoon@${e}/+esm`,async engine({LuaFactory:e,LuaLibraries:t},r){const{stderr:n,stdout:s,get:o}=Ce(),a=await o((new e).createEngine());return a.global.getTable(t.Base,(e=>{a.global.setField(e,"print",s),a.global.setField(e,"printErr",n)})),r.fetch&&await Qe(this,a,r.fetch),a},registerJSModule:Xe,getGlobal:(e,t)=>e.global.get(t),setGlobal(e,t,r){e.global.set(t,r)},deleteGlobal(e,t){e.global.set(t,void 0)},run:(e,t)=>e.doStringSync(De(t)),runAsync:(e,t)=>e.doString(De(t)),writeFile:({cmodule:{module:{FS:e}}},t,r)=>((e,t,r)=>(t=Ke(e,t),qe(e,He(t)),e.writeFile(t,new Uint8Array(r),{canOwn:!0})))(e,t,r)};const ut=new Map,ft=new Map,pt=new Proxy(new Map,{get(e,t){if(!e.has(t)){const[r,...n]=t.split("@"),s=ut.get(r),o=/^https?:\\/\\//i.test(n)?n.join("@"):s.module(...n);e.set(t,{url:o,module:import(o),engine:s.engine.bind(s)})}const{url:r,module:n,engine:s}=e.get(t);return(e,o)=>n.then((n=>{ft.set(t,e);const a=e?.fetch;return a&&Ve.set(a,o),s(n,e,r)}))}}),dt=e=>{for(const t of[].concat(e.type))ut.set(t,e)};for(const e of[ot,at,ct,lt])dt(e);const wt=async e=>(await import("https://cdn.jsdelivr.net/npm/basic-toml@0.3.1/es.js")).parse(e);try{new SharedArrayBuffer(4)}catch(e){throw new Error(["Unable to use SharedArrayBuffer due insecure environment.","Please read requirements in MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements"].join("\\n"))}let gt,yt,ht;const mt=(e,t)=>{addEventListener(e,t||(async t=>{await gt,ht=t,yt(`xworker.on${e}(xworker.event);`,Pt)}),!!t&&{once:!0})},{proxy:bt,window:vt,isWindowProxy:St}=$e(self,f),Pt={sync:bt,window:vt,isWindowProxy:St,onerror(){},onmessage(){},onmessageerror(){},postMessage:postMessage.bind(self),get event(){const e=ht;if(!e)throw new Error("Unauthorized event access");return ht=void 0,e}};mt("message",(({data:{options:e,code:t,hooks:r}})=>{gt=(async()=>{const{type:n,version:s,config:o,async:a}=e,i=await((e,t)=>{let r={};if(t)if(t.endsWith(".json"))r=fetch(t).then(Ue);else if(t.endsWith(".toml"))r=fetch(t).then(Ne).then(wt);else{try{r=JSON.parse(t)}catch(e){r=wt(t)}t=Ie("./config.txt")}return Je(r).then((r=>pt[e](r,t)))})(((e,t="")=>`${e}@${t}`.replace(/@$/,""))(n,s),o),c=We(ut.get(n)),l="run"+(a?"Async":"");if(r){const{beforeRun:e,beforeRunAsync:t,afterRun:n,afterRunAsync:s}=r,o=n||s,a=e||t;if(o){const e=c[l].bind(c);c[l]=(t,r)=>e(t,`${r}\\n${o}`)}if(a){const e=c[l].bind(c);c[l]=(t,r)=>e(t,`${a}\\n${r}`)}}return c.registerJSModule(i,"xworker",{xworker:Pt}),yt=c[l].bind(c,i),yt(t),i})(),mt("error"),mt("message"),mt("messageerror")}));\n'],{type:"application/javascript"})),{type:"module"}),{postMessage:s}=n,o=this instanceof ze;if(e.length){const[t,n]=e;(r=Oe({},r||{type:t,version:n})).type||(r.type=t)}r?.config&&(r.config=He(r.config));const a=fetch(t).then(Ue).then((e=>{const t=o?this.stringHooks:void 0;s.call(n,{options:r,code:e,hooks:t})}));return Ge(n,{postMessage:{value:(e,...t)=>a.then((()=>s.call(n,e,...t)))},sync:{value:We(n,d).proxy}}),o&&this.onWorkerReady?.(this.interpreter,n),n};Promise.withResolvers||(Promise.withResolvers=function(){var e,t,r=new this((function(r,n){e=r,t=n}));return{resolve:e,reject:t,promise:r}});const qe=e=>e.replace(/^[^\r\n]+$/,(e=>e.trim())),Ve=new WeakMap,Ye=e=>{const t=e||console,r={stderr:(t.stderr||console.error).bind(t),stdout:(t.stdout||console.log).bind(t)};return{stderr:(...e)=>r.stderr(...e),stdout:(...e)=>r.stdout(...e),async get(e){const t=await e;return Ve.set(t,r),t}}},Ke=e=>{const t=e.split("/");return t.pop(),t.join("/")},Qe=(e,t)=>{const r=[];for(const n of t.split("/"))r.push(n),n&&e.mkdir(r.join("/"))},Ze=(e,t)=>{const r=[];for(const e of t.split("/"))switch(e){case"":case".":break;case"..":r.pop();break;default:r.push(e)}return[e.cwd()].concat(r).join("/").replace(/^\/+/,"/")},et=e=>{const t=e.map((e=>e.trim().replace(/(^[/]*|[/]*$)/g,""))).filter((e=>""!==e&&"."!==e)).join("/");return e[0].startsWith("/")?`/${t}`:t},tt=new WeakMap,rt=(e,t,r)=>{console.log(t),Le((e=>{for(const{files:t,to_file:r,from:n=""}of e){if(void 0!==t&&void 0!==r)throw new Error("Cannot use 'to_file' and 'files' parameters together!");if(void 0===t&&void 0===r&&n.endsWith("/"))throw new Error(`Couldn't determine the filename from the path ${n}, please supply 'to_file' parameter.`)}return e.flatMap((({from:e="",to_folder:t=".",to_file:r,files:n})=>{if(Re(n))return n.map((r=>({url:et([e,r]),path:et([t,r])})));const s=r||e.slice(1+e.lastIndexOf("/"));return[{url:e,path:et([t,s])}]}))})(r).map((({url:n,path:s})=>((e,t)=>fetch(He(t,tt.get(e))))(r,n).then(De).then((r=>e.writeFile(t,s,r))))))};function nt(e,t,r){for(const[t,n]of Ie(r))this.setGlobal(e,t,n)}const st=(e,t)=>e.runPython(qe(t)),ot=(e,t)=>e.globals.get(t),at=(e,t,r)=>{e.globals.set(t,r)},it=(e,t)=>{e.globals.delete(t)},ct=(e,t,r)=>{e.registerJsModule(t,r)},lt=({FS:e,PATH:t,_module:{PATH_FS:r}},n,s)=>{(({FS:e,PATH:t,PATH_FS:r},n,s)=>{const o=r.resolve(n);e.mkdirTree(t.dirname(o)),e.writeFile(o,new Uint8Array(s),{canOwn:!0})})({FS:e,PATH:t,PATH_FS:r},n,s)};var ut={type:"micropython",module:(e="1.20.0-268")=>`https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${e}/micropython.mjs`,async engine({loadMicroPython:e},t,r){const{stderr:n,stdout:s,get:o}=Ye();r=r.replace(/\.m?js$/,".wasm");const a=await o(e({stderr:n,stdout:s,url:r}));return t.fetch&&await rt(this,a,t.fetch),a},getGlobal:ot,setGlobal:at,deleteGlobal:it,registerJSModule:ct,run:st,async runAsync(...e){return this.run(...e)},writeFile:lt};var ft={type:"pyodide",module:(e="0.23.2")=>`https://cdn.jsdelivr.net/pyodide/v${e}/full/pyodide.mjs`,async engine({loadPyodide:e},t,r){const{stderr:n,stdout:s,get:o}=Ye(),a=r.slice(0,r.lastIndexOf("/")),i=await o(e({stderr:n,stdout:s,indexURL:a}));if(t.fetch&&await rt(this,i,t.fetch),t.packages){await i.loadPackage("micropip");const e=await i.pyimport("micropip");await e.install(t.packages),e.destroy()}return i},getGlobal:ot,setGlobal:at,deleteGlobal:it,registerJSModule:ct,run:st,runAsync:(e,t)=>e.runPythonAsync(qe(t)),writeFile:lt};const pt="ruby-wasm-wasi";var dt={type:pt,experimental:!0,module:(e="2.0.0")=>`https://cdn.jsdelivr.net/npm/ruby-3_2-wasm-wasi@${e}/dist/browser.esm.js`,async engine({DefaultRubyVM:e},t,r){const n=await fetch(`${r.slice(0,r.lastIndexOf("/"))}/ruby.wasm`),s=await WebAssembly.compile(await n.arrayBuffer()),{vm:o}=await e(s);return t.fetch&&await rt(this,o,t.fetch),o},registerJSModule:nt,getGlobal(e,t){try{return this.run(e,t)}catch(r){const n=this.run(e,`method(:${t})`);return(...r)=>n.call(t,...r.map((t=>e.wrap(t))))}},setGlobal(e,t,r){const n=`__pyscript_ruby_wasm_wasi_${t}`;globalThis[n]=r,this.run(e,`require "js";$${t}=JS::eval("return ${n}")`)},deleteGlobal(e,t){const r=`__pyscript_ruby_wasm_wasi_${t}`;this.run(e,`$${t}=nil`),delete globalThis[r]},run:(e,t)=>e.eval(qe(t)),runAsync:(e,t)=>e.evalAsync(qe(t)),writeFile:()=>{throw new Error(`writeFile is not supported in ${pt}`)}};var ht={type:"wasmoon",module:(e="1.15.0")=>`https://cdn.jsdelivr.net/npm/wasmoon@${e}/+esm`,async engine({LuaFactory:e,LuaLibraries:t},r){const{stderr:n,stdout:s,get:o}=Ye(),a=await o((new e).createEngine());return a.global.getTable(t.Base,(e=>{a.global.setField(e,"print",s),a.global.setField(e,"printErr",n)})),r.fetch&&await rt(this,a,r.fetch),a},registerJSModule:nt,getGlobal:(e,t)=>e.global.get(t),setGlobal(e,t,r){e.global.set(t,r)},deleteGlobal(e,t){e.global.set(t,void 0)},run:(e,t)=>e.doStringSync(qe(t)),runAsync:(e,t)=>e.doString(qe(t)),writeFile:({cmodule:{module:{FS:e}}},t,r)=>((e,t,r)=>(t=Ze(e,t),Qe(e,Ke(t)),e.writeFile(t,new Uint8Array(r),{canOwn:!0})))(e,t,r)};const wt=new Map,gt=new Map,yt=[],mt=[],bt=new Proxy(new Map,{get(e,t){if(!e.has(t)){const[r,...n]=t.split("@"),s=wt.get(r),o=/^https?:\/\//i.test(n)?n.join("@"):s.module(...n);e.set(t,{url:o,module:import(o),engine:s.engine.bind(s)})}const{url:r,module:n,engine:s}=e.get(t);return(e,o)=>n.then((n=>{gt.set(t,e);const a=e?.fetch;return a&&tt.set(a,o),s(n,e,r)}))}}),vt=e=>{for(const t of[].concat(e.type))wt.set(t,e),yt.push(`script[type="${t}"]`),mt.push(`${t}-`)};for(const e of[ut,ft,dt,ht])vt(e);const Mt=async e=>(await import("https://cdn.jsdelivr.net/npm/basic-toml@0.3.1/es.js")).parse(e),St=(e,t)=>{let r={};if(t)if(t.endsWith(".json"))r=fetch(t).then(Ne);else if(t.endsWith(".toml"))r=fetch(t).then(Ue).then(Mt);else{try{r=JSON.parse(t)}catch(e){r=Mt(t)}t=He("./config.txt")}return Je(r).then((r=>bt[e](r,t)))},At=(e,t="")=>`${e}@${t}`.replace(/@$/,""),Pt=(e,t)=>{const r=(e=>{let t=e;for(;t.parentNode;)t=t.parentNode;return t})(e);return r.getElementById(t)||((e,t=document)=>t.querySelector(e))(t,r)},Et=new WeakMap,kt={get(){let e=Et.get(this);return e||(e=document.createElement(`${this.type}-script`),Et.set(this,e),Tt(this)),e},set(e){"string"==typeof e?Et.set(this,Pt(this,e)):(Et.set(this,e),Tt(this))}},$t=new WeakMap,jt=new Map,xt=(e,t)=>{const r=e?.value;return r?t+r:""},_t=(e,t,r,n,s)=>{if(!jt.has(t)){const o={interpreter:St(r,s),queue:Je(),XWorker:Xe(e,n)};jt.set(t,o),jt.has(e)||jt.set(e,o)}return jt.get(t)},Tt=async e=>{if($t.has(e)){const{target:t}=e;t&&(e.closest("head")?document.body.append(t):e.after(t))}else{const{attributes:{async:t,config:r,env:n,target:s,version:o},src:a,type:i}=e,c=o?.value,l=At(i,c),u=xt(s,"");let f=xt(r,"|");const p=xt(n,"")||`${l}${f}`;f=f.slice(1),f&&(f=He(f));const d=_t(i,p,l,c,f);$t.set(Be(e,"target",kt),d),u&&Et.set(e,Pt(e,u));const h=a?fetch(a).then(Ue):e.textContent;d.queue=d.queue.then((()=>(async(e,t,r,n)=>{const s=wt.get(e.type);s.experimental&&console.warn(`The ${e.type} interpreter is experimental`);const[o,a]=await Le([$t.get(e).interpreter,t]);try{return Be(document,"currentScript",{configurable:!0,get:()=>e}),s.registerJSModule(o,"xworker",{XWorker:r}),s[n?"runAsync":"run"](o,a)}finally{delete document.currentScript}})(e,h,d.XWorker,!!t)))}};Be(globalThis,"pyscript",{value:{env:new Proxy(Fe(null),{get:(e,t)=>Wt(t)})}});const Wt=async e=>{if(jt.has(e)){const{interpreter:t,queue:r}=jt.get(e);return(await Le([t,r]))[0]}const t=jt.size?`Available interpreters are: ${[...jt.keys()].map((e=>`"${e}"`)).join(", ")}.`:"There are no interpreters in this page.";throw new Error(`The interpreter "${e}" was not found. ${t}`)},Rt=async e=>{const{type:r,currentTarget:n}=e;for(let{name:s,value:o,ownerElement:a}of t(`./@*[${mt.map((e=>`name()="${e}${r}"`)).join(" or ")}]`,n)){s=s.slice(0,-(r.length+1));const t=await Wt(a.getAttribute(`${s}-env`)||s);wt.get(s).getGlobal(t,o)(e)}},Ot=e=>{for(let{name:r,ownerElement:n}of t(`.//@*[${mt.map((e=>`starts-with(name(),"${e}")`)).join(" or ")}]`,e))r=r.slice(r.lastIndexOf("-")+1),"env"!==r&&n.addEventListener(r,Rt)},Ft=[],Gt=new Map,Bt=new Map,It=e=>{for(const t of Ft)if(e.matches(t)){const r=Gt.get(t),{resolve:n}=Bt.get(r),{options:s,known:o}=Lt.get(r);if(!o.has(e)){o.add(e);const{interpreter:t,version:a,config:i,env:c,onInterpreterReady:l}=s,u=At(t,a),f=c||`${u}${i?`|${i}`:""}`,{interpreter:p,XWorker:d}=_t(t,f,u,a,i);p.then((o=>{const a=Fe(wt.get(t)),{onBeforeRun:i,onBeforeRunAsync:c,onAfterRun:f,onAfterRunAsync:p}=s,h=new ze(o,s),w=function(...e){return d.apply(h,e)};for(const[t,[r,n]]of[["run",[i,f]]]){const s=a[t];a[t]=function(t,o){r&&r.call(this,g,e);const a=s.call(this,t,o);return n&&n.call(this,g,e),a}}for(const[t,[r,n]]of[["runAsync",[c,p]]]){const s=a[t];a[t]=async function(t,o){r&&await r.call(this,g,e);const a=await s.call(this,t,o);return n&&await n.call(this,g,e),a}}a.registerJSModule(o,"xworker",{XWorker:w});const g={type:r,interpreter:o,XWorker:w,io:Ve.get(o),config:structuredClone(gt.get(u)),run:a.run.bind(a,o),runAsync:a.runAsync.bind(a,o)};n(g),l?.(g,e)}))}}},Lt=new Map,Jt=(t,r)=>{if(wt.has(t)||Lt.has(t))throw new Error(`<script type="${t}"> already registered`);if(!wt.has(r?.interpreter))throw new Error("Unspecified interpreter");wt.set(t,wt.get(r?.interpreter)),Ht(t);const n=[`script[type="${t}"]`,`${t}-script`];for(const e of n)Gt.set(e,t);Ft.push(...n),mt.push(`${t}-`),Lt.set(t,{options:Oe({env:t},r),known:new WeakSet}),Ot(document),e(n.join(",")).forEach(It)},Ht=e=>(Bt.has(e)||Bt.set(e,Promise.withResolvers()),Bt.get(e).promise),Dt=Xe(),Nt=yt.join(","),Ut=new MutationObserver((t=>{for(const{type:r,target:n,attributeName:s,addedNodes:o}of t)if("attributes"!==r){for(const t of o)if(1===t.nodeType)if(Ot(t),t.matches(Nt))Tt(t);else{if(e(Nt,t).forEach(Tt),!Ft.length)continue;It(t),e(Ft.join(","),t).forEach(It)}}else{const e=s.lastIndexOf("-")+1;if(e){const t=s.slice(0,e);for(const r of mt)if(t===r){const t=s.slice(e);if("env"!==t){const e=n.hasAttribute(s)?"add":"remove";n[`${e}EventListener`](t,Rt)}break}}}})),Ct=e=>(Ut.observe(e,{childList:!0,subtree:!0,attributes:!0}),e),{attachShadow:zt}=Element.prototype;Oe(Element.prototype,{attachShadow(e){return Ct(zt.call(this,e))}}),Ot(Ct(document)),e(Nt,document).forEach(Tt);export{Dt as XWorker,Jt as define,Ht as whenDefined};
