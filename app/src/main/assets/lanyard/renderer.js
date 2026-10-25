(()=>{var rT=Object.create;var yv=Object.defineProperty;var oT=Object.getOwnPropertyDescriptor;var lT=Object.getOwnPropertyNames;var cT=Object.getPrototypeOf,uT=Object.prototype.hasOwnProperty;var ji=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var hT=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of lT(t))!uT.call(e,s)&&s!==n&&yv(e,s,{get:()=>t[s],enumerable:!(i=oT(t,s))||i.enumerable});return e};var Qa=(e,t,n)=>(n=e!=null?rT(cT(e)):{},hT(t||!e||!e.__esModule?yv(n,"default",{value:e,enumerable:!0}):n,e));var Uv=ji(Jt=>{"use strict";var Dp=Symbol.for("react.transitional.element"),fT=Symbol.for("react.portal"),dT=Symbol.for("react.fragment"),pT=Symbol.for("react.strict_mode"),mT=Symbol.for("react.profiler"),gT=Symbol.for("react.consumer"),_T=Symbol.for("react.context"),vT=Symbol.for("react.forward_ref"),yT=Symbol.for("react.suspense"),xT=Symbol.for("react.memo"),Ev=Symbol.for("react.lazy"),ST=Symbol.for("react.activity"),MT=Symbol.for("react.view_transition"),xv=Symbol.iterator;function bT(e){return e===null||typeof e!="object"?null:(e=xv&&e[xv]||e["@@iterator"],typeof e=="function"?e:null)}var Tv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Av=Object.assign,wv={};function Xr(e,t,n){this.props=e,this.context=t,this.refs=wv,this.updater=n||Tv}Xr.prototype.isReactComponent={};Xr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Cv(){}Cv.prototype=Xr.prototype;function Up(e,t,n){this.props=e,this.context=t,this.refs=wv,this.updater=n||Tv}var Lp=Up.prototype=new Cv;Lp.constructor=Up;Av(Lp,Xr.prototype);Lp.isPureReactComponent=!0;var Sv=Array.isArray;function Np(){}var De={H:null,A:null,T:null,S:null},Rv=Object.prototype.hasOwnProperty;function Ip(e,t,n){var i=n.ref;return{$$typeof:Dp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function ET(e,t){return Ip(e.type,t,e.props)}function Op(e){return typeof e=="object"&&e!==null&&e.$$typeof===Dp}function TT(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Mv=/\/+/g;function Rp(e,t){return typeof e=="object"&&e!==null&&e.key!=null?TT(""+e.key):t.toString(36)}function AT(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Np,Np):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function kr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Dp:case fT:r=!0;break;case Ev:return r=e._init,kr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Rp(e,0):i,Sv(s)?(n="",r!=null&&(n=r.replace(Mv,"$&/")+"/"),kr(s,t,n,"",function(c){return c})):s!=null&&(Op(s)&&(s=ET(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(Mv,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(Sv(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Rp(i,l),r+=kr(i,t,n,a,s);else if(l=bT(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Rp(i,l++),r+=kr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return kr(AT(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Ou(e,t,n){if(e==null)return e;var i=[],s=0;return kr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function wT(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var bv=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Nv(e){var t=De.T,n={};n.types=t!==null?t.types:null,De.T=n;try{var i=e(),s=De.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Np,bv)}catch(a){bv(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),De.T=t}}function Dv(e){var t=De.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else Nv(Dv.bind(null,e))}var CT={map:Ou,forEach:function(e,t,n){Ou(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ou(e,function(){t++}),t},toArray:function(e){return Ou(e,function(t){return t})||[]},only:function(e){if(!Op(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Jt.Activity=ST;Jt.Children=CT;Jt.Component=Xr;Jt.Fragment=dT;Jt.Profiler=mT;Jt.PureComponent=Up;Jt.StrictMode=pT;Jt.Suspense=yT;Jt.ViewTransition=MT;Jt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=De;Jt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return De.H.useMemoCache(e)}};Jt.addTransitionType=Dv;Jt.cache=function(e){return function(){return e.apply(null,arguments)}};Jt.cacheSignal=function(){return null};Jt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Av({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!Rv.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return Ip(e.type,s,i)};Jt.createContext=function(e){return e={$$typeof:_T,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:gT,_context:e},e};Jt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)Rv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return Ip(e,a,s)};Jt.createRef=function(){return{current:null}};Jt.forwardRef=function(e){return{$$typeof:vT,render:e}};Jt.isValidElement=Op;Jt.lazy=function(e){return{$$typeof:Ev,_payload:{_status:-1,_result:e},_init:wT}};Jt.memo=function(e,t){return{$$typeof:xT,type:e,compare:t===void 0?null:t}};Jt.startTransition=Nv;Jt.unstable_useCacheRefresh=function(){return De.H.useCacheRefresh()};Jt.use=function(e){return De.H.use(e)};Jt.useActionState=function(e,t,n){return De.H.useActionState(e,t,n)};Jt.useCallback=function(e,t){return De.H.useCallback(e,t)};Jt.useContext=function(e){return De.H.useContext(e)};Jt.useDebugValue=function(){};Jt.useDeferredValue=function(e,t){return De.H.useDeferredValue(e,t)};Jt.useEffect=function(e,t){return De.H.useEffect(e,t)};Jt.useEffectEvent=function(e){return De.H.useEffectEvent(e)};Jt.useId=function(){return De.H.useId()};Jt.useImperativeHandle=function(e,t,n){return De.H.useImperativeHandle(e,t,n)};Jt.useInsertionEffect=function(e,t){return De.H.useInsertionEffect(e,t)};Jt.useLayoutEffect=function(e,t){return De.H.useLayoutEffect(e,t)};Jt.useMemo=function(e,t){return De.H.useMemo(e,t)};Jt.useOptimistic=function(e,t){return De.H.useOptimistic(e,t)};Jt.useReducer=function(e,t,n){return De.H.useReducer(e,t,n)};Jt.useRef=function(e){return De.H.useRef(e)};Jt.useState=function(e){return De.H.useState(e)};Jt.useSyncExternalStore=function(e,t,n){return De.H.useSyncExternalStore(e,t,n)};Jt.useTransition=function(){return De.H.useTransition()};Jt.version="19.3.1"});var Pl=ji((cL,Lv)=>{"use strict";Lv.exports=Uv()});var kv=ji(Fe=>{"use strict";function Fp(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<Pu(s,t))e[i]=t,e[n]=s,n=i;else break t}}function $i(e){return e.length===0?null:e[0]}function zu(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>Pu(o,n))l<s&&0>Pu(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>Pu(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function Pu(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Fe.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(Iv=performance,Fe.unstable_now=function(){return Iv.now()}):(Pp=Date,Ov=Pp.now(),Fe.unstable_now=function(){return Pp.now()-Ov});var Iv,Pp,Ov,Es=[],$s=[],RT=1,bi=null,Tn=3,Hp=!1,Bl=!1,zl=!1,Vp=!1,zv=typeof setTimeout=="function"?setTimeout:null,Fv=typeof clearTimeout=="function"?clearTimeout:null,Pv=typeof setImmediate<"u"?setImmediate:null;function Bu(e){for(var t=$i($s);t!==null;){if(t.callback===null)zu($s);else if(t.startTime<=e)zu($s),t.sortIndex=t.expirationTime,Fp(Es,t);else break;t=$i($s)}}function Gp(e){if(zl=!1,Bu(e),!Bl)if($i(Es)!==null)Bl=!0,qr||(qr=!0,Wr());else{var t=$i($s);t!==null&&kp(Gp,t.startTime-e)}}var qr=!1,Fl=-1,Hv=5,Vv=-1;function Gv(){return Vp?!0:!(Fe.unstable_now()-Vv<Hv)}function Bp(){if(Vp=!1,qr){var e=Fe.unstable_now();Vv=e;var t=!0;try{t:{Bl=!1,zl&&(zl=!1,Fv(Fl),Fl=-1),Hp=!0;var n=Tn;try{e:{for(Bu(e),bi=$i(Es);bi!==null&&!(bi.expirationTime>e&&Gv());){var i=bi.callback;if(typeof i=="function"){bi.callback=null,Tn=bi.priorityLevel;var s=i(bi.expirationTime<=e);if(e=Fe.unstable_now(),typeof s=="function"){bi.callback=s,Bu(e),t=!0;break e}bi===$i(Es)&&zu(Es),Bu(e)}else zu(Es);bi=$i(Es)}if(bi!==null)t=!0;else{var a=$i($s);a!==null&&kp(Gp,a.startTime-e),t=!1}}break t}finally{bi=null,Tn=n,Hp=!1}t=void 0}}finally{t?Wr():qr=!1}}}var Wr;typeof Pv=="function"?Wr=function(){Pv(Bp)}:typeof MessageChannel<"u"?(zp=new MessageChannel,Bv=zp.port2,zp.port1.onmessage=Bp,Wr=function(){Bv.postMessage(null)}):Wr=function(){zv(Bp,0)};var zp,Bv;function kp(e,t){Fl=zv(function(){e(Fe.unstable_now())},t)}Fe.unstable_IdlePriority=5;Fe.unstable_ImmediatePriority=1;Fe.unstable_LowPriority=4;Fe.unstable_NormalPriority=3;Fe.unstable_Profiling=null;Fe.unstable_UserBlockingPriority=2;Fe.unstable_cancelCallback=function(e){e.callback=null};Fe.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Hv=0<e?Math.floor(1e3/e):5};Fe.unstable_getCurrentPriorityLevel=function(){return Tn};Fe.unstable_next=function(e){switch(Tn){case 1:case 2:case 3:var t=3;break;default:t=Tn}var n=Tn;Tn=t;try{return e()}finally{Tn=n}};Fe.unstable_requestPaint=function(){Vp=!0};Fe.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Tn;Tn=e;try{return t()}finally{Tn=n}};Fe.unstable_scheduleCallback=function(e,t,n){var i=Fe.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:RT++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,Fp($s,e),$i(Es)===null&&e===$i($s)&&(zl?(Fv(Fl),Fl=-1):zl=!0,kp(Gp,n-i))):(e.sortIndex=s,Fp(Es,e),Bl||Hp||(Bl=!0,qr||(qr=!0,Wr()))),e};Fe.unstable_shouldYield=Gv;Fe.unstable_wrapCallback=function(e){var t=Tn;return function(){var n=Tn;Tn=t;try{return e.apply(this,arguments)}finally{Tn=n}}}});var Wv=ji((hL,Xv)=>{"use strict";Xv.exports=kv()});var Zv=ji(An=>{"use strict";var NT=Pl();function Yv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ta(){}var Ln={d:{f:ta,r:function(){throw Error(Yv(522))},D:ta,C:ta,L:ta,m:ta,X:ta,S:ta,M:ta},p:0,findDOMNode:null},DT=Symbol.for("react.portal"),UT=Symbol.for("react.recoverable"),qv=Symbol.for("react.optimistic_key");function LT(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:DT,key:i==null?null:i===qv?qv:""+i,children:e,containerInfo:t,implementation:n}}var Hl=NT.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Fu(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}An.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ln;An.browser=function(e){return{$$typeof:UT,_reason:e}};An.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Yv(299));return LT(e,t,null,n)};An.flushSync=function(e){var t=Hl.T,n=Ln.p;try{if(Hl.T=null,Ln.p=2,e)return e()}finally{Hl.T=t,Ln.p=n,Ln.d.f()}};An.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Ln.d.C(e,t))};An.prefetchDNS=function(e){typeof e=="string"&&Ln.d.D(e)};An.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Fu(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Ln.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&Ln.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};An.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Fu(t.as,t.crossOrigin);Ln.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&Ln.d.M(e)};An.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Fu(n,t.crossOrigin);Ln.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};An.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Fu(t.as,t.crossOrigin);Ln.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else Ln.d.m(e)};An.requestFormReset=function(e){Ln.d.r(e)};An.unstable_batchedUpdates=function(e,t){return e(t)};An.useFormState=function(e,t,n){return Hl.H.useFormState(e,t,n)};An.useFormStatus=function(){return Hl.H.useHostTransitionStatus()};An.version="19.3.1"});var Qv=ji((dL,Kv)=>{"use strict";function Jv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jv)}catch(e){console.error(e)}}Jv(),Kv.exports=Zv()});var Bb=ji(Sf=>{"use strict";var on=Wv(),Px=Pl(),IT=Qv();function tt(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Bx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wc(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function zx(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Fx(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function jv(e){if(wc(e)!==e)throw Error(tt(188))}function OT(e){var t=e.alternate;if(!t){if(t=wc(e),t===null)throw Error(tt(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return jv(s),e;if(a===i)return jv(s),t;a=a.sibling}throw Error(tt(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(tt(189))}}if(n.alternate!==i)throw Error(tt(190))}if(n.tag!==3)throw Error(tt(188));return n.stateNode.current===n?e:t}function Hx(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Hx(e),t!==null)return t;e=e.sibling}return null}function Jn(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&Jn(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function vr(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function $v(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function Vx(e){var t=[null,null],n=vr(e);return n===null||Gx(t,e,n.child,{foundSelf:!1}),t}function Gx(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Gx(e,t,n.child,i))return!0;n=n.sibling}return!1}function rn(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(tt(559))}}var $r=null,Sm=null;function PT(e,t,n){return e===n?!0:e===t?($r=e,!0):!1}function BT(e,t,n){return e===n?(Sm=e,!1):e===t?(Sm!==null&&($r=e),!0):!1}function ty(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Mm(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var Re=Object.assign,zT=Symbol.for("react.element"),Hu=Symbol.for("react.transitional.element"),Yl=Symbol.for("react.portal"),to=Symbol.for("react.fragment"),kx=Symbol.for("react.strict_mode"),bm=Symbol.for("react.profiler"),Xx=Symbol.for("react.consumer"),as=Symbol.for("react.context"),Ug=Symbol.for("react.forward_ref"),Em=Symbol.for("react.suspense"),Tm=Symbol.for("react.suspense_list"),Lg=Symbol.for("react.memo"),sa=Symbol.for("react.lazy"),Am=Symbol.for("react.activity"),FT=Symbol.for("react.legacy_hidden"),HT=Symbol.for("react.memo_cache_sentinel"),wm=Symbol.for("react.view_transition"),VT=Symbol.for("react.recoverable"),ey=Symbol.iterator;function Vl(e){return e===null||typeof e!="object"?null:(e=ey&&e[ey]||e["@@iterator"],typeof e=="function"?e:null)}var GT=Symbol.for("react.client.reference");function Cm(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===GT?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case to:return"Fragment";case bm:return"Profiler";case kx:return"StrictMode";case Em:return"Suspense";case Tm:return"SuspenseList";case Am:return"Activity";case wm:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Yl:return"Portal";case as:return e.displayName||"Context";case Xx:return(e._context.displayName||"Context")+".Consumer";case Ug:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Lg:return t=e.displayName||null,t!==null?t:Cm(e.type)||"Memo";case sa:t=e._payload,e=e._init;try{return Cm(e(t))}catch{}}return null}var Zl=Array.isArray,qt=Px.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,_e=IT.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ar={pending:!1,data:null,method:null,action:null},Rm=[],eo=-1;function fs(e){return{current:e}}function xn(e){0>eo||(e.current=Rm[eo],Rm[eo]=null,eo--)}function Ie(e,t){eo++,Rm[eo]=e.current,e.current=t}var cs=fs(null),hc=fs(null),da=fs(null),Ah=fs(null);function wh(e,t){switch(Ie(da,t),Ie(hc,e),Ie(cs,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mx(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mx(t),e=fb(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}xn(cs),Ie(cs,e)}function Mo(){xn(cs),xn(hc),xn(da)}function Nm(e){var t=e.memoizedState;t!==null&&(Uo._currentValue=t.memoizedState,Ie(Ah,e)),t=cs.current;var n=fb(t,e.type);t!==n&&(Ie(hc,e),Ie(cs,n))}function Ch(e){hc.current===e&&(xn(cs),xn(hc)),Ah.current===e&&(xn(Ah),Uo._currentValue=ar)}var Xp,ny;function na(e){if(Xp===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Xp=t&&t[1]||"",ny=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Xp+e+ny}var Wp=!1;function qp(e,t){if(!e||Wp)return"";Wp=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(g){var u=g}Reflect.construct(e,[],p)}else{try{p.call()}catch(g){u=g}p=!1;try{var d=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),p=!0,new e}finally{p&&(d!==void 0?Object.defineProperty(e.prototype,"props",d):delete e.prototype.props)}}}else{try{throw Error()}catch(g){u=g}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(g){if(g&&u&&typeof g.stack=="string")return[g.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var h=`
`+l[i].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=i&&0<=s);break}}}finally{Wp=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?na(n):""}function kT(e,t){switch(e.tag){case 26:case 27:case 5:return na(e.type);case 16:return na("Lazy");case 13:return e.child!==t&&t!==null?na("Suspense Fallback"):na("Suspense");case 19:return na("SuspenseList");case 0:case 15:return qp(e.type,!1);case 11:return qp(e.type.render,!1);case 1:return qp(e.type,!0);case 31:return na("Activity");case 30:return na("ViewTransition");default:return""}}function iy(e){try{var t="",n=null;do t+=kT(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Dm=Object.prototype.hasOwnProperty,Ig=on.unstable_scheduleCallback,Yp=on.unstable_cancelCallback,XT=on.unstable_shouldYield,WT=on.unstable_requestPaint,oi=on.unstable_now,qT=on.unstable_getCurrentPriorityLevel,Wx=on.unstable_ImmediatePriority,qx=on.unstable_UserBlockingPriority,Rh=on.unstable_NormalPriority,YT=on.unstable_LowPriority,Yx=on.unstable_IdlePriority,ZT=on.log,JT=on.unstable_setDisableYieldValue,Cc=null,li=null;function oa(e){if(typeof ZT=="function"&&JT(e),li&&typeof li.setStrictMode=="function")try{li.setStrictMode(Cc,e)}catch{}}var ci=Math.clz32?Math.clz32:jT,KT=Math.log,QT=Math.LN2;function jT(e){return e>>>=0,e===0?32:31-(KT(e)/QT|0)|0}var Vu=256,Gu=262144,ku=4194304;function tr(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ef(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=tr(i):(r&=o,r!==0?s=tr(r):n||(n=o&~e,n!==0&&(s=tr(n))))):(o=i&~a,o!==0?s=tr(o):r!==0?s=tr(r):n||(n=i&~e,n!==0&&(s=tr(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function Rc(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Zx(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-ci(n),s=1<<i;t|=e[i],n&=~s}return t}function $T(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jx(){var e=ku;return ku<<=1,(ku&62914560)===0&&(ku=4194304),e}function Zp(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Nc(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function tA(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var h=31-ci(n),p=1<<h;o[h]=0,l[h]=-1;var u=c[h];if(u!==null)for(c[h]=null,h=0;h<u.length;h++){var d=u[h];d!==null&&(d.lane&=-536870913)}n&=~p}i!==0&&Kx(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function Kx(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-ci(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function Qx(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-ci(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function jx(e,t){var n=t&-t;return n=(n&42)!==0?1:Og(n),(n&(e.suspendedLanes|t))!==0?0:n}function Og(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Pg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function $x(){var e=_e.p;return e!==0?e:(e=window.event,e===void 0?32:Ib(e.type))}function sy(e,t){var n=_e.p;try{return _e.p=e,t()}finally{_e.p=n}}var Bs=Math.random().toString(36).slice(2),vn="__reactFiber$"+Bs,Kn="__reactProps$"+Bs,Oo="__reactContainer$"+Bs,ay="__reactEvents$"+Bs,eA="__reactListeners$"+Bs,nA="__reactHandles$"+Bs,ry="__reactResources$"+Bs,Dc="__reactMarker$"+Bs,Nh="__reactLoad$"+Bs;function nf(e){delete e[vn],delete e[Kn],delete e[eA],delete e[nA]}function ir(e){var t;if(t=e[vn])return t;for(var n=e.parentNode;n;){if(t=n[Oo]||n[vn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=bx(e);e!==null;){if(n=e[vn])return n;e=bx(e)}return t}e=n,n=e.parentNode}return null}function Po(e){if(e=e[vn]||e[Oo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Jl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(tt(33))}function ho(e){var t=e[ry];return t||(t=e[ry]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function dn(e){e[Dc]=!0}function tS(e){e[Nh]=void 0}var eS=new Set,nS={};function yr(e,t){bo(e,t),bo(e+"Capture",t)}function bo(e,t){for(nS[e]=t,e=0;e<t.length;e++)eS.add(t[e])}var iA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),oy={},ly={};function sA(e){return Dm.call(ly,e)?!0:Dm.call(oy,e)?!1:iA.test(e)?ly[e]=!0:(oy[e]=!0,!1)}var me=!1;function cy(){var e=me;return me=!1,e}function oh(e,t,n){if(sA(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function Xu(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function Ts(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function ii(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function iS(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function aA(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Um(e){if(!e._valueTracker){var t=iS(e)?"checked":"value";e._valueTracker=aA(e,t,""+e[t])}}function sS(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=iS(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var rA=/[\n"\\]/g;function Ci(e){return e.replace(rA,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Lm(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ii(t)):e.value!==""+ii(t)&&(e.value=""+ii(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?Jp(e,ii(e.value)):Jp(e,ii(t)):n!=null?Jp(e,ii(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+ii(o):e.removeAttribute("name")}function aS(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Um(e);return}n=n!=null?""+ii(n):"",t=t!=null?""+ii(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Um(e)}function Jp(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function fo(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+ii(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function rS(e,t,n){if(t!=null&&(t=""+ii(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+ii(n):""}function oS(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(tt(92));if(Zl(i)){if(1<i.length)throw Error(tt(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=ii(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Um(e)}function Eo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var oA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function uy(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||oA.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function lS(e,t,n){if(t!=null&&typeof t!="object")throw Error(tt(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",me=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(uy(e,s,i),me=!0)}else for(var a in t)t.hasOwnProperty(a)&&uy(e,a,t[a])}function Bg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var lA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),cA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function lh(e){return cA.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function rs(){}var Im=null;function zg(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var no=null,po=null;function hy(e){var t=Po(e);if(t&&(e=t.stateNode)){var n=e[Kn]||null;t:switch(e=t.stateNode,t.type){case"input":if(Lm(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ci(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Kn]||null;if(!s)throw Error(tt(90));Lm(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&sS(i)}break t;case"textarea":rS(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&fo(e,!!n.multiple,t,!1)}}}var Kp=!1;function cS(e,t,n){if(Kp)return e(t,n);Kp=!0;try{var i=e(t);return i}finally{if(Kp=!1,(no!==null||po!==null)&&(_f(),no&&(t=no,e=po,po=no=null,hy(t),e)))for(t=0;t<e.length;t++)hy(e[t])}}function fc(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Kn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(tt(231,t,typeof n));return n}var Ds=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Om=!1;if(Ds)try{Yr={},Object.defineProperty(Yr,"passive",{get:function(){Om=!0}}),window.addEventListener("test",Yr,Yr),window.removeEventListener("test",Yr,Yr)}catch{Om=!1}var Yr,la=null,Fg=null,ch=null;function uS(){if(ch)return ch;var e,t=Fg,n=t.length,i,s="value"in la?la.value:la.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return ch=s.slice(e,1<i?1-i:void 0)}function uh(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Wu(){return!0}function fy(){return!1}function Bn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Wu:fy,this.isPropagationStopped=fy,this}return Re(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Wu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Wu)},persist:function(){},isPersistent:Wu}),t}var Ca={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},sf=Bn(Ca),Uc=Re({},Ca,{view:0,detail:0}),uA=Bn(Uc),Qp,jp,Gl,af=Re({},Uc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hg,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gl&&(Gl&&e.type==="mousemove"?(Qp=e.screenX-Gl.screenX,jp=e.screenY-Gl.screenY):jp=Qp=0,Gl=e),Qp)},movementY:function(e){return"movementY"in e?e.movementY:jp}}),dy=Bn(af),hA=Re({},af,{dataTransfer:0}),fA=Bn(hA),dA=Re({},Uc,{relatedTarget:0}),$p=Bn(dA),pA=Re({},Ca,{animationName:0,elapsedTime:0,pseudoElement:0}),mA=Bn(pA),gA=Re({},Ca,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),_A=Bn(gA),vA=Re({},Ca,{data:0}),py=Bn(vA),yA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},xA={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},SA={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function MA(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=SA[e])?!!t[e]:!1}function Hg(){return MA}var bA=Re({},Uc,{key:function(e){if(e.key){var t=yA[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=uh(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?xA[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hg,charCode:function(e){return e.type==="keypress"?uh(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?uh(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),EA=Bn(bA),TA=Re({},af,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),my=Bn(TA),AA=Re({},Ca,{submitter:0}),wA=Bn(AA),CA=Re({},Uc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hg}),RA=Bn(CA),NA=Re({},Ca,{propertyName:0,elapsedTime:0,pseudoElement:0}),DA=Bn(NA),UA=Re({},af,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),LA=Bn(UA),IA=Re({},Ca,{newState:0,oldState:0,source:0}),OA=Bn(IA),PA=[9,13,27,32],Vg=Ds&&"CompositionEvent"in window,jl=null;Ds&&"documentMode"in document&&(jl=document.documentMode);var BA=Ds&&"TextEvent"in window&&!jl,hS=Ds&&(!Vg||jl&&8<jl&&11>=jl),gy=" ",_y=!1;function fS(e,t){switch(e){case"keyup":return PA.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function dS(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var io=!1;function zA(e,t){switch(e){case"compositionend":return dS(t);case"keypress":return t.which!==32?null:(_y=!0,gy);case"textInput":return e=t.data,e===gy&&_y?null:e;default:return null}}function FA(e,t){if(io)return e==="compositionend"||!Vg&&fS(e,t)?(e=uS(),ch=Fg=la=null,io=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return hS&&t.locale!=="ko"?null:t.data;default:return null}}var HA={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vy(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!HA[e.type]:t==="textarea"}function pS(e,t,n,i){no?po?po.push(i):po=[i]:no=i,t=jh(t,"onChange"),0<t.length&&(n=new sf("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var $l=null,dc=null;function VA(e){cb(e,0)}function rf(e){var t=Jl(e);if(sS(t))return e}function yy(e,t){if(e==="change")return t}var mS=!1;Ds&&(Ds?(Yu="oninput"in document,Yu||(tm=document.createElement("div"),tm.setAttribute("oninput","return;"),Yu=typeof tm.oninput=="function"),qu=Yu):qu=!1,mS=qu&&(!document.documentMode||9<document.documentMode));var qu,Yu,tm;function xy(){$l&&($l.detachEvent("onpropertychange",gS),dc=$l=null)}function gS(e){if(e.propertyName==="value"&&rf(dc)){var t=[];pS(t,dc,e,zg(e)),cS(VA,t)}}function GA(e,t,n){e==="focusin"?(xy(),$l=t,dc=n,$l.attachEvent("onpropertychange",gS)):e==="focusout"&&xy()}function kA(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return rf(dc)}function XA(e,t){if(e==="click")return rf(t)}function WA(e,t){if(e==="input"||e==="change")return rf(t)}function qA(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var hi=typeof Object.is=="function"?Object.is:qA;function pc(e,t){if(hi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Dm.call(t,s)||!hi(e[s],t[s]))return!1}return!0}function Pm(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Sy(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function My(e,t){var n=Sy(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Sy(n)}}function _S(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?_S(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vS(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Pm(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Pm(e.document)}return t}function Gg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var YA=Ds&&"documentMode"in document&&11>=document.documentMode,so=null,Bm=null,tc=null,zm=!1;function by(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;zm||so==null||so!==Pm(i)||(i=so,"selectionStart"in i&&Gg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),tc&&pc(tc,i)||(tc=i,i=jh(Bm,"onSelect"),0<i.length&&(t=new sf("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=so)))}function ja(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ao={animationend:ja("Animation","AnimationEnd"),animationiteration:ja("Animation","AnimationIteration"),animationstart:ja("Animation","AnimationStart"),transitionrun:ja("Transition","TransitionRun"),transitionstart:ja("Transition","TransitionStart"),transitioncancel:ja("Transition","TransitionCancel"),transitionend:ja("Transition","TransitionEnd")},em={},yS={};Ds&&(yS=document.createElement("div").style,"AnimationEvent"in window||(delete ao.animationend.animation,delete ao.animationiteration.animation,delete ao.animationstart.animation),"TransitionEvent"in window||delete ao.transitionend.transition);function xr(e){if(em[e])return em[e];if(!ao[e])return e;var t=ao[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in yS)return em[e]=t[n];return e}var xS=xr("animationend"),SS=xr("animationiteration"),MS=xr("animationstart"),ZA=xr("transitionrun"),JA=xr("transitionstart"),KA=xr("transitioncancel"),bS=xr("transitionend"),ES=new Map,Fm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Fm.push("scrollEnd");function Vi(e,t){ES.set(e,t),yr(t,[e])}var QA=0;function Us(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Hi.identifierPrefix;var n=QA++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function Ey(e){if(e==null||typeof e=="string")return e;var t=null,n=So;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function zs(e,t){return e=Ey(e),t=Ey(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var Dh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ti=[],ro=0,kg=0;function of(){for(var e=ro,t=kg=ro=0;t<e;){var n=Ti[t];Ti[t++]=null;var i=Ti[t];Ti[t++]=null;var s=Ti[t];Ti[t++]=null;var a=Ti[t];if(Ti[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&TS(n,s,a)}}function lf(e,t,n,i){Ti[ro++]=e,Ti[ro++]=t,Ti[ro++]=n,Ti[ro++]=i,kg|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Xg(e,t,n,i){return lf(e,t,n,i),Uh(e)}function Sr(e,t){return lf(e,null,null,t),Uh(e)}function TS(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-ci(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function Uh(e){if(50<uc)throw uc=0,xh=null,Error(tt(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var oo={};function jA(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(e,t,n,i){return new jA(e,t,n,i)}function Wg(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Rs(e,t){var n=e.alternate;return n===null?(n=Yn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function AS(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function hh(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")Wg(i)&&(r=1);else if(typeof i=="string")r=EC(e,n,cs.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case Am:return e=Yn(31,n,t,s),e.elementType=Am,e.lanes=a,e;case to:return rr(n.children,s,a,t);case kx:r=8,s|=24;break;case bm:return e=Yn(12,n,t,s|2),e.elementType=bm,e.lanes=a,e;case Em:return e=Yn(13,n,t,s),e.elementType=Em,e.lanes=a,e;case Tm:return e=Yn(19,n,t,s),e.elementType=Tm,e.lanes=a,e;case FT:case wm:return e=s|32,e=Yn(30,n,t,e),e.elementType=wm,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case as:r=10;break t;case Xx:r=9;break t;case Ug:r=11;break t;case Lg:r=14;break t;case sa:r=16,i=null;break t}r=29,n=Error(tt(130,e===null?"null":typeof e,"")),i=null}return t=Yn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function rr(e,t,n,i){return e=Yn(7,e,i,t),e.lanes=n,e}function nm(e,t,n){return e=Yn(6,e,null,t),e.lanes=n,e}function wS(e){var t=Yn(18,null,null,0);return t.stateNode=e,t}function im(e,t,n){return t=Yn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ty=new WeakMap;function Ri(e,t){if(typeof e=="object"&&e!==null){var n=Ty.get(e);return n!==void 0?n:(t={value:e,source:t,stack:iy(t)},Ty.set(e,t),t)}return{value:e,source:t,stack:iy(t)}}var lo=[],co=0,Lh=null,mc=0,Ai=[],wi=0,ba=null,os=1,ls="";function ws(e,t){lo[co++]=mc,lo[co++]=Lh,Lh=e,mc=t}function CS(e,t,n){Ai[wi++]=os,Ai[wi++]=ls,Ai[wi++]=ba,ba=e;var i=os;e=ls;var s=32-ci(i)-1;i&=~(1<<s),n+=1;var a=32-ci(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,os=1<<32-ci(t)+s|n<<s|i,ls=a+e}else os=1<<a|n<<s|i,ls=e}function cf(e){e.return!==null&&(ws(e,1),CS(e,1,0))}function qg(e){for(;e===Lh;)Lh=lo[--co],lo[co]=null,mc=lo[--co],lo[co]=null;for(;e===ba;)ba=Ai[--wi],Ai[wi]=null,ls=Ai[--wi],Ai[wi]=null,os=Ai[--wi],Ai[wi]=null}function RS(e,t){Ai[wi++]=os,Ai[wi++]=ls,Ai[wi++]=ba,os=t.id,ls=t.overflow,ba=e}var pn=null,Le=null,ee=!1,pa=null,Ni=!1,Hm=Error(tt(519));function Ea(e){var t=Error(tt(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw gc(Ri(t,e)),Hm}function Ay(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[vn]=e,t[Kn]=i,n){case"dialog":se("cancel",t),se("close",t);break;case"iframe":case"object":case"embed":se("load",t);break;case"video":case"audio":for(n=0;n<xc.length;n++)se(xc[n],t);break;case"source":se("error",t);break;case"img":case"image":case"link":se("error",t),se("load",t);break;case"details":se("toggle",t);break;case"input":se("invalid",t),aS(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":se("invalid",t);break;case"textarea":se("invalid",t),oS(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||hb(t.textContent,n)?(i.popover!=null&&(se("beforetoggle",t),se("toggle",t)),i.onScroll!=null&&se("scroll",t),i.onScrollEnd!=null&&se("scrollend",t),i.onClick!=null&&(t.onclick=rs),t=!0):t=!1,t||Ea(e,!0)}function Ih(e){for(pn=e.return;pn;)switch(pn.tag){case 5:case 31:case 13:Ni=!1;return;case 27:case 3:Ni=!0;return;default:pn=pn.return}}function Zr(e){if(e!==pn)return!1;if(!ee)return Ih(e),ee=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Eg(e.type,e.memoizedProps)),n=!n),n&&Le&&Ea(e),Ih(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(tt(317));Le=Mx(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(tt(317));Le=Mx(e)}else t===27?(t=Le,Ra(e.type)?(e=Cg,Cg=null,Le=e):Le=t):Le=pn?Di(e.stateNode.nextSibling):null;return!0}function ur(){Le=pn=null,ee=!1}function sm(){var e=pa;return e!==null&&(Wn===null?Wn=e:Wn.push.apply(Wn,e),pa=null),e}function gc(e){pa===null?pa=[e]:pa.push(e)}var Vm=fs(null),Mr=null,Cs=null;function ca(e,t,n){Ie(Vm,t._currentValue),t._currentValue=n}function Ns(e){e._currentValue=Vm.current,xn(Vm)}function fh(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Gm(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),fh(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(tt(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),fh(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),fh(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function hr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(tt(387));if(r=r.memoizedProps,r!==null){var o=s.type;hi(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===Ah.current){if(r=s.alternate,r===null)throw Error(tt(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Uo):e=[Uo])}s=s.return}return e!==null&&Gm(t,e,n,i),t.flags|=262144,e!==null}function Oh(e){for(e=e.firstContext;e!==null;){if(!hi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function fr(e){Mr=e,Cs=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function yn(e){return NS(Mr,e)}function Zu(e,t){return Mr===null&&fr(e),NS(e,t)}function NS(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Cs===null){if(e===null)throw Error(tt(308));Cs=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Cs=Cs.next=t;return n}var $A=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},tw=on.unstable_scheduleCallback,ew=on.unstable_NormalPriority,je={$$typeof:as,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yg(){return{controller:new $A,data:new Map,refCount:0}}function Lc(e){e.refCount--,e.refCount===0&&tw(ew,function(){e.controller.abort()})}function wy(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var Kl=null;function nw(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var ec=null,km=0,dr=0,mo=null;function iw(e,t){if(ec===null){var n=ec=[];km=0,dr=S0(),mo={status:"pending",value:void 0,then:function(i){n.push(i)}}}return km++,t.then(Cy,Cy),t}function Cy(){if(--km===0&&(Kl=null,ec!==null)){mo!==null&&(mo.status="fulfilled");var e=ec;ec=null,dr=0,mo=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function sw(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var Ry=qt.S;qt.S=function(e,t){if(ZM=oi(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&iw(e,t),Kl!==null)for(var n=Ro;n!==null;)wy(n,Kl),n=n.next;if(n=e.types,n!==null){for(var i=Ro;i!==null;)wy(i,n),i=i.next;if(dr!==0){i=Kl,i===null&&(i=Kl=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}Ry!==null&&Ry(e,t)};var or=fs(null);function Zg(){var e=or.current;return e!==null?e:Ce.pooledCache}function dh(e,t){t===null?Ie(or,or.current):Ie(or,t.pool)}function DS(){var e=Zg();return e===null?null:{parent:je._currentValue,pool:e}}var Bo=Error(tt(460)),Jg=Error(tt(474)),uf=Error(tt(542)),Ph={then:function(){}};function Ny(e){return e=e.status,e==="fulfilled"||e==="rejected"}function US(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(rs,rs),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Uy(e),e===void 0&&!("reason"in t)?Error(tt(600)):e;default:if(typeof t.status=="string")t.then(rs,rs);else{if(e=Ce,e!==null&&100<e.shellSuspendCounter)throw Error(tt(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Uy(e),e}throw lr=t,Bo}}function er(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(lr=n,Bo):n}}var lr=null;function Dy(){if(lr===null)throw Error(tt(459));var e=lr;return lr=null,e}function Uy(e){if(e===Bo||e===uf)throw Error(tt(483))}var go=null,_c=0;function Ju(e){var t=_c;return _c+=1,go===null&&(go=[]),US(go,e,t)}function ea(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Ku(e,t){throw t.$$typeof===zT?Error(tt(525)):(e=Object.prototype.toString.call(t),Error(tt(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function LS(e){function t(f,_){if(e){var S=f.deletions;S===null?(f.deletions=[_],f.flags|=16):S.push(_)}}function n(f,_){if(!e)return null;for(;_!==null;)t(f,_),_=_.sibling;return null}function i(f){for(var _=new Map;f!==null;)f.key===null?_.set(f.index,f):_.set(f.key,f),f=f.sibling;return _}function s(f,_){return f=Rs(f,_),f.index=0,f.sibling=null,f}function a(f,_,S){return f.index=S,e?(S=f.alternate,S!==null?(S=S.index,S<_?(f.flags|=2,_):S):(f.flags|=134217730,_)):(f.flags|=1048576,_)}function r(f){return e&&f.alternate===null&&(f.flags|=134217730),f}function o(f,_,S,v){return _===null||_.tag!==6?(_=nm(S,f.mode,v),_.return=f,_):(_=s(_,S),_.return=f,_)}function l(f,_,S,v){var E=S.type;return E===to?(f=h(f,_,S.props.children,v,S.key),ea(f,S),f):_!==null&&(_.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===sa&&er(E)===_.type)?(_=s(_,S.props),ea(_,S),_.return=f,_):(_=hh(S.type,S.key,S.props,null,f.mode,v),ea(_,S),_.return=f,_)}function c(f,_,S,v){return _===null||_.tag!==4||_.stateNode.containerInfo!==S.containerInfo||_.stateNode.implementation!==S.implementation?(_=im(S,f.mode,v),_.return=f,_):(_=s(_,S.children||[]),_.return=f,_)}function h(f,_,S,v,E){return _===null||_.tag!==7?(_=rr(S,f.mode,v,E),_.return=f,_):(_=s(_,S),_.return=f,_)}function p(f,_,S){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return _=nm(""+_,f.mode,S),_.return=f,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Hu:return S=hh(_.type,_.key,_.props,null,f.mode,S),ea(S,_),S.return=f,S;case Yl:return _=im(_,f.mode,S),_.return=f,_;case sa:return _=er(_),p(f,_,S)}if(Zl(_)||Vl(_))return _=rr(_,f.mode,S,null),_.return=f,_;if(typeof _.then=="function")return p(f,Ju(_),S);if(_.$$typeof===as)return p(f,Zu(f,_),S);Ku(f,_)}return null}function u(f,_,S,v){var E=_!==null?_.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return E!==null?null:o(f,_,""+S,v);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Hu:return S.key===E?l(f,_,S,v):null;case Yl:return S.key===E?c(f,_,S,v):null;case sa:return S=er(S),u(f,_,S,v)}if(Zl(S)||Vl(S))return E!==null?null:h(f,_,S,v,null);if(typeof S.then=="function")return u(f,_,Ju(S),v);if(S.$$typeof===as)return u(f,_,Zu(f,S),v);Ku(f,S)}return null}function d(f,_,S,v,E){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return f=f.get(S)||null,o(_,f,""+v,E);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Hu:return f=f.get(v.key===null?S:v.key)||null,l(_,f,v,E);case Yl:return f=f.get(v.key===null?S:v.key)||null,c(_,f,v,E);case sa:return v=er(v),d(f,_,S,v,E)}if(Zl(v)||Vl(v))return f=f.get(S)||null,h(_,f,v,E,null);if(typeof v.then=="function")return d(f,_,S,Ju(v),E);if(v.$$typeof===as)return d(f,_,S,Zu(_,v),E);Ku(_,v)}return null}function g(f,_,S,v){for(var E=null,T=null,R=_,x=_=0,w=null;R!==null&&x<S.length;x++){R.index>x?(w=R,R=null):w=R.sibling;var C=u(f,R,S[x],v);if(C===null){R===null&&(R=w);break}e&&R&&C.alternate===null&&t(f,R),_=a(C,_,x),T===null?E=C:T.sibling=C,T=C,R=w}if(x===S.length)return n(f,R),ee&&ws(f,x),E;if(R===null){for(;x<S.length;x++)R=p(f,S[x],v),R!==null&&(_=a(R,_,x),T===null?E=R:T.sibling=R,T=R);return ee&&ws(f,x),E}for(R=i(R);x<S.length;x++)w=d(R,f,x,S[x],v),w!==null&&(e&&(C=w.alternate,C!==null&&R.delete(C.key===null?x:C.key)),_=a(w,_,x),T===null?E=w:T.sibling=w,T=w);return e&&R.forEach(function(D){return t(f,D)}),ee&&ws(f,x),E}function M(f,_,S,v){if(S==null)throw Error(tt(151));for(var E=null,T=null,R=_,x=_=0,w=null,C=S.next();R!==null&&!C.done;x++,C=S.next()){R.index>x?(w=R,R=null):w=R.sibling;var D=u(f,R,C.value,v);if(D===null){R===null&&(R=w);break}e&&R&&D.alternate===null&&t(f,R),_=a(D,_,x),T===null?E=D:T.sibling=D,T=D,R=w}if(C.done)return n(f,R),ee&&ws(f,x),E;if(R===null){for(;!C.done;x++,C=S.next())C=p(f,C.value,v),C!==null&&(_=a(C,_,x),T===null?E=C:T.sibling=C,T=C);return ee&&ws(f,x),E}for(R=i(R);!C.done;x++,C=S.next())C=d(R,f,x,C.value,v),C!==null&&(e&&(w=C.alternate,w!==null&&R.delete(w.key===null?x:w.key)),_=a(C,_,x),T===null?E=C:T.sibling=C,T=C);return e&&R.forEach(function(H){return t(f,H)}),ee&&ws(f,x),E}function m(f,_,S,v){if(typeof S=="object"&&S!==null&&S.type===to&&S.key===null&&S.props.ref===void 0&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Hu:t:{for(var E=S.key;_!==null;){if(_.key===E){if(E=S.type,E===to){if(_.tag===7){n(f,_.sibling),v=s(_,S.props.children),ea(v,S),v.return=f,f=v;break t}}else if(_.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===sa&&er(E)===_.type){n(f,_.sibling),v=s(_,S.props),ea(v,S),v.return=f,f=v;break t}n(f,_);break}else t(f,_);_=_.sibling}S.type===to?(v=rr(S.props.children,f.mode,v,S.key),ea(v,S),v.return=f,f=v):(v=hh(S.type,S.key,S.props,null,f.mode,v),ea(v,S),v.return=f,f=v)}return r(f);case Yl:t:{for(E=S.key;_!==null;){if(_.key===E)if(_.tag===4&&_.stateNode.containerInfo===S.containerInfo&&_.stateNode.implementation===S.implementation){n(f,_.sibling),v=s(_,S.children||[]),v.return=f,f=v;break t}else{n(f,_);break}else t(f,_);_=_.sibling}v=im(S,f.mode,v),v.return=f,f=v}return r(f);case sa:return S=er(S),m(f,_,S,v)}if(Zl(S))return g(f,_,S,v);if(Vl(S)){if(E=Vl(S),typeof E!="function")throw Error(tt(150));return S=E.call(S),M(f,_,S,v)}if(typeof S.then=="function")return m(f,_,Ju(S),v);if(S.$$typeof===as)return m(f,_,Zu(f,S),v);Ku(f,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,_!==null&&_.tag===6?(n(f,_.sibling),v=s(_,S),v.return=f,f=v):(n(f,_),v=nm(S,f.mode,v),v.return=f,f=v),r(f)):n(f,_)}return function(f,_,S,v){try{_c=0;var E=m(f,_,S,v);return go=null,E}catch(R){if(R===Bo||R===uf)throw R;var T=Yn(29,R,null,f.mode);return T.lanes=v,T.return=f,T}}}var pr=LS(!0),IS=LS(!1),aa=!1;function Kg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Xm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ma(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ga(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ge&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=Uh(e),TS(e,null,n),t}return lf(e,i,t,n),Uh(e)}function nc(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Qx(e,n)}}function am(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Wm=!1;function ic(){if(Wm){var e=mo;if(e!==null)throw e}}function sc(e,t,n,i){Wm=!1;var s=e.updateQueue;aa=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==r&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(a!==null){var p=s.baseState;r=0,h=c=l=null,o=a;do{var u=o.lane&-536870913,d=u!==o.lane;if(d?(le&u)===u:(i&u)===u){u!==0&&u===dr&&(Wm=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,M=o;u=t;var m=n;switch(M.tag){case 1:if(g=M.payload,typeof g=="function"){p=g.call(m,p,u);break t}p=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=M.payload,u=typeof g=="function"?g.call(m,p,u):g,u==null)break t;p=Re({},p,u);break t;case 2:aa=!0}}u=o.callback,u!==null&&(e.flags|=64,d&&(e.flags|=8192),d=s.callbacks,d===null?s.callbacks=[u]:d.push(u))}else d={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=d,l=p):h=h.next=d,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;d=o,o=d.next,d.next=null,s.lastBaseUpdate=d,s.shared.pending=null}}while(!0);h===null&&(l=p),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=h,a===null&&(s.shared.lanes=0),wa|=r,e.lanes=r,e.memoizedState=p}}function OS(e,t){if(typeof e!="function")throw Error(tt(191,e));e.call(t)}function PS(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)OS(n[e],t)}var Ta=fs(null),Bh=fs(0);function Ly(e,t){e=Ps,Ie(Bh,e),Ie(Ta,t),Ps=e|t.baseLanes}function qm(){Ie(Bh,Ps),Ie(Ta,Ta.current)}function Qg(){Ps=Bh.current,xn(Ta),xn(Bh)}var bn=fs(null),wn=null;function _a(e){var t=e.alternate;Ie(Sn,Sn.current&1),Ie(bn,e),wn===null&&(t===null||Ta.current!==null||t.memoizedState!==null)&&(wn=e)}function Ym(e){Ie(Sn,Sn.current),Ie(bn,e),wn===null&&(wn=e)}function BS(e){e.tag===22?(Ie(Sn,Sn.current),Ie(bn,e),wn===null&&(wn=e)):va()}function va(){Ie(Sn,Sn.current),Ie(bn,bn.current)}function si(e){xn(bn),wn===e&&(wn=null),xn(Sn)}var Sn=fs(0);function vc(e,t){Ie(bn,bn.current),Ie(Sn,t)}function jg(e){xn(Sn),xn(bn),wn===e&&(wn=null)}function zh(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||wg(n)||T0(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ls=0,$t=null,Ae=null,Qe=null,Fh=!1,_o=!1,mr=!1,Hh=0,yc=0,vo=null,aw=0;function We(){throw Error(tt(321))}function $g(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!hi(e[n],t[n]))return!1;return!0}function t0(e,t,n,i,s,a){return Ls=a,$t=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,qt.H=e===null||e.memoizedState===null?pM:mM,mr=!1,a=n(i,s),mr=!1,_o&&(a=FS(t,n,i,s)),zS(e),a}function zS(e){qt.H=Vh;var t=Ae!==null&&Ae.next!==null;if(Ls=0,Qe=Ae=$t=null,Fh=!1,yc=0,vo=null,t)throw Error(tt(300));e===null||$e||(e=e.dependencies,e!==null&&Oh(e)&&($e=!0))}function FS(e,t,n,i){$t=e;var s=0;do{if(_o&&(vo=null),yc=0,_o=!1,25<=s)throw Error(tt(301));if(s+=1,Qe=Ae=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}qt.H=dw,a=t(n,i)}while(_o);return a}function rw(){var e=qt.H,t=e.useState()[0];return t=typeof t.then=="function"?Ic(t):t,e=e.useState()[0],(Ae!==null?Ae.memoizedState:null)!==e&&($t.flags|=1024),t}function e0(){var e=Hh!==0;return Hh=0,e}function n0(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function i0(e){if(Fh){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Fh=!1}Ls=0,Qe=Ae=$t=null,_o=!1,yc=Hh=0,vo=null}function Pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?$t.memoizedState=Qe=e:Qe=Qe.next=e,Qe}function Ze(){if(Ae===null){var e=$t.alternate;e=e!==null?e.memoizedState:null}else e=Ae.next;var t=Qe===null?$t.memoizedState:Qe.next;if(t!==null)Qe=t,Ae=e;else{if(e===null)throw $t.alternate===null?Error(tt(467)):Error(tt(310));Ae=e,e={memoizedState:Ae.memoizedState,baseState:Ae.baseState,baseQueue:Ae.baseQueue,queue:Ae.queue,next:null},Qe===null?$t.memoizedState=Qe=e:Qe=Qe.next=e}return Qe}function hf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ic(e){var t=yc;return yc+=1,vo===null&&(vo=[]),e=US(vo,e,t),t=$t,(Qe===null?t.memoizedState:Qe.next)===null&&(t=t.alternate,qt.H=t===null||t.memoizedState===null?pM:mM),e}function ff(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Ic(e);if(e.$$typeof===VT)return;if(e.$$typeof===as)return yn(e)}throw Error(tt(438,String(e)))}function s0(e){var t=null,n=$t.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=$t.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=hf(),$t.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=HT;return t.index++,n}function Is(e,t){return typeof t=="function"?t(e):t}function ph(e){var t=Ze();return a0(t,Ae,e)}function a0(e,t,n){var i=e.queue;if(i===null)throw Error(tt(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,h=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(le&p)===p:(Ls&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===dr&&(h=!0);else if((Ls&u)===u){c=c.next,u===dr&&(h=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=a):l=l.next=p,$t.lanes|=u,wa|=u;p=c.action,mr&&n(a,p),a=c.hasEagerState?c.eagerState:n(a,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,$t.lanes|=p,wa|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!hi(a,e.memoizedState)&&($e=!0,h&&(n=mo,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function rm(e){var t=Ze(),n=t.queue;if(n===null)throw Error(tt(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);hi(a,t.memoizedState)||($e=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function HS(e,t,n){var i=$t,s=Ze(),a=ee;if(a){if(n===void 0)throw Error(tt(407));n=n()}else n=t();var r=!hi((Ae||s).memoizedState,n);if(r&&(s.memoizedState=n,$e=!0),s=s.queue,r0(kS.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||Qe!==null&&(Qe.memoizedState.tag&1)!==0,To(e?9:8,{destroy:void 0},GS.bind(null,i,s,n,t),null),e){if(i.flags|=2048,Ce===null)throw Error(tt(349));a||(Ls&127)!==0||VS(i,t,n)}return n}function VS(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$t.updateQueue,t===null?(t=hf(),$t.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function GS(e,t,n,i){t.value=n,t.getSnapshot=i,XS(t)&&WS(e)}function kS(e,t,n){return n(function(){XS(t)&&WS(e)})}function XS(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!hi(e,n)}catch{return!0}}function WS(e){var t=Sr(e,2);t!==null&&Zn(t,e,2)}function Zm(e){var t=Pn();if(typeof e=="function"){var n=e;if(e=n(),mr){oa(!0);try{n()}finally{oa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Is,lastRenderedState:e},t}function qS(e,t,n,i){return e.baseState=n,a0(e,Ae,typeof i=="function"?i:Is)}function ow(e,t,n,i,s){if(pf(e))throw Error(tt(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};qt.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,YS(t,a)):(a.next=n.next,t.pending=n.next=a)}}function YS(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=qt.T,r={};r.types=a!==null?a.types:null,qt.T=r;try{var o=n(s,i),l=qt.S;l!==null&&l(r,o),Iy(e,t,o)}catch(c){Jm(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),qt.T=a}}else try{a=n(s,i),Iy(e,t,a)}catch(c){Jm(e,t,c)}}function Iy(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Oy(e,t,i)},function(i){return Jm(e,t,i)}):Oy(e,t,n)}function Oy(e,t,n){t.status="fulfilled",t.value=n,ZS(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,YS(e,n)))}function Jm(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,ZS(t),t=t.next;while(t!==i)}e.action=null}function ZS(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function JS(e,t){return t}function Py(e,t){if(ee){var n=Ce.formState;if(n!==null){t:{var i=$t;if(ee){if(Le){e:{for(var s=Le,a=Ni;s.nodeType!==8;){if(!a){s=null;break e}if(s=Di(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Le=Di(s.nextSibling),i=s.data==="F!";break t}}Ea(i)}i=!1}i&&(t=n[0])}}return n=Pn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:JS,lastRenderedState:t},n.queue=i,n=hM.bind(null,$t,i),i.dispatch=n,i=Zm(!1),a=u0.bind(null,$t,!1,i.queue),i=Pn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=ow.bind(null,$t,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function By(e){var t=Ze();return KS(t,Ae,e)}function KS(e,t,n){if(t=a0(e,t,JS)[0],e=ph(Is)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=Ic(t)}catch(r){throw r===Bo?uf:r}else i=t;t=Ze();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&($t.flags|=2048,To(9,{destroy:void 0},lw.bind(null,s,n),null)),[i,a,e]}function lw(e,t){e.action=t}function zy(e){var t=Ze(),n=Ae;if(n!==null)return KS(t,n,e);Ze(),t=t.memoizedState,n=Ze();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function To(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=$t.updateQueue,t===null&&(t=hf(),$t.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function QS(){return Ze().memoizedState}function mh(e,t,n,i){var s=Pn();$t.flags|=e,s.memoizedState=To(1|t,{destroy:void 0},n,i===void 0?null:i)}function df(e,t,n,i){var s=Ze();i=i===void 0?null:i;var a=s.memoizedState.inst;Ae!==null&&i!==null&&$g(i,Ae.memoizedState.deps)?s.memoizedState=To(t,a,n,i):($t.flags|=e,s.memoizedState=To(1|t,a,n,i))}function Fy(e,t){mh(8390656,8,e,t)}function r0(e,t){df(2048,8,e,t)}function cw(e){$t.flags|=4;var t=$t.updateQueue;if(t===null)t=hf(),$t.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function jS(e){var t=Ze().memoizedState;return cw({ref:t,nextImpl:e}),function(){if((ge&2)!==0)throw Error(tt(440));return t.impl.apply(void 0,arguments)}}function $S(e,t){return df(4,2,e,t)}function tM(e,t){return df(4,4,e,t)}function eM(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function nM(e,t,n){n=n!=null?n.concat([e]):null,df(4,4,eM.bind(null,t,e),n)}function o0(){}function iM(e,t){var n=Ze();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&$g(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function sM(e,t){var n=Ze();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&$g(t,i[1]))return i[0];if(i=e(),mr){oa(!0);try{e()}finally{oa(!1)}}return n.memoizedState=[i,t],i}function l0(e,t,n){return n===void 0||(Ls&1073741824)!==0&&(le&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=KM(),$t.lanes|=e,wa|=e,n)}function aM(e,t,n,i){return hi(n,t)?n:Ta.current!==null?(e=l0(e,n,i),hi(e,t)||($e=!0),e):(Ls&106)===0||(Ls&1073741824)!==0&&(le&261930)===0?($e=!0,e.memoizedState=n):(e=KM(),$t.lanes|=e,wa|=e,t)}function rM(e,t,n,i,s){var a=_e.p;_e.p=a!==0&&8>a?a:8;var r=qt.T,o={};o.types=r!==null?r.types:null,qt.T=o,u0(e,!1,t,n);try{var l=s(),c=qt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var h=sw(l,i);ac(e,t,h,ui(e))}else ac(e,t,i,ui(e))}catch(p){ac(e,t,{then:function(){},status:"rejected",reason:p},ui())}finally{_e.p=a,r!==null&&o.types!==null&&(r.types=o.types),qt.T=r}}function uw(){}function Km(e,t,n,i){if(e.tag!==5)throw Error(tt(476));var s=oM(e).queue;rM(e,s,t,ar,n===null?uw:function(){return lM(e),n(i)})}function oM(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ar,baseState:ar,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Is,lastRenderedState:ar},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Is,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function lM(e){var t=oM(e);t.next===null&&(t=e.alternate.memoizedState),ac(e,t.next.queue,{},ui())}function c0(){return yn(Uo)}function cM(){return Ze().memoizedState}function uM(){return Ze().memoizedState}function hw(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ui();e=ma(n);var i=ga(t,e,n);i!==null&&(Zn(i,t,n),nc(i,t,n)),t={cache:Yg()},e.payload=t;return}t=t.return}}function fw(e,t,n){var i=ui();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},pf(e)?fM(t,n):(n=Xg(e,t,n,i),n!==null&&(Zn(n,e,i),dM(n,t,i)))}function hM(e,t,n){var i=ui();ac(e,t,n,i)}function ac(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(pf(e))fM(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,hi(o,r))return lf(e,t,s,0),Ce===null&&of(),!1}catch{}if(n=Xg(e,t,s,i),n!==null)return Zn(n,e,i),dM(n,t,i),!0}return!1}function u0(e,t,n,i){if(i={lane:2,revertLane:S0(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},pf(e)){if(t)throw Error(tt(479))}else t=Xg(e,n,i,2),t!==null&&Zn(t,e,2)}function pf(e){var t=e.alternate;return e===$t||t!==null&&t===$t}function fM(e,t){_o=Fh=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dM(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Qx(e,n)}}var Vh={readContext:yn,use:ff,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useLayoutEffect:We,useInsertionEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useSyncExternalStore:We,useId:We,useHostTransitionStatus:We,useFormState:We,useActionState:We,useOptimistic:We,useMemoCache:We,useCacheRefresh:We,useEffectEvent:We},pM={readContext:yn,use:ff,useCallback:function(e,t){return Pn().memoizedState=[e,t===void 0?null:t],e},useContext:yn,useEffect:Fy,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,mh(4194308,4,eM.bind(null,t,e),n)},useLayoutEffect:function(e,t){return mh(4194308,4,e,t)},useInsertionEffect:function(e,t){mh(4,2,e,t)},useMemo:function(e,t){var n=Pn();t=t===void 0?null:t;var i=e();if(mr){oa(!0);try{e()}finally{oa(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=Pn();if(n!==void 0){var s=n(t);if(mr){oa(!0);try{n(t)}finally{oa(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=fw.bind(null,$t,e),[i.memoizedState,e]},useRef:function(e){var t=Pn();return e={current:e},t.memoizedState=e},useState:function(e){e=Zm(e);var t=e.queue,n=hM.bind(null,$t,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:o0,useDeferredValue:function(e,t){var n=Pn();return l0(n,e,t)},useTransition:function(){var e=Zm(!1);return e=rM.bind(null,$t,e.queue,!0,!1),Pn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=$t,s=Pn();if(ee){if(n===void 0)throw Error(tt(407));n=n()}else{if(n=t(),Ce===null)throw Error(tt(349));(le&127)!==0||VS(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Fy(kS.bind(null,i,a,e),[e]),i.flags|=2048,To(9,{destroy:void 0},GS.bind(null,i,a,n,t),null),n},useId:function(){var e=Pn(),t=Ce.identifierPrefix;if(ee){var n=ls,i=os;n=(i&~(1<<32-ci(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Hh++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=aw++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:c0,useFormState:Py,useActionState:Py,useOptimistic:function(e){var t=Pn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=u0.bind(null,$t,!0,n),n.dispatch=t,[e,t]},useMemoCache:s0,useCacheRefresh:function(){return Pn().memoizedState=hw.bind(null,$t)},useEffectEvent:function(e){var t=Pn(),n={impl:e};return t.memoizedState=n,function(){if((ge&2)!==0)throw Error(tt(440));return n.impl.apply(void 0,arguments)}}},mM={readContext:yn,use:ff,useCallback:iM,useContext:yn,useEffect:r0,useImperativeHandle:nM,useInsertionEffect:$S,useLayoutEffect:tM,useMemo:sM,useReducer:ph,useRef:QS,useState:function(){return ph(Is)},useDebugValue:o0,useDeferredValue:function(e,t){var n=Ze();return aM(n,Ae.memoizedState,e,t)},useTransition:function(){var e=ph(Is)[0],t=Ze().memoizedState;return[typeof e=="boolean"?e:Ic(e),t]},useSyncExternalStore:HS,useId:cM,useHostTransitionStatus:c0,useFormState:By,useActionState:By,useOptimistic:function(e,t){var n=Ze();return qS(n,Ae,e,t)},useMemoCache:s0,useCacheRefresh:uM,useEffectEvent:jS},dw={readContext:yn,use:ff,useCallback:iM,useContext:yn,useEffect:r0,useImperativeHandle:nM,useInsertionEffect:$S,useLayoutEffect:tM,useMemo:sM,useReducer:rm,useRef:QS,useState:function(){return rm(Is)},useDebugValue:o0,useDeferredValue:function(e,t){var n=Ze();return Ae===null?l0(n,e,t):aM(n,Ae.memoizedState,e,t)},useTransition:function(){var e=rm(Is)[0],t=Ze().memoizedState;return[typeof e=="boolean"?e:Ic(e),t]},useSyncExternalStore:HS,useId:cM,useHostTransitionStatus:c0,useFormState:zy,useActionState:zy,useOptimistic:function(e,t){var n=Ze();return Ae!==null?qS(n,Ae,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:s0,useCacheRefresh:uM,useEffectEvent:jS};function om(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Re({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Qm={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=ui(),s=ma(i);s.payload=t,n!=null&&(s.callback=n),t=ga(e,s,i),t!==null&&(Zn(t,e,i),nc(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=ui(),s=ma(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=ga(e,s,i),t!==null&&(Zn(t,e,i),nc(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ui(),i=ma(n);i.tag=2,t!=null&&(i.callback=t),t=ga(e,i,n),t!==null&&(Zn(t,e,n),nc(t,e,n))}};function Hy(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!pc(n,i)||!pc(s,a):!0}function Vy(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Qm.enqueueReplaceState(t,t.state,null)}function gr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Re({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function gM(e){Dh(e)}function _M(e){console.error(e)}function vM(e){Dh(e)}function Gh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Gy(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function jm(e,t,n){return n=ma(n),n.tag=3,n.payload={element:null},n.callback=function(){Gh(e,t)},n}function yM(e){return e=ma(e),e.tag=3,e}function xM(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){Gy(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Gy(t,n,i),typeof s!="function"&&(ya===null?ya=new Set([this]):ya.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function pw(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&hr(t,n,s,!0),n=bn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return wn===null?Kh():n.alternate===null&&qe===0&&(qe=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===Ph?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),pm(e,i,s)),!1;case 22:return n.flags|=65536,i===Ph?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),pm(e,i,s)),!1}throw Error(tt(435,n.tag))}return pm(e,i,s),Kh(),!1}if(ee)return t=bn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==Hm&&(e=Error(tt(422),{cause:i}),gc(Ri(e,n)))):(i!==Hm&&(t=Error(tt(423),{cause:i}),gc(Ri(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=Ri(i,n),s=jm(e.stateNode,i,s),am(e,s),qe!==4&&(qe=2)),!1;var a=Error(tt(520),{cause:i});if(a=Ri(a,n),cc===null?cc=[a]:cc.push(a),qe!==4&&(qe=2),t===null)return!0;i=Ri(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=jm(n.stateNode,i,e),am(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(ya===null||!ya.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=yM(s),xM(s,e,n,i),am(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var h0=Error(tt(461)),$e=!1;function an(e,t,n,i){t.child=e===null?IS(t,null,n,i):pr(t,e.child,n,i)}function ky(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return fr(t),i=t0(e,t,n,r,a,s),o=e0(),e!==null&&!$e?(n0(e,t,s),Os(e,t,s)):(ee&&o&&cf(t),t.flags|=1,an(e,t,i,s),t.child)}function Xy(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!Wg(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,SM(e,t,a,i,s)):(e=hh(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!d0(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:pc,n(r,i)&&e.ref===t.ref)return Os(e,t,s)}return t.flags|=1,e=Rs(a,i),e.ref=t.ref,e.return=t,t.child=e}function SM(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(pc(a,i)&&e.ref===t.ref)if($e=!1,t.pendingProps=i=a,d0(e,s))(e.flags&131072)!==0&&($e=!0);else return t.lanes=e.lanes,Os(e,t,s)}return $m(e,t,n,i,s)}function MM(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return Wy(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&dh(t,a!==null?a.cachePool:null),a!==null?Ly(t,a):qm(),BS(t);else return i=t.lanes=536870912,Wy(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(dh(t,a.cachePool),Ly(t,a),va(),t.memoizedState=null):(e!==null&&dh(t,null),qm(),va());return an(e,t,s,n),t.child}function rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Wy(e,t,n,i,s){var a=Zg();return a=a===null?null:{parent:je._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&dh(t,null),qm(),BS(t),e!==null&&hr(e,t,i,!0),t.childLanes=s,null}function gh(e,t){return t=mf({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function qy(e,t,n){return pr(t,e.child,null,n),e=gh(t,t.pendingProps),e.flags|=2,si(t),t.memoizedState=null,e}function mw(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(ee){if(i.mode==="hidden")return e=gh(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},rc(null,e);if(Ym(t),(e=Le)?(e=Mb(e,Ni),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ba!==null?{id:os,overflow:ls}:null,retryLane:536870912,hydrationErrors:null},n=wS(e),n.return=t,t.child=n,pn=t,Le=null)):e=null,e===null)throw Ea(t);return t.lanes=536870912,null}return gh(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(Ym(t),s)if(t.flags&256)t.flags&=-257,t=qy(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(tt(558));else if($e||hr(e,t,n,!1),s=(n&e.childLanes)!==0,$e||s){if(Ta.current===null){if(i=Ce,i!==null&&(r=jx(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,Sr(e,r),Zn(i,e,r),h0;Kh()}t=qy(e,t,n)}else e=a.treeContext,Le=Di(r.nextSibling),pn=t,ee=!0,pa=null,Ni=!1,e!==null&&RS(t,e),t=gh(t,i),t.flags|=134221824;return t}return e=Rs(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Kr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(tt(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function $m(e,t,n,i,s){return fr(t),n=t0(e,t,n,i,void 0,s),i=e0(),e!==null&&!$e?(n0(e,t,s),Os(e,t,s)):(ee&&i&&cf(t),t.flags|=1,an(e,t,n,s),t.child)}function Yy(e,t,n,i,s,a){return fr(t),t.updateQueue=null,n=FS(t,i,n,s),zS(e),i=e0(),e!==null&&!$e?(n0(e,t,a),Os(e,t,a)):(ee&&i&&cf(t),t.flags|=1,an(e,t,n,a),t.child)}function Zy(e,t,n,i,s){if(fr(t),t.stateNode===null){var a=oo,r=n.contextType;typeof r=="object"&&r!==null&&(a=yn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Qm,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},Kg(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?yn(r):oo,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(om(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&Qm.enqueueReplaceState(a,a.state,null),sc(t,i,a,s),ic(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=gr(n,o);a.props=l;var c=a.context,h=n.contextType;r=oo,typeof h=="object"&&h!==null&&(r=yn(h));var p=n.getDerivedStateFromProps;h=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&Vy(t,a,i,r),aa=!1;var u=t.memoizedState;a.state=u,sc(t,i,a,s),ic(),c=t.memoizedState,o||u!==c||aa?(typeof p=="function"&&(om(t,n,p,i),c=t.memoizedState),(l=aa||Hy(t,n,l,i,u,c,r))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,Xm(e,t),r=t.memoizedProps,h=gr(n,r),a.props=h,p=t.pendingProps,u=a.context,c=n.contextType,l=oo,typeof c=="object"&&c!==null&&(l=yn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||u!==l)&&Vy(t,a,i,l),aa=!1,u=t.memoizedState,a.state=u,sc(t,i,a,s),ic();var d=t.memoizedState;r!==p||u!==d||aa||e!==null&&e.dependencies!==null&&Oh(e.dependencies)?(typeof o=="function"&&(om(t,n,o,i),d=t.memoizedState),(h=aa||Hy(t,n,h,i,u,d,l)||e!==null&&e.dependencies!==null&&Oh(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,d,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,d,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=d),a.props=i,a.state=d,a.context=l,i=h):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Kr(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=pr(t,e.child,null,s),t.child=pr(t,null,n,s)):an(e,t,n,s),t.memoizedState=a.state,e=t.child):e=Os(e,t,s),e}function Jy(e,t,n,i){return ur(),t.flags|=256,an(e,t,n,i),t.child}var tg={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function eg(e){return{baseLanes:e,cachePool:DS()}}function ng(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=ri),e}function bM(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(Sn.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(ee){if(s?_a(t):va(),(e=Le)?(e=Mb(e,Ni),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ba!==null?{id:os,overflow:ls}:null,retryLane:536870912,hydrationErrors:null},n=wS(e),n.return=t,t.child=n,pn=t,Le=null)):e=null,e===null)throw Ea(t);return T0(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?(va(),s=t.mode,a=mf({mode:"hidden",children:a},s),i=rr(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=eg(n),i.childLanes=ng(e,r,n),t.memoizedState=tg,rc(null,i)):(_a(t),f0(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return gw(e,t,a,r,i,l,o,n)}return s?(va(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=Rs(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=Rs(l,s):(s=rr(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,rc(null,i),i=t.child,s=e.child.memoizedState,s===null?s=eg(n):(a=s.cachePool,a!==null?(o=je._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=DS(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=ng(e,r,n),t.memoizedState=tg,rc(e.child,i)):(_a(t),n=e.child,e=n.sibling,n=Rs(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function f0(e,t){return t=mf({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function mf(e,t){return e=Yn(22,e,null,t),e.lanes=0,e}function Qu(e,t,n){return pr(t,e.child,null,n),e=f0(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gw(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(_a(t),t.flags&=-257,Qu(e,t,o)):t.memoizedState!==null?(va(),t.child=e.child,t.flags|=128,null):(va(),a=s.fallback,r=t.mode,s=mf({mode:"visible",children:s.children},r),a=rr(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,pr(t,e.child,null,o),s=t.child,s.memoizedState=eg(o),s.childLanes=ng(e,i,o),t.memoizedState=tg,rc(null,s));if(_a(t),T0(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(tt(419)),s.stack="",s.digest=i,gc({value:s,source:null,stack:null})),Qu(e,t,o)}if($e||hr(e,t,o,!1),i=(o&e.childLanes)!==0,$e||i){if(Ta.current!==null)return Qu(e,t,o);if(i=Ce,i!==null&&(s=jx(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,Sr(e,s),Zn(i,e,s),h0;return wg(a)||Kh(),Qu(e,t,o)}return wg(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Le=Di(a.nextSibling),pn=t,ee=!0,pa=null,Ni=!1,e!==null&&RS(t,e),t=f0(t,s.children),t.flags|=134221824,t)}function Ky(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),fh(e.return,t,n)}function Qy(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&zh(n)===null&&(t=e),e=e.sibling}return t}function ju(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function lm(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function ig(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=Sn.current;if(t.flags&128)return vc(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,vc(t,r),s==="backwards"&&e!==null?(lm(e),an(e,t,i,n),lm(e)):an(e,t,i,n),i=ee?mc:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ky(e,n,t);else if(e.tag===19)Ky(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=Qy(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,lm(t)),ju(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&zh(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}ju(t,!0,n,null,a,i);break;case"together":ju(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=Qy(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),ju(t,!1,s,n,a,i)}return t.child}function jy(e,t,n){var i=t.pendingProps;return ca(t,t.type,i.value),an(e,t,i.children,n),t.child}function Os(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),wa|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(hr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(tt(153));if(t.child!==null){for(e=t.child,n=Rs(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Rs(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function d0(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Oh(e)))}function _w(e,t,n){switch(t.tag){case 3:wh(t,t.stateNode.containerInfo),ca(t,je,e.memoizedState.cache),ur();break;case 27:case 5:Nm(t);break;case 4:wh(t,t.stateNode.containerInfo);break;case 10:ca(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ym(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return _a(t),t.flags|=128,null;i=hr(e,t,n,!1);var s=t.child.childLanes;return i||(n&s)!==0?bM(e,t,n):(_a(t),e=Os(e,t,n),e!==null?e.sibling:null)}_a(t);break;case 19:if(t.flags&128)return ig(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(hr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return ig(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),vc(t,Sn.current),i)break;return null;case 22:return t.lanes=0,MM(e,t,n,t.pendingProps);case 24:ca(t,je,e.memoizedState.cache)}return Os(e,t,n)}function EM(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)$e=!0;else{if(!d0(e,n)&&(t.flags&128)===0)return $e=!1,_w(e,t,n);$e=(e.flags&131072)!==0}else $e=!1,ee&&(t.flags&1048576)!==0&&CS(t,mc,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=er(t.elementType),t.type=e,typeof e=="function")Wg(e)?(i=gr(e,i),t.tag=1,t=Zy(null,t,e,i,n)):(t.tag=0,t=$m(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Ug){t.tag=11,t=ky(null,t,e,i,n);break t}else if(s===Lg){t.tag=14,t=Xy(null,t,e,i,n);break t}else if(s===as){t.tag=10,t.type=e,t=jy(null,t,n);break t}}throw t=Cm(e)||e,Error(tt(306,t,""))}}return t;case 0:return $m(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=gr(i,t.pendingProps),Zy(e,t,i,s,n);case 3:t:{if(wh(t,t.stateNode.containerInfo),e===null)throw Error(tt(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,Xm(e,t),sc(t,i,null,n);var r=t.memoizedState;if(i=r.cache,ca(t,je,i),i!==a.cache&&Gm(t,[je],n,!0),ic(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Jy(e,t,i,n);break t}else if(i!==s){s=Ri(Error(tt(424)),t),gc(s),t=Jy(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Le=Di(e.firstChild),pn=t,ee=!0,pa=null,Ni=!0,n=IS(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(ur(),i===s){t=Os(e,t,n);break t}an(e,t,i,n)}t=t.child}return t;case 26:return Kr(e,t),e===null?(n=Tx(t.type,null,t.pendingProps,null))?t.memoizedState=n:ee||(t.stateNode=db(t.type,t.pendingProps,da.current,t)):t.memoizedState=Tx(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Nm(t),e===null&&ee&&(i=t.stateNode=bb(t.type,t.pendingProps,da.current),pn=t,Ni=!0,s=Le,Ra(t.type)?(Cg=s,Le=Di(i.firstChild)):Le=s),an(e,t,t.pendingProps.children,n),Kr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&ee&&((s=i=Le)&&(i=cC(i,t.type,t.pendingProps,Ni),i!==null?(t.stateNode=i,pn=t,Le=Di(i.firstChild),Ni=!1,s=!0):s=!1),s||Ea(t)),Nm(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Eg(s,a)?i=null:r!==null&&Eg(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=t0(e,t,rw,null,null,n),Uo._currentValue=s),Kr(e,t),an(e,t,i,n),t.child;case 6:return e===null&&ee&&((e=n=Le)&&(n=uC(n,t.pendingProps,Ni),n!==null?(t.stateNode=n,pn=t,Le=null,e=!0):e=!1),e||Ea(t)),null;case 13:return bM(e,t,n);case 4:return wh(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=pr(t,null,i,n):an(e,t,i,n),t.child;case 11:return ky(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,Kr(e,t),an(e,t,i,n),t.child;case 8:return an(e,t,t.pendingProps.children,n),t.child;case 12:return an(e,t,t.pendingProps.children,n),t.child;case 10:return jy(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,fr(t),s=yn(s),i=i(s),t.flags|=1,an(e,t,i,n),t.child;case 14:return Xy(e,t,t.type,t.pendingProps,n);case 15:return SM(e,t,t.type,t.pendingProps,n);case 19:return ig(e,t,n);case 31:return mw(e,t,n);case 22:return MM(e,t,n,t.pendingProps);case 24:return fr(t),i=yn(je),e===null?(s=Zg(),s===null&&(s=Ce,a=Yg(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},Kg(t),ca(t,je,s)):((e.lanes&n)!==0&&(Xm(e,t),sc(t,null,null,n),ic()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),ca(t,je,i)):(i=a.cache,ca(t,je,i),i!==s.cache&&Gm(t,[je],n,!0))),an(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:ee&&cf(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:Kr(e,t),an(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(tt(156,t.tag))}function As(e){e.flags|=4}function cm(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?Cx(t,i):Cx(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if($M())e.flags|=8192;else throw lr=Ph,Jg}else e.flags&=-16777217}function $y(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!wb(t))if($M())e.flags|=8192;else throw lr=Ph,Jg}function $u(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Jx():536870912,e.lanes|=t,Ao|=t)}function kl(e,t){if(!ee)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function vw(e,t,n){var i=t.pendingProps;switch(qg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(t),null;case 1:return Ue(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Ns(je),Mo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Zr(t)?As(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,sm())),Ue(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(As(t),a!==null?(Ue(t),$y(t,a)):(Ue(t),cm(t,s,null,i,n))):a?a!==e.memoizedState?(As(t),Ue(t),$y(t,a)):(Ue(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&As(t),Ue(t),cm(t,s,e,i,n)),null;case 27:if(Ch(t),n=da.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&As(t);else{if(!i){if(t.stateNode===null)throw Error(tt(166));return Ue(t),t.subtreeFlags&=-33554433,null}e=cs.current,Zr(t)?Ay(t,e):(e=bb(s,i,n),t.stateNode=e,As(t))}return Ue(t),t.subtreeFlags&=-33554433,null;case 5:if(Ch(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&As(t);else{if(!i){if(t.stateNode===null)throw Error(tt(166));return Ue(t),t.subtreeFlags&=-33554433,null}if(a=cs.current,Zr(t))Ay(t,a);else{var r=Mc(da.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[vn]=t,a[Kn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(Mn(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&As(t)}}return Ue(t),t.subtreeFlags&=-33554433,cm(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&As(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(tt(166));if(e=da.current,Zr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=pn,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[vn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||hb(e.nodeValue,n)),e||Ea(t,!0)}else e=Mc(e).createTextNode(i),e[vn]=t,t.stateNode=e}return Ue(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Zr(t),n!==null){if(e===null){if(!i)throw Error(tt(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(tt(557));e[vn]=t}else ur(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ue(t),e=!1}else n=sm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(si(t),t):(si(t),null);if((t.flags&128)!==0)throw Error(tt(558))}return Ue(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=Zr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(tt(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(tt(317));s[vn]=t}else ur(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ue(t),s=!1}else s=sm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(si(t),t):(si(t),null)}return si(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),$u(t,t.updateQueue),Ue(t),null);case 4:return Mo(),e===null&&M0(t.stateNode.containerInfo),t.flags|=67108864,Ue(t),null;case 10:return Ns(t.type),Ue(t),null;case 19:if(jg(t),i=t.memoizedState,i===null)return Ue(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)kl(i,!1);else{if(qe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=zh(e),a!==null){for(t.flags|=128,kl(i,!1),e=a.updateQueue,t.updateQueue=e,$u(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)AS(n,e),n=n.sibling;return vc(t,Sn.current&1|2),ee&&ws(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&oi()>Zh&&(t.flags|=128,s=!0,kl(i,!1),t.lanes=4194304)}else{if(!s)if(e=zh(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,$u(t,e),kl(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!ee)return Ue(t),null}else 2*oi()-i.renderingStartTime>Zh&&n!==536870912&&(t.flags|=128,s=!0,kl(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=oi(),e.sibling=null,a=Sn.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||ee?vc(t,a):(n=a,Ie(bn,t),Ie(Sn,n),wn===null&&(wn=t)),ee&&ws(t,i.treeForkCount),e}return Ue(t),null;case 22:case 23:return si(t),Qg(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Ue(t),t.subtreeFlags&6&&(t.flags|=8192)):Ue(t),n=t.updateQueue,n!==null&&$u(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&xn(or),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ns(je),Ue(t),null;case 25:return null;case 30:return t.flags|=33554432,Ue(t),null}throw Error(tt(156,t.tag))}function yw(e,t){switch(qg(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ns(je),Mo(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ch(t),null;case 31:if(t.memoizedState!==null){if(si(t),t.alternate===null)throw Error(tt(340));ur()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(si(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(tt(340));ur()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return jg(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Mo(),null;case 10:return Ns(t.type),null;case 22:case 23:return si(t),Qg(),e!==null&&xn(or),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ns(je),null;case 25:return null;default:return null}}function TM(e,t){switch(qg(t),t.tag){case 3:Ns(je),Mo();break;case 26:case 27:case 5:Ch(t);break;case 4:Mo();break;case 31:t.memoizedState!==null&&si(t);break;case 13:si(t);break;case 19:jg(t);break;case 10:Ns(t.type);break;case 22:case 23:si(t),Qg(),e!==null&&xn(or);break;case 24:Ns(je)}}function Oc(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){Ee(t,t.return,o)}}function Aa(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(h){Ee(s,l,h)}}}i=i.next}while(i!==a)}}catch(h){Ee(t,t.return,h)}}function AM(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{PS(t,n)}catch(i){Ee(e,e.return,i)}}}function wM(e,t,n){n.props=gr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){Ee(e,t,i)}}function is(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=Us(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=_b(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new fi(e);Jn(e.child,!1,oC,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){Ee(e,t,o)}}function _n(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){Ee(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){Ee(e,t,s)}else n.current=null}function kh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)Sb(e.stateNode,t[n])}function tx(e){for(var t=e.return;t!==null&&(m0(t)&&Sb(e.stateNode,t.stateNode),!p0(t));)t=t.return}function oc(e){for(var t=e.return;t!==null&&(m0(t)&&lC(e.stateNode,t.stateNode),!p0(t));)t=t.return}function p0(e){return e.tag===5||e.tag===3||e.tag===27}function m0(e){return e&&e.tag===7&&e.stateNode!==null}function sg(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){Ee(e,e.return,s)}}function um(e,t,n){try{var i=e.stateNode;kw(i,e.type,n,t),i[Kn]=t}catch(s){Ee(e,e.return,s)}}function CM(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ra(e.type)||e.tag===4}function hm(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||CM(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ra(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ag(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=rs)),kh(e,i),me=!0;else if(s!==4&&(s===27&&(kh(e,i),i=null,Ra(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(ag(e,t,n,i),e=e.sibling;e!==null;)ag(e,t,n,i),e=e.sibling}function Xh(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),kh(e,i),me=!0;else if(s!==4&&(s===27&&(kh(e,i),i=null,Ra(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Xh(e,t,n,i),e=e.sibling;e!==null;)Xh(e,t,n,i),e=e.sibling}function RM(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);Mn(t,i,n),t[vn]=e,t[Kn]=n}catch(a){Ee(e,e.return,a)}}var Wh=!1,ai=null;function ex(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Wh=!0)}var ss=null;function nx(){var e=ss;return ss=null,e}var qn=0;function zo(e,t,n,i,s){return qn=0,NM(e.child,t,n,i,s)}function NM(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Tg(r);i.push(o),o.view&&(a=!0)}else a||Tg(r).view&&(a=!0);Wh=!0,pb(r,qn===0?t:t+"_"+qn,n),qn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||NM(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function hs(e,t){for(;e!==null;)e.tag===5?mb(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||hs(e.child,t)),e=e.sibling}function _h(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(_h(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(tt(544));var n=t.name;t=zs(t.default,t.share),t!=="none"&&(zo(e,n,t,null,!1)||hs(e.child,!1))}e=e.sibling}}function rg(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=Us(i,n),a=zs(i.default,n.paired?i.share:i.enter);a!=="none"?zo(e,s,a,null,!1)?(_h(e),n.paired||t||wo(e,i.onEnter)):hs(e.child,!1):_h(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)rg(e,t),e=e.sibling;else _h(e)}function og(e){if(ai!==null&&ai.size!==0){var t=ai;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=zs(n.default,n.share);if(a!=="none"&&(zo(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,wo(e,n.onShare)):hs(e.child,!1)),t.delete(i),t.size===0)break}}}og(e)}e=e.sibling}}}function lg(e){if(e.tag===30){var t=e.memoizedProps,n=Us(t,e.stateNode),i=ai!==null?ai.get(n):void 0,s=zs(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(zo(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,ai.delete(n),wo(e,t.onShare)):wo(e,t.onExit):hs(e.child,!1)),ai!==null&&og(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)lg(e),e=e.sibling;else ai!==null&&og(e)}function DM(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Us(t,e.stateNode);t=zs(t.default,t.update),e.flags&=-5,t!=="none"&&zo(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&DM(e);e=e.sibling}}function cg(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,hs(e.child,!1))}cg(e)}e=e.sibling}}function vh(e){if(e.tag===30)e.stateNode.paired=null,hs(e.child,!1),cg(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)vh(e),e=e.sibling;else cg(e)}function UM(e){for(e=e.child;e!==null;)e.tag===30?hs(e.child,!1):(e.subtreeFlags&33554432)!==0&&UM(e),e=e.sibling}function g0(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&qn<a.length){var c=a[qn],h=Tg(l);(c.view||h.view)&&(o=!0);var p;if(p=(e.flags&4)===0)if(h.clip)p=!0;else{p=c.rect;var u=h.rect;p=p.y!==u.y||p.x!==u.x||p.height!==u.height||p.width!==u.width}p&&(e.flags|=4),h.abs?h=!c.abs:(c=c.rect,h=h.rect,h=c.height!==h.height||c.width!==h.width),h&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&pb(l,qn===0?n:n+"_"+qn,s),o&&(e.flags&4)!==0||(ss===null&&(ss=[]),ss.push(l,qn===0?i:i+"_"+qn,t.memoizedProps)),qn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:g0(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function LM(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=Us(n,i),a=zs(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(Jw)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;qn=0,s=g0(i,o,s,s,a,r,!1),(e.flags&4)!==0&&s&&(t||wo(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&LM(e,t);e=e.sibling}}var hn=!1,xe=!1,ts=!1,fm=!1,ix=typeof WeakSet=="function"?WeakSet:Set,fn=null,es=!1,Ql=!1,qh=!1,ug=!1;function xw(e,t,n){if(e=e.containerInfo,Mg=Lo,e=vS(e),Gg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,h=0,p=0,u=e,d=null;e:for(;;){for(var g;u!==i||a!==0&&u.nodeType!==3||(l=o+a),u!==r||s!==0&&u.nodeType!==3||(c=o+s),u.nodeType===3&&(o+=u.nodeValue.length),(g=u.firstChild)!==null;)d=u,u=g;for(;;){if(u===e)break e;if(d===i&&++h===a&&(l=o),d===r&&++p===s&&(c=o),(g=u.nextSibling)!==null)break;u=d,d=u.parentNode}u=g}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(bg={focusedElem:e,selectionRange:i},Lo=!1,n=(n&335544064)===n,fn=t,t=n?9270:1024;fn!==null;){if(e=fn,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&lg(i[a]);if(e.alternate===null&&(e.flags&2)!==0)n&&ex(e),th(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&lg(i),th(n);continue}else if(i!==null&&i.memoizedState!==null){n&&ex(e),th(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,fn=i):(n&&DM(e),th(n))}}ai=null}function th(e){for(;fn!==null;){var t=fn,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((s&1024)!==0&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=gr(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){Ee(t,t.return,o)}}break;case 3:if((s&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)Ag(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":Ag(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=Us(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=zs(s.default,s.update),s!=="none"&&zo(i,n,s,i.memoizedState=[],!0));break;default:if((s&1024)!==0)throw Error(tt(163))}if(i=t.sibling,i!==null){i.return=t.return,fn=i;break}fn=t.return}}function IM(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:ns(e,n),i&4&&Oc(5,n);break;case 1:if(ns(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){Ee(n,n.return,r)}else{var s=gr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){Ee(n,n.return,r)}}i&64&&AM(n),i&512&&is(n,n.return);break;case 3:if(ns(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{PS(e,t)}catch(r){Ee(n,n.return,r)}}break;case 27:t===null&&i&4&&RM(n);case 26:case 5:ns(e,n),t===null&&i&4&&sg(n),i&512&&is(n,n.return);break;case 12:ns(e,n);break;case 31:ns(e,n),i&4&&zM(e,n);break;case 13:ns(e,n),i&4&&FM(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Uw.bind(null,n),hC(e,n))));break;case 22:if(i=n.memoizedState!==null||hn,!i){var a=t!==null&&t.memoizedState!==null||xe;t=hn,s=xe,hn=i,(xe=a)&&!s?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),Bi(e,n,i)):ns(e,n),hn=t,xe=s}break;case 30:ns(e,n),i&512&&is(n,n.return);break;case 7:i&512&&is(n,n.return);default:ns(e,n)}}function hg(e,t){for(e=e.child;e!==null;)OM(e,t),e=e.sibling}function OM(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){Ee(e,e.return,l)}fg(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,me=!0}catch(l){Ee(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?yx(o,!0):yx(e.stateNode,!1)}catch(l){Ee(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&hg(e,t);break;default:hg(e,t)}}function fg(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:OM(n,i);break t;case 22:n.memoizedState===null&&fg(n,i);break t;default:fg(n,i)}}e=e.sibling}}function PM(e){var t=e.alternate;t!==null&&(e.alternate=null,PM(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&nf(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var He=null,Xn=!1;function Pi(e,t,n){for(n=n.child;n!==null;)BM(e,t,n),n=n.sibling}function BM(e,t,n){if(li&&typeof li.onCommitFiberUnmount=="function")try{li.onCommitFiberUnmount(Cc,n)}catch{}switch(n.tag){case 26:xe||_n(n,t),Pi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!xe&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:xe||_n(n,t),oc(n);var i=He,s=Xn;Ra(n.type)&&(He=n.stateNode,Xn=!1),Pi(e,t,n),Eb(n.stateNode,n.type,n.memoizedProps),He=i,Xn=s;break;case 5:xe||_n(n,t),oc(n);case 6:if(n.tag===6&&oc(n),i=He,s=Xn,He=null,Pi(e,t,n),He=i,Xn=s,He!==null)if(Xn)try{(He.nodeType===9?He.body:He.nodeName==="HTML"?He.ownerDocument.body:He).removeChild(n.stateNode),me=!0}catch(a){Ee(n,t,a)}else try{He.removeChild(n.stateNode),me=!0}catch(a){Ee(n,t,a)}break;case 18:He!==null&&(Xn?(e=He,vx(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Io(e)):vx(He,n.stateNode));break;case 4:i=He,s=Xn,He=n.stateNode.containerInfo,Xn=!0,Pi(e,t,n),He=i,Xn=s;break;case 0:case 11:case 14:case 15:Aa(2,n,t),xe||Aa(4,n,t),Pi(e,t,n);break;case 1:xe||(_n(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&wM(n,t,i)),Pi(e,t,n);break;case 21:Pi(e,t,n);break;case 22:xe=(i=xe)||n.memoizedState!==null,Pi(e,t,n),xe=i;break;case 30:_n(n,t),Pi(e,t,n);break;case 7:xe||_n(n,t),Pi(e,t,n);break;default:Pi(e,t,n)}}function zM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Io(e)}catch(n){Ee(t,t.return,n)}}}function FM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Io(e)}catch(n){Ee(t,t.return,n)}}function Sw(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ix),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ix),t;default:throw Error(tt(435,e.tag))}}function eh(e,t){var n=Sw(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=Lw.bind(null,e,i);i.then(s,s)}})}function In(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(Ra(l.type)){He=l.stateNode,Xn=!1;break t}break;case 5:He=l.stateNode,Xn=!1;break t;case 3:case 4:He=l.stateNode.containerInfo,Xn=!0;break t}l=l.return}if(He===null)throw Error(tt(160));BM(r,o,a),He=null,Xn=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)HM(t,e,n),t=t.sibling}var zi=null;function HM(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}In(t,e,n),On(e),s&4&&(Aa(3,e,e.return),Oc(3,e),Aa(5,e,e.return));break;case 1:In(t,e,n),On(e),s&512&&(xe||i===null||_n(i,i.return)),s&64&&hn&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=zi,In(t,e,n),On(e),s&512&&(xe||i===null||_n(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(hn)e.stateNode=db(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[Dc]||i[vn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),Mn(i,t,n),i[vn]=e,dn(i),t=i;break t;case"link":if(a=wx("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),Mn(i,t,n),s.head.appendChild(i);break;case"meta":if(a=wx("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),Mn(i,t,n),s.head.appendChild(i);break;default:throw Error(tt(468,t))}i[vn]=e,dn(i),t=i}e.stateNode=t}else hn||Rg(a,e.type,e.stateNode);else e.stateNode=Ax(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||xe||t.parentNode.removeChild(t)):s.count--,n===null?hn||Rg(a,e.type,e.stateNode):Ax(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&um(e,e.memoizedProps,i.memoizedProps);break;case 27:In(t,e,n),On(e),s&512&&(xe||i===null||_n(i,i.return)),i!==null&&s&4&&um(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=ts,ts=!1,In(t,e,n),ts=a,On(e),s&512&&(xe||i===null||_n(i,i.return)),e.flags&32){t=e.stateNode;try{Eo(t,""),me=!0}catch(h){Ee(e,e.return,h)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,um(e,t,i!==null?i.memoizedProps:t)),s&1024&&(fm=!0);break;case 6:if(In(t,e,n),On(e),s&4){if(e.stateNode===null)throw Error(tt(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,me=!0}catch(h){Ee(e,e.return,h)}}break;case 3:if(me=!1,Mh=null,a=zi,zi=bc(t.containerInfo),In(t,e,n),zi=a,On(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{Io(t.containerInfo)}catch(h){Ee(e,e.return,h)}fm&&(fm=!1,VM(e)),me=!1;break;case 4:s=ts,ts=hn,i=cy(),a=zi,zi=bc(e.stateNode.containerInfo),In(t,e,n),On(e),zi=a,me&&Ql&&(qh=!0),me=i,ts=s;break;case 12:In(t,e,n),On(e);break;case 31:In(t,e,n),On(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,eh(e,t)));break;case 13:In(t,e,n),On(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(gf=oi()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,eh(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=hn,l=xe,c=ts;hn=o||a,ts=c||a,xe=l||r,In(t,e,n),xe=l,ts=c,hn=o,On(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||hn||xe||(t=r||xe,n=hn,i=xe,hn=a||hn,xe=t,ia(e,2),hn=n,xe=i),!a&&ts||hg(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,eh(e,n))));break;case 19:In(t,e,n),On(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,eh(e,t)));break;case 30:s&512&&(xe||i===null||_n(i,i.return)),s=cy(),a=Ql,r=(n&335544064)===n,o=e.memoizedProps,Ql=r&&zs(o.default,o.update)!=="none",In(t,e,n),On(e),r&&i!==null&&me&&(e.flags|=4),Ql=a,me=s;break;case 21:break;case 7:s&512&&(xe||i===null||_n(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:In(t,e,n),On(e)}}function On(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(CM(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(m0(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(p0(s))break;s=s.return}var r=i;if(n==null)throw Error(tt(160));switch(n.tag){case 27:var o=n.stateNode,l=hm(e);Xh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(Eo(c,""),n.flags&=-33);var h=hm(e);Xh(e,h,c,r);break;case 3:case 4:var p=n.stateNode.containerInfo,u=hm(e);ag(e,u,p,r);break;default:throw Error(tt(161))}}catch(d){Ee(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function VM(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;VM(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,Lo=!0,t.reset(),Lo=!1),e=e.sibling}}function Jr(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)GM(t,e),t=t.sibling;else LM(t,!1)}function GM(e,t){var n=e.alternate;if(n===null)rg(e,!1);else switch(e.tag){case 3:if(ug=es=!1,nx(),Jr(t,e),!es&&!qh){if(e=ss,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];mb(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),ug=!0}ss=null;break;case 5:Jr(t,e);break;case 4:i=es,es=!1,Jr(t,e),es&&(qh=!0),es=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?rg(e,!1):Jr(t,e));break;case 30:i=es,s=nx(),es=!1,Jr(t,e),es&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=Us(a,r),r=Us(n.memoizedProps,r);var o=zs(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,qn=0,t=g0(e,n,t,r,o,a,!0),qn!==(a===null?0:a.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(wo(e,e.memoizedProps.onUpdate),ss=s):s!==null&&(s.push.apply(s,ss),ss=s),es=(e.flags&32)!==0?!0:i;break;default:Jr(t,e)}}function ns(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)IM(e,t.alternate,t),t=t.sibling}function ia(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:Aa(4,n,n.return),ia(n,i);break;case 1:_n(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&wM(n,n.return,s),ia(n,i);break;case 27:(i&2)!==0&&Eb(n.stateNode,n.type,n.memoizedProps);case 5:_n(n,n.return),n.tag!==5&&n.tag!==27||oc(n),ia(n,i);break;case 6:oc(n);break;case 26:_n(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||xe||s.parentNode.removeChild(s),ia(n,i);break;case 22:n.memoizedState===null&&ia(n,i);break;case 30:_n(n,n.return),ia(n,i);break;case 7:_n(n,n.return);default:ia(n,i)}e=e.sibling}}function Bi(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:Bi(s,a,n),Oc(4,a);break;case 1:if(Bi(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(h){Ee(i,i.return,h)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)OS(c[s],l)}catch(h){Ee(i,i.return,h)}}o&&r&64&&AM(a),is(a,a.return);break;case 27:(n&2)!==0&&RM(a);case 5:a.tag!==5&&a.tag!==27||tx(a),Bi(s,a,n),o&&i===null&&r&4&&sg(a),is(a,a.return);break;case 6:tx(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||hn||Rg(bc(l.ownerDocument),a.type,l),Bi(s,a,n),o&&i===null&&r&4&&sg(a),is(a,a.return);break;case 12:Bi(s,a,n);break;case 31:Bi(s,a,n),o&&r&4&&zM(s,a);break;case 13:Bi(s,a,n),o&&r&4&&FM(s,a);break;case 22:a.memoizedState===null&&Bi(s,a,n),is(a,a.return);break;case 30:Bi(s,a,n),is(a,a.return);break;case 7:is(a,a.return);default:Bi(s,a,n)}t=t.sibling}}function _0(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Lc(n))}function v0(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Lc(e))}function Ei(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)kM(e,t,n,i),t=t.sibling;else s&&UM(t)}function kM(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&vh(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Ei(e,t,n,i),a&2048&&Oc(9,t);break;case 1:Ei(e,t,n,i);break;case 3:Ei(e,t,n,i),s&&ug&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Lc(a)));break;case 12:if(a&2048){Ei(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){Ee(t,t.return,c)}}else Ei(e,t,n,i);break;case 31:Ei(e,t,n,i);break;case 13:Ei(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&vh(o),r._visibility&2?Ei(e,t,n,i):lc(e,t)):(s&&o!==null&&o.memoizedState!==null&&vh(t),r._visibility&2?Ei(e,t,n,i):(r._visibility|=2,Qr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&_0(o,t);break;case 24:Ei(e,t,n,i),a&2048&&v0(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(hs(a.child,!0),hs(t.child,!0))),Ei(e,t,n,i);break;default:Ei(e,t,n,i)}}function Qr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Qr(a,r,o,l,s),Oc(8,r);break;case 23:break;case 22:var h=r.stateNode;r.memoizedState!==null?h._visibility&2?Qr(a,r,o,l,s):lc(a,r):(h._visibility|=2,Qr(a,r,o,l,s)),s&&c&2048&&_0(r.alternate,r);break;case 24:Qr(a,r,o,l,s),s&&c&2048&&v0(r.alternate,r);break;default:Qr(a,r,o,l,s)}t=t.sibling}}function lc(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:lc(n,i),s&2048&&_0(i.alternate,i);break;case 24:lc(n,i),s&2048&&v0(i.alternate,i);break;default:lc(n,i)}t=t.sibling}}var nr=8192;function $a(e,t,n){if(e.subtreeFlags&nr)for(e=e.child;e!==null;)XM(e,t,n),e=e.sibling}function XM(e,t,n){switch(e.tag){case 26:$a(e,t,n),e.flags&nr&&(e.memoizedState!==null?TC(n,zi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&Rx(n,e)));break;case 5:$a(e,t,n),e.flags&nr&&(e=e.stateNode,(t&335544128)===t&&Rx(n,e));break;case 3:case 4:var i=zi;zi=bc(e.stateNode.containerInfo),$a(e,t,n),zi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=nr,nr=16777216,$a(e,t,n),nr=i):$a(e,t,n));break;case 30:if((e.flags&nr)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,ai===null&&(ai=new Map),ai.set(i,s)}$a(e,t,n);break;default:$a(e,t,n)}}function WM(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Xl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];fn=i,YM(i,e)}WM(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)qM(e),e=e.sibling}function qM(e){switch(e.tag){case 0:case 11:case 15:Xl(e),e.flags&2048&&Aa(9,e,e.return);break;case 3:Xl(e);break;case 12:Xl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,yh(e)):Xl(e);break;default:Xl(e)}}function yh(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];fn=i,YM(i,e)}WM(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Aa(8,t,t.return),yh(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,yh(t));break;default:yh(t)}e=e.sibling}}function YM(e,t){for(;fn!==null;){var n=fn;switch(n.tag){case 0:case 11:case 15:Aa(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Lc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,fn=i;else t:for(n=e;fn!==null;){i=fn;var s=i.sibling,a=i.return;if(PM(i),i===n){fn=null;break t}if(s!==null){s.return=a,fn=s;break t}fn=a}}}var Mw={getCacheForType:function(e){var t=yn(je),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return yn(je).controller.signal}},bw=typeof WeakMap=="function"?WeakMap:Map,ge=0,Ce=null,ae=null,le=0,Me=0,ni=null,ua=!1,Fo=!1,y0=!1,Ps=0,qe=0,wa=0,cr=0,Yh=0,ri=0,Ao=0,cc=null,Wn=null,dg=!1,gf=0,ZM=0,Zh=1/0,Jh=null,ya=null,Ge=0,Hi=null,_r=null,us=0,pg=0,mg=null,JM=null,yo=null,xo=null,So=null,uc=0,xh=null;function ui(){return(ge&2)!==0&&le!==0?le&-le:qt.T!==null?S0():$x()}function KM(){if(ri===0)if((le&536870912)===0||ee){var e=Gu;Gu<<=1,(Gu&3932160)===0&&(Gu=262144),ri=e}else ri=536870912;return e=bn.current,e!==null&&(e.flags|=32),ri}function wo(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=_b(Us(e.memoizedProps,n))),xo===null&&(xo=[]),xo.push(t.bind(null,i))}}function Zn(e,t,n){(e===Ce&&(Me===2||Me===9)||e.cancelPendingCommit!==null)&&(Co(e,0),ha(e,le,ri,!1)),Nc(e,n),((ge&2)===0||e!==Ce)&&(e===Ce&&((ge&2)===0&&(cr|=n),qe===4&&ha(e,le,ri,!1)),ds(e))}function QM(e,t,n){if((ge&6)!==0)throw Error(tt(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Rc(e,t),s=i?Aw(e,t):dm(e,t,!0),a=i;do{if(s===0){Fo&&!i&&ha(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!Ew(n)){s=dm(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=cc;var l=o.current.memoizedState.isDehydrated;if(l&&(Co(o,r).flags|=256),r=dm(o,r,!1),r!==2&&r!==6){if(y0&&!l){o.errorRecoveryDisabledLanes|=a,cr|=a,s=4;break t}a=Wn,Wn=s,a!==null&&(Wn===null?Wn=a:Wn.push.apply(Wn,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){Co(e,0),ha(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(tt(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:ha(i,t,ri,!ua);break t;case 2:Wn=null;break;case 3:case 5:break;default:throw Error(tt(329))}if((t&62914560)===t&&(s=gf+300-oi(),10<s)){if(ha(i,t,ri,!ua),ef(i,0,!0)!==0)break t;us=t,i.timeoutHandle=b0(sx.bind(null,i,n,Wn,Jh,dg,t,ri,cr,Ao,ua,a,"Throttled",-0,0),s);break t}sx(i,n,Wn,Jh,dg,t,ri,cr,Ao,ua,a,null,-0,0)}}break}while(!0);ds(e)}function sx(e,t,n,i,s,a,r,o,l,c,h,p,u,d){e.timeoutHandle=-1;var g=t.subtreeFlags,M=(a&335544064)===a;if(p=null,(M||g&8192||(g&16785408)===16785408)&&(p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:rs},ai=null,XM(t,a,p),M&&(g=p,M=e.containerInfo,M=(M.nodeType===9?M:M.ownerDocument).__reactViewTransition,M!=null&&(g.count++,g.waitingForViewTransition=!0,g=Ec.bind(g),M.finished.then(g,g))),g=(a&62914560)===a?gf-oi():(a&4194048)===a?ZM-oi():0,g=AC(p,g),g!==null)){us=a,e.cancelPendingCommit=g(rx.bind(null,e,t,a,n,i,s,r,o,l,c,h,p,null,u,d)),ha(e,a,r,!c);return}rx(e,t,a,n,i,s,r,o,l,c,h,p)}function Ew(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!hi(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ha(e,t,n,i){t=Zx(e,t),t&=~Yh,t&=~cr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-ci(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&Kx(e,n,t)}function _f(){return(ge&6)===0?(Pc(0,!1),!1):!0}function x0(){if(ae!==null){if(Me===0)var e=ae.return;else e=ae,Cs=Mr=null,i0(e),go=null,_c=0,e=ae;for(;e!==null;)TM(e.alternate,e),e=e.return;ae=null}}function Co(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,qw(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),us=0,x0(),Ce=e,ae=n=Rs(e.current,null),le=t,Me=0,ni=null,ua=!1,Fo=Rc(e,t),y0=!1,Ao=ri=Yh=cr=wa=qe=0,Wn=cc=null,dg=!1,Ps=Zx(e,t),of(),n}function jM(e,t){$t=null,qt.H=Vh,t===Bo||t===uf?(t=Dy(),Me=3):t===Jg?(t=Dy(),Me=4):Me=t===h0?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ni=t,ae===null&&(qe=1,Gh(e,Ri(t,e.current)))}function $M(){var e=bn.current;return e===null?!0:(le&4194048)===le?wn===null:(le&62914560)===le||(le&536870912)!==0?e===wn:!1}function tb(){var e=qt.H;return qt.H=Vh,e===null?Vh:e}function eb(){var e=qt.A;return qt.A=Mw,e}function Kh(){qe=4,ua||(le&4194048)!==le&&bn.current!==null||(Fo=!0),(wa&134217727)===0&&(cr&134217727)===0||Ce===null||ha(Ce,le,ri,!1)}function dm(e,t,n){var i=ge;ge|=2;var s=tb(),a=eb();(Ce!==e||le!==t)&&(Jh=null,Co(e,t)),t=!1;var r=qe;t:do try{if(Me!==0&&ae!==null){var o=ae,l=ni;switch(Me){case 8:x0(),r=6;break t;case 3:case 2:case 9:case 6:bn.current===null&&(t=!0);var c=Me;if(Me=0,ni=null,uo(e,o,l,c),n&&Fo){r=0;break t}break;default:c=Me,Me=0,ni=null,uo(e,o,l,c)}}Tw(),r=qe;break}catch(h){jM(e,h)}while(!0);return t&&e.shellSuspendCounter++,Cs=Mr=null,ge=i,qt.H=s,qt.A=a,ae===null&&(Ce=null,le=0,of()),r}function Tw(){for(;ae!==null;)nb(ae)}function Aw(e,t){var n=ge;ge|=2;var i=tb(),s=eb();Ce!==e||le!==t?(Jh=null,Zh=oi()+500,Co(e,t)):Fo=Rc(e,t);t:do try{if(Me!==0&&ae!==null){t=ae;var a=ni;e:switch(Me){case 1:Me=0,ni=null,uo(e,t,a,1);break;case 2:case 9:if(Ny(a)){Me=0,ni=null,ax(t);break}t=function(){Me!==2&&Me!==9||Ce!==e||(Me=7),ds(e)},a.then(t,t);break t;case 3:Me=7;break t;case 4:Me=5;break t;case 7:Ny(a)?(Me=0,ni=null,ax(t)):(Me=0,ni=null,uo(e,t,a,7));break;case 5:var r=null;switch(ae.tag){case 26:r=ae.memoizedState;case 5:case 27:var o=ae;if(r?wb(r):o.stateNode.complete){Me=0,ni=null;var l=o.sibling;if(l!==null)ae=l;else{var c=o.return;c!==null?(ae=c,vf(c)):ae=null}break e}}Me=0,ni=null,uo(e,t,a,5);break;case 6:Me=0,ni=null,uo(e,t,a,6);break;case 8:x0(),qe=6;break t;default:throw Error(tt(462))}}ww();break}catch(h){jM(e,h)}while(!0);return Cs=Mr=null,qt.H=i,qt.A=s,ge=n,ae!==null?0:(Ce=null,le=0,of(),qe)}function ww(){for(;ae!==null&&!XT();)nb(ae)}function nb(e){var t=EM(e.alternate,e,Ps);e.memoizedProps=e.pendingProps,t===null?vf(e):ae=t}function ax(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Yy(n,t,t.pendingProps,t.type,void 0,le);break;case 11:t=Yy(n,t,t.pendingProps,t.type.render,t.ref,le);break;case 5:i0(t);var i=t;i===pn&&(ee?(Ih(i),i.tag===5&&i.stateNode!=null&&(Le=i.stateNode)):(Ih(i),ee=!0));default:TM(n,t),t=ae=AS(t,Ps),t=EM(n,t,Ps)}e.memoizedProps=e.pendingProps,t===null?vf(e):ae=t}function uo(e,t,n,i){Cs=Mr=null,i0(t),go=null,_c=0;var s=t.return;try{if(pw(e,s,t,n,le)){qe=1,Gh(e,Ri(n,e.current)),ae=null;return}}catch(a){if(s!==null)throw ae=s,a;qe=1,Gh(e,Ri(n,e.current)),ae=null;return}t.flags&32768?(ee||i===1?e=!0:Fo||(le&536870912)!==0?e=!1:(ua=e=!0,(i===2||i===9||i===3||i===6)&&(i=bn.current,i!==null&&i.tag===13&&(i.flags|=16384))),ib(t,e)):vf(t)}function vf(e){var t=e;do{if((t.flags&32768)!==0){ib(t,ua);return}e=t.return;var n=vw(t.alternate,t,Ps);if(n!==null){ae=n;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);qe===0&&(qe=5)}function ib(e,t){do{var n=yw(e.alternate,e);if(n!==null){n.flags&=32767,ae=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ae=e;return}ae=e=n}while(e!==null);qe=6,ae=null}function rx(e,t,n,i,s,a,r,o,l,c,h,p){e.cancelPendingCommit=null;do yf();while(Ge!==0);if((ge&6)!==0)throw Error(tt(327));if(t!==null){if(t===e.current)throw Error(tt(177));e===Ce&&(ae=Ce=null,le=0),_r=t,Hi=e,us=n,mg=s,JM=i,Cw(e,t,n,r,o,l,p)}}function Cw(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(pg=o,o|=kg,tA(e,n,o,i,s,a),xo=null,(n&335544064)===n?(So=nw(e),i=10262):(So=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,Iw(Rh,function(){return yg(),null})):(e.callbackNode=null,e.callbackPriority=0),Wh=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=qt.T,qt.T=null,s=_e.p,_e.p=2,a=ge,ge|=4;try{xw(e,t,n)}finally{ge=a,_e.p=s,qt.T=i}}Ge=1,Wh?yo=jw(r,e.containerInfo,So,gg,_g,Nw,vg,yg,Rw,null,null):(gg(),_g(),vg())}function Rw(e){if(Ge!==0){var t=Hi.onRecoverableError;t(e,{componentStack:null})}}function Nw(){Ge===3&&(Ge=0,GM(_r,Hi),Ge=4)}function gg(){if(Ge===1){Ge=0;var e=Hi,t=_r,n=us,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=qt.T,qt.T=null;var s=_e.p;_e.p=2;var a=ge;ge|=4;try{Ql=qh=!1,HM(t,e,n),n=bg;var r=vS(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&_S(o.ownerDocument.documentElement,o)){if(l!==null&&Gg(o)){var c=l.start,h=l.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var d=u.getSelection(),g=o.textContent.length,M=Math.min(l.start,g),m=l.end===void 0?M:Math.min(l.end,g);!d.extend&&M>m&&(r=m,m=M,M=r);var f=My(o,M),_=My(o,m);if(f&&_&&(d.rangeCount!==1||d.anchorNode!==f.node||d.anchorOffset!==f.offset||d.focusNode!==_.node||d.focusOffset!==_.offset)){var S=p.createRange();S.setStart(f.node,f.offset),d.removeAllRanges(),M>m?(d.addRange(S),d.extend(_.node,_.offset)):(S.setEnd(_.node,_.offset),d.addRange(S))}}}}for(p=[],d=o;d=d.parentNode;)d.nodeType===1&&p.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var v=p[o];v.element.scrollLeft=v.left,v.element.scrollTop=v.top}}Lo=!!Mg,bg=Mg=null}finally{ge=a,_e.p=s,qt.T=i}}e.current=t,Ge=2}}function _g(){if(Ge===2){Ge=0;var e=Hi,t=_r,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=qt.T,qt.T=null;var i=_e.p;_e.p=2;var s=ge;ge|=4;try{IM(e,t.alternate,t)}finally{ge=s,_e.p=i,qt.T=n}}Ge=3}}function vg(){if(Ge===4||Ge===3){Ge=0;var e=yo;yo=null,WT();var t=Hi,n=_r,i=us,s=JM,a=(i&335544064)===i?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Ge=5:(Ge=0,_r=Hi=null,sb(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(ya=null),Pg(i),n=n.stateNode,li&&typeof li.onCommitFiberRoot=="function")try{li.onCommitFiberRoot(Cc,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=qt.T,a=_e.p,_e.p=2,qt.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{qt.T=n,_e.p=a}}if(s=xo,r=So,So=null,s!==null&&(xo=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);(us&3)!==0&&yf(),ds(t),a=t.pendingLanes,(i&261930)!==0&&(a&42)!==0?t===xh?uc++:(uc=0,xh=t):(uc=0,xh=null),Pc(0,!1)}}function sb(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Lc(t)))}function yf(){return yo!==null&&(yo.skipTransition(),yo=null),gg(),_g(),vg(),yg()}function yg(){if(Ge!==5)return!1;var e=Hi,t=pg;pg=0;var n=Pg(us),i=qt.T,s=_e.p;try{_e.p=32>n?32:n,qt.T=null,n=mg,mg=null;var a=Hi,r=us;if(Ge=0,_r=Hi=null,us=0,(ge&6)!==0)throw Error(tt(331));var o=ge;if(ge|=4,qM(a.current),kM(a,a.current,r,n),ge=o,Pc(0,!1),li&&typeof li.onPostCommitFiberRoot=="function")try{li.onPostCommitFiberRoot(Cc,a)}catch{}return!0}finally{_e.p=s,qt.T=i,sb(e,t)}}function ox(e,t,n){t=Ri(n,t),t=jm(e.stateNode,t,2),e=ga(e,t,2),e!==null&&(Nc(e,2),ds(e))}function Ee(e,t,n){if(e.tag===3)ox(e,e,n);else for(;t!==null;){if(t.tag===3){ox(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ya===null||!ya.has(i))){e=Ri(n,e),n=yM(2),i=ga(t,n,2),i!==null&&(xM(n,i,t,e),Nc(i,2),ds(i));break}}t=t.return}}function pm(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new bw;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(y0=!0,s.add(n),e=Dw.bind(null,e,t,n),t.then(e,e))}function Dw(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ce===e&&(le&n)===n&&((qe===4||qe===3&&(le&62914560)===le&&300>oi()-gf)&&(ge&2)===0?Co(e,0):Yh|=n,Ao===le&&(Ao=0)),ds(e)}function ab(e,t){t===0&&(t=Jx()),e=Sr(e,t),e!==null&&(Nc(e,t),ds(e))}function Uw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),ab(e,n)}function Lw(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(tt(314))}i!==null&&i.delete(t),ab(e,n)}function Iw(e,t){return Ig(e,t)}var Ro=null,jr=null,xg=!1,Qh=!1,mm=!1,fa=0;function ds(e){e!==jr&&e.next===null&&(jr===null?Ro=jr=e:jr=jr.next=e),Qh=!0,xg||(xg=!0,Pw())}function Pc(e,t){if(!mm&&Qh){mm=!0;do for(var n=!1,i=Ro;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-ci(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,lx(i,a))}else a=le,a=ef(i,i===Ce?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||Rc(i,a)||(n=!0,lx(i,a));i=i.next}while(n);mm=!1}}function Ow(){rb()}function rb(){Qh=xg=!1;var e=0;fa!==0&&Ww()&&(e=fa);for(var t=oi(),n=null,i=Ro;i!==null;){var s=i.next,a=ob(i,t);a===0?(i.next=null,n===null?Ro=s:n.next=s,s===null&&(jr=n)):(n=i,(e!==0||(a&3)!==0)&&(Qh=!0)),i=s}Ge!==0&&Ge!==5||Pc(e,!1),fa!==0&&(fa=0)}function ob(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-ci(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=$T(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=Ce,n=le,n=ef(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(Me===2||Me===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Yp(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Rc(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Yp(i),Pg(n)){case 2:case 8:n=qx;break;case 32:n=Rh;break;case 268435456:n=Yx;break;default:n=Rh}return i=lb.bind(null,e),n=Ig(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Yp(i),e.callbackPriority=2,e.callbackNode=null,2}function lb(e,t){if(Ge!==0&&Ge!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(yf()&&e.callbackNode!==n)return null;var i=le;return i=ef(e,e===Ce?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(QM(e,i,t),ob(e,oi()),e.callbackNode!=null&&e.callbackNode===n?lb.bind(null,e):null)}function lx(e,t){if(yf())return null;QM(e,t,!0)}function Pw(){Yw(function(){(ge&6)!==0?Ig(Wx,Ow):rb()})}function S0(){if(fa===0){var e=dr;e===0&&(e=Vu,Vu<<=1,(Vu&261888)===0&&(Vu=256)),fa=e}return fa}function cx(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:lh(e)}function Bw(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=cx((s[Kn]||null).action),r=i.submitter;r&&(t=(t=r[Kn]||null)?cx(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new sf("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(fa!==0){var l=new FormData(s,r);Km(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),Km(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(nh=0;nh<Fm.length;nh++)ih=Fm[nh],ux=ih.toLowerCase(),hx=ih[0].toUpperCase()+ih.slice(1),Vi(ux,"on"+hx);var ih,ux,hx,nh;Vi(xS,"onAnimationEnd");Vi(SS,"onAnimationIteration");Vi(MS,"onAnimationStart");Vi("dblclick","onDoubleClick");Vi("focusin","onFocus");Vi("focusout","onBlur");Vi(ZA,"onTransitionRun");Vi(JA,"onTransitionStart");Vi(KA,"onTransitionCancel");Vi(bS,"onTransitionEnd");bo("onMouseEnter",["mouseout","mouseover"]);bo("onMouseLeave",["mouseout","mouseover"]);bo("onPointerEnter",["pointerout","pointerover"]);bo("onPointerLeave",["pointerout","pointerover"]);yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),zw=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xc));function cb(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(h){Dh(h)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(h){Dh(h)}s.currentTarget=null,a=l}}}}function se(e,t){var n=t[ay];n===void 0&&(n=t[ay]=new Set);var i=e+"__bubble";n.has(i)||(ub(t,e,2,!1),n.add(i))}function gm(e,t,n){var i=0;t&&(i|=4),ub(n,e,i,t)}var sh="_reactListening"+Math.random().toString(36).slice(2);function M0(e){if(!e[sh]){e[sh]=!0,eS.forEach(function(n){n!=="selectionchange"&&(zw.has(n)||gm(n,!1,e),gm(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[sh]||(t[sh]=!0,gm("selectionchange",!1,t))}}function ub(e,t,n,i){switch(Ib(t)){case 2:var s=NC;break;case 8:s=DC;break;default:s=R0}n=s.bind(null,t,n,e),s=void 0,!Om||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function _m(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=ir(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}cS(function(){var c=a,h=zg(n),p=[];t:{var u=ES.get(e);if(u!==void 0){var d=sf,g=e;switch(e){case"keypress":if(uh(n)===0)break t;case"keydown":case"keyup":d=EA;break;case"focusin":g="focus",d=$p;break;case"focusout":g="blur",d=$p;break;case"beforeblur":case"afterblur":d=$p;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=dy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=fA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=RA;break;case xS:case SS:case MS:d=mA;break;case bS:d=DA;break;case"scroll":case"scrollend":d=uA;break;case"wheel":d=LA;break;case"copy":case"cut":case"paste":d=_A;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=my;break;case"submit":d=wA;break;case"toggle":case"beforetoggle":d=OA}var M=(t&4)!==0,m=!M&&(e==="scroll"||e==="scrollend"),f=M?u!==null?u+"Capture":null:u;M=[];for(var _=c,S;_!==null;){var v=_;if(S=v.stateNode,v=v.tag,v!==5&&v!==26&&v!==27||S===null||f===null||(v=fc(_,f),v!=null&&M.push(Sc(_,v,S))),m)break;_=_.return}0<M.length&&(u=new d(u,g,null,n,h),p.push({event:u,listeners:M}))}}if((t&7)===0){t:{if(d=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",d&&n!==Im&&(g=n.relatedTarget||n.fromElement)&&(ir(g)||g[Oo]))break t;(u||d)&&(g=h.window===h?h:(d=h.ownerDocument)?d.defaultView||d.parentWindow:window,u?(d=n.relatedTarget||n.toElement,u=c,d=d?ir(d):null,d!==null&&(m=wc(d),M=d.tag,d!==m||M!==5&&M!==27&&M!==6)&&(d=null)):(u=null,d=c),u!==d&&(M=dy,v="onMouseLeave",f="onMouseEnter",_="mouse",(e==="pointerout"||e==="pointerover")&&(M=my,v="onPointerLeave",f="onPointerEnter",_="pointer"),m=u==null?g:Jl(u),S=d==null?g:Jl(d),g=new M(v,_+"leave",u,n,h),g.target=m,g.relatedTarget=S,v=null,ir(h)===c&&(M=new M(f,_+"enter",d,n,h),M.target=S,M.relatedTarget=m,v=M),m=v,M=u&&d?Mm(u,d,Fw):null,u!==null&&fx(p,g,u,M,!1),d!==null&&m!==null&&fx(p,m,d,M,!0)))}t:{if(u=c?Jl(c):window,d=u.nodeName&&u.nodeName.toLowerCase(),d==="select"||d==="input"&&u.type==="file")var E=yy;else if(vy(u))if(mS)E=WA;else{E=kA;var T=GA}else d=u.nodeName,!d||d.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Bg(c.elementType)&&(E=yy):E=XA;if(E&&(E=E(e,c))){pS(p,E,n,h);break t}T&&T(e,u,c)}switch(T=c?Jl(c):window,e){case"focusin":(vy(T)||T.contentEditable==="true")&&(so=T,Bm=c,tc=null);break;case"focusout":tc=Bm=so=null;break;case"mousedown":zm=!0;break;case"contextmenu":case"mouseup":case"dragend":zm=!1,by(p,n,h);break;case"selectionchange":if(YA)break;case"keydown":case"keyup":by(p,n,h)}var R;if(Vg)t:{switch(e){case"compositionstart":var x="onCompositionStart";break t;case"compositionend":x="onCompositionEnd";break t;case"compositionupdate":x="onCompositionUpdate";break t}x=void 0}else io?fS(e,n)&&(x="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(hS&&n.locale!=="ko"&&(io||x!=="onCompositionStart"?x==="onCompositionEnd"&&io&&(R=uS()):(la=h,Fg="value"in la?la.value:la.textContent,io=!0)),T=jh(c,x),0<T.length&&(x=new py(x,e,null,n,h),p.push({event:x,listeners:T}),R?x.data=R:(R=dS(n),R!==null&&(x.data=R)))),(R=BA?zA(e,n):FA(e,n))&&(x=jh(c,"onBeforeInput"),0<x.length&&(T=new py("onBeforeInput","beforeinput",null,n,h),p.push({event:T,listeners:x}),T.data=R)),Bw(p,e,c,n,h)}cb(p,t)})}function Sc(e,t,n){return{instance:e,listener:t,currentTarget:n}}function jh(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=fc(e,n),s!=null&&i.unshift(Sc(e,s,a)),s=fc(e,t),s!=null&&i.push(Sc(e,s,a))),e.tag===3)return i;e=e.return}return[]}function Fw(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function fx(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=fc(n,a),c!=null&&r.unshift(Sc(n,c,l))):s||(c=fc(n,a),c!=null&&r.push(Sc(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var Hw=/\r\n?/g,Vw=/\u0000|\uFFFD/g;function dx(e){return(typeof e=="string"?e:""+e).replace(Hw,`
`).replace(Vw,"")}function hb(e,t){return t=dx(t),dx(e)===t}function be(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||Eo(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&Eo(e,""+i);else return;break;case"className":Xu(e,"class",i);break;case"tabIndex":Xu(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Xu(e,n,i);break;case"style":lS(e,i,a);return;case"data":if(t!=="object"){Xu(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=lh(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&be(e,t,"name",s.name,s,null),be(e,t,"formEncType",s.formEncType,s,null),be(e,t,"formMethod",s.formMethod,s,null),be(e,t,"formTarget",s.formTarget,s,null)):(be(e,t,"encType",s.encType,s,null),be(e,t,"method",s.method,s,null),be(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=lh(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=rs);return;case"onScroll":i!=null&&se("scroll",e);return;case"onScrollEnd":i!=null&&se("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(tt(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(tt(60));(a!=null?a.__html:void 0)!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=lh(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":se("beforetoggle",e),se("toggle",e),oh(e,"popover",i);break;case"xlinkActuate":Ts(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Ts(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Ts(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Ts(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Ts(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Ts(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Ts(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Ts(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Ts(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":oh(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=lA.get(n)||n,oh(e,n,i);else return}me=!0}function Sg(e,t,n,i,s,a){switch(n){case"style":lS(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(tt(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(tt(60));(a!=null?a.__html:void 0)!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")Eo(e,i);else if(typeof i=="number"||typeof i=="bigint")Eo(e,""+i);else return;break;case"onScroll":i!=null&&se("scroll",e);return;case"onScrollEnd":i!=null&&se("scrollend",e);return;case"onClick":i!=null&&(e.onclick=rs);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!nS.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[Kn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}me=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):oh(e,n,i)}return}me=!0}function Mn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":se("error",e),se("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(tt(137,t));default:be(e,t,a,r,n,null)}}s&&be(e,t,"srcSet",n.srcSet,n,null),i&&be(e,t,"src",n.src,n,null);return;case"input":se("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":s=h;break;case"type":r=h;break;case"checked":l=h;break;case"defaultChecked":c=h;break;case"value":a=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(tt(137,t));break;default:be(e,t,i,h,n,null)}}aS(e,a,o,l,c,r,s,!1);return;case"select":se("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:be(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?fo(e,!!i,t,!1):n!=null&&fo(e,!!i,n,!0);return;case"textarea":se("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(tt(91));break;default:be(e,t,r,o,n,null)}oS(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":be(e,t,l,i,n,null));return;case"dialog":se("beforetoggle",e),se("toggle",e),se("cancel",e),se("close",e);break;case"iframe":case"object":se("load",e);break;case"video":case"audio":for(i=0;i<xc.length;i++)se(xc[i],e);break;case"image":se("error",e),se("load",e);break;case"details":se("toggle",e);break;case"embed":case"source":case"link":se("error",e),se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(tt(137,t));default:be(e,t,c,i,n,null)}return;default:if(Bg(t)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&Sg(e,t,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&be(e,t,o,i,n,null))}var Gw={};function kw(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,h=null;for(d in n){var p=n[d];if(n.hasOwnProperty(d)&&p!=null)switch(d){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(d)||be(e,t,d,null,i,p)}}for(var u in i){var d=i[u];if(p=n[u],i.hasOwnProperty(u)&&(d!=null||p!=null))switch(u){case"type":d!==p&&(me=!0),a=d;break;case"name":d!==p&&(me=!0),s=d;break;case"checked":d!==p&&(me=!0),c=d;break;case"defaultChecked":d!==p&&(me=!0),h=d;break;case"value":d!==p&&(me=!0),r=d;break;case"defaultValue":d!==p&&(me=!0),o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(tt(137,t));break;default:d!==p&&be(e,t,u,d,i,p)}}Lm(e,r,o,l,c,h,a,s);return;case"select":d=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":d=l;default:i.hasOwnProperty(a)||be(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&(me=!0),u=a;break;case"defaultValue":a!==l&&(me=!0),o=a;break;case"multiple":a!==l&&(me=!0),r=a;default:a!==l&&be(e,t,s,a,i,l)}t=o,n=r,i=d,u!=null?fo(e,!!n,u,!1):!!i!=!!n&&(t!=null?fo(e,!!n,t,!0):fo(e,!!n,n?[]:"",!1));return;case"textarea":d=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:be(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&(me=!0),u=s;break;case"defaultValue":s!==a&&(me=!0),d=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(tt(91));break;default:s!==a&&be(e,t,r,s,i,a)}rS(e,u,d);return;case"option":for(var g in n)u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g)&&(g==="selected"?e.selected=!1:be(e,t,g,null,i,u));for(l in i)u=i[l],d=n[l],i.hasOwnProperty(l)&&u!==d&&(u!=null||d!=null)&&(l==="selected"?(u!==d&&(me=!0),e.selected=u&&typeof u!="function"&&typeof u!="symbol"):be(e,t,l,u,i,d));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var M in n)u=n[M],n.hasOwnProperty(M)&&u!=null&&!i.hasOwnProperty(M)&&be(e,t,M,null,i,u);for(c in i)if(u=i[c],d=n[c],i.hasOwnProperty(c)&&u!==d&&(u!=null||d!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(tt(137,t));break;default:be(e,t,c,u,i,d)}return;default:if(Bg(t)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Sg(e,t,m,void 0,i,u);for(h in i)u=i[h],d=n[h],!i.hasOwnProperty(h)||u===d||u===void 0&&d===void 0||Sg(e,t,h,u,i,d);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&be(e,t,f,null,i,u);for(p in i)u=i[p],d=n[p],!i.hasOwnProperty(p)||u===d||u==null&&d==null||be(e,t,p,u,i,d)}function px(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Xw(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&px(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var h=l.transferSize,p=l.initiatorType;h&&px(p)&&(l=l.responseEnd,r+=h*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Mg=null,bg=null;function Mc(e){return e.nodeType===9?e:e.ownerDocument}function mx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function fb(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function db(e,t,n,i){return n=Mc(n).createElement(e),n[vn]=i,n[Kn]=t,Mn(n,e,t),dn(n),n}function Eg(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var vm=null;function Ww(){var e=window.event;return e&&e.type==="popstate"?e===vm?!1:(vm=e,!0):(vm=null,!1)}var b0=typeof setTimeout=="function"?setTimeout:void 0,qw=typeof clearTimeout=="function"?clearTimeout:void 0,gx=typeof Promise=="function"?Promise:void 0,_x=typeof requestAnimationFrame=="function"?requestAnimationFrame:b0,Yw=typeof queueMicrotask=="function"?queueMicrotask:typeof gx<"u"?function(e){return gx.resolve(null).then(e).catch(Zw)}:b0;function Zw(e){setTimeout(function(){throw e})}function Ra(e){return e==="head"}function vx(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),Io(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")xm(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,xm(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[Dc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&xm(e.ownerDocument.body);n=s}while(n);Io(t)}function yx(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function pb(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function mb(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function gb(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Tg(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return gb(t,n,e)}function Jw(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return gb(t,n,e)}function Kw(e){return e.documentElement.clientHeight}function Qw(e){this.addEventListener("load",e),this.addEventListener("error",e)}function jw(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var h=c.startViewTransition({update:function(){var u=c.defaultView,d=u.navigation&&u.navigation.transition,g=c.fonts.status;i();var M=[];if(g==="loaded"&&(Kw(c),c.fonts.status==="loading"&&M.push(c.fonts.ready)),g=M.length,e!==null)for(var m=e.suspenseyImages,f=0,_=0;_<m.length;_++){var S=m[_];if(!S.complete){var v=S.getBoundingClientRect();if(0<v.bottom&&0<v.right&&v.top<u.innerHeight&&v.left<u.innerWidth){if(f+=Cb(S),f>bh){M.length=g;break}S=new Promise(Qw.bind(S)),M.push(S)}}}if(0<M.length)return u=Promise.race([Promise.all(M),new Promise(function(E){return setTimeout(E,500)})]).then(s,s),(d?Promise.allSettled([d.finished,u]):u).then(a,a);if(s(),d)return d.finished.then(a,a);a()},types:n});c.__reactViewTransition=h;var p=[];return h.ready.then(function(){for(var u=c.documentElement.getAnimations({subtree:!0}),d=0;d<u.length;d++){var g=u[d],M=g.effect,m=M.pseudoElement;if(m!=null&&m.startsWith("::view-transition")){p.push(g),g=M.getKeyframes();for(var f=m=void 0,_=!0,S=0;S<g.length;S++){var v=g[S],E=v.width;if(m===void 0)m=E;else if(m!==E){_=!1;break}if(E=v.height,f===void 0)f=E;else if(f!==E){_=!1;break}delete v.width,delete v.height,v.transform==="none"&&delete v.transform}_&&m!==void 0&&f!==void 0&&(M.setKeyframes(g),_=getComputedStyle(M.target,M.pseudoElement),_.width!==m||_.height!==f)&&(_=g[0],_.width=m,_.height=f,_=g[g.length-1],_.width=m,_.height=f,M.setKeyframes(g))}}r()},function(u){c.__reactViewTransition===h&&(c.__reactViewTransition=null);try{typeof u=="object"&&u!==null&&u.name==="InvalidStateError"&&(u.message==="View transition was skipped because document visibility state is hidden."||u.message==="Skipping view transition because document visibility state has become hidden."||u.message==="Skipping view transition because viewport size changed."||u.message==="Transition was aborted because of invalid state")&&(u=null),u!==null&&l(u)}finally{i(),s(),r()}}),h.finished.finally(function(){for(var u=0;u<p.length;u++)p[u].cancel();c.__reactViewTransition===h&&(c.__reactViewTransition=null),o()}),h}catch{return i(),s(),r(),null}}function sr(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}sr.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Re({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};sr.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};sr.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function _b(e){return{name:e,group:new sr("group",e),imagePair:new sr("image-pair",e),old:new sr("old",e),new:new sr("new",e)}}function fi(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}fi.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(vb(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=No(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),Jn(this._fragmentFiber.child,!1,$w,e,o,i)}this._eventListeners=a}};function $w(e,t,n,i){return rn(e).addEventListener(t,n,i),!1}fi.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=vb(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=No(s.optionsOrUseCapture),Jn(this._fragmentFiber.child,!1,tC,e,n,s),i.splice(t,1),a!==null&&a()}};function tC(e,t,n,i){return rn(e).removeEventListener(t,n,i),!1}function No(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function xx(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function vb(e,t,n,i){if(e.length===0)return-1;i=xx(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&xx(a.optionsOrUseCapture)===i)return s}return-1}fi.prototype.dispatchEvent=function(e){var t=vr(this._fragmentFiber);if(t===null)return!0;t=rn(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,No(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,No(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};fi.prototype.focus=function(e){Jn(this._fragmentFiber.child,!0,yb,e,void 0,void 0)};function yb(e,t){return e.tag===6?!1:(e=rn(e),fC(e,t))}fi.prototype.focusLast=function(e){var t=[];Jn(this._fragmentFiber.child,!0,E0,t,void 0,void 0);for(var n=t.length-1;0<=n&&!yb(t[n],e);n--);};function E0(e,t){return t.push(e),!1}fi.prototype.blur=function(){var e=vr(this._fragmentFiber);e!==null&&(e=rn(e),e=Mc(e).activeElement,e!==null&&Jn(this._fragmentFiber.child,!1,eC,e,void 0,void 0))};function eC(e,t){return e.tag===6?!1:(e=rn(e),e===t||e.contains(t)?(t.blur(),!0):!1)}fi.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),Jn(this._fragmentFiber.child,!1,nC,e,void 0,void 0)};function nC(e,t){return e.tag===6||(e=rn(e),t.observe(e)),!1}fi.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),Jn(this._fragmentFiber.child,!1,iC,e,void 0,void 0);for(var n=t=0;n<Fi.length;n++){var i=Fi[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Fi[t++]=i}Fi.length=t}};function iC(e,t){return e.tag===6||(e=rn(e),t.unobserve(e)),!1}var Fi=[],ym=!1;function sC(e,t,n){Fi.push({fragmentInstance:e,observer:t,instance:n}),ym||(ym=!0,dC(function(){ym=!1;var i=Fi;Fi=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}fi.prototype.getClientRects=function(){var e=[];return Jn(this._fragmentFiber.child,!1,aC,e,void 0,void 0),e};function aC(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=rn(e),t.push.apply(t,e.getClientRects());return!1}fi.prototype.getRootNode=function(e){var t=vr(this._fragmentFiber);return t===null?this:rn(t).getRootNode(e)};fi.prototype.compareDocumentPosition=function(e){var t=vr(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Jn(this._fragmentFiber.child,!1,E0,n,void 0,void 0);var i=rn(t);if(n.length===0){if(n=i,$v(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=Vx(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=rn(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=rn(n[0]),s=rn(n[n.length-1]);var a=$v(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||rC(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function rC(e,t,n,i,s){var a=ir(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=vr(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=Mm(n,a,ty),t===null?t=!1:(Jn(t,!0,PT,a,n),a=$r,$r=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=Mm(i,a,ty),t===null?t=!1:(Jn(t,!0,BT,a,i),a=$r,Sm=$r=null,t=a!==null)),t):!1}function Sx(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}fi.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(tt(566));var t=[];Jn(this._fragmentFiber.child,!1,E0,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=Vx(this._fragmentFiber);if(i=n?i[1]||i[0]||vr(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=rn(i),Sx(e,n);return}if(i=rn(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=rn(s),Sx(s,n)):rn(s).scrollIntoView(e),i+=n?-1:1}};function oC(e,t){return e=rn(e),xb(e,t),!1}function xb(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function Sb(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,No(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<Fi.length;o++){var l=Fi[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(Fi[r++]=l)}Fi.length=r,a.observe(e)}),xb(e,t))}function lC(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,No(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?sC(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function Ag(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Ag(n),nf(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function cC(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Dc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=Di(e.nextSibling),e===null)break}return null}function uC(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Di(e.nextSibling),e===null))return null;return e}function Mb(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Di(e.nextSibling),e===null))return null;return e}function wg(e){return e.data==="$?"||e.data==="$~"}function T0(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function hC(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Di(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Cg=null;function Mx(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Di(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function bx(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function fC(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function dC(e){_x(function(){_x(function(t){return e(t)})})}function bb(e,t,n){switch(t=Mc(n),e){case"html":if(e=t.documentElement,!e)throw Error(tt(452));return e;case"head":if(e=t.head,!e)throw Error(tt(453));return e;case"body":if(e=t.body,!e)throw Error(tt(454));return e;default:throw Error(tt(451))}}function Eb(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&be(e,t,i,null,Gw,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===rs&&(e.onclick=null),nf(e)}function xm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);nf(e)}var Ui=new Map,Ex=new Set;function bc(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Fs=_e.d;_e.d={f:pC,r:mC,D:gC,C:_C,L:vC,m:yC,X:SC,S:xC,M:MC};function pC(){var e=Fs.f(),t=_f();return e||t}function mC(e){var t=Po(e);t!==null&&t.tag===5&&t.type==="form"?lM(t):Fs.r(e)}var Ho=typeof document>"u"?null:document;function Tb(e,t,n){var i=Ho;if(i&&typeof t=="string"&&t){var s=Ci(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),Ex.has(s)||(Ex.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),Mn(t,"link",e),dn(t),i.head.appendChild(t)))}}function gC(e){Fs.D(e),Tb("dns-prefetch",e,null)}function _C(e,t){Fs.C(e,t),Tb("preconnect",e,t)}function vC(e,t,n){Fs.L(e,t,n);var i=Ho;if(i&&e&&t){var s='link[rel="preload"][as="'+Ci(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+Ci(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+Ci(n.imageSizes)+'"]')):s+='[href="'+Ci(e)+'"]';var a=s;switch(t){case"style":a=Do(e);break;case"script":a=Vo(e)}if(!(Ui.has(a)||(e=Re({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Ui.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(Bc(a))||t==="script"&&i.querySelector(zc(a))))){var r=i.createElement("link");Mn(r,"link",e),t==="style"&&(r[Nh]=!0,r.onload=r.onerror=function(){tS(r)}),dn(r),i.head.appendChild(r)}}}function yC(e,t){Fs.m(e,t);var n=Ho;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+Ci(i)+'"][href="'+Ci(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Vo(e)}if(!Ui.has(a)&&(e=Re({rel:"modulepreload",href:e},t),Ui.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(zc(a)))return}i=n.createElement("link"),Mn(i,"link",e),dn(i),n.head.appendChild(i)}}}function xC(e,t,n){Fs.S(e,t,n);var i=Ho;if(i&&e){var s=ho(i).hoistableStyles,a=Do(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Bc(a)))o.loading=5;else{e=Re({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Ui.get(a))&&A0(e,n);var l=r=i.createElement("link");dn(l),Mn(l,"link",e),l._p=new Promise(function(c,h){l.onload=c,l.onerror=h}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Sh(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function SC(e,t){Fs.X(e,t);var n=Ho;if(n&&e){var i=ho(n).hoistableScripts,s=Vo(e),a=i.get(s);a||(a=n.querySelector(zc(s)),a||(e=Re({src:e,async:!0},t),(t=Ui.get(s))&&w0(e,t),a=n.createElement("script"),dn(a),Mn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function MC(e,t){Fs.M(e,t);var n=Ho;if(n&&e){var i=ho(n).hoistableScripts,s=Vo(e),a=i.get(s);a||(a=n.querySelector(zc(s)),a||(e=Re({src:e,async:!0,type:"module"},t),(t=Ui.get(s))&&w0(e,t),a=n.createElement("script"),dn(a),Mn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function Tx(e,t,n,i){var s=(s=da.current)?bc(s):null;if(!s)throw Error(tt(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=Do(n.href),t=ho(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Do(n.href);var a=ho(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(Bc(e)))?a._p||(r.instance=a,r.state.loading=5):(a=Ui.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ui.set(e,a)),bC(s,e,a,r.state))),t&&i===null)throw Error(tt(528,""));return r}if(t&&i!==null)throw Error(tt(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Vo(n),t=ho(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(tt(444,e))}}function Do(e){return'href="'+Ci(e)+'"'}function Bc(e){return'link[rel="stylesheet"]['+e+"]"}function Ab(e){return Re({},e,{"data-precedence":e.precedence,precedence:null})}function bC(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[Nh]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[Nh]=!0,t.onload=t.onerror=tS.bind(null,t),Mn(t,"link",n),dn(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Vo(e){return'[src="'+Ci(e)+'"]'}function zc(e){return"script[async]"+e}function Ax(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Ci(n.href)+'"]');if(i)return t.instance=i,dn(i),i;var s=Re({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),dn(i),Mn(i,"style",s),Sh(i,n.precedence,e),t.instance=i;case"stylesheet":s=Do(n.href);var a=e.querySelector(Bc(s));if(a)return t.state.loading|=4,t.instance=a,dn(a),a;i=Ab(n),(s=Ui.get(s))&&A0(i,s),a=(e.ownerDocument||e).createElement("link"),dn(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Mn(a,"link",i),t.state.loading|=4,Sh(a,n.precedence,e),t.instance=a;case"script":return a=Vo(n.src),(s=e.querySelector(zc(a)))?(t.instance=s,dn(s),s):(i=n,(s=Ui.get(a))&&(i=Re({},n),w0(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),dn(s),Mn(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(tt(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Sh(i,n.precedence,e));return t.instance}function Sh(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function A0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function w0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Mh=null;function wx(e,t,n){if(Mh===null){var i=new Map,s=Mh=new Map;s.set(n,i)}else s=Mh,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[Dc]||a[vn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function Rg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function EC(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Cx(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function wb(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function Cb(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Rx(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=Cb(t),e.suspenseyImages.push(t)),e=wC.bind(e),t.decode().then(e,e))}function TC(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=Do(i.href),a=t.querySelector(Bc(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Ec.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,dn(a);return}a=t.ownerDocument||t,i=Ab(i),(s=Ui.get(s))&&A0(i,s),a=a.createElement("link"),dn(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Mn(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Ec.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var bh=0;function AC(e,t){return e.stylesheets&&e.count===0&&Eh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&Eh(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&bh===0&&(bh=62500*Xw());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Eh(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>bh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function Rb(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)Eh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function Ec(){this.count--,Rb(this)}function wC(){this.imgCount--,Rb(this)}var $h=null;function Eh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,$h=new Map,t.forEach(CC,e),$h=null,Ec.call(e))}function CC(e,t){if(!(t.state.loading&4)){var n=$h.get(e);if(n)var i=n.get(null);else{n=new Map,$h.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=Ec.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Uo={$$typeof:as,Provider:null,Consumer:null,_currentValue:ar,_currentValue2:ar,_threadCount:0};function RC(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zp(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zp(0),this.hiddenUpdates=Zp(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function Nb(e,t,n,i,s,a,r,o,l,c,h,p){return e=new RC(e,t,n,r,l,c,h,p,o),t=1,a===!0&&(t|=24),a=Yn(3,null,null,t),e.current=a,a.stateNode=e,t=Yg(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},Kg(a),e}function Db(e){return e?(e=oo,e):oo}function Ub(e,t,n,i,s,a){s=Db(s),i.context===null?i.context=s:i.pendingContext=s,i=ma(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=ga(e,i,t),n!==null&&(Zn(n,e,t),nc(n,e,t))}function Nx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function C0(e,t){Nx(e,t),(e=e.alternate)&&Nx(e,t)}function Lb(e){if(e.tag===13||e.tag===31){var t=Sr(e,67108864);t!==null&&Zn(t,e,67108864),C0(e,67108864)}}function Dx(e){if(e.tag===13||e.tag===31){var t=ui();t=Og(t);var n=Sr(e,t);n!==null&&Zn(n,e,t),C0(e,t)}}var Lo=!0;function NC(e,t,n,i){var s=qt.T;qt.T=null;var a=_e.p;try{_e.p=2,R0(e,t,n,i)}finally{_e.p=a,qt.T=s}}function DC(e,t,n,i){var s=qt.T;qt.T=null;var a=_e.p;try{_e.p=8,R0(e,t,n,i)}finally{_e.p=a,qt.T=s}}function R0(e,t,n,i){if(Lo){var s=Ng(i);if(s===null)_m(e,t,i,tf,n),Ux(e,i);else if(LC(s,e,t,n,i))i.stopPropagation();else if(Ux(e,i),t&4&&-1<UC.indexOf(e)){for(;s!==null;){var a=Po(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=tr(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-ci(r);o.entanglements[1]|=l,r&=~l}ds(a),(ge&6)===0&&(Zh=oi()+500,Pc(0,!1))}}break;case 31:case 13:o=Sr(a,2),o!==null&&Zn(o,a,2),_f(),C0(a,2)}if(a=Ng(i),a===null&&_m(e,t,i,tf,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else _m(e,t,i,null,n)}}function Ng(e){return e=zg(e),N0(e)}var tf=null;function N0(e){if(tf=null,e=ir(e),e!==null){var t=wc(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=zx(t),e!==null)return e;e=null}else if(n===31){if(e=Fx(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return tf=e,null}function Ib(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(qT()){case Wx:return 2;case qx:return 8;case Rh:case YT:return 32;case Yx:return 268435456;default:return 32}default:return 32}}var Dg=!1,xa=null,Sa=null,Ma=null,Tc=new Map,Ac=new Map,ra=[],UC="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ux(e,t){switch(e){case"focusin":case"focusout":xa=null;break;case"dragenter":case"dragleave":Sa=null;break;case"mouseover":case"mouseout":Ma=null;break;case"pointerover":case"pointerout":Tc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ac.delete(t.pointerId)}}function Wl(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=Po(t),t!==null&&Lb(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function LC(e,t,n,i,s){switch(t){case"focusin":return xa=Wl(xa,e,t,n,i,s),!0;case"dragenter":return Sa=Wl(Sa,e,t,n,i,s),!0;case"mouseover":return Ma=Wl(Ma,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return Tc.set(a,Wl(Tc.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,Ac.set(a,Wl(Ac.get(a)||null,e,t,n,i,s)),!0}return!1}function Ob(e){var t=ir(e.target);if(t!==null){var n=wc(t);if(n!==null){if(t=n.tag,t===13){if(t=zx(n),t!==null){e.blockedOn=t,sy(e.priority,function(){Dx(n)});return}}else if(t===31){if(t=Fx(n),t!==null){e.blockedOn=t,sy(e.priority,function(){Dx(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Th(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ng(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Im=i,n.target.dispatchEvent(i),Im=null}else return t=Po(n),t!==null&&Lb(t),e.blockedOn=n,!1;t.shift()}return!0}function Lx(e,t,n){Th(e)&&n.delete(t)}function IC(){Dg=!1,xa!==null&&Th(xa)&&(xa=null),Sa!==null&&Th(Sa)&&(Sa=null),Ma!==null&&Th(Ma)&&(Ma=null),Tc.forEach(Lx),Ac.forEach(Lx)}function ah(e,t){e.blockedOn===t&&(e.blockedOn=null,Dg||(Dg=!0,on.unstable_scheduleCallback(on.unstable_NormalPriority,IC)))}var rh=null;function Ix(e){rh!==e&&(rh=e,on.unstable_scheduleCallback(on.unstable_NormalPriority,function(){rh===e&&(rh=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(N0(i||n)===null)continue;break}var a=Po(n);a!==null&&(e.splice(t,3),t-=3,Km(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function Io(e){function t(l){return ah(l,e)}xa!==null&&ah(xa,e),Sa!==null&&ah(Sa,e),Ma!==null&&ah(Ma,e),Tc.forEach(t),Ac.forEach(t);for(var n=0;n<ra.length;n++){var i=ra[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ra.length&&(n=ra[0],n.blockedOn===null);)Ob(n),n.blockedOn===null&&ra.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Kn]||null;if(typeof a=="function")r||Ix(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Kn]||null)o=r.formAction;else if(N0(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Ix(n)}}}function Pb(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function D0(e){this._internalRoot=e}xf.prototype.render=D0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(tt(409));var n=t.current,i=ui();Ub(n,i,e,t,null,null)};xf.prototype.unmount=D0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ub(e.current,2,null,e,null,null),_f(),t[Oo]=null}};function xf(e){this._internalRoot=e}xf.prototype.unstable_scheduleHydration=function(e){if(e){var t=$x();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ra.length&&t!==0&&t<ra[n].priority;n++);ra.splice(n,0,e),n===0&&Ob(e)}};var Ox=Px.version;if(Ox!=="19.3.1")throw Error(tt(527,Ox,"19.3.1"));_e.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(tt(188)):(e=Object.keys(e).join(","),Error(tt(268,e)));return e=OT(t),e=e!==null?Hx(e):null,e=e===null?null:e.stateNode,e};var OC={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:qt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(ql=__REACT_DEVTOOLS_GLOBAL_HOOK__,!ql.isDisabled&&ql.supportsFiber))try{Cc=ql.inject(OC),li=ql}catch{}var ql;Sf.createRoot=function(e,t){if(!Bx(e))throw Error(tt(299));var n=!1,i="",s=gM,a=_M,r=vM;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Nb(e,1,!1,null,null,n,i,null,s,a,r,Pb),e[Oo]=t.current,M0(e),new D0(t)};Sf.hydrateRoot=function(e,t,n){if(!Bx(e))throw Error(tt(299));var i=!1,s="",a=gM,r=_M,o=vM,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=Nb(e,1,!0,t,n??null,i,s,l,a,r,o,Pb),t.context=Db(null),n=t.current,i=ui(),i=Og(i),s=ma(i),s.callback=null,ga(n,s,i),n=i,t.current.lanes=n,Nc(t,n),ds(t),e[Oo]=t.current,M0(e),new xf(t)};Sf.version="19.3.1"});var Hb=ji((mL,Fb)=>{"use strict";function zb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zb)}catch(e){console.error(e)}}zb(),Fb.exports=Bb()});var BE=ji(Mp=>{"use strict";var OU=Symbol.for("react.transitional.element"),PU=Symbol.for("react.fragment");function PE(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:OU,type:e,key:i,ref:t!==void 0?t:null,props:n}}Mp.Fragment=PU;Mp.jsx=PE;Mp.jsxs=PE});var wu=ji((FP,zE)=>{"use strict";zE.exports=BE()});var iT=Qa(Pl(),1),sT=Qa(Hb(),1);var Br=Qa(Pl(),1);var g1=0,g_=1,_1=2;var pu=1,v1=2,Sl=3,Xa=0,Gn=1,vi=2,xs=0,Ml=1,__=2,v_=3,y_=4,y1=5;var Lr=100,x1=101,S1=102,M1=103,b1=104,E1=200,T1=201,A1=202,w1=203,x_=204,S_=205,C1=206,R1=207,N1=208,D1=209,U1=210,L1=211,I1=212,O1=213,P1=214,Wf=0,qf=1,Yf=2,nl=3,Zf=4,Jf=5,Kf=6,Qf=7,M_=0,B1=1,z1=2,Yi=0,b_=1,E_=2,T_=3,A_=4,w_=5,C_=6,mu=7;var R_=300,Wa=301,Ir=302,Cd=303,Rd=304,gu=306,_s=1e3,Ii=1001,jf=1002,gn=1003,F1=1004;var _u=1005;var ln=1006,Nd=1007;var Ss=1008;var $n=1009,N_=1010,D_=1011,bl=1012,Dd=1013,Zi=1014,Ji=1015,Ki=1016,Ud=1017,Ld=1018,El=1020,U_=35902,L_=35899,I_=1021,O_=1022,Oi=1023,vs=1026,qa=1027,P_=1028,Id=1029,Ya=1030,Od=1031;var Pd=1033,vu=33776,yu=33777,xu=33778,Su=33779,Bd=35840,zd=35841,Fd=35842,Hd=35843,Vd=36196,Gd=37492,kd=37496,Xd=37488,Wd=37489,Mu=37490,qd=37491,Yd=37808,Zd=37809,Jd=37810,Kd=37811,Qd=37812,jd=37813,$d=37814,tp=37815,ep=37816,np=37817,ip=37818,sp=37819,ap=37820,rp=37821,op=36492,lp=36494,cp=36495,up=36283,hp=36284,bu=36285,fp=36286;var Yc=2300,$f=2301,kf=2302,s_=2303,a_=2400,r_=2401,o_=2402;var H1=3200;var dp=0,V1=1,Ys="",En="srgb",Zc="srgb-linear",Jc="linear",Se="srgb";var Xf=7680;var G1=519,k1=512,X1=513,W1=514,pp=515,q1=516,Y1=517,mp=518,Z1=519,J1=35044;var B_="300 es",qi=2e3,il=2001;function PC(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function BC(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Kc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function K1(){let e=Kc("canvas");return e.style.display="block",e}var Vb={},sl=null;function z_(...e){let t="THREE."+e.shift();sl?sl("log",t,...e):console.log(t,...e)}function Q1(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Xt(...e){e=Q1(e);let t="THREE."+e.shift();if(sl)sl("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function kt(...e){e=Q1(e);let t="THREE."+e.shift();if(sl)sl("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function wr(...e){let t=e.join(" ");t in Vb||(Vb[t]=!0,Xt(...e))}function j1(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var $1={[Wf]:qf,[Yf]:Kf,[Zf]:Qf,[nl]:Jf,[qf]:Wf,[Kf]:Yf,[Qf]:Zf,[Jf]:nl},ys=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var U0=Math.PI/180,td=180/Math.PI;function Tl(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Cn[e&255]+Cn[e>>8&255]+Cn[e>>16&255]+Cn[e>>24&255]+"-"+Cn[t&255]+Cn[t>>8&255]+"-"+Cn[t>>16&15|64]+Cn[t>>24&255]+"-"+Cn[n&63|128]+Cn[n>>8&255]+"-"+Cn[n>>16&255]+Cn[n>>24&255]+Cn[i&255]+Cn[i>>8&255]+Cn[i>>16&255]+Cn[i>>24&255]).toLowerCase()}function ne(e,t,n){return Math.max(t,Math.min(n,e))}function zC(e,t){return(e%t+t)%t}function L0(e,t,n){return(1-n)*e+n*t}function Fc(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Qn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var X_=class X_{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=ne(this.x,t.x,n.x),this.y=ne(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=ne(this.x,t,n),this.y=ne(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};X_.prototype.isVector2=!0;var gt=X_,zn=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],h=i[s+2],p=i[s+3],u=a[r+0],d=a[r+1],g=a[r+2],M=a[r+3];if(p!==M||l!==u||c!==d||h!==g){let m=l*u+c*d+h*g+p*M;m<0&&(u=-u,d=-d,g=-g,M=-M,m=-m);let f=1-o;if(m<.9995){let _=Math.acos(m),S=Math.sin(_);f=Math.sin(f*_)/S,o=Math.sin(o*_)/S,l=l*f+u*o,c=c*f+d*o,h=h*f+g*o,p=p*f+M*o}else{l=l*f+u*o,c=c*f+d*o,h=h*f+g*o,p=p*f+M*o;let _=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=_,c*=_,h*=_,p*=_}}t[n]=l,t[n+1]=c,t[n+2]=h,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],p=a[r],u=a[r+1],d=a[r+2],g=a[r+3];return t[n]=o*g+h*p+l*d-c*u,t[n+1]=l*g+h*u+c*p-o*d,t[n+2]=c*g+h*d+o*u-l*p,t[n+3]=h*g-o*p-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),p=o(a/2),u=l(i/2),d=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=u*h*p+c*d*g,this._y=c*d*p-u*h*g,this._z=c*h*g+u*d*p,this._w=c*h*p-u*d*g;break;case"YXZ":this._x=u*h*p+c*d*g,this._y=c*d*p-u*h*g,this._z=c*h*g-u*d*p,this._w=c*h*p+u*d*g;break;case"ZXY":this._x=u*h*p-c*d*g,this._y=c*d*p+u*h*g,this._z=c*h*g+u*d*p,this._w=c*h*p-u*d*g;break;case"ZYX":this._x=u*h*p-c*d*g,this._y=c*d*p+u*h*g,this._z=c*h*g-u*d*p,this._w=c*h*p+u*d*g;break;case"YZX":this._x=u*h*p+c*d*g,this._y=c*d*p+u*h*g,this._z=c*h*g-u*d*p,this._w=c*h*p-u*d*g;break;case"XZY":this._x=u*h*p-c*d*g,this._y=c*d*p-u*h*g,this._z=c*h*g+u*d*p,this._w=c*h*p+u*d*g;break;default:Xt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],h=n[6],p=n[10],u=i+o+p;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(a-c)*d,this._z=(r-s)*d}else if(i>o&&i>p){let d=2*Math.sqrt(1+i-o-p);this._w=(h-l)/d,this._x=.25*d,this._y=(s+r)/d,this._z=(a+c)/d}else if(o>p){let d=2*Math.sqrt(1+o-i-p);this._w=(a-c)/d,this._x=(s+r)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+p-i-o);this._w=(r-s)/d,this._x=(a+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+r*o+s*c-a*l,this._y=s*h+r*l+a*o-i*c,this._z=a*h+r*c+i*l-s*o,this._w=r*h-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W_=class W_{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Gb.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Gb.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),h=2*(o*n-a*s),p=2*(a*i-r*n);return this.x=n+l*c+r*p-o*h,this.y=i+l*h+o*c-a*p,this.z=s+l*p+a*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=ne(this.x,t.x,n.x),this.y=ne(this.y,t.y,n.y),this.z=ne(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=ne(this.x,t,n),this.y=ne(this.y,t,n),this.z=ne(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return I0.copy(this).projectOnVector(t),this.sub(I0)}reflect(t){return this.sub(I0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};W_.prototype.isVector3=!0;var L=W_,I0=new L,Gb=new zn,q_=class q_{constructor(t,n,i,s,a,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=n,h[4]=a,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],p=i[7],u=i[2],d=i[5],g=i[8],M=s[0],m=s[3],f=s[6],_=s[1],S=s[4],v=s[7],E=s[2],T=s[5],R=s[8];return a[0]=r*M+o*_+l*E,a[3]=r*m+o*S+l*T,a[6]=r*f+o*v+l*R,a[1]=c*M+h*_+p*E,a[4]=c*m+h*S+p*T,a[7]=c*f+h*v+p*R,a[2]=u*M+d*_+g*E,a[5]=u*m+d*S+g*T,a[8]=u*f+d*v+g*R,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return n*r*h-n*o*c-i*a*h+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*r-o*c,u=o*l-h*a,d=c*a-r*l,g=n*p+i*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return t[0]=p*M,t[1]=(s*c-h*i)*M,t[2]=(o*i-s*r)*M,t[3]=u*M,t[4]=(h*n-s*l)*M,t[5]=(s*a-o*n)*M,t[6]=d*M,t[7]=(i*l-c*n)*M,t[8]=(r*n-i*a)*M,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return wr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(O0.makeScale(t,n)),this}rotate(t){return wr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(O0.makeRotation(-t)),this}translate(t,n){return wr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(O0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};q_.prototype.isMatrix3=!0;var Kt=q_,O0=new Kt,kb=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xb=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function FC(){let e={enabled:!0,workingColorSpace:Zc,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===Se&&(s.r=Ws(s.r),s.g=Ws(s.g),s.b=Ws(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Se&&(s.r=el(s.r),s.g=el(s.g),s.b=el(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ys?Jc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return wr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return wr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Zc]:{primaries:t,whitePoint:i,transfer:Jc,toXYZ:kb,fromXYZ:Xb,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:En},outputColorSpaceConfig:{drawingBufferColorSpace:En}},[En]:{primaries:t,whitePoint:i,transfer:Se,toXYZ:kb,fromXYZ:Xb,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:En}}}),e}var ce=FC();function Ws(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function el(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Go,ed=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Go===void 0&&(Go=Kc("canvas")),Go.width=t.width,Go.height=t.height;let s=Go.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Go}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Kc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Ws(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ws(n[i]/255)*255):n[i]=Ws(n[i]);return{data:n,width:t.width,height:t.height}}else return Xt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},HC=0,al=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:HC++}),this.uuid=Tl(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(P0(s[r].image)):a.push(P0(s[r]))}else a=P0(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function P0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?ed.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Xt("Texture: Unable to serialize Texture."),{})}var VC=0,B0=new L,Fn=class e extends ys{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=Ii,s=Ii,a=ln,r=Ss,o=Oi,l=$n,c=e.DEFAULT_ANISOTROPY,h=Ys){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:VC++}),this.uuid=Tl(),this.name="",this.source=new al(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(B0).x}get height(){return this.source.getSize(B0).y}get depth(){return this.source.getSize(B0).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Xt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Xt(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==R_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _s:t.x=t.x-Math.floor(t.x);break;case Ii:t.x=t.x<0?0:1;break;case jf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _s:t.y=t.y-Math.floor(t.y);break;case Ii:t.y=t.y<0?0:1;break;case jf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fn.DEFAULT_IMAGE=null;Fn.DEFAULT_MAPPING=R_;Fn.DEFAULT_ANISOTROPY=1;var Y_=class Y_{constructor(t=0,n=0,i=0,s=1){this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],d=l[5],g=l[9],M=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+M)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let S=(c+1)/2,v=(d+1)/2,E=(f+1)/2,T=(h+u)/4,R=(p+M)/4,x=(g+m)/4;return S>v&&S>E?S<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(S),s=T/i,a=R/i):v>E?v<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(v),i=T/s,a=x/s):E<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(E),i=R/a,s=x/a),this.set(i,s,a,n),this}let _=Math.sqrt((m-g)*(m-g)+(p-M)*(p-M)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(p-M)/_,this.z=(u-h)/_,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=ne(this.x,t.x,n.x),this.y=ne(this.y,t.y,n.y),this.z=ne(this.z,t.z,n.z),this.w=ne(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=ne(this.x,t,n),this.y=ne(this.y,t,n),this.z=ne(this.z,t,n),this.w=ne(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Y_.prototype.isVector4=!0;var Ve=Y_,nd=class extends ys{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ve(0,0,t,n),this.scissorTest=!1,this.viewport=new Ve(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new Fn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let n={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new al(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},jn=class extends nd{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Qc=class extends Fn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var id=class extends Fn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var wd=class wd{constructor(t,n,i,s,a,r,o,l,c,h,p,u,d,g,M,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,h,p,u,d,g,M,m)}set(t,n,i,s,a,r,o,l,c,h,p,u,d,g,M,m){let f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=s,f[1]=a,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=p,f[14]=u,f[3]=d,f[7]=g,f[11]=M,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wd().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let n=this.elements,i=t.elements,s=1/ko.setFromMatrixColumn(t,0).length(),a=1/ko.setFromMatrixColumn(t,1).length(),r=1/ko.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let u=r*h,d=r*p,g=o*h,M=o*p;n[0]=l*h,n[4]=-l*p,n[8]=c,n[1]=d+g*c,n[5]=u-M*c,n[9]=-o*l,n[2]=M-u*c,n[6]=g+d*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*h,d=l*p,g=c*h,M=c*p;n[0]=u+M*o,n[4]=g*o-d,n[8]=r*c,n[1]=r*p,n[5]=r*h,n[9]=-o,n[2]=d*o-g,n[6]=M+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*h,d=l*p,g=c*h,M=c*p;n[0]=u-M*o,n[4]=-r*p,n[8]=g+d*o,n[1]=d+g*o,n[5]=r*h,n[9]=M-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*h,d=r*p,g=o*h,M=o*p;n[0]=l*h,n[4]=g*c-d,n[8]=u*c+M,n[1]=l*p,n[5]=M*c+u,n[9]=d*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,d=r*c,g=o*l,M=o*c;n[0]=l*h,n[4]=M-u*p,n[8]=g*p+d,n[1]=p,n[5]=r*h,n[9]=-o*h,n[2]=-c*h,n[6]=d*p+g,n[10]=u-M*p}else if(t.order==="XZY"){let u=r*l,d=r*c,g=o*l,M=o*c;n[0]=l*h,n[4]=-p,n[8]=c*h,n[1]=u*p+M,n[5]=r*h,n[9]=d*p-g,n[2]=g*p-d,n[6]=o*h,n[10]=M*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(GC,t,kC)}lookAt(t,n,i){let s=this.elements;return di.subVectors(t,n),di.lengthSq()===0&&(di.z=1),di.normalize(),Na.crossVectors(i,di),Na.lengthSq()===0&&(Math.abs(i.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),Na.crossVectors(i,di)),Na.normalize(),Mf.crossVectors(di,Na),s[0]=Na.x,s[4]=Mf.x,s[8]=di.x,s[1]=Na.y,s[5]=Mf.y,s[9]=di.y,s[2]=Na.z,s[6]=Mf.z,s[10]=di.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],p=i[5],u=i[9],d=i[13],g=i[2],M=i[6],m=i[10],f=i[14],_=i[3],S=i[7],v=i[11],E=i[15],T=s[0],R=s[4],x=s[8],w=s[12],C=s[1],D=s[5],H=s[9],G=s[13],B=s[2],F=s[6],J=s[10],q=s[14],at=s[3],X=s[7],Q=s[11],et=s[15];return a[0]=r*T+o*C+l*B+c*at,a[4]=r*R+o*D+l*F+c*X,a[8]=r*x+o*H+l*J+c*Q,a[12]=r*w+o*G+l*q+c*et,a[1]=h*T+p*C+u*B+d*at,a[5]=h*R+p*D+u*F+d*X,a[9]=h*x+p*H+u*J+d*Q,a[13]=h*w+p*G+u*q+d*et,a[2]=g*T+M*C+m*B+f*at,a[6]=g*R+M*D+m*F+f*X,a[10]=g*x+M*H+m*J+f*Q,a[14]=g*w+M*G+m*q+f*et,a[3]=_*T+S*C+v*B+E*at,a[7]=_*R+S*D+v*F+E*X,a[11]=_*x+S*H+v*J+E*Q,a[15]=_*w+S*G+v*q+E*et,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],d=t[14],g=t[3],M=t[7],m=t[11],f=t[15],_=l*d-c*u,S=o*d-c*p,v=o*u-l*p,E=r*d-c*h,T=r*u-l*h,R=r*p-o*h;return n*(M*_-m*S+f*v)-i*(g*_-m*E+f*T)+s*(g*S-M*E+f*R)-a*(g*v-M*T+m*R)}determinantAffine(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[1],r=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return n*(r*h-o*c)-i*(a*h-o*l)+s*(a*c-r*l)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],d=t[11],g=t[12],M=t[13],m=t[14],f=t[15],_=n*o-i*r,S=n*l-s*r,v=n*c-a*r,E=i*l-s*o,T=i*c-a*o,R=s*c-a*l,x=h*M-p*g,w=h*m-u*g,C=h*f-d*g,D=p*m-u*M,H=p*f-d*M,G=u*f-d*m,B=_*G-S*H+v*D+E*C-T*w+R*x;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/B;return t[0]=(o*G-l*H+c*D)*F,t[1]=(s*H-i*G-a*D)*F,t[2]=(M*R-m*T+f*E)*F,t[3]=(u*T-p*R-d*E)*F,t[4]=(l*C-r*G-c*w)*F,t[5]=(n*G-s*C+a*w)*F,t[6]=(m*v-g*R-f*S)*F,t[7]=(h*R-u*v+d*S)*F,t[8]=(r*H-o*C+c*x)*F,t[9]=(i*C-n*H-a*x)*F,t[10]=(g*T-M*v+f*_)*F,t[11]=(p*v-h*T-d*_)*F,t[12]=(o*w-r*D-l*x)*F,t[13]=(n*D-i*w+s*x)*F,t[14]=(M*S-g*E-m*_)*F,t[15]=(h*E-p*S+u*_)*F,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,h=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*r,0,c*l-s*o,h*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,h=r+r,p=o+o,u=a*c,d=a*h,g=a*p,M=r*h,m=r*p,f=o*p,_=l*c,S=l*h,v=l*p,E=i.x,T=i.y,R=i.z;return s[0]=(1-(M+f))*E,s[1]=(d+v)*E,s[2]=(g-S)*E,s[3]=0,s[4]=(d-v)*T,s[5]=(1-(u+f))*T,s[6]=(m+_)*T,s[7]=0,s[8]=(g+S)*R,s[9]=(m-_)*R,s[10]=(1-(u+M))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),n.identity(),this;let r=ko.set(s[0],s[1],s[2]).length(),o=ko.set(s[4],s[5],s[6]).length(),l=ko.set(s[8],s[9],s[10]).length();a<0&&(r=-r),Gi.copy(this);let c=1/r,h=1/o,p=1/l;return Gi.elements[0]*=c,Gi.elements[1]*=c,Gi.elements[2]*=c,Gi.elements[4]*=h,Gi.elements[5]*=h,Gi.elements[6]*=h,Gi.elements[8]*=p,Gi.elements[9]*=p,Gi.elements[10]*=p,n.setFromRotationMatrix(Gi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=qi,l=!1){let c=this.elements,h=2*a/(n-t),p=2*a/(i-s),u=(n+t)/(n-t),d=(i+s)/(i-s),g,M;if(l)g=a/(r-a),M=r*a/(r-a);else if(o===qi)g=-(r+a)/(r-a),M=-2*r*a/(r-a);else if(o===il)g=-r/(r-a),M=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=qi,l=!1){let c=this.elements,h=2/(n-t),p=2/(i-s),u=-(n+t)/(n-t),d=-(i+s)/(i-s),g,M;if(l)g=1/(r-a),M=r/(r-a);else if(o===qi)g=-2/(r-a),M=-(r+a)/(r-a);else if(o===il)g=-1/(r-a),M=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};wd.prototype.isMatrix4=!0;var Ne=wd,ko=new L,Gi=new Ne,GC=new L(0,0,0),kC=new L(1,1,1),Na=new L,Mf=new L,di=new L,Wb=new Ne,qb=new zn,qs=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],h=s[9],p=s[2],u=s[6],d=s[10];switch(n){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-ne(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ne(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Xt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Wb.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wb,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return qb.setFromEuler(this),this.setFromQuaternion(qb,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qs.DEFAULT_ORDER="XYZ";var rl=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},XC=0,Yb=new L,Xo=new zn,Hs=new Ne,bf=new L,Hc=new L,WC=new L,qC=new zn,Zb=new L(1,0,0),Jb=new L(0,1,0),Kb=new L(0,0,1),Qb={type:"added"},YC={type:"removed"},Wo={type:"childadded",child:null},z0={type:"childremoved",child:null},Hn=class e extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XC++}),this.uuid=Tl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new L,n=new qs,i=new zn,s=new L(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Kt}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Xo.setFromAxisAngle(t,n),this.quaternion.multiply(Xo),this}rotateOnWorldAxis(t,n){return Xo.setFromAxisAngle(t,n),this.quaternion.premultiply(Xo),this}rotateX(t){return this.rotateOnAxis(Zb,t)}rotateY(t){return this.rotateOnAxis(Jb,t)}rotateZ(t){return this.rotateOnAxis(Kb,t)}translateOnAxis(t,n){return Yb.copy(t).applyQuaternion(this.quaternion),this.position.add(Yb.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Zb,t)}translateY(t){return this.translateOnAxis(Jb,t)}translateZ(t){return this.translateOnAxis(Kb,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Hs.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?bf.copy(t):bf.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Hc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hs.lookAt(Hc,bf,this.up):Hs.lookAt(bf,Hc,this.up),this.quaternion.setFromRotationMatrix(Hs),s&&(Hs.extractRotation(s.matrixWorld),Xo.setFromRotationMatrix(Hs),this.quaternion.premultiply(Xo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(kt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qb),Wo.child=t,this.dispatchEvent(Wo),Wo.child=null):kt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(YC),z0.child=t,this.dispatchEvent(z0),z0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Hs.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Hs.multiply(t.parent.matrixWorld)),t.applyMatrix4(Hs),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qb),Wo.child=t,this.dispatchEvent(Wo),Wo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hc,t,WC),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hc,qC,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){let a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];a(t.shapes,p)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),p=r(t.shapes),u=r(t.skeletons),d=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Hn.DEFAULT_UP=new L(0,1,0);Hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ms=class extends Hn{constructor(){super(),this.isGroup=!0,this.type="Group"}},ZC={type:"move"},ol=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ms,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ms,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ms,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let M of t.hand.values()){let m=n.getJointPose(M,i),f=this._getHandJoint(c,M);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ZC)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new ms;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},tE={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Da={h:0,s:0,l:0},Ef={h:0,s:0,l:0};function F0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var jt=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=En){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=ce.workingColorSpace){return this.r=t,this.g=n,this.b=i,ce.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=ce.workingColorSpace){if(t=zC(t,1),n=ne(n,0,1),i=ne(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=F0(r,a,t+1/3),this.g=F0(r,a,t),this.b=F0(r,a,t-1/3)}return ce.colorSpaceToWorking(this,s),this}setStyle(t,n=En){function i(a){a!==void 0&&parseFloat(a)<1&&Xt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Xt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Xt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=En){let i=tE[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Xt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ws(t.r),this.g=Ws(t.g),this.b=Ws(t.b),this}copyLinearToSRGB(t){return this.r=el(t.r),this.g=el(t.g),this.b=el(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=En){return ce.workingToColorSpace(Rn.copy(this),t),Math.round(ne(Rn.r*255,0,255))*65536+Math.round(ne(Rn.g*255,0,255))*256+Math.round(ne(Rn.b*255,0,255))}getHexString(t=En){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ce.workingColorSpace){ce.workingToColorSpace(Rn.copy(this),n);let i=Rn.r,s=Rn.g,a=Rn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,h=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=h<=.5?p/(r+o):p/(2-r-o),r){case i:l=(s-a)/p+(s<a?6:0);break;case s:l=(a-i)/p+2;break;case a:l=(i-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,n=ce.workingColorSpace){return ce.workingToColorSpace(Rn.copy(this),n),t.r=Rn.r,t.g=Rn.g,t.b=Rn.b,t}getStyle(t=En){ce.workingToColorSpace(Rn.copy(this),t);let n=Rn.r,i=Rn.g,s=Rn.b;return t!==En?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Da),this.setHSL(Da.h+t,Da.s+n,Da.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Da),t.getHSL(Ef);let i=L0(Da.h,Ef.h,n),s=L0(Da.s,Ef.s,n),a=L0(Da.l,Ef.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new jt;jt.NAMES=tE;var ll=class extends Hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qs,this.environmentIntensity=1,this.environmentRotation=new qs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}},ki=new L,Vs=new L,H0=new L,Gs=new L,qo=new L,Yo=new L,jb=new L,V0=new L,G0=new L,k0=new L,X0=new Ve,W0=new Ve,q0=new Ve,Oa=class e{constructor(t=new L,n=new L,i=new L){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),ki.subVectors(t,n),s.cross(ki);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){ki.subVectors(s,n),Vs.subVectors(i,n),H0.subVectors(t,n);let r=ki.dot(ki),o=ki.dot(Vs),l=ki.dot(H0),c=Vs.dot(Vs),h=Vs.dot(H0),p=r*c-o*o;if(p===0)return a.set(0,0,0),null;let u=1/p,d=(c*l-o*h)*u,g=(r*h-o*l)*u;return a.set(1-d-g,g,d)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Gs)===null?!1:Gs.x>=0&&Gs.y>=0&&Gs.x+Gs.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,Gs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Gs.x),l.addScaledVector(r,Gs.y),l.addScaledVector(o,Gs.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return X0.setScalar(0),W0.setScalar(0),q0.setScalar(0),X0.fromBufferAttribute(t,n),W0.fromBufferAttribute(t,i),q0.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(X0,a.x),r.addScaledVector(W0,a.y),r.addScaledVector(q0,a.z),r}static isFrontFacing(t,n,i,s){return ki.subVectors(i,n),Vs.subVectors(t,n),ki.cross(Vs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ki.subVectors(this.c,this.b),Vs.subVectors(this.a,this.b),ki.cross(Vs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;qo.subVectors(s,i),Yo.subVectors(a,i),V0.subVectors(t,i);let l=qo.dot(V0),c=Yo.dot(V0);if(l<=0&&c<=0)return n.copy(i);G0.subVectors(t,s);let h=qo.dot(G0),p=Yo.dot(G0);if(h>=0&&p<=h)return n.copy(s);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),n.copy(i).addScaledVector(qo,r);k0.subVectors(t,a);let d=qo.dot(k0),g=Yo.dot(k0);if(g>=0&&d<=g)return n.copy(a);let M=d*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Yo,o);let m=h*g-d*p;if(m<=0&&p-h>=0&&d-g>=0)return jb.subVectors(a,s),o=(p-h)/(p-h+(d-g)),n.copy(s).addScaledVector(jb,o);let f=1/(m+M+u);return r=M*f,o=u*f,n.copy(i).addScaledVector(qo,r).addScaledVector(Yo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Pa=class{constructor(t=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Xi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Xi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=Xi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Xi):Xi.fromBufferAttribute(a,r),Xi.applyMatrix4(t.matrixWorld),this.expandByPoint(Xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tf.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Tf.copy(i.boundingBox)),Tf.applyMatrix4(t.matrixWorld),this.union(Tf)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xi),Xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Vc),Af.subVectors(this.max,Vc),Zo.subVectors(t.a,Vc),Jo.subVectors(t.b,Vc),Ko.subVectors(t.c,Vc),Ua.subVectors(Jo,Zo),La.subVectors(Ko,Jo),br.subVectors(Zo,Ko);let n=[0,-Ua.z,Ua.y,0,-La.z,La.y,0,-br.z,br.y,Ua.z,0,-Ua.x,La.z,0,-La.x,br.z,0,-br.x,-Ua.y,Ua.x,0,-La.y,La.x,0,-br.y,br.x,0];return!Y0(n,Zo,Jo,Ko,Af)||(n=[1,0,0,0,1,0,0,0,1],!Y0(n,Zo,Jo,Ko,Af))?!1:(wf.crossVectors(Ua,La),n=[wf.x,wf.y,wf.z],Y0(n,Zo,Jo,Ko,Af))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ks[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ks[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ks[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ks[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ks[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ks[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ks[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ks[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ks),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ks=[new L,new L,new L,new L,new L,new L,new L,new L],Xi=new L,Tf=new Pa,Zo=new L,Jo=new L,Ko=new L,Ua=new L,La=new L,br=new L,Vc=new L,Af=new L,wf=new L,Er=new L;function Y0(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){Er.fromArray(e,a);let o=s.x*Math.abs(Er.x)+s.y*Math.abs(Er.y)+s.z*Math.abs(Er.z),l=t.dot(Er),c=n.dot(Er),h=i.dot(Er);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var tn=new L,Cf=new gt,JC=0,Dn=class extends ys{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:JC++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=J1,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Cf.fromBufferAttribute(this,n),Cf.applyMatrix3(t),this.setXY(n,Cf.x,Cf.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix3(t),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix4(t),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyNormalMatrix(t),this.setXYZ(n,tn.x,tn.y,tn.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.transformDirection(t),this.setXYZ(n,tn.x,tn.y,tn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Fc(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Qn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Fc(n,this.array)),n}setX(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Fc(n,this.array)),n}setY(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Fc(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Fc(n,this.array)),n}setW(t,n){return this.normalized&&(n=Qn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),i=Qn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),i=Qn(i,this.array),s=Qn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Qn(n,this.array),i=Qn(i,this.array),s=Qn(s,this.array),a=Qn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var jc=class extends Dn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var $c=class extends Dn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var en=class extends Dn{constructor(t,n,i){super(new Float32Array(t),n,i)}},KC=new Pa,Gc=new L,Z0=new L,cl=class{constructor(t=new L,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):KC.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gc.subVectors(t,this.center);let n=Gc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Gc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Z0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gc.copy(t.center).add(Z0)),this.expandByPoint(Gc.copy(t.center).sub(Z0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},QC=0,Li=new Ne,J0=new Hn,Qo=new L,pi=new Pa,kc=new Pa,mn=new L,Vn=class e extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QC++}),this.uuid=Tl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(PC(t)?$c:jc)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Kt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Li.makeRotationFromQuaternion(t),this.applyMatrix4(Li),this}rotateX(t){return Li.makeRotationX(t),this.applyMatrix4(Li),this}rotateY(t){return Li.makeRotationY(t),this.applyMatrix4(Li),this}rotateZ(t){return Li.makeRotationZ(t),this.applyMatrix4(Li),this}translate(t,n,i){return Li.makeTranslation(t,n,i),this.applyMatrix4(Li),this}scale(t,n,i){return Li.makeScale(t,n,i),this.applyMatrix4(Li),this}lookAt(t){return J0.lookAt(t),J0.updateMatrix(),this.applyMatrix4(J0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qo).negate(),this.translate(Qo.x,Qo.y,Qo.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new en(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Xt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pa);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){kt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];pi.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&kt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cl);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){kt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let i=this.boundingSphere.center;if(pi.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];kc.setFromBufferAttribute(o),this.morphTargetsRelative?(mn.addVectors(pi.min,kc.min),pi.expandByPoint(mn),mn.addVectors(pi.max,kc.max),pi.expandByPoint(mn)):(pi.expandByPoint(kc.min),pi.expandByPoint(kc.max))}pi.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)mn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(mn));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)mn.fromBufferAttribute(o,c),l&&(Qo.fromBufferAttribute(t,c),mn.add(Qo)),s=Math.max(s,i.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&kt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){kt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Dn(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new L,l[x]=new L;let c=new L,h=new L,p=new L,u=new gt,d=new gt,g=new gt,M=new L,m=new L;function f(x,w,C){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,w),p.fromBufferAttribute(i,C),u.fromBufferAttribute(a,x),d.fromBufferAttribute(a,w),g.fromBufferAttribute(a,C),h.sub(c),p.sub(c),d.sub(u),g.sub(u);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(p,-d.y).multiplyScalar(D),m.copy(p).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),o[x].add(M),o[w].add(M),o[C].add(M),l[x].add(m),l[w].add(m),l[C].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let x=0,w=_.length;x<w;++x){let C=_[x],D=C.start,H=C.count;for(let G=D,B=D+H;G<B;G+=3)f(t.getX(G+0),t.getX(G+1),t.getX(G+2))}let S=new L,v=new L,E=new L,T=new L;function R(x){E.fromBufferAttribute(s,x),T.copy(E);let w=o[x];S.copy(w),S.sub(E.multiplyScalar(E.dot(w))).normalize(),v.crossVectors(T,w);let D=v.dot(l[x])<0?-1:1;r.setXYZW(x,S.x,S.y,S.z,D)}for(let x=0,w=_.length;x<w;++x){let C=_[x],D=C.start,H=C.count;for(let G=D,B=D+H;G<B;G+=3)R(t.getX(G+0)),R(t.getX(G+1)),R(t.getX(G+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Dn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let s=new L,a=new L,r=new L,o=new L,l=new L,c=new L,h=new L,p=new L;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),M=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(n,g),a.fromBufferAttribute(n,M),r.fromBufferAttribute(n,m),h.subVectors(r,a),p.subVectors(s,a),h.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,d=n.count;u<d;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),h.subVectors(r,a),p.subVectors(s,a),h.cross(p),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)mn.fromBufferAttribute(t,n),mn.normalize(),t.setXYZ(n,mn.x,mn.y,mn.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let M=0,m=l.length;M<m;M++){o.isInterleavedBufferAttribute?d=l[M]*o.data.stride+o.offset:d=l[M]*h;for(let f=0;f<h;f++)u[g++]=c[d++]}return new Dn(u,h,p)}if(this.index===null)return Xt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let h=0,p=c.length;h<p;h++){let u=c[h],d=t(u,i);l.push(d)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let d=c[p];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(n))}let a=t.morphAttributes;for(let c in a){let h=[],p=a[c];for(let u=0,d=p.length;u<d;u++)h.push(p[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,h=r.length;c<h;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var K0=new L,jC=new L,$C=new Kt,Wi=class{constructor(t=new L(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=K0.subVectors(i,n).cross(jC.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){let s=t.delta(K0),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/a;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(s,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||$C.getNormalMatrix(t),s=this.coplanarPoint(K0).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},tR=0,Ba=class extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tR++}),this.uuid=Tl(),this.name="",this.type="Material",this.blending=Ml,this.side=Xa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=x_,this.blendDst=S_,this.blendEquation=Lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=G1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xf,this.stencilZFail=Xf,this.stencilZPass=Xf,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Xt(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Xt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new jt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Wi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new gt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Xs=new L,Q0=new L,Rf=new L,Nf=new L,tu=class{constructor(t=new L,n=new L(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xs)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Xs.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Xs.copy(this.origin).addScaledVector(this.direction,n),Xs.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){Q0.copy(t).add(n).multiplyScalar(.5),Rf.copy(n).sub(t).normalize(),Nf.copy(this.origin).sub(Q0);let a=t.distanceTo(n)*.5,r=-this.direction.dot(Rf),o=Nf.dot(this.direction),l=-Nf.dot(Rf),c=Nf.lengthSq(),h=Math.abs(1-r*r),p,u,d,g;if(h>0)if(p=r*l-o,u=r*o-l,g=a*h,p>=0)if(u>=-g)if(u<=g){let M=1/h;p*=M,u*=M,d=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u=-a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-r*a+o)),u=p>0?-a:Math.min(Math.max(-a,-l),a),d=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-a,-l),a),d=u*(u+2*l)+c):(p=Math.max(0,-(r*a+o)),u=p>0?a:Math.min(Math.max(-a,-l),a),d=-p*p+u*(u+2*l)+c);else u=r>0?-a:a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Q0).addScaledVector(Rf,u),d}intersectSphere(t,n){if(t.radius<0)return null;Xs.subVectors(t.center,this.origin);let i=Xs.dot(this.direction),s=Xs.dot(Xs)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(a=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(a=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Xs)!==null}intersectTriangle(t,n,i,s,a){let r=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=t.x-r.x,u=t.y-r.y,d=t.z-r.z,g=n.x-r.x,M=n.y-r.y,m=n.z-r.z,f=i.x-r.x,_=i.y-r.y,S=i.z-r.z,v=Math.abs(l),E=Math.abs(c),T=Math.abs(h),R,x,w,C,D,H,G,B,F,J,q,at;if(v>=E&&v>=T?(w=l,H=p,F=g,at=f,l>=0?(R=c,x=h,C=u,D=d,G=M,B=m,J=_,q=S):(R=h,x=c,C=d,D=u,G=m,B=M,J=S,q=_)):E>=T?(w=c,H=u,F=M,at=_,c>=0?(R=h,x=l,C=d,D=p,G=m,B=g,J=S,q=f):(R=l,x=h,C=p,D=d,G=g,B=m,J=f,q=S)):(w=h,H=d,F=m,at=S,h>=0?(R=l,x=c,C=p,D=u,G=g,B=M,J=f,q=_):(R=c,x=l,C=u,D=p,G=M,B=g,J=_,q=f)),w===0)return null;let X=R/w,Q=x/w,et=1/w,Ut=C-X*H,Ct=D-Q*H,re=G-X*F,Qt=B-Q*F,ie=J-X*at,Z=q-Q*at,j=ie*Qt-Z*re,bt=Ut*Z-Ct*ie,Ft=re*Ct-Qt*Ut;if(s){if(j<0||bt<0||Ft<0)return null}else if((j<0||bt<0||Ft<0)&&(j>0||bt>0||Ft>0))return null;let At=j+bt+Ft;if(At===0)return null;let Bt=et*(j*H+bt*F+Ft*at);return(At>0?Bt<0:Bt>0)?null:this.at(Bt/At,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Cr=class extends Ba{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qs,this.combine=M_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},$b=new Ne,Tr=new tu,Df=new cl,t1=new L,Uf=new L,Lf=new L,If=new L,j0=new L,Of=new L,e1=new L,Pf=new L,Je=class extends Hn{constructor(t=new Vn,n=new Cr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){Of.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let h=o[l],p=a[l];h!==0&&(j0.fromBufferAttribute(p,t),r?Of.addScaledVector(j0,h):Of.addScaledVector(j0.sub(n),h))}n.add(Of)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Df.copy(i.boundingSphere),Df.applyMatrix4(a),Tr.copy(t.ray).recast(t.near),!(Df.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(Df,t1)===null||Tr.origin.distanceToSquared(t1)>(t.far-t.near)**2))&&($b.copy(a).invert(),Tr.copy(t.ray).applyMatrix4($b),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Tr)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,p=a.attributes.normal,u=a.groups,d=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,M=u.length;g<M;g++){let m=u[g],f=r[m.materialIndex],_=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=_,E=S;v<E;v+=3){let T=o.getX(v),R=o.getX(v+1),x=o.getX(v+2);s=Bf(this,f,t,i,c,h,p,T,R,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,d.start),M=Math.min(o.count,d.start+d.count);for(let m=g,f=M;m<f;m+=3){let _=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);s=Bf(this,r,t,i,c,h,p,_,S,v),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,M=u.length;g<M;g++){let m=u[g],f=r[m.materialIndex],_=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=_,E=S;v<E;v+=3){let T=v,R=v+1,x=v+2;s=Bf(this,f,t,i,c,h,p,T,R,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{let g=Math.max(0,d.start),M=Math.min(l.count,d.start+d.count);for(let m=g,f=M;m<f;m+=3){let _=m,S=m+1,v=m+2;s=Bf(this,r,t,i,c,h,p,_,S,v),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}};function eR(e,t,n,i,s,a,r,o){let l;if(t.side===Gn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===Xa,o),l===null)return null;Pf.copy(o),Pf.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Pf);return c<n.near||c>n.far?null:{distance:c,point:Pf.clone(),object:e}}function Bf(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,Uf),e.getVertexPosition(l,Lf),e.getVertexPosition(c,If);let h=eR(e,t,n,i,Uf,Lf,If,e1);if(h){let p=new L;Oa.getBarycoord(e1,Uf,Lf,If,p),s&&(h.uv=Oa.getInterpolatedAttribute(s,o,l,c,p,new gt)),a&&(h.uv1=Oa.getInterpolatedAttribute(a,o,l,c,p,new gt)),r&&(h.normal=Oa.getInterpolatedAttribute(r,o,l,c,p,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new L,materialIndex:0};Oa.getNormal(Uf,Lf,If,u.normal),h.face=u,h.barycoord=p}return h}var ul=class extends Fn{constructor(t=null,n=1,i=1,s,a,r,o,l,c=gn,h=gn,p,u){super(null,r,o,l,c,h,s,a,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ar=new cl,nR=new gt(.5,.5),zf=new L,hl=class{constructor(t=new Wi,n=new Wi,i=new Wi,s=new Wi,a=new Wi,r=new Wi){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=qi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],h=a[4],p=a[5],u=a[6],d=a[7],g=a[8],M=a[9],m=a[10],f=a[11],_=a[12],S=a[13],v=a[14],E=a[15];if(s[0].setComponents(c-r,d-h,f-g,E-_).normalize(),s[1].setComponents(c+r,d+h,f+g,E+_).normalize(),s[2].setComponents(c+o,d+p,f+M,E+S).normalize(),s[3].setComponents(c-o,d-p,f-M,E-S).normalize(),i)s[4].setComponents(l,u,m,v).normalize(),s[5].setComponents(c-l,d-u,f-m,E-v).normalize();else if(s[4].setComponents(c-l,d-u,f-m,E-v).normalize(),n===qi)s[5].setComponents(c+l,d+u,f+m,E+v).normalize();else if(n===il)s[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ar.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(t){Ar.center.set(0,0,0);let n=nR.distanceTo(t.center);return Ar.radius=.7071067811865476+n,Ar.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(zf.x=s.normal.x>0?t.max.x:t.min.x,zf.y=s.normal.y>0?t.max.y:t.min.y,zf.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zf)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var eu=class extends Fn{constructor(t=[],n=Wa,i,s,a,r,o,l,c,h){super(t,n,i,s,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Rr=class extends Fn{constructor(t,n,i,s,a,r,o,l,c){super(t,n,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var za=class extends Fn{constructor(t,n,i=Zi,s,a,r,o=gn,l=gn,c,h=vs,p=1){if(h!==vs&&h!==qa)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,s,a,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new al(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}},sd=class extends za{constructor(t,n=Zi,i=Wa,s,a,r=gn,o=gn,l,c=vs){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,n,i,s,a,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},nu=class extends Fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},fl=class e extends Vn{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],h=[],p=[],u=0,d=0;g("z","y","x",-1,-1,i,n,t,r,a,0),g("z","y","x",1,-1,i,n,-t,r,a,1),g("x","z","y",1,1,t,i,n,s,r,2),g("x","z","y",1,-1,t,i,-n,s,r,3),g("x","y","z",1,-1,t,n,i,s,a,4),g("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new en(c,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(p,2));function g(M,m,f,_,S,v,E,T,R,x,w){let C=v/R,D=E/x,H=v/2,G=E/2,B=T/2,F=R+1,J=x+1,q=0,at=0,X=new L;for(let Q=0;Q<J;Q++){let et=Q*D-G;for(let Ut=0;Ut<F;Ut++){let Ct=Ut*C-H;X[M]=Ct*_,X[m]=et*S,X[f]=B,c.push(X.x,X.y,X.z),X[M]=0,X[m]=0,X[f]=T>0?1:-1,h.push(X.x,X.y,X.z),p.push(Ut/R),p.push(1-Q/x),q+=1}}for(let Q=0;Q<x;Q++)for(let et=0;et<R;et++){let Ut=u+et+F*Q,Ct=u+et+F*(Q+1),re=u+(et+1)+F*(Q+1),Qt=u+(et+1)+F*Q;l.push(Ut,Ct,Qt),l.push(Ct,re,Qt),at+=6}o.addGroup(d,at,w),d+=at,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var mi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xt("Curve: .getPoint() not implemented.")}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,s=this.getPoint(0),a=0;n.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),a+=i.distanceTo(s),n.push(a),s=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){let i=this.getLengths(),s=0,a=i.length,r;n?r=n:r=t*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(a-1);let h=i[s],u=i[s+1]-h,d=(r-h)/u;return(s+d)/(a-1)}getTangent(t,n){let s=t-1e-4,a=t+1e-4;s<0&&(s=0),a>1&&(a=1);let r=this.getPoint(s),o=this.getPoint(a),l=n||(r.isVector2?new gt:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){let i=new L,s=[],a=[],r=[],o=new L,l=new Ne;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new L)}a[0]=new L,r[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),p=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),p<=c&&(c=p,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let d=1;d<=t;d++){if(a[d]=a[d-1].clone(),r[d]=r[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(ne(s[d-1].dot(s[d]),-1,1));a[d].applyMatrix4(l.makeRotationAxis(o,g))}r[d].crossVectors(s[d],a[d])}if(n===!0){let d=Math.acos(ne(a[0].dot(a[t]),-1,1));d/=t,s[0].dot(o.crossVectors(a[0],a[t]))>0&&(d=-d);for(let g=1;g<=t;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},dl=class extends mi{constructor(t=0,n=0,i=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,n=new gt){let i=n,s=Math.PI*2,a=this.aEndAngle-this.aStartAngle,r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);let o=this.aStartAngle+t*a,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*p+this.aX,c=u*p+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ad=class extends dl{constructor(t,n,i,s,a,r){super(t,n,i,i,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}};function F_(){let e=0,t=0,n=0,i=0;function s(a,r,o,l){e=a,t=o,n=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,h,p){let u=(r-a)/c-(o-a)/(c+h)+(o-r)/h,d=(o-r)/h-(l-r)/(h+p)+(l-o)/p;u*=h,d*=h,s(r,o,u,d)},calc:function(a){let r=a*a,o=r*a;return e+t*a+n*r+i*o}}}var n1=new L,i1=new L,$0=new F_,t_=new F_,e_=new F_,pl=class extends mi{constructor(t=[],n=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=s}getPoint(t,n=new L){let i=n,s=this.points,a=s.length,r=(a-(this.closed?0:1))*t,o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%a]:(i1.subVectors(s[0],s[1]).add(s[0]),c=i1);let p=s[o%a],u=s[(o+1)%a];if(this.closed||o+2<a?h=s[(o+2)%a]:(n1.subVectors(s[a-1],s[a-2]).add(s[a-1]),h=n1),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(p),d),M=Math.pow(p.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(h),d);M<1e-4&&(M=1),g<1e-4&&(g=M),m<1e-4&&(m=M),$0.initNonuniformCatmullRom(c.x,p.x,u.x,h.x,g,M,m),t_.initNonuniformCatmullRom(c.y,p.y,u.y,h.y,g,M,m),e_.initNonuniformCatmullRom(c.z,p.z,u.z,h.z,g,M,m)}else this.curveType==="catmullrom"&&($0.initCatmullRom(c.x,p.x,u.x,h.x,this.tension),t_.initCatmullRom(c.y,p.y,u.y,h.y,this.tension),e_.initCatmullRom(c.z,p.z,u.z,h.z,this.tension));return i.set($0.calc(l),t_.calc(l),e_.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function s1(e,t,n,i,s){let a=(i-t)*.5,r=(s-n)*.5,o=e*e,l=e*o;return(2*n-2*i+a+r)*l+(-3*n+3*i-2*a-r)*o+a*e+n}function iR(e,t){let n=1-e;return n*n*t}function sR(e,t){return 2*(1-e)*e*t}function aR(e,t){return e*e*t}function Wc(e,t,n,i){return iR(e,t)+sR(e,n)+aR(e,i)}function rR(e,t){let n=1-e;return n*n*n*t}function oR(e,t){let n=1-e;return 3*n*n*e*t}function lR(e,t){return 3*(1-e)*e*e*t}function cR(e,t){return e*e*e*t}function qc(e,t,n,i,s){return rR(e,t)+oR(e,n)+lR(e,i)+cR(e,s)}var iu=class extends mi{constructor(t=new gt,n=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new gt){let i=n,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(qc(t,s.x,a.x,r.x,o.x),qc(t,s.y,a.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},rd=class extends mi{constructor(t=new L,n=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new L){let i=n,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(qc(t,s.x,a.x,r.x,o.x),qc(t,s.y,a.y,r.y,o.y),qc(t,s.z,a.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},su=class extends mi{constructor(t=new gt,n=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new gt){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new gt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},od=class extends mi{constructor(t=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new L){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},au=class extends mi{constructor(t=new gt,n=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new gt){let i=n,s=this.v0,a=this.v1,r=this.v2;return i.set(Wc(t,s.x,a.x,r.x),Wc(t,s.y,a.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ld=class extends mi{constructor(t=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new L){let i=n,s=this.v0,a=this.v1,r=this.v2;return i.set(Wc(t,s.x,a.x,r.x),Wc(t,s.y,a.y,r.y),Wc(t,s.z,a.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ru=class extends mi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new gt){let i=n,s=this.points,a=(s.length-1)*t,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],h=s[r>s.length-2?s.length-1:r+1],p=s[r>s.length-3?s.length-1:r+2];return i.set(s1(o,l.x,c.x,h.x,p.x),s1(o,l.y,c.y,h.y,p.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new gt().fromArray(s))}return this}},l_=Object.freeze({__proto__:null,ArcCurve:ad,CatmullRomCurve3:pl,CubicBezierCurve:iu,CubicBezierCurve3:rd,EllipseCurve:dl,LineCurve:su,LineCurve3:od,QuadraticBezierCurve:au,QuadraticBezierCurve3:ld,SplineCurve:ru}),cd=class extends mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new l_[i](n,t))}return this}getPoint(t,n){let i=t*this.getLength(),s=this.getCurveLengths(),a=0;for(;a<s.length;){if(s[a]>=i){let r=s[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,n)}a++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],n=0;for(let i=0,s=this.curves.length;i<s;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){let n=[],i;for(let s=0,a=this.curves;s<a.length;s++){let r=a[s],o=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,l=r.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(n.push(h),i=h)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){let s=this.curves[n];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(new l_[s.type]().fromJSON(s))}return this}},Nr=class extends cd{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){let i=new su(this.currentPoint.clone(),new gt(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,s){let a=new au(this.currentPoint.clone(),new gt(t,n),new gt(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(t,n,i,s,a,r){let o=new iu(this.currentPoint.clone(),new gt(t,n),new gt(i,s),new gt(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(t){let n=[this.currentPoint.clone()].concat(t),i=new ru(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,s,a,r){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,n+l,i,s,a,r),this}absarc(t,n,i,s,a,r){return this.absellipse(t,n,i,i,s,a,r),this}ellipse(t,n,i,s,a,r,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,n+h,i,s,a,r,o,l),this}absellipse(t,n,i,s,a,r,o,l){let c=new dl(t,n,i,s,a,r,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Fa=class extends Nr{constructor(t){super(t),this.uuid=Tl(),this.type="Shape",this.holes=[]}getPointsHoles(t){let n=[];for(let i=0,s=this.holes.length;i<s;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){let s=this.holes[n];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(new Nr().fromJSON(s))}return this}};function uR(e,t,n=2){let i=t&&t.length,s=i?t[0]*n:e.length,a=eE(e,0,s,n,!0),r=[];if(!a||a.next===a.prev)return r;let o,l,c;if(i&&(a=mR(e,t,a,n)),e.length>80*n){o=e[0],l=e[1];let h=o,p=l;for(let u=n;u<s;u+=n){let d=e[u],g=e[u+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>p&&(p=g)}c=Math.max(h-o,p-l),c=c!==0?32767/c:0}return ou(a,r,n,o,l,c,0),r}function eE(e,t,n,i,s){let a;if(s===AR(e,t,n,i)>0)for(let r=t;r<n;r+=i)a=a1(r/i|0,e[r],e[r+1],a);else for(let r=n-i;r>=t;r-=i)a=a1(r/i|0,e[r],e[r+1],a);return a&&ml(a,a.next)&&(cu(a),a=a.next),a}function Dr(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(ml(n,n.next)||ke(n.prev,n,n.next)===0)){if(cu(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function ou(e,t,n,i,s,a,r){if(!e)return;!r&&a&&xR(e,i,s,a);let o=e;for(;e.prev!==e.next;){let l=e.prev,c=e.next;if(a?fR(e,i,s,a):hR(e)){t.push(l.i,e.i,c.i),cu(e),e=c.next,o=c.next;continue}if(e=c,e===o){r?r===1?(e=dR(Dr(e),t),ou(e,t,n,i,s,a,2)):r===2&&pR(e,t,n,i,s,a):ou(Dr(e),t,n,i,s,a,1);break}}}function hR(e){let t=e.prev,n=e,i=e.next;if(ke(t,n,i)>=0)return!1;let s=t.x,a=n.x,r=i.x,o=t.y,l=n.y,c=i.y,h=Math.min(s,a,r),p=Math.min(o,l,c),u=Math.max(s,a,r),d=Math.max(o,l,c),g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=p&&g.y<=d&&Xc(s,o,a,l,r,c,g.x,g.y)&&ke(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function fR(e,t,n,i){let s=e.prev,a=e,r=e.next;if(ke(s,a,r)>=0)return!1;let o=s.x,l=a.x,c=r.x,h=s.y,p=a.y,u=r.y,d=Math.min(o,l,c),g=Math.min(h,p,u),M=Math.max(o,l,c),m=Math.max(h,p,u),f=c_(d,g,t,n,i),_=c_(M,m,t,n,i),S=e.prevZ,v=e.nextZ;for(;S&&S.z>=f&&v&&v.z<=_;){if(S.x>=d&&S.x<=M&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&Xc(o,h,l,p,c,u,S.x,S.y)&&ke(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=d&&v.x<=M&&v.y>=g&&v.y<=m&&v!==s&&v!==r&&Xc(o,h,l,p,c,u,v.x,v.y)&&ke(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=f;){if(S.x>=d&&S.x<=M&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&Xc(o,h,l,p,c,u,S.x,S.y)&&ke(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=_;){if(v.x>=d&&v.x<=M&&v.y>=g&&v.y<=m&&v!==s&&v!==r&&Xc(o,h,l,p,c,u,v.x,v.y)&&ke(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function dR(e,t){let n=e;do{let i=n.prev,s=n.next.next;!ml(i,s)&&iE(i,n,n.next,s)&&lu(i,s)&&lu(s,i)&&(t.push(i.i,n.i,s.i),cu(n),cu(n.next),n=e=s),n=n.next}while(n!==e);return Dr(n)}function pR(e,t,n,i,s,a){let r=e;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&bR(r,o)){let l=sE(r,o);r=Dr(r,r.next),l=Dr(l,l.next),ou(r,t,n,i,s,a,0),ou(l,t,n,i,s,a,0);return}o=o.next}r=r.next}while(r!==e)}function mR(e,t,n,i){let s=[];for(let a=0,r=t.length;a<r;a++){let o=t[a]*i,l=a<r-1?t[a+1]*i:e.length,c=eE(e,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(MR(c))}s.sort(gR);for(let a=0;a<s.length;a++)n=_R(s[a],n);return n}function gR(e,t){let n=e.x-t.x;if(n===0&&(n=e.y-t.y,n===0)){let i=(e.next.y-e.y)/(e.next.x-e.x),s=(t.next.y-t.y)/(t.next.x-t.x);n=i-s}return n}function _R(e,t){let n=vR(e,t);if(!n)return t;let i=sE(n,e);return Dr(i,i.next),Dr(n,n.next)}function vR(e,t){let n=t,i=e.x,s=e.y,a=-1/0,r;if(ml(e,n))return n;do{if(ml(e,n.next))return n.next;if(s<=n.y&&s>=n.next.y&&n.next.y!==n.y){let p=n.x+(s-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(p<=i&&p>a&&(a=p,r=n.x<n.next.x?n:n.next,p===i))return r}n=n.next}while(n!==t);if(!r)return null;let o=r,l=r.x,c=r.y,h=1/0;n=r;do{if(i>=n.x&&n.x>=l&&i!==n.x&&nE(s<c?i:a,s,l,c,s<c?a:i,s,n.x,n.y)){let p=Math.abs(s-n.y)/(i-n.x);lu(n,e)&&(p<h||p===h&&(n.x>r.x||n.x===r.x&&yR(r,n)))&&(r=n,h=p)}n=n.next}while(n!==o);return r}function yR(e,t){return ke(e.prev,e,t.prev)<0&&ke(t.next,e,e.next)<0}function xR(e,t,n,i){let s=e;do s.z===0&&(s.z=c_(s.x,s.y,t,n,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==e);s.prevZ.nextZ=null,s.prevZ=null,SR(s)}function SR(e){let t,n=1;do{let i=e,s;e=null;let a=null;for(t=0;i;){t++;let r=i,o=0;for(let c=0;c<n&&(o++,r=r.nextZ,!!r);c++);let l=n;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(s=i,i=i.nextZ,o--):(s=r,r=r.nextZ,l--),a?a.nextZ=s:e=s,s.prevZ=a,a=s;i=r}a.nextZ=null,n*=2}while(t>1);return e}function c_(e,t,n,i,s){return e=(e-n)*s|0,t=(t-i)*s|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function MR(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function nE(e,t,n,i,s,a,r,o){return(s-r)*(t-o)>=(e-r)*(a-o)&&(e-r)*(i-o)>=(n-r)*(t-o)&&(n-r)*(a-o)>=(s-r)*(i-o)}function Xc(e,t,n,i,s,a,r,o){return!(e===r&&t===o)&&nE(e,t,n,i,s,a,r,o)}function bR(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!ER(e,t)&&(lu(e,t)&&lu(t,e)&&TR(e,t)&&(ke(e.prev,e,t.prev)||ke(e,t.prev,t))||ml(e,t)&&ke(e.prev,e,e.next)>0&&ke(t.prev,t,t.next)>0)}function ke(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function ml(e,t){return e.x===t.x&&e.y===t.y}function iE(e,t,n,i){let s=Hf(ke(e,t,n)),a=Hf(ke(e,t,i)),r=Hf(ke(n,i,e)),o=Hf(ke(n,i,t));return!!(s!==a&&r!==o||s===0&&Ff(e,n,t)||a===0&&Ff(e,i,t)||r===0&&Ff(n,e,i)||o===0&&Ff(n,t,i))}function Ff(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Hf(e){return e>0?1:e<0?-1:0}function ER(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&iE(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function lu(e,t){return ke(e.prev,e,e.next)<0?ke(e,t,e.next)>=0&&ke(e,e.prev,t)>=0:ke(e,t,e.prev)<0||ke(e,e.next,t)<0}function TR(e,t){let n=e,i=!1,s=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&s<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function sE(e,t){let n=u_(e.i,e.x,e.y),i=u_(t.i,t.x,t.y),s=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=s,s.prev=n,i.next=n,n.prev=i,a.next=i,i.prev=a,i}function a1(e,t,n,i){let s=u_(e,t,n);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function cu(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function u_(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function AR(e,t,n,i){let s=0;for(let a=t,r=n-i;a<n;a+=i)s+=(e[r]-e[a])*(e[a+1]+e[r+1]),r=a;return s}var h_=class{static triangulate(t,n,i=2){return uR(t,n,i)}},gs=class e{static area(t){let n=t.length,i=0;for(let s=n-1,a=0;a<n;s=a++)i+=t[s].x*t[a].y-t[a].x*t[s].y;return i*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(t,n){let i=[],s=[],a=[];r1(t),o1(i,t);let r=t.length;n.forEach(r1);for(let l=0;l<n.length;l++)s.push(r),r+=n[l].length,o1(i,n[l]);let o=h_.triangulate(i,s);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}};function r1(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function o1(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var gl=class e extends Vn{constructor(t=new Fa([new gt(.5,.5),new gt(-.5,.5),new gt(-.5,-.5),new gt(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];let i=this,s=[],a=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];r(c)}this.setAttribute("position",new en(s,3)),this.setAttribute("uv",new en(a,2)),this.computeVertexNormals();function r(o){let l=[],c=n.curveSegments!==void 0?n.curveSegments:12,h=n.steps!==void 0?n.steps:1,p=n.depth!==void 0?n.depth:1,u=n.bevelEnabled!==void 0?n.bevelEnabled:!0,d=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:d-.1,M=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3,f=n.extrudePath,_=n.UVGenerator!==void 0?n.UVGenerator:wR,S,v=!1,E,T,R,x;if(f){S=f.getSpacedPoints(h),v=!0,u=!1;let nt=f.isCatmullRomCurve3?f.closed:!1;E=f.computeFrenetFrames(h,nt),T=new L,R=new L,x=new L}u||(m=0,d=0,g=0,M=0);let w=o.extractPoints(c),C=w.shape,D=w.holes;if(!gs.isClockWise(C)){C=C.reverse();for(let nt=0,rt=D.length;nt<rt;nt++){let ct=D[nt];gs.isClockWise(ct)&&(D[nt]=ct.reverse())}}function G(nt){let ct=10000000000000001e-36,ut=nt[0];for(let pt=1;pt<=nt.length;pt++){let zt=pt%nt.length,It=nt[zt],Gt=It.x-ut.x,Wt=It.y-ut.y,U=Gt*Gt+Wt*Wt,de=Math.max(Math.abs(It.x),Math.abs(It.y),Math.abs(ut.x),Math.abs(ut.y)),ft=ct*de*de;if(U<=ft){nt.splice(zt,1),pt--;continue}ut=It}}G(C),D.forEach(G);let B=D.length,F=C;for(let nt=0;nt<B;nt++){let rt=D[nt];C=C.concat(rt)}function J(nt,rt,ct){return rt||kt("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(rt,ct)}let q=C.length;function at(nt,rt,ct){let ut,pt,zt,It=nt.x-rt.x,Gt=nt.y-rt.y,Wt=ct.x-nt.x,U=ct.y-nt.y,de=It*It+Gt*Gt,ft=It*U-Gt*Wt;if(Math.abs(ft)>Number.EPSILON){let A=Math.sqrt(de),y=Math.sqrt(Wt*Wt+U*U),z=rt.x-Gt/A,V=rt.y+It/A,W=ct.x-U/y,ot=ct.y+Wt/y,dt=((W-z)*U-(ot-V)*Wt)/(It*U-Gt*Wt);ut=z+It*dt-nt.x,pt=V+Gt*dt-nt.y;let Y=ut*ut+pt*pt;if(Y<=2)return new gt(ut,pt);zt=Math.sqrt(Y/2)}else{let A=!1;It>Number.EPSILON?Wt>Number.EPSILON&&(A=!0):It<-Number.EPSILON?Wt<-Number.EPSILON&&(A=!0):Math.sign(Gt)===Math.sign(U)&&(A=!0),A?(ut=-Gt,pt=It,zt=Math.sqrt(de)):(ut=It,pt=Gt,zt=Math.sqrt(de/2))}return new gt(ut/zt,pt/zt)}let X=[];for(let nt=0,rt=F.length,ct=rt-1,ut=nt+1;nt<rt;nt++,ct++,ut++)ct===rt&&(ct=0),ut===rt&&(ut=0),X[nt]=at(F[nt],F[ct],F[ut]);let Q=[],et,Ut=X.concat();for(let nt=0,rt=B;nt<rt;nt++){let ct=D[nt];et=[];for(let ut=0,pt=ct.length,zt=pt-1,It=ut+1;ut<pt;ut++,zt++,It++)zt===pt&&(zt=0),It===pt&&(It=0),et[ut]=at(ct[ut],ct[zt],ct[It]);Q.push(et),Ut=Ut.concat(et)}let Ct;if(m===0)Ct=gs.triangulateShape(F,D);else{let nt=[],rt=[];for(let ct=0;ct<m;ct++){let ut=ct/m,pt=d*Math.cos(ut*Math.PI/2),zt=g*Math.sin(ut*Math.PI/2)+M;for(let It=0,Gt=F.length;It<Gt;It++){let Wt=J(F[It],X[It],zt);bt(Wt.x,Wt.y,-pt),ut===0&&nt.push(Wt)}for(let It=0,Gt=B;It<Gt;It++){let Wt=D[It];et=Q[It];let U=[];for(let de=0,ft=Wt.length;de<ft;de++){let A=J(Wt[de],et[de],zt);bt(A.x,A.y,-pt),ut===0&&U.push(A)}ut===0&&rt.push(U)}}Ct=gs.triangulateShape(nt,rt)}let re=Ct.length,Qt=g+M;for(let nt=0;nt<q;nt++){let rt=u?J(C[nt],Ut[nt],Qt):C[nt];v?(R.copy(E.normals[0]).multiplyScalar(rt.x),T.copy(E.binormals[0]).multiplyScalar(rt.y),x.copy(S[0]).add(R).add(T),bt(x.x,x.y,x.z)):bt(rt.x,rt.y,0)}for(let nt=1;nt<=h;nt++)for(let rt=0;rt<q;rt++){let ct=u?J(C[rt],Ut[rt],Qt):C[rt];v?(R.copy(E.normals[nt]).multiplyScalar(ct.x),T.copy(E.binormals[nt]).multiplyScalar(ct.y),x.copy(S[nt]).add(R).add(T),bt(x.x,x.y,x.z)):bt(ct.x,ct.y,p/h*nt)}for(let nt=m-1;nt>=0;nt--){let rt=nt/m,ct=d*Math.cos(rt*Math.PI/2),ut=g*Math.sin(rt*Math.PI/2)+M;for(let pt=0,zt=F.length;pt<zt;pt++){let It=J(F[pt],X[pt],ut);bt(It.x,It.y,p+ct)}for(let pt=0,zt=D.length;pt<zt;pt++){let It=D[pt];et=Q[pt];for(let Gt=0,Wt=It.length;Gt<Wt;Gt++){let U=J(It[Gt],et[Gt],ut);v?bt(U.x,U.y+S[h-1].y,S[h-1].x+ct):bt(U.x,U.y,p+ct)}}}ie(),Z();function ie(){let nt=s.length/3;if(u){let rt=0,ct=q*rt;for(let ut=0;ut<re;ut++){let pt=Ct[ut];Ft(pt[2]+ct,pt[1]+ct,pt[0]+ct)}rt=h+m*2,ct=q*rt;for(let ut=0;ut<re;ut++){let pt=Ct[ut];Ft(pt[0]+ct,pt[1]+ct,pt[2]+ct)}}else{for(let rt=0;rt<re;rt++){let ct=Ct[rt];Ft(ct[2],ct[1],ct[0])}for(let rt=0;rt<re;rt++){let ct=Ct[rt];Ft(ct[0]+q*h,ct[1]+q*h,ct[2]+q*h)}}i.addGroup(nt,s.length/3-nt,0)}function Z(){let nt=s.length/3,rt=0;j(F,rt),rt+=F.length;for(let ct=0,ut=D.length;ct<ut;ct++){let pt=D[ct];j(pt,rt),rt+=pt.length}i.addGroup(nt,s.length/3-nt,1)}function j(nt,rt){let ct=nt.length;for(;--ct>=0;){let ut=ct,pt=ct-1;pt<0&&(pt=nt.length-1);for(let zt=0,It=h+m*2;zt<It;zt++){let Gt=q*zt,Wt=q*(zt+1),U=rt+ut+Gt,de=rt+pt+Gt,ft=rt+pt+Wt,A=rt+ut+Wt;At(U,de,ft,A)}}}function bt(nt,rt,ct){l.push(nt),l.push(rt),l.push(ct)}function Ft(nt,rt,ct){Bt(nt),Bt(rt),Bt(ct);let ut=s.length/3,pt=_.generateTopUV(i,s,ut-3,ut-2,ut-1);oe(pt[0]),oe(pt[1]),oe(pt[2])}function At(nt,rt,ct,ut){Bt(nt),Bt(rt),Bt(ut),Bt(rt),Bt(ct),Bt(ut);let pt=s.length/3,zt=_.generateSideWallUV(i,s,pt-6,pt-3,pt-2,pt-1);oe(zt[0]),oe(zt[1]),oe(zt[3]),oe(zt[1]),oe(zt[2]),oe(zt[3])}function Bt(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function oe(nt){a.push(nt.x),a.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return CR(n,i,t)}static fromJSON(t,n){let i=[];for(let a=0,r=t.shapes.length;a<r;a++){let o=n[t.shapes[a]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new l_[s.type]().fromJSON(s)),new e(i,t.options)}},wR={generateTopUV:function(e,t,n,i,s){let a=t[n*3],r=t[n*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new gt(a,r),new gt(o,l),new gt(c,h)]},generateSideWallUV:function(e,t,n,i,s,a){let r=t[n*3],o=t[n*3+1],l=t[n*3+2],c=t[i*3],h=t[i*3+1],p=t[i*3+2],u=t[s*3],d=t[s*3+1],g=t[s*3+2],M=t[a*3],m=t[a*3+1],f=t[a*3+2];return Math.abs(o-h)<Math.abs(r-c)?[new gt(r,1-l),new gt(c,1-p),new gt(u,1-g),new gt(M,1-f)]:[new gt(o,1-l),new gt(h,1-p),new gt(d,1-g),new gt(m,1-f)]}};function CR(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,s=e.length;i<s;i++){let a=e[i];n.shapes.push(a.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Ur=class e extends Vn{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,p=t/o,u=n/l,d=[],g=[],M=[],m=[];for(let f=0;f<h;f++){let _=f*u-r;for(let S=0;S<c;S++){let v=S*p-a;g.push(v,-_,0),M.push(0,0,1),m.push(S/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<o;_++){let S=_+c*f,v=_+c*(f+1),E=_+1+c*(f+1),T=_+1+c*f;d.push(S,v,T),d.push(v,E,T)}this.setIndex(d),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(M,3)),this.setAttribute("uv",new en(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var uu=class e extends Vn{constructor(t=new Fa([new gt(0,.5),new gt(-.5,-.5),new gt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};let i=[],s=[],a=[],r=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new en(s,3)),this.setAttribute("normal",new en(a,3)),this.setAttribute("uv",new en(r,2));function c(h){let p=s.length/3,u=h.extractPoints(n),d=u.shape,g=u.holes;gs.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,f=g.length;m<f;m++){let _=g[m];gs.isClockWise(_)===!0&&(g[m]=_.reverse())}let M=gs.triangulateShape(d,g);for(let m=0,f=g.length;m<f;m++){let _=g[m];d=d.concat(_)}for(let m=0,f=d.length;m<f;m++){let _=d[m];s.push(_.x,_.y,0),a.push(0,0,1),r.push(_.x,_.y)}for(let m=0,f=M.length;m<f;m++){let _=M[m],S=_[0]+p,v=_[1]+p,E=_[2]+p;i.push(S,v,E),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes;return RR(n,t)}static fromJSON(t,n){let i=[];for(let s=0,a=t.shapes.length;s<a;s++){let r=n[t.shapes[s]];i.push(r)}return new e(i,t.curveSegments)}};function RR(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){let s=e[n];t.shapes.push(s.uuid)}else t.shapes.push(e.uuid);return t}var _l=class e extends Vn{constructor(t=1,n=.4,i=12,s=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:a,thetaStart:r,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],p=[],u=new L,d=new L,g=new L;for(let M=0;M<=i;M++){let m=r+M/i*o;for(let f=0;f<=s;f++){let _=f/s*a;d.x=(t+n*Math.cos(m))*Math.cos(_),d.y=(t+n*Math.cos(m))*Math.sin(_),d.z=n*Math.sin(m),c.push(d.x,d.y,d.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),p.push(f/s),p.push(M/i)}}for(let M=1;M<=i;M++)for(let m=1;m<=s;m++){let f=(s+1)*M+m-1,_=(s+1)*(M-1)+m-1,S=(s+1)*(M-1)+m,v=(s+1)*M+m;l.push(f,_,v),l.push(_,S,v)}this.setIndex(l),this.setAttribute("position",new en(c,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Or(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];if(l1(s))s.isRenderTargetTexture?(Xt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone();else if(Array.isArray(s))if(l1(s[0])){let a=[];for(let r=0,o=s.length;r<o;r++)a[r]=s[r].clone();t[n][i]=a}else t[n][i]=s.slice();else t[n][i]=s}}return t}function Un(e){let t={};for(let n=0;n<e.length;n++){let i=Or(e[n]);for(let s in i)t[s]=i[s]}return t}function l1(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function NR(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function H_(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}var aE={clone:Or,merge:Un},DR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,UR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gi=class extends Ba{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=DR,this.fragmentShader=UR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Or(t.uniforms),this.uniformsGroups=NR(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=n[s.value]||null;break;case"c":this.uniforms[i].value=new jt().setHex(s.value);break;case"v2":this.uniforms[i].value=new gt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new L().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ve().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ne().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ud=class extends gi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vl=class extends Ba{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dp,this.normalScale=new gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qs,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ha=class extends vl{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new gt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ne(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var hd=class extends Ba{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=H1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},fd=class extends Ba{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function jo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function n_(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Va=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},dd=class extends Va{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:a_,endingEnd:a_}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case r_:a=t,o=2*n-i;break;case o_:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case r_:r=t,l=2*i-n;break;case o_:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,h=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*h,this._offsetNext=r*h}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-n)/(s-n),M=g*g,m=M*g,f=-u*m+2*u*M-u*g,_=(1+u)*m+(-1.5-2*u)*M+(-.5+u)*g+1,S=(-1-d)*m+(1.5+d)*M+.5*g,v=d*m-d*M;for(let E=0;E!==o;++E)a[E]=f*r[h+E]+_*r[c+E]+S*r[l+E]+v*r[p+E];return a}},pd=class extends Va{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-n)/(s-n),p=1-h;for(let u=0;u!==o;++u)a[u]=r[c+u]*p+r[l+u]*h;return a}},md=class extends Va{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},gd=class extends Va{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let g=(i-n)/(s-n),M=1-g;for(let m=0;m!==o;++m)a[m]=r[c+m]*M+r[l+m]*g;return a}let u=o*2,d=t-1;for(let g=0;g!==o;++g){let M=r[c+g],m=r[l+g],f=d*u+g*2,_=p[f],S=p[f+1],v=t*u+g*2,E=h[v],T=h[v+1],R=IR(i,n,_,E,s);a[g]=rE(R,M,S,T,m)}return a}};function rE(e,t,n,i,s){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*i+e*e*e*s}function LR(e,t,n,i,s){let a=1-e;return 3*a*a*(n-t)+6*a*e*(i-n)+3*e*e*(s-i)}function IR(e,t,n,i,s){let a=(e-t)/(s-t);for(let r=0;r<8;r++){let o=rE(a,t,n,i,s)-e;if(Math.abs(o)<1e-10)break;let l=LR(a,t,n,i,s);if(Math.abs(l)<1e-10)break;a=Math.max(0,Math.min(1,a-o/l))}return a}var _i=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=jo(n,this.TimeBufferType),this.values=jo(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:jo(t.times,Array),values:jo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),n_(t.settings)&&(i.settings={inTangents:jo(t.settings.inTangents,Array),outTangents:jo(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new md(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new pd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new dd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new gd(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.inTangents=this.settings.inTangents,n.outTangents=this.settings.outTangents),n}setInterpolation(t){let n;switch(t){case Yc:n=this.InterpolantFactoryMethodDiscrete;break;case $f:n=this.InterpolantFactoryMethodLinear;break;case kf:n=this.InterpolantFactoryMethodSmooth;break;case s_:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Xt("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yc;case this.InterpolantFactoryMethodLinear:return $f;case this.InterpolantFactoryMethodSmooth:return kf;case this.InterpolantFactoryMethodBezier:return s_}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t;n_(this.settings)&&(c1(this.settings.inTangents,t),c1(this.settings.outTangents,t))}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(kt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(kt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){kt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){kt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&BC(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){kt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===kf,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*i,u=p-i,d=p+i;for(let g=0;g!==i;++g){let M=n[p+g];if(M!==n[u+g]||M!==n[d+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let d=0;d!==i;++d)n[u+d]=n[p+d]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,n_(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function c1(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]*=t}_i.prototype.ValueTypeName="";_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=$f;var Ga=class extends _i{constructor(t,n,i){super(t,n,i)}};Ga.prototype.ValueTypeName="bool";Ga.prototype.ValueBufferType=Array;Ga.prototype.DefaultInterpolation=Yc;Ga.prototype.InterpolantFactoryMethodLinear=void 0;Ga.prototype.InterpolantFactoryMethodSmooth=void 0;var _d=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}};_d.prototype.ValueTypeName="color";var vd=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}};vd.prototype.ValueTypeName="number";var yd=class extends Va{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let h=c+o;c!==h;c+=4)zn.slerpFlat(a,0,r,c-o,r,c,l);return a}},hu=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new yd(this.times,this.values,this.getValueSize(),t)}};hu.prototype.ValueTypeName="quaternion";hu.prototype.InterpolantFactoryMethodSmooth=void 0;var ka=class extends _i{constructor(t,n,i){super(t,n,i)}};ka.prototype.ValueTypeName="string";ka.prototype.ValueBufferType=Array;ka.prototype.DefaultInterpolation=Yc;ka.prototype.InterpolantFactoryMethodLinear=void 0;ka.prototype.InterpolantFactoryMethodSmooth=void 0;var xd=class extends _i{constructor(t,n,i,s){super(t,n,i,s)}};xd.prototype.ValueTypeName="vector";var Sd=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,a===!1&&s.onStart!==void 0&&s.onStart(h,r,o),a=!0},this.itemEnd=function(h){r++,s.onProgress!==void 0&&s.onProgress(h,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=c.length;p<u;p+=2){let d=c[p],g=c[p+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},oE=new Sd,Md=class{constructor(t){this.manager=t!==void 0?t:oE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Md.DEFAULT_MATERIAL_NAME="__DEFAULT";var bd=class extends Hn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}};var i_=new Ne,u1=new L,h1=new L,Ed=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new gt(512,512),this.mapType=$n,this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hl,this._frameExtents=new gt(1,1),this._viewportCount=1,this._viewports=[new Ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera;u1.setFromMatrixPosition(t.matrixWorld),n.position.copy(u1),h1.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(h1),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,i,s){i_.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(i_,t.coordinateSystem,t.reversedDepth);let a=this._frameExtents,r=s?s.z/a.x:1,o=s?s.w/a.y:1,l=s?s.x/a.x:0,c=s?s.y/a.y:0;t.coordinateSystem===il||t.reversedDepth?n.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):n.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),n.multiply(i_)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Vf=new L,Gf=new zn,ps=new L,fu=class extends Hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Vf,Gf,ps),ps.x===1&&ps.y===1&&ps.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vf,Gf,ps.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(Vf,Gf,ps),ps.x===1&&ps.y===1&&ps.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vf,Gf,ps.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ia=new L,f1=new gt,d1=new gt,Nn=class extends fu{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=td*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(U0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return td*2*Math.atan(Math.tan(U0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ia.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ia.x,Ia.y).multiplyScalar(-t/Ia.z),Ia.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ia.x,Ia.y).multiplyScalar(-t/Ia.z)}getViewSize(t,n){return this.getViewBounds(t,f1,d1),n.subVectors(d1,f1)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(U0*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var yl=class extends fu{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},f_=class extends Ed{constructor(){super(new yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},xl=class extends bd{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Hn.DEFAULT_UP),this.updateMatrix(),this.target=new Hn,this.shadow=new f_}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}};var $o=-90,tl=1,Td=class extends Hn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Nn($o,tl,t,n);s.layers=this.layers,this.add(s);let a=new Nn($o,tl,t,n);a.layers=this.layers,this.add(a);let r=new Nn($o,tl,t,n);r.layers=this.layers,this.add(r);let o=new Nn($o,tl,t,n);o.layers=this.layers,this.add(o);let l=new Nn($o,tl,t,n);l.layers=this.layers,this.add(l);let c=new Nn($o,tl,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===qi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===il)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(p,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Ad=class extends Nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var V_="\\[\\]\\.:\\/",OR=new RegExp("["+V_+"]","g"),G_="[^"+V_+"]",PR="[^"+V_.replace("\\.","")+"]",BR=/((?:WC+[\/:])*)/.source.replace("WC",G_),zR=/(WCOD+)?/.source.replace("WCOD",PR),FR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",G_),HR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",G_),VR=new RegExp("^"+BR+zR+FR+HR+"$"),GR=["material","materials","bones","map"],d_=class{constructor(t,n,i){let s=i||Pe.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Pe=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(OR,"")}static parseTrackName(t){let n=VR.exec(t);if(n===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);GR.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xt("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){kt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){kt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){kt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){kt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){kt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){kt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;kt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){kt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pe.Composite=d_;Pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pe.prototype.GetterByBindingType=[Pe.prototype._getValue_direct,Pe.prototype._getValue_array,Pe.prototype._getValue_arrayElement,Pe.prototype._getValue_toArray];Pe.prototype.SetterByBindingTypeAndVersioning=[[Pe.prototype._setValue_direct,Pe.prototype._setValue_direct_setNeedsUpdate,Pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_array,Pe.prototype._setValue_array_setNeedsUpdate,Pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_arrayElement,Pe.prototype._setValue_arrayElement_setNeedsUpdate,Pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_fromArray,Pe.prototype._setValue_fromArray_setNeedsUpdate,Pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gL=new Float32Array(1);var p1=new Ne,du=class{constructor(t,n,i=0,s=1/0){this.ray=new tu(t,n),this.near=i,this.far=s,this.camera=null,this.layers=new rl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):kt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return p1.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(p1),this}intersectObject(t,n=!0,i=[]){return p_(t,this,i,n),i.sort(m1),i}intersectObjects(t,n=!0,i=[]){for(let s=0,a=t.length;s<a;s++)p_(t[s],this,i,n);return i.sort(m1),i}};function m1(e,t){return e.distance-t.distance}function p_(e,t,n,i){let s=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(s=!1),s===!0&&i===!0){let a=e.children;for(let r=0,o=a.length;r<o;r++)p_(a[r],t,n,!0)}}var Z_=class Z_{constructor(t,n,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,s){let a=this.elements;return a[0]=t,a[2]=n,a[1]=i,a[3]=s,this}};Z_.prototype.isMatrix2=!0;var m_=Z_;function k_(e,t,n,i){let s=kR(i);switch(n){case I_:return e*t;case P_:return e*t/s.components*s.byteLength;case Id:return e*t/s.components*s.byteLength;case Ya:return e*t*2/s.components*s.byteLength;case Od:return e*t*2/s.components*s.byteLength;case O_:return e*t*3/s.components*s.byteLength;case Oi:return e*t*4/s.components*s.byteLength;case Pd:return e*t*4/s.components*s.byteLength;case vu:case yu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case xu:case Su:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case zd:case Hd:return Math.max(e,16)*Math.max(t,8)/4;case Bd:case Fd:return Math.max(e,8)*Math.max(t,8)/2;case Vd:case Gd:case Xd:case Wd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case kd:case Mu:case qd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Yd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Zd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Jd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Kd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Qd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case jd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case $d:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case tp:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ep:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case np:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ip:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case sp:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ap:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case rp:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case op:case lp:case cp:return Math.ceil(e/4)*Math.ceil(t/4)*16;case up:case hp:return Math.ceil(e/4)*Math.ceil(t/4)*8;case bu:case fp:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function kR(e){switch(e){case $n:case N_:return{byteLength:1,components:1};case bl:case D_:case Ki:return{byteLength:2,components:1};case Ud:case Ld:return{byteLength:2,components:4};case Zi:case Dd:case Ji:return{byteLength:4,components:1};case U_:case L_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Xt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function RE(){let e=null,t=!1,n=null,i=null;function s(a,r){i=e.requestAnimationFrame(s),n(a,r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function WR(e){let t=new WeakMap;function n(o,l){let c=o.array,h=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=e.SHORT;else if(c instanceof Uint32Array)d=e.UNSIGNED_INT;else if(c instanceof Int32Array)d=e.INT;else if(c instanceof Int8Array)d=e.BYTE;else if(c instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let h=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,h);else{p.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<p.length;d++){let g=p[u],M=p[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,p[u]=M)}p.length=u+1;for(let d=0,g=p.length;d<g;d++){let M=p[d];e.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var qR=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,YR=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ZR=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,JR=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KR=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,QR=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jR=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$R=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t3=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,e3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,n3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,i3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,s3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,a3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,r3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,o3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,l3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,c3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,u3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,h3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,f3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,d3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,p3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,m3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,g3=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_3=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,v3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,y3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,x3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,M3="gl_FragColor = linearToOutputTexel( gl_FragColor );",b3=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,E3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,T3=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,A3=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,w3=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,C3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,R3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,N3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,U3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,L3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,I3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,P3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,z3=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,F3=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,H3=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,V3=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,G3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,k3=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,X3=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,W3=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,q3=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Y3=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z3=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,J3=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,K3=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q3=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j3=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$3=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,t2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,e2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,n2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,i2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,s2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,r2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,o2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,l2=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,c2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,h2=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,f2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,m2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,g2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,x2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,M2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,b2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,E2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,w2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,C2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,R2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,N2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,D2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,U2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,L2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,I2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,P2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,B2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,F2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,H2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,V2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,G2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,k2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,X2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,W2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,q2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Y2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Q2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tN=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,eN=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,nN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,iN=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sN=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,aN=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,oN=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lN=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cN=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uN=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hN=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fN=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dN=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pN=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mN=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gN=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_N=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vN=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yN=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xN=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,SN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,MN=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bN=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,EN=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:qR,alphahash_pars_fragment:YR,alphamap_fragment:ZR,alphamap_pars_fragment:JR,alphatest_fragment:KR,alphatest_pars_fragment:QR,aomap_fragment:jR,aomap_pars_fragment:$R,batching_pars_vertex:t3,batching_vertex:e3,begin_vertex:n3,beginnormal_vertex:i3,bsdfs:s3,iridescence_fragment:a3,bumpmap_pars_fragment:r3,clipping_planes_fragment:o3,clipping_planes_pars_fragment:l3,clipping_planes_pars_vertex:c3,clipping_planes_vertex:u3,color_fragment:h3,color_pars_fragment:f3,color_pars_vertex:d3,color_vertex:p3,common:m3,cube_uv_reflection_fragment:g3,defaultnormal_vertex:_3,displacementmap_pars_vertex:v3,displacementmap_vertex:y3,emissivemap_fragment:x3,emissivemap_pars_fragment:S3,colorspace_fragment:M3,colorspace_pars_fragment:b3,envmap_fragment:E3,envmap_common_pars_fragment:T3,envmap_pars_fragment:A3,envmap_pars_vertex:w3,envmap_physical_pars_fragment:z3,envmap_vertex:C3,fog_vertex:R3,fog_pars_vertex:N3,fog_fragment:D3,fog_pars_fragment:U3,gradientmap_pars_fragment:L3,lightmap_pars_fragment:I3,lights_lambert_fragment:O3,lights_lambert_pars_fragment:P3,lights_pars_begin:B3,lights_toon_fragment:F3,lights_toon_pars_fragment:H3,lights_phong_fragment:V3,lights_phong_pars_fragment:G3,lights_physical_fragment:k3,lights_physical_pars_fragment:X3,lights_fragment_begin:W3,lights_fragment_maps:q3,lights_fragment_end:Y3,lightprobes_pars_fragment:Z3,logdepthbuf_fragment:J3,logdepthbuf_pars_fragment:K3,logdepthbuf_pars_vertex:Q3,logdepthbuf_vertex:j3,map_fragment:$3,map_pars_fragment:t2,map_particle_fragment:e2,map_particle_pars_fragment:n2,metalnessmap_fragment:i2,metalnessmap_pars_fragment:s2,morphinstance_vertex:a2,morphcolor_vertex:r2,morphnormal_vertex:o2,morphtarget_pars_vertex:l2,morphtarget_vertex:c2,normal_fragment_begin:u2,normal_fragment_maps:h2,normal_pars_fragment:f2,normal_pars_vertex:d2,normal_vertex:p2,normalmap_pars_fragment:m2,clearcoat_normal_fragment_begin:g2,clearcoat_normal_fragment_maps:_2,clearcoat_pars_fragment:v2,iridescence_pars_fragment:y2,opaque_fragment:x2,packing:S2,premultiplied_alpha_fragment:M2,project_vertex:b2,dithering_fragment:E2,dithering_pars_fragment:T2,roughnessmap_fragment:A2,roughnessmap_pars_fragment:w2,shadowmap_pars_fragment:C2,shadowmap_pars_vertex:R2,shadowmap_vertex:N2,shadowmask_pars_fragment:D2,skinbase_vertex:U2,skinning_pars_vertex:L2,skinning_vertex:I2,skinnormal_vertex:O2,specularmap_fragment:P2,specularmap_pars_fragment:B2,tonemapping_fragment:z2,tonemapping_pars_fragment:F2,transmission_fragment:H2,transmission_pars_fragment:V2,uv_pars_fragment:G2,uv_pars_vertex:k2,uv_vertex:X2,worldpos_vertex:W2,background_vert:q2,background_frag:Y2,backgroundCube_vert:Z2,backgroundCube_frag:J2,cube_vert:K2,cube_frag:Q2,depth_vert:j2,depth_frag:$2,distance_vert:tN,distance_frag:eN,equirect_vert:nN,equirect_frag:iN,linedashed_vert:sN,linedashed_frag:aN,meshbasic_vert:rN,meshbasic_frag:oN,meshlambert_vert:lN,meshlambert_frag:cN,meshmatcap_vert:uN,meshmatcap_frag:hN,meshnormal_vert:fN,meshnormal_frag:dN,meshphong_vert:pN,meshphong_frag:mN,meshphysical_vert:gN,meshphysical_frag:_N,meshtoon_vert:vN,meshtoon_frag:yN,points_vert:xN,points_frag:SN,shadow_vert:MN,shadow_frag:bN,sprite_vert:EN,sprite_frag:TN},Et={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},bs={basic:{uniforms:Un([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Un([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new jt(0)},envMapIntensity:{value:1}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Un([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Un([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Un([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new jt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Un([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Un([Et.points,Et.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Un([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Un([Et.common,Et.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Un([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Un([Et.sprite,Et.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distance:{uniforms:Un([Et.common,Et.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distance_vert,fragmentShader:te.distance_frag},shadow:{uniforms:Un([Et.lights,Et.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};bs.physical={uniforms:Un([bs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};var gp={r:0,b:0,g:0},AN=new Ne,NE=new Kt;NE.set(-1,0,0,0,1,0,0,0,1);function wN(e,t,n,i,s,a){let r=new jt(0),o=s===!0?0:1,l,c,h=null,p=0,u=null;function d(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){let v=_.backgroundBlurriness>0;S=t.get(S,v)}return S}function g(_){let S=!1,v=d(_);v===null?m(r,o):v&&v.isColor&&(m(v,1),S=!0);let E=e.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function M(_,S){let v=d(S);v&&(v.isCubeTexture||v.mapping===gu)?(c===void 0&&(c=new Je(new fl(1,1,1),new gi({name:"BackgroundCubeMaterial",uniforms:Or(bs.backgroundCube.uniforms),vertexShader:bs.backgroundCube.vertexShader,fragmentShader:bs.backgroundCube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(AN.makeRotationFromEuler(S.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(NE),c.material.toneMapped=ce.getTransfer(v.colorSpace)!==Se,(h!==v||p!==v.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=v,p=v.version,u=e.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Je(new Ur(2,2),new gi({name:"BackgroundMaterial",uniforms:Or(bs.background.uniforms),vertexShader:bs.background.vertexShader,fragmentShader:bs.background.fragmentShader,side:Xa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ce.getTransfer(v.colorSpace)!==Se,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||p!==v.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=v,p=v.version,u=e.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,S){_.getRGB(gp,H_(e)),n.buffers.color.setClear(gp.r,gp.g,gp.b,S,a)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(_,S=1){r.set(_),o=S,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(r,o)},render:g,addToRenderList:M,dispose:f}}function CN(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(D,H,G,B,F){let J=!1,q=p(D,B,G,H);a!==q&&(a=q,c(a.object)),J=d(D,B,G,F),J&&g(D,B,G,F),F!==null&&t.update(F,e.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,v(D,H,G,B),F!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return e.createVertexArray()}function c(D){return e.bindVertexArray(D)}function h(D){return e.deleteVertexArray(D)}function p(D,H,G,B){let F=B.wireframe===!0,J=i[H.id];J===void 0&&(J={},i[H.id]=J);let q=D.isInstancedMesh===!0?D.id:0,at=J[q];at===void 0&&(at={},J[q]=at);let X=at[G.id];X===void 0&&(X={},at[G.id]=X);let Q=X[F];return Q===void 0&&(Q=u(l()),X[F]=Q),Q}function u(D){let H=[],G=[],B=[];for(let F=0;F<n;F++)H[F]=0,G[F]=0,B[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:G,attributeDivisors:B,object:D,attributes:{},index:null}}function d(D,H,G,B){let F=a.attributes,J=H.attributes,q=0,at=G.getAttributes();for(let X in at)if(at[X].location>=0){let et=F[X],Ut=J[X];if(Ut===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(Ut=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(Ut=D.instanceColor)),et===void 0||et.attribute!==Ut||Ut&&et.data!==Ut.data)return!0;q++}return a.attributesNum!==q||a.index!==B}function g(D,H,G,B){let F={},J=H.attributes,q=0,at=G.getAttributes();for(let X in at)if(at[X].location>=0){let et=J[X];et===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(et=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(et=D.instanceColor));let Ut={};Ut.attribute=et,et&&et.data&&(Ut.data=et.data),F[X]=Ut,q++}a.attributes=F,a.attributesNum=q,a.index=B}function M(){let D=a.newAttributes;for(let H=0,G=D.length;H<G;H++)D[H]=0}function m(D){f(D,0)}function f(D,H){let G=a.newAttributes,B=a.enabledAttributes,F=a.attributeDivisors;G[D]=1,B[D]===0&&(e.enableVertexAttribArray(D),B[D]=1),F[D]!==H&&(e.vertexAttribDivisor(D,H),F[D]=H)}function _(){let D=a.newAttributes,H=a.enabledAttributes;for(let G=0,B=H.length;G<B;G++)H[G]!==D[G]&&(e.disableVertexAttribArray(G),H[G]=0)}function S(D,H,G,B,F,J,q){q===!0?e.vertexAttribIPointer(D,H,G,F,J):e.vertexAttribPointer(D,H,G,B,F,J)}function v(D,H,G,B){M();let F=B.attributes,J=G.getAttributes(),q=H.defaultAttributeValues;for(let at in J){let X=J[at];if(X.location>=0){let Q=F[at];if(Q===void 0&&(at==="instanceMatrix"&&D.instanceMatrix&&(Q=D.instanceMatrix),at==="instanceColor"&&D.instanceColor&&(Q=D.instanceColor)),Q!==void 0){let et=Q.normalized,Ut=Q.itemSize,Ct=t.get(Q);if(Ct===void 0)continue;let re=Ct.buffer,Qt=Ct.type,ie=Ct.bytesPerElement,Z=Qt===e.INT||Qt===e.UNSIGNED_INT||Q.gpuType===Dd;if(Q.isInterleavedBufferAttribute){let j=Q.data,bt=j.stride,Ft=Q.offset;if(j.isInstancedInterleavedBuffer){for(let At=0;At<X.locationSize;At++)f(X.location+At,j.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let At=0;At<X.locationSize;At++)m(X.location+At);e.bindBuffer(e.ARRAY_BUFFER,re);for(let At=0;At<X.locationSize;At++)S(X.location+At,Ut/X.locationSize,Qt,et,bt*ie,(Ft+Ut/X.locationSize*At)*ie,Z)}else{if(Q.isInstancedBufferAttribute){for(let j=0;j<X.locationSize;j++)f(X.location+j,Q.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let j=0;j<X.locationSize;j++)m(X.location+j);e.bindBuffer(e.ARRAY_BUFFER,re);for(let j=0;j<X.locationSize;j++)S(X.location+j,Ut/X.locationSize,Qt,et,Ut*ie,Ut/X.locationSize*j*ie,Z)}}else if(q!==void 0){let et=q[at];if(et!==void 0)switch(et.length){case 2:e.vertexAttrib2fv(X.location,et);break;case 3:e.vertexAttrib3fv(X.location,et);break;case 4:e.vertexAttrib4fv(X.location,et);break;default:e.vertexAttrib1fv(X.location,et)}}}}_()}function E(){w();for(let D in i){let H=i[D];for(let G in H){let B=H[G];for(let F in B){let J=B[F];for(let q in J)h(J[q].object),delete J[q];delete B[F]}}delete i[D]}}function T(D){if(i[D.id]===void 0)return;let H=i[D.id];for(let G in H){let B=H[G];for(let F in B){let J=B[F];for(let q in J)h(J[q].object),delete J[q];delete B[F]}}delete i[D.id]}function R(D){for(let H in i){let G=i[H];for(let B in G){let F=G[B];if(F[D.id]===void 0)continue;let J=F[D.id];for(let q in J)h(J[q].object),delete J[q];delete F[D.id]}}}function x(D){for(let H in i){let G=i[H],B=D.isInstancedMesh===!0?D.id:0,F=G[B];if(F!==void 0){for(let J in F){let q=F[J];for(let at in q)h(q[at].object),delete q[at];delete F[J]}delete G[B],Object.keys(G).length===0&&delete i[H]}}}function w(){C(),r=!0,a!==s&&(a=s,c(a.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:M,enableAttribute:m,disableUnusedAttributes:_}}function RN(e,t,n){let i;function s(l){i=l}function a(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,h){h!==0&&(e.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];n.update(u,i,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function NN(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(R){return!(R!==Oi&&i.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let x=R===Ki&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==$n&&R!==Ji&&!x&&i.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);h!==c&&(Xt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Xt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),_=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),S=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=e.getParameter(e.MAX_SAMPLES),T=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:v,maxSamples:E,samples:T}}function DN(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Wi,o=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let d=p.length!==0||u||i!==0||s;return s=u,i=p.length,d},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,u){n=h(p,u,0)},this.setState=function(p,u,d){let g=p.clippingPlanes,M=p.clipIntersection,m=p.clipShadows,f=e.get(p);if(!s||g===null||g.length===0||a&&!m)a?h(null):c();else{let _=a?0:i,S=_*4,v=f.clippingState||null;l.value=v,v=h(g,u,S,d);for(let E=0;E!==S;++E)v[E]=n[E];f.clippingState=v,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(p,u,d,g){let M=p!==null?p.length:0,m=null;if(M!==0){if(m=l.value,g!==!0||m===null){let f=d+M*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,v=d;S!==M;++S,v+=4)r.copy(p[S]).applyMatrix4(_,o),r.normal.toArray(m,v),m[v+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,m}}var wl=4,UN=6,LN=20,IN=256,Eu=new yl,lE=new jt,J_=null,K_=0,Q_=0,j_=!1,ON=new L,Pr=new L,Rl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=ON}=a;J_=this._renderer.getRenderTarget(),K_=this._renderer.getActiveCubeFace(),Q_=this._renderer.getActiveMipmapLevel(),j_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(J_,K_,Q_),this._renderer.xr.enabled=j_,t.scissorTest=!1,Al(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Wa||t.mapping===Ir?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),J_=this._renderer.getRenderTarget(),K_=this._renderer.getActiveCubeFace(),Q_=this._renderer.getActiveMipmapLevel(),j_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Ki,format:Oi,colorSpace:Zc,depthBuffer:!1},s=cE(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cE(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=PN(a)),this._blurMaterial=zN(a,t,n),this._ggxMaterial=BN(a,t,n)}return s}_compileMaterial(t){let n=new Je(new Vn,t);this._renderer.compile(n,Eu)}_sceneToCubeUV(t,n,i,s,a){let l=new Nn(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,d=p.toneMapping;p.getClearColor(lE),p.toneMapping=Yi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Je(new fl,new Cr({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,m=M.material,f=!1,_=t.background;_?_.isColor&&(m.color.copy(_),t.background=null,f=!0):(m.color.copy(lE),f=!0);for(let S=0;S<6;S++){let v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+h[S],a.y,a.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+h[S],a.z)):(l.up.set(0,c[S],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+h[S]));let E=this._cubeSize;Al(s,v*E,S>2?E:0,E,E),p.setRenderTarget(s),f&&p.render(M,l),p.render(t,l)}p.toneMapping=d,p.autoClear=u,t.background=_}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Wa||t.mapping===Ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hE()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uE());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;Al(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Eu)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),u=c*1.25,d=p*u,{_lodMax:g}=this,M=this._sizeLods[i],m=3*M*(i>g-wl?i-g+wl:0),f=4*(this._cubeSize-M);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-n,Al(a,m,f,3*M,2*M),s.setRenderTarget(a),s.render(o,Eu),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=g-i,Al(t,m,f,3*M,2*M),s.setRenderTarget(t),s.render(o,Eu)}_blur(t,n,i,s){let a=this._pingPongRenderTarget,r=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,a,n,i,r),this._blurPass(a,t,i,i,r)}_blurPass(t,n,i,s,a){let r=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],p=3*h*(s>this._lodMax-wl?s-this._lodMax+wl:0),u=4*(this._cubeSize-h);Al(n,p,u,3*h,2*h),r.setRenderTarget(n),r.render(l,Eu)}};function PN(e){let t=[],n=[],i=e,s=e-wl+1+UN;for(let a=0;a<s;a++){let r=Math.pow(2,i);t.push(r);let o=1/(r-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,u=6,d=3,g=new Float32Array(d*u*p),M=new Float32Array(d*u*p);for(let f=0;f<p;f++){let _=f%3*2/3-1,S=f>2?0:-1,v=[_,S,0,_+2/3,S,0,_+2/3,S+1,0,_,S,0,_+2/3,S+1,0,_,S+1,0];g.set(v,d*u*f);for(let E=0;E<u;E++){let T=h[E*2]*2-1,R=h[E*2+1]*2-1;f===0?Pr.set(1,R,T):f===1?Pr.set(-T,1,-R):f===2?Pr.set(-T,R,1):f===3?Pr.set(-1,R,-T):f===4?Pr.set(-T,-1,R):Pr.set(T,R,-1),Pr.toArray(M,(f*u+E)*d)}}let m=new Vn;m.setAttribute("position",new Dn(g,d)),m.setAttribute("outputDirection",new Dn(M,d)),n.push(new Je(m,null)),i>wl&&i--}return{lodMeshes:n,sizeLods:t}}function cE(e,t,n){let i=new jn(e,t,n);return i.texture.mapping=gu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Al(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function BN(e,t,n){return new gi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xp(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function zN(e,t,n){return new gi({name:"SphericalGaussianBlur",defines:{SAMPLES:LN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xp(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function uE(){return new gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function hE(){return new gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function xp(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var vp=class extends jn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new eu(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new fl(5,5,5),a=new gi({name:"CubemapFromEquirect",uniforms:Or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gn,blending:xs});a.uniforms.tEquirect.value=n;let r=new Je(s,a),o=n.minFilter;return n.minFilter===Ss&&(n.minFilter=ln),new Td(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};function FN(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,d=!1){return u==null?null:d?r(u):a(u)}function a(u){if(u&&u.isTexture){let d=u.mapping;if(d===Cd||d===Rd)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let M=new vp(g.height);return M.fromEquirectangularTexture(e,u),t.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let d=u.mapping,g=d===Cd||d===Rd,M=d===Wa||d===Ir;if(g||M){let m=n.get(u),f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Rl(e)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{let _=u.image;return g&&_&&_.height>0||M&&_&&l(_)?(i===null&&(i=new Rl(e)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Cd?u.mapping=Wa:d===Rd&&(u.mapping=Ir),u}function l(u){let d=0,g=6;for(let M=0;M<g;M++)u[M]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=n.get(d);g!==void 0&&(n.delete(d),g.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function HN(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&wr("WebGLRenderer: "+i+" extension not supported."),s}}}function VN(e,t,n,i){let s={},a=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete s[u.id];let d=a.get(u);d&&(t.remove(d),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let d in u)t.update(u[d],e.ARRAY_BUFFER)}function c(p){let u=[],d=p.index,g=p.attributes.position,M=0;if(g===void 0)return;if(d!==null){let _=d.array;M=d.version;for(let S=0,v=_.length;S<v;S+=3){let E=_[S+0],T=_[S+1],R=_[S+2];u.push(E,T,T,R,R,E)}}else{let _=g.array;M=g.version;for(let S=0,v=_.length/3-1;S<v;S+=3){let E=S+0,T=S+1,R=S+2;u.push(E,T,T,R,R,E)}}let m=new(g.count>=65535?$c:jc)(u,1);m.version=M;let f=a.get(p);f&&t.remove(f),a.set(p,m)}function h(p){let u=a.get(p);if(u){let d=p.index;d!==null&&u.version<d.version&&c(p)}else c(p);return a.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function GN(e,t,n){let i;function s(p){i=p}let a,r;function o(p){a=p.type,r=p.bytesPerElement}function l(p,u){e.drawElements(i,u,a,p*r),n.update(u,i,1)}function c(p,u,d){d!==0&&(e.drawElementsInstanced(i,u,a,p*r,d),n.update(u,i,d))}function h(p,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,p,0,d);let M=0;for(let m=0;m<d;m++)M+=u[m];n.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function kN(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:kt("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function XN(e,t,n){let i=new WeakMap,s=new Ve;function a(r,o,l){let c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==p){let w=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],S=0;d===!0&&(S=1),g===!0&&(S=2),M===!0&&(S=3);let v=o.attributes.position.count*S,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*E*4*p),R=new Qc(T,v,E,p);R.type=Ji,R.needsUpdate=!0;let x=S*4;for(let C=0;C<p;C++){let D=m[C],H=f[C],G=_[C],B=v*E*4*C;for(let F=0;F<D.count;F++){let J=F*x;d===!0&&(s.fromBufferAttribute(D,F),T[B+J+0]=s.x,T[B+J+1]=s.y,T[B+J+2]=s.z,T[B+J+3]=0),g===!0&&(s.fromBufferAttribute(H,F),T[B+J+4]=s.x,T[B+J+5]=s.y,T[B+J+6]=s.z,T[B+J+7]=0),M===!0&&(s.fromBufferAttribute(G,F),T[B+J+8]=s.x,T[B+J+9]=s.y,T[B+J+10]=s.z,T[B+J+11]=G.itemSize===4?s.w:1)}}u={count:p,texture:R,size:new gt(v,E)},i.set(o,u),o.addEventListener("dispose",w)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let d=0;for(let M=0;M<c.length;M++)d+=c[M];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function WN(e,t,n,i,s){let a=new WeakMap;function r(c){let h=s.render.frame,p=c.geometry,u=t.get(c,p);if(a.get(u)!==h&&(t.update(u),a.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==h&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;a.get(d)!==h&&(d.update(),a.set(d,h))}return u}function o(){a=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:r,dispose:o}}var qN={[b_]:"LINEAR_TONE_MAPPING",[E_]:"REINHARD_TONE_MAPPING",[T_]:"CINEON_TONE_MAPPING",[A_]:"ACES_FILMIC_TONE_MAPPING",[C_]:"AGX_TONE_MAPPING",[mu]:"NEUTRAL_TONE_MAPPING",[w_]:"CUSTOM_TONE_MAPPING"};function YN(e,t,n,i,s,a){let r=new jn(t,n,{type:e,depthBuffer:s,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Vn;c.setAttribute("position",new en([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new en([0,2,0,0,2,0],2));let h=new ud({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Je(c,h),u=new yl(-1,1,1,-1,0,1),d=null,g=null,M=!1,m,f=null,_=[],S=!1;this.setSize=function(v,E){r.setSize(v,E),o!==null&&o.setSize(v,E),l!==null&&l.setSize(v,E);for(let T=0;T<_.length;T++){let R=_[T];R.setSize&&R.setSize(v,E)}},this.setEffects=function(v){_=v,S=_.length>0&&_[0].isRenderPass===!0;let E=r.width,T=r.height;_.length>0&&o===null&&(o=new jn(E,T,{type:Ki,depthBuffer:!1,stencilBuffer:!1}),l=new jn(E,T,{type:Ki,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<_.length;R++){let x=_[R];x.setSize&&x.setSize(E,T)}},this.begin=function(v,E){if(M||v.toneMapping===Yi&&_.length===0)return!1;if(f=E,E!==null){let T=E.width,R=E.height;(r.width!==T||r.height!==R)&&this.setSize(T,R)}return S===!1&&v.setRenderTarget(r),m=v.toneMapping,v.toneMapping=Yi,!0},this.hasRenderPass=function(){return S},this.end=function(v,E){v.toneMapping=m,M=!0;let T=r,R=o;for(let x=0;x<_.length;x++){let w=_[x];w.enabled!==!1&&(w.render(v,R,T,E),w.needsSwap!==!1&&(T=R,R=R===o?l:o))}if(d!==v.outputColorSpace||g!==v.toneMapping){d=v.outputColorSpace,g=v.toneMapping,h.defines={},ce.getTransfer(d)===Se&&(h.defines.SRGB_TRANSFER="");let x=qN[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,v.setRenderTarget(f),v.render(p,u),f=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var DE=new Fn,ev=new za(1,1),UE=new Qc,LE=new id,IE=new eu,fE=[],dE=[],pE=new Float32Array(16),mE=new Float32Array(9),gE=new Float32Array(4);function Nl(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=fE[s];if(a===void 0&&(a=new Float32Array(s),fE[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function cn(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function un(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Sp(e,t){let n=dE[t];n===void 0&&(n=new Int32Array(t),dE[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function ZN(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function JN(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cn(n,t))return;e.uniform2fv(this.addr,t),un(n,t)}}function KN(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(cn(n,t))return;e.uniform3fv(this.addr,t),un(n,t)}}function QN(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cn(n,t))return;e.uniform4fv(this.addr,t),un(n,t)}}function jN(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(cn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),un(n,t)}else{if(cn(n,i))return;gE.set(i),e.uniformMatrix2fv(this.addr,!1,gE),un(n,i)}}function $N(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(cn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),un(n,t)}else{if(cn(n,i))return;mE.set(i),e.uniformMatrix3fv(this.addr,!1,mE),un(n,i)}}function tD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(cn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),un(n,t)}else{if(cn(n,i))return;pE.set(i),e.uniformMatrix4fv(this.addr,!1,pE),un(n,i)}}function eD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function nD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cn(n,t))return;e.uniform2iv(this.addr,t),un(n,t)}}function iD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cn(n,t))return;e.uniform3iv(this.addr,t),un(n,t)}}function sD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cn(n,t))return;e.uniform4iv(this.addr,t),un(n,t)}}function aD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function rD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(cn(n,t))return;e.uniform2uiv(this.addr,t),un(n,t)}}function oD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(cn(n,t))return;e.uniform3uiv(this.addr,t),un(n,t)}}function lD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(cn(n,t))return;e.uniform4uiv(this.addr,t),un(n,t)}}function cD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(ev.compareFunction=n.isReversedDepthBuffer()?mp:pp,a=ev):a=DE,n.setTexture2D(t||a,s)}function uD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||LE,s)}function hD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||IE,s)}function fD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||UE,s)}function dD(e){switch(e){case 5126:return ZN;case 35664:return JN;case 35665:return KN;case 35666:return QN;case 35674:return jN;case 35675:return $N;case 35676:return tD;case 5124:case 35670:return eD;case 35667:case 35671:return nD;case 35668:case 35672:return iD;case 35669:case 35673:return sD;case 5125:return aD;case 36294:return rD;case 36295:return oD;case 36296:return lD;case 35678:case 36198:case 36298:case 36306:case 35682:return cD;case 35679:case 36299:case 36307:return uD;case 35680:case 36300:case 36308:case 36293:return hD;case 36289:case 36303:case 36311:case 36292:return fD}}function pD(e,t){e.uniform1fv(this.addr,t)}function mD(e,t){let n=Nl(t,this.size,2);e.uniform2fv(this.addr,n)}function gD(e,t){let n=Nl(t,this.size,3);e.uniform3fv(this.addr,n)}function _D(e,t){let n=Nl(t,this.size,4);e.uniform4fv(this.addr,n)}function vD(e,t){let n=Nl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function yD(e,t){let n=Nl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function xD(e,t){let n=Nl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function SD(e,t){e.uniform1iv(this.addr,t)}function MD(e,t){e.uniform2iv(this.addr,t)}function bD(e,t){e.uniform3iv(this.addr,t)}function ED(e,t){e.uniform4iv(this.addr,t)}function TD(e,t){e.uniform1uiv(this.addr,t)}function AD(e,t){e.uniform2uiv(this.addr,t)}function wD(e,t){e.uniform3uiv(this.addr,t)}function CD(e,t){e.uniform4uiv(this.addr,t)}function RD(e,t,n){let i=this.cache,s=t.length,a=Sp(n,s);cn(i,a)||(e.uniform1iv(this.addr,a),un(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=ev:r=DE;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function ND(e,t,n){let i=this.cache,s=t.length,a=Sp(n,s);cn(i,a)||(e.uniform1iv(this.addr,a),un(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||LE,a[r])}function DD(e,t,n){let i=this.cache,s=t.length,a=Sp(n,s);cn(i,a)||(e.uniform1iv(this.addr,a),un(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||IE,a[r])}function UD(e,t,n){let i=this.cache,s=t.length,a=Sp(n,s);cn(i,a)||(e.uniform1iv(this.addr,a),un(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||UE,a[r])}function LD(e){switch(e){case 5126:return pD;case 35664:return mD;case 35665:return gD;case 35666:return _D;case 35674:return vD;case 35675:return yD;case 35676:return xD;case 5124:case 35670:return SD;case 35667:case 35671:return MD;case 35668:case 35672:return bD;case 35669:case 35673:return ED;case 5125:return TD;case 36294:return AD;case 36295:return wD;case 36296:return CD;case 35678:case 36198:case 36298:case 36306:case 35682:return RD;case 35679:case 36299:case 36307:return ND;case 35680:case 36300:case 36308:case 36293:return DD;case 36289:case 36303:case 36311:case 36292:return UD}}var nv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=dD(n.type)}},iv=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=LD(n.type)}},sv=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},$_=/(\w+)(\])?(\[|\.)?/g;function _E(e,t){e.seq.push(t),e.map[t.id]=t}function ID(e,t,n){let i=e.name,s=i.length;for($_.lastIndex=0;;){let a=$_.exec(i),r=$_.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){_E(n,c===void 0?new nv(o,e,t):new iv(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new sv(o),_E(n,p)),n=p}}}var Cl=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);ID(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function vE(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var OD=37297,PD=0;function BD(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var yE=new Kt;function zD(e){ce._getMatrix(yE,ce.workingColorSpace,e);let t=`mat3( ${yE.elements.map(n=>n.toFixed(4))} )`;switch(ce.getTransfer(e)){case Jc:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return Xt("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function xE(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+BD(e.getShaderSource(t),o)}else return a}function FD(e,t){let n=zD(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var HD={[b_]:"Linear",[E_]:"Reinhard",[T_]:"Cineon",[A_]:"ACESFilmic",[C_]:"AgX",[mu]:"Neutral",[w_]:"Custom"};function VD(e,t){let n=HD[t];return n===void 0?(Xt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var _p=new L;function GD(){ce.getLuminanceCoefficients(_p);let e=_p.x.toFixed(4),t=_p.y.toFixed(4),n=_p.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kD(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Au).join(`
`)}function XD(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function WD(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function Au(e){return e!==""}function SE(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ME(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var qD=/^[ \t]*#include +<([\w\d./]+)>/gm;function av(e){return e.replace(qD,ZD)}var YD=new Map;function ZD(e,t){let n=te[t];if(n===void 0){let i=YD.get(t);if(i!==void 0)n=te[i],Xt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return av(n)}var JD=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bE(e){return e.replace(JD,KD)}function KD(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function EE(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var QD={[pu]:"SHADOWMAP_TYPE_PCF",[Sl]:"SHADOWMAP_TYPE_VSM"};function jD(e){return QD[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var $D={[Wa]:"ENVMAP_TYPE_CUBE",[Ir]:"ENVMAP_TYPE_CUBE",[gu]:"ENVMAP_TYPE_CUBE_UV"};function tU(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":$D[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var eU={[Ir]:"ENVMAP_MODE_REFRACTION"};function nU(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":eU[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var iU={[M_]:"ENVMAP_BLENDING_MULTIPLY",[B1]:"ENVMAP_BLENDING_MIX",[z1]:"ENVMAP_BLENDING_ADD"};function sU(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":iU[e.combine]||"ENVMAP_BLENDING_NONE"}function aU(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function rU(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=jD(n),c=tU(n),h=nU(n),p=sU(n),u=aU(n),d=kD(n),g=XD(a),M=s.createProgram(),m,f,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Au).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Au).join(`
`),f.length>0&&(f+=`
`)):(m=[EE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Au).join(`
`),f=[EE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Yi?"#define TONE_MAPPING":"",n.toneMapping!==Yi?te.tonemapping_pars_fragment:"",n.toneMapping!==Yi?VD("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,FD("linearToOutputTexel",n.outputColorSpace),GD(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Au).join(`
`)),r=av(r),r=SE(r,n),r=ME(r,n),o=av(o),o=SE(o,n),o=ME(o,n),r=bE(r),o=bE(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===B_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===B_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let S=_+m+r,v=_+f+o,E=vE(s,s.VERTEX_SHADER,S),T=vE(s,s.FRAGMENT_SHADER,v);s.attachShader(M,E),s.attachShader(M,T),n.index0AttributeName!==void 0?s.bindAttribLocation(M,0,n.index0AttributeName):n.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function R(D){if(e.debug.checkShaderErrors){let H=s.getProgramInfoLog(M)||"",G=s.getShaderInfoLog(E)||"",B=s.getShaderInfoLog(T)||"",F=H.trim(),J=G.trim(),q=B.trim(),at=!0,X=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(at=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,M,E,T);else{let Q=xE(s,E,"vertex"),et=xE(s,T,"fragment");kt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+Q+`
`+et)}else F!==""?Xt("WebGLProgram: Program Info Log:",F):(J===""||q==="")&&(X=!1);X&&(D.diagnostics={runnable:at,programLog:F,vertexShader:{log:J,prefix:m},fragmentShader:{log:q,prefix:f}})}s.deleteShader(E),s.deleteShader(T),x=new Cl(s,M),w=WD(s,M)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(M,OD)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=PD++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=T,this}var oU=0,rv=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){let s=this._getShaderCacheForMaterial(t);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new ov(t),n.set(t,i)),i}},ov=class{constructor(t){this.id=oU++,this.code=t,this.usedTimes=0}};function lU(e){return e===Ya||e===Mu||e===bu}function cU(e,t,n,i,s,a){let r=new rl,o=new rv,l=new Set,c=[],h=new Map,p=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function M(x,w,C,D,H,G){let B=D.fog,F=H.geometry,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,at=t.get(x.envMap||J,q),X=at&&at.mapping===gu?at.image.height:null,Q=d[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Xt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let et=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ut=et!==void 0?et.length:0,Ct=0;F.morphAttributes.position!==void 0&&(Ct=1),F.morphAttributes.normal!==void 0&&(Ct=2),F.morphAttributes.color!==void 0&&(Ct=3);let re,Qt,ie,Z;if(Q){let ve=bs[Q];re=ve.vertexShader,Qt=ve.fragmentShader}else{re=x.vertexShader,Qt=x.fragmentShader;let ve=o.getVertexShaderStage(x),pe=o.getFragmentShaderStage(x);o.update(x,ve,pe),ie=ve.id,Z=pe.id}let j=e.getRenderTarget(),bt=e.state.buffers.depth.getReversed(),Ft=H.isInstancedMesh===!0,At=H.isBatchedMesh===!0,Bt=!!x.map,oe=!!x.matcap,nt=!!at,rt=!!x.aoMap,ct=!!x.lightMap,ut=!!x.bumpMap&&x.wireframe===!1,pt=!!x.normalMap,zt=!!x.displacementMap,It=!!x.emissiveMap,Gt=!!x.metalnessMap,Wt=!!x.roughnessMap,U=x.anisotropy>0,de=x.clearcoat>0,ft=x.dispersion>0,A=x.retroreflectivity>0,y=x.iridescence>0,z=x.sheen>0,V=x.transmission>0,W=U&&!!x.anisotropyMap,ot=de&&!!x.clearcoatMap,dt=de&&!!x.clearcoatNormalMap,Y=de&&!!x.clearcoatRoughnessMap,$=y&&!!x.iridescenceMap,mt=y&&!!x.iridescenceThicknessMap,Lt=z&&!!x.sheenColorMap,St=z&&!!x.sheenRoughnessMap,_t=!!x.specularMap,Dt=!!x.specularColorMap,Ht=!!x.specularIntensityMap,Zt=V&&!!x.transmissionMap,O=V&&!!x.thicknessMap,vt=!!x.gradientMap,K=!!x.alphaMap,yt=x.alphaTest>0,Tt=!!x.alphaHash,st=!!x.extensions,Ot=Yi;x.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ot=e.toneMapping);let Nt={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:re,fragmentShader:Qt,defines:x.defines,customVertexShaderID:ie,customFragmentShaderID:Z,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:At,batchingColor:At&&H._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&H.instanceColor!==null,instancingMorph:Ft&&H.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Bt,matcap:oe,envMap:nt,envMapMode:nt&&at.mapping,envMapCubeUVHeight:X,aoMap:rt,lightMap:ct,bumpMap:ut,normalMap:pt,displacementMap:zt,emissiveMap:It,normalMapObjectSpace:pt&&x.normalMapType===V1,normalMapTangentSpace:pt&&x.normalMapType===dp,packedNormalMap:pt&&x.normalMapType===dp&&lU(x.normalMap.format),metalnessMap:Gt,roughnessMap:Wt,anisotropy:U,anisotropyMap:W,clearcoat:de,clearcoatMap:ot,clearcoatNormalMap:dt,clearcoatRoughnessMap:Y,dispersion:ft,retroreflection:A,iridescence:y,iridescenceMap:$,iridescenceThicknessMap:mt,sheen:z,sheenColorMap:Lt,sheenRoughnessMap:St,specularMap:_t,specularColorMap:Dt,specularIntensityMap:Ht,transmission:V,transmissionMap:Zt,thicknessMap:O,gradientMap:vt,opaque:x.transparent===!1&&x.blending===Ml&&x.alphaToCoverage===!1,alphaMap:K,alphaTest:yt,alphaHash:Tt,combine:x.combine,mapUv:Bt&&g(x.map.channel),aoMapUv:rt&&g(x.aoMap.channel),lightMapUv:ct&&g(x.lightMap.channel),bumpMapUv:ut&&g(x.bumpMap.channel),normalMapUv:pt&&g(x.normalMap.channel),displacementMapUv:zt&&g(x.displacementMap.channel),emissiveMapUv:It&&g(x.emissiveMap.channel),metalnessMapUv:Gt&&g(x.metalnessMap.channel),roughnessMapUv:Wt&&g(x.roughnessMap.channel),anisotropyMapUv:W&&g(x.anisotropyMap.channel),clearcoatMapUv:ot&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:dt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:St&&g(x.sheenRoughnessMap.channel),specularMapUv:_t&&g(x.specularMap.channel),specularColorMapUv:Dt&&g(x.specularColorMap.channel),specularIntensityMapUv:Ht&&g(x.specularIntensityMap.channel),transmissionMapUv:Zt&&g(x.transmissionMap.channel),thicknessMapUv:O&&g(x.thicknessMap.channel),alphaMapUv:K&&g(x.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(pt||U),vertexNormals:!!F.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!F.attributes.uv&&(Bt||K),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||F.attributes.normal===void 0&&pt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:bt,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Ut,morphTextureStride:Ct,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ot,decodeVideoTexture:Bt&&x.map.isVideoTexture===!0&&ce.getTransfer(x.map.colorSpace)===Se,decodeVideoTextureEmissive:It&&x.emissiveMap.isVideoTexture===!0&&ce.getTransfer(x.emissiveMap.colorSpace)===Se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===vi,flipSided:x.side===Gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Nt.vertexUv1s=l.has(1),Nt.vertexUv2s=l.has(2),Nt.vertexUv3s=l.has(3),l.clear(),Nt}function m(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let C in x.defines)w.push(C),w.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(f(w,x),_(w,x),w.push(e.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function _(x,w){r.disableAll(),w.instancing&&r.enable(0),w.instancingColor&&r.enable(1),w.instancingMorph&&r.enable(2),w.matcap&&r.enable(3),w.envMap&&r.enable(4),w.normalMapObjectSpace&&r.enable(5),w.normalMapTangentSpace&&r.enable(6),w.clearcoat&&r.enable(7),w.iridescence&&r.enable(8),w.alphaTest&&r.enable(9),w.vertexColors&&r.enable(10),w.vertexAlphas&&r.enable(11),w.vertexUv1s&&r.enable(12),w.vertexUv2s&&r.enable(13),w.vertexUv3s&&r.enable(14),w.vertexTangents&&r.enable(15),w.anisotropy&&r.enable(16),w.alphaHash&&r.enable(17),w.batching&&r.enable(18),w.dispersion&&r.enable(19),w.retroreflection&&r.enable(24),w.batchingColor&&r.enable(20),w.gradientMap&&r.enable(21),w.packedNormalMap&&r.enable(22),w.vertexNormals&&r.enable(23),x.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reversedDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.decodeVideoTextureEmissive&&r.enable(20),w.alphaToCoverage&&r.enable(21),w.numLightProbeGrids>0&&r.enable(22),w.hasPositionAttribute&&r.enable(23),x.push(r.mask)}function S(x){let w=d[x.type],C;if(w){let D=bs[w];C=aE.clone(D.uniforms)}else C=x.uniforms;return C}function v(x,w){let C=h.get(w);return C!==void 0?++C.usedTimes:(C=new rU(e,w,x,s),c.push(C),h.set(w,C)),C}function E(x){if(--x.usedTimes===0){let w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function R(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:S,acquireProgram:v,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:R}}function uU(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function hU(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function TE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function AE(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,M,m,f){let _=e[t];return _===void 0?(_={id:u.id,object:u,geometry:d,material:g,materialVariant:r(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:f},e[t]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=g,_.materialVariant=r(u),_.groupOrder=M,_.renderOrder=u.renderOrder,_.z=m,_.group=f),t++,_}function l(u,d,g,M,m,f,_){_.reversedDepth===!0&&(m=-m);let S=o(u,d,g,M,m,f);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):n.push(S)}function c(u,d,g,M,m,f){let _=o(u,d,g,M,m,f);g.transmission>0?i.unshift(_):g.transparent===!0?s.unshift(_):n.unshift(_)}function h(u,d){n.length>1&&n.sort(u||hU),i.length>1&&i.sort(d||TE),s.length>1&&s.sort(d||TE)}function p(){for(let u=t,d=e.length;u<d;u++){let g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:p,sort:h}}function fU(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new AE,e.set(i,[r])):s>=a.length?(r=new AE,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function dU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new L,color:new jt};break;case"SpotLight":n={position:new L,direction:new L,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new jt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":n={color:new jt,position:new L,halfWidth:new L,halfHeight:new L};break}return e[t.id]=n,n}}}function pU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var mU=0;function gU(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function _U(e){let t=new dU,n=pU(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);let s=new L,a=new Ne,r=new Ne;function o(c){let h=0,p=0,u=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let d=0,g=0,M=0,m=0,f=0,_=0,S=0,v=0,E=0,T=0,R=0,x=0,w=0,C=0;c.sort(gU);for(let H=0,G=c.length;H<G;H++){let B=c[H],F=B.color,J=B.intensity,q=B.distance,at=null;if(B.shadow&&B.shadow.map&&(B.shadow.map.texture.format===Ya?at=B.shadow.map.texture:at=B.shadow.map.depthTexture||B.shadow.map.texture),B.isAmbientLight)h+=F.r*J,p+=F.g*J,u+=F.b*J;else if(B.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(B.sh.coefficients[X],J);C++}else if(B.isSunLight){let X=t.get(B);if(X.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let Q=B.shadow,et=n.get(B);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[g]=et,i.sunShadowMap[g]=at;let Ut=Q.getViewportCount();for(let Ct=0;Ct<Ut;Ct++)i.sunShadowMatrix[M+Ct]=Q.getMatrix(Ct),i.sunShadowCascade[M+Ct]=Q._cascadeData[Ct];M+=Ut,g++}i.sun[d]=X,d++}else if(B.isDirectionalLight){let X=t.get(B);if(X.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){let Q=B.shadow,et=n.get(B);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,i.directionalShadow[m]=et,i.directionalShadowMap[m]=at,i.directionalShadowMatrix[m]=B.shadow.matrix,E++}i.directional[m]=X,m++}else if(B.isSpotLight){let X=t.get(B);X.position.setFromMatrixPosition(B.matrixWorld),X.color.copy(F).multiplyScalar(J),X.distance=q,X.coneCos=Math.cos(B.angle),X.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),X.decay=B.decay,i.spot[_]=X;let Q=B.shadow;if(B.map&&(i.spotLightMap[x]=B.map,x++,Q.updateMatrices(B),B.castShadow&&w++),i.spotLightMatrix[_]=Q.matrix,B.castShadow){let et=n.get(B);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,i.spotShadow[_]=et,i.spotShadowMap[_]=at,R++}_++}else if(B.isRectAreaLight){let X=t.get(B);X.color.copy(F).multiplyScalar(J),X.halfWidth.set(B.width*.5,0,0),X.halfHeight.set(0,B.height*.5,0),i.rectArea[S]=X,S++}else if(B.isPointLight){let X=t.get(B);if(X.color.copy(B.color).multiplyScalar(B.intensity),X.distance=B.distance,X.decay=B.decay,B.castShadow){let Q=B.shadow,et=n.get(B);et.shadowIntensity=Q.intensity,et.shadowBias=Q.bias,et.shadowNormalBias=Q.normalBias,et.shadowRadius=Q.radius,et.shadowMapSize=Q.mapSize,et.shadowCameraNear=Q.camera.near,et.shadowCameraFar=Q.camera.far,i.pointShadow[f]=et,i.pointShadowMap[f]=at,i.pointShadowMatrix[f]=B.shadow.matrix,T++}i.point[f]=X,f++}else if(B.isHemisphereLight){let X=t.get(B);X.skyColor.copy(B.color).multiplyScalar(J),X.groundColor.copy(B.groundColor).multiplyScalar(J),i.hemi[v]=X,v++}}S>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Et.LTC_FLOAT_1,i.rectAreaLTC2=Et.LTC_FLOAT_2):(i.rectAreaLTC1=Et.LTC_HALF_1,i.rectAreaLTC2=Et.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=u;let D=i.hash;(D.sunLength!==d||D.directionalLength!==m||D.pointLength!==f||D.spotLength!==_||D.rectAreaLength!==S||D.hemiLength!==v||D.numSunShadows!==g||D.numDirectionalShadows!==E||D.numPointShadows!==T||D.numSpotShadows!==R||D.numSpotMaps!==x||D.numLightProbes!==C)&&(i.sun.length=d,i.directional.length=m,i.spot.length=_,i.rectArea.length=S,i.point.length=f,i.hemi.length=v,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=R,i.spotShadowMap.length=R,i.spotLightMatrix.length=R+x-w,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,D.sunLength=d,D.directionalLength=m,D.pointLength=f,D.spotLength=_,D.rectAreaLength=S,D.hemiLength=v,D.numSunShadows=g,D.numDirectionalShadows=E,D.numPointShadows=T,D.numSpotShadows=R,D.numSpotMaps=x,D.numLightProbes=C,i.version=mU++)}function l(c,h){let p=0,u=0,d=0,g=0,M=0,m=0,f=h.matrixWorldInverse;for(let _=0,S=c.length;_<S;_++){let v=c[_];if(v.isSunLight){let E=i.sun[p];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(f),p++}else if(v.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),u++}else if(v.isSpotLight){let E=i.spot[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(f),g++}else if(v.isRectAreaLight){let E=i.rectArea[M];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(f),r.identity(),a.copy(v.matrixWorld),a.premultiply(f),r.extractRotation(a),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),M++}else if(v.isPointLight){let E=i.point[d];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(f),d++}else if(v.isHemisphereLight){let E=i.hemi[m];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function wE(e){let t=new _U(e),n=[],i=[],s=[];function a(u){p.camera=u,n.length=0,i.length=0,s.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(n)}function h(u){t.setupView(n,u)}let p={lightsArray:n,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:p,setupLights:c,setupLightsView:h,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function vU(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new wE(e),t.set(s,[o])):a>=r.length?(o=new wE(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var yU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,SU=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],MU=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],CE=new Ne,Tu=new L,tv=new L;function bU(e,t,n){let i=new hl,s=new gt,a=new gt,r=new Ve,o=new hd,l=new fd,c={},h=n.maxTextureSize,p={[Xa]:Gn,[Gn]:Xa,[vi]:vi},u=new gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:yU,fragmentShader:xU}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new Vn;g.setAttribute("position",new Dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new Je(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pu;let f=this.type;this.render=function(T,R,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===v1&&(Xt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=pu);let w=e.getRenderTarget(),C=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),H=e.state;H.setBlending(xs),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let G=f!==this.type;G&&R.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(F=>F.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,F=T.length;B<F;B++){let J=T[B],q=J.shadow;if(q===void 0){Xt("WebGLShadowMap:",J,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let at=q.getFrameExtents();s.multiply(at),a.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/at.x),s.x=a.x*at.x,q.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/at.y),s.y=a.y*at.y,q.mapSize.y=a.y));let X=e.state.buffers.depth.getReversed();if(q.camera._reversedDepth=X,q.map===null||G===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Sl){if(J.isPointLight){Xt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new jn(s.x,s.y,{format:Ya,type:Ki,minFilter:ln,magFilter:ln,generateMipmaps:!1}),q.map.texture.name=J.name+".shadowMap",q.map.depthTexture=new za(s.x,s.y,Ji),q.map.depthTexture.name=J.name+".shadowMapDepth",q.map.depthTexture.format=vs,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=gn,q.map.depthTexture.magFilter=gn}else J.isPointLight?(q.map=new vp(s.x),q.map.depthTexture=new sd(s.x,Zi)):(q.map=new jn(s.x,s.y),q.map.depthTexture=new za(s.x,s.y,Zi)),q.map.depthTexture.name=J.name+".shadowMap",q.map.depthTexture.format=vs,this.type===pu?(q.map.depthTexture.compareFunction=X?mp:pp,q.map.depthTexture.minFilter=ln,q.map.depthTexture.magFilter=ln):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=gn,q.map.depthTexture.magFilter=gn);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let Q=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();J.isPointLight!==!0&&q.updateMatrices(J,x);for(let et=0;et<Q;et++){let Ut=q.getCamera(et);if(J.isPointLight){let Ct=q.camera,re=q.matrix,Qt=J.distance||Ct.far;Qt!==Ct.far&&(Ct.far=Qt,Ct.updateProjectionMatrix()),Tu.setFromMatrixPosition(J.matrixWorld),Ct.position.copy(Tu),tv.copy(Ct.position),tv.add(SU[et]),Ct.up.copy(MU[et]),Ct.lookAt(tv),Ct.updateMatrixWorld(),re.makeTranslation(-Tu.x,-Tu.y,-Tu.z),CE.multiplyMatrices(Ct.projectionMatrix,Ct.matrixWorldInverse),q._frustum.setFromProjectionMatrix(CE,Ct.coordinateSystem,Ct.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)e.setRenderTarget(q.map,et),e.clear();else{et===0&&(e.setRenderTarget(q.map),e.clear());let Ct=q.getViewport(et);r.set(a.x*Ct.x,a.y*Ct.y,a.x*Ct.z,a.y*Ct.w),H.viewport(r)}i=q.getFrustum(et),v(R,x,Ut,J,this.type)}q.isPointLightShadow!==!0&&this.type===Sl&&_(q,x),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(w,C,D)};function _(T,R){let x=t.update(M);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new jn(s.x,s.y,{format:Ya,type:Ki}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(R,null,x,u,M,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(R,null,x,d,M,null)}function S(T,R,x,w){let C=null,D=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)C=D;else if(C=x.isPointLight===!0?l:o,e.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let H=C.uuid,G=R.uuid,B=c[H];B===void 0&&(B={},c[H]=B);let F=B[G];F===void 0&&(F=C.clone(),B[G]=F,R.addEventListener("dispose",E)),C=F}if(C.visible=R.visible,C.wireframe=R.wireframe,w===Sl?C.side=R.shadowSide!==null?R.shadowSide:R.side:C.side=R.shadowSide!==null?R.shadowSide:p[R.side],C.alphaMap=R.alphaMap,C.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,C.map=R.map,C.clipShadows=R.clipShadows,C.clippingPlanes=R.clippingPlanes,C.clipIntersection=R.clipIntersection,C.displacementMap=R.displacementMap,C.displacementScale=R.displacementScale,C.displacementBias=R.displacementBias,C.wireframeLinewidth=R.wireframeLinewidth,C.linewidth=R.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let H=e.properties.get(C);H.light=x}return C}function v(T,R,x,w,C){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===Sl)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);let G=t.update(T),B=T.material;if(Array.isArray(B)){let F=G.groups;for(let J=0,q=F.length;J<q;J++){let at=F[J],X=B[at.materialIndex];if(X&&X.visible){let Q=S(T,X,w,C);T.onBeforeShadow(e,T,R,x,G,Q,at),e.renderBufferDirect(x,null,G,Q,T,at),T.onAfterShadow(e,T,R,x,G,Q,at)}}}else if(B.visible){let F=S(T,B,w,C);T.onBeforeShadow(e,T,R,x,G,F,null),e.renderBufferDirect(x,null,G,F,T,null),T.onAfterShadow(e,T,R,x,G,F,null)}}let H=T.children;for(let G=0,B=H.length;G<B;G++)v(H[G],R,x,w,C)}function E(T){T.target.removeEventListener("dispose",E);for(let x in c){let w=c[x],C=T.target.uuid;C in w&&(w[C].dispose(),delete w[C])}}}function EU(e,t){function n(){let O=!1,vt=new Ve,K=null,yt=new Ve(0,0,0,0);return{setMask:function(Tt){K!==Tt&&!O&&(e.colorMask(Tt,Tt,Tt,Tt),K=Tt)},setLocked:function(Tt){O=Tt},setClear:function(Tt,st,Ot,Nt,ve){ve===!0&&(Tt*=Nt,st*=Nt,Ot*=Nt),vt.set(Tt,st,Ot,Nt),yt.equals(vt)===!1&&(e.clearColor(Tt,st,Ot,Nt),yt.copy(vt))},reset:function(){O=!1,K=null,yt.set(-1,0,0,0)}}}function i(){let O=!1,vt=!1,K=null,yt=null,Tt=null;return{setReversed:function(st){if(vt!==st){let Ot=t.get("EXT_clip_control");st?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),vt=st;let Nt=Tt;Tt=null,this.setClear(Nt)}},getReversed:function(){return vt},setTest:function(st){st?j(e.DEPTH_TEST):bt(e.DEPTH_TEST)},setMask:function(st){K!==st&&!O&&(e.depthMask(st),K=st)},setFunc:function(st){if(vt&&(st=$1[st]),yt!==st){switch(st){case Wf:e.depthFunc(e.NEVER);break;case qf:e.depthFunc(e.ALWAYS);break;case Yf:e.depthFunc(e.LESS);break;case nl:e.depthFunc(e.LEQUAL);break;case Zf:e.depthFunc(e.EQUAL);break;case Jf:e.depthFunc(e.GEQUAL);break;case Kf:e.depthFunc(e.GREATER);break;case Qf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}yt=st}},setLocked:function(st){O=st},setClear:function(st){Tt!==st&&(Tt=st,vt&&(st=1-st),e.clearDepth(st))},reset:function(){O=!1,K=null,yt=null,Tt=null,vt=!1}}}function s(){let O=!1,vt=null,K=null,yt=null,Tt=null,st=null,Ot=null,Nt=null,ve=null;return{setTest:function(pe){O||(pe?j(e.STENCIL_TEST):bt(e.STENCIL_TEST))},setMask:function(pe){vt!==pe&&!O&&(e.stencilMask(pe),vt=pe)},setFunc:function(pe,nn,yi){(K!==pe||yt!==nn||Tt!==yi)&&(e.stencilFunc(pe,nn,yi),K=pe,yt=nn,Tt=yi)},setOp:function(pe,nn,yi){(st!==pe||Ot!==nn||Nt!==yi)&&(e.stencilOp(pe,nn,yi),st=pe,Ot=nn,Nt=yi)},setLocked:function(pe){O=pe},setClear:function(pe){ve!==pe&&(e.clearStencil(pe),ve=pe)},reset:function(){O=!1,vt=null,K=null,yt=null,Tt=null,st=null,Ot=null,Nt=null,ve=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},p={},u={},d=new WeakMap,g=[],M=null,m=!1,f=null,_=null,S=null,v=null,E=null,T=null,R=null,x=new jt(0,0,0),w=0,C=!1,D=null,H=null,G=null,B=null,F=null,J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,at=0,X=e.getParameter(e.VERSION);X.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(X)[1]),q=at>=1):X.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),q=at>=2);let Q=null,et={},Ut=e.getParameter(e.SCISSOR_BOX),Ct=e.getParameter(e.VIEWPORT),re=new Ve().fromArray(Ut),Qt=new Ve().fromArray(Ct);function ie(O,vt,K,yt){let Tt=new Uint8Array(4),st=e.createTexture();e.bindTexture(O,st),e.texParameteri(O,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(O,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ot=0;Ot<K;Ot++)O===e.TEXTURE_3D||O===e.TEXTURE_2D_ARRAY?e.texImage3D(vt,0,e.RGBA,1,1,yt,0,e.RGBA,e.UNSIGNED_BYTE,Tt):e.texImage2D(vt+Ot,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Tt);return st}let Z={};Z[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),Z[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Z[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),j(e.DEPTH_TEST),r.setFunc(nl),ut(!1),pt(g_),j(e.CULL_FACE),rt(xs);function j(O){h[O]!==!0&&(e.enable(O),h[O]=!0)}function bt(O){h[O]!==!1&&(e.disable(O),h[O]=!1)}function Ft(O,vt){return u[O]!==vt?(e.bindFramebuffer(O,vt),u[O]=vt,O===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=vt),O===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=vt),!0):!1}function At(O,vt){let K=g,yt=!1;if(O){K=d.get(vt),K===void 0&&(K=[],d.set(vt,K));let Tt=O.textures;if(K.length!==Tt.length||K[0]!==e.COLOR_ATTACHMENT0){for(let st=0,Ot=Tt.length;st<Ot;st++)K[st]=e.COLOR_ATTACHMENT0+st;K.length=Tt.length,yt=!0}}else K[0]!==e.BACK&&(K[0]=e.BACK,yt=!0);yt&&e.drawBuffers(K)}function Bt(O){return M!==O?(e.useProgram(O),M=O,!0):!1}let oe={[Lr]:e.FUNC_ADD,[x1]:e.FUNC_SUBTRACT,[S1]:e.FUNC_REVERSE_SUBTRACT};oe[M1]=e.MIN,oe[b1]=e.MAX;let nt={[E1]:e.ZERO,[T1]:e.ONE,[A1]:e.SRC_COLOR,[x_]:e.SRC_ALPHA,[U1]:e.SRC_ALPHA_SATURATE,[N1]:e.DST_COLOR,[C1]:e.DST_ALPHA,[w1]:e.ONE_MINUS_SRC_COLOR,[S_]:e.ONE_MINUS_SRC_ALPHA,[D1]:e.ONE_MINUS_DST_COLOR,[R1]:e.ONE_MINUS_DST_ALPHA,[L1]:e.CONSTANT_COLOR,[I1]:e.ONE_MINUS_CONSTANT_COLOR,[O1]:e.CONSTANT_ALPHA,[P1]:e.ONE_MINUS_CONSTANT_ALPHA};function rt(O,vt,K,yt,Tt,st,Ot,Nt,ve,pe){if(O===xs){m===!0&&(bt(e.BLEND),m=!1);return}if(m===!1&&(j(e.BLEND),m=!0),O!==y1){if(O!==f||pe!==C){if((_!==Lr||E!==Lr)&&(e.blendEquation(e.FUNC_ADD),_=Lr,E=Lr),pe)switch(O){case Ml:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case __:e.blendFunc(e.ONE,e.ONE);break;case v_:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case y_:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:kt("WebGLState: Invalid blending: ",O);break}else switch(O){case Ml:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case __:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case v_:kt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case y_:kt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:kt("WebGLState: Invalid blending: ",O);break}S=null,v=null,T=null,R=null,x.set(0,0,0),w=0,f=O,C=pe}return}Tt=Tt||vt,st=st||K,Ot=Ot||yt,(vt!==_||Tt!==E)&&(e.blendEquationSeparate(oe[vt],oe[Tt]),_=vt,E=Tt),(K!==S||yt!==v||st!==T||Ot!==R)&&(e.blendFuncSeparate(nt[K],nt[yt],nt[st],nt[Ot]),S=K,v=yt,T=st,R=Ot),(Nt.equals(x)===!1||ve!==w)&&(e.blendColor(Nt.r,Nt.g,Nt.b,ve),x.copy(Nt),w=ve),f=O,C=!1}function ct(O,vt){O.side===vi?bt(e.CULL_FACE):j(e.CULL_FACE);let K=O.side===Gn;vt&&(K=!K),ut(K),O.blending===Ml&&O.transparent===!1?rt(xs):rt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),a.setMask(O.colorWrite);let yt=O.stencilWrite;o.setTest(yt),yt&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),It(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?j(e.SAMPLE_ALPHA_TO_COVERAGE):bt(e.SAMPLE_ALPHA_TO_COVERAGE)}function ut(O){D!==O&&(O?e.frontFace(e.CW):e.frontFace(e.CCW),D=O)}function pt(O){O!==g1?(j(e.CULL_FACE),O!==H&&(O===g_?e.cullFace(e.BACK):O===_1?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):bt(e.CULL_FACE),H=O}function zt(O){O!==G&&(q&&e.lineWidth(O),G=O)}function It(O,vt,K){O?(j(e.POLYGON_OFFSET_FILL),(B!==vt||F!==K)&&(B=vt,F=K,r.getReversed()&&(vt=-vt),e.polygonOffset(vt,K))):bt(e.POLYGON_OFFSET_FILL)}function Gt(O){O?j(e.SCISSOR_TEST):bt(e.SCISSOR_TEST)}function Wt(O){O===void 0&&(O=e.TEXTURE0+J-1),Q!==O&&(e.activeTexture(O),Q=O)}function U(O,vt,K){K===void 0&&(Q===null?K=e.TEXTURE0+J-1:K=Q);let yt=et[K];yt===void 0&&(yt={type:void 0,texture:void 0},et[K]=yt),(yt.type!==O||yt.texture!==vt)&&(Q!==K&&(e.activeTexture(K),Q=K),e.bindTexture(O,vt||Z[O]),yt.type=O,yt.texture=vt)}function de(){let O=et[Q];O!==void 0&&O.type!==void 0&&(e.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ft(){try{e.compressedTexImage2D(...arguments)}catch(O){kt("WebGLState:",O)}}function A(){try{e.compressedTexImage3D(...arguments)}catch(O){kt("WebGLState:",O)}}function y(){try{e.texSubImage2D(...arguments)}catch(O){kt("WebGLState:",O)}}function z(){try{e.texSubImage3D(...arguments)}catch(O){kt("WebGLState:",O)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(O){kt("WebGLState:",O)}}function W(){try{e.compressedTexSubImage3D(...arguments)}catch(O){kt("WebGLState:",O)}}function ot(){try{e.texStorage2D(...arguments)}catch(O){kt("WebGLState:",O)}}function dt(){try{e.texStorage3D(...arguments)}catch(O){kt("WebGLState:",O)}}function Y(){try{e.texImage2D(...arguments)}catch(O){kt("WebGLState:",O)}}function $(){try{e.texImage3D(...arguments)}catch(O){kt("WebGLState:",O)}}function mt(O){return p[O]!==void 0?p[O]:e.getParameter(O)}function Lt(O,vt){p[O]!==vt&&(e.pixelStorei(O,vt),p[O]=vt)}function St(O){re.equals(O)===!1&&(e.scissor(O.x,O.y,O.z,O.w),re.copy(O))}function _t(O){Qt.equals(O)===!1&&(e.viewport(O.x,O.y,O.z,O.w),Qt.copy(O))}function Dt(O,vt){let K=c.get(vt);K===void 0&&(K=new WeakMap,c.set(vt,K));let yt=K.get(O);yt===void 0&&(yt=e.getUniformBlockIndex(vt,O.name),K.set(O,yt))}function Ht(O,vt){let yt=c.get(vt).get(O);l.get(vt)!==yt&&(e.uniformBlockBinding(vt,yt,O.__bindingPointIndex),l.set(vt,yt))}function Zt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),h={},p={},Q=null,et={},u={},d=new WeakMap,g=[],M=null,m=!1,f=null,_=null,S=null,v=null,E=null,T=null,R=null,x=new jt(0,0,0),w=0,C=!1,D=null,H=null,G=null,B=null,F=null,re.set(0,0,e.canvas.width,e.canvas.height),Qt.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:j,disable:bt,bindFramebuffer:Ft,drawBuffers:At,useProgram:Bt,setBlending:rt,setMaterial:ct,setFlipSided:ut,setCullFace:pt,setLineWidth:zt,setPolygonOffset:It,setScissorTest:Gt,activeTexture:Wt,bindTexture:U,unbindTexture:de,compressedTexImage2D:ft,compressedTexImage3D:A,texImage2D:Y,texImage3D:$,pixelStorei:Lt,getParameter:mt,updateUBOMapping:Dt,uniformBlockBinding:Ht,texStorage2D:ot,texStorage3D:dt,texSubImage2D:y,texSubImage3D:z,compressedTexSubImage2D:V,compressedTexSubImage3D:W,scissor:St,viewport:_t,reset:Zt}}function TU(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,h=new WeakMap,p=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(A,y){return g?new OffscreenCanvas(A,y):Kc("canvas")}function m(A,y,z){let V=1,W=ft(A);if((W.width>z||W.height>z)&&(V=z/Math.max(W.width,W.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let ot=Math.floor(V*W.width),dt=Math.floor(V*W.height);u===void 0&&(u=M(ot,dt));let Y=y?M(ot,dt):u;return Y.width=ot,Y.height=dt,Y.getContext("2d").drawImage(A,0,0,ot,dt),Xt("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+ot+"x"+dt+")."),Y}else return"data"in A&&Xt("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),A;return A}function f(A){return A.generateMipmaps}function _(A){e.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function v(A,y,z,V,W,ot=!1){if(A!==null){if(e[A]!==void 0)return e[A];Xt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let dt;V&&(dt=t.get("EXT_texture_norm16"),dt||Xt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=y;if(y===e.RED&&(z===e.FLOAT&&(Y=e.R32F),z===e.HALF_FLOAT&&(Y=e.R16F),z===e.UNSIGNED_BYTE&&(Y=e.R8),z===e.UNSIGNED_SHORT&&dt&&(Y=dt.R16_EXT),z===e.SHORT&&dt&&(Y=dt.R16_SNORM_EXT)),y===e.RED_INTEGER&&(z===e.UNSIGNED_BYTE&&(Y=e.R8UI),z===e.UNSIGNED_SHORT&&(Y=e.R16UI),z===e.UNSIGNED_INT&&(Y=e.R32UI),z===e.BYTE&&(Y=e.R8I),z===e.SHORT&&(Y=e.R16I),z===e.INT&&(Y=e.R32I)),y===e.RG&&(z===e.FLOAT&&(Y=e.RG32F),z===e.HALF_FLOAT&&(Y=e.RG16F),z===e.UNSIGNED_BYTE&&(Y=e.RG8),z===e.UNSIGNED_SHORT&&dt&&(Y=dt.RG16_EXT),z===e.SHORT&&dt&&(Y=dt.RG16_SNORM_EXT)),y===e.RG_INTEGER&&(z===e.UNSIGNED_BYTE&&(Y=e.RG8UI),z===e.UNSIGNED_SHORT&&(Y=e.RG16UI),z===e.UNSIGNED_INT&&(Y=e.RG32UI),z===e.BYTE&&(Y=e.RG8I),z===e.SHORT&&(Y=e.RG16I),z===e.INT&&(Y=e.RG32I)),y===e.RGB_INTEGER&&(z===e.UNSIGNED_BYTE&&(Y=e.RGB8UI),z===e.UNSIGNED_SHORT&&(Y=e.RGB16UI),z===e.UNSIGNED_INT&&(Y=e.RGB32UI),z===e.BYTE&&(Y=e.RGB8I),z===e.SHORT&&(Y=e.RGB16I),z===e.INT&&(Y=e.RGB32I)),y===e.RGBA_INTEGER&&(z===e.UNSIGNED_BYTE&&(Y=e.RGBA8UI),z===e.UNSIGNED_SHORT&&(Y=e.RGBA16UI),z===e.UNSIGNED_INT&&(Y=e.RGBA32UI),z===e.BYTE&&(Y=e.RGBA8I),z===e.SHORT&&(Y=e.RGBA16I),z===e.INT&&(Y=e.RGBA32I)),y===e.RGB&&(z===e.UNSIGNED_SHORT&&dt&&(Y=dt.RGB16_EXT),z===e.SHORT&&dt&&(Y=dt.RGB16_SNORM_EXT),z===e.UNSIGNED_INT_5_9_9_9_REV&&(Y=e.RGB9_E5),z===e.UNSIGNED_INT_10F_11F_11F_REV&&(Y=e.R11F_G11F_B10F)),y===e.RGBA){let $=ot?Jc:ce.getTransfer(W);z===e.FLOAT&&(Y=e.RGBA32F),z===e.HALF_FLOAT&&(Y=e.RGBA16F),z===e.UNSIGNED_BYTE&&(Y=$===Se?e.SRGB8_ALPHA8:e.RGBA8),z===e.UNSIGNED_SHORT&&dt&&(Y=dt.RGBA16_EXT),z===e.SHORT&&dt&&(Y=dt.RGBA16_SNORM_EXT),z===e.UNSIGNED_SHORT_4_4_4_4&&(Y=e.RGBA4),z===e.UNSIGNED_SHORT_5_5_5_1&&(Y=e.RGB5_A1)}return(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function E(A,y){let z;return A?y===null||y===Zi||y===El?z=e.DEPTH24_STENCIL8:y===Ji?z=e.DEPTH32F_STENCIL8:y===bl&&(z=e.DEPTH24_STENCIL8,Xt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Zi||y===El?z=e.DEPTH_COMPONENT24:y===Ji?z=e.DEPTH_COMPONENT32F:y===bl&&(z=e.DEPTH_COMPONENT16),z}function T(A,y){return f(A)===!0||A.isFramebufferTexture&&A.minFilter!==gn&&A.minFilter!==ln?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function R(A){let y=A.target;y.removeEventListener("dispose",R),w(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&p.delete(y)}function x(A){let y=A.target;y.removeEventListener("dispose",x),D(y)}function w(A){let y=i.get(A);if(y.__webglInit===void 0)return;let z=A.source,V=d.get(z);if(V){let W=V[y.__cacheKey];W.usedTimes--,W.usedTimes===0&&C(A),Object.keys(V).length===0&&d.delete(z)}i.remove(A)}function C(A){let y=i.get(A);e.deleteTexture(y.__webglTexture);let z=A.source,V=d.get(z);delete V[y.__cacheKey],r.memory.textures--}function D(A){let y=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(y.__webglFramebuffer[V]))for(let W=0;W<y.__webglFramebuffer[V].length;W++)e.deleteFramebuffer(y.__webglFramebuffer[V][W]);else e.deleteFramebuffer(y.__webglFramebuffer[V]);y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer[V])}else{if(Array.isArray(y.__webglFramebuffer))for(let V=0;V<y.__webglFramebuffer.length;V++)e.deleteFramebuffer(y.__webglFramebuffer[V]);else e.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&e.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let V=0;V<y.__webglColorRenderbuffer.length;V++)y.__webglColorRenderbuffer[V]&&e.deleteRenderbuffer(y.__webglColorRenderbuffer[V]);y.__webglDepthRenderbuffer&&e.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let z=A.textures;for(let V=0,W=z.length;V<W;V++){let ot=i.get(z[V]);ot.__webglTexture&&(e.deleteTexture(ot.__webglTexture),r.memory.textures--),i.remove(z[V])}i.remove(A)}let H=0;function G(){H=0}function B(){return H}function F(A){H=A}function J(){let A=H;return A>=s.maxTextures&&Xt("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),H+=1,A}function q(A){let y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function at(A,y){let z=i.get(A);if(A.isVideoTexture&&U(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){let V=A.image;if(V===null)Xt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Xt("WebGLRenderer: Texture marked for update but image is incomplete");else{bt(z,A,y);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,z.__webglTexture,e.TEXTURE0+y)}function X(A,y){let z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){bt(z,A,y);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,z.__webglTexture,e.TEXTURE0+y)}function Q(A,y){let z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){bt(z,A,y);return}n.bindTexture(e.TEXTURE_3D,z.__webglTexture,e.TEXTURE0+y)}function et(A,y){let z=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&z.__version!==A.version){Ft(z,A,y);return}n.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture,e.TEXTURE0+y)}let Ut={[_s]:e.REPEAT,[Ii]:e.CLAMP_TO_EDGE,[jf]:e.MIRRORED_REPEAT},Ct={[gn]:e.NEAREST,[F1]:e.NEAREST_MIPMAP_NEAREST,[_u]:e.NEAREST_MIPMAP_LINEAR,[ln]:e.LINEAR,[Nd]:e.LINEAR_MIPMAP_NEAREST,[Ss]:e.LINEAR_MIPMAP_LINEAR},re={[k1]:e.NEVER,[Z1]:e.ALWAYS,[X1]:e.LESS,[pp]:e.LEQUAL,[W1]:e.EQUAL,[mp]:e.GEQUAL,[q1]:e.GREATER,[Y1]:e.NOTEQUAL};function Qt(A,y){if(y.type===Ji&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===ln||y.magFilter===Nd||y.magFilter===_u||y.magFilter===Ss||y.minFilter===ln||y.minFilter===Nd||y.minFilter===_u||y.minFilter===Ss)&&Xt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,Ut[y.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,Ut[y.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,Ut[y.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,Ct[y.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,Ct[y.minFilter]),y.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,re[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===gn||y.minFilter!==_u&&y.minFilter!==Ss||y.type===Ji&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ie(A,y){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",R));let V=y.source,W=d.get(V);W===void 0&&(W={},d.set(V,W));let ot=q(y);if(ot!==A.__cacheKey){W[ot]===void 0&&(W[ot]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,z=!0),W[ot].usedTimes++;let dt=W[A.__cacheKey];dt!==void 0&&(W[A.__cacheKey].usedTimes--,dt.usedTimes===0&&C(y)),A.__cacheKey=ot,A.__webglTexture=W[ot].texture}return z}function Z(A,y,z){return Math.floor(Math.floor(A/z)/y)}function j(A,y,z,V){let ot=A.updateRanges;if(ot.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,y.width,y.height,z,V,y.data);else{ot.sort((Lt,St)=>Lt.start-St.start);let dt=0;for(let Lt=1;Lt<ot.length;Lt++){let St=ot[dt],_t=ot[Lt],Dt=St.start+St.count,Ht=Z(_t.start,y.width,4),Zt=Z(St.start,y.width,4);_t.start<=Dt+1&&Ht===Zt&&Z(_t.start+_t.count-1,y.width,4)===Ht?St.count=Math.max(St.count,_t.start+_t.count-St.start):(++dt,ot[dt]=_t)}ot.length=dt+1;let Y=n.getParameter(e.UNPACK_ROW_LENGTH),$=n.getParameter(e.UNPACK_SKIP_PIXELS),mt=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,y.width);for(let Lt=0,St=ot.length;Lt<St;Lt++){let _t=ot[Lt],Dt=Math.floor(_t.start/4),Ht=Math.ceil(_t.count/4),Zt=Dt%y.width,O=Math.floor(Dt/y.width),vt=Ht,K=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,Zt),n.pixelStorei(e.UNPACK_SKIP_ROWS,O),n.texSubImage2D(e.TEXTURE_2D,0,Zt,O,vt,K,z,V,y.data)}A.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,Y),n.pixelStorei(e.UNPACK_SKIP_PIXELS,$),n.pixelStorei(e.UNPACK_SKIP_ROWS,mt)}}function bt(A,y,z){let V=e.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(V=e.TEXTURE_2D_ARRAY),y.isData3DTexture&&(V=e.TEXTURE_3D);let W=ie(A,y),ot=y.source;n.bindTexture(V,A.__webglTexture,e.TEXTURE0+z);let dt=i.get(ot);if(ot.version!==dt.__version||W===!0){if(n.activeTexture(e.TEXTURE0+z),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let K=ce.getPrimaries(ce.workingColorSpace),yt=y.colorSpace===Ys?null:ce.getPrimaries(y.colorSpace),Tt=y.colorSpace===Ys||K===yt?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt)}n.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment);let $=m(y.image,!1,s.maxTextureSize);$=de(y,$);let mt=a.convert(y.format,y.colorSpace),Lt=a.convert(y.type),St=v(y.internalFormat,mt,Lt,y.normalized,y.colorSpace,y.isVideoTexture);Qt(V,y);let _t,Dt=y.mipmaps,Ht=y.isVideoTexture!==!0,Zt=dt.__version===void 0||W===!0,O=ot.dataReady,vt=T(y,$);if(y.isDepthTexture)St=E(y.format===qa,y.type),Zt&&(Ht?n.texStorage2D(e.TEXTURE_2D,1,St,$.width,$.height):n.texImage2D(e.TEXTURE_2D,0,St,$.width,$.height,0,mt,Lt,null));else if(y.isDataTexture)if(Dt.length>0){Ht&&Zt&&n.texStorage2D(e.TEXTURE_2D,vt,St,Dt[0].width,Dt[0].height);for(let K=0,yt=Dt.length;K<yt;K++)_t=Dt[K],Ht?O&&n.texSubImage2D(e.TEXTURE_2D,K,0,0,_t.width,_t.height,mt,Lt,_t.data):n.texImage2D(e.TEXTURE_2D,K,St,_t.width,_t.height,0,mt,Lt,_t.data);y.generateMipmaps=!1}else Ht?(Zt&&n.texStorage2D(e.TEXTURE_2D,vt,St,$.width,$.height),O&&j(y,$,mt,Lt)):n.texImage2D(e.TEXTURE_2D,0,St,$.width,$.height,0,mt,Lt,$.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ht&&Zt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,vt,St,Dt[0].width,Dt[0].height,$.depth);for(let K=0,yt=Dt.length;K<yt;K++)if(_t=Dt[K],y.format!==Oi)if(mt!==null)if(Ht){if(O)if(y.layerUpdates.size>0){let Tt=k_(_t.width,_t.height,y.format,y.type);for(let st of y.layerUpdates){let Ot=_t.data.subarray(st*Tt/_t.data.BYTES_PER_ELEMENT,(st+1)*Tt/_t.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,st,_t.width,_t.height,1,mt,Ot)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,_t.width,_t.height,$.depth,mt,_t.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,K,St,_t.width,_t.height,$.depth,0,_t.data,0,0);else Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?O&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,_t.width,_t.height,$.depth,mt,Lt,_t.data):n.texImage3D(e.TEXTURE_2D_ARRAY,K,St,_t.width,_t.height,$.depth,0,mt,Lt,_t.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Ht&&Zt&&n.texStorage2D(e.TEXTURE_2D,vt,St,Dt[0].width,Dt[0].height);for(let K=0,yt=Dt.length;K<yt;K++)_t=Dt[K],y.format!==Oi?mt!==null?Ht?O&&n.compressedTexSubImage2D(e.TEXTURE_2D,K,0,0,_t.width,_t.height,mt,_t.data):n.compressedTexImage2D(e.TEXTURE_2D,K,St,_t.width,_t.height,0,_t.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?O&&n.texSubImage2D(e.TEXTURE_2D,K,0,0,_t.width,_t.height,mt,Lt,_t.data):n.texImage2D(e.TEXTURE_2D,K,St,_t.width,_t.height,0,mt,Lt,_t.data)}else if(y.isDataArrayTexture)if(Ht){if(Zt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,vt,St,$.width,$.height,$.depth),O)if(y.layerUpdates.size>0){let K=k_($.width,$.height,y.format,y.type);for(let yt of y.layerUpdates){let Tt=$.data.subarray(yt*K/$.data.BYTES_PER_ELEMENT,(yt+1)*K/$.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,yt,$.width,$.height,1,mt,Lt,Tt)}y.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,mt,Lt,$.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,St,$.width,$.height,$.depth,0,mt,Lt,$.data);else if(y.isData3DTexture)Ht?(Zt&&n.texStorage3D(e.TEXTURE_3D,vt,St,$.width,$.height,$.depth),O&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,mt,Lt,$.data)):n.texImage3D(e.TEXTURE_3D,0,St,$.width,$.height,$.depth,0,mt,Lt,$.data);else if(y.isFramebufferTexture){if(Zt)if(Ht)n.texStorage2D(e.TEXTURE_2D,vt,St,$.width,$.height);else{let K=$.width,yt=$.height;for(let Tt=0;Tt<vt;Tt++)n.texImage2D(e.TEXTURE_2D,Tt,St,K,yt,0,mt,Lt,null),K>>=1,yt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in e){let K=e.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),$.parentNode!==K){K.appendChild($),p.add(y),K.onpaint=yt=>{let Tt=yt.changedElements;for(let st of p)Tt.includes(st.image)&&(st.needsUpdate=!0)},K.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,$);else{let Tt=e.RGBA,st=e.RGBA,Ot=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,Tt,st,Ot,$)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Dt.length>0){if(Ht&&Zt){let K=ft(Dt[0]);n.texStorage2D(e.TEXTURE_2D,vt,St,K.width,K.height)}for(let K=0,yt=Dt.length;K<yt;K++)_t=Dt[K],Ht?O&&n.texSubImage2D(e.TEXTURE_2D,K,0,0,mt,Lt,_t):n.texImage2D(e.TEXTURE_2D,K,St,mt,Lt,_t);y.generateMipmaps=!1}else if(Ht){if(Zt){let K=ft($);n.texStorage2D(e.TEXTURE_2D,vt,St,K.width,K.height)}O&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,mt,Lt,$)}else n.texImage2D(e.TEXTURE_2D,0,St,mt,Lt,$);f(y)&&_(V),dt.__version=ot.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function Ft(A,y,z){if(y.image.length!==6)return;let V=ie(A,y),W=y.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+z);let ot=i.get(W);if(W.version!==ot.__version||V===!0){n.activeTexture(e.TEXTURE0+z);let dt=ce.getPrimaries(ce.workingColorSpace),Y=y.colorSpace===Ys?null:ce.getPrimaries(y.colorSpace),$=y.colorSpace===Ys||dt===Y?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let mt=y.isCompressedTexture||y.image[0].isCompressedTexture,Lt=y.image[0]&&y.image[0].isDataTexture,St=[];for(let st=0;st<6;st++)!mt&&!Lt?St[st]=m(y.image[st],!0,s.maxCubemapSize):St[st]=Lt?y.image[st].image:y.image[st],St[st]=de(y,St[st]);let _t=St[0],Dt=a.convert(y.format,y.colorSpace),Ht=a.convert(y.type),Zt=v(y.internalFormat,Dt,Ht,y.normalized,y.colorSpace),O=y.isVideoTexture!==!0,vt=ot.__version===void 0||V===!0,K=W.dataReady,yt=T(y,_t);Qt(e.TEXTURE_CUBE_MAP,y);let Tt;if(mt){O&&vt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,yt,Zt,_t.width,_t.height);for(let st=0;st<6;st++){Tt=St[st].mipmaps;for(let Ot=0;Ot<Tt.length;Ot++){let Nt=Tt[Ot];y.format!==Oi?Dt!==null?O?K&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,0,0,Nt.width,Nt.height,Dt,Nt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,Zt,Nt.width,Nt.height,0,Nt.data):Xt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,0,0,Nt.width,Nt.height,Dt,Ht,Nt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot,Zt,Nt.width,Nt.height,0,Dt,Ht,Nt.data)}}}else{if(Tt=y.mipmaps,O&&vt){Tt.length>0&&yt++;let st=ft(St[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,yt,Zt,st.width,st.height)}for(let st=0;st<6;st++)if(Lt){O?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,St[st].width,St[st].height,Dt,Ht,St[st].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Zt,St[st].width,St[st].height,0,Dt,Ht,St[st].data);for(let Ot=0;Ot<Tt.length;Ot++){let ve=Tt[Ot].image[st].image;O?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,0,0,ve.width,ve.height,Dt,Ht,ve.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,Zt,ve.width,ve.height,0,Dt,Ht,ve.data)}}else{O?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Dt,Ht,St[st]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Zt,Dt,Ht,St[st]);for(let Ot=0;Ot<Tt.length;Ot++){let Nt=Tt[Ot];O?K&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,0,0,Dt,Ht,Nt.image[st]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+st,Ot+1,Zt,Dt,Ht,Nt.image[st])}}}f(y)&&_(e.TEXTURE_CUBE_MAP),ot.__version=W.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function At(A,y,z,V,W,ot){let dt=a.convert(z.format,z.colorSpace),Y=a.convert(z.type),$=v(z.internalFormat,dt,Y,z.normalized,z.colorSpace),mt=i.get(y),Lt=i.get(z);if(Lt.__renderTarget=y,!mt.__hasExternalTextures){let St=Math.max(1,y.width>>ot),_t=Math.max(1,y.height>>ot);W===e.TEXTURE_3D||W===e.TEXTURE_2D_ARRAY?n.texImage3D(W,ot,$,St,_t,y.depth,0,dt,Y,null):n.texImage2D(W,ot,$,St,_t,0,dt,Y,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),Wt(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,V,W,Lt.__webglTexture,0,Gt(y)):(W===e.TEXTURE_2D||W>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,V,W,Lt.__webglTexture,ot),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Bt(A,y,z){if(e.bindRenderbuffer(e.RENDERBUFFER,A),y.depthBuffer){let V=y.depthTexture,W=V&&V.isDepthTexture?V.type:null,ot=E(y.stencilBuffer,W),dt=y.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Wt(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Gt(y),ot,y.width,y.height):z?e.renderbufferStorageMultisample(e.RENDERBUFFER,Gt(y),ot,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,ot,y.width,y.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,dt,e.RENDERBUFFER,A)}else{let V=y.textures;for(let W=0;W<V.length;W++){let ot=V[W],dt=a.convert(ot.format,ot.colorSpace),Y=a.convert(ot.type),$=v(ot.internalFormat,dt,Y,ot.normalized,ot.colorSpace);Wt(y)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Gt(y),$,y.width,y.height):z?e.renderbufferStorageMultisample(e.RENDERBUFFER,Gt(y),$,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,$,y.width,y.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function oe(A,y,z){let V=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W=i.get(y.depthTexture);if(W.__renderTarget=y,(!W.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),V){if(W.__webglInit===void 0&&(W.__webglInit=!0,y.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,W.__webglTexture),Qt(e.TEXTURE_CUBE_MAP,y.depthTexture);let mt=a.convert(y.depthTexture.format),Lt=a.convert(y.depthTexture.type),St;y.depthTexture.format===vs?St=e.DEPTH_COMPONENT24:y.depthTexture.format===qa&&(St=e.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,St,y.width,y.height,0,mt,Lt,null)}}else at(y.depthTexture,0);let ot=W.__webglTexture,dt=Gt(y),Y=V?e.TEXTURE_CUBE_MAP_POSITIVE_X+z:e.TEXTURE_2D,$=y.depthTexture.format===qa?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(y.depthTexture.format===vs)Wt(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,$,Y,ot,0,dt):e.framebufferTexture2D(e.FRAMEBUFFER,$,Y,ot,0);else if(y.depthTexture.format===qa)Wt(y)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,$,Y,ot,0,dt):e.framebufferTexture2D(e.FRAMEBUFFER,$,Y,ot,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(A){let y=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==A.depthTexture){let V=A.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),V){let W=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,V.removeEventListener("dispose",W)};V.addEventListener("dispose",W),y.__depthDisposeCallback=W}y.__boundDepthTexture=V}if(A.depthTexture&&!y.__autoAllocateDepthBuffer)if(z)for(let V=0;V<6;V++)oe(y.__webglFramebuffer[V],A,V);else{let V=A.texture.mipmaps;V&&V.length>0?oe(y.__webglFramebuffer[0],A,0):oe(y.__webglFramebuffer,A,0)}else if(z){y.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[V]),y.__webglDepthbuffer[V]===void 0)y.__webglDepthbuffer[V]=e.createRenderbuffer(),Bt(y.__webglDepthbuffer[V],A,!1);else{let W=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=y.__webglDepthbuffer[V];e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,W,e.RENDERBUFFER,ot)}}else{let V=A.texture.mipmaps;if(V&&V.length>0?n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=e.createRenderbuffer(),Bt(y.__webglDepthbuffer,A,!1);else{let W=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ot=y.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ot),e.framebufferRenderbuffer(e.FRAMEBUFFER,W,e.RENDERBUFFER,ot)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function rt(A,y,z){let V=i.get(A);y!==void 0&&At(V.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),z!==void 0&&nt(A)}function ct(A){let y=A.texture,z=i.get(A),V=i.get(y);A.addEventListener("dispose",x);let W=A.textures,ot=A.isWebGLCubeRenderTarget===!0,dt=W.length>1;if(dt||(V.__webglTexture===void 0&&(V.__webglTexture=e.createTexture()),V.__version=y.version,r.memory.textures++),ot){z.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[Y]=[];for(let $=0;$<y.mipmaps.length;$++)z.__webglFramebuffer[Y][$]=e.createFramebuffer()}else z.__webglFramebuffer[Y]=e.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let Y=0;Y<y.mipmaps.length;Y++)z.__webglFramebuffer[Y]=e.createFramebuffer()}else z.__webglFramebuffer=e.createFramebuffer();if(dt)for(let Y=0,$=W.length;Y<$;Y++){let mt=i.get(W[Y]);mt.__webglTexture===void 0&&(mt.__webglTexture=e.createTexture(),r.memory.textures++)}if(A.samples>0&&Wt(A)===!1){z.__webglMultisampledFramebuffer=e.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Y=0;Y<W.length;Y++){let $=W[Y];z.__webglColorRenderbuffer[Y]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,z.__webglColorRenderbuffer[Y]);let mt=a.convert($.format,$.colorSpace),Lt=a.convert($.type),St=v($.internalFormat,mt,Lt,$.normalized,$.colorSpace,A.isXRRenderTarget===!0),_t=Gt(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,_t,St,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Y,e.RENDERBUFFER,z.__webglColorRenderbuffer[Y])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=e.createRenderbuffer(),Bt(z.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ot){n.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture),Qt(e.TEXTURE_CUBE_MAP,y);for(let Y=0;Y<6;Y++)if(y.mipmaps&&y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)At(z.__webglFramebuffer[Y][$],A,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,$);else At(z.__webglFramebuffer[Y],A,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);f(y)&&_(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(dt){for(let Y=0,$=W.length;Y<$;Y++){let mt=W[Y],Lt=i.get(mt),St=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(St=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(St,Lt.__webglTexture),Qt(St,mt),At(z.__webglFramebuffer,A,mt,e.COLOR_ATTACHMENT0+Y,St,0),f(mt)&&_(St)}n.unbindTexture()}else{let Y=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(Y,V.__webglTexture),Qt(Y,y),y.mipmaps&&y.mipmaps.length>0)for(let $=0;$<y.mipmaps.length;$++)At(z.__webglFramebuffer[$],A,y,e.COLOR_ATTACHMENT0,Y,$);else At(z.__webglFramebuffer,A,y,e.COLOR_ATTACHMENT0,Y,0);f(y)&&_(Y),n.unbindTexture()}A.depthBuffer&&nt(A)}function ut(A){let y=A.textures;for(let z=0,V=y.length;z<V;z++){let W=y[z];if(f(W)){let ot=S(A),dt=i.get(W).__webglTexture;n.bindTexture(ot,dt),_(ot),n.unbindTexture()}}}let pt=[],zt=[];function It(A){if(A.samples>0){if(Wt(A)===!1){let y=A.textures,z=A.width,V=A.height,W=e.COLOR_BUFFER_BIT,ot=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,dt=i.get(A),Y=y.length>1;if(Y)for(let mt=0;mt<y.length;mt++)n.bindFramebuffer(e.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+mt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,dt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+mt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer);let $=A.texture.mipmaps;$&&$.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,dt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let mt=0;mt<y.length;mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(W|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(W|=e.STENCIL_BUFFER_BIT)),Y){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,dt.__webglColorRenderbuffer[mt]);let Lt=i.get(y[mt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Lt,0)}e.blitFramebuffer(0,0,z,V,0,0,z,V,W,e.NEAREST),l===!0&&(pt.length=0,zt.length=0,pt.push(e.COLOR_ATTACHMENT0+mt),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(pt.push(ot),zt.push(ot),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,zt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,pt))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Y)for(let mt=0;mt<y.length;mt++){n.bindFramebuffer(e.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+mt,e.RENDERBUFFER,dt.__webglColorRenderbuffer[mt]);let Lt=i.get(y[mt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,dt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+mt,e.TEXTURE_2D,Lt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let y=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[y])}}}function Gt(A){return Math.min(s.maxSamples,A.samples)}function Wt(A){let y=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function U(A){let y=r.render.frame;h.get(A)!==y&&(h.set(A,y),A.update())}function de(A,y){let z=A.colorSpace,V=A.format,W=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Zc&&z!==Ys&&(ce.getTransfer(z)===Se?(V!==Oi||W!==$n)&&Xt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):kt("WebGLTextures: Unsupported texture color space:",z)),y}function ft(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=G,this.getTextureUnits=B,this.setTextureUnits=F,this.setTexture2D=at,this.setTexture2DArray=X,this.setTexture3D=Q,this.setTextureCube=et,this.rebindTextures=rt,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=Wt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function AU(e,t){function n(i,s=Ys){let a,r=ce.getTransfer(s);if(i===$n)return e.UNSIGNED_BYTE;if(i===Ud)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Ld)return e.UNSIGNED_SHORT_5_5_5_1;if(i===U_)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===L_)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===N_)return e.BYTE;if(i===D_)return e.SHORT;if(i===bl)return e.UNSIGNED_SHORT;if(i===Dd)return e.INT;if(i===Zi)return e.UNSIGNED_INT;if(i===Ji)return e.FLOAT;if(i===Ki)return e.HALF_FLOAT;if(i===I_)return e.ALPHA;if(i===O_)return e.RGB;if(i===Oi)return e.RGBA;if(i===vs)return e.DEPTH_COMPONENT;if(i===qa)return e.DEPTH_STENCIL;if(i===P_)return e.RED;if(i===Id)return e.RED_INTEGER;if(i===Ya)return e.RG;if(i===Od)return e.RG_INTEGER;if(i===Pd)return e.RGBA_INTEGER;if(i===vu||i===yu||i===xu||i===Su)if(r===Se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===vu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===yu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Su)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===vu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===yu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Su)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bd||i===zd||i===Fd||i===Hd)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Bd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Fd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Hd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vd||i===Gd||i===kd||i===Xd||i===Wd||i===Mu||i===qd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Vd||i===Gd)return r===Se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===kd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Xd)return a.COMPRESSED_R11_EAC;if(i===Wd)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Mu)return a.COMPRESSED_RG11_EAC;if(i===qd)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Yd||i===Zd||i===Jd||i===Kd||i===Qd||i===jd||i===$d||i===tp||i===ep||i===np||i===ip||i===sp||i===ap||i===rp)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Yd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Jd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Kd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===jd)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===$d)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tp)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ep)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===np)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ip)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sp)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ap)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===rp)return r===Se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===op||i===lp||i===cp)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===op)return r===Se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===lp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cp)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===up||i===hp||i===bu||i===fp)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===up)return a.COMPRESSED_RED_RGTC1_EXT;if(i===hp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===bu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===fp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===El?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var wU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,lv=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new nu(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new gi({vertexShader:wU,fragmentShader:CU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Je(new Ur(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cv=class extends ys{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,d=null,g=null,M=typeof XRWebGLBinding<"u",m=new lv,f={},_=n.getContextAttributes(),S=null,v=null,E=[],T=[],R=new gt,x=null,w=null,C=new Nn;C.viewport=new Ve;let D=new Nn;D.viewport=new Ve;let H=[C,D],G=new Ad,B=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let j=E[Z];return j===void 0&&(j=new ol,E[Z]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Z){let j=E[Z];return j===void 0&&(j=new ol,E[Z]=j),j.getGripSpace()},this.getHand=function(Z){let j=E[Z];return j===void 0&&(j=new ol,E[Z]=j),j.getHandSpace()};function J(Z){let j=T.indexOf(Z.inputSource);if(j===-1)return;let bt=E[j];bt!==void 0&&(bt.update(Z.inputSource,Z.frame,c||r),bt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function q(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",at);for(let Z=0;Z<E.length;Z++){let j=T[Z];j!==null&&(T[Z]=null,E[Z].disconnect(j))}B=null,F=null,m.reset();for(let Z in f)delete f[Z];if(t.setRenderTarget(S),d=null,u=null,p=null,s=null,v=null,ie.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(R.width,R.height,!1),w!==null){let Z=w.camera;Z.fov=w.fov,Z.zoom=w.zoom,Z.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&Xt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&Xt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return p===null&&M&&(p=new XRWebGLBinding(s,n)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",q),s.addEventListener("inputsourceschange",at),_.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(R),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Ft=null,At=null;_.depth&&(At=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,bt=_.stencil?qa:vs,Ft=_.stencil?El:Zi);let Bt={colorFormat:n.RGBA8,depthFormat:At,scaleFactor:a};p=this.getBinding(),u=p.createProjectionLayer(Bt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new jn(u.textureWidth,u.textureHeight,{format:Oi,type:$n,depthTexture:new za(u.textureWidth,u.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let bt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(s,n,bt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new jn(d.framebufferWidth,d.framebufferHeight,{format:Oi,type:$n,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),ie.setContext(s),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function at(Z){for(let j=0;j<Z.removed.length;j++){let bt=Z.removed[j],Ft=T.indexOf(bt);Ft>=0&&(T[Ft]=null,E[Ft].disconnect(bt))}for(let j=0;j<Z.added.length;j++){let bt=Z.added[j],Ft=T.indexOf(bt);if(Ft===-1){for(let Bt=0;Bt<E.length;Bt++)if(Bt>=T.length){T.push(bt),Ft=Bt;break}else if(T[Bt]===null){T[Bt]=bt,Ft=Bt;break}if(Ft===-1)break}let At=E[Ft];At&&At.connect(bt)}}let X=new L,Q=new L;function et(Z,j,bt){X.setFromMatrixPosition(j.matrixWorld),Q.setFromMatrixPosition(bt.matrixWorld);let Ft=X.distanceTo(Q),At=j.projectionMatrix.elements,Bt=bt.projectionMatrix.elements,oe=At[14]/(At[10]-1),nt=At[14]/(At[10]+1),rt=(At[9]+1)/At[5],ct=(At[9]-1)/At[5],ut=(At[8]-1)/At[0],pt=(Bt[8]+1)/Bt[0],zt=oe*ut,It=oe*pt,Gt=Ft/(-ut+pt),Wt=Gt*-ut;if(j.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Wt),Z.translateZ(Gt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),At[10]===-1)Z.projectionMatrix.copy(j.projectionMatrix),Z.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let U=oe+Gt,de=nt+Gt,ft=zt-Wt,A=It+(Ft-Wt),y=rt*nt/de*U,z=ct*nt/de*U;Z.projectionMatrix.makePerspective(ft,A,y,z,U,de),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ut(Z,j){j===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(j.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let j=Z.near,bt=Z.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(bt=m.depthFar)),G.near=D.near=C.near=j,G.far=D.far=C.far=bt,(B!==G.near||F!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),B=G.near,F=G.far),G.layers.mask=Z.layers.mask|6,C.layers.mask=G.layers.mask&-5,D.layers.mask=G.layers.mask&-3;let Ft=Z.parent,At=G.cameras;Ut(G,Ft);for(let Bt=0;Bt<At.length;Bt++)Ut(At[Bt],Ft);At.length===2?et(G,C,D):G.projectionMatrix.copy(C.projectionMatrix),w===null&&Z.isPerspectiveCamera&&(w={camera:Z,fov:Z.fov,zoom:Z.zoom}),Ct(Z,G,Ft)};function Ct(Z,j,bt){bt===null?Z.matrix.copy(j.matrixWorld):(Z.matrix.copy(bt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(j.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(j.projectionMatrix),Z.projectionMatrixInverse.copy(j.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=td*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(Z){return f[Z]};let re=null;function Qt(Z,j){if(h=j.getViewerPose(c||r),g=j,h!==null){let bt=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Ft=!1;bt.length!==G.cameras.length&&(G.cameras.length=0,Ft=!0);for(let nt=0;nt<bt.length;nt++){let rt=bt[nt],ct=null;if(d!==null)ct=d.getViewport(rt);else{let pt=p.getViewSubImage(u,rt);ct=pt.viewport,nt===0&&(t.setRenderTargetTextures(v,pt.colorTexture,pt.depthStencilTexture),t.setRenderTarget(v))}let ut=H[nt];ut===void 0&&(ut=new Nn,ut.layers.enable(nt),ut.viewport=new Ve,H[nt]=ut),ut.matrix.fromArray(rt.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(rt.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(ct.x,ct.y,ct.width,ct.height),nt===0&&(G.matrix.copy(ut.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Ft===!0&&G.cameras.push(ut)}let At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){p=i.getBinding();let nt=p.getDepthInformation(bt[0]);nt&&nt.isValid&&nt.texture&&m.init(nt,s.renderState)}if(At&&At.includes("camera-access")&&M){t.state.unbindTexture(),p=i.getBinding();for(let nt=0;nt<bt.length;nt++){let rt=bt[nt].camera;if(rt){let ct=f[rt];ct||(ct=new nu,f[rt]=ct);let ut=p.getCameraImage(rt);ct.sourceTexture=ut}}}}for(let bt=0;bt<E.length;bt++){let Ft=T[bt],At=E[bt];Ft!==null&&At!==void 0&&At.update(Ft,j,c||r)}re&&re(Z,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),g=null}let ie=new RE;ie.setAnimationLoop(Qt),this.setAnimationLoop=function(Z){re=Z},this.dispose=function(){}}},RU=new Ne,OE=new Kt;OE.set(-1,0,0,0,1,0,0,0,1);function NU(e,t){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,H_(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,_,S,v){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?a(m,f):f.isMeshLambertMaterial?(a(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(a(m,f),p(m,f)):f.isMeshPhongMaterial?(a(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(a(m,f),u(m,f),f.isMeshPhysicalMaterial&&d(m,f,v)):f.isMeshMatcapMaterial?(a(m,f),g(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),M(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,_,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Gn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Gn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let _=t.get(f),S=_.envMap,v=_.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(RU.makeRotationFromEuler(v)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(OE),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,_,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*_,m.scale.value=S*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function p(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,_){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Gn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function M(m,f){let _=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function DU(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){let T=E.program;i.uniformBlockBinding(v,T)}function c(v,E){let T=s[v.id];T===void 0&&(m(v),T=h(v),s[v.id]=T,v.addEventListener("dispose",_));let R=E.program;i.updateUBOMapping(v,R);let x=t.render.frame;a[v.id]!==x&&(u(v),a[v.id]=x)}function h(v){let E=p();v.__bindingPointIndex=E;let T=e.createBuffer(),R=v.__size,x=v.usage;return e.bindBuffer(e.UNIFORM_BUFFER,T),e.bufferData(e.UNIFORM_BUFFER,R,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,E,T),T}function p(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return kt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let E=s[v.id],T=v.uniforms,R=v.__cache;e.bindBuffer(e.UNIFORM_BUFFER,E);for(let x=0,w=T.length;x<w;x++){let C=T[x];if(Array.isArray(C))for(let D=0,H=C.length;D<H;D++)d(C[D],x,D,R);else d(C,x,0,R)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(v,E,T,R){if(M(v,E,T,R)===!0){let x=v.__offset,w=v.value;if(Array.isArray(w)){let C=0;for(let D=0;D<w.length;D++){let H=w[D],G=f(H);g(H,v.__data,C),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(C+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,v.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,x,v.__data)}}function g(v,E,T){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,T)}function M(v,E,T,R){let x=v.value,w=E+"_"+T;if(R[w]===void 0)return typeof x=="number"||typeof x=="boolean"?R[w]=x:ArrayBuffer.isView(x)?R[w]=x.slice():R[w]=x.clone(),!0;{let C=R[w];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return R[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function m(v){let E=v.uniforms,T=0,R=16;for(let w=0,C=E.length;w<C;w++){let D=Array.isArray(E[w])?E[w]:[E[w]];for(let H=0,G=D.length;H<G;H++){let B=D[H],F=Array.isArray(B.value)?B.value:[B.value];for(let J=0,q=F.length;J<q;J++){let at=F[J],X=f(at),Q=T%R,et=Q%X.boundary,Ut=Q+et;T+=et,Ut!==0&&R-Ut<X.storage&&(T+=R-Ut),B.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=T,T+=X.storage}}}let x=T%R;return x>0&&(T+=R-x),v.__size=T,v.__cache={},this}function f(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?Xt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):Xt("WebGLRenderer: Unsupported uniform value type.",v),E}function _(v){let E=v.target;E.removeEventListener("dispose",_);let T=r.indexOf(E.__bindingPointIndex);r.splice(T,1),e.deleteBuffer(s[E.id]),delete s[E.id],delete a[E.id]}function S(){for(let v in s)e.deleteBuffer(s[v]);r=[],s={},a={}}return{bind:l,update:c,dispose:S}}var UU=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ms=null;function LU(){return Ms===null&&(Ms=new ul(UU,16,16,Ya,Ki),Ms.name="DFG_LUT",Ms.minFilter=ln,Ms.magFilter=ln,Ms.wrapS=Ii,Ms.wrapT=Ii,Ms.generateMipmaps=!1,Ms.needsUpdate=!0),Ms}var yp=class{constructor(t={}){let{canvas:n=K1(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:d=$n}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;let M=d,m=new Set([Pd,Od,Id]),f=new Set([$n,Zi,bl,El,Ud,Ld]),_=new Uint32Array(4),S=new Int32Array(4),v=new L,E=null,T=null,R=[],x=[],w=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,D=!1,H=null,G=null,B=null,F=null;this._outputColorSpace=En;let J=0,q=0,at=null,X=-1,Q=null,et=new Ve,Ut=new Ve,Ct=null,re=new jt(0),Qt=0,ie=n.width,Z=n.height,j=1,bt=null,Ft=null,At=new Ve(0,0,ie,Z),Bt=new Ve(0,0,ie,Z),oe=!1,nt=new hl,rt=!1,ct=!1,ut=new Ne,pt=new L,zt=new Ve,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Gt=!1;function Wt(){return at===null?j:1}let U=i;function de(b,P){return n.getContext(b,P)}let ft,A,y,z,V,W,ot,dt,Y,$,mt,Lt,St,_t,Dt,Ht,Zt,O,vt,K,yt,Tt,st;try{let b={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"186"}`),n.addEventListener("webglcontextlost",ve,!1),n.addEventListener("webglcontextrestored",pe,!1),n.addEventListener("webglcontextcreationerror",nn,!1),U===null){let P="webgl2";if(U=de(P,b),U===null)throw de(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ot()}catch(b){throw n.removeEventListener("webglcontextlost",ve,!1),n.removeEventListener("webglcontextrestored",pe,!1),n.removeEventListener("webglcontextcreationerror",nn,!1),kt("WebGLRenderer: "+b.message),b}function Ot(){ft=new HN(U),ft.init(),yt=new AU(U,ft),A=new NN(U,ft,t,yt),y=new EU(U,ft),A.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),G=U.createFramebuffer(),B=U.createFramebuffer(),F=U.createFramebuffer(),z=new kN(U),V=new uU,W=new TU(U,ft,y,V,A,yt,z),ot=new FN(C),dt=new WR(U),Tt=new CN(U,dt),Y=new VN(U,dt,z,Tt),$=new WN(U,Y,dt,Tt,z),O=new XN(U,A,W),Dt=new DN(V),mt=new cU(C,ot,ft,A,Tt,Dt),Lt=new NU(C,V),St=new fU,_t=new vU(ft),Zt=new wN(C,ot,y,$,g,l),Ht=new bU(C,$,A),st=new DU(U,z,A,y),vt=new RN(U,ft,z),K=new GN(U,ft,z),z.programs=mt.programs,C.capabilities=A,C.extensions=ft,C.properties=V,C.renderLists=St,C.shadowMap=Ht,C.state=y,C.info=z}M!==$n&&(w=new YN(M,n.width,n.height,o,s,a));let Nt=new cv(C,U);this.xr=Nt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let b=ft.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ft.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(ie,Z,!1))},this.getSize=function(b){return b.set(ie,Z)},this.setSize=function(b,P,k=!0){if(Nt.isPresenting){Xt("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=b,Z=P,n.width=Math.floor(b*j),n.height=Math.floor(P*j),k===!0&&(n.style.width=b+"px",n.style.height=P+"px"),w!==null&&w.setSize(n.width,n.height),this.setViewport(0,0,b,P)},this.getDrawingBufferSize=function(b){return b.set(ie*j,Z*j).floor()},this.setDrawingBufferSize=function(b,P,k){ie=b,Z=P,j=k,n.width=Math.floor(b*k),n.height=Math.floor(P*k),this.setViewport(0,0,b,P)},this.setEffects=function(b){if(M===$n){kt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let P=0;P<b.length;P++)if(b[P].isOutputPass===!0){Xt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(et)},this.getViewport=function(b){return b.copy(At)},this.setViewport=function(b,P,k,N){b.isVector4?At.set(b.x,b.y,b.z,b.w):At.set(b,P,k,N),y.viewport(et.copy(At).multiplyScalar(j).round())},this.getScissor=function(b){return b.copy(Bt)},this.setScissor=function(b,P,k,N){b.isVector4?Bt.set(b.x,b.y,b.z,b.w):Bt.set(b,P,k,N),y.scissor(Ut.copy(Bt).multiplyScalar(j).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(b){y.setScissorTest(oe=b)},this.setOpaqueSort=function(b){bt=b},this.setTransparentSort=function(b){Ft=b},this.getClearColor=function(b){return b.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(b=!0,P=!0,k=!0){let N=0;if(b){let I=!1;if(at!==null){let it=at.texture.format;I=m.has(it)}if(I){let it=at.texture.type,lt=f.has(it),ht=Zt.getClearColor(),Mt=Zt.getClearAlpha(),wt=ht.r,Yt=ht.g,Vt=ht.b;lt?(_[0]=wt,_[1]=Yt,_[2]=Vt,_[3]=Mt,U.clearBufferuiv(U.COLOR,0,_)):(S[0]=wt,S[1]=Yt,S[2]=Vt,S[3]=Mt,U.clearBufferiv(U.COLOR,0,S))}else N|=U.COLOR_BUFFER_BIT}P&&(N|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),k&&(N|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N!==0&&U.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),H=b},this.dispose=function(){n.removeEventListener("webglcontextlost",ve,!1),n.removeEventListener("webglcontextrestored",pe,!1),n.removeEventListener("webglcontextcreationerror",nn,!1),Zt.dispose(),St.dispose(),_t.dispose(),V.dispose(),ot.dispose(),$.dispose(),Tt.dispose(),st.dispose(),mt.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",Dl),Nt.removeEventListener("sessionend",Ul),Qi.stop()};function ve(b){b.preventDefault(),z_("WebGLRenderer: Context Lost."),D=!0}function pe(){z_("WebGLRenderer: Context Restored."),D=!1;let b=z.autoReset,P=Ht.enabled,k=Ht.autoUpdate,N=Ht.needsUpdate,I=Ht.type;Ot(),z.autoReset=b,Ht.enabled=P,Ht.autoUpdate=k,Ht.needsUpdate=N,Ht.type=I}function nn(b){kt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function yi(b){let P=b.target;P.removeEventListener("dispose",yi),zr(P)}function zr(b){Cp(b),V.remove(b)}function Cp(b){let P=V.get(b).programs;P!==void 0&&(P.forEach(function(k){mt.releaseProgram(k)}),b.isShaderMaterial&&mt.releaseShaderCache(b))}this.renderBufferDirect=function(b,P,k,N,I,it){P===null&&(P=It);let lt=I.isMesh&&I.matrixWorld.determinantAffine()<0,ht=Qs(b,P,k,N,I);y.setMaterial(N,lt);let Mt=k.index,wt=1;if(N.wireframe===!0){if(Mt=Y.getWireframeAttribute(k),Mt===void 0)return;wt=2}let Yt=k.drawRange,Vt=k.attributes.position,Rt=Yt.start*wt,ue=(Yt.start+Yt.count)*wt;it!==null&&(Rt=Math.max(Rt,it.start*wt),ue=Math.min(ue,(it.start+it.count)*wt)),Mt!==null?(Rt=Math.max(Rt,0),ue=Math.min(ue,Mt.count)):Vt!=null&&(Rt=Math.max(Rt,0),ue=Math.min(ue,Vt.count));let Be=ue-Rt;if(Be<0||Be===1/0)return;Tt.setup(I,N,ht,k,Mt);let we,he=vt;if(Mt!==null&&(we=dt.get(Mt),he=K,he.setIndex(we)),I.isMesh)N.wireframe===!0?(y.setLineWidth(N.wireframeLinewidth*Wt()),he.setMode(U.LINES)):he.setMode(U.TRIANGLES);else if(I.isLine){let sn=N.linewidth;sn===void 0&&(sn=1),y.setLineWidth(sn*Wt()),I.isLineSegments?he.setMode(U.LINES):I.isLineLoop?he.setMode(U.LINE_LOOP):he.setMode(U.LINE_STRIP)}else I.isPoints?he.setMode(U.POINTS):I.isSprite&&he.setMode(U.TRIANGLES);if(I.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))he.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{let sn=I._multiDrawStarts,xt=I._multiDrawCounts,ze=I._multiDrawCount,Pt=Mt?dt.get(Mt).bytesPerElement:1,Ke=V.get(N).currentProgram.getUniforms();for(let ei=0;ei<ze;ei++)Ke.setValue(U,"_gl_DrawID",ei),he.render(sn[ei]/Pt,xt[ei])}else if(I.isInstancedMesh)he.renderInstances(Rt,Be,I.count);else if(k.isInstancedBufferGeometry){let sn=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,xt=Math.min(k.instanceCount,sn);he.renderInstances(Rt,Be,xt)}else he.render(Rt,Be)};function Ja(b,P,k,N){H!==null&&b.isNodeMaterial&&H.setObject(N,b),rt===!0&&Dt.setState(b,k,!1),b.transparent===!0&&b.side===vi&&b.forceSinglePass===!1?(b.side=Gn,b.needsUpdate=!0,Ks(b,P,N),b.side=Xa,b.needsUpdate=!0,Ks(b,P,N),b.side=vi):Ks(b,P,N)}this.compile=function(b,P,k=null){k===null&&(k=b),H!==null&&H.renderStart(b,P,k),T=_t.get(k),T.init(P),x.push(T),k.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(T.pushLight(I),I.castShadow&&T.pushShadow(I))}),b!==k&&b.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(T.pushLight(I),I.castShadow&&T.pushShadow(I))}),T.setupLights(),H!==null&&H.updateLights(T.state.lightsArray),ct=this.localClippingEnabled,rt=Dt.init(this.clippingPlanes,ct),rt===!0&&Dt.setGlobalState(this.clippingPlanes,P),H!==null&&Ht.render(T.state.shadowsArray,k,P);let N=new Set;return b.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;let it=I.material;if(it)if(Array.isArray(it))for(let lt=0;lt<it.length;lt++){let ht=it[lt];Ja(ht,k,P,I),N.add(ht)}else Ja(it,k,P,I),N.add(it)}),T=x.pop(),H!==null&&H.renderEnd(),N},this.compileAsync=function(b,P,k=null){let N=this.compile(b,P,k);return new Promise(I=>{function it(){if(N.forEach(function(lt){let Mt=V.get(lt).currentProgram;(Mt===void 0||Mt.isReady())&&N.delete(lt)}),N.size===0){I(b);return}setTimeout(it,10)}ft.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ka=null;function Fr(b){Ka&&Ka(b)}function Dl(){Qi.stop()}function Ul(){Qi.start()}let Qi=new RE;Qi.setAnimationLoop(Fr),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(b){Ka=b,Nt.setAnimationLoop(b),b===null?Qi.stop():Qi.start()},Nt.addEventListener("sessionstart",Dl),Nt.addEventListener("sessionend",Ul),this.render=function(b,P){if(P!==void 0&&P.isCamera!==!0){kt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;H!==null&&H.renderStart(b,P);let k=Nt.enabled===!0&&Nt.isPresenting===!0,N=w!==null&&(at===null||k)&&w.begin(C,at);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(P),P=Nt.getCamera()),b.isScene===!0&&b.onBeforeRender(C,b,P,at),T=_t.get(b,x.length),T.init(P),T.state.textureUnits=W.getTextureUnits(),x.push(T),ut.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),nt.setFromProjectionMatrix(ut,qi,P.reversedDepth),ct=this.localClippingEnabled,rt=Dt.init(this.clippingPlanes,ct),E=St.get(b,R.length),E.init(),R.push(E),Nt.enabled===!0&&Nt.isPresenting===!0){let lt=C.xr.getDepthSensingMesh();lt!==null&&ti(lt,P,-1/0,C.sortObjects)}ti(b,P,0,C.sortObjects),E.finish(),H!==null&&H.updateLights(T.state.lightsArray),C.sortObjects===!0&&E.sort(bt,Ft),Gt=Nt.enabled===!1||Nt.isPresenting===!1||Nt.hasDepthSensing()===!1,Gt&&Zt.addToRenderList(E,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&Dt.beginShadows();let I=T.state.shadowsArray;if(Ht.render(I,b,P),rt===!0&&Dt.endShadows(),(N&&w.hasRenderPass())===!1){let lt=E.opaque,ht=E.transmissive;if(T.setupLights(),P.isArrayCamera){let Mt=P.cameras;if(ht.length>0)for(let wt=0,Yt=Mt.length;wt<Yt;wt++){let Vt=Mt[wt];Ll(lt,ht,b,Vt)}Gt&&Zt.render(b);for(let wt=0,Yt=Mt.length;wt<Yt;wt++){let Vt=Mt[wt];Hr(E,b,Vt,Vt.viewport)}}else ht.length>0&&Ll(lt,ht,b,P),Gt&&Zt.render(b),Hr(E,b,P)}at!==null&&q===0&&(W.updateMultisampleRenderTarget(at),W.updateRenderTargetMipmap(at)),N&&w.end(C),b.isScene===!0&&b.onAfterRender(C,b,P),Tt.resetDefaultState(),X=-1,Q=null,x.pop(),x.length>0?(T=x[x.length-1],W.setTextureUnits(T.state.textureUnits),rt===!0&&Dt.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?E=R[R.length-1]:E=null,H!==null&&H.renderEnd()};function ti(b,P,k,N){if(b.visible===!1)return;if(b.layers.test(P.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(P);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(nt)){N&&zt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ut);let lt=$.update(b),ht=b.material;ht.visible&&E.push(b,lt,ht,k,zt.z,null,P)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(nt))){let lt=$.update(b),ht=b.material;if(N&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),zt.copy(b.boundingSphere.center)):(lt.boundingSphere===null&&lt.computeBoundingSphere(),zt.copy(lt.boundingSphere.center)),zt.applyMatrix4(b.matrixWorld).applyMatrix4(ut)),Array.isArray(ht)){let Mt=lt.groups;for(let wt=0,Yt=Mt.length;wt<Yt;wt++){let Vt=Mt[wt],Rt=ht[Vt.materialIndex];Rt&&Rt.visible&&E.push(b,lt,Rt,k,zt.z,Vt,P)}}else ht.visible&&E.push(b,lt,ht,k,zt.z,null,P)}}let it=b.children;for(let lt=0,ht=it.length;lt<ht;lt++)ti(it[lt],P,k,N)}function Hr(b,P,k,N){let{opaque:I,transmissive:it,transparent:lt}=b;T.setupLightsView(k),rt===!0&&Dt.setGlobalState(C.clippingPlanes,k),N&&y.viewport(et.copy(N)),I.length>0&&Js(I,P,k),it.length>0&&Js(it,P,k),lt.length>0&&Js(lt,P,k),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Ll(b,P,k,N){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[N.id]===void 0){let Rt=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[N.id]=new jn(1,1,{generateMipmaps:!0,type:Rt?Ki:$n,minFilter:Ss,samples:Math.max(4,A.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let it=T.state.transmissionRenderTarget[N.id],lt=N.viewport||et;it.setSize(lt.z*C.transmissionResolutionScale,lt.w*C.transmissionResolutionScale);let ht=C.getRenderTarget(),Mt=C.getActiveCubeFace(),wt=C.getActiveMipmapLevel();C.setRenderTarget(it),C.getClearColor(re),Qt=C.getClearAlpha(),Qt<1&&C.setClearColor(16777215,.5),C.clear(),Gt&&Zt.render(k);let Yt=C.toneMapping;C.toneMapping=Yi;let Vt=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),T.setupLightsView(N),rt===!0&&Dt.setGlobalState(C.clippingPlanes,N),Js(b,k,N),W.updateMultisampleRenderTarget(it),W.updateRenderTargetMipmap(it),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let ue=0,Be=P.length;ue<Be;ue++){let we=P[ue],{object:he,geometry:sn,material:xt,group:ze}=we;if(xt.side===vi&&he.layers.test(N.layers)){let Pt=xt.side;xt.side=Gn,xt.needsUpdate=!0,Vr(he,k,N,sn,xt,ze),xt.side=Pt,xt.needsUpdate=!0,Rt=!0}}Rt===!0&&(W.updateMultisampleRenderTarget(it),W.updateRenderTargetMipmap(it))}C.setRenderTarget(ht,Mt,wt),C.setClearColor(re,Qt),Vt!==void 0&&(N.viewport=Vt),C.toneMapping=Yt}function Js(b,P,k){let N=P.isScene===!0?P.overrideMaterial:null;for(let I=0,it=b.length;I<it;I++){let lt=b[I],{object:ht,geometry:Mt,group:wt}=lt,Yt=lt.material;Yt.allowOverride===!0&&N!==null&&(Yt=N),ht.layers.test(k.layers)&&Vr(ht,P,k,Mt,Yt,wt)}}function Vr(b,P,k,N,I,it){H!==null&&I.isNodeMaterial&&H.setObject(b,I),b.onBeforeRender(C,P,k,N,I,it),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(C,P,k,N,b,it),I.transparent===!0&&I.side===vi&&I.forceSinglePass===!1?(I.side=Gn,I.needsUpdate=!0,C.renderBufferDirect(k,P,N,I,b,it),I.side=Xa,I.needsUpdate=!0,C.renderBufferDirect(k,P,N,I,b,it),I.side=vi):C.renderBufferDirect(k,P,N,I,b,it),b.onAfterRender(C,P,k,N,I,it)}function Ks(b,P,k){P.isScene!==!0&&(P=It);let N=V.get(b),I=T.state.lights,it=T.state.shadowsArray,lt=I.state.version,ht=mt.getParameters(b,I.state,it,P,k,T.state.lightProbeGridArray),Mt=mt.getProgramCacheKey(ht),wt=N.programs;N.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?P.environment:null,N.fog=P.fog;let Yt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;N.envMap=ot.get(b.envMap||N.environment,Yt),N.envMapRotation=N.environment!==null&&b.envMap===null?P.environmentRotation:b.envMapRotation,wt===void 0&&(b.addEventListener("dispose",yi),wt=new Map,N.programs=wt);let Vt=wt.get(Mt);if(Vt!==void 0){if(N.currentProgram===Vt&&N.lightsStateVersion===lt)return Il(b,ht),Vt}else ht.uniforms=mt.getUniforms(b),H!==null&&b.isNodeMaterial&&H.build(b,k,ht),b.onBeforeCompile(ht,C),Vt=mt.acquireProgram(ht,Mt),wt.set(Mt,Vt),N.uniforms=ht.uniforms;let Rt=N.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Rt.clippingPlanes=Dt.uniform),Il(b,ht),N.needsLights=Iu(b),N.lightsStateVersion=lt,N.needsLights&&(Rt.ambientLightColor.value=I.state.ambient,Rt.lightProbe.value=I.state.probe,Rt.sunLights.value=I.state.sun,Rt.sunLightShadows.value=I.state.sunShadow,Rt.directionalLights.value=I.state.directional,Rt.directionalLightShadows.value=I.state.directionalShadow,Rt.spotLights.value=I.state.spot,Rt.spotLightShadows.value=I.state.spotShadow,Rt.rectAreaLights.value=I.state.rectArea,Rt.ltc_1.value=I.state.rectAreaLTC1,Rt.ltc_2.value=I.state.rectAreaLTC2,Rt.pointLights.value=I.state.point,Rt.pointLightShadows.value=I.state.pointShadow,Rt.hemisphereLights.value=I.state.hemi,Rt.sunShadowMatrix.value=I.state.sunShadowMatrix,Rt.sunShadowCascade.value=I.state.sunShadowCascade,Rt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Rt.spotLightMatrix.value=I.state.spotLightMatrix,Rt.spotLightMap.value=I.state.spotLightMap,Rt.pointShadowMatrix.value=I.state.pointShadowMatrix),N.lightProbeGrid=T.state.lightProbeGridArray.length>0,N.currentProgram=Vt,N.uniformsList=null,Vt}function Du(b){if(b.uniformsList===null){let P=b.currentProgram.getUniforms();b.uniformsList=Cl.seqWithValue(P.seq,b.uniforms)}return b.uniformsList}function Il(b,P){let k=V.get(b);k.outputColorSpace=P.outputColorSpace,k.batching=P.batching,k.batchingColor=P.batchingColor,k.instancing=P.instancing,k.instancingColor=P.instancingColor,k.instancingMorph=P.instancingMorph,k.skinning=P.skinning,k.morphTargets=P.morphTargets,k.morphNormals=P.morphNormals,k.morphColors=P.morphColors,k.morphTargetsCount=P.morphTargetsCount,k.numClippingPlanes=P.numClippingPlanes,k.numIntersection=P.numClipIntersection,k.vertexAlphas=P.vertexAlphas,k.vertexTangents=P.vertexTangents,k.toneMapping=P.toneMapping}function Uu(b,P){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;v.setFromMatrixPosition(P.matrixWorld);for(let k=0,N=b.length;k<N;k++){let I=b[k];if(I.texture!==null&&I.boundingBox.containsPoint(v))return I}return null}function Qs(b,P,k,N,I){P.isScene!==!0&&(P=It),W.resetTextureUnits();let it=P.fog,lt=N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial?P.environment:null,ht=at===null?C.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:ce.workingColorSpace,Mt=N.isMeshStandardMaterial||N.isMeshLambertMaterial&&!N.envMap||N.isMeshPhongMaterial&&!N.envMap,wt=ot.get(N.envMap||lt,Mt),Yt=N.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Vt=!!k.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Rt=!!k.morphAttributes.position,ue=!!k.morphAttributes.normal,Be=!!k.morphAttributes.color,we=Yi;N.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(we=C.toneMapping);let he=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,sn=he!==void 0?he.length:0,xt=V.get(N),ze=T.state.lights;if(rt===!0&&(ct===!0||b!==Q)){let ye=b===Q&&N.id===X;Dt.setState(N,b,ye)}let Pt=!1;N.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==ze.state.version||xt.outputColorSpace!==ht||I.isBatchedMesh&&xt.batching===!1||!I.isBatchedMesh&&xt.batching===!0||I.isBatchedMesh&&xt.batchingColor===!0&&I._colorsTexture===null||I.isBatchedMesh&&xt.batchingColor===!1&&I._colorsTexture!==null||I.isInstancedMesh&&xt.instancing===!1||!I.isInstancedMesh&&xt.instancing===!0||I.isSkinnedMesh&&xt.skinning===!1||!I.isSkinnedMesh&&xt.skinning===!0||I.isInstancedMesh&&xt.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&xt.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&xt.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&xt.instancingMorph===!1&&I.morphTexture!==null||xt.envMap!==wt||N.fog===!0&&xt.fog!==it||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==Dt.numPlanes||xt.numIntersection!==Dt.numIntersection)||xt.vertexAlphas!==Yt||xt.vertexTangents!==Vt||xt.morphTargets!==Rt||xt.morphNormals!==ue||xt.morphColors!==Be||xt.toneMapping!==we||xt.morphTargetsCount!==sn||!!xt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Pt=!0):(Pt=!0,xt.__version=N.version);let Ke=xt.currentProgram;Pt===!0&&(Ke=Ks(N,P,I),H&&N.isNodeMaterial&&H.onUpdateProgram(N,Ke,xt));let ei=!1,xi=!1,js=!1,fe=Ke.getUniforms(),Oe=xt.uniforms;if(y.useProgram(Ke.program)&&(ei=!0,xi=!0,js=!0),N.id!==X&&(X=N.id,xi=!0),xt.needsLights){let ye=Uu(T.state.lightProbeGridArray,I);xt.lightProbeGrid!==ye&&(xt.lightProbeGrid=ye,xi=!0)}if(ei||Q!==b){y.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),fe.setValue(U,"projectionMatrix",b.projectionMatrix),fe.setValue(U,"viewMatrix",b.matrixWorldInverse);let Mi=fe.map.cameraPosition;Mi!==void 0&&Mi.setValue(U,pt.setFromMatrixPosition(b.matrixWorld)),A.logarithmicDepthBuffer&&fe.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&fe.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),Q!==b&&(Q=b,xi=!0,js=!0)}if(xt.needsLights&&(ze.state.sunShadowMap.length>0&&fe.setValue(U,"sunShadowMap",ze.state.sunShadowMap,W),ze.state.directionalShadowMap.length>0&&fe.setValue(U,"directionalShadowMap",ze.state.directionalShadowMap,W),ze.state.spotShadowMap.length>0&&fe.setValue(U,"spotShadowMap",ze.state.spotShadowMap,W),ze.state.pointShadowMap.length>0&&fe.setValue(U,"pointShadowMap",ze.state.pointShadowMap,W)),I.isSkinnedMesh){fe.setOptional(U,I,"bindMatrix"),fe.setOptional(U,I,"bindMatrixInverse");let ye=I.skeleton;ye&&(ye.boneTexture===null&&ye.computeBoneTexture(),fe.setValue(U,"boneTexture",ye.boneTexture,W))}I.isBatchedMesh&&(fe.setOptional(U,I,"batchingTexture"),fe.setValue(U,"batchingTexture",I._matricesTexture,W),fe.setOptional(U,I,"batchingIdTexture"),fe.setValue(U,"batchingIdTexture",I._indirectTexture,W),fe.setOptional(U,I,"batchingColorTexture"),I._colorsTexture!==null&&fe.setValue(U,"batchingColorTexture",I._colorsTexture,W));let Si=k.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&O.update(I,k,Ke),(xi||xt.receiveShadow!==I.receiveShadow)&&(xt.receiveShadow=I.receiveShadow,fe.setValue(U,"receiveShadow",I.receiveShadow)),(N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial)&&N.envMap===null&&P.environment!==null&&(Oe.envMapIntensity.value=P.environmentIntensity),Oe.dfgLUT!==void 0&&(Oe.dfgLUT.value=LU()),xi){if(fe.setValue(U,"toneMappingExposure",C.toneMappingExposure),xt.needsLights&&Lu(Oe,js),it&&N.fog===!0&&Lt.refreshFogUniforms(Oe,it),Lt.refreshMaterialUniforms(Oe,N,j,Z,T.state.transmissionRenderTarget[b.id]),xt.needsLights&&xt.lightProbeGrid){let ye=xt.lightProbeGrid;Oe.probesSH.value=ye.texture,Oe.probesMin.value.copy(ye.boundingBox.min),Oe.probesMax.value.copy(ye.boundingBox.max),Oe.probesResolution.value.copy(ye.resolution)}Cl.upload(U,Du(xt),Oe,W)}if(N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(Cl.upload(U,Du(xt),Oe,W),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&fe.setValue(U,"center",I.center),fe.setValue(U,"modelViewMatrix",I.modelViewMatrix),fe.setValue(U,"normalMatrix",I.normalMatrix),fe.setValue(U,"modelMatrix",I.matrixWorld),N.uniformsGroups!==void 0){let ye=N.uniformsGroups;for(let Mi=0,Gr=ye.length;Mi<Gr;Mi++){let vv=ye[Mi];st.update(vv,Ke),st.bind(vv,Ke)}}return Ke}function Lu(b,P){b.ambientLightColor.needsUpdate=P,b.lightProbe.needsUpdate=P,b.sunLights.needsUpdate=P,b.sunLightShadows.needsUpdate=P,b.directionalLights.needsUpdate=P,b.directionalLightShadows.needsUpdate=P,b.pointLights.needsUpdate=P,b.pointLightShadows.needsUpdate=P,b.spotLights.needsUpdate=P,b.spotLightShadows.needsUpdate=P,b.rectAreaLights.needsUpdate=P,b.hemisphereLights.needsUpdate=P}function Iu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(b,P,k){let N=V.get(b);N.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),V.get(b.texture).__webglTexture=P,V.get(b.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:k,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,P){let k=V.get(b);k.__webglFramebuffer=P,k.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(b,P=0,k=0){at=b,J=P,q=k;let N=null,I=!1,it=!1;if(b){let ht=V.get(b);if(ht.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(U.FRAMEBUFFER,ht.__webglFramebuffer),et.copy(b.viewport),Ut.copy(b.scissor),Ct=b.scissorTest,y.viewport(et),y.scissor(Ut),y.setScissorTest(Ct),X=-1;return}else if(ht.__webglFramebuffer===void 0)W.setupRenderTarget(b);else if(ht.__hasExternalTextures)W.rebindTextures(b,V.get(b.texture).__webglTexture,V.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Yt=b.depthTexture;if(ht.__boundDepthTexture!==Yt){if(Yt!==null&&V.has(Yt)&&(b.width!==Yt.image.width||b.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(b)}}let Mt=b.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(it=!0);let wt=V.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(wt[P])?N=wt[P][k]:N=wt[P],I=!0):b.samples>0&&W.useMultisampledRTT(b)===!1?N=V.get(b).__webglMultisampledFramebuffer:Array.isArray(wt)?N=wt[k]:N=wt,et.copy(b.viewport),Ut.copy(b.scissor),Ct=b.scissorTest}else et.copy(At).multiplyScalar(j).floor(),Ut.copy(Bt).multiplyScalar(j).floor(),Ct=oe;if(k!==0&&(N=G),y.bindFramebuffer(U.FRAMEBUFFER,N)&&y.drawBuffers(b,N),y.viewport(et),y.scissor(Ut),y.setScissorTest(Ct),I){let ht=V.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+P,ht.__webglTexture,k)}else if(it){let ht=P;for(let Mt=0;Mt<b.textures.length;Mt++){let wt=V.get(b.textures[Mt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Mt,wt.__webglTexture,k,ht)}}else if(b!==null&&k!==0){let ht=V.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ht.__webglTexture,k)}X=-1};function Ol(b){let P=V.get(b);return(P.__readFormat!==b.format||P.__readType!==b.type)&&(P.__readFormat=b.format,P.__readType=b.type,P.__formatReadable=A.textureFormatReadable(b.format),P.__typeReadable=A.textureTypeReadable(b.type)),P}this.readRenderTargetPixels=function(b,P,k,N,I,it,lt,ht=0){if(!(b&&b.isWebGLRenderTarget)){kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=V.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&lt!==void 0&&(Mt=Mt[lt]),Mt){y.bindFramebuffer(U.FRAMEBUFFER,Mt);try{let wt=b.textures[ht],Yt=wt.format,Vt=wt.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ht);let Rt=Ol(wt);if(Rt.__formatReadable===!1){kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Rt.__typeReadable===!1){kt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=b.width-N&&k>=0&&k<=b.height-I&&U.readPixels(P,k,N,I,yt.convert(Yt),yt.convert(Vt),it)}finally{let wt=at!==null?V.get(at).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(b,P,k,N,I,it,lt,ht=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=V.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&lt!==void 0&&(Mt=Mt[lt]),Mt)if(P>=0&&P<=b.width-N&&k>=0&&k<=b.height-I){y.bindFramebuffer(U.FRAMEBUFFER,Mt);let wt=b.textures[ht],Yt=wt.format,Vt=wt.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ht);let Rt=Ol(wt);if(Rt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Rt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ue=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.bufferData(U.PIXEL_PACK_BUFFER,it.byteLength,U.STREAM_READ),U.readPixels(P,k,N,I,yt.convert(Yt),yt.convert(Vt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Be=at!==null?V.get(at).__webglFramebuffer:null;y.bindFramebuffer(U.FRAMEBUFFER,Be);let we=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await j1(U,we,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ue),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,it),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ue),U.deleteSync(we),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,P=null,k=0){let N=Math.pow(2,-k),I=Math.floor(b.image.width*N),it=Math.floor(b.image.height*N),lt=P!==null?P.x:0,ht=P!==null?P.y:0;W.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,k,0,0,lt,ht,I,it),y.unbindTexture()},this.copyTextureToTexture=function(b,P,k=null,N=null,I=0,it=0){let lt,ht,Mt,wt,Yt,Vt,Rt,ue,Be,we=b.isCompressedTexture?b.mipmaps[it]:b.image;if(k!==null)lt=k.max.x-k.min.x,ht=k.max.y-k.min.y,Mt=k.isBox3?k.max.z-k.min.z:1,wt=k.min.x,Yt=k.min.y,Vt=k.isBox3?k.min.z:0;else{let Oe=Math.pow(2,-I);lt=Math.floor(we.width*Oe),ht=Math.floor(we.height*Oe),b.isDataArrayTexture?Mt=we.depth:b.isData3DTexture?Mt=Math.floor(we.depth*Oe):Mt=1,wt=0,Yt=0,Vt=0}N!==null?(Rt=N.x,ue=N.y,Be=N.z):(Rt=0,ue=0,Be=0);let he=yt.convert(P.format),sn=yt.convert(P.type),xt;P.isData3DTexture?(W.setTexture3D(P,0),xt=U.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(W.setTexture2DArray(P,0),xt=U.TEXTURE_2D_ARRAY):(W.setTexture2D(P,0),xt=U.TEXTURE_2D),y.activeTexture(U.TEXTURE0),y.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,P.flipY),y.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),y.pixelStorei(U.UNPACK_ALIGNMENT,P.unpackAlignment);let ze=y.getParameter(U.UNPACK_ROW_LENGTH),Pt=y.getParameter(U.UNPACK_IMAGE_HEIGHT),Ke=y.getParameter(U.UNPACK_SKIP_PIXELS),ei=y.getParameter(U.UNPACK_SKIP_ROWS),xi=y.getParameter(U.UNPACK_SKIP_IMAGES);y.pixelStorei(U.UNPACK_ROW_LENGTH,we.width),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,we.height),y.pixelStorei(U.UNPACK_SKIP_PIXELS,wt),y.pixelStorei(U.UNPACK_SKIP_ROWS,Yt),y.pixelStorei(U.UNPACK_SKIP_IMAGES,Vt);let js=b.isDataArrayTexture||b.isData3DTexture,fe=P.isDataArrayTexture||P.isData3DTexture;if(b.isDepthTexture){let Oe=V.get(b),Si=V.get(P),ye=V.get(Oe.__renderTarget),Mi=V.get(Si.__renderTarget);y.bindFramebuffer(U.READ_FRAMEBUFFER,ye.__webglFramebuffer),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let Gr=0;Gr<Mt;Gr++)js&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(b).__webglTexture,I,Vt+Gr),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,V.get(P).__webglTexture,it,Be+Gr)),U.blitFramebuffer(wt,Yt,lt,ht,Rt,ue,lt,ht,U.DEPTH_BUFFER_BIT,U.NEAREST);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(I!==0||b.isRenderTargetTexture||V.has(b)){let Oe=V.get(b),Si=V.get(P);y.bindFramebuffer(U.READ_FRAMEBUFFER,B),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,F);for(let ye=0;ye<Mt;ye++)js?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Oe.__webglTexture,I,Vt+ye):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Oe.__webglTexture,I),fe?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Si.__webglTexture,it,Be+ye):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Si.__webglTexture,it),I!==0?U.blitFramebuffer(wt,Yt,lt,ht,Rt,ue,lt,ht,U.COLOR_BUFFER_BIT,U.NEAREST):fe?U.copyTexSubImage3D(xt,it,Rt,ue,Be+ye,wt,Yt,lt,ht):U.copyTexSubImage2D(xt,it,Rt,ue,wt,Yt,lt,ht);y.bindFramebuffer(U.READ_FRAMEBUFFER,null),y.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else fe?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(xt,it,Rt,ue,Be,lt,ht,Mt,he,sn,we.data):P.isCompressedArrayTexture?U.compressedTexSubImage3D(xt,it,Rt,ue,Be,lt,ht,Mt,he,we.data):U.texSubImage3D(xt,it,Rt,ue,Be,lt,ht,Mt,he,sn,we):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,it,Rt,ue,lt,ht,he,sn,we.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,it,Rt,ue,we.width,we.height,he,we.data):U.texSubImage2D(U.TEXTURE_2D,it,Rt,ue,lt,ht,he,sn,we);y.pixelStorei(U.UNPACK_ROW_LENGTH,ze),y.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Pt),y.pixelStorei(U.UNPACK_SKIP_PIXELS,Ke),y.pixelStorei(U.UNPACK_SKIP_ROWS,ei),y.pixelStorei(U.UNPACK_SKIP_IMAGES,xi),it===0&&P.generateMipmaps&&U.generateMipmap(xt),y.unbindTexture()},this.initRenderTarget=function(b){V.get(b).__webglFramebuffer===void 0&&W.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?W.setTextureCube(b,0):b.isData3DTexture?W.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?W.setTexture2DArray(b,0):W.setTexture2D(b,0),y.unbindTexture()},this.resetState=function(){J=0,q=0,at=null,y.reset(),Tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),n.unpackColorSpace=ce._getUnpackColorSpace()}};var tT=Qa(wu(),1),FE={portrait:[1.6,2.25],landscape:[2.25,1.6]},BU={left:.27,center:.5,right:.73},Nu=.018,kn=.007,Ye=4,HE=1/.05,zU=1/960,FU=2,Zs=72,bp=24,uv=.36,ZE=.095,HU=.0135,Ep=.036,Ru=.15,VE=1024,GE={glossy:{roughness:.42,metalness:0,clearcoat:1,clearcoatRoughness:.06,foil:0,anisotropy:0},matte:{roughness:.85,metalness:0,clearcoat:0,clearcoatRoughness:.6,foil:0,anisotropy:0},holographic:{roughness:.3,metalness:0,clearcoat:1,clearcoatRoughness:.04,foil:1,anisotropy:0},metallic:{roughness:.36,metalness:.75,clearcoat:.5,clearcoatRoughness:.18,foil:0,anisotropy:.7}},Ap=[0,.07,.93,1],VU=[-.95,-.28,.28,.95],kE=9,GU=`
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;
`,kU=`
vFoilUv = uv;
vFoilX = normalize((modelViewMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
vFoilY = normalize((modelViewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
`,XU=`
uniform float foilStrength;
uniform float foilAspect;
uniform vec3 foilKey;
uniform vec3 foilFill;
uniform vec3 foilTop;
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;

float foilHash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float foilBump(float t, float center, float width) {
  float x = (t - center) / width;
  return max(0.0, 1.0 - x * x);
}

vec3 foilSpectrum(float t) {
  return vec3(
    foilBump(t, 0.82, 0.32) + 0.4 * foilBump(t, 0.02, 0.12),
    foilBump(t, 0.5, 0.26),
    foilBump(t, 0.18, 0.24)
  );
}

vec3 foilGrating(float u, float spacing) {
  vec3 color = vec3(0.0);
  for (int m = 1; m <= 2; m++) {
    float order = float(m);
    float t = (spacing * abs(u) / order - 0.38) / 0.32;
    color += foilSpectrum(t) / order;
  }
  return color;
}

vec3 foilShard(vec2 p) {
  vec2 base = floor(p);
  float best = 9.0;
  float edge = 9.0;
  vec2 id = base;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = base + vec2(float(i), float(j));
      vec2 site = cell + vec2(foilHash(cell), foilHash(cell + 7.31)) * 0.9 + 0.05;
      float d = length(site - p);
      if (d < best) {
        edge = best;
        best = d;
        id = cell;
      } else if (d < edge) {
        edge = d;
      }
    }
  }
  return vec3(foilHash(id + 3.17), foilHash(id + 11.73), edge - best);
}
`,WU=`
if (foilStrength > 0.0) {
  vec3 foilView = normalize(vViewPosition);
  vec3 foilNormal = normalize(normal);
  vec2 foilP = vec2(vFoilUv.x, vFoilUv.y * foilAspect);
  vec3 shard = foilShard(foilP * 26.0);
  vec2 ray = foilP - vec2(-1.6, 2.6 * foilAspect);
  float angle = atan(ray.y, ray.x) + (shard.x - 0.5) * 0.16;
  vec3 grating = normalize(vFoilX * cos(angle) + vFoilY * sin(angle));
  float spacing = 1.7 * (0.95 + shard.y * 0.1);
  vec3 rainbow = foilGrating(dot(foilKey + foilView, grating), spacing);
  rainbow += 0.6 * foilGrating(dot(foilTop + foilView, grating), spacing);
  rainbow *= 0.8 + 0.2 * smoothstep(0.0, 0.04, shard.z);
  rainbow = max(rainbow - 0.35 * min(rainbow.r, min(rainbow.g, rainbow.b)), 0.0);
  vec2 grid = foilP * 64.0;
  vec2 cell = floor(grid);
  vec2 jitter = vec2(foilHash(cell + 1.7), foilHash(cell + 9.2));
  float flake = smoothstep(0.32, 0.06, length(fract(grid) - jitter * 0.6 - 0.2)) * step(0.45, foilHash(cell + 4.4));
  vec3 facet = normalize(foilNormal + (vFoilX * (jitter.x - 0.5) + vFoilY * (jitter.y - 0.5)) * 0.8);
  float glint = pow(max(dot(reflect(-foilKey, facet), foilView), 0.0), 28.0);
  glint += 0.7 * pow(max(dot(reflect(-foilTop, facet), foilView), 0.0), 28.0);
  float fine = 1.0 - smoothstep(0.35, 0.9, max(fwidth(grid.x), fwidth(grid.y)));
  vec3 sparkle = flake * glint * fine * (vec3(0.7) + foilGrating(dot(foilKey + foilView, grating) + jitter.x * 0.4, spacing));
  float ink = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  float foil = foilStrength * (0.08 + 0.92 * smoothstep(0.04, 0.7, ink));
  float facing = clamp(dot(foilNormal, foilView), 0.0, 1.0);
  float tint = clamp(dot(rainbow, vec3(0.4)), 0.0, 1.0);
  outgoingLight = outgoingLight * (1.0 - foil * (0.3 + 0.32 * tint)) + (rainbow * 0.62 * (0.4 + 0.6 * facing) + sparkle * 1.6) * foil;
}
`,XE={silver:{color:"#d9dce2",roughness:.16},gold:{color:"#e4b965",roughness:.2},graphite:{color:"#4d4f55",roughness:.28}},Za=(e,t,n)=>Math.min(n,Math.max(t,e)),Cu=(e,t,n)=>e+(t-e)*n,hv=(e,t)=>{try{let n=document.createElement("canvas").getContext("2d");if(!n)return t;n.fillStyle="#000000",n.fillStyle=e;let i=n.fillStyle;if(i.startsWith("#")){let a=parseInt(i.slice(1),16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]}let s=i.match(/[\d.]+/g);return!s||s.length<3?t:[Number(s[0])/255,Number(s[1])/255,Number(s[2])/255]}catch{return t}},qU=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],wp=(e,t=1)=>`rgba(${Math.round(e[0]*255)}, ${Math.round(e[1]*255)}, ${Math.round(e[2]*255)}, ${t})`,JE=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}},pv=(e,t,n,i,s,a)=>{let r=Math.max(0,Math.min(a,i/2,s/2)),o=r*.4477;e.moveTo(t+r,n),e.lineTo(t+i-r,n),e.bezierCurveTo(t+i-o,n,t+i,n+o,t+i,n+r),e.lineTo(t+i,n+s-r),e.bezierCurveTo(t+i,n+s-o,t+i-o,n+s,t+i-r,n+s),e.lineTo(t+r,n+s),e.bezierCurveTo(t+o,n+s,t,n+s-o,t,n+s-r),e.lineTo(t,n+r),e.bezierCurveTo(t,n+o,t+o,n,t+r,n)},fv=(e,t)=>{if(!t)return Promise.resolve(null);let n=e.get(t);if(n)return n;let i=new Promise(s=>{let a=new Image;a.crossOrigin="anonymous",a.decoding="async",a.onload=()=>s(a),a.onerror=()=>s(null),a.src=t});return e.size>=8&&e.delete(e.keys().next().value),e.set(t,i),i},WE=(e,t)=>{let[n,i]=FE[e]||FE.portrait,s=Cu(.03,Math.min(n,i)*.2,Za(t,0,1)),a={width:.34,height:.07,y:i/2-.13},r=i/2-.055;return{width:n,height:i,radius:s,slot:a,ringY:r,hangY:r+ZE}},YU=e=>{let{width:t,height:n,radius:i,slot:s}=e,a=new Fa;pv(a,-t/2+kn,-n/2+kn,t-kn*2,n-kn*2,Math.max(i-kn,.005));let r=new Nr;pv(r,-s.width/2-kn,s.y-s.height/2-kn,s.width+kn*2,s.height+kn*2,s.height/2+kn),a.holes.push(r);let o=new gl(a,{depth:Nu,bevelEnabled:!0,bevelThickness:kn,bevelSize:kn,bevelSegments:5,curveSegments:24});o.translate(0,0,-Nu/2);let l=new uu(a,24),c=l.getAttribute("position"),h=l.getAttribute("uv");for(let p=0;p<c.count;p++)h.setXY(p,(c.getX(p)+t/2)/t,(c.getY(p)+n/2)/n);return h.needsUpdate=!0,{body:o,face:l}},qE=e=>{let t=new Fa,n=e*1.16;pv(t,-n/2+.014,-Ru/2+.014,n-.028,Ru-.028,.024);let i=new gl(t,{depth:.02,bevelEnabled:!0,bevelThickness:.014,bevelSize:.014,bevelSegments:6,curveSegments:10});return i.translate(0,0,-.01),i},ZU=e=>{let t=Ap.length,n=new Vn;n.setAttribute("position",new Dn(new Float32Array(e*t*3),3)),n.setAttribute("normal",new Dn(new Float32Array(e*t*3),3)),n.setAttribute("uv",new Dn(new Float32Array(e*t*2),2));let i=[];for(let s=0;s<e-1;s++)for(let a=0;a<t-1;a++){let r=s*t+a;i.push(r,r+t,r+1,r+1,r+t,r+t+1)}return n.setIndex(i),n},JU=e=>{let t=new ll;t.background=new jt(.035,.035,.04);let n=new Ur(1,1),i=[],s=(o,l,c,h=0)=>{let p=new Cr({color:new jt(o,o,o),side:vi});i.push(p);let u=new Je(n,p);u.position.set(...l),u.scale.set(c[0],c[1],1),u.lookAt(0,0,0),u.rotateZ(h),t.add(u)};s(2.6,[0,4.5,8],[9,4]),s(6,[-5.5,.5,7],[.9,14]),s(4,[5,-.5,8],[.6,14]),s(3.5,[0,-1,9],[24,.35],Math.PI/3),s(2.5,[1,2.5,9],[24,.2],Math.PI/3),s(1.4,[0,6,-6],[12,4]),s(.5,[0,-7,1],[16,6]),s(.9,[8,0,-2],[4,10]);let a=new Rl(e),r=a.fromScene(t,.035);return a.dispose(),n.dispose(),i.forEach(o=>o.dispose()),r},dv=(e,t)=>{let n=new Rr(e);return n.colorSpace=En,n.anisotropy=t,n},KU=()=>{let t=document.createElement("canvas");t.width=128,t.height=128;let n=t.getContext("2d");if(!n)return new Rr(t);let i=JE(7),s=Float32Array.from({length:16384},()=>i()),a=(l,c)=>{let h=0;for(let p=-1;p<=1;p++)for(let u=-1;u<=1;u++)h+=s[(c+p+128)%128*128+(l+u+128)%128];return h/9*1.6},r=n.createImageData(128,128);for(let l=0;l<128;l++)for(let c=0;c<128;c++){let h=a((c-1+128)%128,l)-a((c+1)%128,l),p=a(c,(l-1+128)%128)-a(c,(l+1)%128),u=Math.hypot(h,p,1),d=(l*128+c)*4;r.data[d]=(h/u*.5+.5)*255,r.data[d+1]=(p/u*.5+.5)*255,r.data[d+2]=(1/u*.5+.5)*255,r.data[d+3]=255}n.putImageData(r,0,0);let o=new Rr(t);return o.wrapS=_s,o.wrapT=_s,o.repeat.set(5,7),o},QU=()=>{let n=JE(19),i=Float32Array.from({length:16384},()=>n()),s=l=>Math.sqrt(Math.max(0,1-4*l*l)),a=(l,c)=>{let h=(l%128+128)%128,p=(c%128+128)%128,u=h/128*8,d=p/128*8,g=Math.floor(u),M=Math.floor(d),m=u-g-.5,f=d-M-.5,_=(g+M)%2===0,S=s(m)*(.55+.45*Math.cos(f*Math.PI*(_?1:.6))),v=s(f)*(.55+.45*Math.cos(m*Math.PI*(_?.6:1)));return(_?Math.max(S,v*.7):Math.max(v,S*.7))+i[p*128+h]*.08},r=new Uint8Array(16384*4);for(let l=0;l<128;l++)for(let c=0;c<128;c++){let h=(a(c-1,l)-a(c+1,l))*1.6,p=(a(c,l-1)-a(c,l+1))*1.6,u=Math.hypot(h,p,1),d=(l*128+c)*4;r[d]=(h/u*.5+.5)*255,r[d+1]=(p/u*.5+.5)*255,r[d+2]=(1/u*.5+.5)*255,r[d+3]=255}let o=new ul(r,128,128);return o.wrapS=_s,o.wrapT=_s,o.magFilter=ln,o.minFilter=Ss,o.generateMipmaps=!0,o.needsUpdate=!0,o},jU=(e,t,n,i,s)=>{let a=(s==="contain"?Math.min:Math.max)(n/t.width,i/t.height),r=t.width*a,o=t.height*a;e.drawImage(t,(n-r)/2,(i-o)/2,r,o)},YE=(e,t,n,i)=>{let s=e.getContext("2d");s&&(s.fillStyle=wp(n),s.fillRect(0,0,e.width,e.height),t&&jU(s,t,e.width,e.height,i))},$U=(e,t,n)=>{let s=t?Math.max(64,Math.round(t.width/t.height*192)):384;e.width=192,e.height=s;let a=e.getContext("2d");if(!a)return s/192;if(a.fillStyle=wp(n),a.fillRect(0,0,192,s),t)return a.save(),a.translate(192,0),a.rotate(Math.PI/2),a.drawImage(t,0,0,s,192),a.restore(),s/192;let r=qU(n)>.5?[0,0,0]:[1,1,1];a.fillStyle=wp(r,.05);for(let o=0;o<s;o+=4)a.fillRect(0,o,192,1);a.fillStyle=wp(r,.2);for(let o=0;o<s;o+=14)a.fillRect(192*.075,o,2,8),a.fillRect(192*.925-2,o,2,8);return s/192},tL=()=>{let e=()=>Array.from({length:Ye+1},()=>new L);return{nodes:e(),previous:e(),velocities:e(),lengths:new Float64Array(Ye),impulses:new Float64Array(Ye),rest:1,anchor:new L,body:{position:new L,previous:new L,velocity:new L,quaternion:new zn,previousQuaternion:new zn,angular:new L,mass:1,inverseInertia:new L(1,1,1),hang:new L},grab:null,turn:0,twist:0,twistRaw:0,calm:0}},Te={a:new L,b:new L,c:new L,d:new L,e:new L,f:new L,g:new L,pin:new L,q:new zn,r:new zn},mv=(e,t,n)=>(Te.r.copy(e.quaternion).invert(),n.copy(t).applyQuaternion(Te.r),n.set(n.x*e.inverseInertia.x,n.y*e.inverseInertia.y,n.z*e.inverseInertia.z),n.applyQuaternion(e.quaternion)),KE=(e,t)=>{let{x:n,y:i,z:s,w:a}=e;e.x+=.5*(t.x*a+t.y*s-t.z*i),e.y+=.5*(t.y*a+t.z*n-t.x*s),e.z+=.5*(t.z*a+t.x*i-t.y*n),e.w+=.5*(-t.x*n-t.y*i-t.z*s),e.normalize()},QE=(e,t,n)=>{let i=Te.c.crossVectors(t,n);return 1/e.mass+i.dot(mv(e,i,Te.d))},jE=(e,t,n)=>{e.position.addScaledVector(n,1/e.mass),KE(e.quaternion,mv(e,Te.e.crossVectors(t,n),Te.f))},eL=(e,t,n,i)=>{let{nodes:s,body:a}=e,r=s[t],o=t===0?0:HE,l=t===Ye-1,c=Te.g,h=s[t+1];l&&(c.copy(a.hang).applyQuaternion(a.quaternion),h=Te.b.copy(a.position).add(c));let p=Te.a.subVectors(h,r),u=p.length(),d=u-e.rest;if(d<=0||u<1e-9)return;let g=p.divideScalar(u),M=l?QE(a,c,g):HE,m=(u-e.lengths[t])/n,_=(i.hold*Math.tanh(i.stiffness*d/i.hold)+i.spring*d+i.bandDamping*Math.max(0,m))*n*n-e.impulses[t];if(_<=0)return;let S=Math.min(d/(o+M),_);e.impulses[t]+=S,o&&r.addScaledVector(g,S*o),l?jE(a,c,g.multiplyScalar(-S)):h.addScaledVector(g,-S*M)},nL=(e,t,n)=>{let i=Te.g.copy(t.local).applyQuaternion(e.quaternion),s=Te.a.copy(n).sub(e.position).sub(i),a=s.length();if(a<1e-9)return;let r=s.divideScalar(a),o=a/QE(e,i,r);jE(e,i,r.multiplyScalar(o))},Tp=(e,t,n)=>{let{nodes:i,previous:s,velocities:a,body:r,anchor:o}=e;i[0].copy(o);for(let c=1;c<=Ye;c++)i[c].copy(i[c-1]),n?i[c].x+=e.rest:i[c].y-=e.rest;r.quaternion.identity(),n&&r.quaternion.setFromAxisAngle(new L(0,0,1),Math.PI/2),r.hang.set(0,t.hangY,0);let l=Te.a.copy(r.hang).applyQuaternion(r.quaternion);r.position.copy(i[Ye]).sub(l),r.previous.copy(r.position),r.previousQuaternion.copy(r.quaternion),r.velocity.set(0,0,0),r.angular.set(0,0,0);for(let c=0;c<=Ye;c++)s[c].copy(i[c]),a[c].set(0,0,0);e.lengths.fill(e.rest),e.turn=0,e.twist=0,e.twistRaw=0,e.calm=0},iL=(e,t,n)=>{e.rest=n/Ye;let{width:i,height:s}=t,a=e.body,r=Nu+kn*2;a.mass=1,a.inverseInertia.set(12/(s*s+r*r),12/(i*i+r*r),12/(i*i+s*s)),a.hang.set(0,t.hangY,0)},sL=(e,t,n,i)=>{let s=Math.max(1,Math.ceil(t/zU-1e-6)),a=t/s,{nodes:r,previous:o,velocities:l,body:c}=e,h=n.breeze*(Math.sin(i*.53)*.7+Math.sin(i*1.31+1.7)*.3)*3,p=n.breeze*Math.sin(i*.37+.6)*2,u=e.grab,d=Te.pin,g=Math.exp(-n.nodeDrag*a),M=Math.exp(-n.linearDrag*a),m=Math.exp(-n.angularDrag*a);for(let _=0;_<s;_++){for(let C=1;C<Ye;C++){let D=l[C];D.y-=n.gravity*a,D.x+=h*a,D.z+=p*a,o[C].copy(r[C]),r[C].addScaledVector(D,a)}c.previous.copy(c.position),c.previousQuaternion.copy(c.quaternion);let S=c.quaternion;if(u){let C=Te.q.copy(u.rotation).multiply(Te.r.copy(S).invert());C.w<0&&C.set(-C.x,-C.y,-C.z,-C.w);let D=Te.a.set(C.x,C.y,C.z).multiplyScalar(2*n.grip);D.addScaledVector(c.angular,-n.gripDamping),c.angular.addScaledVector(mv(c,D,Te.b),a)}let v=Te.a.set(0,1,0).applyQuaternion(S),E=Te.b.set(-v.x*v.z,-v.y*v.z,1-v.z*v.z);if(E.lengthSq()>.001){let C=Te.d.set(0,0,1).applyQuaternion(S),D=Math.atan2(Te.e.crossVectors(E,C).dot(v),E.dot(C)),H=D-e.twistRaw;H>Math.PI?H-=Math.PI*2:H<-Math.PI&&(H+=Math.PI*2),e.twist+=H,e.twistRaw=D}if(!u){let C=c.angular.dot(v);c.angular.addScaledVector(v,(n.twist*(e.turn-e.twist)-n.twistDamping*C)*a)}c.velocity.y-=n.gravity*a,c.velocity.x+=h*.35*a,c.velocity.z+=p*.35*a,c.position.addScaledVector(c.velocity,a),KE(c.quaternion,Te.f.copy(c.angular).multiplyScalar(a)),e.impulses.fill(0),u&&d.lerpVectors(u.from,u.target,(_+1)/s);for(let C=0;C<FU;C++){for(let D=0;D<Ye;D++)eL(e,D,a,n);u&&nL(c,u,d)}for(let C=1;C<Ye;C++){let D=l[C].subVectors(r[C],o[C]).divideScalar(a).multiplyScalar(g);D.multiplyScalar(1/(1+n.nodeAir*D.length()*a))}c.velocity.subVectors(c.position,c.previous).divideScalar(a);let T=Te.q.copy(c.previousQuaternion).invert().premultiply(c.quaternion);c.angular.set(T.x,T.y,T.z).multiplyScalar(2/a*(T.w<0?-1:1));let R=Te.a.set(0,0,1).applyQuaternion(c.quaternion),x=c.velocity.dot(R),w=Te.b.copy(c.velocity).addScaledVector(R,-x);w.multiplyScalar(1/(1+n.air*w.length()*a)),c.velocity.copy(w).addScaledVector(R,x/(1+n.broadside*Math.abs(x)*a)).multiplyScalar(M),c.angular.multiplyScalar(m/(1+n.spinAir*c.angular.length()*a)),c.velocity.lengthSq()>3600&&c.velocity.setLength(60),c.angular.lengthSq()>1600&&c.angular.setLength(40),r[Ye].copy(c.hang).applyQuaternion(c.quaternion).add(c.position);for(let C=0;C<Ye;C++)e.lengths[C]=r[C].distanceTo(r[C+1])}u&&u.from.copy(u.target);let f=c.velocity.lengthSq()+c.angular.lengthSq()*.3;for(let _=1;_<Ye;_++)f+=l[_].lengthSq()*.05;e.calm=f<2e-4?e.calm+t:0},aL=({frontImage:e,backImage:t,imageFit:n="cover",cardColor:i="#ffffff",orientation:s="portrait",finish:a="glossy",cornerRadius:r=.3,size:o=.6,anchor:l="center",strapLength:c=.5,strapImage:h,strapColor:p="#111111",strapWidth:u=.65,metal:d="silver",gravity:g=1,damping:M=.5,elasticity:m=.5,breeze:f=.5,interactive:_=!0,intro:S=!0,className:v="",style:E})=>{let T=(0,Br.useRef)(null),R=(0,Br.useRef)(null),x=(0,Br.useRef)(null);return R.current={frontImage:e,backImage:t,imageFit:n==="contain"?"contain":"cover",cardColor:i,orientation:s==="landscape"?"landscape":"portrait",finish:a,cornerRadius:r,size:o,anchor:l,strapLength:c,strapImage:h,strapColor:p,strapWidth:u,metal:d,gravity:g,damping:M,elasticity:m,breeze:f,interactive:_,intro:S},(0,Br.useEffect)(()=>{var w;(w=x.current)==null||w.call(x)}),(0,Br.useEffect)(()=>{var k;let w=T.current;if(!w)return;let C;try{C=new yp({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch{return}C.setClearColor(0,0),C.outputColorSpace=En,C.toneMapping=mu,C.toneMappingExposure=1;let D=C.domElement;D.className="lanyard-canvas",D.setAttribute("aria-hidden","true"),w.appendChild(D);let H=Math.min(8,C.capabilities.getMaxAnisotropy()),G=new ll,B=JU(C);G.environment=B.texture;let F=new Nn(bp,1,.1,200),J=new xl(16777215,1.6);J.position.set(-2.5,4,6);let q=new xl(16777215,.35);q.position.set(3,-1,4),G.add(J,q);let at=new Map,X={front:null,back:null,strap:null},Q=document.createElement("canvas"),et=document.createElement("canvas"),Ut=document.createElement("canvas"),Ct=dv(Q,H),re=dv(et,H),Qt=dv(Ut,H);Qt.wrapS=Ii,Qt.wrapT=_s;let ie=KU(),Z=QU(),j={foilStrength:{value:0},foilAspect:{value:1.4},foilKey:{value:new L},foilFill:{value:new L},foilTop:{value:new L}},bt=N=>{Object.assign(N.uniforms,j),N.vertexShader=N.vertexShader.replace("#include <common>",`#include <common>
${GU}`).replace("#include <project_vertex>",`#include <project_vertex>
${kU}`),N.fragmentShader=N.fragmentShader.replace("#include <common>",`#include <common>
${XU}`).replace("#include <opaque_fragment>",`${WU}
#include <opaque_fragment>`)},Ft=new Ha({map:Ct,normalMap:ie,normalScale:new gt(.06,.06)}),At=new Ha({map:re,normalMap:ie,normalScale:new gt(.06,.06)});Ft.onBeforeCompile=bt,At.onBeforeCompile=bt;let Bt=new Ha,oe=new vl({metalness:1}),nt=new Ha({map:Qt,normalMap:Z,normalScale:new gt(.7,.7),roughness:.68,sheen:1,sheenRoughness:.42,sheenColor:new jt(.32,.32,.34),side:vi}),rt=new ms,ct=new Je(void 0,Bt),ut=new Je(void 0,Ft),pt=new Je(void 0,At),zt=new Je(new _l(ZE,HU,18,72),oe);zt.rotation.y=Math.PI/2-.7,rt.add(ct,ut,pt,zt),G.add(rt);let It=ZU(Zs),Gt=new Je(It,nt);Gt.frustumCulled=!1,G.add(Gt);let Wt=new ms,U=new Je(qE(uv),oe);U.position.y=Ep+Ru/2-.004;let de=new Je(new _l(Ep,.0105,14,40),oe);Wt.add(U,de),G.add(Wt);let ft=tL(),A=[],y=new L,z=new L,V=new pl(A,!1,"centripetal"),W={width:1,height:1},ot=WE("portrait",.3),dt={},Y=uv,$=2,mt=0,Lt=performance.now(),St=0,_t=!0,Dt=!0,Ht=!1,Zt=!1,O=null,vt=0,K=((k=window.matchMedia)==null?void 0:k.call(window,"(prefers-reduced-motion: reduce)").matches)??!1,yt=()=>{var ht;let N=R.current,I=hv(N.cardColor,[1,1,1]),it=VE,lt=Math.round(VE*ot.height/ot.width);(Q.width!==it||Q.height!==lt)&&(Q.width=it,Q.height=lt,et.width=it,et.height=lt,Ct.dispose(),re.dispose()),YE(Q,X.front,I,N.imageFit),YE(et,X.back||X.front,I,N.imageFit),Ct.needsUpdate=!0,re.needsUpdate=!0,(ht=window.__pingclashFrame)!=null&&ht.active&&zr(),ti()},Tt=()=>{let N=R.current;$=$U(Ut,X.strap,hv(N.strapColor,[.07,.07,.07])),Z.repeat.set(2,2*$),Qt.dispose(),Qt.needsUpdate=!0,ti()},st=()=>{let N=R.current,I=W.width/W.height,it=ot.height/Za(N.size,.15,.9),lt=ot.width/.72;it*I<lt&&(it=lt/I);let ht=it*I;F.aspect=I,F.position.set(0,0,it/2/Math.tan(bp*Math.PI/360)),F.lookAt(0,0,0),F.updateProjectionMatrix(),F.updateMatrixWorld(),j.foilKey.value.set(-2.5,4,6).normalize().transformDirection(F.matrixWorldInverse),j.foilFill.value.set(3,-1,4).normalize().transformDirection(F.matrixWorldInverse),j.foilTop.value.set(.5,4.5,8).normalize().transformDirection(F.matrixWorldInverse);let Mt=((BU[N.anchor]??.5)-.5)*ht,wt=it/2+.2,Vt=it/2-it*Cu(.12,.42,Za(N.strapLength,0,1))+(ot.hangY-ot.height/2);ft.anchor.set(Mt,wt,0),iL(ft,ot,wt-Vt),ft.nodes[0].copy(ft.anchor),ft.previous[0].copy(ft.anchor)},Ot=()=>{let N=R.current,I=`${N.orientation}|${N.cornerRadius}`;if(I!==dt.layoutKey){ot=WE(N.orientation,N.cornerRadius);let Vt=YU(ot);ct.geometry.dispose(),ut.geometry.dispose(),pt.geometry.dispose(),ct.geometry=Vt.body,ut.geometry=Vt.face,pt.geometry=Vt.face.clone(),ut.position.z=Nu/2+kn+6e-4,pt.rotation.y=Math.PI,pt.position.z=-(Nu/2+kn+6e-4),zt.position.set(0,ot.ringY,0),dt.framingKey=""}let it=`${I}|${N.size}|${N.anchor}|${N.strapLength}|${W.width}|${W.height}`;it!==dt.framingKey&&(st(),Ht?I!==dt.layoutKey&&Tp(ft,ot,!1):(Tp(ft,ot,N.intro&&!K),Ht=!0));let lt=`${N.frontImage}|${N.backImage}|${N.strapImage}`;if(lt!==dt.imageKey){let Vt=++vt;Promise.all([fv(at,N.frontImage),fv(at,N.backImage),fv(at,N.strapImage)]).then(([Rt,ue,Be])=>{!Dt||Vt!==vt||(X.front=Rt,X.back=ue,X.strap=Be,yt(),Tt())})}let ht=`${I}|${N.cardColor}|${N.imageFit}`;ht!==dt.faceKey&&yt(),N.strapColor!==dt.strapColor&&Tt();let Mt=GE[N.finish]||GE.glossy,wt=hv(N.cardColor,[1,1,1]);[Ft,At].forEach(Vt=>{Vt.roughness=Mt.roughness,Vt.metalness=Mt.metalness,Vt.clearcoat=Mt.clearcoat,Vt.clearcoatRoughness=Mt.clearcoatRoughness,Vt.anisotropy=Mt.anisotropy}),j.foilStrength.value=Mt.foil,j.foilAspect.value=ot.height/ot.width,Bt.color.setRGB(wt[0]*.92,wt[1]*.92,wt[2]*.92,En),Bt.roughness=Math.min(Mt.roughness,.35),Bt.metalness=Mt.metalness,Bt.clearcoat=1,Bt.clearcoatRoughness=.08;let Yt=XE[N.metal]||XE.silver;oe.color.set(Yt.color),oe.roughness=Yt.roughness,Y=uv*Za(N.strapWidth,.4,2),Y!==dt.strapScale&&(U.geometry.dispose(),U.geometry=qE(Y)),D.style.touchAction=N.interactive?"pan-y":"auto",dt={layoutKey:I,framingKey:it,imageKey:lt,faceKey:ht,strapColor:N.strapColor,strapScale:Y},ti()},Nt=Array.from({length:Zs},()=>new L),ve=Array.from({length:Zs},()=>new L),pe=VU.map(N=>[Math.cos(N),Math.sin(N)]),nn={tangent:new L,toCamera:new L,basis:new Ne,up:new L,across:new L,facing:new L,end:new L},yi=()=>{let N=ft.nodes[Ye],I=Ep+Ru+.05,it=Ye-1;for(;it>0&&ft.nodes[it].distanceTo(N)<I*1.1;)it--;let lt=nn.up.subVectors(ft.nodes[it],N);lt.lengthSq()<1e-8&&lt.set(0,1,0).applyQuaternion(ft.body.quaternion),lt.normalize(),y.copy(N).addScaledVector(lt,I),z.copy(N).addScaledVector(lt,Ep+Ru*.35),A.length=0;for(let Pt=0;Pt<=it;Pt++)A.push(ft.nodes[Pt]);A.push(y,z),V.updateArcLengths();for(let Pt=0;Pt<Zs;Pt++)V.getPointAt(Pt/(Zs-1),Nt[Pt]);let ht=V.getLength(),Mt=1-y.distanceTo(z)/Math.max(ht,.001),wt=It.getAttribute("position"),Yt=It.getAttribute("normal"),Vt=It.getAttribute("uv"),Rt=Ap.length,ue=ft.rest*Ye,Be=ue/(Y*$),we=Y/Math.pow(Math.max(1,ht/Math.max(ue,.001)),.35),{tangent:he,toCamera:sn,across:xt,facing:ze}=nn;for(let Pt=0;Pt<Zs;Pt++){he.subVectors(Nt[Math.min(Zs-1,Pt+1)],Nt[Math.max(0,Pt-1)]),he.lengthSq()<1e-12&&he.set(0,-1,0),he.normalize(),sn.subVectors(F.position,Nt[Pt]).normalize();let Ke=ve[Pt].crossVectors(sn,he);Ke.lengthSq()<1e-10&&Ke.copy(Pt>0?ve[Pt-1]:Te.a.set(1,0,0)),Ke.normalize(),Pt>0&&Ke.dot(ve[Pt-1])<0&&Ke.negate();let ei=-ft.twist*Math.pow(Math.min(1,Pt/(Zs-1)/Mt),1.3);ze.crossVectors(he,Ke),xt.copy(Ke).multiplyScalar(Math.cos(ei)).addScaledVector(ze,Math.sin(ei)),ze.crossVectors(he,xt);let xi=Nt[Pt],js=(1-Pt/(Zs-1))*Be;for(let fe=0;fe<Rt;fe++){let Oe=Pt*Rt+fe,Si=(Ap[fe]-.5)*we,[ye,Mi]=pe[fe];wt.setXYZ(Oe,xi.x+xt.x*Si,xi.y+xt.y*Si,xi.z+xt.z*Si),Yt.setXYZ(Oe,ze.x*ye+xt.x*Mi,ze.y*ye+xt.y*Mi,ze.z*ye+xt.z*Mi),Vt.setXY(Oe,Ap[fe],js)}}nn.end.copy(xt),wt.needsUpdate=!0,Yt.needsUpdate=!0,Vt.needsUpdate=!0,xt.copy(nn.end).addScaledVector(lt,-nn.end.dot(lt)).normalize(),ze.crossVectors(xt,lt).normalize(),nn.basis.makeBasis(xt,lt,ze),Wt.quaternion.setFromRotationMatrix(nn.basis),Wt.position.copy(N)},zr=()=>{rt.position.copy(ft.body.position),rt.quaternion.copy(ft.body.quaternion),yi(),C.render(G,F),window.__lanyardReady=D.clientHeight>100&&!!X.front&&!!X.back&&C.info.render.calls>0&&!C.getContext().isContextLost(),window.__lanyardFrames=(window.__lanyardFrames||0)+1},Cp=()=>{let N=R.current,I=40*Za(N.gravity,0,3),it=Math.max(I,20),lt=Za(N.elasticity,0,1),ht=Za(N.damping,0,1);return{gravity:I,hold:it*Cu(2.2,5.5,lt),stiffness:it*10*Ye,spring:it*Cu(.1,.4,lt)*Ye,bandDamping:it*Cu(.3,.08,lt)*Ye,linearDrag:.25*Math.pow(16,ht),angularDrag:.5*Math.pow(12,ht),air:.15,broadside:.5,spinAir:.03,nodeDrag:2,nodeAir:.2,twist:30,twistDamping:3,grip:40,gripDamping:6,breeze:K?0:Za(N.breeze,0,1)}},Ja=!1,Ka=0,Fr=null,Dl=()=>{let N=window.__pingclashFrame;if(!N)return;let I=N.back?Math.PI:0;if(I!==Ka){let it=new L(0,1,0).applyQuaternion(ft.body.quaternion);ft.body.angular.addScaledVector(it,kE*(I>Ka?1:-1)),ft.turn=I,Ka=I}if(!N.motion){Tp(ft,ot,!1),ft.turn=I,ft.body.quaternion.setFromAxisAngle(new L(0,1,0),I);let it=2*F.position.z*Math.tan(bp*Math.PI/360);ft.body.position.y=it/2-it*(N.top+N.height/2)/N.viewportHeight;let lt=ft.body.hang.clone().applyQuaternion(ft.body.quaternion).add(ft.body.position);for(let ht=1;ht<=Ye;ht++)ft.nodes[ht].lerpVectors(ft.anchor,lt,ht/Ye);return}if(N.held){Ja||(Ja=!0,Fr=ft.body.position.clone(),ft.grab={local:new L,rotation:ft.body.quaternion.clone(),from:Fr.clone(),target:Fr.clone()});let it=2*F.position.z*Math.tan(bp*Math.PI/360);ft.grab.target.copy(Fr).add(new L(N.dx/N.viewportHeight*it,-N.dy/N.viewportHeight*it,0))}else Ja&&(Ja=!1,ft.grab=null)},Ul=()=>{let N=window.__pingclashFrame;if(!(N!=null&&N.active)){cancelAnimationFrame(mt),mt=0;return}if(!N.motion){Dl(),zr();return}ti()};window.addEventListener("pingclash-frame",Ul);let Qi=N=>{var Mt,wt;if(mt=0,!Dt||document.hidden||((Mt=window.__pingclashFrame)==null?void 0:Mt.active)===!1)return;let I=Math.min(1/30,Math.max(1/240,(N-Lt)/1e3));Lt=N,St+=I,Dl();let it=Cp();((wt=window.__pingclashFrame)==null?void 0:wt.motion)!==!1&&sL(ft,I,it,St);let lt=ft.body;Number.isFinite(lt.position.x+lt.position.y+lt.position.z+lt.quaternion.w)||(ft.grab=null,Tp(ft,ot,!1)),zr();let ht=ft.calm>1.2&&!ft.grab&&it.breeze===0;_t&&!ht&&(mt=requestAnimationFrame(Qi))},ti=()=>{mt||!_t||!Dt||(ft.calm=0,Lt=performance.now(),mt=requestAnimationFrame(Qi))},Hr=new du,Ll=new gt,Js=N=>{let I=D.getBoundingClientRect();Ll.set((N.clientX-I.left)/I.width*2-1,-((N.clientY-I.top)/I.height)*2+1),Hr.setFromCamera(Ll,F)},Vr=()=>(rt.updateMatrixWorld(),Hr.intersectObjects([ct,ut,pt],!1)[0]||null),Ks=N=>{D.style.cursor!==N&&(D.style.cursor=N)},Du=N=>{let I=ft.body,it=Te.a.set(0,1,0).applyQuaternion(I.quaternion),lt=ft.turn>0?-1:1;if(ft.turn===0){let ht=Te.c.subVectors(N,F.position).normalize();lt=Te.b.subVectors(N,I.position).cross(ht).dot(it)<0?-1:1}ft.turn=ft.turn===0?Math.PI*lt:0,I.angular.addScaledVector(it,kE*lt)},Il=N=>{var it;if(!R.current.interactive||N.button>0)return;Js(N);let I=Vr();I&&(ft.grab={local:I.point.clone().sub(ft.body.position).applyQuaternion(ft.body.quaternion.clone().invert()),rotation:ft.body.quaternion.clone(),reach:I.distance,from:I.point.clone(),target:I.point.clone()},O={x:N.clientX,y:N.clientY,time:performance.now(),point:I.point.clone()},(it=D.setPointerCapture)==null||it.call(D,N.pointerId),Ks("grabbing"),N.preventDefault(),ti())},Uu=N=>{if(R.current.interactive){if(Js(N),ft.grab){O&&Math.hypot(N.clientX-O.x,N.clientY-O.y)>6&&(O=null),Hr.ray.at(ft.grab.reach,ft.grab.target),ti();return}N.pointerType!=="touch"&&(Zt=!!Vr(),Ks(Zt?"grab":""))}},Qs=N=>{var I;ft.grab&&(ft.grab=null,O&&N.type==="pointerup"&&performance.now()-O.time<450&&Du(O.point),O=null,(I=D.releasePointerCapture)==null||I.call(D,N.pointerId),Ks(Zt&&N.pointerType!=="touch"?"grab":""),ti())},Lu=N=>{!R.current.interactive||N.touches.length!==1||(Js(N.touches[0]),Vr()&&N.preventDefault())};D.addEventListener("pointerdown",Il),D.addEventListener("pointermove",Uu),D.addEventListener("pointerup",Qs),D.addEventListener("pointercancel",Qs),D.addEventListener("lostpointercapture",Qs),D.addEventListener("touchstart",Lu,{passive:!1});let Iu=()=>{W.width=Math.max(1,w.clientWidth),W.height=Math.max(1,w.clientHeight),C.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),C.setSize(W.width,W.height,!1),Ot(),zr()},Ol=new ResizeObserver(Iu);Ol.observe(w);let b=new IntersectionObserver(([N])=>{_t=N.isIntersecting,_t&&ti()});b.observe(w);let P=()=>{document.hidden||ti()};return document.addEventListener("visibilitychange",P),x.current=Ot,Iu(),()=>{Dt=!1,cancelAnimationFrame(mt),x.current=null,Ol.disconnect(),b.disconnect(),window.removeEventListener("pingclash-frame",Ul),window.__lanyardReady=!1,document.removeEventListener("visibilitychange",P),D.removeEventListener("pointerdown",Il),D.removeEventListener("pointermove",Uu),D.removeEventListener("pointerup",Qs),D.removeEventListener("pointercancel",Qs),D.removeEventListener("lostpointercapture",Qs),D.removeEventListener("touchstart",Lu),[ct,ut,pt,zt,U,de,Gt].forEach(N=>{var I;return(I=N.geometry)==null?void 0:I.dispose()}),[Ft,At,Bt,oe,nt].forEach(N=>N.dispose()),[Ct,re,Qt,ie,Z].forEach(N=>N.dispose()),B.dispose(),C.dispose(),D.parentNode&&D.parentNode.removeChild(D)}},[]),(0,tT.jsx)("div",{ref:T,className:`lanyard ${v}`.trim(),style:E})},$E=aL;var _v=Qa(wu(),1),Xe={active:!1,motion:!0,held:!1,back:!1,dx:0,dy:0,viewportHeight:800,viewportWidth:360,top:180,height:266,fontScale:1,phase:"idle",label:"",status:""};window.__pingclashFrame=Xe;var gv,eT="";function nT(e){let t=document.createElement("canvas");t.width=1024,t.height=1440;let n=t.getContext("2d");n.fillStyle=e?"#14292d":"#f6f6f2",n.fillRect(0,0,1024,1440),n.fillStyle=e?"#eaf1f0":"#17242a",n.font="500 76px sans-serif",n.fillText("PingClash",112,240),n.strokeStyle=e?"#a5d9cf":"#26373d",n.lineWidth=14,n.lineCap="round",n.beginPath(),e?(n.moveTo(438,600),n.lineTo(492,654),n.lineTo(598,544)):n.arc(512,610,82,-Math.PI*.35,Math.PI*1.35),n.stroke(),e||(n.beginPath(),n.moveTo(512,504),n.lineTo(512,600),n.stroke()),n.textAlign="center";let i=(s,a,r,o=3)=>{n.font=`500 ${r*Math.min(Xe.fontScale,1.8)}px sans-serif`;let l=[...s],c="",h=[];for(let p of l)n.measureText(c+p).width>800?(h.push(c),c=p):c+=p;h.push(c),h.slice(0,o).forEach((p,u)=>n.fillText(p,512,a+u*r*Xe.fontScale*1.25))};return i(Xe.status,850,62),n.globalAlpha=.2,n.fillRect(112,1110,800,2),n.globalAlpha=1,i(Xe.label,1190,58,2),t.toDataURL("image/png")}function aT(){let e=Math.max(.15,Math.min(.6,Xe.height/Xe.viewportHeight)),t=Xe.top/Xe.viewportHeight;return{size:e,strapLength:Math.max(0,Math.min(1,(t-.12)/.3)),frontImage:nT(!1),backImage:nT(!0),cardColor:"#ffffff",finish:"glossy",orientation:"portrait",anchor:"center",cornerRadius:.3,strapColor:"#111111",strapWidth:.65,metal:"silver",gravity:1,damping:.5,elasticity:.5,breeze:0,intro:!1,interactive:!1}}function rL(){let[e,t]=(0,iT.useState)(aT());return gv=t,(0,_v.jsx)($E,{...e})}window.PingClashScene=Object.freeze({frame(e){if(!e||typeof e!="object")return;for(let i of["viewportHeight","viewportWidth","top","height","fontScale","dx","dy"])Number.isFinite(e[i])&&(Xe[i]=Math.max(-1e4,Math.min(1e4,e[i])));for(let i of["active","motion","held","back"])Xe[i]=e[i]===!0;for(let i of["phase","label","status"])typeof e[i]=="string"&&(Xe[i]=e[i].slice(0,120));let t=Math.max(1,window.innerWidth*Xe.viewportHeight/Math.max(1,Xe.viewportWidth));for(let i of[document.documentElement,document.body,document.getElementById("root")])i.style.height=`${t}px`;let n=[Xe.viewportHeight,Xe.viewportWidth,Xe.top,Xe.height,Xe.fontScale,Xe.phase,Xe.label,Xe.status].join("|");n!==eT&&gv&&(eT=n,gv(aT())),window.dispatchEvent(new Event("pingclash-frame"))},status(){return{ready:window.__lanyardReady===!0,frames:window.__lanyardFrames||0,active:Xe.active,engine:"three",roughness:.42,clearcoat:1,metalness:1,metalRoughness:.16,weaveNormal:.7}}});(0,sT.createRoot)(document.getElementById("root")).render((0,_v.jsx)(rL,{}));})();
