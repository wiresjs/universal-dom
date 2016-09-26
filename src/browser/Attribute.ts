import {IUniversalAttribute} from "../Common.ts";

/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<Attr>}
 */
export class Attribute implements IUniversalAttribute<Attr> {
    /**
     *
     *
     * @private
     * @type {Attr}
     * @memberOf Attribute
     */
    private original: Attr;


    /**
     * Creates an instance of Attribute.
     *
     * @param {string} name
     *
     * @memberOf Attribute
     */
    constructor(private name: string, value?: string) {
        this.original = document.createAttribute(name);
        if (value !== undefined) {
            this.original.value = value;
        }
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    public getName(): string {
        return this.name;
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    public getOriginal() {
        return this.original;
    }

    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    public setValue(value: string): void {
        this.original.value = value;
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    public getValue(): string {
        return this.original.value;
    }

    /**
     *
     *
     *
     * @memberOf Attribute
     */
    public remove(): void {
        this.original.parentElement.removeAttribute(this.name);
    }
}
