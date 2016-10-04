import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "./Common";
export declare class UniversalDom {
    static createElement(data: string | HTMLElement): IUniversalElement<any>;
    static createAttribute(name: string, value?: string): IUniversalAttribute<any>;
    static createTextNode(value: string): IUniversalTextNode<any>;
    static createComment(value: string): IUniversalComment<any>;
}
