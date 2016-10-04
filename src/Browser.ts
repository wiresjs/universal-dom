import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";


/**
 *
 *
 * @param {*} node
 * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
 */
let mapNodeObject = (node: any): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> => {
    if (!node) {
        return;
    }
    if (node.nodeType === 1) {
        return new Element(<HTMLElement>node);
    }
    if (node.nodeType === 8) {
        return new BrowserComment(<Comment>node);
    }
    if (node.nodeType === 3) {
        return new TextNode(<Text>node);
    }
}

/**
 *
 *
 * @export
 * @class GenericDomManupulations
 */
export class GenericDomManupulations {

    /**
     *
     *
     * @protected
     * @param {*} element
     * @returns {*}
     *
     * @memberOf GenericDomManupulations
     */
    protected _getNextSibling(element: any): any {
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
    protected _getPreviousSibling(element: any): any {
        let original = element.original;
        return mapNodeObject(original.previousSibling);
    }
}

/**
 *
 *
 * @export
 * @class BrowserComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<Comment>}
 */
export class BrowserComment extends GenericDomManupulations implements IUniversalComment<Comment> {
    /**
     *
     *
     * @private
     * @type {Comment}
     * @memberOf BrowserComment
     */
    private original: Comment;

    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf BrowserComment
     */
    private _isRehydrated: boolean = false;

