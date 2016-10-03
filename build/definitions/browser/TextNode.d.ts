import { IUniversalTextNode } from "../Common";
export declare class TextNode implements IUniversalTextNode<Text> {
    private original;
    constructor(data: string | Text);
    getOriginal(): Text;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
}
