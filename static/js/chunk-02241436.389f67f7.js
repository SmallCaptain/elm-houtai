(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02241436"],{"0418":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"Header"}},[r("div",{staticClass:"goBack"},[r("i",{staticClass:"el-icon-arrow-left",on:{click:t.toBack}})]),r("div",{staticClass:"fucName"},[t._v(" "+t._s(t.fucName)+" ")]),r("div",{staticClass:"none"}),t._t("editSlot")],2)},o=[],i={name:"Header",props:{fucName:{type:String,default:"无"}},methods:{toBack:function(){this.$router.go(-1)}}},a=i,c=(r("0ec5"),r("2877")),s=Object(c["a"])(a,n,o,!1,null,"201bfd57",null);e["a"]=s.exports},"052c":function(t,e,r){},"0b42":function(t,e,r){var n=r("da84"),o=r("e8b5"),i=r("68ee"),a=r("861d"),c=r("b622"),s=c("species"),u=n.Array;t.exports=function(t){var e;return o(t)&&(e=t.constructor,i(e)&&(e===u||o(e.prototype))?e=void 0:a(e)&&(e=e[s],null===e&&(e=void 0))),void 0===e?u:e}},"0ec5":function(t,e,r){"use strict";r("f94f")},"159b":function(t,e,r){var n=r("da84"),o=r("fdbc"),i=r("785a"),a=r("17c2"),c=r("9112"),s=function(t){if(t&&t.forEach!==a)try{c(t,"forEach",a)}catch(e){t.forEach=a}};for(var u in o)o[u]&&s(n[u]&&n[u].prototype);s(i)},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,o=r("a640"),i=o("forEach");t.exports=i?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}},"1dde":function(t,e,r){var n=r("d039"),o=r("b622"),i=r("2d00"),a=o("species");t.exports=function(t){return i>=51||!n((function(){var e=[],r=e.constructor={};return r[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"2f0f":function(t,e,r){"use strict";r("e9a4")},"4ac9":function(t,e,r){"use strict";r("5101")},"4de4":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").filter,i=r("1dde"),a=i("filter");n({target:"Array",proto:!0,forced:!a},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},5101:function(t,e,r){},5678:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"JumpToFunc"},[t._t("methion"),r("div",{staticClass:"container",on:{click:function(e){return t.toPath(t.funcData.pathName)}}},[""!==t.funcData.icon?r("i",{class:t.funcData.icon,style:{color:t.funcData.color},attrs:{id:"icon"}}):t._e(),r("span",[t._v(t._s(t.funcData.funcName))]),t._t("username"),r("i",{staticClass:"el-icon-arrow-right",attrs:{id:"jump"}})],2)],2)},o=[],i={name:"JumpToFunc",props:{funcData:{type:Object,default:function(){return{icon:"",funcName:"无数据",pathName:"无数据",color:"rgb(102, 102, 102)"}}}},methods:{toPath:function(t){this.$router.push({name:t})}}},a=i,c=(r("2f0f"),r("2877")),s=Object(c["a"])(a,n,o,!1,null,"fba7f206",null);e["a"]=s.exports},"65f0":function(t,e,r){var n=r("0b42");t.exports=function(t,e){return new(n(t))(0===e?0:e)}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(C){s=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new N(n||[]);return i._invoke=k(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(C){return{type:"throw",arg:C}}}t.wrap=u;var l="suspendedStart",h="suspendedYield",d="executing",p="completed",v={};function m(){}function y(){}function g(){}var w={};s(w,i,(function(){return this}));var _=Object.getPrototypeOf,b=_&&_(_(I([])));b&&b!==r&&n.call(b,i)&&(w=b);var x=g.prototype=m.prototype=Object.create(w);function E(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,i,a,c){var s=f(t[o],t,i);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(l).then((function(t){u.value=t,a(u)}),(function(t){return r("throw",t,a,c)}))}c(s.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function k(t,e,r){var n=l;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return O()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var c=A(a,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var s=f(t,e,r);if("normal"===s.type){if(n=r.done?p:h,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=p,r.method="throw",r.arg=s.arg)}}}function A(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,A(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=f(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function I(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:O}}function O(){return{value:e,done:!0}}return y.prototype=g,s(x,"constructor",g),s(g,"constructor",y),y.displayName=s(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},E(L.prototype),s(L.prototype,a,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(x),s(x,c,"Generator"),s(x,i,(function(){return this})),s(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=I,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:I(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},a0e1:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-container",{attrs:{id:"receiveAdressChage"}},[r("el-header",[r("Header",{attrs:{fucName:t.func.funcName},scopedSlots:t._u([{key:"editSlot",fn:function(){return[r("p",{staticClass:"editSlot",on:{click:t.edit}},[t._v(t._s(t.editSlot.name))])]},proxy:!0}])})],1),r("el-main",[r("div",{staticClass:"havAddress"},[r("ul",t._l(t.addressDetail,(function(e,n){return r("recive-address",{key:n,attrs:{addressDetail:e,delFlag:t.editSlot.on},on:{deleAddressItem:t.deleAddressItem}})})),1)]),r("jump-to-func",{staticClass:"addAddress",attrs:{funcData:t.assectInfo[0]}})],1)],1)},o=[],i=r("1da1"),a=(r("96cf"),r("b0c0"),r("d3b7"),r("159b"),r("4de4"),r("0418")),c=r("5678"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("li",{staticClass:"msg"},[r("div",{staticClass:"msgContain"},[r("p",{staticClass:"detailAddress"},[t._v(t._s(t.addressDetail.recive_area_detail))]),r("p",{staticClass:"phone"},[t._v(t._s(t.addressDetail.use_phone))])]),t.delFlag?t._e():r("span",{on:{click:t.delItem}},[t._v("x")])])},u=[],f={name:"reciveAddress",props:{addressDetail:{type:Object,default:function(){return{recive_area_detail:"无",use_phone:"默认"}}},delFlag:{type:Boolean,default:!0}},methods:{delItem:function(){this.$emit("deleAddressItem",this.addressDetail.recive_area_detail)}}},l=f,h=(r("4ac9"),r("2877")),d=Object(h["a"])(l,s,u,!1,null,"d4e3455c",null),p=d.exports,v={components:{Header:a["a"],JumpToFunc:c["a"],ReciveAddress:p},name:"receiveAdressChage",data:function(){return{func:{funcName:"编辑地址"},assectInfo:[{icon:"",funcName:"新增地址",pathName:"addNewAddress",color:"rgb(102, 102, 102)"}],editSlot:{name:"编辑",on:!0},addressDetail:[],delItem:[]}},methods:{edit:function(){var t=this;this.editSlot.on=!this.editSlot.on,!1===this.editSlot.on?this.editSlot.name="完成":this.editSlot.name="修改",!0===this.editSlot.on&&0!==this.delItem.length&&this.$axios.post("user/delItem",this.delItem).then((function(e){console.log(e),200===e.data.status?t.$message({type:"success",message:"修改成功~"}):(t.$message({type:"error",message:"修改失败了~"}),t.$router.go(0))})).catch((function(e){console.log(e),t.$message({type:"error",message:"修改失败了~"})}))},checkReciveAddress:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,r){t.$axios.post("/user/getAddress").then((function(t){e(t.data)})).catch((function(t){console.log(t),r(null)}))}));case 2:r=e.sent,r?0!==r.length&&(n=[],r.forEach((function(t){var e={};e["recive_area"]=t["recive_area"],e["recive_area_detail"]=t["recive_area_detail"],e["recive_name"]=t["recive_name"],e["use_phone"]=t["use_phone"],n.push(e)})),console.log(r),t.$store.dispatch("chageRecive/pushAddress",r),t.addressDetail=r):t.$message({type:"error",message:"网络错误。。"});case 4:case"end":return e.stop()}}),e)})))()},deleAddressItem:function(t){var e=this;console.log(t);var r=this.addressDetail.filter((function(r){return t!==r.recive_area_detail||(e.delItem.push(r),!1)}));this.addressDetail=r}},created:function(){this.checkReciveAddress()},beforeRouteEnter:function(t,e,r){var n=sessionStorage.getItem("mine")?JSON.parse(sessionStorage.getItem("mine")).chageRecive.nowPosistion.areaId:"";""!==n?r():(alert("定位还没有成功。。请先等待哦。。"),window.history.back())}},m=v,y=(r("bf67"),Object(h["a"])(m,n,o,!1,null,"8ddf895e",null));e["default"]=y.exports},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){return 1},1)}))}},b727:function(t,e,r){var n=r("0366"),o=r("e330"),i=r("44ad"),a=r("7b0b"),c=r("07fa"),s=r("65f0"),u=o([].push),f=function(t){var e=1==t,r=2==t,o=3==t,f=4==t,l=6==t,h=7==t,d=5==t||l;return function(p,v,m,y){for(var g,w,_=a(p),b=i(_),x=n(v,m),E=c(b),L=0,k=y||s,A=e?k(p,E):r||h?k(p,0):void 0;E>L;L++)if((d||L in b)&&(g=b[L],w=x(g,L,_),t))if(e)A[L]=w;else if(w)switch(t){case 3:return!0;case 5:return g;case 6:return L;case 2:u(A,g)}else switch(t){case 4:return!1;case 7:u(A,g)}return l?-1:o||f?f:A}};t.exports={forEach:f(0),map:f(1),filter:f(2),some:f(3),every:f(4),find:f(5),findIndex:f(6),filterReject:f(7)}},bf67:function(t,e,r){"use strict";r("052c")},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}},e9a4:function(t,e,r){},f94f:function(t,e,r){}}]);
//# sourceMappingURL=chunk-02241436.389f67f7.js.map