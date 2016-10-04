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

var subject, paragraph;
describe("Children and dom manipulations", function() {
    it("Should create an element", function() {
        subject = Dom.createElement("div");
        root.append(subject);

        root.getSource().should.equal('<div id="root"><div></div></div>');
    });

    it("Should give children list", function() {
        var children = root.getChildren();
        children.length.should.equal(1)
    });

    it("First child should have reference", function() {
        var children = root.getChildren();
        children[0].attr("id", "foo");
        root.getSource().should.equal('<div id="root"><div id="foo"></div></div>');
    });

    it("First remove file child", function() {
        var children = root.getChildren();
        children[0].remove();
        root.getSource().should.equal('<div id="root"></div>');
    });

    it("Puting an element back using prependTo", function() {
        subject.prependTo(root)
        root.getSource().should.equal('<div id="root"><div id="foo"></div></div>');
        subject.remove();
    });

    it("Prepend should work", function() {
        root.prepend(subject);
        paragraph = Dom.createElement("p");
        root.prepend(paragraph);
        root.getSource().should.equal('<div id="root"><p></p><div id="foo"></div></div>');
    });

    it("Should remove paragraph", function() {
        paragraph.remove();
        root.getSource().should.equal('<div id="root"><div id="foo"></div></div>');
    });


    it("Should work element.insertAfter", function() {
        root.empty();
        subject = Dom.createElement("div");
        subject.attr("id", "target")

        var p1 = Dom.createElement("p");
        p1.attr("id", "p1")

        var p2 = Dom.createElement("p");
        p2.attr("id", "p2")

        root.append(p1);
        root.append(p2);
        subject.insertAfter(p1);

        root.getSource().should.equal('<div id="root"><p id="p1"></p><div id="target"></div><p id="p2"></p></div>');
    });

    it("Should work element.insertBefore", function() {
        root.empty();
        subject = Dom.createElement("div");
        subject.attr("id", "target")

        var p1 = Dom.createElement("p");
        p1.attr("id", "p1")

        var p2 = Dom.createElement("p");
        p2.attr("id", "p2")

        root.append(p1);
        root.append(p2);
        subject.insertBefore(p1);

        root.getSource().should.equal('<div id="root"><div id="target"></div><p id="p1"></p><p id="p2"></p></div>');
    });

    it("Should insert node after a comment", function() {
        root.empty();
        subject = Dom.createElement("div");
        subject.attr("id", "foo");
        var c1 = Dom.createComment("comment1")
        var c2 = Dom.createComment("comment2")
        root.append(c1);
        root.append(c2);

        subject.insertAfter(c2);
        root.getSource().should.equal('<div id="root"><!--comment1--><!--comment2--><div id="foo"></div></div>');
    });

    it("Should insert node before a comment", function() {
        root.empty();
        subject = Dom.createElement("div");
        subject.attr("id", "foo");
        var c1 = Dom.createComment("comment1")
        var c2 = Dom.createComment("comment2")
        root.append(c1);
        root.append(c2);

        subject.insertBefore(c2);
        root.getSource().should.equal('<div id="root"><!--comment1--><div id="foo"></div><!--comment2--></div>');
    });

    it("Should get html (children)", function() {
        root.empty();
        subject = Dom.createElement("div");
        subject.attr("id", "foo");
        var c1 = Dom.createComment("comment1")
        var c2 = Dom.createComment("comment2")
        root.append(c1);
        root.append(c2);

        subject.insertBefore(c2);
        root.getHTML().should.equal('<!--comment1--><div id="foo"></div><!--comment2-->');
    });
    after(function() {
        root.empty();
    });
})