/**
 *
 *
 * @export
 * @interface IUniversalTextNode
 */
export interface IUniversalTextNode<T> {
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
    addChild(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
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
    setAttr(attribute: IUniversalAttribute<any>): void;
    /**
     *
     *
     * @param {string} name
     * @returns {IUniversalAttribute}
     *
     * @memberOf IUniversalElement
     */
    getAttr(name: string): IUniversalAttribute<any>;

    // children
    /**
     *
     *
     * @returns {((IUniversalElement | IUniversalElement)[])}
     *
     * @memberOf IUniversalElement
     */
    getChildren(): (IUniversalElement<any> | IUniversalTextNode<any>)[];
    /**
     *
     *
     * @param {((IUniversalElement | IUniversalElement)[])} elements
     *
     * @memberOf IUniversalElement
     */
    setChildren(elements: (IUniversalElement<any> | IUniversalTextNode<any>)[]): void;

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
     * @param {string} value
     *
     * @memberOf IUniversalElement
     */
    setStyle(data: any, value?: string): void

    /**
     *
     *
     * @param {string} name
     * @returns {string}
     *
     * @memberOf IUniversalElement
     */
    getStyle(name: string): string;
}
