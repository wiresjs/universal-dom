import { Element as BrowserElement, TextNode as BrowserTextNode, Attribute as BrowserAttribute, BrowserComment } from "./Browser";
import { Element as ServerElement, TextNode as ServerTextNode, Attribute as ServerAttribute, ServerComment } from "./Server";
const isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";
/**
 *
 *
 * @export
 * @class UniversalDom
 */
export class UniversalDom {
    /**
     *
     *
     * @static
     * @param {(string | HTMLElement)} data
     * @returns {IUniversalElement<any>}
     *
     * @memberOf UniversalDom
     */
    static createElement(data) {
        return isBackend ? new ServerElement(data) : new BrowserElement(data);
    }
    /**
     *
     *
     * @static
     * @param {string} name
     * @param {string} [value]
     * @returns {IUniversalAttribute<any>}
     *
     * @memberOf UniversalDom
     */
    static createAttribute(name, value) {
        return isBackend ? new ServerAttribute(name, value) : new BrowserAttribute(name, value);
    }
    /**
     *
     *
     * @static
     * @param {string} value
     * @returns {IUniversalTextNode<any>}
     *
     * @memberOf UniversalDom
     */
    static createTextNode(value) {
        return isBackend ? new ServerTextNode(value) : new BrowserTextNode(value);
    }
    /**
     *
     *
     * @static
     * @param {string} value
     * @returns {IUniversalComment<any>}
     *
     * @memberOf UniversalDom
     */
    static createComment(value) {
        return isBackend ? new ServerComment(value) : new BrowserComment(value);
    }
}
