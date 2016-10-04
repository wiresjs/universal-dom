import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "./Common";
export declare class BrowserComment implements IUniversalComment<Comment> {
    private original;
    private _isRehydrated;
    constructor(data: string | Comment);
    isRehydrated(): boolean;
    getOriginal(): Comment;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    remove(): void;
    getParent(): IUniversalElement<any>;
    getSource(): string;
}
export declare class Attribute implements IUniversalAttribute<Attr> {
    private original;
    private parent;
    constructor(name: string | Attr, value?: string);
    getName(): string;
    getOriginal(): Attr;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
    setParent(parent: Element): void;
    getParent(): IUniversalElement<any>;
}
export declare class TextNode implements IUniversalTextNode<Text> {
    private original;
    private _isRehydrated;
    constructor(data: string | Text);
    isRehydrated(): boolean;
    getOriginal(): Text;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
    getParent(): IUniversalElement<any>;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    getSource(): string;
}
export declare class Element implements IUniversalElement<HTMLElement> {
    private _isRehydrated;
    private original;
    private children;
    constructor(data: string | HTMLElement);
    isRehydrated(): boolean;
    getOriginal(): HTMLElement;
    append(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
    appendTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
    prepend(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
    prependTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    remove(): void;
    setAttr(attribute: IUniversalAttribute<Attr>): IUniversalAttribute<Attr>;
    removeAttr(attr: IUniversalAttribute<Attr> | string): void;
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    getAttr(name: string): IUniversalAttribute<Attr>;
    getChildren(): (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[];
    setChildren(elements: (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[]): void;
    addClass(name: string): void;
    hasClass(name: string): boolean;
    removeClass(name: string): void;
    toggleClass(name: string): void;
    setStyle(data: any, value?: string): string;
    getStyle(name: string): any;
    getSource(): string;
    getParent(): IUniversalElement<any>;
    eachChild(closure: {
        (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
    }): void;
    getHTML(): string;
    empty(): void;
    private cleanUpHTML(html);
}
