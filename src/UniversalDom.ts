import {Element as BrowserElement,
    TextNode as BrowserTextNode,
    Attribute as BrowserAttribute,
    BrowserComment,
} from "./Browser";

import {Element as ServerElement,
    TextNode as ServerTextNode,
    Attribute as ServerAttribute,
    ServerComment,
} from "./Server";

import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";


declare const module: any;
declare const process: any;
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
    public static createElement(data: string | HTMLElement): IUniversalElement<any> {
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
    public static createAttribute(name: string, value?: string): IUniversalAttribute<any> {
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
    public static createTextNode(value: string): IUniversalTextNode<any> {
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
    public static createComment(value: string): IUniversalComment<any> {
        return isBackend ? new ServerComment(value) : new BrowserComment(value);
    }
}
