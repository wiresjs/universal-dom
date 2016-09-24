import {Element as BrowserElement} from "./browser/Element";
import {TextNode as BrowserTextNode} from "./browser/TextNode";

import {IUniversalElement, IUniversalTextNode, IUniversalAttribute} from "./Common";

export class UniversalDom {
    public static createElement(name: string): IUniversalElement<any> {
        return new BrowserElement(name);
    }
    public static createTextNode(value: string): IUniversalTextNode<any> {
        return new BrowserTextNode(value);
    }
}
