import { Attribute } from "./Attribute";
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
    public append(element: IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text>): void {
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
        IUniversalTextNode<Text>): void {
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