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
describe("Comments", function() {
    it("Should append comment", function() {
        subject = Dom.createComment("hello world");
        root.append(subject);
        root.getSource().should.equal('<div id="root"><!--hello world--></div>');
    });

    it("Should remove comment", function() {
        subject.remove();
        root.getSource().should.equal('<div id="root"></div>');
    });

    it("Should prepend  comment", function() {
        var p = Dom.createElement("p");
        root.append(p);
        root.prepend(subject)
        root.getSource().should.equal('<div id="root"><!--hello world--><p></p></div>');
        p.remove();
        subject.remove();
    });
    /*
    it("Should use comment.insertAfter", function() {
        var p1 = Dom.createElement("p");
        p1.attr("id", "p1")

        var p2 = Dom.createElement("p");
        p2.attr("id", "p2")

        root.append(p1)
        root.append(p2)

        subject.insertAfter(p1)

        root.getSource().should.equal('<div id="root"><p id="p1"></p><!--hello world--><p id="p2"></p></div>');
        subject.remove()
        p1.remove();
        p2.remove();
    });


    it("Should use comment.insertBefore", function() {
        var p1 = Dom.createElement("p");
        p1.attr("id", "p10");
        var p2 = Dom.createElement("p");
        p2.attr("id", "p11")
        root.append(p1);
        root.append(p2);
        subject.insertBefore(p2);
        root.getSource().should.equal('<div id="root"><p id="p10"></p><!--hello world--><p id="p11"></p></div>');
    });*/

})