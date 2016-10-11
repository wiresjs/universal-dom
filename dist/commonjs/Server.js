"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var elementIDS = 0;
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
     *
     * @memberOf GenericDomManupulations
     */
    GenericDomManupulations.prototype._insertAfter = function (element) {
        var parent = element.getParent();
        var children = parent.getChildren();
        var index = children.indexOf(element);
        if (index > -1) {
            children.splice(index + 1, 0, this);
        }
    };
    /**
     *
     *
     * @protected
     * @param {*} element
     *
     * @memberOf GenericDomManupulations
     */
    GenericDomManupulations.prototype._insertBefore = function (element) {
        var parent = element.getParent();
        var children = parent.getChildren();
        var index = children.indexOf(element);
        if (index > -1) {
            children.splice(index, 0, this);
        }
    };
    /**
     *
     *
     * @protected
     * @param {*} parent
     *
     * @memberOf GenericDomManupulations
     */
    GenericDomManupulations.prototype._remove = function (parent) {
        var children = parent.getChildren();
        if (parent) {
            var index = children.indexOf(this);
            if (index > -1) {
                children.splice(index, 1);
            }
        }
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
    GenericDomManupulations.prototype._getNextSibling = function (element) {
        var children = element.parent.children;
        var index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index + 1 < children.length) {
                return children[index + 1];
            }
        }
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
        var children = element.parent.children;
        var index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index - 1 >= 0) {
                return children[index - 1];
            }
        }
    };
    return GenericDomManupulations;
}());
exports.GenericDomManupulations = GenericDomManupulations;
/**
 *
 *
 * @export
 * @class ServerComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<any>}
 */
