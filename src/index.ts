declare const $isBackend: boolean;
import {UniversalDom as dom} from "./UniversalDom";

let parent = dom.createElement("div");
parent.setStyle({"border": "1px solid red"});

let h1 = dom.createElement("h1");
let text = dom.createTextNode("hello world");
h1.addChild(text);

parent.addChild(h1);

document.body.appendChild(parent.getOriginal());
text.setValue("Hello world modified!");

export let Dom = { a: 1 }