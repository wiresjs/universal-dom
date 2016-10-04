export interface IUniversalTextNode<T> {
    isRehydrated(): any;
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
    getSource(): string;
}
export interface IUniversalAttribute<T> {
    getOriginal(): T;
    getName(): string;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
    setParent?(element: IUniversalElement<any>): void;
    getParent(): IUniversalElement<any>;
}
export interface IUniversalComment<T> {
    getOriginal(): T;
    appendTo(element: IUniversalElement<any>): void;
    prependTo(element: IUniversalElement<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    setParent?(element: IUniversalElement<any>): void;
    getParent(): IUniversalElement<any>;
    getSource(): string;
    remove(): void;
}
export interface IUniversalElement<T> {
    getOriginal(): T;
    append(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    appendTo(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    prependTo(element: IUniversalElement<any> | IUniversalTextNode<any>): void;
    insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
    remove(): void;
    setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr>;
    removeAttr(attribute: IUniversalAttribute<any> | string): void;
    attr(name: string, value?: any): IUniversalAttribute<Attr>;
    getAttr(name: string): IUniversalAttribute<any>;
    getChildren(): (IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<Text>)[];
    setChildren(elements: (IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<Text>)[]): void;
    addClass(name: string): void;
    hasClass(name: string): boolean;
    removeClass(name: string): void;
    toggleClass(name: string): void;
    setStyle(data: any, value?: string): void;
    getStyle(name: string): string;
    getSource(): string;
    setParent?(element: IUniversalElement<any>): void;
    getParent(): IUniversalElement<any>;
    getHTML(): string;
    eachChild(closure: {
        (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
    }): void;
    empty(): void;
}
