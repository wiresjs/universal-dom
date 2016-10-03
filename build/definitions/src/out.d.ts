declare module "Common" {
    export interface IUniversalTextNode<T> {
        getOriginal(): T;
        setValue(value: string): void;
        getValue(): string;
        remove(): void;
        setParent?(element: IUniversalElement<any>): void;
        getParent(): IUniversalElement<any>;
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
        setStyle(data: any, value?: string): void;
        getStyle(name: string): string;
        getSource(): string;
        setParent?(element: IUniversalElement<any>): void;
        getParent(): IUniversalElement<any>;
        eachChild(closure: {
            (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
        }): void;
    }
}
declare module "Browser" {
    import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "Common";
    export class BrowserComment implements IUniversalComment<Comment> {
        private original;
        constructor(data: string | Comment);
        getOriginal(): Comment;
        appendTo(element: IUniversalElement<any>): void;
        prependTo(element: IUniversalElement<any>): void;
        insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
        insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
        remove(): void;
        getParent(): IUniversalElement<any>;
        getSource(): string;
    }
    export class Attribute implements IUniversalAttribute<Attr> {
        private original;
        constructor(name: string | Attr, value?: string);
        getName(): string;
        getOriginal(): Attr;
        setValue(value: string): void;
        getValue(): string;
        remove(): void;
        getParent(): IUniversalElement<any>;
    }
    export class TextNode implements IUniversalTextNode<Text> {
        private original;
        constructor(data: string | Text);
        getOriginal(): Text;
        setValue(value: string): void;
        getValue(): string;
        remove(): void;
        getParent(): IUniversalElement<any>;
        getSource(): string;
    }
    export class Element implements IUniversalElement<HTMLElement> {
        private original;
        private children;
        constructor(data: string | HTMLElement);
        getOriginal(): HTMLElement;
        append(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
        appendTo(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text>): void;
        prepend(element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
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
        getSource(): string;
        getParent(): IUniversalElement<any>;
        eachChild(closure: {
            (element: IUniversalElement<HTMLElement> | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void;
        }): void;
    }
}
declare module "Server" {
    import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "Common";
    export class ServerComment implements IUniversalComment<any> {
        $id: number;
        private value;
        private parent;
        constructor(data: string | Comment);
        getOriginal(): any;
        appendTo(element: IUniversalElement<any>): void;
        prependTo(element: IUniversalElement<any>): void;
        insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
        insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
        remove(): void;
        setParent(element: Element): void;
        getParent(): IUniversalElement<any>;
        getSource(): string;
    }
    export class Attribute implements IUniversalAttribute<any> {
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
    export class TextNode implements IUniversalTextNode<string> {
        private value;
        private parent;
        constructor(value: string);
        getOriginal(): string;
        setValue(value: string): void;
        getValue(): string;
        remove(): void;
        setParent(element: Element): void;
        getParent(): IUniversalElement<any>;
        getSource(): string;
    }
    export class Element implements IUniversalElement<any> {
        $id: number;
        private parent;
        private name;
        private attrs;
        private children;
        constructor(name: string | HTMLElement);
        getOriginal(): any;
        append(element: IUniversalElement<any> | IUniversalTextNode<Text> | IUniversalComment<any>): void;
        appendTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
        prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void;
        prependTo(element: IUniversalElement<any> | IUniversalTextNode<Text>): void;
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
        setStyle(data: any, value?: string): void;
        getStyle(name: string): string;
        getSource(): string;
        setParent(element: Element): void;
        getParent(): IUniversalElement<any>;
    }
}
declare module "UniversalDom" {
    import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "Common";
    export class UniversalDom {
        static createElement(data: string | HTMLElement): IUniversalElement<any>;
        static createAttribute(name: string, value?: string): IUniversalAttribute<any>;
        static createTextNode(value: string): IUniversalTextNode<any>;
        static createComment(value: string): IUniversalComment<any>;
    }
}
declare module "index" {
    import { UniversalDom as dom } from "UniversalDom";
    export let Dom: typeof dom;
}
