"use strict";function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();!function(e,t){var n={},i=function(e,t,i){n[e]={d:t,f:i}},r=function e(i){var r=n[i];if(void 0===r)return t?require(i):(Exports.__npm__=Exports.__npm__||{},Exports.__npm__[i]);if(r.r)return r.r;r.r={};for(var a=[e,r.r],s=2;s<r.d.length;s++)a.push(e(r.d[s]));return r.f.apply(null,a),r.r};i("Common",["require","exports"],function(e,t){}),i("Browser",["require","exports"],function(e,t){var n=function(){function e(t){_classCallCheck(this,e),this._isRehydrated=!1,"string"==typeof t?this.original=document.createComment(t):(this._isRehydrated=!0,this.original=t)}return _createClass(e,[{key:"isRehydrated",value:function(){return this._isRehydrated}},{key:"getOriginal",value:function(){return this.original}},{key:"appendTo",value:function(e){e.append(this)}},{key:"prependTo",value:function(e){e.prepend(this)}},{key:"insertAfter",value:function(e){var t=e.getOriginal();t.parentNode&&t.parentNode.insertBefore(this.original,t.nextSibling)}},{key:"insertBefore",value:function(e){var t=e.getOriginal();t.parentNode&&t.parentNode.insertBefore(this.original,t)}},{key:"remove",value:function(){this.original.parentElement.removeChild(this.original)}},{key:"getParent",value:function(){if(this.original.parentNode)return new a(this.original.parentElement)}},{key:"getSource",value:function(){return"<--"+this.original.nodeValue+"-->"}}]),e}();t.BrowserComment=n;var i=function(){function e(t,n){_classCallCheck(this,e),this.original="string"==typeof t?document.createAttribute(t):t,void 0!==n&&(this.original.value=n)}return _createClass(e,[{key:"getName",value:function(){return this.original.name}},{key:"getOriginal",value:function(){return this.original}},{key:"setValue",value:function(e){this.original.value=e}},{key:"getValue",value:function(){return this.original.value}},{key:"remove",value:function(){this.parent.removeAttr(this)}},{key:"setParent",value:function(e){this.parent=e}},{key:"getParent",value:function(){return this.parent}}]),e}();t.Attribute=i;var r=function(){function e(t){_classCallCheck(this,e),this._isRehydrated=!1,t instanceof Text?(this.original=t,this._isRehydrated=!0):this.original=document.createTextNode(t)}return _createClass(e,[{key:"isRehydrated",value:function(){return this._isRehydrated}},{key:"getOriginal",value:function(){return this.original}},{key:"setValue",value:function(e){this.original.nodeValue=e}},{key:"getValue",value:function(){return this.original.nodeValue}},{key:"remove",value:function(){this.original.parentElement.removeChild(this.original)}},{key:"getParent",value:function(){return new a(this.original.parentElement)}},{key:"appendTo",value:function(e){e.append(this)}},{key:"prependTo",value:function(e){e.prepend(this)}},{key:"insertAfter",value:function(e){var t=e.getOriginal();t.parentNode&&t.parentNode.insertBefore(this.original,t.nextSibling)}},{key:"insertBefore",value:function(e){var t=e.getOriginal();t.parentNode&&t.parentNode.insertBefore(this.original,t)}},{key:"getSource",value:function(){return this.getValue()}}]),e}();t.TextNode=r;var a=function(){function e(t){_classCallCheck(this,e),this._isRehydrated=!1,this.children=[],t instanceof HTMLElement?(this.original=t,this._isRehydrated=!0):this.original=document.createElement(t)}return _createClass(e,[{key:"isRehydrated",value:function(){return this._isRehydrated}},{key:"getOriginal",value:function(){return this.original}},{key:"append",value:function(e){this.original.appendChild(e.getOriginal())}},{key:"appendTo",value:function(e){e.getOriginal().appendChild(this.original)}},{key:"prepend",value:function(e){this.original.insertBefore(e.getOriginal(),this.original.firstChild)}},{key:"prependTo",value:function(e){e.getOriginal().insertBefore(this.original,e.getOriginal().firstChild)}},{key:"insertAfter",value:function(e){var t=e.getOriginal();t.parentNode&&t.parentNode.insertBefore(this.original,t.nextSibling)}},{key:"insertBefore",value:function(e){var t=e.getOriginal();t.parentNode&&t.parentNode.insertBefore(this.original,t)}},{key:"remove",value:function(){this.original.parentNode.removeChild(this.original)}},{key:"setAttr",value:function(e){return e.setParent(this),this.original.setAttributeNode(e.getOriginal()),e}},{key:"removeAttr",value:function(e){e instanceof i?this.original.removeAttributeNode(e.getOriginal()):this.original.removeAttribute(e)}},{key:"attr",value:function e(t,n){if(void 0===n)return this.getAttr(t);var e=this.getAttr(t)||this.setAttr(new i(t));return e.setValue(n),e}},{key:"getAttr",value:function(e){var t=this.original.getAttributeNode(e);if(t){var n=new i(t);return n}}},{key:"getChildren",value:function(){for(var t=this.original.childNodes,i=[],a=0;a<t.length;a++){var s=t[a];1===s.nodeType&&i.push(new e(s)),8===s.nodeType&&i.push(new n(s)),3===s.nodeType&&s.nodeValue&&i.push(new r(s))}return i}},{key:"setChildren",value:function(e){this.children=e}},{key:"addClass",value:function(e){this.original.classList.contains(e)||this.original.classList.add(e)}},{key:"hasClass",value:function(e){return this.original.classList.contains(e)}},{key:"removeClass",value:function(e){this.original.classList.remove(e)}},{key:"toggleClass",value:function(e){this.original.classList.contains(e)?this.original.classList.remove(e):this.original.classList.add(e)}},{key:"setStyle",value:function(e,t){if("object"!==("undefined"==typeof e?"undefined":_typeof(e)))return this.original.style[e]=t;for(var n in e)e.hasOwnProperty(n)&&(this.original.style[n]=e[n])}},{key:"getStyle",value:function(e){return this.original.style[e]}},{key:"getSource",value:function(){var e=this.original.outerHTML;return e=e.replace(/\r?\n|\r|\t/g,""),e=e.replace(/\s{2,}/g," "),e=e.replace(/>\s+</g,"><"),e=e.replace(/\sclass=""/g,""),e=e.trim()}},{key:"getParent",value:function(){var t=this.original.parentElement;return new e(t)}},{key:"eachChild",value:function(t){for(var n=this.original.childNodes,i=0;i<n.length;i++){var r=n[i];t(new e(r),i)}}},{key:"empty",value:function(){for(;this.original.firstChild;)this.original.removeChild(this.original.firstChild)}}]),e}();t.Element=a}),i("Server",["require","exports"],function(e,t){var n=0,i=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"_insertAfter",value:function(e){var t=e.getParent(),n=t.getChildren(),i=n.indexOf(e);i>-1&&n.splice(i+1,0,this)}},{key:"_insertBefore",value:function(e){var t=e.getParent(),n=t.getChildren(),i=n.indexOf(e);i>-1&&n.splice(i,0,this)}},{key:"_remove",value:function(e){var t=e.getChildren();if(e){var n=t.indexOf(this);n>-1&&t.splice(n,1)}}}]),e}();t.GenericDomManupulations=i;var r=function(e){function t(e){_classCallCheck(this,t);var i=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.$id=n++,"string"==typeof e&&(i.value=e),i}return _inherits(t,e),_createClass(t,[{key:"getOriginal",value:function(){return this}},{key:"isRehydrated",value:function(){return!1}},{key:"appendTo",value:function(e){e.append(this)}},{key:"prependTo",value:function(e){e.prepend(this)}},{key:"insertAfter",value:function(e){this._insertAfter(e)}},{key:"insertBefore",value:function(e){this._insertBefore(e)}},{key:"remove",value:function(){this._remove(this.parent)}},{key:"setParent",value:function(e){this.parent=e}},{key:"getParent",value:function(){return this.parent}},{key:"getSource",value:function(){return"<!--"+this.value+"-->"}}]),t}(i);t.ServerComment=r;var a=function(){function e(t,n){_classCallCheck(this,e),"string"==typeof t&&(this.name=t),void 0!==n&&(this.value=n)}return _createClass(e,[{key:"getName",value:function(){return this.name}},{key:"getOriginal",value:function(){return this.value}},{key:"setValue",value:function(e){this.value=e}},{key:"getValue",value:function(){return this.value}},{key:"remove",value:function(){this.parent.removeAttr(this)}},{key:"setParent",value:function(e){this.parent=e}},{key:"getParent",value:function(){return this.parent}}]),e}();t.Attribute=a;var s=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.value=e,n}return _inherits(t,e),_createClass(t,[{key:"isRehydrated",value:function(){return!1}},{key:"getOriginal",value:function(){return this.value}},{key:"setValue",value:function(e){this.value=e}},{key:"getValue",value:function(){return this.value}},{key:"remove",value:function(){this._remove(this.parent)}},{key:"setParent",value:function(e){this.parent=e}},{key:"getParent",value:function(){return this.parent}},{key:"appendTo",value:function(e){e.append(this)}},{key:"prependTo",value:function(e){e.prepend(this)}},{key:"insertAfter",value:function(e){this._insertAfter(e)}},{key:"insertBefore",value:function(e){this._insertBefore(e)}},{key:"getSource",value:function(){return this.getValue()}}]),t}(i);t.TextNode=s;var o=function(e){function t(e){_classCallCheck(this,t);var i=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.$id=++n,i.attrs=new Map,i.classNames=new Set,i.children=[],"string"==typeof e&&(i.name=e),i}return _inherits(t,e),_createClass(t,[{key:"isRehydrated",value:function(){return!1}},{key:"getOriginal",value:function(){}},{key:"append",value:function(e){var t=e;t.setParent(this),this.children.push(t)}},{key:"appendTo",value:function(e){var t=e;t.append(this)}},{key:"prepend",value:function(e){e.setParent(this),this.children.splice(0,0,e)}},{key:"prependTo",value:function(e){var t=e;t.prepend(this)}},{key:"insertAfter",value:function(e){this._insertAfter(e)}},{key:"insertBefore",value:function(e){this._insertBefore(e)}},{key:"removeChild",value:function(e){var t=this.children.indexOf(e);t>-1&&this.children.splice(t,1)}},{key:"remove",value:function(){this.parent.removeChild(this)}},{key:"setAttr",value:function(e){return e.setParent(this),this.attrs.set(e.getName(),e),e}},{key:"removeAttr",value:function(e){this.attrs.delete(e.getName())}},{key:"attr",value:function e(t,n){if(void 0===n)return this.getAttr(t);var e=this.getAttr(t)||this.setAttr(new a(t));return e.setValue(n),e}},{key:"getAttr",value:function(e){return this.attrs.get(e)}},{key:"getChildren",value:function(){return this.children}},{key:"eachChild",value:function(e){for(var t=0;t<this.children.length;t++)e(this.children[t],t)}},{key:"setChildren",value:function(e){this.children=e}},{key:"addClass",value:function(e){this.classNames.has(e)||this.classNames.add(e)}},{key:"hasClass",value:function(e){return this.classNames.has(e)}},{key:"removeClass",value:function(e){this.classNames.delete(e)}},{key:"toggleClass",value:function(e){this.classNames.has(e)?this.classNames.delete(e):this.classNames.add(e)}},{key:"setStyle",value:function(e,t){}},{key:"getStyle",value:function(e){return""}},{key:"getSource",value:function(){var e=[];e.push("<"+this.name);var t=[];this.attrs.forEach(function(e){t.push(e.getName()+'="'+(e.getValue()||"")+'"')});var n=[];this.classNames.forEach(function(e){n.push(e)}),this.classNames.size>0&&e.push(' class="'+n.join(" ")+'"'),t.length&&e.push(" "+t.join(" ")),e.push(">");for(var i=0;i<this.children.length;i++){var r=this.children[i];e.push(r.getSource())}return e.push("</"+this.name+">"),e.join("")}},{key:"setParent",value:function(e){this.parent=e}},{key:"getParent",value:function(){return this.parent}},{key:"empty",value:function(){this.children=[]}}]),t}(i);t.Element=o}),i("UniversalDom",["require","exports","Browser","Server"],function(e,n,i,r){var a=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"createElement",value:function(e){return t?new r.Element(e):new i.Element(e)}},{key:"createAttribute",value:function(e,n){return t?new r.Attribute(e,n):new i.Attribute(e,n)}},{key:"createTextNode",value:function(e){return t?new r.TextNode(e):new i.TextNode(e)}},{key:"createComment",value:function(e){return t?new r.ServerComment(e):new i.BrowserComment(e)}}]),e}();n.UniversalDom=a}),i("index",["require","exports","UniversalDom"],function(e,t,n){t.Dom=n.UniversalDom});var a=function(i,a,s,o){var u,l=r(i);if(!t){var c=e.__npm__=e.__npm__||{};a&&(u=c[a])}var h=o?o.split(","):[];if(h.length)for(var f in n)for(var v=0;v<h.length;v++)0===f.indexOf(h[v])&&r(f);for(var p in l)t||s?e[p]=l[p]:null,u?u[l]=l[p]:null};a("index","universal-dom",!0,"")}("undefined"!=typeof exports?exports:this,"undefined"!=typeof exports);