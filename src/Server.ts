import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";

let elementIDS = 0;

export class ServerComment implements IUniversalComment<any> {
    public $id: number = elementIDS++;

    private value;
    private parent: Element;
    constructor(data: string | Comment) {
        if (typeof data === "string") {
            this.value = data;
        }
    }
    public getOriginal(): any {

    }

    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        let parent = element.getParent();
        parent.eachChild(child => {

        });
        // let referenceNode = element.getOriginal();
        // if (referenceNode.parentNode) {
        //     referenceNode.parentNode.insertBefore(this.original, referenceNode.nextSibling);
        // }
    }

    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        // let referenceNode = element.getOriginal();
        // if (referenceNode.parentNode) {
        //     referenceNode.parentNode.insertBefore(this.original, referenceNode);
        // }
    }

    public remove(): void {
        let parent = this.parent;
        let children = parent.getChildren();
        if (parent) {
            parent.eachChild((child, index) => {
                if (child === this) {
                    children.splice(index, 1);
                }
            });
        }
    }
    public setParent(element: Element) {
        this.parent = element;
    }
    public getParent(): IUniversalElement<any> {
        // if (this.original.parentNode) {
        //     return new Element(this.original.parentElement);
        // }
        return null;
    }

    public getSource() {
        return `<!--${this.value}-->`;
    }
}


export class Attribute implements IUniversalAttribute<any> {

    private name: string;
    private value: string;
    private parent: Element;
    constructor(name: string | Attr, value?: string) {
        if (typeof name === "string") {
            this.name = name;
        }
        if (value !== undefined) {
            this.value = value;
        }
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
        return this.value;
    }
    public remove(): void {

    }

    public setParent(element: IUniversalElement<any>): void {
        this.parent = <Element>element;
    }

    public getParent(): IUniversalElement<any> {
        return this.parent;
    }
}

export class TextNode implements IUniversalTextNode<string> {

    private value;
    private parent: Element;
    constructor(value: string) {
        this.value = value;
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

    }

    public setParent(element: Element): void {

        this.parent = element;
    }
    public getParent(): IUniversalElement<any> {
        return <IUniversalElement<any>>this.parent;
    }

    public getSource(): string {
        return this.getValue();
    }
}

export class Element implements IUniversalElement<any> {
    public $id: number = ++elementIDS;
    private parent: Element;
    private name: string;
    private attrs: Map<string, Attribute> = new Map();


    private children: (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<Text>)[] = [];


    constructor(name: string | HTMLElement) {
        if (typeof name === "string") {
            this.name = name;
        }
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

    public removeChild(element: Element) {
        this.children.forEach((item, index) => {
            let child = <Element>item;
            if (child.$id === element.$id) {
                this.children.splice(index, 1);
            }
        });
    }

    public remove(): void {
        this.parent.removeChild(this);
    }


    public setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr> {
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


    public getChildren(): (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<Text>)[] {
        return this.children;
    }

    public eachChild(closure: {
        (element: IUniversalElement<HTMLElement>
            | IUniversalTextNode<Text> | IUniversalComment<Text>, index: number): void
    }) {
        for (let i = 0; i < this.children.length; i++) {
            closure(this.children[i], i);
        }
    }

    public setChildren(elements: (IUniversalElement<HTMLElement>
        | IUniversalTextNode<Text>)[]): void {
        this.children = elements;
    }


    public addClass(name: string): void {
        //this.original.classList.add(name);
    }

    public hasClass(name: string): boolean {
        //return this.original.classList.contains(name);
        return false;
    }

    public removeClass(name: string): void {
        //  this.original.classList.remove(name);
    }

    public setStyle(data: any, value?: string) {
        // if (typeof data === "object") {
        //     for (let k in data) {
        //         if (data.hasOwnProperty(k)) {
        //             this.original.style[k] = data[k];
        //         }
        //     }
        //     return;
        // }
        // return this.original.style[data] = value;
    }

    public getStyle(name: string) {
        // return this.original.style[name];
        return "";
    }

    public getSource(): string {
        let html = [];
        html.push(`<${this.name}`);

        let localAttrs = [];
        this.attrs.forEach(attr => {
            localAttrs.push(`${attr.getName()}="${attr.getValue() || ""}"`);
        });
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
}