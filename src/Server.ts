import {IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment} from "./Common";

let elementIDS = 0;

/**
 *
 *
 * @export
 * @class GenericDomManupulations
 */
export class GenericDomManupulations {
    /**
     *
     *
     * @protected
     * @param {*} element
     *
     * @memberOf GenericDomManupulations
     */
    protected _insertAfter(element: any) {
        let parent = element.getParent();
        let children = parent.getChildren();
        let index = children.indexOf(element);
        if (index > -1) {
            children.splice(index + 1, 0, this);
        }
    }
    /**
     *
     *
     * @protected
     * @param {*} element
     *
     * @memberOf GenericDomManupulations
     */
    protected _insertBefore(element: any): void {
        let parent = element.getParent();
        let children = parent.getChildren();
        let index = children.indexOf(element);
        if (index > -1) {
            children.splice(index, 0, this);
        }
    }
    /**
     *
     *
     * @protected
     * @param {*} parent
     *
     * @memberOf GenericDomManupulations
     */
    protected _remove(parent: any) {
        let children = parent.getChildren();
        if (parent) {
            let index = children.indexOf(this);
            if (index > -1) {
                children.splice(index, 1);
            }
        }
    }
    /**
     *
     *
     * @protected
     * @param {*} element
     * @returns {*}
     *
     * @memberOf GenericDomManupulations
     */
    protected _getNextSibling(element: any): any {
        let children = element.parent.children;
        let index = element.parent.children.indexOf(element);
        if (index > -1) {
            if (index + 1 < children.length) {
                return children[index + 1];
            }
        }
    }
    /**
     *
     *
     * @protected
     * @param {*} element
     * @returns {*}
     *
     * @memberOf GenericDomManupulations
     */
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
/**
 *
 *
 * @export
 * @class ServerComment
 * @extends {GenericDomManupulations}
 * @implements {IUniversalComment<any>}
 */
export class ServerComment extends GenericDomManupulations implements IUniversalComment<any>  {
    /**
     *
     *
     * @type {number}
     * @memberOf ServerComment
     */
    public $id: number = elementIDS++;
    /**
     *
     *
     * @private
     *
     * @memberOf ServerComment
     */
    private value;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf ServerComment
     */
    private parent: Element;
    /**
     * Creates an instance of ServerComment.
     *
     * @param {(string | Comment)} data
     *
     * @memberOf ServerComment
     */
    constructor(data: string | Comment) {
        super();
        if (typeof data === "string") {
            this.value = data;
        }
    }
    /**
     *
     *
     * @returns {*}
     *
     * @memberOf ServerComment
     */
    public getOriginal(): any {
        return this;
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    public isRehydrated() {
        return false;
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf ServerComment
     */
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }
    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertAfter(element);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf ServerComment
     */
    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertBefore(element);
    }

    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf ServerComment
     */
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    /**
     *
     *
     *
     * @memberOf ServerComment
     */
    public remove(): void {
        this._remove(this.parent);
    }
    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf ServerComment
     */
    public setParent(element: Element) {
        this.parent = element;
    }
    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf ServerComment
     */
    public getParent(): IUniversalElement<any> {
        return this.parent;
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf ServerComment
     */
    public getSource() {
        return `<!--${this.value}-->`;
    }
}


/**
 *
 *
 * @export
 * @class Attribute
 * @implements {IUniversalAttribute<any>}
 */
export class Attribute implements IUniversalAttribute<any> {

    /**
     *
     *
     * @private
     * @type {string}
     * @memberOf Attribute
     */
    private name: string;
    /**
     *
     *
     * @private
     * @type {string}
     * @memberOf Attribute
     */
    private value: string;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf Attribute
     */
    private parent: Element;

    /**
     *
     *
     * @private
     * @type {Map<string, string>}
     * @memberOf Attribute
     */
    private userStyles: Map<string, string> = new Map();

