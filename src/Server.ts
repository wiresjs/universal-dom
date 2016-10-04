import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";

let elementIDS = 0;

export class GenericDomManupulations {
    protected _insertAfter(element: any) {
        let parent = element.getParent();
        let children = parent.getChildren();
        let index = children.indexOf(element);
        if (index > -1) {
            children.splice(index + 1, 0, this);
        }
    }
    protected _insertBefore(element: any): void {
        let parent = element.getParent();
        let children = parent.getChildren();
        let index = children.indexOf(element);
        if (index > -1) {
            children.splice(index, 0, this);
        }
    }
    protected _remove(parent: any) {
        let children = parent.getChildren();
        if (parent) {
            let index = children.indexOf(this);
            if (index > -1) {
                children.splice(index, 1);
            }
        }
    }
    protected _getNextSibling(element: any): any {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index + 1 < children.length) {
                return children[index + 1];
            }
        }
    }
    protected _getPreviousSibling(element: any): any {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index - 1 >= 0) {
                return children[index - 1];
            }
        }
    }
}
export class ServerComment extends GenericDomManupulations implements IUniversalComment<any>  {
    public $id: number = elementIDS++;
    private value;
    private parent: Element;
    constructor(data: string | Comment) {
        super();
        if (typeof data === "string") {
            this.value = data;
        }
    }
    public getOriginal(): any {
        return this;
    }

    public isRehydrated() {
        return false;
    }

    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertAfter(element);
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertBefore(element);
    }

    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    public remove(): void {
        this._remove(this.parent);
    }
    public setParent(element: Element) {
        this.parent = element;
    }
    public getParent(): IUniversalElement<any> {
        return this.parent;
    }

    public getSource() {
        return `<!--${this.value}-->`;
    }
}


export class Attribute implements IUniversalAttribute<any> {

    private name: string;
    private value: string;
    private parent: Element;

    private userStyles: Map<string, string> = new Map();

    constructor(name: string | Attr, value?: string) {
        if (typeof name === "string") {
            this.name = name;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }

    public setStyle(data: string | any, value: string) {
        if (typeof data === "object") {
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    this.userStyles.set(k, data[k])
                }
            }
            return;
        }
        this.userStyles.set(data, value);
    }

    public getStyle(key: string) {
        return this.userStyles.get(key);
    }

    public getName(): string {
        return this.name;
    }
    public getOriginal() {
        return this.value;
    }
    public setValue(value: string): void {
        this.value = value;
    }
    public getValue(): string {
        if (this.name === "style") {
            let styles = [];
            this.userStyles.forEach((value, key) => {
                styles.push(`${key}: ${value}`);
            });
            return styles.length > 0 ? styles.join("; ") + ";" : this.value;
        }
        return this.value;
    }
    public remove(): void {
        this.parent.removeAttr(this);
    }

    public setParent(element: IUniversalElement<any>): void {
        this.parent = <Element>element;
    }

    public getParent(): IUniversalElement<any> {
        return this.parent;
    }

}

export class TextNode extends GenericDomManupulations implements IUniversalTextNode<string> {

    private value;
    private parent: Element;
    constructor(value: string) {
        super();
        this.value = value;
    }

    public isRehydrated() {
        return false;
    }

    public getOriginal(): string {
        return this.value;
    }

    public setValue(value: string): void {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }

    public remove(): void {
        this._remove(this.parent);
    }

    public setParent(element: Element): void {
        this.parent = element;
    }

    public getParent(): IUniversalElement<any> {
        return <IUniversalElement<any>>this.parent;
    }

    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertAfter(element);
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertBefore(element);
    }

    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    public getSource(): string {
        return this.getValue();
    }
}

export class Element extends GenericDomManupulations implements IUniversalElement<any> {
    public $id: number = ++elementIDS;
    private parent: Element;
    private name: string;
    private attrs: Map<string, Attribute> = new Map();

    private classNames: Set<string> = new Set();

    private children: (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<Text>)[] = [];


    constructor(name: string | HTMLElement) {
        super();
        if (typeof name === "string") {
            this.name = name;
        }
    }

    public isRehydrated() {
        return false;
    }

    public getOriginal(): any { }


    public append(element: IUniversalElement<any> |
        IUniversalTextNode<Text> | IUniversalComment<any>): void {
        let el = <Element>element;
        el.setParent(this);
        this.children.push(el);
    }


    public appendTo(element: IUniversalElement<any> |
        IUniversalTextNode<Text>): void {
        let el = <IUniversalElement<any>>element;
        el.append(this);
    }


    public prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        element.setParent(this);
        this.children.splice(0, 0, element);
    }

    public prependTo(element: IUniversalElement<any> |
        IUniversalTextNode<Text>): void {
        let el = <IUniversalElement<any>>element;
        el.prepend(this);
    }

    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertAfter(element);
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertBefore(element);
    }

    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    public removeChild(element: Element) {
        let index = this.children.indexOf(element);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    public remove(): void {
        this.parent.removeChild(this);
    }

    public setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr> {
        attribute.setParent(this);
        this.attrs.set(attribute.getName(), <Attribute>attribute);
        return attribute;
    }

    public removeAttr(attribute: IUniversalAttribute<any> | string) {
        this.attrs.delete((<Attribute>attribute).getName());
    }

    public attr(name: string, value?: any): IUniversalAttribute<Attr> {
        if (value === undefined) {
            return this.getAttr(name);
        } else {
            let attr = this.getAttr(name) || this.setAttr(new Attribute(name));
            attr.setValue(value);
            return attr;
        }
    }


    public getAttr(name: string): IUniversalAttribute<any> {
        return this.attrs.get(name);
    }

    public getAttrs(): IUniversalAttribute<any>[] {
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

    public getChildren(): (IUniversalElement<any> |
        IUniversalTextNode<any> | IUniversalComment<any>)[] {
        return this.children;
    }

    public eachChild(closure: {
        (element: IUniversalElement<any>
            | IUniversalTextNode<any> | IUniversalComment<any>, index: number): void
    }) {
        for (let i = 0; i < this.children.length; i++) {
            closure(this.children[i], i);
        }
    }

    public setChildren(elements: (IUniversalElement<any>
        | IUniversalTextNode<any>)[]): void {
        this.children = elements;
    }


    public addClass(name: string): void {
        if (!this.classNames.has(name)) {
            this.classNames.add(name);
        }
    }

    public hasClass(name: string): boolean {
        return this.classNames.has(name);
    }

    public removeClass(name: string): void {
        this.classNames.delete(name);
    }

    public toggleClass(name: string): void {
        if (this.classNames.has(name)) {
            this.classNames.delete(name);
        } else {
            this.classNames.add(name);
        }
    }

    public setStyle(data: any, value?: string) {
        let styleAttr = <Attribute>(this.getAttr("style") || this.setAttr(new Attribute("style")));
        styleAttr.setStyle(data, value);
    }

    public getStyle(name: string): string {
        let styleAttr = <Attribute>(this.getAttr("style") || this.setAttr(new Attribute("style")));
        return styleAttr.getStyle(name);
    }

    public getSource(): string {
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

    public setParent(element: Element) {
        this.parent = element;
    }

    public getParent(): IUniversalElement<any> {
        return this.parent;
    }

    public getHTML(): string {
        let html = [];
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            html.push(child.getSource());
        }
        return html.join("");
    }
    public empty() {
        this.children = [];
    }
}