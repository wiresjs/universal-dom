System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mapNodeObject, GenericDomManupulations, BrowserComment, Attribute, TextNode, Element;
    return {
        setters:[],
        execute: function() {
            /**
             *
             *
             * @param {*} node
             * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
             */
            mapNodeObject = (node) => {
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
            GenericDomManupulations = class GenericDomManupulations {
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
            };
            exports_1("GenericDomManupulations", GenericDomManupulations);
            /**
             *
             *
             * @export
             * @class BrowserComment
             * @extends {GenericDomManupulations}
             * @implements {IUniversalComment<Comment>}
             */
            BrowserComment = class BrowserComment extends GenericDomManupulations {
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
            };
            exports_1("BrowserComment", BrowserComment);
            /**
             *
             *
             * @export
             * @class Attribute
             * @implements {IUniversalAttribute<Attr>}
             */
            Attribute = class Attribute {
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
            };
            exports_1("Attribute", Attribute);
            /**
             *
             *
             * @export
             * @class TextNode
             * @extends {GenericDomManupulations}
             * @implements {IUniversalTextNode<Text>}
             */
            TextNode = class TextNode extends GenericDomManupulations {
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
            };
            exports_1("TextNode", TextNode);
            /**
             *
             *
             * @export
             * @class Element
             * @extends {GenericDomManupulations}
             * @implements {IUniversalElement<HTMLElement>}
             */
            Element = class Element extends GenericDomManupulations {
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
            };
            exports_1("Element", Element);
        }
    }
});
