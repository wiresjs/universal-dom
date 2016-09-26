import { IUniversalTextNode } from "../Common";
export declare class TextNode implements IUniversalTextNode<Text> {
    private original;
    constructor(value: string);
    getOriginal(): Text;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
}
