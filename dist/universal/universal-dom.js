(function($__exports__, $isBackend) {var __local__ = {};var define = function(n, d, f) {__local__[n] = { d: d, f: f }};var __resolve__ = function(name) {var m = __local__[name];if (m === undefined) {if ($isBackend) {return require(name);} else {Exports.__npm__ = Exports.__npm__ || {};return Exports.__npm__[name];}}if (m.r) { return m.r; }m.r = {};var z = [__resolve__, m.r];for (var i = 2; i < m.d.length; i++) {z.push(__resolve__(m.d[i]));}m.f.apply(null, z);return m.r;};
define("Common", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("Browser", ["require", "exports"], function (require, exports) {
    "use strict";
    class BrowserComment {
        constructor(data) {
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
    }
    exports.BrowserComment = BrowserComment;
    class Attribute {
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
    }
    exports.Attribute = Attribute;
    class TextNode {
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
    }
    exports.TextNode = TextNode;
    class Element {
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
            html = html.replace(/\r?\n|\r|\t/g, '');
            html = html.replace(/\s{2,}/g, " ");
            html = html.replace(/>\s+</g, "><");
            html = html.replace(/\sclass=""/g, "");
            html = html.trim();
            return html;
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
        empty() {
            while (this.original.firstChild) {
                this.original.removeChild(this.original.firstChild);
            }
        }
    }
    exports.Element = Element;
});
define("Server", ["require", "exports"], function (require, exports) {
    "use strict";
    let elementIDS = 0;
    class GenericDomManupulations {
        _insertAfter(element) {
            let parent = element.getParent();
            let children = parent.getChildren();
            let index = children.indexOf(element);
            if (index > -1) {
                children.splice(index + 1, 0, this);
            }
        }
        _insertBefore(element) {
            let parent = element.getParent();
            let children = parent.getChildren();
            let index = children.indexOf(element);
            if (index > -1) {
                children.splice(index, 0, this);
            }
        }
        _remove(parent) {
            let children = parent.getChildren();
            if (parent) {
                let index = children.indexOf(this);
                if (index > -1) {
                    children.splice(index, 1);
                }
            }
        }
    }
    exports.GenericDomManupulations = GenericDomManupulations;
    class ServerComment extends GenericDomManupulations {
        constructor(data) {
            super();
            this.$id = elementIDS++;
            if (typeof data === "string") {
                this.value = data;
            }
        }
        getOriginal() {
            return this;
        }
        isRehydrated() {
            return false;
        }
        appendTo(element) {
            element.append(this);
        }
        prependTo(element) {
            element.prepend(this);
        }
        insertAfter(element) {
            this._insertAfter(element);
        }
        insertBefore(element) {
            this._insertBefore(element);
        }
        remove() {
            this._remove(this.parent);
        }
        setParent(element) {
            this.parent = element;
        }
        getParent() {
            return this.parent;
        }
        getSource() {
            return `<!--${this.value}-->`;
        }
    }
    exports.ServerComment = ServerComment;
    class Attribute {
        constructor(name, value) {
            if (typeof name === "string") {
                this.name = name;
            }
            if (value !== undefined) {
                this.value = value;
            }
        }
        getName() {
            return this.name;
        }
        getOriginal() {
            return this.value;
        }
        setValue(value) {
            this.value = value;
        }
        getValue() {
            return this.value;
        }
        remove() {
            this.parent.removeAttr(this);
        }
        setParent(element) {
            this.parent = element;
        }
        getParent() {
            return this.parent;
        }
    }
    exports.Attribute = Attribute;
    class TextNode extends GenericDomManupulations {
        constructor(value) {
            super();
            this.value = value;
        }
        isRehydrated() {
            return false;
        }
        getOriginal() {
            return this.value;
        }
        setValue(value) {
            this.value = value;
        }
        getValue() {
            return this.value;
        }
        remove() {
            this._remove(this.parent);
        }
        setParent(element) {
            this.parent = element;
        }
        getParent() {
            return this.parent;
        }
        appendTo(element) {
            element.append(this);
        }
        prependTo(element) {
            element.prepend(this);
        }
        insertAfter(element) {
            this._insertAfter(element);
        }
        insertBefore(element) {
            this._insertBefore(element);
        }
        getSource() {
            return this.getValue();
        }
    }
    exports.TextNode = TextNode;
    class Element extends GenericDomManupulations {
        constructor(name) {
            super();
            this.$id = ++elementIDS;
            this.attrs = new Map();
            this.classNames = new Set();
            this.children = [];
            if (typeof name === "string") {
                this.name = name;
            }
        }
        isRehydrated() {
            return false;
        }
        getOriginal() { }
        append(element) {
            let el = element;
            el.setParent(this);
            this.children.push(el);
        }
        appendTo(element) {
            let el = element;
            el.append(this);
        }
        prepend(element) {
            element.setParent(this);
            this.children.splice(0, 0, element);
        }
        prependTo(element) {
            let el = element;
            el.prepend(this);
        }
        insertAfter(element) {
            this._insertAfter(element);
        }
        insertBefore(element) {
            this._insertBefore(element);
        }
        removeChild(element) {
            let index = this.children.indexOf(element);
            if (index > -1) {
                this.children.splice(index, 1);
            }
        }
        remove() {
            this.parent.removeChild(this);
        }
        setAttr(attribute) {
            attribute.setParent(this);
            this.attrs.set(attribute.getName(), attribute);
            return attribute;
        }
        removeAttr(attribute) {
            this.attrs.delete(attribute.getName());
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
            return this.attrs.get(name);
        }
        getChildren() {
            return this.children;
        }
        eachChild(closure) {
            for (let i = 0; i < this.children.length; i++) {
                closure(this.children[i], i);
            }
        }
        setChildren(elements) {
            this.children = elements;
        }
        addClass(name) {
            if (!this.classNames.has(name)) {
                this.classNames.add(name);
            }
        }
        hasClass(name) {
            return this.classNames.has(name);
        }
        removeClass(name) {
            this.classNames.delete(name);
        }
        toggleClass(name) {
            if (this.classNames.has(name)) {
                this.classNames.delete(name);
            }
            else {
                this.classNames.add(name);
            }
        }
        setStyle(data, value) {
        }
        getStyle(name) {
            return "";
        }
        getSource() {
            let html = [];
            html.push(`<${this.name}`);
            let localAttrs = [];
            this.attrs.forEach(attr => {
                localAttrs.push(`${attr.getName()}="${attr.getValue() || ""}"`);
            });
            let clsNames = [];
            this.classNames.forEach(clsName => {
                clsNames.push(clsName);
            });
            if (this.classNames.size > 0) {
                html.push(` class="${clsNames.join(" ")}"`);
            }
            if (localAttrs.length) {
                html.push(" " + localAttrs.join(" "));
            }
            html.push(">");
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i];
                html.push(child.getSource());
            }
            html.push(`</${this.name}>`);
            return html.join("");
        }
        setParent(element) {
            this.parent = element;
        }
        getParent() {
            return this.parent;
        }
        empty() {
            this.children = [];
        }
    }
    exports.Element = Element;
});
define("UniversalDom", ["require", "exports", "Browser", "Server"], function (require, exports, Browser_1, Server_1) {
    "use strict";
    const isBackend = typeof module !== "undefined" && module.exports;
    class UniversalDom {
        static createElement(data) {
            return isBackend ? new Server_1.Element(data) : new Browser_1.Element(data);
        }
        static createAttribute(name, value) {
            return isBackend ? new Server_1.Attribute(name, value) : new Browser_1.Attribute(name, value);
        }
        static createTextNode(value) {
            return isBackend ? new Server_1.TextNode(value) : new Browser_1.TextNode(value);
        }
        static createComment(value) {
            return isBackend ? new Server_1.ServerComment(value) : new Browser_1.BrowserComment(value);
        }
    }
    exports.UniversalDom = UniversalDom;
});
define("index", ["require", "exports", "UniversalDom"], function (require, exports, UniversalDom_1) {
    "use strict";
    exports.Dom = UniversalDom_1.UniversalDom;
});

var __expose__ = function(n, m, w, c) {
    var e = __resolve__(n);
    var bc;
    if (!$isBackend) { var npm = $__exports__.__npm__ = $__exports__.__npm__ || {}; if (m) { bc = npm[m] } }
    var cs = c ? c.split(",") : [];
    if (cs.length){ for (var ln in __local__) { for (var i = 0; i < cs.length; i++) { if (ln.indexOf(cs[i]) === 0) { __resolve__(ln) } } }}
    for (var k in e) {
        $isBackend || w ? $__exports__[k] = e[k] : null;
        bc ? bc[e] = e[k] : null;
    }
};
__expose__("index", "universal-dom", true, "");
})(typeof exports !== "undefined" ? exports : this, typeof exports !== "undefined");