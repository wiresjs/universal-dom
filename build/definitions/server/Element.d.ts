import { IUniversalElement, IUniversalTextNode, IUniversalAttribute } from "../Common";
export declare class Element implements IUniversalElement<any> {
    private parent;
    private name;
    private children;
    constructor(name: string);
    getOriginal(): any;
    append(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    appendTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    prepend(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    prependTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
    remove(): void;
    setAttr(attribute: IUniversalAttribute<Attr>): IUniversalAttribute<Attr>;
    removeAttr(attribute: IUniversalAttribute<any> | string): void;
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    getAttr(name: string): IUniversalAttribute<Attr>;
    getChildren(): (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[];
    setChildren(elements: (IUniversalElement<HTMLElement> | IUniversalTextNode<Text>)[]): void;
    addClass(name: string): void;
    hasClass(name: string): boolean;
    removeClass(name: string): void;
    setStyle(data: any, value?: string): void;
    getStyle(name: string): string;
    getHTML(): string;
    setParent(element: Element): void;
    getParent(): IUniversalElement<any>;
}
