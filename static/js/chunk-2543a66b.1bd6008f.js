(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2543a66b"],{"107c":function(t,e,n){var r=n("d039"),a=n("da84"),i=a.RegExp;t.exports=r((function(){var t=i("(?<a>b)","g");return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")}))},1276:function(t,e,n){"use strict";var r=n("2ba4"),a=n("c65b"),i=n("e330"),o=n("d784"),c=n("44e7"),s=n("825a"),u=n("1d80"),l=n("4840"),f=n("8aa5"),h=n("50c4"),d=n("577e"),p=n("dc4a"),v=n("4dae"),g=n("14c3"),m=n("9263"),y=n("9f7f"),x=n("d039"),b=y.UNSUPPORTED_Y,w=4294967295,_=Math.min,I=[].push,k=i(/./.exec),E=i(I),P=i("".slice),R=!x((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));o("split",(function(t,e,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var i=d(u(this)),o=void 0===n?w:n>>>0;if(0===o)return[];if(void 0===t)return[i];if(!c(t))return a(e,i,t,o);var s,l,f,h=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,y=new RegExp(t.source,p+"g");while(s=a(m,y,i)){if(l=y.lastIndex,l>g&&(E(h,P(i,g,s.index)),s.length>1&&s.index<i.length&&r(I,h,v(s,1)),f=s[0].length,g=l,h.length>=o))break;y.lastIndex===s.index&&y.lastIndex++}return g===i.length?!f&&k(y,"")||E(h,""):E(h,P(i,g)),h.length>o?v(h,0,o):h}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:a(e,this,t,n)}:e,[function(e,n){var r=u(this),o=void 0==e?void 0:p(e,t);return o?a(o,e,r,n):a(i,d(r),e,n)},function(t,r){var a=s(this),o=d(t),c=n(i,a,o,r,i!==e);if(c.done)return c.value;var u=l(a,RegExp),p=a.unicode,v=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(b?"g":"y"),m=new u(b?"^(?:"+a.source+")":a,v),y=void 0===r?w:r>>>0;if(0===y)return[];if(0===o.length)return null===g(m,o)?[o]:[];var x=0,I=0,k=[];while(I<o.length){m.lastIndex=b?0:I;var R,C=g(m,b?P(o,I):o);if(null===C||(R=_(h(m.lastIndex+(b?I:0)),o.length))===x)I=f(o,I,p);else{if(E(k,P(o,x,I)),k.length===y)return k;for(var L=1;L<=C.length-1;L++)if(E(k,C[L]),k.length===y)return k;I=x=R}}return E(k,P(o,x)),k}]}),!R,b)},"14c3":function(t,e,n){var r=n("da84"),a=n("c65b"),i=n("825a"),o=n("1626"),c=n("c6b6"),s=n("9263"),u=r.TypeError;t.exports=function(t,e){var n=t.exec;if(o(n)){var r=a(n,t,e);return null!==r&&i(r),r}if("RegExp"===c(t))return a(s,t,e);throw u("RegExp#exec called on incompatible receiver")}},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("d3b7");function r(t,e,n,r,a,i,o){try{var c=t[i](o),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var o=t.apply(e,n);function c(t){r(o,a,i,c,s,"next",t)}function s(t){r(o,a,i,c,s,"throw",t)}c(void 0)}))}}},"25f0":function(t,e,n){"use strict";var r=n("e330"),a=n("5e77").PROPER,i=n("6eeb"),o=n("825a"),c=n("3a9b"),s=n("577e"),u=n("d039"),l=n("ad6d"),f="toString",h=RegExp.prototype,d=h[f],p=r(l),v=u((function(){return"/a/b"!=d.call({source:"a",flags:"b"})})),g=a&&d.name!=f;(v||g)&&i(RegExp.prototype,f,(function(){var t=o(this),e=s(t.source),n=t.flags,r=s(void 0===n&&c(h,t)&&!("flags"in h)?p(t):n);return"/"+e+"/"+r}),{unsafe:!0})},2885:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"contain"},[n("div",{staticClass:"methion"},[n("span",{staticClass:"deadLineMethion"},[t._v(" 有"),n("span",[t._v(t._s(t.redPacketData.deadNum))]),t._v("个红包即将到期 ")]),n("span",{staticClass:"redPackInfo",on:{click:t.toInfo}},[n("i",{staticClass:"el-icon-question"}),n("span",[t._v(t._s(t.redPacket.name))])])]),n("div",{staticClass:"redPacket"},[n("div",{staticClass:"redPacketItem"},t._l(t.redPacketData.redPacketInfo,(function(t,e){return n("red-packet-item",{key:e,attrs:{redPacketItem:t}})})),1),n("div",{staticClass:"redPacketMethion"},[t._v(" "+t._s(t.useInfo.title)+": "+t._s(t.useInfo.info)+" ")])]),n("footer",{staticClass:"footerNav"},[n("nav",t._l(t.bottomNav,(function(e,r){return n("div",{key:r,staticClass:"item",on:{click:t.toFunc}},[t._v(" "+t._s(e.name)+" ")])})),0)])])},a=[],i=n("1da1"),o=(n("96cf"),n("d3b7"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return 0===this.redPacketItem.stale_dated?n("div",{attrs:{id:"RedPacketItem"}},[n("div",{staticClass:"itemContain"},[n("div",{staticClass:"left"},[n("p",{staticClass:"amounts"},[n("span",{staticClass:"unit"},[t._v("￥")]),n("span",{staticClass:"int"},[t._v(t._s(t.getInt))]),n("span",{staticClass:"point"},[t._v(".")]),n("span",{staticClass:"float"},[t._v(t._s(t.getFlot))])]),n("span",[t._v(t._s(this.redPacketItem.condiction))])]),n("div",{staticClass:"middle"},[n("div",{staticClass:"msg"},[n("p",{staticClass:"type"},[t._v(t._s(this.redPacketItem.type))]),n("p",{staticClass:"deadTime"},[t._v(t._s(this.redPacketItem.dead_time)+"到期")]),n("p",{staticClass:"usePhone"},[t._v(t._s(this.redPacketItem.use_phone))])])]),n("div",{staticClass:"right"},[t._v(" 剩"+t._s(this.redPacketItem.leav_time)+"日 ")])])]):t._e()}),c=[],s=(n("ac1f"),n("1276"),n("25f0"),{name:"RedPacketItem",props:{redPacketItem:{type:Object}},computed:{getInt:function(){return Math.floor(this.redPacketItem.amounts)},getFlot:function(){var t=this.redPacketItem.amounts,e=t.toString().split(".")[1];return console.log(e),e}}}),u=s,l=(n("d7f6"),n("2877")),f=Object(l["a"])(u,o,c,!1,null,"617f12e8",null),h=f.exports,d={components:{RedPacketItem:h},name:"RedPacket",data:function(){return{redPacket:{name:"红包说明",routeName:""},redPacketData:{totalNum:0,deadNum:0,redPacketInfo:[]},useInfo:{title:"限品类",info:"限品类：快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理"},bottomNav:[{name:"兑换红包",routeName:""},{name:"推荐有奖",routeName:""}]}},methods:{toInfo:function(){},toFunc:function(){},getData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,n){t.$axios.post("user/RedPacket").then((function(t){e(t.data)})).catch((function(t){console.log("err",t),n(null)}))}));case 2:n=e.sent,null!==n&&(t.redPacketData=n);case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.getData()}},p=d,v=(n("569f"),Object(l["a"])(p,r,a,!1,null,"57a7fdd8",null));e["default"]=v.exports},"306f":function(t,e,n){},"44e7":function(t,e,n){var r=n("861d"),a=n("c6b6"),i=n("b622"),o=i("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==a(t))}},"4dae":function(t,e,n){var r=n("da84"),a=n("23cb"),i=n("07fa"),o=n("8418"),c=r.Array,s=Math.max;t.exports=function(t,e,n){for(var r=i(t),u=a(e,r),l=a(void 0===n?r:n,r),f=c(s(l-u,0)),h=0;u<l;u++,h++)o(f,h,t[u]);return f.length=h,f}},"569f":function(t,e,n){"use strict";n("306f")},8418:function(t,e,n){"use strict";var r=n("a04b"),a=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var o=r(e);o in t?a.f(t,o,i(0,n)):t[o]=n}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("c65b"),a=n("e330"),i=n("577e"),o=n("ad6d"),c=n("9f7f"),s=n("5692"),u=n("7c73"),l=n("69f3").get,f=n("fce3"),h=n("107c"),d=s("native-string-replace",String.prototype.replace),p=RegExp.prototype.exec,v=p,g=a("".charAt),m=a("".indexOf),y=a("".replace),x=a("".slice),b=function(){var t=/a/,e=/b*/g;return r(p,t,"a"),r(p,e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),w=c.BROKEN_CARET,_=void 0!==/()??/.exec("")[1],I=b||_||w||f||h;I&&(v=function(t){var e,n,a,c,s,f,h,I=this,k=l(I),E=i(t),P=k.raw;if(P)return P.lastIndex=I.lastIndex,e=r(v,P,E),I.lastIndex=P.lastIndex,e;var R=k.groups,C=w&&I.sticky,L=r(o,I),O=I.source,N=0,j=E;if(C&&(L=y(L,"y",""),-1===m(L,"g")&&(L+="g"),j=x(E,I.lastIndex),I.lastIndex>0&&(!I.multiline||I.multiline&&"\n"!==g(E,I.lastIndex-1))&&(O="(?: "+O+")",j=" "+j,N++),n=new RegExp("^(?:"+O+")",L)),_&&(n=new RegExp("^"+O+"$(?!\\s)",L)),b&&(a=I.lastIndex),c=r(p,C?n:I,j),C?c?(c.input=x(c.input,N),c[0]=x(c[0],N),c.index=I.lastIndex,I.lastIndex+=c[0].length):I.lastIndex=0:b&&c&&(I.lastIndex=I.global?c.index+c[0].length:a),_&&c&&c.length>1&&r(d,c[0],n,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(c[s]=void 0)})),c&&R)for(c.groups=f=u(null),s=0;s<R.length;s++)h=R[s],f[h[0]]=c[h[1]];return c}),t.exports=v},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(j){s=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var a=e&&e.prototype instanceof g?e:g,i=Object.create(a.prototype),o=new L(r||[]);return i._invoke=E(t,n,o),i}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(j){return{type:"throw",arg:j}}}t.wrap=u;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",v={};function g(){}function m(){}function y(){}var x={};s(x,i,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(O([])));w&&w!==n&&r.call(w,i)&&(x=w);var _=y.prototype=g.prototype=Object.create(x);function I(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(a,i,o,c){var s=l(t[a],t,i);if("throw"!==s.type){var u=s.arg,f=u.value;return f&&"object"===typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,o,c)}),(function(t){n("throw",t,o,c)})):e.resolve(f).then((function(t){u.value=t,o(u)}),(function(t){return n("throw",t,o,c)}))}c(s.arg)}var a;function i(t,r){function i(){return new e((function(e,a){n(t,r,e,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function E(t,e,n){var r=f;return function(a,i){if(r===d)throw new Error("Generator is already running");if(r===p){if("throw"===a)throw i;return N()}n.method=a,n.arg=i;while(1){var o=n.delegate;if(o){var c=P(o,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var s=l(t,e,n);if("normal"===s.type){if(r=n.done?p:h,s.arg===v)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=p,n.method="throw",n.arg=s.arg)}}}function P(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,P(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=l(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,v;var i=a.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function R(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function C(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(R,this),this.reset(!0)}function O(t){if(t){var n=t[i];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function n(){while(++a<t.length)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:N}}function N(){return{value:e,done:!0}}return m.prototype=y,s(_,"constructor",y),s(y,"constructor",m),m.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},I(k.prototype),s(k.prototype,o,(function(){return this})),t.AsyncIterator=k,t.async=function(e,n,r,a,i){void 0===i&&(i=Promise);var o=new k(u(e,n,r,a),i);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},I(_),s(_,c,"Generator"),s(_,i,(function(){return this})),s(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=O,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(C),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return c.type="throw",c.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],c=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var s=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),C(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;C(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:O(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=r}catch(a){"object"===typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},"9f7f":function(t,e,n){var r=n("d039"),a=n("da84"),i=a.RegExp,o=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),c=o||r((function(){return!i("a","y").sticky})),s=o||r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}));t.exports={BROKEN_CARET:s,MISSED_STICKY:c,UNSUPPORTED_Y:o}},ac1f:function(t,e,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},cb72:function(t,e,n){},d784:function(t,e,n){"use strict";n("ac1f");var r=n("e330"),a=n("6eeb"),i=n("9263"),o=n("d039"),c=n("b622"),s=n("9112"),u=c("species"),l=RegExp.prototype;t.exports=function(t,e,n,f){var h=c(t),d=!o((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),p=d&&!o((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[h]=/./[h]),n.exec=function(){return e=!0,null},n[h](""),!e}));if(!d||!p||n){var v=r(/./[h]),g=e(h,""[t],(function(t,e,n,a,o){var c=r(t),s=e.exec;return s===i||s===l.exec?d&&!o?{done:!0,value:v(e,n,a)}:{done:!0,value:c(n,e,a)}:{done:!1}}));a(String.prototype,t,g[0]),a(l,h,g[1])}f&&s(l[h],"sham",!0)}},d7f6:function(t,e,n){"use strict";n("cb72")},fce3:function(t,e,n){var r=n("d039"),a=n("da84"),i=a.RegExp;t.exports=r((function(){var t=i(".","s");return!(t.dotAll&&t.exec("\n")&&"s"===t.flags)}))}}]);
//# sourceMappingURL=chunk-2543a66b.1bd6008f.js.map