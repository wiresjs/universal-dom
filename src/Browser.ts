import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";

export class BrowserComment implements IUniversalComment<Comment> {
    private original: Comment;

    constructor(data: string | Comment) {
        if (typeof data === "string") {
            this.original = document.createComment(data);
        } else {
            this.original = data;
        }
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
     * Creates an instance of Attribute.
     *
     * @param {string} name
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
        this.original.parentElement.removeAttribute(this.original.name);
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Attribute
     */
    public getParent(): IUniversalElement<any> {
        return new Element(this.original.parentElement);
    }
}



export class TextNode implements IUniversalTextNode<Text> {
    /**
     *
     *
     * @private
     * @type {Text}
     * @memberOf TextNode
     */
    private original: Text;

    /**
     * Creates an instance of TextNode.
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    constructor(data: string | Text) {
        if (data instanceof Text) {
            this.original = data;
        } else {
            this.original = document.createTextNode(data);
        }

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
     * @memberOf IUniversalTextNode
     */
    public getValue(): string {
        return this.original.nodeValue;
    }
    /**
     *
     *
     *
     * @memberOf IUniversalTextNode
     */
    public remove(): void {
        this.original.parentElement.removeChild(this.original);
    }

    public getParent(): IUniversalElement<any> {
        return new Element(this.original.parentElement);
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
        } else {
            this.original = document.createElement(data);
        }
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
    public removeAttr(attribute: IUniversalAttribute<any> | string) {

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

    // children
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
        this.original.classList.add(name);
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
        html = html.replace(/\r?\n|\r|\t/g, '');
        html = html.replace(/\s{2,}/g, " ");
        html = html.replace(/>\s+</g, "><");
        html = html.trim();
        return html;
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
}