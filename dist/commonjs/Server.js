"use strict";
let elementIDS = 0;
/**
 *
 *
 * @export
 * @class GenericDomManupulations
 */
class GenericDomManupulations {
    /**
     *
     *
     * @protected
     * @param {*} element
     *
     * @memberOf GenericDomManupulations
     */
    _insertAfter(element) {
        let parent = element.getParent();
        let children = parent.getChildren();
        let index = children.indexOf(element);
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
    _insertBefore(element) {
        let parent = element.getParent();
        let children = parent.getChildren();
        let index = children.indexOf(element);
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
    _remove(parent) {
        let children = parent.getChildren();
        if (parent) {
            let index = children.indexOf(this);
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
    _getNextSibling(element) {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
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
    _getPreviousSibling(element) {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index - 1 >= 0) {
                return children[index - 1];
            }
        }
    }
}
exports.GenericDomManupulations = GenericDomManupulations;
/**
 *
 *
 * @export
 * @class ServerComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<any>}
 */
class ServerComment extends GenericDomManupulations {
    /**
     * Creates an instance of ServerComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf ServerComment
     */
    constructor(data) {
        super();
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
    getType() {
        return "comment";
    }
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf ServerComment
     */
    getOriginal() {
        return this;
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    isRehydrated() {
        return false;
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    appendTo(element) {
        element.append(this);
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    prependTo(element) {
        element.prepend(this);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    insertAfter(element) {
        this._insertAfter(element);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    insertBefore(element) {
        this._insertBefore(element);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    getNextSibling() {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    getPreviousSibling() {
        return this._getPreviousSibling(this);
    }
    /**
     *
     *
     *
     * @memberOf ServerComment
     */
    remove() {
        this._remove(this.parent);
    }
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf ServerComment
     */
    setParent(element) {
        this.parent = element;
    }
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf ServerComment
     */
    getParent() {
        return this.parent;
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    getSource() {
        return `<!--${this.value}-->`;
    }
}
exports.ServerComment = ServerComment;
/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<any>}
 */
class Attribute {
    /**
     * Creates an instance of Attribute.
     *
     * @param {(string | Attr)} name
     * @param {string} [value]
     *
     * @memberOf Attribute
     */
    constructor(name, value) {
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
    setStyle(data, value) {
        if (typeof data === "object") {
            for (let k in data) {
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
    getStyle(key) {
        return this.userStyles.get(key);
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    getName() {
        return this.name;
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    getOriginal() {
        return this.value;
    }
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    setValue(value) {
        this.value = value;
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    getValue() {
        if (this.name === "style") {
            let styles = [];
            this.userStyles.forEach((value, key) => {
                styles.push(`${key}: ${value}`);
            });
            return styles.length > 0 ? styles.join("; ") + ";" : this.value;
        }
        return this.value;
    }
    /**
     *
     *
     *
     * @memberOf Attribute
     */
    remove() {
        this.parent.removeAttr(this);
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf Attribute
     */
    setParent(element) {
        this.parent = element;
    }
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Attribute
     */
    getParent() {
        return this.parent;
    }
}
exports.Attribute = Attribute;
/**
 *
 *
 * @export
 * @class TextNode
 * @extends {GenericDomManupulations}
 * @implements {IUniversalTextNode<string>}
 */
class TextNode extends GenericDomManupulations {
    /**
     * Creates an instance of TextNode.
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    constructor(value) {
        super();
        this.value = value;
    }
    getType() {
        return "text";
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf TextNode
     */
    isRehydrated() {
        return false;
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    getOriginal() {
        return this.value;
    }
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    setValue(value) {
        this.value = value;
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    getValue() {
        return this.value;
    }
    /**
     *
     *
     *
     * @memberOf TextNode
     */
    remove() {
        this._remove(this.parent);
    }
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf TextNode
     */
    setParent(element) {
        this.parent = element;
    }
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf TextNode
     */
    getParent() {
        return this.parent;
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    appendTo(element) {
        element.append(this);
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    prependTo(element) {
        element.prepend(this);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    insertAfter(element) {
        this._insertAfter(element);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    insertBefore(element) {
        this._insertBefore(element);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    getNextSibling() {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    getPreviousSibling() {
        return this._getPreviousSibling(this);
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    getSource() {
        return this.getValue();
    }
}
exports.TextNode = TextNode;
/**
 *
 *
 * @export
 * @class Element
 * @extends {GenericDomManupulations}
 * @implements {IUniversalElement<any>}
 */
class Element extends GenericDomManupulations {
    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} name
     *
     * @memberOf Element
     */
    constructor(name) {
        super();
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
    getType() {
        return "element";
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf Element
     */
    isRehydrated() {
        return false;
    }
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf Element
     */
    getOriginal() { }
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    append(element) {
        let el = element;
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
    appendTo(element) {
        let el = element;
        el.append(this);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    prepend(element) {
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
    prependTo(element) {
        let el = element;
        el.prepend(this);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    insertAfter(element) {
        this._insertAfter(element);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    insertBefore(element) {
        this._insertBefore(element);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    getNextSibling() {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    getPreviousSibling() {
        return this._getPreviousSibling(this);
    }
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    removeChild(element) {
        let index = this.children.indexOf(element);
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
    remove() {
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
    setAttr(attribute) {
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
    removeAttr(attribute) {
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
    attr(name, value) {
        if (value === undefined) {
            return this.getAttr(name);
        }
        else {
            let attr = this.getAttr(name) || this.setAttr(new Attribute(name));
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
    getAttr(name) {
        return this.attrs.get(name);
    }
    /**
     *
     *
     * @returns {IUniversalAttribute<any>[]}
     *
     * @memberOf Element
     */
    getAttrs() {
        let attrs = [];
        if (this.classNames.size > 0) {
            let clsNames = [];
            this.classNames.forEach(clsName => {
                clsNames.push(clsName);
            });
            let clsAttribute = new Attribute("class");
            clsAttribute.setParent(this);
            clsAttribute.setValue(clsNames.join(" "));
            attrs.push(clsAttribute);
        }
        this.attrs.forEach(attr => {
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
    getChildren() {
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
    eachChild(closure) {
        for (let i = 0; i < this.children.length; i++) {
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
    setChildren(elements) {
        this.children = elements;
    }
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    addClass(name) {
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
    hasClass(name) {
        return this.classNames.has(name);
    }
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    removeClass(name) {
        this.classNames.delete(name);
    }
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    toggleClass(name) {
        if (this.classNames.has(name)) {
            this.classNames.delete(name);
        }
        else {
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
    setStyle(data, value) {
        let styleAttr = (this.getAttr("style") || this.setAttr(new Attribute("style")));
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
    getStyle(name) {
        let styleAttr = (this.getAttr("style") || this.setAttr(new Attribute("style")));
        return styleAttr.getStyle(name);
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    getSource() {
        let html = [];
        html.push(`<${this.name}`);
        let localAttrs = [];
        this.attrs.forEach(attr => {
            localAttrs.push(`${attr.getName()}="${attr.getValue() || ""}"`);
        });
        let clsNames = [];
        this.classNames.forEach(clsName => {
            clsNames.push(clsName);
        });
        if (this.classNames.size > 0) {
            html.push(` class="${clsNames.join(" ")}"`);
        }
        if (localAttrs.length) {
            html.push(" " + localAttrs.join(" "));
        }
        html.push(">");
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            html.push(child.getSource());
        }
        html.push(`</${this.name}>`);
        return html.join("");
    }
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    setParent(element) {
        this.parent = element;
    }
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Element
     */
    getParent() {
        return this.parent;
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    getHTML() {
        let html = [];
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
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
    empty() {
        this.children = [];
    }
}
exports.Element = Element;
