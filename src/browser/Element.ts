import {IUniversalElement, IUniversalTextNode, IUniversalAttribute} from "../Common";

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
     * @type {(IUniversalAttribute<Attr>)[]}
     * @memberOf Element
     */
    private attrs: (IUniversalAttribute<Attr>)[] = [];

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
        IUniversalTextNode<Text>)[] = [];

    /**
     * Creates an instance of Element.
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    constructor(name: string) {
        this.original = document.createElement(name);
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
    public addChild(element: IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text>): void {
        this.children.push(element);
        this.original.appendChild(element.getOriginal());
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
    public setAttr(attribute: IUniversalAttribute<Attr>): void {
        this.attrs.push(attribute);
        this.original.setAttributeNode(attribute.getOriginal());
    }


    public attr(name : string, value? : any)
    {

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
        for (let i = 0; i < this.attrs.length; i++) {
            if (this.attrs[i].getName() === name) {
                return this.attrs[i];
            }
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
        return this.children;
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
}