export interface IUniversalTextNode<T> {
    getOriginal(): T;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
}
export interface IUniversalAttribute<T> {
    getOriginal(): T;
    getName(): string;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
}
export interface IUniversalElement<T> {
    getOriginal(): T;
    append(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    appendTo(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    prepend(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    prependTo(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    remove(): void;
    setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr>;
    removeAttr(attribute: IUniversalAttribute<any> | string): void;
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    getAttr(name: string): IUniversalAttribute<any>;
    getChildren(): (IUniversalElement<any> | IUniversalTextNode<any>)[];
    setChildren(elements: (IUniversalElement<any> | IUniversalTextNode<any>)[]): void;
    addClass(name: string): void;
    hasClass(name: string): boolean;
    removeClass(name: string): void;
    setStyle(data: any, value?: string): void;
    getStyle(name: string): string;
}
