"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

        var GenericDomManupulations = function () {
            function GenericDomManupulations() {
                _classCallCheck(this, GenericDomManupulations);
            }

            _createClass(GenericDomManupulations, [{
                key: "_getNextSibling",
                value: function _getNextSibling(element) {
                    var original = element.original;
                }
            }]);

            return GenericDomManupulations;
        }();

        exports.GenericDomManupulations = GenericDomManupulations;

        var BrowserComment = function (_GenericDomManupulati) {
            _inherits(BrowserComment, _GenericDomManupulati);

            function BrowserComment(data) {
                _classCallCheck(this, BrowserComment);

                var _this = _possibleConstructorReturn(this, (BrowserComment.__proto__ || Object.getPrototypeOf(BrowserComment)).call(this));

                _this._isRehydrated = false;
                if (typeof data === "string") {
                    _this.original = document.createComment(data);
                } else {
                    _this._isRehydrated = true;
                    _this.original = data;
                }
                return _this;
            }

            _createClass(BrowserComment, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return this._isRehydrated;
                }
            }, {
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
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
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
        }(GenericDomManupulations);

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
                    this.parent.removeAttr(this);
                }
            }, {
                key: "setParent",
                value: function setParent(parent) {
                    this.parent = parent;
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
            function TextNode(data) {
                _classCallCheck(this, TextNode);

                this._isRehydrated = false;
                if (data instanceof Text) {
                    this.original = data;
                    this._isRehydrated = true;
                } else {
                    this.original = document.createTextNode(data);
                }
            }

            _createClass(TextNode, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return this._isRehydrated;
                }
            }, {
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

                this._isRehydrated = false;
                this.children = [];
                if (data instanceof HTMLElement) {
                    this.original = data;
                    this._isRehydrated = true;
                } else {
                    this.original = document.createElement(data);
                }
            }

            _createClass(Element, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return this._isRehydrated;
                }
            }, {
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
                    this.original.parentNode.removeChild(this.original);
                }
            }, {
                key: "setAttr",
                value: function setAttr(attribute) {
                    attribute.setParent(this);
                    this.original.setAttributeNode(attribute.getOriginal());
                    return attribute;
                }
            }, {
                key: "removeAttr",
                value: function removeAttr(attr) {
                    if (attr instanceof Attribute) {
                        this.original.removeAttributeNode(attr.getOriginal());
                    } else {
                        this.original.removeAttribute(attr);
                    }
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
                    if (!this.original.classList.contains(name)) {
                        this.original.classList.add(name);
                    }
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
                key: "toggleClass",
                value: function toggleClass(name) {
                    if (this.original.classList.contains(name)) {
                        this.original.classList.remove(name);
                    } else {
                        this.original.classList.add(name);
                    }
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
                    return this.cleanUpHTML(html);
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
            }, {
                key: "getHTML",
                value: function getHTML() {
                    var html = this.original.innerHTML;
                    return this.cleanUpHTML(html);
                }
            }, {
                key: "empty",
                value: function empty() {
                    while (this.original.firstChild) {
                        this.original.removeChild(this.original.firstChild);
                    }
                }
            }, {
                key: "cleanUpHTML",
                value: function cleanUpHTML(html) {
                    html = html.replace(/\r?\n|\r|\t/g, "");
                    html = html.replace(/\s{2,}/g, " ");
                    html = html.replace(/>\s+</g, "><");
                    html = html.replace(/\sclass=""/g, "");
                    html = html.trim();
                    return html;
                }
            }]);

            return Element;
        }();

        exports.Element = Element;
    });
    define("Server", ["require", "exports"], function (require, exports) {
        "use strict";

        var elementIDS = 0;

        var GenericDomManupulations = function () {
            function GenericDomManupulations() {
                _classCallCheck(this, GenericDomManupulations);
            }

            _createClass(GenericDomManupulations, [{
                key: "_insertAfter",
                value: function _insertAfter(element) {
                    var parent = element.getParent();
                    var children = parent.getChildren();
                    var index = children.indexOf(element);
                    if (index > -1) {
                        children.splice(index + 1, 0, this);
                    }
                }
            }, {
                key: "_insertBefore",
                value: function _insertBefore(element) {
                    var parent = element.getParent();
                    var children = parent.getChildren();
                    var index = children.indexOf(element);
                    if (index > -1) {
                        children.splice(index, 0, this);
                    }
                }
            }, {
                key: "_remove",
                value: function _remove(parent) {
                    var children = parent.getChildren();
                    if (parent) {
                        var index = children.indexOf(this);
                        if (index > -1) {
                            children.splice(index, 1);
                        }
                    }
                }
            }]);

            return GenericDomManupulations;
        }();

        exports.GenericDomManupulations = GenericDomManupulations;

        var ServerComment = function (_GenericDomManupulati2) {
            _inherits(ServerComment, _GenericDomManupulati2);

            function ServerComment(data) {
                _classCallCheck(this, ServerComment);

                var _this2 = _possibleConstructorReturn(this, (ServerComment.__proto__ || Object.getPrototypeOf(ServerComment)).call(this));

                _this2.$id = elementIDS++;
                if (typeof data === "string") {
                    _this2.value = data;
                }
                return _this2;
            }

            _createClass(ServerComment, [{
                key: "getOriginal",
                value: function getOriginal() {
                    return this;
                }
            }, {
                key: "isRehydrated",
                value: function isRehydrated() {
                    return false;
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
                    this._insertAfter(element);
                }
            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    this._insertBefore(element);
                }
            }, {
                key: "remove",
                value: function remove() {
                    this._remove(this.parent);
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
            }, {
                key: "getSource",
                value: function getSource() {
                    return "<!--" + this.value + "-->";
                }
            }]);

            return ServerComment;
        }(GenericDomManupulations);

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
                value: function remove() {
                    this.parent.removeAttr(this);
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

            return Attribute;
        }();

        exports.Attribute = Attribute;

        var TextNode = function (_GenericDomManupulati3) {
            _inherits(TextNode, _GenericDomManupulati3);

            function TextNode(value) {
                _classCallCheck(this, TextNode);

                var _this3 = _possibleConstructorReturn(this, (TextNode.__proto__ || Object.getPrototypeOf(TextNode)).call(this));

                _this3.value = value;
                return _this3;
            }

            _createClass(TextNode, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return false;
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
                value: function remove() {
                    this._remove(this.parent);
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
                    this._insertAfter(element);
                }
            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    this._insertBefore(element);
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    return this.getValue();
                }
            }]);

            return TextNode;
        }(GenericDomManupulations);

        exports.TextNode = TextNode;

        var Element = function (_GenericDomManupulati4) {
            _inherits(Element, _GenericDomManupulati4);

            function Element(name) {
                _classCallCheck(this, Element);

                var _this4 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

                _this4.$id = ++elementIDS;
                _this4.attrs = new Map();
                _this4.classNames = new Set();
                _this4.children = [];
                if (typeof name === "string") {
                    _this4.name = name;
                }
                return _this4;
            }

            _createClass(Element, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return false;
                }
            }, {
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
                key: "insertAfter",
                value: function insertAfter(element) {
                    this._insertAfter(element);
                }
            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    this._insertBefore(element);
                }
            }, {
                key: "removeChild",
                value: function removeChild(element) {
                    var index = this.children.indexOf(element);
                    if (index > -1) {
                        this.children.splice(index, 1);
                    }
                }
            }, {
                key: "remove",
                value: function remove() {
                    this.parent.removeChild(this);
                }
            }, {
                key: "setAttr",
                value: function setAttr(attribute) {
                    attribute.setParent(this);
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
                value: function addClass(name) {
                    if (!this.classNames.has(name)) {
                        this.classNames.add(name);
                    }
                }
            }, {
                key: "hasClass",
                value: function hasClass(name) {
                    return this.classNames.has(name);
                }
            }, {
                key: "removeClass",
                value: function removeClass(name) {
                    this.classNames.delete(name);
                }
            }, {
                key: "toggleClass",
                value: function toggleClass(name) {
                    if (this.classNames.has(name)) {
                        this.classNames.delete(name);
                    } else {
                        this.classNames.add(name);
                    }
                }
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
                    var clsNames = [];
                    this.classNames.forEach(function (clsName) {
                        clsNames.push(clsName);
                    });
                    if (this.classNames.size > 0) {
                        html.push(" class=\"" + clsNames.join(" ") + "\"");
                    }
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
            }, {
                key: "getHTML",
                value: function getHTML() {
                    var html = [];
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        html.push(child.getSource());
                    }
                    return html.join("");
                }
            }, {
                key: "empty",
                value: function empty() {
                    this.children = [];
                }
            }]);

            return Element;
        }(GenericDomManupulations);

        exports.Element = Element;
    });
    define("UniversalDom", ["require", "exports", "Browser", "Server"], function (require, exports, Browser_1, Server_1) {
        "use strict";

        var isBackend = typeof module !== "undefined" && module.exports && (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object";

        var UniversalDom = function () {
            function UniversalDom() {
                _classCallCheck(this, UniversalDom);
            }

            _createClass(UniversalDom, null, [{
                key: "createElement",
                value: function createElement(data) {
                    return isBackend ? new Server_1.Element(data) : new Browser_1.Element(data);
                }
            }, {
                key: "createAttribute",
                value: function createAttribute(name, value) {
                    return isBackend ? new Server_1.Attribute(name, value) : new Browser_1.Attribute(name, value);
                }
            }, {
                key: "createTextNode",
                value: function createTextNode(value) {
                    return isBackend ? new Server_1.TextNode(value) : new Browser_1.TextNode(value);
                }
            }, {
                key: "createComment",
                value: function createComment(value) {
                    return isBackend ? new Server_1.ServerComment(value) : new Browser_1.BrowserComment(value);
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