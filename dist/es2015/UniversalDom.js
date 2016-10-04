import { Element as BrowserElement, TextNode as BrowserTextNode, Attribute as BrowserAttribute, BrowserComment } from "./Browser";
import { Element as ServerElement, TextNode as ServerTextNode, Attribute as ServerAttribute, ServerComment } from "./Server";
const isBackend = typeof module !== "undefined" && module.exports && typeof process === "object";
export class UniversalDom {
    static createElement(data) {
        return isBackend ? new ServerElement(data) : new BrowserElement(data);
    }
    static createAttribute(name, value) {
        return isBackend ? new ServerAttribute(name, value) : new BrowserAttribute(name, value);
    }
    static createTextNode(value) {
        return isBackend ? new ServerTextNode(value) : new BrowserTextNode(value);
    }
    static createComment(value) {
        return isBackend ? new ServerComment(value) : new BrowserComment(value);
    }
}
