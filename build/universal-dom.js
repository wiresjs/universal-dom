(function(___env___){
/* ****** Setup ****** */
var __scope__ = ___env___.scope;
var $isBackend = ___env___.isBackend;
var __ts__ = ___env___.ts;


/* ******* undefined ******* */
__ts__.module("Common.js", function(exports, require){
"use strict";

});

/* ******* browser/Attribute.ts ******* */
__ts__.module("browser/Attribute.js", function(exports, require){
"use strict";
class Attribute {
    constructor(name, value) {
        this.original = typeof name === "string" ? document.createAttribute(name) : name;
        if (value !== undefined) {
            this.original.value = value;
        }
    }
    getName() {
        return this.original.name;
    }
    getOriginal() {
        return this.original;
    }
    setValue(value) {
        this.original.value = value;
    }
    getValue() {
        return this.original.value;
    }
    remove() {
        this.original.parentElement.removeAttribute(this.original.name);
    }
}
exports.Attribute = Attribute;

});

/* ******* browser/Element.ts ******* */
__ts__.module("browser/Element.js", function(exports, require){
"use strict";
const Attribute_1 = require("./Attribute");
class Element {
    constructor(name) {
        this.children = [];
        this.original = document.createElement(name);
    }
    getOriginal() {
        return this.original;
    }
    append(element) {
        this.original.appendChild(element.getOriginal());
    }
    appendTo(element) {
        element.getOriginal().appendChild(this.original);
    }
    prepend(element) {
        this.original.insertBefore(element.getOriginal(), this.original.firstChild);
    }
    prependTo(element) {
        element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
    }
    remove() {
        this.original.parentNode.removeChild(this.original);
    }
    setAttr(attribute) {
        this.original.setAttributeNode(attribute.getOriginal());
        return attribute;
    }
    removeAttr(attribute) {
    }
    attr(name, value) {
        if (value === undefined) {
            return this.getAttr(name);
        }
        else {
            let attr = this.getAttr(name) || this.setAttr(new Attribute_1.Attribute(name));
            attr.setValue(value);
            return attr;
        }
    }
    getAttr(name) {
        let oAttr = this.original.getAttributeNode(name);
        if (oAttr) {
            let attr = new Attribute_1.Attribute(oAttr);
            return attr;
        }
    }
    getChildren() {
        return this.children;
    }
    setChildren(elements) {
        this.children = elements;
    }
    addClass(name) {
        this.original.classList.add(name);
    }
    hasClass(name) {
        return this.original.classList.contains(name);
    }
    removeClass(name) {
        this.original.classList.remove(name);
    }
    setStyle(data, value) {
        if (typeof data === "object") {
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    this.original.style[k] = data[k];
                }
            }
            return;
        }
        return this.original.style[data] = value;
    }
    getStyle(name) {
        return this.original.style[name];
    }
}
exports.Element = Element;

});

/* ******* browser/TextNode.ts ******* */
__ts__.module("browser/TextNode.js", function(exports, require){
"use strict";
class TextNode {
    constructor(value) {
        this.original = document.createTextNode(value);
    }
    getOriginal() {
        return this.original;
    }
    setValue(value) {
        this.original.nodeValue = value;
    }
    getValue() {
        return this.original.nodeValue;
    }
    remove() {
        this.original.parentElement.removeChild(this.original);
    }
}
exports.TextNode = TextNode;

});

/* ******* UniversalDom.ts ******* */
__ts__.module("UniversalDom.js", function(exports, require){
"use strict";
const Element_1 = require("./browser/Element");
const TextNode_1 = require("./browser/TextNode");
const Attribute_1 = require("./browser/Attribute");
class UniversalDom {
    static createElement(name) {
        return new Element_1.Element(name);
    }
    static createAttribute(name, value) {
        return new Attribute_1.Attribute(name, value);
    }
    static createTextNode(value) {
        return new TextNode_1.TextNode(value);
    }
}
exports.UniversalDom = UniversalDom;

});

/* ******* index.ts ******* */
__ts__.module("index.js", function(exports, require){
"use strict";
const UniversalDom_1 = require("./UniversalDom");
exports.Dom = UniversalDom_1.UniversalDom;

});

__ts__.expose(__scope__, "index");})(function($scope, $isBackend) { var npmName = "universal-dom"; if (!$isBackend){$scope.__npm__ = $scope.__npm__ || {};if( npmName){ $scope.__npm__[npmName] = {};} }; var ts = {register: {},pathJoin: function() { var parts = []; for (var i = 0, l = arguments.length; i < l; i++) {parts = parts.concat(arguments[i].split("/")); } var newParts = []; for (i = 0, l = parts.length; i < l; i++) {var part = parts[i];if (!part || part === ".") { continue}if (part === "..") { newParts.pop();} else { newParts.push(part);} } if (parts[0] === "") {newParts.unshift("") } return newParts.join("/") || (newParts.length ? "/" : ".");},module: function(name, fn) { var _exports = {}; var relative = "./"; var rel = name.match(/^(.*)\/[\w]+\.js$/); if (rel) {relative = rel[1]; } fn(_exports, this.require.bind({self: this,path: name,relative: relative })); this.register[name] = _exports;},require: function(name) { var self = this.self; var path = this.path; var relative = this.relative; if (name[0] === ".") {var target = ts.pathJoin(relative, name) + ".js";if (self.register[target]) { return self.register[target];} } else {if( $isBackend ){ return require(name);} else { return $scope.__npm__[name];} }},expose: function(scope, path) { path = path.match(/\.js^/) ? path : path + ".js"; var e = this.register[path]; var npmExpose= !$isBackend && npmName; if (e !== undefined) {var useAmd = !$isBackend && typeof define == 'function' && define.amd;for (var key in e) { var value = e[key]; if (useAmd) {define(key, [], function() { return value;}); } else {if( npmExpose ){ $scope.__npm__[npmName][key] = value;};$scope[key] = value; }} } else {throw new Error('Module "' + path + '" Cannot be exposed! Make sure you export variables correctly and the module is present'); }} }; return {isBackend: $isBackend,scope: $scope,ts : ts }}(typeof exports !== "undefined" ? exports : this, typeof exports !== "undefined"));