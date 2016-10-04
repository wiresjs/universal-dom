var isServer = typeof exports !== "undefined"
var root;
if (isServer) {
    var Dom = require("../build/universal-dom.js").Dom;
    var should = require("should");
    root = Dom.createElement("div");
    root.attr("id", "root")
} else {
    root = Dom.createElement(document.getElementById("root"));
}
var subject = Dom.createElement("div")
var myAttr;
describe("Text manipulation", function() {
    it("Should create an attribute using .attr", function() {
        subject.attr("foo", "bar")
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

    after(function() {
        root.empty();
    })

})