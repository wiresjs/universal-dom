import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";

export class BrowserComment implements IUniversalComment<Comment> {
    private original: Comment;
    private _isRehydrated: boolean = false;

    constructor(data: string | Comment) {
        if (typeof data === "string") {
            this.original = document.createComment(data);
        } else {
            this._isRehydrated = true;
            this.original = data;
        }
    }
    public isRehydrated() {
        return this._isRehydrated;
    }

    public getOriginal(): Comment {
        return this.original;
    }

    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        let referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        }
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        let referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode);
        }
    }

    public remove(): void {
        this.original.parentElement.removeChild(this.original);
    }

    public getParent(): IUniversalElement<any> {
        if (this.original.parentNode) {
            return new Element(this.original.parentElement);
        }
    }

    public getSource() {
        return `<--${this.original.nodeValue}-->`;
    }

}


export class Attribute implements IUniversalAttribute<Attr> {

    private original: Attr;
    private parent: Element;

    constructor(name: string | Attr, value?: string) {
        this.original = typeof name === "string" ? document.createAttribute(name) : name;
        if (value !== undefined) {
            this.original.value = value;
        }
    }

    public getName(): string {
        return this.original.name;
    }


    public getOriginal() {
        return this.original;
    }

    public setValue(value: string): void {
        this.original.value = value;
    }

    public getValue(): string {
        return this.original.value;
    }

    public remove(): void {
        this.parent.removeAttr(this);
    }
    public setParent(parent: Element) {
        this.parent = parent;
    }
    public getParent(): IUniversalElement<any> {
        return this.parent;
    }
}



export class TextNode implements IUniversalTextNode<Text> {

    private original: Text;

    private _isRehydrated: boolean = false;

    constructor(data: string | Text) {
        if (data instanceof Text) {
            this.original = data;
            this._isRehydrated = true;
        } else {
            this.original = document.createTextNode(data);
        }
    }

    public isRehydrated() {
        return this._isRehydrated;
    }

    public getOriginal(): Text {
        return this.original;
    }

    public setValue(value: string): void {
        this.original.nodeValue = value;
    }

    public getValue(): string {
        return this.original.nodeValue;
    }

    public remove(): void {
        this.original.parentElement.removeChild(this.original);
    }

    public getParent(): IUniversalElement<any> {
        return new Element(this.original.parentElement);
    }

    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }

    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        let referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        }
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        let referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode);
        }
    }

    public getSource(): string {
        return this.getValue();
    }
}




/**
 *
 *
 * @export
 * @class Element
 * @implements {IUniversalElement<HTMLElement>}
 */
export class Element implements IUniversalElement<HTMLElement> {

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
     *         IUniversalTextNode<Text>)[])}
     * @memberOf Element
     */
    private children: (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<Comment>)[] = [];

    /**
     * Creates an instance of Element.
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    constructor(data: string | HTMLElement) {

        if (data instanceof HTMLElement) {
            this.original = data;
            this._isRehydrated = true;
        } else {
            this.original = document.createElement(data);
        }
    }

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
     *         IUniversalTextNode<Text>)} element
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
     *         IUniversalTextNode<Text>)} element
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


    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>) {
        let referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        }
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>) {
        let referenceNode = element.getOriginal();
        if (referenceNode.parentNode) {
            referenceNode.parentNode.insertBefore(this.original, referenceNode);
        }
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

    // attributes
    /**
     *
     *
     * @param {IUniversalAttribute} attribute
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
     * @param {(IUniversalAttribute<any> | string)} attribute
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
     * @returns {IUniversalAttribute}
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
            let node = childNodes[i];
            if (node.nodeType === 1) {
                result.push(new Element(<HTMLElement>node));
            }
            if (node.nodeType === 8) {
                result.push(new BrowserComment(<Comment>node));
            }
            if (node.nodeType === 3) {
                if (node.nodeValue) {
                    result.push(new TextNode(<Text>node));
                }
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
     * @param {string} name
     * @param {string} value
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
     * @returns
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
     * @returns
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

    public getHTML(): string {
        let html = this.original.innerHTML;
        return this.cleanUpHTML(html);
    }

    public empty() {
        while (this.original.firstChild) {
            this.original.removeChild(this.original.firstChild);
        }
    }

    private cleanUpHTML(html: string): string {
        html = html.replace(/\r?\n|\r|\t/g, "");
        html = html.replace(/\s{2,}/g, " ");
        html = html.replace(/>\s+</g, "><");
        html = html.replace(/\sclass=""/g, "");
        html = html.trim();
        return html;
    }
}
