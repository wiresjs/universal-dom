import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "./Common";
/**
 *
 *
 * @export
 * @class GenericDomManupulations
 */
export declare class GenericDomManupulations {
    /**
     *
     *
     * @protected
     * @param {*} element
     *
     * @memberOf GenericDomManupulations
     */
    protected _insertAfter(element: any): void;
    /**
     *
     *
     * @protected
     * @param {*} element
     *
     * @memberOf GenericDomManupulations
     */
    protected _insertBefore(element: any): void;
    /**
     *
     *
     * @protected
     * @param {*} parent
     *
     * @memberOf GenericDomManupulations
     */
    protected _remove(parent: any): void;
    /**
     *
     *
     * @protected
     * @param {*} element
     * @returns {*}
     *
     * @memberOf GenericDomManupulations
     */
    protected _getNextSibling(element: any): any;
    /**
     *
     *
     * @protected
     * @param {*} element
     * @returns {*}
     *
     * @memberOf GenericDomManupulations
     */
    protected _getPreviousSibling(element: any): any;
}
/**
 *
 *
 * @export
 * @class ServerComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<any>}
 */
export declare class ServerComment extends GenericDomManupulations implements IUniversalComment<any> {
    /**
     *
     *
     * @type {number}
     * @memberOf ServerComment
     */
    $id: number;
    /**
     *
     *
     * @private
     *
     * @memberOf ServerComment
     */
    private value;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf ServerComment
     */
    private parent;
    /**
     * Creates an instance of ServerComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf ServerComment
     */
    constructor(data: string | Comment);
    getType(): string;
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf ServerComment
     */
    getOriginal(): any;
    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    isRehydrated(): boolean;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    appendTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    prependTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     *
     * @memberOf ServerComment
     */
    remove(): void;
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf ServerComment
     */
    setParent(element: Element): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf ServerComment
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    getSource(): string;
}
/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<any>}
 */
export declare class Attribute implements IUniversalAttribute<any> {
    /**
     *
     *
     * @private
     * @type {string}
     * @memberOf Attribute
     */
    private name;
    /**
     *
     *
     * @private
     * @type {string}
     * @memberOf Attribute
     */
    private value;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf Attribute
     */
    private parent;
    /**
     *
     *
     * @private
     * @type {Map<string, string>}
     * @memberOf Attribute
     */
    private userStyles;
    /**
     * Creates an instance of Attribute.
     *
     * @param {(string | Attr)} name
     * @param {string} [value]
     *
     * @memberOf Attribute
     */
    constructor(name: string | Attr, value?: string);
    /**
     *
     *
     * @param {(string | any)} data
     * @param {string} value
     * @returns
     *
     * @memberOf Attribute
     */
    setStyle(data: string | any, value: string): void;
    /**
     *
     *
     * @param {string} key
     * @returns
     *
     * @memberOf Attribute
     */
    getStyle(key: string): string;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    getName(): string;
    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    getOriginal(): string;
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    setValue(value: string): void;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    getValue(): string;
    /**
     *
     *
     *
     * @memberOf Attribute
     */
    remove(): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf Attribute
     */
    setParent(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Attribute
     */
    getParent(): IUniversalElement<any>;
}
/**
 *
 *
 * @export
 * @class TextNode
 * @extends {GenericDomManupulations}
 * @implements {IUniversalTextNode<string>}
 */
export declare class TextNode extends GenericDomManupulations implements IUniversalTextNode<string> {
    /**
     *
     *
     * @private
     *
     * @memberOf TextNode
     */
    private value;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf TextNode
     */
    private parent;
    /**
     * Creates an instance of TextNode.
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    constructor(value: string);
    getType(): string;
    /**
     *
     *
     * @returns
     *
     * @memberOf TextNode
     */
    isRehydrated(): boolean;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    getOriginal(): string;
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    setValue(value: string): void;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    getValue(): string;
    /**
     *
     *
     *
     * @memberOf TextNode
     */
    remove(): void;
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf TextNode
     */
    setParent(element: Element): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf TextNode
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    appendTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    prependTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    getSource(): string;
}
/**
 *
 *
 * @export
 * @class Element
 * @extends {GenericDomManupulations}
 * @implements {IUniversalElement<any>}
 */
export declare class Element extends GenericDomManupulations implements IUniversalElement<any> {
    /**
     *
     *
     * @type {number}
     * @memberOf Element
     */
    $id: number;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf Element
     */
    private parent;
    /**
     *
     *
     * @private
     * @type {string}
     * @memberOf Element
     */
    private name;
    /**
     *
     *
     * @private
     * @type {Map<string, Attribute>}
     * @memberOf Element
     */
    private attrs;
    /**
     *
     *
     * @private
     * @type {Set<string>}
     * @memberOf Element
     */
    private classNames;
    /**
     *
     *
     * @private
     * @type {((IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<Text>)[])}
     * @memberOf Element
     */
    private children;
    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} name
     *
     * @memberOf Element
     */
    constructor(name: string | HTMLElement);
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    getType(): string;
    /**
     *
     *
     * @returns
     *
     * @memberOf Element
     */
    isRehydrated(): boolean;
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf Element
     */
    getOriginal(): any;
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    append(element: IUniversalElement<any> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    appendTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    prependTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    removeChild(element: Element): void;
    /**
     *
     *
     *
     * @memberOf Element
     */
    remove(): void;
    /**
     *
     *
     * @param {IUniversalAttribute<any>} attribute
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr>;
    /**
     *
     *
     * @param {(IUniversalAttribute<any> | string)} attribute
     *
     * @memberOf Element
     */
    removeAttr(attribute: IUniversalAttribute<any> | string): void;
    /**
     *
     *
     * @param {string} name
     * @param {*} [value]
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    /**
     *
     *
     * @param {string} name
     * @returns {IUniversalAttribute<any>}
     *
     * @memberOf Element
     */
    getAttr(name: string): IUniversalAttribute<any>;
    /**
     *
     *
     * @returns {IUniversalAttribute<any>[]}
     *
     * @memberOf Element
     */
    getAttrs(): IUniversalAttribute<any>[];
    /**
     *
     *
     * @returns {((IUniversalElement<any> |
     *         IUniversalTextNode<any> | IUniversalComment<any>)[])}
     *
     * @memberOf Element
     */
    getChildren(): (IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)[];
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
    eachChild(closure: {
        (element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>, index: number): void;
    }): void;
    /**
     *
     *
     * @param {((IUniversalElement<any>
     *         | IUniversalTextNode<any>)[])} elements
     *
     * @memberOf Element
     */
    setChildren(elements: (IUniversalElement<any> | IUniversalTextNode<any>)[]): void;
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    addClass(name: string): void;
    /**
     *
     *
     * @param {string} name
     * @returns {boolean}
     *
     * @memberOf Element
     */
    hasClass(name: string): boolean;
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    removeClass(name: string): void;
    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    toggleClass(name: string): void;
    /**
     *
     *
     * @param {*} data
     * @param {string} [value]
     *
     * @memberOf Element
     */
    setStyle(data: any, value?: string): void;
    /**
     *
     *
     * @param {string} name
     * @returns {string}
     *
     * @memberOf Element
     */
    getStyle(name: string): string;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    getSource(): string;
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    setParent(element: Element): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Element
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    getHTML(): string;
    /**
     *
     *
     *
     * @memberOf Element
     */
    empty(): void;
}
