"use strict";
var Browser_1 = require("./Browser");
var Server_1 = require("./Server");
var isBackend = typeof module !== "undefined" && module.exports && typeof window === "undefined";
/**
 *
 *
 * @export
 * @class UniversalDom
 */
var UniversalDom = (function () {
    function UniversalDom() {
    }
    /**
     *
     *
     * @static
     * @param {(string | HTMLElement)} data
     * @returns {IUniversalElement<any>}
     *
     * @memberOf UniversalDom
     */
    UniversalDom.createElement = function (data) {
        return isBackend ? new Server_1.Element(data) : new Browser_1.Element(data);
    };
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
    UniversalDom.createAttribute = function (name, value) {
        return isBackend ? new Server_1.Attribute(name, value) : new Browser_1.Attribute(name, value);
    };
    /**
     *
     *
     * @static
     * @param {string} value
     * @returns {IUniversalTextNode<any>}
     *
     * @memberOf UniversalDom
     */
    UniversalDom.createTextNode = function (value) {
        return isBackend ? new Server_1.TextNode(value) : new Browser_1.TextNode(value);
    };
    /**
     *
     *
     * @static
     * @param {string} value
     * @returns {IUniversalComment<any>}
     *
     * @memberOf UniversalDom
     */
    UniversalDom.createComment = function (value) {
        return isBackend ? new Server_1.ServerComment(value) : new Browser_1.BrowserComment(value);
    };
    return UniversalDom;
}());
exports.UniversalDom = UniversalDom;
