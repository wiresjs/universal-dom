import { IUniversalElement, IUniversalTextNode, IUniversalAttribute, IUniversalComment } from "./Common";
/**
 *
 *
 * @export
 * @class UniversalDom
 */
export declare class UniversalDom {
    /**
     *
     *
     * @static
     * @param {(string | HTMLElement)} data
     * @returns {IUniversalElement<any>}
     *
     * @memberOf UniversalDom
     */
    static createElement(data: string | HTMLElement): IUniversalElement<any>;
    /**
     *
     *
     * @static
     * @param {string} name
     * @param {string} [value]
     * @returns {IUniversalAttribute<any>}
     *
     * @memberOf UniversalDom
     */
    static createAttribute(name: string, value?: string): IUniversalAttribute<any>;
    /**
     *
     *
     * @static
     * @param {string} value
     * @returns {IUniversalTextNode<any>}
     *
     * @memberOf UniversalDom
     */
    static createTextNode(value: string): IUniversalTextNode<any>;
    /**
     *
     *
     * @static
     * @param {string} value
     * @returns {IUniversalComment<any>}
     *
     * @memberOf UniversalDom
     */
    static createComment(value: string): IUniversalComment<any>;
}
