(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63a396e6"],{"07de":function(t,e,n){"use strict";n("7e2f")},"107c":function(t,e,n){var r=n("d039"),a=n("da84"),i=a.RegExp;t.exports=r((function(){var t=i("(?<a>b)","g");return"b"!==t.exec("b").groups.a||"bc"!=="b".replace(t,"$<a>c")}))},1276:function(t,e,n){"use strict";var r=n("2ba4"),a=n("c65b"),i=n("e330"),o=n("d784"),s=n("44e7"),c=n("825a"),u=n("1d80"),f=n("4840"),l=n("8aa5"),p=n("50c4"),h=n("577e"),d=n("dc4a"),g=n("4dae"),m=n("14c3"),v=n("9263"),y=n("9f7f"),x=n("d039"),b=y.UNSUPPORTED_Y,w=4294967295,N=Math.min,_=[].push,E=i(/./.exec),S=i(_),C=i("".slice),I=!x((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));o("split",(function(t,e,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var i=h(u(this)),o=void 0===n?w:n>>>0;if(0===o)return[];if(void 0===t)return[i];if(!s(t))return a(e,i,t,o);var c,f,l,p=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,y=new RegExp(t.source,d+"g");while(c=a(v,y,i)){if(f=y.lastIndex,f>m&&(S(p,C(i,m,c.index)),c.length>1&&c.index<i.length&&r(_,p,g(c,1)),l=c[0].length,m=f,p.length>=o))break;y.lastIndex===c.index&&y.lastIndex++}return m===i.length?!l&&E(y,"")||S(p,""):S(p,C(i,m)),p.length>o?g(p,0,o):p}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:a(e,this,t,n)}:e,[function(e,n){var r=u(this),o=void 0==e?void 0:d(e,t);return o?a(o,e,r,n):a(i,h(r),e,n)},function(t,r){var a=c(this),o=h(t),s=n(i,a,o,r,i!==e);if(s.done)return s.value;var u=f(a,RegExp),d=a.unicode,g=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(b?"g":"y"),v=new u(b?"^(?:"+a.source+")":a,g),y=void 0===r?w:r>>>0;if(0===y)return[];if(0===o.length)return null===m(v,o)?[o]:[];var x=0,_=0,E=[];while(_<o.length){v.lastIndex=b?0:_;var I,j=m(v,b?C(o,_):o);if(null===j||(I=N(p(v.lastIndex+(b?_:0)),o.length))===x)_=l(o,_,d);else{if(S(E,C(o,x,_)),E.length===y)return E;for(var O=1;O<=j.length-1;O++)if(S(E,j[O]),E.length===y)return E;_=x=I}}return S(E,C(o,x)),E}]}),!I,b)},"14c3":function(t,e,n){var r=n("da84"),a=n("c65b"),i=n("825a"),o=n("1626"),s=n("c6b6"),c=n("9263"),u=r.TypeError;t.exports=function(t,e){var n=t.exec;if(o(n)){var r=a(n,t,e);return null!==r&&i(r),r}if("RegExp"===s(t))return a(c,t,e);throw u("RegExp#exec called on incompatible receiver")}},"189c":function(t,e,n){"use strict";n("f5a5")},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("d3b7");function r(t,e,n,r,a,i,o){try{var s=t[i](o),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var o=t.apply(e,n);function s(t){r(o,a,i,s,c,"next",t)}function c(t){r(o,a,i,s,c,"throw",t)}s(void 0)}))}}},2378:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"fade"}},[n("el-container",{staticClass:"TakeOut"},[n("el-header",[n("HeaderSearch",{attrs:{Area:t.Area,Personal:t.Personal,Search:t.Search}})],1),n("el-main",[n("div",{staticClass:"ShopSwiper"},[n("swiper",{ref:"mySwiper",attrs:{options:t.swiperOptions},scopedSlots:t._u([{key:"pagination",fn:function(){return[n("div",{staticClass:"swiper-pagination"})]},proxy:!0}])},t._l(t.swiperData,(function(e,r){return n("swiper-slide",{key:r},t._l(e,(function(t,e){return n("shop-image",{key:e,attrs:{item:t}})})),1)})),1)],1),n("div",{staticClass:"storer"},[n("div",{staticClass:"methion"},[n("i",{staticClass:"el-icon-s-shop"}),n("span",[t._v("附近商家")])]),n("div",{staticClass:"stores"},t._l(t.storeData,(function(t,e){return n("nearby-shops",{key:e,attrs:{item:t}})})),1)])])],1)],1)},a=[],i=n("1da1"),o=(n("96cf"),n("ac1f"),n("1276"),n("d3b7"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"HeaderSearch"}},[n("div",{staticClass:"search"},[n("i",{staticClass:"el-icon-search",on:{click:function(e){return t.toPath(t.Search.pathName)}}})]),n("div",{staticClass:"area"},[t._v(t._s(t.Area.area))]),n("div",{staticClass:"personal"},[n("i",{staticClass:"el-icon-user-solid",on:{click:function(e){return t.toPath(t.Personal.pathName)}}})])])}),s=[],c={name:"HeaderSearch",props:{Area:{type:Object,default:function(){return{area:"默认地区",pathName:""}}},Personal:{type:Object,default:function(){return{pathName:""}}},Search:{type:Object,default:function(){return{pathName:""}}}},data:function(){return{area:{name:"默认。"}}},methods:{toPath:function(t){this.$router.push({name:t}),this.$store.dispatch("nav/setRouteName",t)}}},u=c,f=(n("b6af"),n("2877")),l=Object(f["a"])(u,o,s,!1,null,"f6515f6a",null),p=l.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ShopImageContain",on:{click:t.toShop}},[n("div",{staticClass:"ShopImage"},[n("img",{attrs:{src:t.item.img,alt:""}}),n("p",[t._v(t._s(t.item.shopName))])])])},d=[],g={name:"ShopImage",props:{item:{type:Object,default:function(){return{shopName:"麻辣烫",img:n("bbd1"),pathName:""}}}},methods:{toShop:function(){this.$router.push({name:"GoodsCategory",query:{title:this.item.shopName,type:this.item.pathName}})}}},m=g,v=(n("07de"),Object(f["a"])(m,h,d,!1,null,"ff1d3204",null)),y=v.exports,x=n("adf5"),b={components:{HeaderSearch:p,ShopImage:y,NearbyShops:x["a"]},name:"TakeOut",data:function(){return{Area:{pathName:"",area:"默认吧"},Personal:{pathName:"personal"},Search:{pathName:"SearchMerchants"},swiperOptions:{pagination:{el:".swiper-pagination",type:"bullets",clickable:!0}},swiperData:[[{shopName:"甜品饮品",img:n("c2ae"),pathName:"1"},{shopName:"商超便利",img:n("288b"),pathName:"2"},{shopName:"美食",img:n("8791"),pathName:"3"},{shopName:"简餐",img:n("29dd"),pathName:"4"},{shopName:"新店特惠",img:n("e9f9"),pathName:"5"},{shopName:"准时达",img:n("f148"),pathName:"6"},{shopName:"预订早餐",img:n("2934"),pathName:"7"},{shopName:"土豪推荐",img:n("45ca"),pathName:"8"}],[{shopName:"川湘菜",img:n("fe02"),pathName:"9"},{shopName:"麻辣烫",img:n("bbd1"),pathName:"10"},{shopName:"包子粥店",img:n("dc8a"),pathName:"11"},{shopName:"鲜花蛋糕",img:n("55ca"),pathName:"12"},{shopName:"日韩料理",img:n("578f"),pathName:"13"},{shopName:"果蔬生鲜",img:n("2ab1"),pathName:"14"},{shopName:"汉堡薯条",img:n("36b2"),pathName:"15"},{shopName:"披萨意面",img:n("5489"),pathName:"16"}]],storeData:[]}},methods:{reSetVuxRoute:function(){var t=this.$router.history.current.fullPath,e=t.split("/")[t.split("/").length-1];this.$store.dispatch("nav/setRouteName",e)},setArea:function(){this.Area.area=this.$store.state.chageRecive.nowPosistion.area},getStoreData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,n){t.$axios.post("merchant/getStore").then((function(t){e(t.data)})).catch((function(t){console.log(t),n(null)}))}));case 2:n=e.sent,n?t.storeData=n.data:t.$message({type:"error",message:"获取商家数据失败"});case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.reSetVuxRoute(),this.setArea(),this.getStoreData()}},w=b,N=(n("7671"),Object(f["a"])(w,r,a,!1,null,"dc84d020",null));e["default"]=N.exports},"24db":function(t,e,n){},"25eb":function(t,e,n){var r=n("23e7"),a=n("c20d");r({target:"Number",stat:!0,forced:Number.parseInt!=a},{parseInt:a})},"288b":function(t,e,n){t.exports=n.p+"img/ChaoShangBianLi.0daf4223.jpeg"},2934:function(t,e,n){t.exports=n.p+"img/YuDingZaoCan.d497757f.jpeg"},"29dd":function(t,e,n){t.exports=n.p+"img/JianCan.d387bddb.jpeg"},"2ab1":function(t,e,n){t.exports=n.p+"img/GuoShuShengXian.434ea0d5.jpeg"},"36b2":function(t,e,n){t.exports=n.p+"img/HanBao.b7f43261.jpeg"},"408a":function(t,e,n){var r=n("e330");t.exports=r(1..valueOf)},"44e7":function(t,e,n){var r=n("861d"),a=n("c6b6"),i=n("b622"),o=i("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==a(t))}},"45ca":function(t,e,n){t.exports=n.p+"img/TuHaoTuiJian.e7e02b72.jpeg"},"4dae":function(t,e,n){var r=n("da84"),a=n("23cb"),i=n("07fa"),o=n("8418"),s=r.Array,c=Math.max;t.exports=function(t,e,n){for(var r=i(t),u=a(e,r),f=a(void 0===n?r:n,r),l=s(c(f-u,0)),p=0;u<f;u++,p++)o(l,p,t[u]);return l.length=p,l}},5489:function(t,e,n){t.exports=n.p+"img/PisaYimian.7b623576.jpeg"},"55ca":function(t,e,n){t.exports=n.p+"img/XianHuaDanGao.883171fd.jpeg"},"578f":function(t,e,n){t.exports=n.p+"img/RiHanLiaoLi.61a1e0f4.jpeg"},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,n){var r=n("e330"),a=n("1d80"),i=n("577e"),o=n("5899"),s=r("".replace),c="["+o+"]",u=RegExp("^"+c+c+"*"),f=RegExp(c+c+"*$"),l=function(t){return function(e){var n=i(a(e));return 1&t&&(n=s(n,u,"")),2&t&&(n=s(n,f,"")),n}};t.exports={start:l(1),end:l(2),trim:l(3)}},7156:function(t,e,n){var r=n("1626"),a=n("861d"),i=n("d2bb");t.exports=function(t,e,n){var o,s;return i&&r(o=e.constructor)&&o!==n&&a(s=o.prototype)&&s!==n.prototype&&i(t,s),t}},7671:function(t,e,n){"use strict";n("af04")},"7e2f":function(t,e,n){},8418:function(t,e,n){"use strict";var r=n("a04b"),a=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var o=r(e);o in t?a.f(t,o,i(0,n)):t[o]=n}},8791:function(t,e,n){t.exports=n.p+"img/MeiShi.b7ed1890.jpeg"},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},9263:function(t,e,n){"use strict";var r=n("c65b"),a=n("e330"),i=n("577e"),o=n("ad6d"),s=n("9f7f"),c=n("5692"),u=n("7c73"),f=n("69f3").get,l=n("fce3"),p=n("107c"),h=c("native-string-replace",String.prototype.replace),d=RegExp.prototype.exec,g=d,m=a("".charAt),v=a("".indexOf),y=a("".replace),x=a("".slice),b=function(){var t=/a/,e=/b*/g;return r(d,t,"a"),r(d,e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),w=s.BROKEN_CARET,N=void 0!==/()??/.exec("")[1],_=b||N||w||l||p;_&&(g=function(t){var e,n,a,s,c,l,p,_=this,E=f(_),S=i(t),C=E.raw;if(C)return C.lastIndex=_.lastIndex,e=r(g,C,S),_.lastIndex=C.lastIndex,e;var I=E.groups,j=w&&_.sticky,O=r(o,_),T=_.source,L=0,k=S;if(j&&(O=y(O,"y",""),-1===v(O,"g")&&(O+="g"),k=x(S,_.lastIndex),_.lastIndex>0&&(!_.multiline||_.multiline&&"\n"!==m(S,_.lastIndex-1))&&(T="(?: "+T+")",k=" "+k,L++),n=new RegExp("^(?:"+T+")",O)),N&&(n=new RegExp("^"+T+"$(?!\\s)",O)),b&&(a=_.lastIndex),s=r(d,j?n:_,k),j?s?(s.input=x(s.input,L),s[0]=x(s[0],L),s.index=_.lastIndex,_.lastIndex+=s[0].length):_.lastIndex=0:b&&s&&(_.lastIndex=_.global?s.index+s[0].length:a),N&&s&&s.length>1&&r(h,s[0],n,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(s[c]=void 0)})),s&&I)for(s.groups=l=u(null),c=0;c<I.length;c++)p=I[c],l[p[0]]=s[p[1]];return s}),t.exports=g},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(k){c=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var a=e&&e.prototype instanceof m?e:m,i=Object.create(a.prototype),o=new O(r||[]);return i._invoke=S(t,n,o),i}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(k){return{type:"throw",arg:k}}}t.wrap=u;var l="suspendedStart",p="suspendedYield",h="executing",d="completed",g={};function m(){}function v(){}function y(){}var x={};c(x,i,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(T([])));w&&w!==n&&r.call(w,i)&&(x=w);var N=y.prototype=m.prototype=Object.create(x);function _(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(a,i,o,s){var c=f(t[a],t,i);if("throw"!==c.type){var u=c.arg,l=u.value;return l&&"object"===typeof l&&r.call(l,"__await")?e.resolve(l.__await).then((function(t){n("next",t,o,s)}),(function(t){n("throw",t,o,s)})):e.resolve(l).then((function(t){u.value=t,o(u)}),(function(t){return n("throw",t,o,s)}))}s(c.arg)}var a;function i(t,r){function i(){return new e((function(e,a){n(t,r,e,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function S(t,e,n){var r=l;return function(a,i){if(r===h)throw new Error("Generator is already running");if(r===d){if("throw"===a)throw i;return L()}n.method=a,n.arg=i;while(1){var o=n.delegate;if(o){var s=C(o,n);if(s){if(s===g)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var c=f(t,e,n);if("normal"===c.type){if(r=n.done?d:p,c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=d,n.method="throw",n.arg=c.arg)}}}function C(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,C(t,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var a=f(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,g;var i=a.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function I(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function T(t){if(t){var n=t[i];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function n(){while(++a<t.length)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:L}}function L(){return{value:e,done:!0}}return v.prototype=y,c(N,"constructor",y),c(y,"constructor",v),v.displayName=c(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,s,"GeneratorFunction")),t.prototype=Object.create(N),t},t.awrap=function(t){return{__await:t}},_(E.prototype),c(E.prototype,o,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,a,i){void 0===i&&(i=Promise);var o=new E(u(e,n,r,a),i);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},_(N),c(N,s,"Generator"),c(N,i,(function(){return this})),c(N,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=T,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return s.type="throw",s.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;j(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:T(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=r}catch(a){"object"===typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},"99af":function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),i=n("d039"),o=n("e8b5"),s=n("861d"),c=n("7b0b"),u=n("07fa"),f=n("8418"),l=n("65f0"),p=n("1dde"),h=n("b622"),d=n("2d00"),g=h("isConcatSpreadable"),m=9007199254740991,v="Maximum allowed index exceeded",y=a.TypeError,x=d>=51||!i((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),b=p("concat"),w=function(t){if(!s(t))return!1;var e=t[g];return void 0!==e?!!e:o(t)},N=!x||!b;r({target:"Array",proto:!0,forced:N},{concat:function(t){var e,n,r,a,i,o=c(this),s=l(o,0),p=0;for(e=-1,r=arguments.length;e<r;e++)if(i=-1===e?o:arguments[e],w(i)){if(a=u(i),p+a>m)throw y(v);for(n=0;n<a;n++,p++)n in i&&f(s,p,i[n])}else{if(p>=m)throw y(v);f(s,p++,i)}return s.length=p,s}})},"9f7f":function(t,e,n){var r=n("d039"),a=n("da84"),i=a.RegExp,o=r((function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),s=o||r((function(){return!i("a","y").sticky})),c=o||r((function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")}));t.exports={BROKEN_CARET:c,MISSED_STICKY:s,UNSUPPORTED_Y:o}},a9e3:function(t,e,n){"use strict";var r=n("83ab"),a=n("da84"),i=n("e330"),o=n("94ca"),s=n("6eeb"),c=n("1a2d"),u=n("7156"),f=n("3a9b"),l=n("d9b5"),p=n("c04e"),h=n("d039"),d=n("241c").f,g=n("06cf").f,m=n("9bf2").f,v=n("408a"),y=n("58a8").trim,x="Number",b=a[x],w=b.prototype,N=a.TypeError,_=i("".slice),E=i("".charCodeAt),S=function(t){var e=p(t,"number");return"bigint"==typeof e?e:C(e)},C=function(t){var e,n,r,a,i,o,s,c,u=p(t,"number");if(l(u))throw N("Cannot convert a Symbol value to a number");if("string"==typeof u&&u.length>2)if(u=y(u),e=E(u,0),43===e||45===e){if(n=E(u,2),88===n||120===n)return NaN}else if(48===e){switch(E(u,1)){case 66:case 98:r=2,a=49;break;case 79:case 111:r=8,a=55;break;default:return+u}for(i=_(u,2),o=i.length,s=0;s<o;s++)if(c=E(i,s),c<48||c>a)return NaN;return parseInt(i,r)}return+u};if(o(x,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var I,j=function(t){var e=arguments.length<1?0:b(S(t)),n=this;return f(w,n)&&h((function(){v(n)}))?u(Object(e),n,j):e},O=r?d(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),T=0;O.length>T;T++)c(b,I=O[T])&&!c(j,I)&&m(j,I,g(b,I));j.prototype=w,w.constructor=j,s(a,x,j)}},ac1f:function(t,e,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},adf5:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",on:{click:t.toShop}},[n("div",{staticClass:"content"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:t.item.img,alt:""}})]),n("div",{staticClass:"msg"},[n("div",{staticClass:"first"},[n("div",{staticClass:"rowOne"},[t.item.is_brand?n("div",{staticClass:"pingPai"},[t._v("品牌")]):t._e(),n("div",{staticClass:"title"},[t._v(t._s(t.item.name))])]),n("div",{staticClass:"rowTwo"},[n("div",{staticClass:"star"},[n("i",{staticClass:"iconfont icon-star"}),n("span",[t._v(t._s(t.item.star))])]),n("div",{staticClass:"sales"},[t._v("月售"+t._s(t.item.sales)+"单")])]),n("div",{staticClass:"rowThree"},[n("div",{staticClass:"conditions"},[t._v("￥"+t._s(t.item.de_conditions)+"起送")]),n("div",{staticClass:"fenge"},[t._v("/")]),n("div",{staticClass:"shippingFee"},[t._v("配送费约"+t._s(t.item.shipping_fee)+"￥")])])]),n("div",{staticClass:"second"},[n("div",{staticClass:"rowOne"},[t.item.is_ticket?n("div",{staticClass:"isTicket"},[t._v("保准票")]):t._e()]),n("div",{staticClass:"rowTwo"},[t.item.is_hummingbird?n("div",{staticClass:"isHummingbird"},[t._v("蜂鸟专送")]):t._e(),t.item.is_ticket?n("div",{staticClass:"isTime"},[t._v("准时达")]):t._e()]),n("div",{staticClass:"rowThree"},[n("div",{staticClass:"instance"},[t._v(t._s(t.item.instance)+"公里")]),n("div",{staticClass:"xiegang"},[t._v("/")]),n("div",{staticClass:"shipping_time"},[t._v(t._s(t.shipingTime))])])])])])])},a=[],i=(n("e9c4"),n("25eb"),n("a9e3"),n("99af"),{name:"NearbyShops",props:{item:{type:Object,default:function(){return{id:1,name:"商家2",instance:111,star:4.5,de_conditions:20,is_brand:1,shipping_fee:3,shipping_time:50,sales:120,is_ticket:1,is_hummingbird:1,img:"http://localhost:5115/public/images/defalu_store.jpg"}}}},methods:{toShop:function(){var t=JSON.stringify(this.item);this.$router.push({name:"Merchant",query:{id:this.item.id,item:t}})}},computed:{shipingTime:function(){var t=this.item.shipping_time,e=Number.parseInt(t/60),n=t%60,r="".concat(e,"小时").concat(n,"分钟");return r}}}),o=i,s=(n("189c"),n("2877")),c=Object(s["a"])(o,r,a,!1,null,"48fa532e",null);e["a"]=c.exports},af04:function(t,e,n){},b6af:function(t,e,n){"use strict";n("24db")},bbd1:function(t,e,n){t.exports=n.p+"img/MaLaTang.3c7a9ef4.jpeg"},c20d:function(t,e,n){var r=n("da84"),a=n("d039"),i=n("e330"),o=n("577e"),s=n("58a8").trim,c=n("5899"),u=r.parseInt,f=r.Symbol,l=f&&f.iterator,p=/^[+-]?0x/i,h=i(p.exec),d=8!==u(c+"08")||22!==u(c+"0x16")||l&&!a((function(){u(Object(l))}));t.exports=d?function(t,e){var n=s(o(t));return u(n,e>>>0||(h(p,n)?16:10))}:u},c2ae:function(t,e,n){t.exports=n.p+"img/TianPingYinPing.235696aa.jpeg"},d784:function(t,e,n){"use strict";n("ac1f");var r=n("e330"),a=n("6eeb"),i=n("9263"),o=n("d039"),s=n("b622"),c=n("9112"),u=s("species"),f=RegExp.prototype;t.exports=function(t,e,n,l){var p=s(t),h=!o((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),d=h&&!o((function(){var e=!1,n=/a/;return"split"===t&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return e=!0,null},n[p](""),!e}));if(!h||!d||n){var g=r(/./[p]),m=e(p,""[t],(function(t,e,n,a,o){var s=r(t),c=e.exec;return c===i||c===f.exec?h&&!o?{done:!0,value:g(e,n,a)}:{done:!0,value:s(n,e,a)}:{done:!1}}));a(String.prototype,t,m[0]),a(f,p,m[1])}l&&c(f[p],"sham",!0)}},dc8a:function(t,e,n){t.exports=n.p+"img/BaoZiZhou.21724424.jpeg"},e9c4:function(t,e,n){var r=n("23e7"),a=n("da84"),i=n("d066"),o=n("2ba4"),s=n("e330"),c=n("d039"),u=a.Array,f=i("JSON","stringify"),l=s(/./.exec),p=s("".charAt),h=s("".charCodeAt),d=s("".replace),g=s(1..toString),m=/[\uD800-\uDFFF]/g,v=/^[\uD800-\uDBFF]$/,y=/^[\uDC00-\uDFFF]$/,x=function(t,e,n){var r=p(n,e-1),a=p(n,e+1);return l(v,t)&&!l(y,a)||l(y,t)&&!l(v,r)?"\\u"+g(h(t,0),16):t},b=c((function(){return'"\\udf06\\ud834"'!==f("\udf06\ud834")||'"\\udead"'!==f("\udead")}));f&&r({target:"JSON",stat:!0,forced:b},{stringify:function(t,e,n){for(var r=0,a=arguments.length,i=u(a);r<a;r++)i[r]=arguments[r];var s=o(f,null,i);return"string"==typeof s?d(s,m,x):s}})},e9f9:function(t,e,n){t.exports=n.p+"img/XinDianTeHui.afad41b0.jpeg"},f148:function(t,e,n){t.exports=n.p+"img/ZhunShiDa.3848e031.jpeg"},f5a5:function(t,e,n){},fce3:function(t,e,n){var r=n("d039"),a=n("da84"),i=a.RegExp;t.exports=r((function(){var t=i(".","s");return!(t.dotAll&&t.exec("\n")&&"s"===t.flags)}))},fe02:function(t,e,n){t.exports=n.p+"img/ChuanXiangCai.97c97008.jpeg"}}]);
//# sourceMappingURL=chunk-63a396e6.28d88f34.js.map