System.register(["./Browser", "./Server"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Browser_1, Server_1;
    var isBackend, UniversalDom;
    return {
        setters:[
            function (Browser_1_1) {
                Browser_1 = Browser_1_1;
            },
            function (Server_1_1) {
                Server_1 = Server_1_1;
            }],
        execute: function() {
            isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";
            /**
             *
             *
             * @export
             * @class UniversalDom
             */
            UniversalDom = class UniversalDom {
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
            };
            exports_1("UniversalDom", UniversalDom);
        }
    }
});
