(function($__exports__, $isBackend) {var __local__ = {};var define = function(n, d, f) {__local__[n] = { d: d, f: f }};var __resolve__ = function(name) {var m = __local__[name];if (m === undefined) {if ($isBackend) {return require(name);} else {$__exports__.__npm__ = $__exports__.__npm__ || {};return $__exports__.__npm__[name];}}if (m.r) { return m.r; }m.r = {};var z = [__resolve__, m.r];for (var i = 2; i < m.d.length; i++) {z.push(__resolve__(m.d[i]));}m.f.apply(null, z);return m.r;};
define("Common", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("Browser", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     *
     *
     * @param {*} node
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     */
    let mapNodeObject = (node) => {
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
    class GenericDomManupulations {
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
            let original = element.original;
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
        _getPreviousSibling(element) {
            let original = element.original;
            return mapNodeObject(original.previousSibling);
        }
    }
    exports.GenericDomManupulations = GenericDomManupulations;
    /**
     *
     *
     * @export
     * @class BrowserComment
     * @extends {GenericDomManupulations}
     * @implements {IUniversalComment<Comment>}
     */
    class BrowserComment extends GenericDomManupulations {
        /**
         * Creates an instance of BrowserComment.
         *
         * @param {(string | Comment)} data
         *
         * @memberOf BrowserComment
         */
        constructor(data) {
            super();
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
        /**
         *
         *
         * @returns
         *
         * @memberOf BrowserComment
         */
        isRehydrated() {
            return this._isRehydrated;
        }
        /**
         *
         *
         * @returns {Comment}
         *
         * @memberOf BrowserComment
         */
        getOriginal() {
            return this.original;
        }
        /**
         *
         *
         * @param {IUniversalElement<any>} element
         *
         * @memberOf BrowserComment
         */
        appendTo(element) {
            element.append(this);
        }
        /**
         *
         *
         * @param {IUniversalElement<any>} element
         *
         * @memberOf BrowserComment
         */
        prependTo(element) {
            element.prepend(this);
        }
        /**
         *
         *
         * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
         *
         * @memberOf BrowserComment
         */
        insertAfter(element) {
            let referenceNode = element.getOriginal();
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
        insertBefore(element) {
            let referenceNode = element.getOriginal();
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
        getNextSibling() {
            return this._getNextSibling(this);
        }
        /**
         *
         *
         * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
         *
         * @memberOf BrowserComment
         */
        getPreviousSibling() {
            return this._getPreviousSibling(this);
        }
        /**
         *
         *
         *
         * @memberOf BrowserComment
         */
        remove() {
            this.original.parentElement.removeChild(this.original);
        }
        /**
         *
         *
         * @returns {IUniversalElement<any>}
         *
         * @memberOf BrowserComment
         */
        getParent() {
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
        getSource() {
            return `<!--${this.original.nodeValue}-->`;
        }
    }
    exports.BrowserComment = BrowserComment;
    /**
     *
     *
     * @export
     * @class Attribute
     * @implements {IUniversalAttribute<Attr>}
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
        getName() {
            return this.original.name;
        }
        /**
         *
         *
         * @returns
         *
         * @memberOf Attribute
         */
        getOriginal() {
            return this.original;
        }
        /**
         *
         *
         * @param {string} value
         *
         * @memberOf Attribute
         */
        setValue(value) {
            this.original.value = value;
        }
        /**
         *
         *
         * @returns {string}
         *
         * @memberOf Attribute
         */
        getValue() {
            return this.original.value;
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
         * @param {Element} parent
         *
         * @memberOf Attribute
         */
        setParent(parent) {
            this.parent = parent;
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
     * @implements {IUniversalTextNode<Text>}
     */
    class TextNode extends GenericDomManupulations {
        /**
         * Creates an instance of TextNode.
         *
         * @param {(string | Text)} data
         *
         * @memberOf TextNode
         */
        constructor(data) {
            super();
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
        /**
         *
         *
         * @returns
         *
         * @memberOf TextNode
         */
        isRehydrated() {
            return this._isRehydrated;
        }
        /**
         *
         *
         * @returns {Text}
         *
         * @memberOf TextNode
         */
        getOriginal() {
            return this.original;
        }
        /**
         *
         *
         * @param {string} value
         *
         * @memberOf TextNode
         */
        setValue(value) {
            this.original.nodeValue = value;
        }
        /**
         *
         *
         * @returns {string}
         *
         * @memberOf TextNode
         */
        getValue() {
            return this.original.nodeValue;
        }
        /**
         *
         *
         *
         * @memberOf TextNode
         */
        remove() {
            this.original.parentElement.removeChild(this.original);
        }
        /**
         *
         *
         * @returns {IUniversalElement<any>}
         *
         * @memberOf TextNode
         */
        getParent() {
            return new Element(this.original.parentElement);
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
            let referenceNode = element.getOriginal();
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
        insertBefore(element) {
            let referenceNode = element.getOriginal();
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
     * @implements {IUniversalElement<HTMLElement>}
     */
    class Element extends GenericDomManupulations {
        /**
         * Creates an instance of Element.
         *
         * @param {(string | HTMLElement)} data
         *
         * @memberOf Element
         */
        constructor(data) {
            super();
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
        /**
         *
         *
         * @returns
         *
         * @memberOf Element
         */
        isRehydrated() {
            return this._isRehydrated;
        }
        /**
         *
         *
         * @returns {HTMLElement}
         *
         * @memberOf Element
         */
        getOriginal() {
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
        append(element) {
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
        appendTo(element) {
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
        prepend(element) {
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
        prependTo(element) {
            element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
        }
        /**
         *
         *
         * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
         *
         * @memberOf Element
         */
        insertAfter(element) {
            let referenceNode = element.getOriginal();
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
        insertBefore(element) {
            let referenceNode = element.getOriginal();
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
         *
         * @memberOf Element
         */
        remove() {
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
        setAttr(attribute) {
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
        removeAttr(attr) {
            if (attr instanceof Attribute) {
                this.original.removeAttributeNode(attr.getOriginal());
            }
            else {
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
         * @returns {IUniversalAttribute<Attr>}
         *
         * @memberOf Element
         */
        getAttr(name) {
            let oAttr = this.original.getAttributeNode(name);
            if (oAttr) {
                let attr = new Attribute(oAttr);
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
        getAttrs() {
            let attrs = [];
            let originalAttrs = this.original.attributes;
            for (let i = 0; i < originalAttrs.length; i++) {
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
        getChildren() {
            let childNodes = this.original.childNodes;
            let result = [];
            for (let i = 0; i < childNodes.length; i++) {
                let node = mapNodeObject(childNodes[i]);
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
        hasClass(name) {
            return this.original.classList.contains(name);
        }
        /**
         *
         *
         * @param {string} name
         *
         * @memberOf Element
         */
        removeClass(name) {
            this.original.classList.remove(name);
        }
        /**
         *
         *
         * @param {string} name
         *
         * @memberOf Element
         */
        toggleClass(name) {
            if (this.original.classList.contains(name)) {
                this.original.classList.remove(name);
            }
            else {
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
        /**
         *
         *
         * @param {string} name
         * @returns
         *
         * @memberOf Element
         */
        getStyle(name) {
            return this.original.style[name];
        }
        /**
         *
         *
         * @returns {string}
         *
         * @memberOf Element
         */
        getSource() {
            let html = this.original.outerHTML;
            return this.cleanUpHTML(html);
        }
        /**
         *
         *
         * @returns {IUniversalElement<any>}
         *
         * @memberOf Element
         */
        getParent() {
            let parent = this.original.parentElement;
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
        eachChild(closure) {
            let childNodes = this.original.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
                let el = childNodes[i];
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
        getHTML() {
            let html = this.original.innerHTML;
            return this.cleanUpHTML(html);
        }
        /**
         *
         *
         *
         * @memberOf Element
         */
        empty() {
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
        cleanUpHTML(html) {
            html = html.replace(/\r?\n|\r|\t/g, "");
            html = html.replace(/\s{2,}/g, " ");
            html = html.replace(/>\s+</g, "><");
            html = html.replace(/\sclass=""/g, "");
            html = html.replace(/\s"/g, '"');
            html = html.trim();
            return html;
        }
    }
    exports.Element = Element;
});
define("Server", ["require", "exports"], function (require, exports) {
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
});
define("UniversalDom", ["require", "exports", "Browser", "Server"], function (require, exports, Browser_1, Server_1) {
    "use strict";
    const isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";
    /**
     *
     *
     * @export
     * @class UniversalDom
     */
    class UniversalDom {
        /**
         *
         *
         * @static
         * @param {(string | HTMLElement)} data
         * @returns {IUniversalElement<any>}
         *
         * @memberOf UniversalDom
         */
        static createElement(data) {
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
        static createAttribute(name, value) {
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
        static createTextNode(value) {
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
        static createComment(value) {
            return isBackend ? new Server_1.ServerComment(value) : new Browser_1.BrowserComment(value);
        }
    }
    exports.UniversalDom = UniversalDom;
});
define("index", ["require", "exports", "UniversalDom"], function (require, exports, UniversalDom_1) {
    "use strict";
    exports.Dom = UniversalDom_1.UniversalDom;
});

var __expose__ = function(n, m, w, c) {
    var cs = c ? c.split(",") : [];
    if (cs.length) { for (var ln in __local__) { for (var i = 0; i < cs.length; i++) { if (ln.indexOf(cs[i]) === 0) { __resolve__(ln) } } } }
    var e = __resolve__(n);
    var bc;
    if (!$isBackend) { var npm = $__exports__.__npm__ = $__exports__.__npm__ || {}; if (m) { bc = npm[m] = {} } }
    for (var k in e) {
        $isBackend || w ? $__exports__[k] = e[k] : null;
        bc ? bc[k] = e[k] : null;
    }

};
__expose__("index", "universal-dom", true, "");
})(typeof module !== "undefined" && module.exports && typeof process === "object" ?
    exports : typeof window !== "undefined" ? window : this,
    typeof module !== "undefined" && module.exports && typeof process === "object");