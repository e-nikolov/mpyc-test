let ve,p,Z;try{ve=new TextDecoder}catch{}let a=0;const nt=57342,st=57343,De=57337,X={};let I,ce,V,z,K,T,ie,O={},de=0,oe=0,x=[],ke=[],Ne={useRecords:!1,mapsAsObjects:!0},ae=!1,Ce=2;try{new Function("")}catch{Ce=1/0}class ue{constructor(t){if(t&&(!t.keyMap&&!t._keyMap||t.useRecords||(t.useRecords=!1,t.mapsAsObjects=!0),t.useRecords===!1&&t.mapsAsObjects===void 0&&(t.mapsAsObjects=!0),t.getStructures&&(t.getShared=t.getStructures),t.getShared&&!t.structures&&((t.structures=[]).uninitialized=!0),t.keyMap)){this.mapKey=new Map;for(let[n,o]of Object.entries(t.keyMap))this.mapKey.set(o,n)}Object.assign(this,t)}decodeKey(t){return this.keyMap&&this.mapKey.get(t)||t}encodeKey(t){return this.keyMap&&this.keyMap.hasOwnProperty(t)?this.keyMap[t]:t}encodeKeys(t){if(!this._keyMap)return t;let n=new Map;for(let[o,f]of Object.entries(t))n.set(this._keyMap.hasOwnProperty(o)?this._keyMap[o]:o,f);return n}decodeKeys(t){if(!this._keyMap||t.constructor.name!="Map")return t;if(!this._mapKey){this._mapKey=new Map;for(let[o,f]of Object.entries(this._keyMap))this._mapKey.set(f,o)}let n={};return t.forEach((o,f)=>n[C(this._mapKey.has(f)?this._mapKey.get(f):f)]=o),n}mapDecode(t,n){let o=this.decode(t);return this._keyMap&&o.constructor.name==="Array"?o.map(f=>this.decodeKeys(f)):o}decode(t,n){if(p)return $e(()=>(je(),this?this.decode(t,n):ue.prototype.decode.call(Ne,t,n)));Z=n>-1?n:t.length,a=0,oe=0,ce=null,V=null,p=t;try{T=t.dataView||(t.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength))}catch(o){throw p=null,t instanceof Uint8Array?o:new Error("Source must be a Uint8Array or Buffer but was a "+(t&&typeof t=="object"?t.constructor.name:typeof t))}if(this instanceof ue){if(O=this,K=this.sharedValues&&(this.pack?new Array(this.maxPrivatePackedValues||16).concat(this.sharedValues):this.sharedValues),this.structures)return I=this.structures,he();(!I||I.length>0)&&(I=[])}else O=Ne,(!I||I.length>0)&&(I=[]),K=null;return he()}decodeMultiple(t,n){let o,f=0;try{let l=t.length;ae=!0;let c=this?this.decode(t,l):Be.decode(t,l);if(!n){for(o=[c];a<l;)f=a,o.push(he());return o}if(n(c)===!1)return;for(;a<l;)if(f=a,n(he())===!1)return}catch(l){throw l.lastPosition=f,l.values=o,l}finally{ae=!1,je()}}}function he(){try{let e=M();if(V){if(a>=V.postBundlePosition){let t=new Error("Unexpected bundle position");throw t.incomplete=!0,t}a=V.postBundlePosition,V=null}if(a==Z)I=null,p=null,z&&(z=null);else{if(a>Z){let t=new Error("Unexpected end of CBOR data");throw t.incomplete=!0,t}if(!ae)throw new Error("Data read, but end of buffer not reached")}return e}catch(e){throw je(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer"))&&(e.incomplete=!0),e}}function M(){let e=p[a++],t=e>>5;if(e&=31,e>23)switch(e){case 24:e=p[a++];break;case 25:if(t==7)return function(){let o=p[a++],f=p[a++],l=(127&o)>>2;if(l===31)return f||3&o?NaN:128&o?-1/0:1/0;if(l===0){let c=((3&o)<<8|f)/16777216;return 128&o?-c:c}return ye[3]=128&o|56+(l>>1),ye[2]=(7&o)<<5|f>>3,ye[1]=f<<5,ye[0]=0,We[0]}();e=T.getUint16(a),a+=2;break;case 26:if(t==7){let o=T.getFloat32(a);if(O.useFloat32>2){let f=Ee[(127&p[a])<<1|p[a+1]>>7];return a+=4,(f*o+(o>0?.5:-.5)>>0)/f}return a+=4,o}e=T.getUint32(a),a+=4;break;case 27:if(t==7){let o=T.getFloat64(a);return a+=8,o}if(t>1){if(T.getUint32(a)>0)throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");e=T.getUint32(a+4)}else O.int64AsNumber?(e=4294967296*T.getUint32(a),e+=T.getUint32(a+4)):e=T.getBigUint64(a);a+=8;break;case 31:switch(t){case 2:case 3:throw new Error("Indefinite length not supported for byte or text strings");case 4:let o,f=[],l=0;for(;(o=M())!=X;)f[l++]=o;return t==4?f:t==3?f.join(""):Buffer.concat(f);case 5:let c;if(O.mapsAsObjects){let U={};if(O.keyMap)for(;(c=M())!=X;)U[C(O.decodeKey(c))]=M();else for(;(c=M())!=X;)U[C(c)]=M();return U}{ie&&(O.mapsAsObjects=!0,ie=!1);let U=new Map;if(O.keyMap)for(;(c=M())!=X;)U.set(O.decodeKey(c),M());else for(;(c=M())!=X;)U.set(c,M());return U}case 7:return X;default:throw new Error("Invalid major type for indefinite length "+t)}default:throw new Error("Unknown token "+e)}switch(t){case 0:return e;case 1:return~e;case 2:return n=e,O.copyBuffers?Uint8Array.prototype.slice.call(p,a,a+=n):p.subarray(a,a+=n);case 3:if(oe>=a)return ce.slice(a-de,(a+=e)-de);if(oe==0&&Z<140&&e<32){let l=e<16?Le(e):function(c){let U=a,w=new Array(c);for(let j=0;j<c;j++){const v=p[a++];if((128&v)>0)return void(a=U);w[j]=v}return _.apply(String,w)}(e);if(l!=null)return l}return it(e);case 4:let o=new Array(e);for(let l=0;l<e;l++)o[l]=M();return o;case 5:if(O.mapsAsObjects){let l={};if(O.keyMap)for(let c=0;c<e;c++)l[C(O.decodeKey(M()))]=M();else for(let c=0;c<e;c++)l[C(M())]=M();return l}{ie&&(O.mapsAsObjects=!0,ie=!1);let l=new Map;if(O.keyMap)for(let c=0;c<e;c++)l.set(O.decodeKey(M()),M());else for(let c=0;c<e;c++)l.set(M(),M());return l}case 6:if(e>=De){let l=I[8191&e];if(l)return l.read||(l.read=Ue(l)),l.read();if(e<65536){if(e==st){let c=te(),U=M(),w=M();Me(U,w);let j={};if(O.keyMap)for(let v=2;v<c;v++)j[C(O.decodeKey(w[v-2]))]=M();else for(let v=2;v<c;v++)j[C(w[v-2])]=M();return j}if(e==nt){let c=te(),U=M();for(let w=2;w<c;w++)Me(U++,M());return M()}if(e==De)return function(){let c=te(),U=a+M();for(let j=2;j<c;j++){let v=te();a+=v}let w=a;return a=U,V=[Oe(te()),Oe(te())],V.position0=0,V.position1=0,V.postBundlePosition=a,a=w,M()}();if(O.getShared&&(Se(),l=I[8191&e],l))return l.read||(l.read=Ue(l)),l.read()}}let f=x[e];if(f)return f.handlesRead?f(M):f(M());{let l=M();for(let c=0;c<ke.length;c++){let U=ke[c](e,l);if(U!==void 0)return U}return new q(l,e)}case 7:switch(e){case 20:return!1;case 21:return!0;case 22:return null;case 23:return;default:let l=(K||Y())[e];if(l!==void 0)return l;throw new Error("Unknown token "+e)}default:if(isNaN(e)){let l=new Error("Unexpected end of CBOR data");throw l.incomplete=!0,l}throw new Error("Unknown CBOR token "+e)}var n}const ze=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function Ue(e){return e.slowReads=0,function(){let t=p[a++];if(t&=31,t>23)switch(t){case 24:t=p[a++];break;case 25:t=T.getUint16(a),a+=2;break;case 26:t=T.getUint32(a),a+=4;break;default:throw new Error("Expected array header, but got "+p[a-1])}let n=this.compiledReader;for(;n;){if(n.propertyCount===t)return n(M);n=n.next}if(this.slowReads++>=Ce){let f=this.length==t?this:this.slice(0,t);return n=O.keyMap?new Function("r","return {"+f.map(l=>O.decodeKey(l)).map(l=>ze.test(l)?C(l)+":r()":"["+JSON.stringify(l)+"]:r()").join(",")+"}"):new Function("r","return {"+f.map(l=>ze.test(l)?C(l)+":r()":"["+JSON.stringify(l)+"]:r()").join(",")+"}"),this.compiledReader&&(n.next=this.compiledReader),n.propertyCount=t,this.compiledReader=n,n(M)}let o={};if(O.keyMap)for(let f=0;f<t;f++)o[C(O.decodeKey(this[f]))]=M();else for(let f=0;f<t;f++)o[C(this[f])]=M();return o}}function C(e){return e==="__proto__"?"__proto_":e}let it=Oe;function Oe(e){let t;if(e<16&&(t=Le(e)))return t;if(e>64&&ve)return ve.decode(p.subarray(a,a+=e));const n=a+e,o=[];for(t="";a<n;){const f=p[a++];if(!(128&f))o.push(f);else if((224&f)==192){const l=63&p[a++];o.push((31&f)<<6|l)}else if((240&f)==224){const l=63&p[a++],c=63&p[a++];o.push((31&f)<<12|l<<6|c)}else if((248&f)==240){let l=(7&f)<<18|(63&p[a++])<<12|(63&p[a++])<<6|63&p[a++];l>65535&&(l-=65536,o.push(l>>>10&1023|55296),l=56320|1023&l),o.push(l)}else o.push(f);o.length>=4096&&(t+=_.apply(String,o),o.length=0)}return o.length>0&&(t+=_.apply(String,o)),t}let _=String.fromCharCode;function Le(e){if(e<4){if(e<2){if(e===0)return"";{let t=p[a++];return(128&t)>1?void(a-=1):_(t)}}{let t=p[a++],n=p[a++];if((128&t)>0||(128&n)>0)return void(a-=2);if(e<3)return _(t,n);let o=p[a++];return(128&o)>0?void(a-=3):_(t,n,o)}}{let t=p[a++],n=p[a++],o=p[a++],f=p[a++];if((128&t)>0||(128&n)>0||(128&o)>0||(128&f)>0)return void(a-=4);if(e<6){if(e===4)return _(t,n,o,f);{let l=p[a++];return(128&l)>0?void(a-=5):_(t,n,o,f,l)}}if(e<8){let l=p[a++],c=p[a++];if((128&l)>0||(128&c)>0)return void(a-=6);if(e<7)return _(t,n,o,f,l,c);let U=p[a++];return(128&U)>0?void(a-=7):_(t,n,o,f,l,c,U)}{let l=p[a++],c=p[a++],U=p[a++],w=p[a++];if((128&l)>0||(128&c)>0||(128&U)>0||(128&w)>0)return void(a-=8);if(e<10){if(e===8)return _(t,n,o,f,l,c,U,w);{let j=p[a++];return(128&j)>0?void(a-=9):_(t,n,o,f,l,c,U,w,j)}}if(e<12){let j=p[a++],v=p[a++];if((128&j)>0||(128&v)>0)return void(a-=10);if(e<11)return _(t,n,o,f,l,c,U,w,j,v);let B=p[a++];return(128&B)>0?void(a-=11):_(t,n,o,f,l,c,U,w,j,v,B)}{let j=p[a++],v=p[a++],B=p[a++],P=p[a++];if((128&j)>0||(128&v)>0||(128&B)>0||(128&P)>0)return void(a-=12);if(e<14){if(e===12)return _(t,n,o,f,l,c,U,w,j,v,B,P);{let N=p[a++];return(128&N)>0?void(a-=13):_(t,n,o,f,l,c,U,w,j,v,B,P,N)}}{let N=p[a++],F=p[a++];if((128&N)>0||(128&F)>0)return void(a-=14);if(e<15)return _(t,n,o,f,l,c,U,w,j,v,B,P,N,F);let J=p[a++];return(128&J)>0?void(a-=15):_(t,n,o,f,l,c,U,w,j,v,B,P,N,F,J)}}}}}let We=new Float32Array(1),ye=new Uint8Array(We.buffer,0,4);new Array(4096);class q{constructor(t,n){this.value=t,this.tag=n}}x[0]=e=>new Date(e),x[1]=e=>new Date(Math.round(1e3*e)),x[2]=e=>{let t=BigInt(0);for(let n=0,o=e.byteLength;n<o;n++)t=BigInt(e[n])+t<<BigInt(8);return t},x[3]=e=>BigInt(-1)-x[2](e),x[4]=e=>+(e[1]+"e"+e[0]),x[5]=e=>e[1]*Math.exp(e[0]*Math.log(2));const Me=(e,t)=>{let n=I[e-=57344];n&&n.isShared&&((I.restoreStructures||(I.restoreStructures=[]))[e]=n),I[e]=t,t.read=Ue(t)};x[105]=e=>{let t=e.length,n=e[1];Me(e[0],n);let o={};for(let f=2;f<t;f++)o[C(n[f-2])]=e[f];return o},x[14]=e=>V?V[0].slice(V.position0,V.position0+=e):new q(e,14),x[15]=e=>V?V[1].slice(V.position1,V.position1+=e):new q(e,15);let ot={Error,RegExp};x[27]=e=>(ot[e[0]]||Error)(e[1],e[2]);const Je=e=>{if(p[a++]!=132){let n=new Error("Packed values structure must be followed by a 4 element array");throw p.length<a&&(n.incomplete=!0),n}let t=e();if(!t||!t.length){let n=new Error("Packed values structure must be followed by a 4 element array");throw n.incomplete=!0,n}return K=K?t.concat(K.slice(t.length)):t,K.prefixes=e(),K.suffixes=e(),e()};function ee(e,t){return typeof e=="string"?e+t:e instanceof Array?e.concat(t):Object.assign({},e,t)}function Y(){if(!K){if(!O.getShared)throw new Error("No packed values available");Se()}return K}Je.handlesRead=!0,x[51]=Je,x[6]=e=>{if(!K){if(!O.getShared)return new q(e,6);Se()}if(typeof e=="number")return K[16+(e>=0?2*e:-2*e-1)];let t=new Error("No support for non-integer packed references yet");throw e===void 0&&(t.incomplete=!0),t},x[28]=e=>{z||(z=new Map,z.id=0);let t,n=z.id++;t=p[a]>>5==4?[]:{};let o={target:t};z.set(n,o);let f=e();return o.used?Object.assign(t,f):(o.target=f,f)},x[28].handlesRead=!0,x[29]=e=>{let t=z.get(e);return t.used=!0,t.target},x[258]=e=>new Set(e),(x[259]=e=>(O.mapsAsObjects&&(O.mapsAsObjects=!1,ie=!0),e())).handlesRead=!0,ke.push((e,t)=>e>=225&&e<=255?ee(Y().prefixes[e-224],t):e>=28704&&e<=32767?ee(Y().prefixes[e-28672],t):e>=1879052288&&e<=2147483647?ee(Y().prefixes[e-1879048192],t):e>=216&&e<=223?ee(t,Y().suffixes[e-216]):e>=27647&&e<=28671?ee(t,Y().suffixes[e-27639]):e>=1811940352&&e<=1879048191?ee(t,Y().suffixes[e-1811939328]):e==1399353956?{packedValues:K,structures:I.slice(0),version:t}:e==55799?t:void 0);const at=new Uint8Array(new Uint16Array([1]).buffer)[0]==1,He=[Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array,typeof BigUint64Array>"u"?{name:"BigUint64Array"}:BigUint64Array,Int8Array,Int16Array,Int32Array,typeof BigInt64Array>"u"?{name:"BigInt64Array"}:BigInt64Array,Float32Array,Float64Array],lt=[64,68,69,70,71,72,77,78,79,85,86];for(let e=0;e<He.length;e++)ut(He[e],lt[e]);function ut(e,t){let n,o="get"+e.name.slice(0,-5);typeof e=="function"?n=e.BYTES_PER_ELEMENT:e=null;for(let f=0;f<2;f++){if(!f&&n==1)continue;let l=n==2?1:n==4?2:3;x[f?t:t-4]=n==1||f==at?c=>{if(!e)throw new Error("Could not find typed array for code "+t);return O.copyBuffers||n!==1&&(n!==2||1&c.byteOffset)&&(n!==4||3&c.byteOffset)&&(n!==8||7&c.byteOffset)?new e(Uint8Array.prototype.slice.call(c,0).buffer):new e(c.buffer,c.byteOffset,c.byteLength)}:c=>{if(!e)throw new Error("Could not find typed array for code "+t);let U=new DataView(c.buffer,c.byteOffset,c.byteLength),w=c.length>>l,j=new e(w),v=U[o];for(let B=0;B<w;B++)j[B]=v.call(U,B<<l,f);return j}}}function te(){let e=31&p[a++];if(e>23)switch(e){case 24:e=p[a++];break;case 25:e=T.getUint16(a),a+=2;break;case 26:e=T.getUint32(a),a+=4}return e}function Se(){if(O.getShared){let e=$e(()=>(p=null,O.getShared()))||{},t=e.structures||[];O.sharedVersion=e.version,K=O.sharedValues=e.packedValues,I===!0?O.structures=I=t:I.splice.apply(I,[0,t.length].concat(t))}}function $e(e){let t=Z,n=a,o=de,f=oe,l=ce,c=z,U=V,w=new Uint8Array(p.slice(0,Z)),j=I,v=O,B=ae,P=e();return Z=t,a=n,de=o,oe=f,ce=l,z=c,V=U,p=w,ae=B,I=j,O=v,T=new DataView(p.buffer,p.byteOffset,p.byteLength),P}function je(){p=null,z=null,I=null}const Ee=new Array(147);for(let e=0;e<256;e++)Ee[e]=+("1e"+Math.floor(45.15-.30103*e));let pe,Ie,Ze,Be=new ue({useRecords:!1});Be.decode,Be.decodeMultiple;try{pe=new TextEncoder}catch{}const ge=typeof globalThis=="object"&&globalThis.Buffer,le=ge!==void 0,xe=le?ge.allocUnsafeSlow:Uint8Array,qe=le?ge:Uint8Array,Ye=le?4294967296:2144337920;let Ve,s,E,$,r=0,R=null;const ft=/[\u0080-\uFFFF]/,D=Symbol("record-id");class Ge extends ue{constructor(t){let n,o,f,l,c;super(t),this.offset=0,t=t||{};let U=qe.prototype.utf8Write?function(i,d,h){return s.utf8Write(i,d,h)}:!(!pe||!pe.encodeInto)&&function(i,d){return pe.encodeInto(i,s.subarray(d)).written},w=this,j=t.structures||t.saveStructures,v=t.maxSharedStructures;if(v==null&&(v=j?128:0),v>8190)throw new Error("Maximum maxSharedStructure is 8190");let B=t.sequential;B&&(v=0),this.structures||(this.structures=[]),this.saveStructures&&(this.saveShared=this.saveStructures);let P,N,F,J=t.sharedValues;if(J){F=Object.create(null);for(let i=0,d=J.length;i<d;i++)F[J[i]]=i}let H=[],be=0,fe=0;this.mapEncode=function(i,d){return this._keyMap&&!this._mapped&&i.constructor.name==="Array"&&(i=i.map(h=>this.encodeKeys(h))),this.encode(i,d)},this.encode=function(i,d){if(s||(s=new xe(8192),E=new DataView(s.buffer,0,8192),r=0),$=s.length-10,$-r<2048?(s=new xe(s.length),E=new DataView(s.buffer,0,s.length),$=s.length-10,r=0):d===rt&&(r=r+7&2147483640),n=r,w.useSelfDescribedHeader&&(E.setUint32(r,3654940416),r+=3),c=w.structuredClone?new Map:null,w.bundleStrings&&typeof i!="string"?(R=[],R.size=1/0):R=null,o=w.structures,o){if(o.uninitialized){let y=w.getShared()||{};w.structures=o=y.structures||[],w.sharedVersion=y.version;let u=w.sharedValues=y.packedValues;if(u){F={};for(let g=0,b=u.length;g<b;g++)F[u[g]]=g}}let h=o.length;if(h>v&&!B&&(h=v),!o.transitions){o.transitions=Object.create(null);for(let y=0;y<h;y++){let u=o[y];if(!u)continue;let g,b=o.transitions;for(let m=0,k=u.length;m<k;m++){b[D]===void 0&&(b[D]=y);let A=u[m];g=b[A],g||(g=b[A]=Object.create(null)),b=g}b[D]=1048576|y}}B||(o.nextId=h)}if(f&&(f=!1),l=o||[],N=F,t.pack){let h=new Map;if(h.values=[],h.encoder=w,h.maxValues=t.maxPrivatePackedValues||(F?16:1/0),h.objectMap=F||!1,h.samplingPackedValues=P,we(i,h),h.values.length>0){s[r++]=216,s[r++]=51,L(4);let y=h.values;S(y),L(0),L(0),N=Object.create(F||null);for(let u=0,g=y.length;u<g;u++)N[y[u]]=u}}Ve=d&Pe;try{if(Ve)return;if(S(i),R&&tt(n,S),w.offset=r,c&&c.idsToInsert){r+=2*c.idsToInsert.length,r>$&&re(r),w.offset=r;let h=function(y,u){let g,b=2*u.length,m=y.length-b;u.sort((k,A)=>k.offset>A.offset?1:-1);for(let k=0;k<u.length;k++){let A=u[k];A.id=k;for(let se of A.references)y[se++]=k>>8,y[se]=255&k}for(;g=u.pop();){let k=g.offset;y.copyWithin(k+b,k,m),b-=2;let A=k+b;y[A++]=216,y[A++]=28,m=k}return y}(s.subarray(n,r),c.idsToInsert);return c=null,h}return d&rt?(s.start=n,s.end=r,s):s.subarray(n,r)}finally{if(o){if(fe<10&&fe++,o.length>v&&(o.length=v),be>1e4)o.transitions=null,fe=0,be=0,H.length>0&&(H=[]);else if(H.length>0&&!B){for(let h=0,y=H.length;h<y;h++)H[h][D]=void 0;H=[]}}if(f&&w.saveShared){w.structures.length>v&&(w.structures=w.structures.slice(0,v));let h=s.subarray(n,r);return w.updateSharedData()===!1?w.encode(i):h}d&ht&&(r=n)}},this.findCommonStringsToPack=()=>(P=new Map,F||(F=Object.create(null)),i=>{let d=i&&i.threshold||4,h=this.pack?i.maxPrivatePackedValues||16:0;J||(J=this.sharedValues=[]);for(let[y,u]of P)u.count>d&&(F[y]=h++,J.push(y),f=!0);for(;this.saveShared&&this.updateSharedData()===!1;);P=null});const S=i=>{r>$&&(s=re(r));var d,h=typeof i;if(h==="string"){if(N){let b=N[i];if(b>=0)return void(b<16?s[r++]=b+224:(s[r++]=198,S(1&b?15-b>>1:b-16>>1)));if(P&&!t.pack){let m=P.get(i);m?m.count++:P.set(i,{count:1})}}let y,u=i.length;if(R&&u>=4&&u<1024){if((R.size+=u)>61440){let m,k=(R[0]?3*R[0].length+R[1].length:0)+10;r+k>$&&(s=re(r+k)),s[r++]=217,s[r++]=223,s[r++]=249,s[r++]=R.position?132:130,s[r++]=26,m=r-n,r+=4,R.position&&tt(n,S),R=["",""],R.size=0,R.position=m}let b=ft.test(i);return R[b?0:1]+=i,s[r++]=b?206:207,void S(u)}y=u<32?1:u<256?2:u<65536?3:5;let g=3*u;if(r+g>$&&(s=re(r+g)),u<64||!U){let b,m,k,A=r+y;for(b=0;b<u;b++)m=i.charCodeAt(b),m<128?s[A++]=m:m<2048?(s[A++]=m>>6|192,s[A++]=63&m|128):(64512&m)==55296&&(64512&(k=i.charCodeAt(b+1)))==56320?(m=65536+((1023&m)<<10)+(1023&k),b++,s[A++]=m>>18|240,s[A++]=m>>12&63|128,s[A++]=m>>6&63|128,s[A++]=63&m|128):(s[A++]=m>>12|224,s[A++]=m>>6&63|128,s[A++]=63&m|128);d=A-r-y}else d=U(i,r+y,g);d<24?s[r++]=96|d:d<256?(y<2&&s.copyWithin(r+2,r+1,r+1+d),s[r++]=120,s[r++]=d):d<65536?(y<3&&s.copyWithin(r+3,r+2,r+2+d),s[r++]=121,s[r++]=d>>8,s[r++]=255&d):(y<5&&s.copyWithin(r+5,r+3,r+3+d),s[r++]=122,E.setUint32(r,d),r+=4),r+=d}else if(h==="number")if(this.alwaysUseFloat||i>>>0!==i)if(this.alwaysUseFloat||i>>0!==i){let y;if((y=this.useFloat32)>0&&i<4294967296&&i>=-2147483648){let u;if(s[r++]=250,E.setFloat32(r,i),y<4||(u=i*Ee[(127&s[r])<<1|s[r+1]>>7])>>0===u)return void(r+=4);r--}s[r++]=251,E.setFloat64(r,i),r+=8}else i>=-24?s[r++]=31-i:i>=-256?(s[r++]=56,s[r++]=~i):i>=-65536?(s[r++]=57,E.setUint16(r,~i),r+=2):(s[r++]=58,E.setUint32(r,~i),r+=4);else i<24?s[r++]=i:i<256?(s[r++]=24,s[r++]=i):i<65536?(s[r++]=25,s[r++]=i>>8,s[r++]=255&i):(s[r++]=26,E.setUint32(r,i),r+=4);else if(h==="object")if(i){if(c){let u=c.get(i);if(u){if(s[r++]=216,s[r++]=29,s[r++]=25,!u.references){let g=c.idsToInsert||(c.idsToInsert=[]);u.references=[],g.push(u)}return u.references.push(r-n),void(r+=2)}c.set(i,{offset:r-n})}let y=i.constructor;if(y===Object)me(i,!0);else if(y===Array){(d=i.length)<24?s[r++]=128|d:L(d);for(let u=0;u<d;u++)S(i[u])}else if(y===Map)if((this.mapsAsObjects?this.useTag259ForMaps!==!1:this.useTag259ForMaps)&&(s[r++]=217,s[r++]=1,s[r++]=3),(d=i.size)<24?s[r++]=160|d:d<256?(s[r++]=184,s[r++]=d):d<65536?(s[r++]=185,s[r++]=d>>8,s[r++]=255&d):(s[r++]=186,E.setUint32(r,d),r+=4),w.keyMap)for(let[u,g]of i)S(w.encodeKey(u)),S(g);else for(let[u,g]of i)S(u),S(g);else{for(let u=0,g=Ie.length;u<g;u++)if(i instanceof Ze[u]){let b=Ie[u],m=b.tag;return m==null&&(m=b.getTag&&b.getTag.call(this,i)),m<24?s[r++]=192|m:m<256?(s[r++]=216,s[r++]=m):m<65536?(s[r++]=217,s[r++]=m>>8,s[r++]=255&m):m>-1&&(s[r++]=218,E.setUint32(r,m),r+=4),void b.encode.call(this,i,S,re)}if(i[Symbol.iterator]){if(Ve){let u=new Error("Iterable should be serialized as iterator");throw u.iteratorNotHandled=!0,u}s[r++]=159;for(let u of i)S(u);return void(s[r++]=255)}if(i[Symbol.asyncIterator]||Re(i)){let u=new Error("Iterable/blob should be serialized as iterator");throw u.iteratorNotHandled=!0,u}if(this.useToJSON&&i.toJSON){const u=i.toJSON();if(u!==i)return S(u)}me(i,!i.hasOwnProperty)}}else s[r++]=246;else if(h==="boolean")s[r++]=i?245:244;else if(h==="bigint"){if(i<BigInt(1)<<BigInt(64)&&i>=0)s[r++]=27,E.setBigUint64(r,i);else if(i>-(BigInt(1)<<BigInt(64))&&i<0)s[r++]=59,E.setBigUint64(r,-i-BigInt(1));else{if(!this.largeBigIntToFloat)throw new RangeError(i+" was too large to fit in CBOR 64-bit integer format, set largeBigIntToFloat to convert to float-64");s[r++]=251,E.setFloat64(r,Number(i))}r+=8}else{if(h!=="undefined")throw new Error("Unknown type: "+h);s[r++]=247}},me=this.useRecords===!1?this.variableMapSize?i=>{let d=Object.keys(i),h=Object.values(i),y=d.length;if(y<24?s[r++]=160|y:y<256?(s[r++]=184,s[r++]=y):y<65536?(s[r++]=185,s[r++]=y>>8,s[r++]=255&y):(s[r++]=186,E.setUint32(r,y),r+=4),w.keyMap)for(let u=0;u<y;u++)S(w.encodeKey(d[u])),S(h[u]);else for(let u=0;u<y;u++)S(d[u]),S(h[u])}:(i,d)=>{s[r++]=185;let h=r-n;r+=2;let y=0;if(w.keyMap)for(let u in i)(d||i.hasOwnProperty(u))&&(S(w.encodeKey(u)),S(i[u]),y++);else for(let u in i)(d||i.hasOwnProperty(u))&&(S(u),S(i[u]),y++);s[h+++n]=y>>8,s[h+n]=255&y}:(i,d)=>{let h,y,u,g=l.transitions||(l.transitions=Object.create(null)),b=0,m=0;if(this.keyMap){u=Object.keys(i).map(A=>this.encodeKey(A)),m=u.length;for(let A=0;A<m;A++){let se=u[A];h=g[se],h||(h=g[se]=Object.create(null),b++),g=h}}else for(let A in i)(d||i.hasOwnProperty(A))&&(h=g[A],h||(1048576&g[D]&&(y=65535&g[D]),h=g[A]=Object.create(null),b++),g=h,m++);let k=g[D];if(k!==void 0)k&=65535,s[r++]=217,s[r++]=k>>8|224,s[r++]=255&k;else{if(u||(u=g.__keys__||(g.__keys__=Object.keys(i))),y===void 0?(k=l.nextId++,k||(k=0,l.nextId=1),k>=256&&(l.nextId=(k=v)+1)):k=y,l[k]=u,!(k<v)){if(g[D]=k,E.setUint32(r,3655335680),r+=3,b&&(be+=fe*b),H.length>=256-v&&(H.shift()[D]=void 0),H.push(g),L(m+2),S(57344+k),S(u),d===null)return;for(let A in i)(d||i.hasOwnProperty(A))&&S(i[A]);return}s[r++]=217,s[r++]=k>>8|224,s[r++]=255&k,g=l.transitions;for(let A=0;A<m;A++)(g[D]===void 0||1048576&g[D])&&(g[D]=k),g=g[u[A]];g[D]=1048576|k,f=!0}if(m<24?s[r++]=128|m:L(m),d!==null)for(let A in i)(d||i.hasOwnProperty(A))&&S(i[A])},re=i=>{let d;if(i>16777216){if(i-n>Ye)throw new Error("Encoded buffer would be larger than maximum buffer size");d=Math.min(Ye,4096*Math.round(Math.max((i-n)*(i>67108864?1.25:2),4194304)/4096))}else d=1+(Math.max(i-n<<2,s.length-1)>>12)<<12;let h=new xe(d);return E=new DataView(h.buffer,0,d),s.copy?s.copy(h,0,n,i):h.set(s.slice(n,i)),r-=n,n=0,$=h.length-10,s=h};let G=100,Fe=1e3;function*Q(i,d,h){let y=i.constructor;if(y===Object){let u=w.useRecords!==!1;u?me(i,null):Qe(Object.keys(i).length,160);for(let g in i){let b=i[g];u||S(g),b&&typeof b=="object"?d[g]?yield*Q(b,d[g]):yield*Ae(b,d,g):S(b)}}else if(y===Array){let u=i.length;L(u);for(let g=0;g<u;g++){let b=i[g];b&&(typeof b=="object"||r-n>G)?d.element?yield*Q(b,d.element):yield*Ae(b,d,"element"):S(b)}}else if(i[Symbol.iterator]){s[r++]=159;for(let u of i)u&&(typeof u=="object"||r-n>G)?d.element?yield*Q(u,d.element):yield*Ae(u,d,"element"):S(u);s[r++]=255}else Re(i)?(Qe(i.size,64),yield s.subarray(n,r),yield i,ne()):i[Symbol.asyncIterator]?(s[r++]=159,yield s.subarray(n,r),yield i,ne(),s[r++]=255):S(i);h&&r>n?yield s.subarray(n,r):r-n>G&&(yield s.subarray(n,r),ne())}function*Ae(i,d,h){let y=r-n;try{S(i),r-n>G&&(yield s.subarray(n,r),ne())}catch(u){if(!u.iteratorNotHandled)throw u;d[h]={},r=n+y,yield*Q.call(this,i,d[h])}}function ne(){G=Fe,w.encode(null,Pe)}function Te(i,d,h){return G=d&&d.chunkThreshold?Fe=d.chunkThreshold:100,i&&typeof i=="object"?(w.encode(null,Pe),h(i,w.iterateProperties||(w.iterateProperties={}),!0)):[w.encode(i)]}async function*Ke(i,d){for(let h of Q(i,d,!0)){let y=h.constructor;if(y===qe||y===Uint8Array)yield h;else if(Re(h)){let u,g=h.stream().getReader();for(;!(u=await g.read()).done;)yield u.value}else if(h[Symbol.asyncIterator])for await(let u of h)ne(),u?yield*Ke(u,d.async||(d.async={})):yield w.encode(u);else yield h}}this.encodeAsIterable=function(i,d){return Te(i,d,Q)},this.encodeAsAsyncIterable=function(i,d){return Te(i,d,Ke)}}useBuffer(t){s=t,E=new DataView(s.buffer,s.byteOffset,s.byteLength),r=0}clearSharedData(){this.structures&&(this.structures=[]),this.sharedValues&&(this.sharedValues=void 0)}updateSharedData(){let t=this.sharedVersion||0;this.sharedVersion=t+1;let n=this.structures.slice(0),o=new Xe(n,this.sharedValues,this.sharedVersion),f=this.saveShared(o,l=>(l&&l.version||0)==t);return f===!1?(o=this.getShared()||{},this.structures=o.structures||[],this.sharedValues=o.packedValues,this.sharedVersion=o.version,this.structures.nextId=this.structures.length):n.forEach((l,c)=>this.structures[c]=l),f}}function Qe(e,t){e<24?s[r++]=t|e:e<256?(s[r++]=24|t,s[r++]=e):e<65536?(s[r++]=25|t,s[r++]=e>>8,s[r++]=255&e):(s[r++]=26|t,E.setUint32(r,e),r+=4)}class Xe{constructor(t,n,o){this.structures=t,this.packedValues=n,this.version=o}}function L(e){e<24?s[r++]=128|e:e<256?(s[r++]=152,s[r++]=e):e<65536?(s[r++]=153,s[r++]=e>>8,s[r++]=255&e):(s[r++]=154,E.setUint32(r,e),r+=4)}const ct=typeof Blob>"u"?function(){}:Blob;function Re(e){if(e instanceof ct)return!0;let t=e[Symbol.toStringTag];return t==="Blob"||t==="File"}function we(e,t){switch(typeof e){case"string":if(e.length>3){if(t.objectMap[e]>-1||t.values.length>=t.maxValues)return;let o=t.get(e);if(o)++o.count==2&&t.values.push(e);else if(t.set(e,{count:1}),t.samplingPackedValues){let f=t.samplingPackedValues.get(e);f?f.count++:t.samplingPackedValues.set(e,{count:1})}}break;case"object":if(e)if(e instanceof Array)for(let o=0,f=e.length;o<f;o++)we(e[o],t);else{let o=!t.encoder.useRecords;for(var n in e)e.hasOwnProperty(n)&&(o&&we(n,t),we(e[n],t))}break;case"function":console.log(e)}}const dt=new Uint8Array(new Uint16Array([1]).buffer)[0]==1;function W(e,t){return!dt&&t>1&&(e-=4),{tag:e,encode:function(n,o){let f=n.byteLength,l=n.byteOffset||0,c=n.buffer||n;o(le?ge.from(c,l,f):new Uint8Array(c,l,f))}}}function et(e,t){let n=e.byteLength;n<24?s[r++]=64+n:n<256?(s[r++]=88,s[r++]=n):n<65536?(s[r++]=89,s[r++]=n>>8,s[r++]=255&n):(s[r++]=90,E.setUint32(r,n),r+=4),r+n>=s.length&&t(r+n),s.set(e.buffer?e:new Uint8Array(e),r),r+=n}function tt(e,t){E.setUint32(R.position+e,r-R.position-e+1);let n=R;R=null,t(n[0]),t(n[1])}Ze=[Date,Set,Error,RegExp,q,ArrayBuffer,Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array,typeof BigUint64Array>"u"?function(){}:BigUint64Array,Int8Array,Int16Array,Int32Array,typeof BigInt64Array>"u"?function(){}:BigInt64Array,Float32Array,Float64Array,Xe],Ie=[{tag:1,encode(e,t){let n=e.getTime()/1e3;(this.useTimestamp32||e.getMilliseconds()===0)&&n>=0&&n<4294967296?(s[r++]=26,E.setUint32(r,n),r+=4):(s[r++]=251,E.setFloat64(r,n),r+=8)}},{tag:258,encode(e,t){t(Array.from(e))}},{tag:27,encode(e,t){t([e.name,e.message])}},{tag:27,encode(e,t){t(["RegExp",e.source,e.flags])}},{getTag:e=>e.tag,encode(e,t){t(e.value)}},{encode(e,t,n){et(e,n)}},{getTag(e){if(e.constructor===Uint8Array&&(this.tagUint8Array||le&&this.tagUint8Array!==!1))return 64},encode(e,t,n){et(e,n)}},W(68,1),W(69,2),W(70,4),W(71,8),W(72,1),W(77,2),W(78,4),W(79,8),W(85,4),W(86,8),{encode(e,t){let n=e.packedValues||[],o=e.structures||[];if(n.values.length>0){s[r++]=216,s[r++]=51,L(4);let f=n.values;t(f),L(0),L(0),packedObjectMap=Object.create(sharedPackedObjectMap||null);for(let l=0,c=f.length;l<c;l++)packedObjectMap[f[l]]=l}if(o){E.setUint32(r,3655335424),r+=3;let f=o.slice(0);f.unshift(57344),f.push(new q(e.version,1399353956)),t(f)}else t(new q(e.version,1399353956))}}];let _e=new Ge({useRecords:!1});_e.encode,_e.encodeAsIterable,_e.encodeAsAsyncIterable;const rt=512,ht=1024,Pe=2048;export{Ge as E};
