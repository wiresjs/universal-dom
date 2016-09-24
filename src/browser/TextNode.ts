import {IUniversalTextNode} from "../Common";

export class TextNode implements IUniversalTextNode<Text> {
    /**
     *
     *
     * @private
     * @type {Text}
     * @memberOf TextNode
     */
    private original: Text;

    /**
     * Creates an instance of TextNode.
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    constructor(value: string) {
        this.original = document.createTextNode(value);
    }

    /**
     *
     *
     * @returns {Text}
     *
     * @memberOf TextNode
     */
    public getOriginal(): Text {
        return this.original;
    }

    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    public setValue(value: string): void {
        this.original.nodeValue = value;
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf IUniversalTextNode
     */
    public getValue(): string {
        return this.original.nodeValue;
    }
    /**
     *
     *
     *
     * @memberOf IUniversalTextNode
     */
    public remove(): void {
        this.original.parentElement.removeChild(this.original);
    }
}