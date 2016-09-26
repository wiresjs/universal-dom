import { IUniversalElement, IUniversalTextNode, IUniversalAttribute } from "./Common";
export declare class UniversalDom {
    static createElement(name: string): IUniversalElement<any>;
    static createAttribute(name: string, value?: string): IUniversalAttribute<any>;
    static createTextNode(value: string): IUniversalTextNode<any>;
}
