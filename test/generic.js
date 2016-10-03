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

    /*
        it("Should add a class name foo", function() {
            subject.addClass("foo")
            subject.addClass("bar")
            var html = getHTML();
            html.should.equal('<div class="foo bar"></div>')
        });

        it("Should remove class name foo", function() {
            subject.removeClass("foo")
            var html = getHTML();
            html.should.equal('<div class="bar"></div>')
        });

        it("Should remove class name bar", function() {
            subject.removeClass("bar")
            var html = getHTML();
            html.should.equal('<div class=""></div>')
        });

        it("Should style with 2 arguments", function() {
            subject.setStyle("color", "red")
            var html = getHTML();
            html.should.equal('<div class="" style="color: red; "></div>')
        });

        it("Should style with object", function() {
            subject.setStyle({
                color: "blue"
            })
            var html = getHTML();
            html.should.equal('<div class="" style="color: blue; "></div>')
        });

        it("Should remove element", function() {
            subject.remove();
            var html = getHTML();
            html.should.equal('')
        });

        it("Should create an element once again", function() {
            subject = Dom.createElement("div");
            root.appendChild(subject.getOriginal());
            getHTML().should.equal("<div></div>")
        });

        it("Should add an attribute", function() {
            var attr = Dom.createAttribute("id");
            attr.setValue("foo")
            subject.setAttr(attr)
            getHTML().should.equal('<div id="foo"></div>')
        });

        it("Should modify an attribute", function() {
            var attr = subject.getAttr("id");
            attr.setValue("bar")

            getHTML().should.equal('<div id="bar"></div>')
        });

        it("Should create an attribute via .attr", function() {
            subject.attr("foo", "bar")
            getHTML().should.equal('<div id="bar" foo="bar"></div>');
        });

        it("Should update an attribute via .attr", function() {
            subject.attr("foo", "world")
            getHTML().should.equal('<div id="bar" foo="world"></div>');
        });

        after(function() {
            subject.remove();
        });*/
})