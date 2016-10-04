System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GenericDomManupulations, BrowserComment, Attribute, TextNode, Element;
    return {
        setters:[],
        execute: function() {
            GenericDomManupulations = class GenericDomManupulations {
                _getNextSibling(element) {
                    let original = element.original;
                }
            };
            exports_1("GenericDomManupulations", GenericDomManupulations);
            BrowserComment = class BrowserComment extends GenericDomManupulations {
                constructor(data) {
                    super();
                    this._isRehydrated = false;
                    if (typeof data === "string") {
                        this.original = document.createComment(data);
                    }
                    else {
                        this._isRehydrated = true;
                        this.original = data;
                    }
                }
                isRehydrated() {
                    return this._isRehydrated;
                }
                getOriginal() {
                    return this.original;
                }
                appendTo(element) {
                    element.append(this);
                }
                prependTo(element) {
                    element.prepend(this);
                }
                insertAfter(element) {
                    let referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
                insertBefore(element) {
                    let referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
                getNextSibling() {
                    return this._getNextSibling(this);
                }
                remove() {
                    this.original.parentElement.removeChild(this.original);
                }
                getParent() {
                    if (this.original.parentNode) {
                        return new Element(this.original.parentElement);
                    }
                }
                getSource() {
                    return `<--${this.original.nodeValue}-->`;
                }
            };
            exports_1("BrowserComment", BrowserComment);
            Attribute = class Attribute {
                constructor(name, value) {
                    this.original = typeof name === "string" ? document.createAttribute(name) : name;
                    if (value !== undefined) {
                        this.original.value = value;
                    }
                }
                getName() {
                    return this.original.name;
                }
                getOriginal() {
                    return this.original;
                }
                setValue(value) {
                    this.original.value = value;
                }
                getValue() {
                    return this.original.value;
                }
                remove() {
                    this.parent.removeAttr(this);
                }
                setParent(parent) {
                    this.parent = parent;
                }
                getParent() {
                    return this.parent;
                }
            };
            exports_1("Attribute", Attribute);
            TextNode = class TextNode {
                constructor(data) {
                    this._isRehydrated = false;
                    if (data instanceof Text) {
                        this.original = data;
                        this._isRehydrated = true;
                    }
                    else {
                        this.original = document.createTextNode(data);
                    }
                }
                isRehydrated() {
                    return this._isRehydrated;
                }
                getOriginal() {
                    return this.original;
                }
                setValue(value) {
                    this.original.nodeValue = value;
                }
                getValue() {
                    return this.original.nodeValue;
                }
                remove() {
                    this.original.parentElement.removeChild(this.original);
                }
                getParent() {
                    return new Element(this.original.parentElement);
                }
                appendTo(element) {
                    element.append(this);
                }
                prependTo(element) {
                    element.prepend(this);
                }
                insertAfter(element) {
                    let referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
                insertBefore(element) {
                    let referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
                getSource() {
                    return this.getValue();
                }
            };
            exports_1("TextNode", TextNode);
            Element = class Element {
                constructor(data) {
                    this._isRehydrated = false;
                    this.children = [];
                    if (data instanceof HTMLElement) {
                        this.original = data;
                        this._isRehydrated = true;
                    }
                    else {
                        this.original = document.createElement(data);
                    }
                }
                isRehydrated() {
                    return this._isRehydrated;
                }
                getOriginal() {
                    return this.original;
                }
                append(element) {
                    this.original.appendChild(element.getOriginal());
                }
                appendTo(element) {
                    element.getOriginal().appendChild(this.original);
                }
                prepend(element) {
                    this.original.insertBefore(element.getOriginal(), this.original.firstChild);
                }
                prependTo(element) {
                    element.getOriginal().insertBefore(this.original, element.getOriginal().firstChild);
                }
                insertAfter(element) {
                    let referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
                    }
                }
                insertBefore(element) {
                    let referenceNode = element.getOriginal();
                    if (referenceNode.parentNode) {
                        referenceNode.parentNode.insertBefore(this.original, referenceNode);
                    }
                }
                remove() {
                    this.original.parentNode.removeChild(this.original);
                }
                setAttr(attribute) {
                    attribute.setParent(this);
                    this.original.setAttributeNode(attribute.getOriginal());
                    return attribute;
                }
                removeAttr(attr) {
                    if (attr instanceof Attribute) {
                        this.original.removeAttributeNode(attr.getOriginal());
                    }
                    else {
                        this.original.removeAttribute(attr);
                    }
                }
                attr(name, value) {
                    if (value === undefined) {
                        return this.getAttr(name);
                    }
                    else {
                        let attr = this.getAttr(name) || this.setAttr(new Attribute(name));
                        attr.setValue(value);
                        return attr;
                    }
                }
                getAttr(name) {
                    let oAttr = this.original.getAttributeNode(name);
                    if (oAttr) {
                        let attr = new Attribute(oAttr);
                        return attr;
                    }
                }
                getChildren() {
                    let childNodes = this.original.childNodes;
                    let result = [];
                    for (let i = 0; i < childNodes.length; i++) {
                        let node = childNodes[i];
                        if (node.nodeType === 1) {
                            result.push(new Element(node));
                        }
                        if (node.nodeType === 8) {
                            result.push(new BrowserComment(node));
                        }
                        if (node.nodeType === 3) {
                            if (node.nodeValue) {
                                result.push(new TextNode(node));
                            }
                        }
                    }
                    return result;
                }
                setChildren(elements) {
                    this.children = elements;
                }
                addClass(name) {
                    if (!this.original.classList.contains(name)) {
                        this.original.classList.add(name);
                    }
                }
                hasClass(name) {
                    return this.original.classList.contains(name);
                }
                removeClass(name) {
                    this.original.classList.remove(name);
                }
                toggleClass(name) {
                    if (this.original.classList.contains(name)) {
                        this.original.classList.remove(name);
                    }
                    else {
                        this.original.classList.add(name);
                    }
                }
                setStyle(data, value) {
                    if (typeof data === "object") {
                        for (let k in data) {
                            if (data.hasOwnProperty(k)) {
                                this.original.style[k] = data[k];
                            }
                        }
                        return;
                    }
                    return this.original.style[data] = value;
                }
                getStyle(name) {
                    return this.original.style[name];
                }
                getSource() {
                    let html = this.original.outerHTML;
                    return this.cleanUpHTML(html);
                }
                getParent() {
                    let parent = this.original.parentElement;
                    return new Element(parent);
                }
                eachChild(closure) {
                    let childNodes = this.original.childNodes;
                    for (let i = 0; i < childNodes.length; i++) {
                        let el = childNodes[i];
                        closure(new Element(el), i);
                    }
                }
                getHTML() {
                    let html = this.original.innerHTML;
                    return this.cleanUpHTML(html);
                }
                empty() {
                    while (this.original.firstChild) {
                        this.original.removeChild(this.original.firstChild);
                    }
                }
                cleanUpHTML(html) {
                    html = html.replace(/\r?\n|\r|\t/g, "");
                    html = html.replace(/\s{2,}/g, " ");
                    html = html.replace(/>\s+</g, "><");
                    html = html.replace(/\sclass=""/g, "");
                    html = html.trim();
                    return html;
                }
            };
            exports_1("Element", Element);
        }
    }
});
