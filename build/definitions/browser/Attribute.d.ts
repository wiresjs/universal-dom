import { IUniversalAttribute } from "../Common.ts";
export declare class Attribute implements IUniversalAttribute<Attr> {
    private original;
    constructor(name: string | Attr, value?: string);
    getName(): string;
    getOriginal(): Attr;
    setValue(value: string): void;
    getValue(): string;
    remove(): void;
}
