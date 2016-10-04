let elementIDS = 0;
export class GenericDomManupulations {
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
    _getNextSibling(element) {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index + 1 < children.length) {
                return children[index + 1];
            }
        }
    }
    _getPreviousSibling(element) {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index - 1 >= 0) {
                return children[index - 1];
            }
        }
    }
}
export class ServerComment extends GenericDomManupulations {
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
    getNextSibling() {
        return this._getNextSibling(this);
    }
    getPreviousSibling() {
        return this._getPreviousSibling(this);
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
export class Attribute {
    constructor(name, value) {
        this.userStyles = new Map();
        if (typeof name === "string") {
            this.name = name;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
    setStyle(data, value) {
        if (typeof data === "object") {
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    this.userStyles.set(k, data[k]);
                }
            }
            return;
        }
        this.userStyles.set(data, value);
    }
    getStyle(key) {
        return this.userStyles.get(key);
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
        if (this.name === "style") {
            let styles = [];
            this.userStyles.forEach((value, key) => {
                styles.push(`${key}: ${value}`);
            });
            return styles.length > 0 ? styles.join("; ") + ";" : this.value;
        }
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
export class TextNode extends GenericDomManupulations {
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
    getNextSibling() {
        return this._getNextSibling(this);
    }
    getPreviousSibling() {
        return this._getPreviousSibling(this);
    }
    getSource() {
        return this.getValue();
    }
}
export class Element extends GenericDomManupulations {
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
    getNextSibling() {
        return this._getNextSibling(this);
    }
    getPreviousSibling() {
        return this._getPreviousSibling(this);
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
    getAttrs() {
        let attrs = [];
        if (this.classNames.size > 0) {
            let clsNames = [];
            this.classNames.forEach(clsName => {
                clsNames.push(clsName);
            });
            let clsAttribute = new Attribute("class");
            clsAttribute.setParent(this);
            clsAttribute.setValue(clsNames.join(" "));
            attrs.push(clsAttribute);
        }
        this.attrs.forEach(attr => {
            attrs.push(attr);
        });
        return attrs;
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
        let styleAttr = (this.getAttr("style") || this.setAttr(new Attribute("style")));
        styleAttr.setStyle(data, value);
    }
    getStyle(name) {
        let styleAttr = (this.getAttr("style") || this.setAttr(new Attribute("style")));
        return styleAttr.getStyle(name);
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
    getHTML() {
        let html = [];
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            html.push(child.getSource());
        }
        return html.join("");
    }
    empty() {
        this.children = [];
    }
}