    /**
     * Creates an instance of Attribute.
     *
     * @param {(string | Attr)} name
     * @param {string} [value]
     *
     * @memberOf Attribute
     */
    constructor(name: string | Attr, value?: string) {
        if (typeof name === "string") {
            this.name = name;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }

    /**
     *
     *
     * @param {(string | any)} data
     * @param {string} value
     * @returns
     *
     * @memberOf Attribute
     */
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

    /**
     *
     *
     * @param {string} key
     * @returns
     *
     * @memberOf Attribute
     */
    public getStyle(key: string) {
        return this.userStyles.get(key);
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
    public getName(): string {
        return this.name;
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf Attribute
     */
    public getOriginal() {
        return this.value;
    }
    /**
     *
     *
     * @param {string} value
     *
     * @memberOf Attribute
     */
    public setValue(value: string): void {
        this.value = value;
    }
    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Attribute
     */
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
    /**
     *
     *
     *
     * @memberOf Attribute
     */
    public remove(): void {
        this.parent.removeAttr(this);
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf Attribute
     */
    public setParent(element: IUniversalElement<any>): void {
        this.parent = <Element>element;
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Attribute
     */
    public getParent(): IUniversalElement<any> {
        return this.parent;
    }

}

/**
 *
 *
 * @export
 * @class TextNode
 * @extends {GenericDomManupulations}
 * @implements {IUniversalTextNode<string>}
 */
export class TextNode extends GenericDomManupulations implements IUniversalTextNode<string> {

    /**
     *
     *
     * @private
     *
     * @memberOf TextNode
     */
    private value;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf TextNode
     */
    private parent: Element;
    /**
     * Creates an instance of TextNode.
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    constructor(value: string) {
        super();
        this.value = value;
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf TextNode
     */
    public isRehydrated() {
        return false;
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    public getOriginal(): string {
        return this.value;
    }

    /**
     *
     *
     * @param {string} value
     *
     * @memberOf TextNode
     */
    public setValue(value: string): void {
        this.value = value;
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    public getValue(): string {
        return this.value;
    }

    /**
     *
     *
     *
     * @memberOf TextNode
     */
    public remove(): void {
        this._remove(this.parent);
    }

    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf TextNode
     */
    public setParent(element: Element): void {
        this.parent = element;
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf TextNode
     */
    public getParent(): IUniversalElement<any> {
        return <IUniversalElement<any>>this.parent;
    }

    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    public appendTo(element: IUniversalElement<any>): void {
        element.append(this);
    }
    /**
     *
     *
     * @param {IUniversalElement<any>} element
     *
     * @memberOf TextNode
     */
    public prependTo(element: IUniversalElement<any>): void {
        element.prepend(this);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertAfter(element);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf TextNode
     */
    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertBefore(element);
    }

    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf TextNode
     */
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf TextNode
     */
    public getSource(): string {
        return this.getValue();
    }
}

/**
 *
 *
 * @export
 * @class Element
 * @extends {GenericDomManupulations}
 * @implements {IUniversalElement<any>}
 */
export class Element extends GenericDomManupulations implements IUniversalElement<any> {
    /**
     *
     *
     * @type {number}
     * @memberOf Element
     */
    public $id: number = ++elementIDS;
    /**
     *
     *
     * @private
     * @type {Element}
     * @memberOf Element
     */
    private parent: Element;
    /**
     *
     *
     * @private
     * @type {string}
     * @memberOf Element
     */
    private name: string;
    /**
     *
     *
     * @private
     * @type {Map<string, Attribute>}
     * @memberOf Element
     */
    private attrs: Map<string, Attribute> = new Map();

    /**
     *
     *
     * @private
     * @type {Set<string>}
     * @memberOf Element
     */
    private classNames: Set<string> = new Set();

    /**
     *
     *
     * @private
     * @type {((IUniversalElement<HTMLElement> |
     *         IUniversalTextNode<Text> | IUniversalComment<Text>)[])}
     * @memberOf Element
     */
    private children: (IUniversalElement<HTMLElement> |
        IUniversalTextNode<Text> | IUniversalComment<Text>)[] = [];


    /**
     * Creates an instance of Element.
     *
     * @param {(string | HTMLElement)} name
     *
     * @memberOf Element
     */
    constructor(name: string | HTMLElement) {
        super();
        if (typeof name === "string") {
            this.name = name;
        }
    }

    /**
     *
     *
     * @returns
     *
     * @memberOf Element
     */
    public isRehydrated() {
        return false;
    }

    /**
     *
     *
     * @returns {*}
     *
     * @memberOf Element
     */
    public getOriginal(): any { }


    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    public append(element: IUniversalElement<any> |
        IUniversalTextNode<Text> | IUniversalComment<any>): void {
        let el = <Element>element;
        el.setParent(this);
        this.children.push(el);
    }


    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    public appendTo(element: IUniversalElement<any> |
        IUniversalTextNode<Text>): void {
        let el = <IUniversalElement<any>>element;
        el.append(this);
    }


    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    public prepend(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        element.setParent(this);
        this.children.splice(0, 0, element);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> |
     *         IUniversalTextNode<Text>)} element
     *
     * @memberOf Element
     */
    public prependTo(element: IUniversalElement<any> |
        IUniversalTextNode<Text>): void {
        let el = <IUniversalElement<any>>element;
        el.prepend(this);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    public insertAfter(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertAfter(element);
    }

    /**
     *
     *
     * @param {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)} element
     *
     * @memberOf Element
     */
    public insertBefore(element: IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>): void {
        this._insertBefore(element);
    }

    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    public getNextSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getNextSibling(this);
    }
    /**
     *
     *
     * @returns {(IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any>)}
     *
     * @memberOf Element
     */
    public getPreviousSibling(): IUniversalElement<any> | IUniversalTextNode<any> | IUniversalComment<any> {
        return this._getPreviousSibling(this);
    }

    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    public removeChild(element: Element) {
        let index = this.children.indexOf(element);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /**
     *
     *
     *
     * @memberOf Element
     */
    public remove(): void {
        this.parent.removeChild(this);
    }

    /**
     *
     *
     * @param {IUniversalAttribute<any>} attribute
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    public setAttr(attribute: IUniversalAttribute<any>): IUniversalAttribute<Attr> {
        attribute.setParent(this);
        this.attrs.set(attribute.getName(), <Attribute>attribute);
        return attribute;
    }

    /**
     *
     *
     * @param {(IUniversalAttribute<any> | string)} attribute
     *
     * @memberOf Element
     */
    public removeAttr(attribute: IUniversalAttribute<any> | string) {
        this.attrs.delete((<Attribute>attribute).getName());
    }

    /**
     *
     *
     * @param {string} name
     * @param {*} [value]
     * @returns {IUniversalAttribute<Attr>}
     *
     * @memberOf Element
     */
    public attr(name: string, value?: any): IUniversalAttribute<Attr> {
        if (value === undefined) {
            return this.getAttr(name);
        } else {
            let attr = this.getAttr(name) || this.setAttr(new Attribute(name));
            attr.setValue(value);
            return attr;
        }
    }


    /**
     *
     *
     * @param {string} name
     * @returns {IUniversalAttribute<any>}
     *
     * @memberOf Element
     */
    public getAttr(name: string): IUniversalAttribute<any> {
        return this.attrs.get(name);
    }

    /**
     *
     *
     * @returns {IUniversalAttribute<any>[]}
     *
     * @memberOf Element
     */
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

    /**
     *
     *
     * @returns {((IUniversalElement<any> |
     *         IUniversalTextNode<any> | IUniversalComment<any>)[])}
     *
     * @memberOf Element
     */
    public getChildren(): (IUniversalElement<any> |
        IUniversalTextNode<any> | IUniversalComment<any>)[] {
        return this.children;
    }

    /**
     *
     *
     * @param {({
     *         (element: IUniversalElement<any>
     *             | IUniversalTextNode<any> | IUniversalComment<any>, index: number): void
     *     })} closure
     *
     * @memberOf Element
     */
    public eachChild(closure: {
        (element: IUniversalElement<any>
            | IUniversalTextNode<any> | IUniversalComment<any>, index: number): void
    }) {
        for (let i = 0; i < this.children.length; i++) {
            closure(this.children[i], i);
        }
    }

    /**
     *
     *
     * @param {((IUniversalElement<any>
     *         | IUniversalTextNode<any>)[])} elements
     *
     * @memberOf Element
     */
    public setChildren(elements: (IUniversalElement<any>
        | IUniversalTextNode<any>)[]): void {
        this.children = elements;
    }


    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    public addClass(name: string): void {
        if (!this.classNames.has(name)) {
            this.classNames.add(name);
        }
    }

    /**
     *
     *
     * @param {string} name
     * @returns {boolean}
     *
     * @memberOf Element
     */
    public hasClass(name: string): boolean {
        return this.classNames.has(name);
    }

    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    public removeClass(name: string): void {
        this.classNames.delete(name);
    }

    /**
     *
     *
     * @param {string} name
     *
     * @memberOf Element
     */
    public toggleClass(name: string): void {
        if (this.classNames.has(name)) {
            this.classNames.delete(name);
        } else {
            this.classNames.add(name);
        }
    }

    /**
     *
     *
     * @param {*} data
     * @param {string} [value]
     *
     * @memberOf Element
     */
    public setStyle(data: any, value?: string) {
        let styleAttr = <Attribute>(this.getAttr("style") || this.setAttr(new Attribute("style")));
        styleAttr.setStyle(data, value);
    }

    /**
     *
     *
     * @param {string} name
     * @returns {string}
     *
     * @memberOf Element
     */
    public getStyle(name: string): string {
        let styleAttr = <Attribute>(this.getAttr("style") || this.setAttr(new Attribute("style")));
        return styleAttr.getStyle(name);
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
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

    /**
     *
     *
     * @param {Element} element
     *
     * @memberOf Element
     */
    public setParent(element: Element) {
        this.parent = element;
    }

    /**
     *
     *
     * @returns {IUniversalElement<any>}
     *
     * @memberOf Element
     */
    public getParent(): IUniversalElement<any> {
        return this.parent;
    }

    /**
     *
     *
     * @returns {string}
     *
     * @memberOf Element
     */
    public getHTML(): string {
        let html = [];
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            html.push(child.getSource());
        }
        return html.join("");
    }
    /**
     *
     *
     *
     * @memberOf Element
     */
    public empty() {
        this.children = [];
    }
}