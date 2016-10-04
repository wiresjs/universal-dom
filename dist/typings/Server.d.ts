import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "./Common";
export declare class GenericDomManupulations {
    protected _insertAfter(element: any): void;
    protected _insertBefore(element: any): void;
    protected _remove(parent: any): void;
}
export declare class ServerComment extends GenericDomManupulations implements IUniversalComment<any> {
    $id: number;
    private value;
    private parent;
    constructor(data: string | Comment);
    getOriginal(): any;
    isRehydrated(): boolean;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    remove(): void;
    setParent(element: Element): void;
    getParent(): IUniversalElement<any>;
    getSource(): string;
}
export declare class Attribute implements IUniversalAttribute<any> {
    private name;
    private value;
    private parent;
    constructor(name: string | Attr, value?: string);
    getName(): string;
    getOriginal(): string;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
    setParent(element: IUniversalElement<any>): void;
    getParent(): IUniversalElement<any>;
}
export declare class TextNode extends GenericDomManupulations implements IUniversalTextNode<string> {
    private value;
    private parent;
    constructor(value: string);
    isRehydrated(): boolean;
    getOriginal(): string;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
    setParent(element: Element): void;
    getParent(): IUniversalElement<any>;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    getSource(): string;
}
export declare class Element extends GenericDomManupulations implements IUniversalElement<any> {
    $id: number;
    private parent;
    private name;
    private attrs;
    private classNames;
    private children;
    constructor(name: string | HTMLElement);
    isRehydrated(): boolean;
    getOriginal(): any;
    append(element: IUniversalElement<any> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
    appendTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    prependTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    removeChild(element: Element): void;
    remove(): void;
    setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr>;
    removeAttr(attribute: IUniversalAttribute<any> | string): void;
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    getAttr(name: string): IUniversalAttribute<any>;
    getChildren(): (IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>)[];
    eachChild(closure: {
        (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
    }): void;
    setChildren(elements: (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[]): void;
    addClass(name: string): void;
    hasClass(name: string): boolean;
    removeClass(name: string): void;
    toggleClass(name: string): void;
    setStyle(data: any, value?: string): void;
    getStyle(name: string): string;
    getSource(): string;
    setParent(element: Element): void;
    getParent(): IUniversalElement<any>;
    empty(): void;
}
