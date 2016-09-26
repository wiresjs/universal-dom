import { IUniversalElement, IUniversalTextNode, IUniversalAttribute } from "../Common";
export declare class Element implements IUniversalElement<HTMLElement> {
    private original;
    private children;
    constructor(name: string);
    getOriginal(): HTMLElement;
    append(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
    appendTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
    prepend(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
    prependTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
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
    setStyle(data: any, value?: string): string;
    getStyle(name: string): any;
}