var ServerComment = (function (_super) {
    __extends(ServerComment, _super);
    /**
     * Creates an instance of ServerComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf ServerComment
     */
    function ServerComment(data) {
        _super.call(this);
        /**
         *
         *
         * @type {number}
         * @memberOf ServerComment
         */
        this.$id = elementIDS++;
        if (typeof data === "string") {
            this.value = data;
        }
    }
    ServerComment.prototype.getType = function () {
        return "comment";
    };
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.getOriginal = function () {
        return this;
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.isRehydrated = function () {
        return false;
    };
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.appendTo = function (element) {
        element.append(this);
    };
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.prependTo = function (element) {
        element.prepend(this);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.insertAfter = function (element) {
        this._insertAfter(element);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.insertBefore = function (element) {
        this._insertBefore(element);
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.getNextSibling = function () {
        return this._getNextSibling(this);
    };
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.getPreviousSibling = function () {
        return this._getPreviousSibling(this);
    };
    /**
     *
     *
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.remove = function () {
        this._remove(this.parent);
    };
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.setParent = function (element) {
        this.parent = element;
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.getParent = function () {
        return this.parent;
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    ServerComment.prototype.getSource = function () {
        return "<!--" + this.value + "-->";
    };
    return ServerComment;
}(GenericDomManupulations));
exports.ServerComment = ServerComment;
/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<any>}
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
    Attribute.prototype.setStyle = function (data, value) {
        if (typeof data === "object") {
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    this.userStyles.set(k, data[k]);
                }
            }
            return;
        }
        this.userStyles.set(data, value);
    };
    /**
     *
     *
     * @param {string} key
     * @returns
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getStyle = function (key) {
        return this.userStyles.get(key);
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getName = function () {
        return this.name;
    };
    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getOriginal = function () {
        return this.value;
    };
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    Attribute.prototype.setValue = function (value) {
        this.value = value;
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    Attribute.prototype.getValue = function () {
        if (this.name === "style") {
            var styles_1 = [];
            this.userStyles.forEach(function (value, key) {
                styles_1.push(key + ": " + value);
            });
            return styles_1.length > 0 ? styles_1.join("; ") + ";" : this.value;
        }
        return this.value;
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
     * @param {IUniversalElement<any>} element
     *
     * @memberOf Attribute
     */
    Attribute.prototype.setParent = function (element) {
        this.parent = element;
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
 * @implements {IUniversalTextNode<string>}
 */
var TextNode = (function (_super) {
    __extends(TextNode, _super);
    /**
     * Creates an instance of TextNode.
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    function TextNode(value) {
        _super.call(this);
        this.value = value;
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
        return false;
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getOriginal = function () {
        return this.value;
    };
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    TextNode.prototype.setValue = function (value) {
        this.value = value;
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getValue = function () {
        return this.value;
    };
    /**
     *
     *
     *
     * @memberOf TextNode
     */
    TextNode.prototype.remove = function () {
        this._remove(this.parent);
    };
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf TextNode
     */
    TextNode.prototype.setParent = function (element) {
        this.parent = element;
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf TextNode
     */
    TextNode.prototype.getParent = function () {
        return this.parent;
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
        this._insertAfter(element);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    TextNode.prototype.insertBefore = function (element) {
        this._insertBefore(element);
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
 * @implements {IUniversalElement<any>}
 */
var Element = (function (_super) {
    __extends(Element, _super);
    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} name
     *
     * @memberOf Element
     */
    function Element(name) {
        _super.call(this);
        /**
         *
         *
         * @type {number}
         * @memberOf Element
         */
        this.$id = ++elementIDS;
        /**
         *
         *
         * @private
         * @type {Map<string, Attribute>}
         * @memberOf Element
         */
        this.attrs = new Map();
        /**
         *
         *
         * @private
         * @type {Set<string>}
         * @memberOf Element
         */
        this.classNames = new Set();
        /**
         *
         *
         * @private
         * @type {((IUniversalElement<HTMLElement> |
         *         IUniversalTextNode<Text> | IUniversalComment<Text>)[])}
         * @memberOf Element
         */
        this.children = [];
        if (typeof name === "string") {
            this.name = name;
        }
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
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
        return false;
    };
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf Element
     */
    Element.prototype.getOriginal = function () { };
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.append = function (element) {
        var el = element;
        el.setParent(this);
        this.children.push(el);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    Element.prototype.appendTo = function (element) {
        var el = element;
        el.append(this);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.prepend = function (element) {
        element.setParent(this);
        this.children.splice(0, 0, element);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    Element.prototype.prependTo = function (element) {
        var el = element;
        el.prepend(this);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.insertAfter = function (element) {
        this._insertAfter(element);
    };
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    Element.prototype.insertBefore = function (element) {
        this._insertBefore(element);
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
     * @param {Element} element
     *
     * @memberOf Element
     */
    Element.prototype.removeChild = function (element) {
        var index = this.children.indexOf(element);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    };
    /**
     *
     *
     *
     * @memberOf Element
     */
    Element.prototype.remove = function () {
        this.parent.removeChild(this);
    };
    /**
     *
     *
     * @param {IUniversalAttribute<any>} attribute
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    Element.prototype.setAttr = function (attribute) {
        attribute.setParent(this);
        this.attrs.set(attribute.getName(), attribute);
        return attribute;
    };
    /**
     *
     *
     * @param {(IUniversalAttribute<any> | string)} attribute
     *
     * @memberOf Element
     */
    Element.prototype.removeAttr = function (attribute) {
        this.attrs.delete(attribute.getName());
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
     * @returns {IUniversalAttribute<any>}
     *
     * @memberOf Element
     */
    Element.prototype.getAttr = function (name) {
        return this.attrs.get(name);
    };
    /**
     *
     *
     * @returns {IUniversalAttribute<any>[]}
     *
     * @memberOf Element
     */
    Element.prototype.getAttrs = function () {
        var attrs = [];
        if (this.classNames.size > 0) {
            var clsNames_1 = [];
            this.classNames.forEach(function (clsName) {
                clsNames_1.push(clsName);
            });
            var clsAttribute = new Attribute("class");
            clsAttribute.setParent(this);
            clsAttribute.setValue(clsNames_1.join(" "));
            attrs.push(clsAttribute);
        }
        this.attrs.forEach(function (attr) {
            attrs.push(attr);
        });
        return attrs;
    };
    /**
     *
     *
     * @returns {((IUniversalElement<any> |
     *         IUniversalTextNode<any> | IUniversalComment<any>)[])}
     *
     * @memberOf Element
     */
    Element.prototype.getChildren = function () {
        return this.children;
    };
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
    Element.prototype.eachChild = function (closure) {
        for (var i = 0; i < this.children.length; i++) {
            closure(this.children[i], i);
        }
    };
    /**
     *
     *
     * @param {((IUniversalElement<any>
     *         | IUniversalTextNode<any>)[])} elements
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
        if (!this.classNames.has(name)) {
            this.classNames.add(name);
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
        return this.classNames.has(name);
    };
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    Element.prototype.removeClass = function (name) {
        this.classNames.delete(name);
    };
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    Element.prototype.toggleClass = function (name) {
        if (this.classNames.has(name)) {
            this.classNames.delete(name);
        }
        else {
            this.classNames.add(name);
        }
    };
    /**
     *
     *
     * @param {*} data
     * @param {string} [value]
     *
     * @memberOf Element
     */
    Element.prototype.setStyle = function (data, value) {
        var styleAttr = (this.getAttr("style") || this.setAttr(new Attribute("style")));
        styleAttr.setStyle(data, value);
    };
    /**
     *
     *
     * @param {string} name
     * @returns {string}
     *
     * @memberOf Element
     */
    Element.prototype.getStyle = function (name) {
        var styleAttr = (this.getAttr("style") || this.setAttr(new Attribute("style")));
        return styleAttr.getStyle(name);
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    Element.prototype.getSource = function () {
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
    };
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    Element.prototype.setParent = function (element) {
        this.parent = element;
    };
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Element
     */
    Element.prototype.getParent = function () {
        return this.parent;
    };
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    Element.prototype.getHTML = function () {
        var html = [];
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            html.push(child.getSource());
        }
        return html.join("");
    };
    /**
     *
     *
     *
     * @memberOf Element
     */
    Element.prototype.empty = function () {
        this.children = [];
    };
    return Element;
}(GenericDomManupulations));
exports.Element = Element;
