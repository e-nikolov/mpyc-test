const tt=new MessageChannel,nt=[];tt.port1.onmessage=()=>{nt.pop()()};let Ae=i=>r=>new Promise(o=>i(o,r));const It=Ae(function(i,r){(r==null||isNaN(r)||r<0)&&(r=0),r<1?(nt.push(i),tt.port2.postMessage(void 0)):setTimeout(i,r)}),Ut=Ae(function(i,r){if(r<1){let o=new MessageChannel;o.port1.onmessage=()=>{i()},o.port2.postMessage("")}else setTimeout(i,r)}),Pt=Ae((i,r)=>{(r==null||isNaN(r)||r<0)&&(r=0),r<1?(async o=>{o()})(i):setTimeout(i,r)}),Ft=Ut,{entries:ot,setPrototypeOf:rt,isFrozen:Ht,getPrototypeOf:zt,getOwnPropertyDescriptor:at}=Object;let{freeze:y,seal:b,create:it}=Object,{apply:_e,construct:Ne}=typeof Reflect<"u"&&Reflect;y||(y=function(i){return i}),b||(b=function(i){return i}),_e||(_e=function(i,r,o){return i.apply(r,o)}),Ne||(Ne=function(i,r){return new i(...r)});const J=N(Array.prototype.forEach),lt=N(Array.prototype.pop),W=N(Array.prototype.push),Q=N(String.prototype.toLowerCase),be=N(String.prototype.toString),Bt=N(String.prototype.match),G=N(String.prototype.replace),Wt=N(String.prototype.indexOf),Gt=N(String.prototype.trim),_=N(RegExp.prototype.test),Y=(st=TypeError,function(){for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return Ne(st,r)});var st;function N(i){return function(r){for(var o=arguments.length,g=new Array(o>1?o-1:0),E=1;E<o;E++)g[E-1]=arguments[E];return _e(i,r,g)}}function a(i,r){let o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Q;rt&&rt(i,null);let g=r.length;for(;g--;){let E=r[g];if(typeof E=="string"){const F=o(E);F!==E&&(Ht(r)||(r[g]=F),E=F)}i[E]=!0}return i}function P(i){const r=it(null);for(const[o,g]of ot(i))at(i,o)!==void 0&&(r[o]=g);return r}function ee(i,r){for(;i!==null;){const o=at(i,r);if(o){if(o.get)return N(o.get);if(typeof o.value=="function")return N(o.value)}i=zt(i)}return function(o){return console.warn("fallback value for",o),null}}const ct=y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Se=y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Re=y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Yt=y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),we=y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),jt=y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ut=y(["#text"]),mt=y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),De=y(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),pt=y(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),te=y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qt=b(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Xt=b(/<%[\w\W]*|[\w\W]*%>/gm),Kt=b(/\${[\w\W]*}/gm),$t=b(/^data-[\-\w.\u00B7-\uFFFF]/),Vt=b(/^aria-[\-\w]+$/),ft=b(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Zt=b(/^(?:\w+script|data):/i),Jt=b(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),dt=b(/^html$/i);var gt=Object.freeze({__proto__:null,MUSTACHE_EXPR:qt,ERB_EXPR:Xt,TMPLIT_EXPR:Kt,DATA_ATTR:$t,ARIA_ATTR:Vt,IS_ALLOWED_URI:ft,IS_SCRIPT_OR_DATA:Zt,ATTR_WHITESPACE:Jt,DOCTYPE_NAME:dt});const Qt=function(){return typeof window>"u"?null:window};var en=function i(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qt();const o=e=>i(e);if(o.version="3.0.6",o.removed=[],!r||!r.document||r.document.nodeType!==9)return o.isSupported=!1,o;let{document:g}=r;const E=g,F=E.currentScript,{DocumentFragment:Le,HTMLTemplateElement:ht,Node:ne,Element:ve,NodeFilter:oe,NamedNodeMap:Tt=r.NamedNodeMap||r.MozNamedAttrMap,HTMLFormElement:yt,DOMParser:Et,trustedTypes:j}=r,q=ve.prototype,At=ee(q,"cloneNode"),_t=ee(q,"nextSibling"),Nt=ee(q,"childNodes"),re=ee(q,"parentNode");if(typeof ht=="function"){const e=g.createElement("template");e.content&&e.content.ownerDocument&&(g=e.content.ownerDocument)}let h,H="";const{implementation:ae,createNodeIterator:bt,createDocumentFragment:St,getElementsByTagName:Rt}=g,{importNode:wt}=E;let S={};o.isSupported=typeof ot=="function"&&typeof re=="function"&&ae&&ae.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ie,ERB_EXPR:le,TMPLIT_EXPR:se,DATA_ATTR:Dt,ARIA_ATTR:Lt,IS_SCRIPT_OR_DATA:vt,ATTR_WHITESPACE:Ce}=gt;let{IS_ALLOWED_URI:xe}=gt,p=null;const ke=a({},[...ct,...Se,...Re,...we,...ut]);let f=null;const Oe=a({},[...mt,...De,...pt,...te]);let m=Object.seal(it(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),z=null,ce=null,Me=!0,ue=!0,Ie=!1,Ue=!0,C=!1,L=!1,me=!1,pe=!1,x=!1,X=!1,K=!1,Pe=!0,Fe=!1,fe=!0,B=!1,k={},O=null;const He=a({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let ze=null;const Be=a({},["audio","video","img","source","image","track"]);let de=null;const We=a({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$="http://www.w3.org/1998/Math/MathML",V="http://www.w3.org/2000/svg",w="http://www.w3.org/1999/xhtml";let M=w,ge=!1,he=null;const Ct=a({},[$,V,w],be);let I=null;const xt=["application/xhtml+xml","text/html"];let d=null,U=null;const kt=g.createElement("form"),Ge=function(e){return e instanceof RegExp||e instanceof Function},Te=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!U||U!==e){if(e&&typeof e=="object"||(e={}),e=P(e),I=I=xt.indexOf(e.PARSER_MEDIA_TYPE)===-1?"text/html":e.PARSER_MEDIA_TYPE,d=I==="application/xhtml+xml"?be:Q,p="ALLOWED_TAGS"in e?a({},e.ALLOWED_TAGS,d):ke,f="ALLOWED_ATTR"in e?a({},e.ALLOWED_ATTR,d):Oe,he="ALLOWED_NAMESPACES"in e?a({},e.ALLOWED_NAMESPACES,be):Ct,de="ADD_URI_SAFE_ATTR"in e?a(P(We),e.ADD_URI_SAFE_ATTR,d):We,ze="ADD_DATA_URI_TAGS"in e?a(P(Be),e.ADD_DATA_URI_TAGS,d):Be,O="FORBID_CONTENTS"in e?a({},e.FORBID_CONTENTS,d):He,z="FORBID_TAGS"in e?a({},e.FORBID_TAGS,d):{},ce="FORBID_ATTR"in e?a({},e.FORBID_ATTR,d):{},k="USE_PROFILES"in e&&e.USE_PROFILES,Me=e.ALLOW_ARIA_ATTR!==!1,ue=e.ALLOW_DATA_ATTR!==!1,Ie=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ue=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,C=e.SAFE_FOR_TEMPLATES||!1,L=e.WHOLE_DOCUMENT||!1,x=e.RETURN_DOM||!1,X=e.RETURN_DOM_FRAGMENT||!1,K=e.RETURN_TRUSTED_TYPE||!1,pe=e.FORCE_BODY||!1,Pe=e.SANITIZE_DOM!==!1,Fe=e.SANITIZE_NAMED_PROPS||!1,fe=e.KEEP_CONTENT!==!1,B=e.IN_PLACE||!1,xe=e.ALLOWED_URI_REGEXP||ft,M=e.NAMESPACE||w,m=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Ge(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(m.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Ge(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(m.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(m.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),C&&(ue=!1),X&&(x=!0),k&&(p=a({},[...ut]),f=[],k.html===!0&&(a(p,ct),a(f,mt)),k.svg===!0&&(a(p,Se),a(f,De),a(f,te)),k.svgFilters===!0&&(a(p,Re),a(f,De),a(f,te)),k.mathMl===!0&&(a(p,we),a(f,pt),a(f,te))),e.ADD_TAGS&&(p===ke&&(p=P(p)),a(p,e.ADD_TAGS,d)),e.ADD_ATTR&&(f===Oe&&(f=P(f)),a(f,e.ADD_ATTR,d)),e.ADD_URI_SAFE_ATTR&&a(de,e.ADD_URI_SAFE_ATTR,d),e.FORBID_CONTENTS&&(O===He&&(O=P(O)),a(O,e.FORBID_CONTENTS,d)),fe&&(p["#text"]=!0),L&&a(p,["html","head","body"]),p.table&&(a(p,["tbody"]),delete z.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw Y('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Y('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');h=e.TRUSTED_TYPES_POLICY,H=h.createHTML("")}else h===void 0&&(h=function(n,t){if(typeof n!="object"||typeof n.createPolicy!="function")return null;let s=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(s=t.getAttribute(c));const l="dompurify"+(s?"#"+s:"");try{return n.createPolicy(l,{createHTML:u=>u,createScriptURL:u=>u})}catch{return console.warn("TrustedTypes policy "+l+" could not be created."),null}}(j,F)),h!==null&&typeof H=="string"&&(H=h.createHTML(""));y&&y(e),U=e}},Ye=a({},["mi","mo","mn","ms","mtext"]),je=a({},["foreignobject","desc","title","annotation-xml"]),Ot=a({},["title","style","font","a","script"]),Z=a({},Se);a(Z,Re),a(Z,Yt);const ye=a({},we);a(ye,jt);const v=function(e){W(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Ee=function(e,n){try{W(o.removed,{attribute:n.getAttributeNode(e),from:n})}catch{W(o.removed,{attribute:null,from:n})}if(n.removeAttribute(e),e==="is"&&!f[e])if(x||X)try{v(n)}catch{}else try{n.setAttribute(e,"")}catch{}},qe=function(e){let n=null,t=null;if(pe)e="<remove></remove>"+e;else{const l=Bt(e,/^[\r\n\t ]+/);t=l&&l[0]}I==="application/xhtml+xml"&&M===w&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const s=h?h.createHTML(e):e;if(M===w)try{n=new Et().parseFromString(s,I)}catch{}if(!n||!n.documentElement){n=ae.createDocument(M,"template",null);try{n.documentElement.innerHTML=ge?H:s}catch{}}const c=n.body||n.documentElement;return e&&t&&c.insertBefore(g.createTextNode(t),c.childNodes[0]||null),M===w?Rt.call(n,L?"html":"body")[0]:L?n.documentElement:c},Xe=function(e){return bt.call(e.ownerDocument||e,e,oe.SHOW_ELEMENT|oe.SHOW_COMMENT|oe.SHOW_TEXT,null)},Ke=function(e){return typeof ne=="function"&&e instanceof ne},D=function(e,n,t){S[e]&&J(S[e],s=>{s.call(o,n,t,U)})},$e=function(e){let n=null;if(D("beforeSanitizeElements",e,null),(t=e)instanceof yt&&(typeof t.nodeName!="string"||typeof t.textContent!="string"||typeof t.removeChild!="function"||!(t.attributes instanceof Tt)||typeof t.removeAttribute!="function"||typeof t.setAttribute!="function"||typeof t.namespaceURI!="string"||typeof t.insertBefore!="function"||typeof t.hasChildNodes!="function"))return v(e),!0;var t;const s=d(e.nodeName);if(D("uponSanitizeElement",e,{tagName:s,allowedTags:p}),e.hasChildNodes()&&!Ke(e.firstElementChild)&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent))return v(e),!0;if(!p[s]||z[s]){if(!z[s]&&Ze(s)&&(m.tagNameCheck instanceof RegExp&&_(m.tagNameCheck,s)||m.tagNameCheck instanceof Function&&m.tagNameCheck(s)))return!1;if(fe&&!O[s]){const c=re(e)||e.parentNode,l=Nt(e)||e.childNodes;if(l&&c)for(let u=l.length-1;u>=0;--u)c.insertBefore(At(l[u],!0),_t(e))}return v(e),!0}return e instanceof ve&&!function(c){let l=re(c);l&&l.tagName||(l={namespaceURI:M,tagName:"template"});const u=Q(c.tagName),T=Q(l.tagName);return!!he[c.namespaceURI]&&(c.namespaceURI===V?l.namespaceURI===w?u==="svg":l.namespaceURI===$?u==="svg"&&(T==="annotation-xml"||Ye[T]):!!Z[u]:c.namespaceURI===$?l.namespaceURI===w?u==="math":l.namespaceURI===V?u==="math"&&je[T]:!!ye[u]:c.namespaceURI===w?!(l.namespaceURI===V&&!je[T])&&!(l.namespaceURI===$&&!Ye[T])&&!ye[u]&&(Ot[u]||!Z[u]):!(I!=="application/xhtml+xml"||!he[c.namespaceURI]))}(e)?(v(e),!0):s!=="noscript"&&s!=="noembed"&&s!=="noframes"||!_(/<\/no(script|embed|frames)/i,e.innerHTML)?(C&&e.nodeType===3&&(n=e.textContent,J([ie,le,se],c=>{n=G(n,c," ")}),e.textContent!==n&&(W(o.removed,{element:e.cloneNode()}),e.textContent=n)),D("afterSanitizeElements",e,null),!1):(v(e),!0)},Ve=function(e,n,t){if(Pe&&(n==="id"||n==="name")&&(t in g||t in kt))return!1;if(!(ue&&!ce[n]&&_(Dt,n))){if(!(Me&&_(Lt,n))){if(!f[n]||ce[n]){if(!(Ze(e)&&(m.tagNameCheck instanceof RegExp&&_(m.tagNameCheck,e)||m.tagNameCheck instanceof Function&&m.tagNameCheck(e))&&(m.attributeNameCheck instanceof RegExp&&_(m.attributeNameCheck,n)||m.attributeNameCheck instanceof Function&&m.attributeNameCheck(n))||n==="is"&&m.allowCustomizedBuiltInElements&&(m.tagNameCheck instanceof RegExp&&_(m.tagNameCheck,t)||m.tagNameCheck instanceof Function&&m.tagNameCheck(t))))return!1}else if(!de[n]){if(!_(xe,G(t,Ce,""))){if((n!=="src"&&n!=="xlink:href"&&n!=="href"||e==="script"||Wt(t,"data:")!==0||!ze[e])&&!(Ie&&!_(vt,G(t,Ce,"")))){if(t)return!1}}}}}return!0},Ze=function(e){return e.indexOf("-")>0},Je=function(e){D("beforeSanitizeAttributes",e,null);const{attributes:n}=e;if(!n)return;const t={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:f};let s=n.length;for(;s--;){const c=n[s],{name:l,namespaceURI:u,value:T}=c,R=d(l);let A=l==="value"?T:Gt(T);if(t.attrName=R,t.attrValue=A,t.keepAttr=!0,t.forceKeepAttr=void 0,D("uponSanitizeAttribute",e,t),A=t.attrValue,t.forceKeepAttr||(Ee(l,e),!t.keepAttr))continue;if(!Ue&&_(/\/>/i,A)){Ee(l,e);continue}C&&J([ie,le,se],et=>{A=G(A,et," ")});const Qe=d(e.nodeName);if(Ve(Qe,R,A)){if(!Fe||R!=="id"&&R!=="name"||(Ee(l,e),A="user-content-"+A),h&&typeof j=="object"&&typeof j.getAttributeType=="function"&&!u)switch(j.getAttributeType(Qe,R)){case"TrustedHTML":A=h.createHTML(A);break;case"TrustedScriptURL":A=h.createScriptURL(A)}try{u?e.setAttributeNS(u,l,A):e.setAttribute(l,A),lt(o.removed)}catch{}}}D("afterSanitizeAttributes",e,null)},Mt=function e(n){let t=null;const s=Xe(n);for(D("beforeSanitizeShadowDOM",n,null);t=s.nextNode();)D("uponSanitizeShadowNode",t,null),$e(t)||(t.content instanceof Le&&e(t.content),Je(t));D("afterSanitizeShadowDOM",n,null)};return o.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,s=null,c=null,l=null;if(ge=!e,ge&&(e="<!-->"),typeof e!="string"&&!Ke(e)){if(typeof e.toString!="function")throw Y("toString is not a function");if(typeof(e=e.toString())!="string")throw Y("dirty is not a string, aborting")}if(!o.isSupported)return e;if(me||Te(n),o.removed=[],typeof e=="string"&&(B=!1),B){if(e.nodeName){const R=d(e.nodeName);if(!p[R]||z[R])throw Y("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof ne)t=qe("<!---->"),s=t.ownerDocument.importNode(e,!0),s.nodeType===1&&s.nodeName==="BODY"||s.nodeName==="HTML"?t=s:t.appendChild(s);else{if(!x&&!C&&!L&&e.indexOf("<")===-1)return h&&K?h.createHTML(e):e;if(t=qe(e),!t)return x?null:K?H:""}t&&pe&&v(t.firstChild);const u=Xe(B?e:t);for(;c=u.nextNode();)$e(c)||(c.content instanceof Le&&Mt(c.content),Je(c));if(B)return e;if(x){if(X)for(l=St.call(t.ownerDocument);t.firstChild;)l.appendChild(t.firstChild);else l=t;return(f.shadowroot||f.shadowrootmode)&&(l=wt.call(E,l,!0)),l}let T=L?t.outerHTML:t.innerHTML;return L&&p["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&_(dt,t.ownerDocument.doctype.name)&&(T="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+T),C&&J([ie,le,se],R=>{T=G(T,R," ")}),h&&K?h.createHTML(T):T},o.setConfig=function(){Te(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}),me=!0},o.clearConfig=function(){U=null,me=!1},o.isValidAttribute=function(e,n,t){U||Te({});const s=d(e),c=d(n);return Ve(s,c,t)},o.addHook=function(e,n){typeof n=="function"&&(S[e]=S[e]||[],W(S[e],n))},o.removeHook=function(e){if(S[e])return lt(S[e])},o.removeHooks=function(e){S[e]&&(S[e]=[])},o.removeAllHooks=function(){S={}},o}();export{Pt as a,Ft as b,en as p,It as s};
