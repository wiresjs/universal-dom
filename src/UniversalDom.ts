import {Element as BrowserElement,
    TextNode as BrowserTextNode,
    Attribute as BrowserAttribute,
    BrowserComment
} from "./Browser";

import {Element as ServerElement,
    TextNode as ServerTextNode,
    Attribute as ServerAttribute,
    ServerComment,
} from "./Server";

import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";

declare const $isBackend: boolean;


export class UniversalDom {
    public static createElement(data: string | HTMLElement): IUniversalElement<any> {
        return $isBackend ? new ServerElement(data) : new BrowserElement(data);
    }

    public static createAttribute(name: string, value?: string): IUniversalAttribute<any> {
        return $isBackend ? new ServerAttribute(name, value) : new BrowserAttribute(name, value);
    }
    public static createTextNode(value: string): IUniversalTextNode<any> {
        return $isBackend ? new ServerTextNode(value) : new BrowserTextNode(value);
    }

    public static createComment(value: string): IUniversalComment<any> {
        return $isBackend ? new ServerComment(value) : new BrowserComment(value);
    }
}
