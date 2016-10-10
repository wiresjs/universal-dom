var isServer = typeof exports !== "undefined"
var root;
if (isServer) {
    var Dom = require("../build/commonjs/index.js").Dom;
    var should = require("should");
    root = Dom.createElement("div");
    root.attr("id", "root")
} else {
    root = Dom.createElement(document.getElementById("root"));
}

var subject, paragraph;
describe("Next and Prev sibling test", function() {
    it("Next on comments", function() {
        var a = Dom.createComment("a")
        var b = Dom.createComment("b")
        a.appendTo(root);
        b.appendTo(root);
        a.getNextSibling().getSource().should.equal("<!--b-->")
    });

    it("Prev on comments", function() {
        root.empty();
        var a = Dom.createComment("a")
        var b = Dom.createComment("b")
        a.appendTo(root);
        b.appendTo(root);
        b.getPreviousSibling().getSource().should.equal("<!--a-->")
    });

    it("Next on text", function() {
        root.empty();
        var a = Dom.createTextNode("a")
        var b = Dom.createComment("b")
        a.appendTo(root);
        b.appendTo(root);
        a.getNextSibling().getSource().should.equal("<!--b-->")
    });

    it("Prev on comments", function() {
        root.empty();
        var a = Dom.createComment("a")
        var b = Dom.createTextNode("b")
        a.appendTo(root);
        b.appendTo(root);
        b.getPreviousSibling().getSource().should.equal("<!--a-->")
    });

    it("Next on element", function() {
        root.empty();
        var a = Dom.createElement("span")
        var b = Dom.createElement("div")
        a.appendTo(root);
        b.appendTo(root);
        a.getNextSibling().getSource().should.equal("<div></div>")
    });

    it("Prev on element", function() {
        root.empty();
        var a = Dom.createElement("span")
        var b = Dom.createElement("div")
        a.appendTo(root);
        b.appendTo(root);
        b.getPreviousSibling().getSource().should.equal("<span></span>")
    });

    after(function() {
        root.empty();
    });
})