/**
 *
 *
 * @export
 * @interface IUniversalTextNode
 */
export interface IUniversalTextNode<T> {
    getType(): any;
    /**
     *
     *
     *
     * @memberOf IUniversalTextNode
     */
    isRehydrated(): any;
    /**
     *
     *
     * @returns {T}
     *
     * @memberOf IUniversalTextNode
     */
    getOriginal(): T;
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf IUniversalTextNode
     */
    setValue(value: string): void;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalTextNode
     */
    getValue(): string;
    /**
     *
     *
     *
     * @memberOf IUniversalTextNode
     */
    remove(): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalTextNode
     */
    setParent?(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf IUniversalTextNode
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalTextNode
     */
    appendTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalTextNode
     */
    prependTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf IUniversalTextNode
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf IUniversalTextNode
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf IUniversalTextNode
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf IUniversalTextNode
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalTextNode
     */
    getSource(): string;
}
/**
 *
 *
 * @export
 * @interface IUniversalAttribute
 */
export interface IUniversalAttribute<T> {
    /**
     *
     *
     * @returns {T}
     *
     * @memberOf IUniversalAttribute
     */
    getOriginal(): T;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalAttribute
     */
    getName(): string;
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf IUniversalAttribute
     */
    setValue(value: string): void;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalAttribute
     */
    getValue(): string;
    /**
     *
     *
     *
     * @memberOf IUniversalAttribute
     */
    remove(): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any>)} element
     *
     * @memberOf IUniversalAttribute
     */
    setParent?(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf IUniversalAttribute
     */
    getParent(): IUniversalElement<any>;
}
export interface IUniversalComment<T> {
    getType(): any;
    /**
     *
     *
     * @returns {T}
     *
     * @memberOf IUniversalComment
     */
    getOriginal(): T;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalComment
     */
    appendTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalComment
     */
    prependTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf IUniversalComment
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf IUniversalComment
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf IUniversalComment
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf IUniversalComment
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalComment
     */
    setParent?(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf IUniversalComment
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalComment
     */
    getSource(): string;
    /**
     *
     *
     *
     * @memberOf IUniversalComment
     */
    remove(): void;
}
/**
 *
 *
 * @export
 * @interface IUniversalElement
 */
export interface IUniversalElement<T> {
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalElement
     */
    getType(): string;
    /**
     *
     *
     * @returns {T}
     *
     * @memberOf IUniversalElement
     */
    getOriginal(): T;
    /**
     *
     *
     * @param {(IUniversalElement | IUniversalElement)} element
     *
     * @memberOf IUniversalElement
     */
    append(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any>)} element
     *
     * @memberOf IUniversalElement
     */
    appendTo(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any>)} element
     *
     * @memberOf IUniversalElement
     */
    prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any>)} element
     *
     * @memberOf IUniversalElement
     */
    prependTo(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf IUniversalElement
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf IUniversalElement
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf IUniversalElement
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf IUniversalElement
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     *
     * @memberOf IUniversalElement
     */
    remove(): void;
    /**
     *
     *
     * @param {IUniversalAttribute} attribute
     *
     * @memberOf IUniversalElement
     */
    setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr>;
    /**
     *
     *
     * @param {(IUniversalAttribute<any> | string)} attribute
     *
     * @memberOf IUniversalElement
     */
    removeAttr(attribute: IUniversalAttribute<any> | string): void;
    /**
     *
     *
     * @param {string} name
     * @param {*} [value]
     *
     * @memberOf IUniversalElement
     */
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    /**
     *
     *
     * @param {string} name
     * @returns {IUniversalAttribute}
     *
     * @memberOf IUniversalElement
     */
    getAttr(name: string): IUniversalAttribute<any>;
    /**
     *
     *
     * @returns {IUniversalAttribute<any>[]}
     *
     * @memberOf IUniversalElement
     */
    getAttrs(): IUniversalAttribute<any>[];
    /**
     *
     *
     * @returns {((IUniversalElement | IUniversalElement)[])}
     *
     * @memberOf IUniversalElement
     */
    getChildren(): (IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<Text>)[];
    /**
     *
     *
     * @param {((IUniversalElement | IUniversalElement)[])} elements
     *
     * @memberOf IUniversalElement
     */
    setChildren(elements: (IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<Text>)[]): void;
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf IUniversalElement
     */
    addClass(name: string): void;
    /**
     *
     *
     * @param {string} name
     * @returns {boolean}
     *
     * @memberOf IUniversalElement
     */
    hasClass(name: string): boolean;
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf IUniversalElement
     */
    removeClass(name: string): void;
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf IUniversalElement
     */
    toggleClass(name: string): void;
    /**
     *
     *
     * @param {string} name
     * @param {string} value
     *
     * @memberOf IUniversalElement
     */
    setStyle(data: any, value?: string): void;
    /**
     *
     *
     * @param {string} name
     * @returns {string}
     *
     * @memberOf IUniversalElement
     */
    getStyle(name: string): string;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalElement
     */
    getSource(): string;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf IUniversalElement
     */
    setParent?(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf IUniversalElement
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     * Gets html from a dom
     * @returns {string}
     *
     * @memberOf IUniversalElement
     */
    getHTML(): string;
    /**
     *
     *
     * @param {({
     *         (element: IUniversalElement<HTMLElement>
     *             | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void
     *     })} closure
     *
     * @memberOf IUniversalElement
     */
    eachChild(closure: {
        (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
    }): void;
    /**
     *
     *
     *
     * @memberOf IUniversalElement
     */
    empty(): void;
}
