var isServer = typeof exports !== "undefined"
var root;
var Dom;
if (isServer) {
    Dom = require("../build/commonjs/index.js").Dom;
    var should = require("should");
    root = Dom.createElement("div");
    root.attr("id", "root")
} else {
    root = uDom.Dom.createElement(document.getElementById("root"));
    Dom = uDom.Dom;

}
var subject
var myAttr;
describe("Text manipulation", function() {
    before(function() {
        subject = Dom.createElement("div");
    })
    it("Should create an attribute using .attr", function() {
        subject.attr("foo", "bar");
        subject.appendTo(root);
        root.getSource().should.equal('<div id="root"><div foo="bar"></div></div>');
    });

    it("Should create an attribute using createAttribute", function() {
        myAttr = Dom.createAttribute("boo")
        subject.setAttr(myAttr)
        myAttr.setValue("coo")
        root.getSource().should.equal('<div id="root"><div foo="bar" boo="coo"></div></div>');
    });

    it("Should remove an attribute", function() {
        myAttr.remove();
        root.getSource().should.equal('<div id="root"><div foo="bar"></div></div>');
    });

    it("Should add an attribute (back)", function() {
        subject.setAttr(myAttr)
        root.getSource().should.equal('<div id="root"><div foo="bar" boo="coo"></div></div>');
    });

    it("Should remove an attribute by name", function() {
        myAttr.remove("boo");
        root.getSource().should.equal('<div id="root"><div foo="bar"></div></div>');
    });

    it("Should give a list of attributes", function() {
        root.empty();
        var el = Dom.createElement("div");
        el.addClass("foo")
        el.attr("bar", "car");
        (el.getAttrs().length === 2).should.equal(true)
    });

    it("Should handle styles (key:value)", function() {
        root.empty();
        var el = Dom.createElement("div");
        el.setStyle("color", "red");
        el.getSource().should.equal('<div style="color: red;"></div>');
    });

    it("Should handle styles (object)", function() {
        root.empty();
        var el = Dom.createElement("div");
        el.setStyle({
            color: "red",
            display: "block"
        });
        el.setStyle("display", "none")
        el.getSource().should.equal('<div style="color: red; display: none;"></div>');
    });

    after(function() {
        root.empty();
    })

})