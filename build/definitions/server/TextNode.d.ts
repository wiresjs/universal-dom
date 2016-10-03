import { IUniversalTextNode } from "../Common";
export declare class TextNode implements IUniversalTextNode<string> {
    private value;
    constructor(value: string);
    getOriginal(): string;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
}
