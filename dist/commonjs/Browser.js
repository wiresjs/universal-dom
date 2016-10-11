"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 *
 * @param {*} node
 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
 */
var mapNodeObject = function (node) {
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
var GenericDomManupulations = (function () {
    function GenericDomManupulations() {
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
    GenericDomManupulations.prototype._getNextSibling = function (element) {
        var original = element.original;
        return mapNodeObject(original.nextSibling);
    };
    /**
     *
     *
     * @protected
     * @param {*} element
     * @returns {*}
     *
     * @memberOf GenericDomManupulations
     */
    GenericDomManupulations.prototype._getPreviousSibling = function (element) {
        var original = element.original;
        return mapNodeObject(original.previousSibling);
    };
    return GenericDomManupulations;
}());
exports.GenericDomManupulations = GenericDomManupulations;
/**
 *
 *
 * @export
 * @class BrowserComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<Comment>}
 */
var BrowserComment = (function (_super) {
    __extends(BrowserComment, _super);
    /**
     * Creates an instance of BrowserComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf BrowserComment
     */
    function BrowserComment(data) {
        _super.call(this);
        /**
         *
         *
         * @private
         * @type {boolean}
         * @memberOf BrowserComment
         */
        this._isRehydrated = false;
        if (typeof data === "string") {
            this.original = document.createComment(data);
        }
        else {
            this._isRehydrated = true;
            this.original = data;
        }
    }
    BrowserComment.prototype.getType = function () {
        return "comment";
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.isRehydrated = function () {
        return this._isRehydrated;
    };
    /**
     *
     *
     * @returns {Comment}
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.getOriginal = function () {
        return this.original;
    };
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.appendTo = function (element) {
        element.append(this);
    };
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.prependTo = function (element) {
        element.prepend(this);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.insertAfter = function (element) {
        var referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        }
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.insertBefore = function (element) {
        var referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode);
        }
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.getNextSibling = function () {
        return this._getNextSibling(this);
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.getPreviousSibling = function () {
        return this._getPreviousSibling(this);
    };
    /**
     *
     *
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.remove = function () {
        this.original.parentElement.removeChild(this.original);
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.getParent = function () {
        if (this.original.parentNode) {
            return new Element(this.original.parentElement);
        }
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf BrowserComment
     */
    BrowserComment.prototype.getSource = function () {
        return "<!--" + this.original.nodeValue + "-->";
    };
    return BrowserComment;
}(GenericDomManupulations));
exports.BrowserComment = BrowserComment;
/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<Attr>}
 */
var Attribute = (function () {
    /**
     * Creates an instance of Attribute.
     *
     * @param {(string | Attr)} name
     * @param {string} [value]
     *
     * @memberOf Attribute
     */
    function Attribute(name, value) {
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
    Attribute.prototype.getName = function () {
        return this.original.name;
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getOriginal = function () {
        return this.original;
    };
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    Attribute.prototype.setValue = function (value) {
        this.original.value = value;
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getValue = function () {
        return this.original.value;
    };
    /**
     *
     *
     *
     * @memberOf Attribute
     */
    Attribute.prototype.remove = function () {
        this.parent.removeAttr(this);
    };
    /**
     *
     *
     * @param {Element} parent
     *
     * @memberOf Attribute
     */
    Attribute.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getParent = function () {
        return this.parent;
    };
    return Attribute;
}());
exports.Attribute = Attribute;
/**
 *
 *
 * @export
 * @class TextNode
 * @extends {GenericDomManupulations}
 * @implements {IUniversalTextNode<Text>}
 */
var TextNode = (function (_super) {
    __extends(TextNode, _super);
    /**
     * Creates an instance of TextNode.
     *
     * @param {(string | Text)} data
     *
     * @memberOf TextNode
     */
    function TextNode(data) {
        _super.call(this);
        /**
         *
         *
         * @private
         * @type {boolean}
         * @memberOf TextNode
         */
        this._isRehydrated = false;
        if (data instanceof Text) {
            this.original = data;
            this._isRehydrated = true;
        }
        else {
            this.original = document.createTextNode(data);
        }
    }
    TextNode.prototype.getType = function () {
        return "text";
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf TextNode
     */
    TextNode.prototype.isRehydrated = function () {
        return this._isRehydrated;
    };
    /**
     *
     *
     * @returns {Text}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getOriginal = function () {
        return this.original;
    };
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    TextNode.prototype.setValue = function (value) {
        this.original.nodeValue = value;
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getValue = function () {
        return this.original.nodeValue;
    };
    /**
     *
     *
     *
     * @memberOf TextNode
     */
    TextNode.prototype.remove = function () {
        this.original.parentElement.removeChild(this.original);
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getParent = function () {
        return new Element(this.original.parentElement);
    };
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    TextNode.prototype.appendTo = function (element) {
        element.append(this);
    };
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    TextNode.prototype.prependTo = function (element) {
        element.prepend(this);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    TextNode.prototype.insertAfter = function (element) {
        var referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        }
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    TextNode.prototype.insertBefore = function (element) {
        var referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode);
        }
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getNextSibling = function () {
        return this._getNextSibling(this);
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getPreviousSibling = function () {
        return this._getPreviousSibling(this);
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getSource = function () {
        return this.getValue();
    };
    return TextNode;
}(GenericDomManupulations));
exports.TextNode = TextNode;
/**
 *
 *
 * @export
 * @class Element
 * @extends {GenericDomManupulations}
 * @implements {IUniversalElement<HTMLElement>}
 */
var Element = (function (_super) {
    __extends(Element, _super);
    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} data
     *
     * @memberOf Element
     */
    function Element(data) {
        _super.call(this);
        /**
         *
         *
         * @private
         * @type {boolean}
         * @memberOf Element
         */
        this._isRehydrated = false;
        /**
         *
         *
         * @private
         * @type {((IUniversalElement<HTMLElement> |
         *         IUniversalTextNode<Text> | IUniversalComment<Comment>)[])}
         * @memberOf Element
         */
        this.children = [];
        if (data instanceof HTMLElement) {
            this.original = data;
            this._isRehydrated = true;
        }
        else {
            this.original = document.createElement(data);
        }
    }
    Element.prototype.getType = function () {
        return "element";
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf Element
     */
    Element.prototype.isRehydrated = function () {
        return this._isRehydrated;
    };
    /**
     *
     *
     * @returns {HTMLElement}
     *
     * @memberOf Element
     */
    Element.prototype.getOriginal = function () {
        return this.original;
    };
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.append = function (element) {
        this.original.appendChild(element.getOriginal());
    };
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    Element.prototype.appendTo = function (element) {
        element.getOriginal().appendChild(this.original);
    };
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.prepend = function (element) {
        this.original.insertBefore(element.getOriginal(), this.original.firstChild);
    };
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    Element.prototype.prependTo = function (element) {
        element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.insertAfter = function (element) {
        var referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        }
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.insertBefore = function (element) {
        var referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode);
        }
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    Element.prototype.getNextSibling = function () {
        return this._getNextSibling(this);
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    Element.prototype.getPreviousSibling = function () {
        return this._getPreviousSibling(this);
    };
    /**
     *
     *
     *
     * @memberOf Element
     */
    Element.prototype.remove = function () {
        this.original.parentNode.removeChild(this.original);
    };
    /**
     *
     *
     * @param {IUniversalAttribute<Attr>} attribute
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    Element.prototype.setAttr = function (attribute) {
        attribute.setParent(this);
        this.original.setAttributeNode(attribute.getOriginal());
        return attribute;
    };
    /**
     *
     *
     * @param {(IUniversalAttribute<Attr> | string)} attr
     *
     * @memberOf Element
     */
    Element.prototype.removeAttr = function (attr) {
        if (attr instanceof Attribute) {
            this.original.removeAttributeNode(attr.getOriginal());
        }
        else {
            this.original.removeAttribute(attr);
        }
    };
    /**
     *
     *
     * @param {string} name
     * @param {*} [value]
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    Element.prototype.attr = function (name, value) {
        if (value === undefined) {
            return this.getAttr(name);
        }
        else {
            var attr = this.getAttr(name) || this.setAttr(new Attribute(name));
            attr.setValue(value);
            return attr;
        }
    };
    /**
     *
     *
     * @param {string} name
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    Element.prototype.getAttr = function (name) {
        var oAttr = this.original.getAttributeNode(name);
        if (oAttr) {
            var attr = new Attribute(oAttr);
            return attr;
        }
    };
    /**
     *
     *
     * @returns {IUniversalAttribute<Attr>[]}
     *
     * @memberOf Element
     */
    Element.prototype.getAttrs = function () {
        var attrs = [];
        var originalAttrs = this.original.attributes;
        for (var i = 0; i < originalAttrs.length; i++) {
            attrs.push(originalAttrs[i]);
        }
        return attrs;
    };
    /**
     *
     *
     * @returns {((IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text>)[])}
     *
     * @memberOf Element
     */
    Element.prototype.getChildren = function () {
        var childNodes = this.original.childNodes;
        var result = [];
        for (var i = 0; i < childNodes.length; i++) {
            var node = mapNodeObject(childNodes[i]);
            if (node) {
                result.push(node);
            }
        }
        return result;
    };
    /**
     *
     *
     * @param {((IUniversalElement<HTMLElement>
     *         | IUniversalTextNode<Text>)[])} elements
     *
     * @memberOf Element
     */
    Element.prototype.setChildren = function (elements) {
        this.children = elements;
    };
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    Element.prototype.addClass = function (name) {
        if (!this.original.classList.contains(name)) {
            this.original.classList.add(name);
        }
    };
    /**
     *
     *
     * @param {string} name
     * @returns {boolean}
     *
     * @memberOf Element
     */
    Element.prototype.hasClass = function (name) {
        return this.original.classList.contains(name);
    };
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    Element.prototype.removeClass = function (name) {
        this.original.classList.remove(name);
    };
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    Element.prototype.toggleClass = function (name) {
        if (this.original.classList.contains(name)) {
            this.original.classList.remove(name);
        }
        else {
            this.original.classList.add(name);
        }
    };
    /**
     *
     *
     * @param {*} data
     * @param {string} [value]
     * @returns
     *
     * @memberOf Element
     */
    Element.prototype.setStyle = function (data, value) {
        if (typeof data === "object") {
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    this.original.style[k] = data[k];
                }
            }
            return;
        }
        return this.original.style[data] = value;
    };
    /**
     *
     *
     * @param {string} name
     * @returns
     *
     * @memberOf Element
     */
    Element.prototype.getStyle = function (name) {
        return this.original.style[name];
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    Element.prototype.getSource = function () {
        var html = this.original.outerHTML;
        return this.cleanUpHTML(html);
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Element
     */
    Element.prototype.getParent = function () {
        var parent = this.original.parentElement;
        return new Element(parent);
    };
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
    Element.prototype.eachChild = function (closure) {
        var childNodes = this.original.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            var el = childNodes[i];
            closure(new Element(el), i);
        }
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    Element.prototype.getHTML = function () {
        var html = this.original.innerHTML;
        return this.cleanUpHTML(html);
    };
    /**
     *
     *
     *
     * @memberOf Element
     */
    Element.prototype.empty = function () {
        while (this.original.firstChild) {
            this.original.removeChild(this.original.firstChild);
        }
    };
    /**
     *
     *
     * @private
     * @param {string} html
     * @returns {string}
     *
     * @memberOf Element
     */
    Element.prototype.cleanUpHTML = function (html) {
        html = html.replace(/\r?\n|\r|\t/g, "");
        html = html.replace(/\s{2,}/g, " ");
        html = html.replace(/>\s+</g, "><");
        html = html.replace(/\sclass=""/g, "");
        html = html.replace(/\s"/g, '"');
        html = html.trim();
        return html;
    };
    return Element;
}(GenericDomManupulations));
exports.Element = Element;
