"use strict";
const Browser_1 = require("./Browser");
const Server_1 = require("./Server");
const isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";
/**
 *
 *
 * @export
 * @class UniversalDom
 */
class UniversalDom {
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
        return isBackend ? new Server_1.Element(data) : new Browser_1.Element(data);
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
        return isBackend ? new Server_1.Attribute(name, value) : new Browser_1.Attribute(name, value);
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
        return isBackend ? new Server_1.TextNode(value) : new Browser_1.TextNode(value);
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
        return isBackend ? new Server_1.ServerComment(value) : new Browser_1.BrowserComment(value);
    }
}
exports.UniversalDom = UniversalDom;
