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
subject.appendTo(root);

describe("Classes manipulation", function() {
    it("Should add a class", function() {
        subject.addClass("hello")
        root.getSource().should.equal('<div id="root"><div class="hello"></div></div>');
    });

    it("Should remove class name", function() {
        subject.removeClass("hello")
        root.getSource().should.equal('<div id="root"><div></div></div>');
    });

    it("Should add 2 classes", function() {
        subject.addClass("foo")
        subject.addClass("bar")
        root.getSource().should.equal('<div id="root"><div class="foo bar"></div></div>');
    });


    it("Should remove one class and leave 1 behind", function() {
        subject.removeClass("foo")
        root.getSource().should.equal('<div id="root"><div class="bar"></div></div>');
    });

    it("Should toggle class", function() {
        subject.toggleClass("bar")
        root.getSource().should.equal('<div id="root"><div></div></div>');
        subject.toggleClass("bar")
        root.getSource().should.equal('<div id="root"><div class="bar"></div></div>');
    });
    after(function() {
        root.empty();
    });
})