    /**
     * Creates an instance of BrowserComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf BrowserComment
     */
    constructor(data: string | Comment) {
        super();
        if (typeof data === "string") {
            this.original = document.createComment(data);
        } else {
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
    public isRehydrated() {
        return this._isRehydrated;
    }

    /**
     *
     *
     * @returns {Comment}
     *
     * @memberOf BrowserComment
     */
    public getOriginal(): Comment {
        return this.original;
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf BrowserComment
     */
    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf BrowserComment
     */
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf BrowserComment
     */
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
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
    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
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
    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf BrowserComment
     */
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    /**
     *
     *
     *
     * @memberOf BrowserComment
     */
    public remove(): void {
        this.original.parentElement.removeChild(this.original);
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf BrowserComment
     */
    public getParent(): IUniversalElement<any> {
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
    public getSource() {
        return `<!--${this.original.nodeValue}-->`;
    }

}

/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<Attr>}
 */
export class Attribute implements IUniversalAttribute<Attr> {

    /**
     *
     *
     * @private
     * @type {Attr}
     * @memberOf Attribute
     */
    private original: Attr;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf Attribute
     */
    private parent: Element;

    /**
     * Creates an instance of Attribute.
     *
     * @param {(string | Attr)} name
     * @param {string} [value]
     *
     * @memberOf Attribute
     */
    constructor(name: string | Attr, value?: string) {

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
    public getName(): string {
        return this.original.name;
    }


    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    public getOriginal() {
        return this.original;
    }

    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    public setValue(value: string): void {
        this.original.value = value;
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    public getValue(): string {
        return this.original.value;
    }

    /**
     *
     *
     *
     * @memberOf Attribute
     */
    public remove(): void {
        this.parent.removeAttr(this);
    }

    /**
     *
     *
     * @param {Element} parent
     *
     * @memberOf Attribute
     */
    public setParent(parent: Element) {
        this.parent = parent;
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Attribute
     */
    public getParent(): IUniversalElement<any> {
        return this.parent;
    }
}

/**
 *
 *
 * @export
 * @class TextNode
 * @extends {GenericDomManupulations}
 * @implements {IUniversalTextNode<Text>}
 */
export class TextNode extends GenericDomManupulations implements IUniversalTextNode<Text> {

    /**
     *
     *
     * @private
     * @type {Text}
     * @memberOf TextNode
     */
    private original: Text;

    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf TextNode
     */
    private _isRehydrated: boolean = false;

    /**
     * Creates an instance of TextNode.
     *
     * @param {(string | Text)} data
     *
     * @memberOf TextNode
     */
    constructor(data: string | Text) {
        super();
        if (data instanceof Text) {
            this.original = data;
            this._isRehydrated = true;
        } else {
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
    public isRehydrated() {
        return this._isRehydrated;
    }

    /**
     *
     *
     * @returns {Text}
     *
     * @memberOf TextNode
     */
    public getOriginal(): Text {
        return this.original;
    }

    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    public setValue(value: string): void {
        this.original.nodeValue = value;
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    public getValue(): string {
        return this.original.nodeValue;
    }

    /**
     *
     *
     *
     * @memberOf TextNode
     */
    public remove(): void {
        this.original.parentElement.removeChild(this.original);
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf TextNode
     */
    public getParent(): IUniversalElement<any> {
        return new Element(this.original.parentElement);
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
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
    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
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
    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    public getSource(): string {
        return this.getValue();
    }
}

/**
 *
 *
 * @export
 * @class Element
 * @extends {GenericDomManupulations}
 * @implements {IUniversalElement<HTMLElement>}
 */
export class Element extends GenericDomManupulations implements IUniversalElement<HTMLElement> {

    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf Element
     */
    private _isRehydrated: boolean = false;

    /**
     *
     *
     * @private
     * @type {HTMLElement}
     * @memberOf Element
     */
    private original: HTMLElement;

    /**
     *
     *
     * @private
     * @type {((IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<Comment>)[])}
     * @memberOf Element
     */
    private children: (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<Comment>)[] = [];

    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} data
     *
     * @memberOf Element
     */
    constructor(data: string | HTMLElement) {
        super();
        if (data instanceof HTMLElement) {
            this.original = data;
            this._isRehydrated = true;
        } else {
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
    public isRehydrated() {
        return this._isRehydrated;
    }

    /**
     *
     *
     * @returns {HTMLElement}
     *
     * @memberOf Element
     */
    public getOriginal(): HTMLElement {
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
    public append(element: IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<any>): void {

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
    public appendTo(element: IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text>): void {
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
    public prepend(element: IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<any>): void {
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
    public prependTo(element: IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text>): void {
        element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>) {
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
    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>) {
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
    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    /**
     *
     *
     *
     * @memberOf Element
     */
    public remove(): void {
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
    public setAttr(attribute: IUniversalAttribute<Attr>): IUniversalAttribute<Attr> {
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
    public removeAttr(attr: IUniversalAttribute<Attr> | string) {
        if (attr instanceof Attribute) {
            this.original.removeAttributeNode(attr.getOriginal());
        } else {
            this.original.removeAttribute(<string>attr);
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
    public attr(name: string, value?: any): IUniversalAttribute<Attr> {
        if (value === undefined) {
            return this.getAttr(name);
        } else {
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
    public getAttr(name: string): IUniversalAttribute<Attr> {
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
    public getAttrs(): IUniversalAttribute<Attr>[] {
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
    public getChildren(): (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text>)[] {
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
    public setChildren(elements: (IUniversalElement<HTMLElement>
        | IUniversalTextNode<Text>)[]): void {
        this.children = elements;
    }

    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    public addClass(name: string): void {
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
    public hasClass(name: string): boolean {
        return this.original.classList.contains(name);
    }

    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    public removeClass(name: string): void {
        this.original.classList.remove(name);
    }

    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    public toggleClass(name: string): void {
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
    public setStyle(data: any, value?: string) {
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
    public getStyle(name: string) {
        return this.original.style[name];
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    public getSource(): string {
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
    public getParent(): IUniversalElement<any> {
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
    public eachChild(closure: {
        (element: IUniversalElement<HTMLElement>
            | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void
    }) {
        let childNodes = this.original.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            let el = <HTMLElement>childNodes[i];
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
    public getHTML(): string {
        let html = this.original.innerHTML;
        return this.cleanUpHTML(html);
    }

    /**
     *
     *
     *
     * @memberOf Element
     */
    public empty() {
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
    private cleanUpHTML(html: string): string {
        html = html.replace(/\r?\n|\r|\t/g, "");
        html = html.replace(/\s{2,}/g, " ");
        html = html.replace(/>\s+</g, "><");
        html = html.replace(/\sclass=""/g, "");
        html = html.replace(/\s"/g, '"');
        html = html.trim();
        return html;
    }
}
