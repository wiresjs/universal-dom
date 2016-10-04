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
 * @class BrowserComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<Comment>}
 */
export declare class BrowserComment extends GenericDomManupulations implements IUniversalComment<Comment> {
    /**
     *
     *
     * @private
     * @type {Comment}
     * @memberOf BrowserComment
     */
    private original;
    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf BrowserComment
     */
    private _isRehydrated;
    /**
     * Creates an instance of BrowserComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf BrowserComment
     */
    constructor(data: string | Comment);
    /**
     *
     *
     * @returns
     *
     * @memberOf BrowserComment
     */
    isRehydrated(): boolean;
    /**
     *
     *
     * @returns {Comment}
     *
     * @memberOf BrowserComment
     */
    getOriginal(): Comment;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf BrowserComment
     */
    appendTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf BrowserComment
     */
    prependTo(element: IUniversalElement<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf BrowserComment
     */
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf BrowserComment
     */
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf BrowserComment
     */
    getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf BrowserComment
     */
    getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>;
    /**
     *
     *
     *
     * @memberOf BrowserComment
     */
    remove(): void;
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf BrowserComment
     */
    getParent(): IUniversalElement<any>;
    /**
     *
     *
     * @returns
     *
     * @memberOf BrowserComment
     */
    getSource(): string;
}
/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<Attr>}
 */
export declare class Attribute implements IUniversalAttribute<Attr> {
    /**
     *
     *
     * @private
     * @type {Attr}
     * @memberOf Attribute
     */
    private original;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf Attribute
     */
    private parent;
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
    getOriginal(): Attr;
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
     * @param {Element} parent
     *
     * @memberOf Attribute
     */
    setParent(parent: Element): void;
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
 * @implements {IUniversalTextNode<Text>}
 */
export declare class TextNode extends GenericDomManupulations implements IUniversalTextNode<Text> {
    /**
     *
     *
     * @private
     * @type {Text}
     * @memberOf TextNode
     */
    private original;
    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf TextNode
     */
    private _isRehydrated;
    /**
     * Creates an instance of TextNode.
     *
     * @param {(string | Text)} data
     *
     * @memberOf TextNode
     */
    constructor(data: string | Text);
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
     * @returns {Text}
     *
     * @memberOf TextNode
     */
    getOriginal(): Text;
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
 * @implements {IUniversalElement<HTMLElement>}
 */
export declare class Element extends GenericDomManupulations implements IUniversalElement<HTMLElement> {
    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf Element
     */
    private _isRehydrated;
    /**
     *
     *
     * @private
     * @type {HTMLElement}
     * @memberOf Element
     */
    private original;
    /**
     *
     *
     * @private
     * @type {((IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<Comment>)[])}
     * @memberOf Element
     */
    private children;
    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} data
     *
     * @memberOf Element
     */
    constructor(data: string | HTMLElement);
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
     * @returns {HTMLElement}
     *
     * @memberOf Element
     */
    getOriginal(): HTMLElement;
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    append(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    appendTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    prepend(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
    /**
     *
     *
     * @param {(IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    prependTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
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
     *
     * @memberOf Element
     */
    remove(): void;
    /**
     *
     *
     * @param {IUniversalAttribute<Attr>} attribute
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    setAttr(attribute: IUniversalAttribute<Attr>): IUniversalAttribute<Attr>;
    /**
     *
     *
     * @param {(IUniversalAttribute<Attr> | string)} attr
     *
     * @memberOf Element
     */
    removeAttr(attr: IUniversalAttribute<Attr> | string): void;
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
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    getAttr(name: string): IUniversalAttribute<Attr>;
    /**
     *
     *
     * @returns {IUniversalAttribute<Attr>[]}
     *
     * @memberOf Element
     */
    getAttrs(): IUniversalAttribute<Attr>[];
    /**
     *
     *
     * @returns {((IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text>)[])}
     *
     * @memberOf Element
     */
    getChildren(): (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[];
    /**
     *
     *
     * @param {((IUniversalElement<HTMLElement>
     *         | IUniversalTextNode<Text>)[])} elements
     *
     * @memberOf Element
     */
    setChildren(elements: (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[]): void;
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
     * @returns
     *
     * @memberOf Element
     */
    setStyle(data: any, value?: string): string;
    /**
     *
     *
     * @param {string} name
     * @returns
     *
     * @memberOf Element
     */
    getStyle(name: string): any;
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
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Element
     */
    getParent(): IUniversalElement<any>;
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
    eachChild(closure: {
        (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
    }): void;
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
    /**
     *
     *
     * @private
     * @param {string} html
     * @returns {string}
     *
     * @memberOf Element
     */
    private cleanUpHTML(html);
}
