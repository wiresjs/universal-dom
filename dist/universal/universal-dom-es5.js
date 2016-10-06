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
                $__exports__.__npm__ = $__exports__.__npm__ || {};return $__exports__.__npm__[name];
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
        /**
         *
         *
         * @param {*} node
         * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
         */

        var mapNodeObject = function mapNodeObject(node) {
            if (!node) {
                return;
            }
            if (node.nodeType === 1) {
                return new Element(node);
            }
            if (node.nodeType === 8) {
                return new BrowserComment(node);
            }
            if (node.nodeType === 3) {
                return new TextNode(node);
            }
        };
        /**
         *
         *
         * @export
         * @class GenericDomManupulations
         */

        var GenericDomManupulations = function () {
            function GenericDomManupulations() {
                _classCallCheck(this, GenericDomManupulations);
            }

            _createClass(GenericDomManupulations, [{
                key: "_getNextSibling",

                /**
                 *
                 *
                 * @protected
                 * @param {*} element
                 * @returns {*}
                 *
                 * @memberOf GenericDomManupulations
                 */
                value: function _getNextSibling(element) {
                    var original = element.original;
                    return mapNodeObject(original.nextSibling);
                }
                /**
                 *
                 *
                 * @protected
                 * @param {*} element
                 * @returns {*}
                 *
                 * @memberOf GenericDomManupulations
                 */

            }, {
                key: "_getPreviousSibling",
                value: function _getPreviousSibling(element) {
                    var original = element.original;
                    return mapNodeObject(original.previousSibling);
                }
            }]);

            return GenericDomManupulations;
        }();

        exports.GenericDomManupulations = GenericDomManupulations;
        /**
         *
         *
         * @export
         * @class BrowserComment
         * @extends {GenericDomManupulations}
         * @implements {IUniversalComment<Comment>}
         */

        var BrowserComment = function (_GenericDomManupulati) {
            _inherits(BrowserComment, _GenericDomManupulati);

            /**
             * Creates an instance of BrowserComment.
             *
             * @param {(string | Comment)} data
             *
             * @memberOf BrowserComment
             */
            function BrowserComment(data) {
                _classCallCheck(this, BrowserComment);

                /**
                 *
                 *
                 * @private
                 * @type {boolean}
                 * @memberOf BrowserComment
                 */
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
            /**
             *
             *
             * @returns
             *
             * @memberOf BrowserComment
             */


            _createClass(BrowserComment, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return this._isRehydrated;
                }
                /**
                 *
                 *
                 * @returns {Comment}
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.append(this);
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.prepend(this);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "getPreviousSibling",
                value: function getPreviousSibling() {
                    return this._getPreviousSibling(this);
                }
                /**
                 *
                 *
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentElement.removeChild(this.original);
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    if (this.original.parentNode) {
                        return new Element(this.original.parentElement);
                    }
                }
                /**
                 *
                 *
                 * @returns
                 *
                 * @memberOf BrowserComment
                 */

            }, {
                key: "getSource",
                value: function getSource() {
                    return "<!--" + this.original.nodeValue + "-->";
                }
            }]);

            return BrowserComment;
        }(GenericDomManupulations);

        exports.BrowserComment = BrowserComment;
        /**
         *
         *
         * @export
         * @class Attribute
         * @implements {IUniversalAttribute<Attr>}
         */

        var Attribute = function () {
            /**
             * Creates an instance of Attribute.
             *
             * @param {(string | Attr)} name
             * @param {string} [value]
             *
             * @memberOf Attribute
             */
            function Attribute(name, value) {
                _classCallCheck(this, Attribute);

                this.original = typeof name === "string" ? document.createAttribute(name) : name;
                if (value !== undefined) {
                    this.original.value = value;
                }
            }
            /**
             *
             *
             * @returns {string}
             *
             * @memberOf Attribute
             */


            _createClass(Attribute, [{
                key: "getName",
                value: function getName() {
                    return this.original.name;
                }
                /**
                 *
                 *
                 * @returns
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
                /**
                 *
                 *
                 * @param {string} value
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.original.value = value;
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getValue",
                value: function getValue() {
                    return this.original.value;
                }
                /**
                 *
                 *
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this.parent.removeAttr(this);
                }
                /**
                 *
                 *
                 * @param {Element} parent
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "setParent",
                value: function setParent(parent) {
                    this.parent = parent;
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
            }]);

            return Attribute;
        }();

        exports.Attribute = Attribute;
        /**
         *
         *
         * @export
         * @class TextNode
         * @extends {GenericDomManupulations}
         * @implements {IUniversalTextNode<Text>}
         */

        var TextNode = function (_GenericDomManupulati2) {
            _inherits(TextNode, _GenericDomManupulati2);

            /**
             * Creates an instance of TextNode.
             *
             * @param {(string | Text)} data
             *
             * @memberOf TextNode
             */
            function TextNode(data) {
                _classCallCheck(this, TextNode);

                /**
                 *
                 *
                 * @private
                 * @type {boolean}
                 * @memberOf TextNode
                 */
                var _this2 = _possibleConstructorReturn(this, (TextNode.__proto__ || Object.getPrototypeOf(TextNode)).call(this));

                _this2._isRehydrated = false;
                if (data instanceof Text) {
                    _this2.original = data;
                    _this2._isRehydrated = true;
                } else {
                    _this2.original = document.createTextNode(data);
                }
                return _this2;
            }
            /**
             *
             *
             * @returns
             *
             * @memberOf TextNode
             */


            _createClass(TextNode, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return this._isRehydrated;
                }
                /**
                 *
                 *
                 * @returns {Text}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
                /**
                 *
                 *
                 * @param {string} value
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.original.nodeValue = value;
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getValue",
                value: function getValue() {
                    return this.original.nodeValue;
                }
                /**
                 *
                 *
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentElement.removeChild(this.original);
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    return new Element(this.original.parentElement);
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.append(this);
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.prepend(this);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getPreviousSibling",
                value: function getPreviousSibling() {
                    return this._getPreviousSibling(this);
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getSource",
                value: function getSource() {
                    return this.getValue();
                }
            }]);

            return TextNode;
        }(GenericDomManupulations);

        exports.TextNode = TextNode;
        /**
         *
         *
         * @export
         * @class Element
         * @extends {GenericDomManupulations}
         * @implements {IUniversalElement<HTMLElement>}
         */

        var Element = function (_GenericDomManupulati3) {
            _inherits(Element, _GenericDomManupulati3);

            /**
             * Creates an instance of Element.
             *
             * @param {(string | HTMLElement)} data
             *
             * @memberOf Element
             */
            function Element(data) {
                _classCallCheck(this, Element);

                /**
                 *
                 *
                 * @private
                 * @type {boolean}
                 * @memberOf Element
                 */
                var _this3 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

                _this3._isRehydrated = false;
                /**
                 *
                 *
                 * @private
                 * @type {((IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text> | IUniversalComment<Comment>)[])}
                 * @memberOf Element
                 */
                _this3.children = [];
                if (data instanceof HTMLElement) {
                    _this3.original = data;
                    _this3._isRehydrated = true;
                } else {
                    _this3.original = document.createElement(data);
                }
                return _this3;
            }
            /**
             *
             *
             * @returns
             *
             * @memberOf Element
             */


            _createClass(Element, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return this._isRehydrated;
                }
                /**
                 *
                 *
                 * @returns {HTMLElement}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.original;
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "append",
                value: function append(element) {
                    this.original.appendChild(element.getOriginal());
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.getOriginal().appendChild(this.original);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "prepend",
                value: function prepend(element) {
                    this.original.insertBefore(element.getOriginal(), this.original.firstChild);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    var referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getPreviousSibling",
                value: function getPreviousSibling() {
                    return this._getPreviousSibling(this);
                }
                /**
                 *
                 *
                 *
                 * @memberOf Element
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this.original.parentNode.removeChild(this.original);
                }
                /**
                 *
                 *
                 * @param {IUniversalAttribute<Attr>} attribute
                 * @returns {IUniversalAttribute<Attr>}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "setAttr",
                value: function setAttr(attribute) {
                    attribute.setParent(this);
                    this.original.setAttributeNode(attribute.getOriginal());
                    return attribute;
                }
                /**
                 *
                 *
                 * @param {(IUniversalAttribute<Attr> | string)} attr
                 *
                 * @memberOf Element
                 */

            }, {
                key: "removeAttr",
                value: function removeAttr(attr) {
                    if (attr instanceof Attribute) {
                        this.original.removeAttributeNode(attr.getOriginal());
                    } else {
                        this.original.removeAttribute(attr);
                    }
                }
                /**
                 *
                 *
                 * @param {string} name
                 * @param {*} [value]
                 * @returns {IUniversalAttribute<Attr>}
                 *
                 * @memberOf Element
                 */

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
                /**
                 *
                 *
                 * @param {string} name
                 * @returns {IUniversalAttribute<Attr>}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getAttr",
                value: function getAttr(name) {
                    var oAttr = this.original.getAttributeNode(name);
                    if (oAttr) {
                        var attr = new Attribute(oAttr);
                        return attr;
                    }
                }
                /**
                 *
                 *
                 * @returns {IUniversalAttribute<Attr>[]}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getAttrs",
                value: function getAttrs() {
                    var attrs = [];
                    var originalAttrs = this.original.attributes;
                    for (var i = 0; i < originalAttrs.length; i++) {
                        attrs.push(originalAttrs[i]);
                    }
                    return attrs;
                }
                /**
                 *
                 *
                 * @returns {((IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text>)[])}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getChildren",
                value: function getChildren() {
                    var childNodes = this.original.childNodes;
                    var result = [];
                    for (var i = 0; i < childNodes.length; i++) {
                        var node = mapNodeObject(childNodes[i]);
                        if (node) {
                            result.push(node);
                        }
                    }
                    return result;
                }
                /**
                 *
                 *
                 * @param {((IUniversalElement<HTMLElement>
                 *         | IUniversalTextNode<Text>)[])} elements
                 *
                 * @memberOf Element
                 */

            }, {
                key: "setChildren",
                value: function setChildren(elements) {
                    this.children = elements;
                }
                /**
                 *
                 *
                 * @param {string} name
                 *
                 * @memberOf Element
                 */

            }, {
                key: "addClass",
                value: function addClass(name) {
                    if (!this.original.classList.contains(name)) {
                        this.original.classList.add(name);
                    }
                }
                /**
                 *
                 *
                 * @param {string} name
                 * @returns {boolean}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "hasClass",
                value: function hasClass(name) {
                    return this.original.classList.contains(name);
                }
                /**
                 *
                 *
                 * @param {string} name
                 *
                 * @memberOf Element
                 */

            }, {
                key: "removeClass",
                value: function removeClass(name) {
                    this.original.classList.remove(name);
                }
                /**
                 *
                 *
                 * @param {string} name
                 *
                 * @memberOf Element
                 */

            }, {
                key: "toggleClass",
                value: function toggleClass(name) {
                    if (this.original.classList.contains(name)) {
                        this.original.classList.remove(name);
                    } else {
                        this.original.classList.add(name);
                    }
                }
                /**
                 *
                 *
                 * @param {*} data
                 * @param {string} [value]
                 * @returns
                 *
                 * @memberOf Element
                 */

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
                /**
                 *
                 *
                 * @param {string} name
                 * @returns
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getStyle",
                value: function getStyle(name) {
                    return this.original.style[name];
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getSource",
                value: function getSource() {
                    var html = this.original.outerHTML;
                    return this.cleanUpHTML(html);
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    var parent = this.original.parentElement;
                    return new Element(parent);
                }
                /**
                 *
                 *
                 * @param {({
                 *         (element: IUniversalElement<HTMLElement>
                 *             | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void
                 *     })} closure
                 *
                 * @memberOf Element
                 */

            }, {
                key: "eachChild",
                value: function eachChild(closure) {
                    var childNodes = this.original.childNodes;
                    for (var i = 0; i < childNodes.length; i++) {
                        var el = childNodes[i];
                        closure(new Element(el), i);
                    }
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getHTML",
                value: function getHTML() {
                    var html = this.original.innerHTML;
                    return this.cleanUpHTML(html);
                }
                /**
                 *
                 *
                 *
                 * @memberOf Element
                 */

            }, {
                key: "empty",
                value: function empty() {
                    while (this.original.firstChild) {
                        this.original.removeChild(this.original.firstChild);
                    }
                }
                /**
                 *
                 *
                 * @private
                 * @param {string} html
                 * @returns {string}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "cleanUpHTML",
                value: function cleanUpHTML(html) {
                    html = html.replace(/\r?\n|\r|\t/g, "");
                    html = html.replace(/\s{2,}/g, " ");
                    html = html.replace(/>\s+</g, "><");
                    html = html.replace(/\sclass=""/g, "");
                    html = html.replace(/\s"/g, '"');
                    html = html.trim();
                    return html;
                }
            }]);

            return Element;
        }(GenericDomManupulations);

        exports.Element = Element;
    });
    define("Server", ["require", "exports"], function (require, exports) {
        "use strict";

        var elementIDS = 0;
        /**
         *
         *
         * @export
         * @class GenericDomManupulations
         */

        var GenericDomManupulations = function () {
            function GenericDomManupulations() {
                _classCallCheck(this, GenericDomManupulations);
            }

            _createClass(GenericDomManupulations, [{
                key: "_insertAfter",

                /**
                 *
                 *
                 * @protected
                 * @param {*} element
                 *
                 * @memberOf GenericDomManupulations
                 */
                value: function _insertAfter(element) {
                    var parent = element.getParent();
                    var children = parent.getChildren();
                    var index = children.indexOf(element);
                    if (index > -1) {
                        children.splice(index + 1, 0, this);
                    }
                }
                /**
                 *
                 *
                 * @protected
                 * @param {*} element
                 *
                 * @memberOf GenericDomManupulations
                 */

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
                /**
                 *
                 *
                 * @protected
                 * @param {*} parent
                 *
                 * @memberOf GenericDomManupulations
                 */

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
                /**
                 *
                 *
                 * @protected
                 * @param {*} element
                 * @returns {*}
                 *
                 * @memberOf GenericDomManupulations
                 */

            }, {
                key: "_getNextSibling",
                value: function _getNextSibling(element) {
                    var children = element.parent.children;
                    var index = element.parent.children.indexOf(element);
                    if (index > -1) {
                        if (index + 1 < children.length) {
                            return children[index + 1];
                        }
                    }
                }
                /**
                 *
                 *
                 * @protected
                 * @param {*} element
                 * @returns {*}
                 *
                 * @memberOf GenericDomManupulations
                 */

            }, {
                key: "_getPreviousSibling",
                value: function _getPreviousSibling(element) {
                    var children = element.parent.children;
                    var index = element.parent.children.indexOf(element);
                    if (index > -1) {
                        if (index - 1 >= 0) {
                            return children[index - 1];
                        }
                    }
                }
            }]);

            return GenericDomManupulations;
        }();

        exports.GenericDomManupulations = GenericDomManupulations;
        /**
         *
         *
         * @export
         * @class ServerComment
         * @extends {GenericDomManupulations}
         * @implements {IUniversalComment<any>}
         */

        var ServerComment = function (_GenericDomManupulati4) {
            _inherits(ServerComment, _GenericDomManupulati4);

            /**
             * Creates an instance of ServerComment.
             *
             * @param {(string | Comment)} data
             *
             * @memberOf ServerComment
             */
            function ServerComment(data) {
                _classCallCheck(this, ServerComment);

                /**
                 *
                 *
                 * @type {number}
                 * @memberOf ServerComment
                 */
                var _this4 = _possibleConstructorReturn(this, (ServerComment.__proto__ || Object.getPrototypeOf(ServerComment)).call(this));

                _this4.$id = elementIDS++;
                if (typeof data === "string") {
                    _this4.value = data;
                }
                return _this4;
            }
            /**
             *
             *
             * @returns {*}
             *
             * @memberOf ServerComment
             */


            _createClass(ServerComment, [{
                key: "getOriginal",
                value: function getOriginal() {
                    return this;
                }
                /**
                 *
                 *
                 * @returns
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "isRehydrated",
                value: function isRehydrated() {
                    return false;
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.append(this);
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.prepend(this);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    this._insertAfter(element);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    this._insertBefore(element);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "getPreviousSibling",
                value: function getPreviousSibling() {
                    return this._getPreviousSibling(this);
                }
                /**
                 *
                 *
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this._remove(this.parent);
                }
                /**
                 *
                 *
                 * @param {Element} element
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
                /**
                 *
                 *
                 * @returns
                 *
                 * @memberOf ServerComment
                 */

            }, {
                key: "getSource",
                value: function getSource() {
                    return "<!--" + this.value + "-->";
                }
            }]);

            return ServerComment;
        }(GenericDomManupulations);

        exports.ServerComment = ServerComment;
        /**
         *
         *
         * @export
         * @class Attribute
         * @implements {IUniversalAttribute<any>}
         */

        var Attribute = function () {
            /**
             * Creates an instance of Attribute.
             *
             * @param {(string | Attr)} name
             * @param {string} [value]
             *
             * @memberOf Attribute
             */
            function Attribute(name, value) {
                _classCallCheck(this, Attribute);

                /**
                 *
                 *
                 * @private
                 * @type {Map<string, string>}
                 * @memberOf Attribute
                 */
                this.userStyles = new Map();
                if (typeof name === "string") {
                    this.name = name;
                }
                if (value !== undefined) {
                    this.value = value;
                }
            }
            /**
             *
             *
             * @param {(string | any)} data
             * @param {string} value
             * @returns
             *
             * @memberOf Attribute
             */


            _createClass(Attribute, [{
                key: "setStyle",
                value: function setStyle(data, value) {
                    if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
                        for (var k in data) {
                            if (data.hasOwnProperty(k)) {
                                this.userStyles.set(k, data[k]);
                            }
                        }
                        return;
                    }
                    this.userStyles.set(data, value);
                }
                /**
                 *
                 *
                 * @param {string} key
                 * @returns
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getStyle",
                value: function getStyle(key) {
                    return this.userStyles.get(key);
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getName",
                value: function getName() {
                    return this.name;
                }
                /**
                 *
                 *
                 * @returns
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.value;
                }
                /**
                 *
                 *
                 * @param {string} value
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.value = value;
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getValue",
                value: function getValue() {
                    var _this5 = this;

                    if (this.name === "style") {
                        var _ret = function () {
                            var styles = [];
                            _this5.userStyles.forEach(function (value, key) {
                                styles.push(key + ": " + value);
                            });
                            return {
                                v: styles.length > 0 ? styles.join("; ") + ";" : _this5.value
                            };
                        }();

                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    }
                    return this.value;
                }
                /**
                 *
                 *
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this.parent.removeAttr(this);
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf Attribute
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
            }]);

            return Attribute;
        }();

        exports.Attribute = Attribute;
        /**
         *
         *
         * @export
         * @class TextNode
         * @extends {GenericDomManupulations}
         * @implements {IUniversalTextNode<string>}
         */

        var TextNode = function (_GenericDomManupulati5) {
            _inherits(TextNode, _GenericDomManupulati5);

            /**
             * Creates an instance of TextNode.
             *
             * @param {string} value
             *
             * @memberOf TextNode
             */
            function TextNode(value) {
                _classCallCheck(this, TextNode);

                var _this6 = _possibleConstructorReturn(this, (TextNode.__proto__ || Object.getPrototypeOf(TextNode)).call(this));

                _this6.value = value;
                return _this6;
            }
            /**
             *
             *
             * @returns
             *
             * @memberOf TextNode
             */


            _createClass(TextNode, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return false;
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {
                    return this.value;
                }
                /**
                 *
                 *
                 * @param {string} value
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "setValue",
                value: function setValue(value) {
                    this.value = value;
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getValue",
                value: function getValue() {
                    return this.value;
                }
                /**
                 *
                 *
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this._remove(this.parent);
                }
                /**
                 *
                 *
                 * @param {Element} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    element.append(this);
                }
                /**
                 *
                 *
                 * @param {IUniversalElement<any>} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    element.prepend(this);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    this._insertAfter(element);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    this._insertBefore(element);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getPreviousSibling",
                value: function getPreviousSibling() {
                    return this._getPreviousSibling(this);
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf TextNode
                 */

            }, {
                key: "getSource",
                value: function getSource() {
                    return this.getValue();
                }
            }]);

            return TextNode;
        }(GenericDomManupulations);

        exports.TextNode = TextNode;
        /**
         *
         *
         * @export
         * @class Element
         * @extends {GenericDomManupulations}
         * @implements {IUniversalElement<any>}
         */

        var Element = function (_GenericDomManupulati6) {
            _inherits(Element, _GenericDomManupulati6);

            /**
             * Creates an instance of Element.
             *
             * @param {(string | HTMLElement)} name
             *
             * @memberOf Element
             */
            function Element(name) {
                _classCallCheck(this, Element);

                /**
                 *
                 *
                 * @type {number}
                 * @memberOf Element
                 */
                var _this7 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

                _this7.$id = ++elementIDS;
                /**
                 *
                 *
                 * @private
                 * @type {Map<string, Attribute>}
                 * @memberOf Element
                 */
                _this7.attrs = new Map();
                /**
                 *
                 *
                 * @private
                 * @type {Set<string>}
                 * @memberOf Element
                 */
                _this7.classNames = new Set();
                /**
                 *
                 *
                 * @private
                 * @type {((IUniversalElement<HTMLElement> |
                 *         IUniversalTextNode<Text> | IUniversalComment<Text>)[])}
                 * @memberOf Element
                 */
                _this7.children = [];
                if (typeof name === "string") {
                    _this7.name = name;
                }
                return _this7;
            }
            /**
             *
             *
             * @returns
             *
             * @memberOf Element
             */


            _createClass(Element, [{
                key: "isRehydrated",
                value: function isRehydrated() {
                    return false;
                }
                /**
                 *
                 *
                 * @returns {*}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getOriginal",
                value: function getOriginal() {}
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> |
                 *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "append",
                value: function append(element) {
                    var el = element;
                    el.setParent(this);
                    this.children.push(el);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> |
                 *         IUniversalTextNode<Text>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "appendTo",
                value: function appendTo(element) {
                    var el = element;
                    el.append(this);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "prepend",
                value: function prepend(element) {
                    element.setParent(this);
                    this.children.splice(0, 0, element);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> |
                 *         IUniversalTextNode<Text>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "prependTo",
                value: function prependTo(element) {
                    var el = element;
                    el.prepend(this);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "insertAfter",
                value: function insertAfter(element) {
                    this._insertAfter(element);
                }
                /**
                 *
                 *
                 * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "insertBefore",
                value: function insertBefore(element) {
                    this._insertBefore(element);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getNextSibling",
                value: function getNextSibling() {
                    return this._getNextSibling(this);
                }
                /**
                 *
                 *
                 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getPreviousSibling",
                value: function getPreviousSibling() {
                    return this._getPreviousSibling(this);
                }
                /**
                 *
                 *
                 * @param {Element} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "removeChild",
                value: function removeChild(element) {
                    var index = this.children.indexOf(element);
                    if (index > -1) {
                        this.children.splice(index, 1);
                    }
                }
                /**
                 *
                 *
                 *
                 * @memberOf Element
                 */

            }, {
                key: "remove",
                value: function remove() {
                    this.parent.removeChild(this);
                }
                /**
                 *
                 *
                 * @param {IUniversalAttribute<any>} attribute
                 * @returns {IUniversalAttribute<Attr>}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "setAttr",
                value: function setAttr(attribute) {
                    attribute.setParent(this);
                    this.attrs.set(attribute.getName(), attribute);
                    return attribute;
                }
                /**
                 *
                 *
                 * @param {(IUniversalAttribute<any> | string)} attribute
                 *
                 * @memberOf Element
                 */

            }, {
                key: "removeAttr",
                value: function removeAttr(attribute) {
                    this.attrs.delete(attribute.getName());
                }
                /**
                 *
                 *
                 * @param {string} name
                 * @param {*} [value]
                 * @returns {IUniversalAttribute<Attr>}
                 *
                 * @memberOf Element
                 */

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
                /**
                 *
                 *
                 * @param {string} name
                 * @returns {IUniversalAttribute<any>}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getAttr",
                value: function getAttr(name) {
                    return this.attrs.get(name);
                }
                /**
                 *
                 *
                 * @returns {IUniversalAttribute<any>[]}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getAttrs",
                value: function getAttrs() {
                    var _this8 = this;

                    var attrs = [];
                    if (this.classNames.size > 0) {
                        (function () {
                            var clsNames = [];
                            _this8.classNames.forEach(function (clsName) {
                                clsNames.push(clsName);
                            });
                            var clsAttribute = new Attribute("class");
                            clsAttribute.setParent(_this8);
                            clsAttribute.setValue(clsNames.join(" "));
                            attrs.push(clsAttribute);
                        })();
                    }
                    this.attrs.forEach(function (attr) {
                        attrs.push(attr);
                    });
                    return attrs;
                }
                /**
                 *
                 *
                 * @returns {((IUniversalElement<any> |
                 *         IUniversalTextNode<any> | IUniversalComment<any>)[])}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getChildren",
                value: function getChildren() {
                    return this.children;
                }
                /**
                 *
                 *
                 * @param {({
                 *         (element: IUniversalElement<any>
                 *             | IUniversalTextNode<any> | IUniversalComment<any>, index: number): void
                 *     })} closure
                 *
                 * @memberOf Element
                 */

            }, {
                key: "eachChild",
                value: function eachChild(closure) {
                    for (var i = 0; i < this.children.length; i++) {
                        closure(this.children[i], i);
                    }
                }
                /**
                 *
                 *
                 * @param {((IUniversalElement<any>
                 *         | IUniversalTextNode<any>)[])} elements
                 *
                 * @memberOf Element
                 */

            }, {
                key: "setChildren",
                value: function setChildren(elements) {
                    this.children = elements;
                }
                /**
                 *
                 *
                 * @param {string} name
                 *
                 * @memberOf Element
                 */

            }, {
                key: "addClass",
                value: function addClass(name) {
                    if (!this.classNames.has(name)) {
                        this.classNames.add(name);
                    }
                }
                /**
                 *
                 *
                 * @param {string} name
                 * @returns {boolean}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "hasClass",
                value: function hasClass(name) {
                    return this.classNames.has(name);
                }
                /**
                 *
                 *
                 * @param {string} name
                 *
                 * @memberOf Element
                 */

            }, {
                key: "removeClass",
                value: function removeClass(name) {
                    this.classNames.delete(name);
                }
                /**
                 *
                 *
                 * @param {string} name
                 *
                 * @memberOf Element
                 */

            }, {
                key: "toggleClass",
                value: function toggleClass(name) {
                    if (this.classNames.has(name)) {
                        this.classNames.delete(name);
                    } else {
                        this.classNames.add(name);
                    }
                }
                /**
                 *
                 *
                 * @param {*} data
                 * @param {string} [value]
                 *
                 * @memberOf Element
                 */

            }, {
                key: "setStyle",
                value: function setStyle(data, value) {
                    var styleAttr = this.getAttr("style") || this.setAttr(new Attribute("style"));
                    styleAttr.setStyle(data, value);
                }
                /**
                 *
                 *
                 * @param {string} name
                 * @returns {string}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getStyle",
                value: function getStyle(name) {
                    var styleAttr = this.getAttr("style") || this.setAttr(new Attribute("style"));
                    return styleAttr.getStyle(name);
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Element
                 */

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
                /**
                 *
                 *
                 * @param {Element} element
                 *
                 * @memberOf Element
                 */

            }, {
                key: "setParent",
                value: function setParent(element) {
                    this.parent = element;
                }
                /**
                 *
                 *
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf Element
                 */

            }, {
                key: "getParent",
                value: function getParent() {
                    return this.parent;
                }
                /**
                 *
                 *
                 * @returns {string}
                 *
                 * @memberOf Element
                 */

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
                /**
                 *
                 *
                 *
                 * @memberOf Element
                 */

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
        /**
         *
         *
         * @export
         * @class UniversalDom
         */

        var UniversalDom = function () {
            function UniversalDom() {
                _classCallCheck(this, UniversalDom);
            }

            _createClass(UniversalDom, null, [{
                key: "createElement",

                /**
                 *
                 *
                 * @static
                 * @param {(string | HTMLElement)} data
                 * @returns {IUniversalElement<any>}
                 *
                 * @memberOf UniversalDom
                 */
                value: function createElement(data) {
                    return isBackend ? new Server_1.Element(data) : new Browser_1.Element(data);
                }
                /**
                 *
                 *
                 * @static
                 * @param {string} name
                 * @param {string} [value]
                 * @returns {IUniversalAttribute<any>}
                 *
                 * @memberOf UniversalDom
                 */

            }, {
                key: "createAttribute",
                value: function createAttribute(name, value) {
                    return isBackend ? new Server_1.Attribute(name, value) : new Browser_1.Attribute(name, value);
                }
                /**
                 *
                 *
                 * @static
                 * @param {string} value
                 * @returns {IUniversalTextNode<any>}
                 *
                 * @memberOf UniversalDom
                 */

            }, {
                key: "createTextNode",
                value: function createTextNode(value) {
                    return isBackend ? new Server_1.TextNode(value) : new Browser_1.TextNode(value);
                }
                /**
                 *
                 *
                 * @static
                 * @param {string} value
                 * @returns {IUniversalComment<any>}
                 *
                 * @memberOf UniversalDom
                 */

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
        var e = __resolve__(n);
        var bc;
        if (!$isBackend) {
            var npm = $__exports__.__npm__ = $__exports__.__npm__ || {};if (m) {
                bc = npm[m];
            }
        }
        for (var k in e) {
            $isBackend || w ? $__exports__[k] = e[k] : null;
            bc ? bc[e] = e[k] : null;
        }
    };
    __expose__("index", "universal-dom", true, "");
})(typeof module !== "undefined" && module.exports && (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" ? exports : typeof window !== "undefined" ? window : undefined, typeof module !== "undefined" && module.exports && (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object");