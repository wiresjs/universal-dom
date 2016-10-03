"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($__exports__, $isBackend) {
    var __local__ = {};var define = function define(n, d, f) {
        __local__[n] = { d: d, f: f };
    };var __resolve__ = function __resolve__(name) {
        var m = __local__[name];if (m === undefined) {
            if ($isBackend) {
                return require(name);
            } else {
                Exports.__npm__ = Exports.__npm__ || {};return Exports.__npm__[name];
            }
        }if (m.r) {
            return m.r;
        }m.r = {};var z = [__resolve__, m.r];for (var i = 2; i < m.d.length; i++) {
            z.push(__resolve__(m.d[i]));
        }m.f.apply(null, z);return m.r;
    };
    define("Common", ["require", "exports"], function (require, exports) {});
    define("Browser", ["require", "exports"], function (require, exports) {
        "use strict";

        var BrowserComment = function () {
            function BrowserComment(data) {
                _classCallCheck(this, BrowserComment);

                if (typeof data === "string") {
                    this.original = document.createComment(data);
                } else {
                    this.original = data;
                }
            }

            _createClass(BrowserComment, [{
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.append(this);
                }
            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.prepend(this);
                }
            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentElement.removeChild(this.original);
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    if (this.original.parentNode) {
                        return new Element(this.original.parentElement);
                    }
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    return "<--" + this.original.nodeValue + "-->";
                }
            }]);

            return BrowserComment;
        }();

        exports.BrowserComment = BrowserComment;

        var Attribute = function () {
            function Attribute(name, value) {
                _classCallCheck(this, Attribute);

                this.original = typeof name === "string" ? document.createAttribute(name) : name;
                if (value !== undefined) {
                    this.original.value = value;
                }
            }

            _createClass(Attribute, [{
                key: "getName",
                value: function getName() {
                    return this.original.name;
                }
            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.original.value = value;
                }
            }, {
                key: "getValue",
                value: function getValue() {
                    return this.original.value;
                }
            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentElement.removeAttribute(this.original.name);
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    return new Element(this.original.parentElement);
                }
            }]);

            return Attribute;
        }();

        exports.Attribute = Attribute;

        var TextNode = function () {
            function TextNode(data) {
                _classCallCheck(this, TextNode);

                if (data instanceof Text) {
                    this.original = data;
                } else {
                    this.original = document.createTextNode(data);
                }
            }

            _createClass(TextNode, [{
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.original.nodeValue = value;
                }
            }, {
                key: "getValue",
                value: function getValue() {
                    return this.original.nodeValue;
                }
            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentElement.removeChild(this.original);
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    return new Element(this.original.parentElement);
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    return this.getValue();
                }
            }]);

            return TextNode;
        }();

        exports.TextNode = TextNode;

        var Element = function () {
            function Element(data) {
                _classCallCheck(this, Element);

                this.children = [];
                if (data instanceof HTMLElement) {
                    this.original = data;
                } else {
                    this.original = document.createElement(data);
                }
            }

            _createClass(Element, [{
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
            }, {
                key: "append",
                value: function append(element) {
                    this.original.appendChild(element.getOriginal());
                }
            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.getOriginal().appendChild(this.original);
                }
            }, {
                key: "prepend",
                value: function prepend(element) {
                    this.original.insertBefore(element.getOriginal(), this.original.firstChild);
                }
            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
                }
            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentNode.removeChild(this.original);
                }
            }, {
                key: "setAttr",
                value: function setAttr(attribute) {
                    this.original.setAttributeNode(attribute.getOriginal());
                    return attribute;
                }
            }, {
                key: "removeAttr",
                value: function removeAttr(attribute) {}
            }, {
                key: "attr",
                value: function attr(name, value) {
                    if (value === undefined) {
                        return this.getAttr(name);
                    } else {
                        var attr = this.getAttr(name) || this.setAttr(new Attribute(name));
                        attr.setValue(value);
                        return attr;
                    }
                }
            }, {
                key: "getAttr",
                value: function getAttr(name) {
                    var oAttr = this.original.getAttributeNode(name);
                    if (oAttr) {
                        var attr = new Attribute(oAttr);
                        return attr;
                    }
                }
            }, {
                key: "getChildren",
                value: function getChildren() {
                    var childNodes = this.original.childNodes;
                    var result = [];
                    for (var i = 0; i < childNodes.length; i++) {
                        var node = childNodes[i];
                        if (node.nodeType === 1) {
                            result.push(new Element(node));
                        }
                        if (node.nodeType === 8) {
                            result.push(new BrowserComment(node));
                        }
                        if (node.nodeType === 3) {
                            if (node.nodeValue) {
                                result.push(new TextNode(node));
                            }
                        }
                    }
                    return result;
                }
            }, {
                key: "setChildren",
                value: function setChildren(elements) {
                    this.children = elements;
                }
            }, {
                key: "addClass",
                value: function addClass(name) {
                    this.original.classList.add(name);
                }
            }, {
                key: "hasClass",
                value: function hasClass(name) {
                    return this.original.classList.contains(name);
                }
            }, {
                key: "removeClass",
                value: function removeClass(name) {
                    this.original.classList.remove(name);
                }
            }, {
                key: "setStyle",
                value: function setStyle(data, value) {
                    if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
                        for (var k in data) {
                            if (data.hasOwnProperty(k)) {
                                this.original.style[k] = data[k];
                            }
                        }
                        return;
                    }
                    return this.original.style[data] = value;
                }
            }, {
                key: "getStyle",
                value: function getStyle(name) {
                    return this.original.style[name];
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    var html = this.original.outerHTML;
                    html = html.replace(/\r?\n|\r|\t/g, '');
                    html = html.replace(/\s{2,}/g, " ");
                    html = html.replace(/>\s+</g, "><");
                    html = html.trim();
                    return html;
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    var parent = this.original.parentElement;
                    return new Element(parent);
                }
            }, {
                key: "eachChild",
                value: function eachChild(closure) {
                    var childNodes = this.original.childNodes;
                    for (var i = 0; i < childNodes.length; i++) {
                        var el = childNodes[i];
                        closure(new Element(el), i);
                    }
                }
            }]);

            return Element;
        }();

        exports.Element = Element;
    });
    define("Server", ["require", "exports"], function (require, exports) {
        "use strict";

        var elementIDS = 0;

        var ServerComment = function () {
            function ServerComment(data) {
                _classCallCheck(this, ServerComment);

                this.$id = elementIDS++;
                if (typeof data === "string") {
                    this.value = data;
                }
            }

            _createClass(ServerComment, [{
                key: "getOriginal",
                value: function getOriginal() {}
            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.append(this);
                }
            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.prepend(this);
                }
            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    var parent = element.getParent();
                    parent.eachChild(function (child) {});
                }
            }, {
                key: "insertBefore",
                value: function insertBefore(element) {}
            }, {
                key: "remove",
                value: function remove() {
                    var _this = this;

                    var parent = this.parent;
                    var children = parent.getChildren();
                    if (parent) {
                        parent.eachChild(function (child, index) {
                            if (child === _this) {
                                children.splice(index, 1);
                            }
                        });
                    }
                }
            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    return null;
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    return "<!--" + this.value + "-->";
                }
            }]);

            return ServerComment;
        }();

        exports.ServerComment = ServerComment;

        var Attribute = function () {
            function Attribute(name, value) {
                _classCallCheck(this, Attribute);

                if (typeof name === "string") {
                    this.name = name;
                }
                if (value !== undefined) {
                    this.value = value;
                }
            }

            _createClass(Attribute, [{
                key: "getName",
                value: function getName() {
                    return this.name;
                }
            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.value;
                }
            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.value = value;
                }
            }, {
                key: "getValue",
                value: function getValue() {
                    return this.value;
                }
            }, {
                key: "remove",
                value: function remove() {}
            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
            }]);

            return Attribute;
        }();

        exports.Attribute = Attribute;

        var TextNode = function () {
            function TextNode(value) {
                _classCallCheck(this, TextNode);

                this.value = value;
            }

            _createClass(TextNode, [{
                key: "getOriginal",
                value: function getOriginal() {
                    return this.value;
                }
            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.value = value;
                }
            }, {
                key: "getValue",
                value: function getValue() {
                    return this.value;
                }
            }, {
                key: "remove",
                value: function remove() {}
            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    return this.getValue();
                }
            }]);

            return TextNode;
        }();

        exports.TextNode = TextNode;

        var Element = function () {
            function Element(name) {
                _classCallCheck(this, Element);

                this.$id = ++elementIDS;
                this.attrs = new Map();
                this.children = [];
                if (typeof name === "string") {
                    this.name = name;
                }
            }

            _createClass(Element, [{
                key: "getOriginal",
                value: function getOriginal() {}
            }, {
                key: "append",
                value: function append(element) {
                    var el = element;
                    el.setParent(this);
                    this.children.push(el);
                }
            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    var el = element;
                    el.append(this);
                }
            }, {
                key: "prepend",
                value: function prepend(element) {
                    element.setParent(this);
                    this.children.splice(0, 0, element);
                }
            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    var el = element;
                    el.prepend(this);
                }
            }, {
                key: "removeChild",
                value: function removeChild(element) {
                    var _this2 = this;

                    this.children.forEach(function (item, index) {
                        var child = item;
                        if (child.$id === element.$id) {
                            _this2.children.splice(index, 1);
                        }
                    });
                }
            }, {
                key: "remove",
                value: function remove() {
                    this.parent.removeChild(this);
                }
            }, {
                key: "setAttr",
                value: function setAttr(attribute) {
                    this.attrs.set(attribute.getName(), attribute);
                    return attribute;
                }
            }, {
                key: "removeAttr",
                value: function removeAttr(attribute) {
                    this.attrs.delete(attribute.getName());
                }
            }, {
                key: "attr",
                value: function attr(name, value) {
                    if (value === undefined) {
                        return this.getAttr(name);
                    } else {
                        var attr = this.getAttr(name) || this.setAttr(new Attribute(name));
                        attr.setValue(value);
                        return attr;
                    }
                }
            }, {
                key: "getAttr",
                value: function getAttr(name) {
                    return this.attrs.get(name);
                }
            }, {
                key: "getChildren",
                value: function getChildren() {
                    return this.children;
                }
            }, {
                key: "eachChild",
                value: function eachChild(closure) {
                    for (var i = 0; i < this.children.length; i++) {
                        closure(this.children[i], i);
                    }
                }
            }, {
                key: "setChildren",
                value: function setChildren(elements) {
                    this.children = elements;
                }
            }, {
                key: "addClass",
                value: function addClass(name) {}
            }, {
                key: "hasClass",
                value: function hasClass(name) {
                    return false;
                }
            }, {
                key: "removeClass",
                value: function removeClass(name) {}
            }, {
                key: "setStyle",
                value: function setStyle(data, value) {}
            }, {
                key: "getStyle",
                value: function getStyle(name) {
                    return "";
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    var html = [];
                    html.push("<" + this.name);
                    var localAttrs = [];
                    this.attrs.forEach(function (attr) {
                        localAttrs.push(attr.getName() + "=\"" + (attr.getValue() || "") + "\"");
                    });
                    if (localAttrs.length) {
                        html.push(" " + localAttrs.join(" "));
                    }
                    html.push(">");
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        html.push(child.getSource());
                    }
                    html.push("</" + this.name + ">");
                    return html.join("");
                }
            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
            }]);

            return Element;
        }();

        exports.Element = Element;
    });
    define("UniversalDom", ["require", "exports", "Browser", "Server"], function (require, exports, Browser_1, Server_1) {
        "use strict";

        var UniversalDom = function () {
            function UniversalDom() {
                _classCallCheck(this, UniversalDom);
            }

            _createClass(UniversalDom, null, [{
                key: "createElement",
                value: function createElement(data) {
                    return $isBackend ? new Server_1.Element(data) : new Browser_1.Element(data);
                }
            }, {
                key: "createAttribute",
                value: function createAttribute(name, value) {
                    return $isBackend ? new Server_1.Attribute(name, value) : new Browser_1.Attribute(name, value);
                }
            }, {
                key: "createTextNode",
                value: function createTextNode(value) {
                    return $isBackend ? new Server_1.TextNode(value) : new Browser_1.TextNode(value);
                }
            }, {
                key: "createComment",
                value: function createComment(value) {
                    return $isBackend ? new Server_1.ServerComment(value) : new Browser_1.BrowserComment(value);
                }
            }]);

            return UniversalDom;
        }();

        exports.UniversalDom = UniversalDom;
    });
    define("index", ["require", "exports", "UniversalDom"], function (require, exports, UniversalDom_1) {
        "use strict";

        exports.Dom = UniversalDom_1.UniversalDom;
    });

    var __expose__ = function __expose__(n, m, w, c) {
        var e = __resolve__(n);
        var bc;
        if (!$isBackend) {
            var npm = $__exports__.__npm__ = $__exports__.__npm__ || {};if (m) {
                bc = npm[m];
            }
        }
        var cs = c ? c.split(",") : [];
        if (cs.length) {
            for (var ln in __local__) {
                for (var i = 0; i < cs.length; i++) {
                    if (ln.indexOf(cs[i]) === 0) {
                        __resolve__(ln);
                    }
                }
            }
        }
        for (var k in e) {
            $isBackend || w ? $__exports__[k] = e[k] : null;
            bc ? bc[e] = e[k] : null;
        }
    };
    __expose__("index", "universal-dom", true, "");
})(typeof exports !== "undefined" ? exports : this, typeof exports !== "undefined");