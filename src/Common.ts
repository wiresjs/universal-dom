/**
 *
 *
 * @export
 * @interface IUniversalTextNode
 */
export interface IUniversalTextNode<T> {
    isRehydrated();
    getOriginal(): T;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
    setParent?(element: IUniversalElement<any>): void;
    getParent(): IUniversalElement<any>;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
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
    getOriginal(): T;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    setParent?(element: IUniversalElement<any>): void;
    getParent(): IUniversalElement<any>;
    getSource(): string;
    remove(): void;
}

/**
 *
 *
 * @export
 * @interface IUniversalElement
 */
export interface IUniversalElement<T> {
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
    // attributes
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


    getAttrs(): IUniversalAttribute<any>[];

    // children
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

    // classes
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


    getSource(): string;

    setParent?(element: IUniversalElement<any>): void

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
        (element: IUniversalElement<HTMLElement>
            | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void
    }): void;

    empty(): void;
}
