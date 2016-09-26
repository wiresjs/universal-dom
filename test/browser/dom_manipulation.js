var root = document.getElementById("root");

var getHTML = function(remove) {
    var html = root.innerHTML;
    html = html.replace(/\r?\n|\r|\t/g, '');
    html = html.replace(/\s{2,}/g, ' ');
    html = html.trim();
    return html;
}

var subject;
var child1 = Dom.createElement("div");
var child2 = Dom.createElement("div");;
describe("Dom manipulations", function() {
    it("Should create an element", function() {
        subject = Dom.createElement("div");
        root.appendChild(subject.getOriginal());
        getHTML().should.equal("<div></div>")
    });

    it("Should append a child", function() {
        subject.append(child1)
        getHTML().should.equal("<div><div></div></div>")
    });

    it("Should append a child", function() {
        child1.remove();
        getHTML().should.equal("<div></div>")
    });

    it("appendTo should work", function() {
        child1.addClass("foo")
        child1.appendTo(subject);
        getHTML().should.equal('<div><div class="foo"></div></div>')
    });


    it("prepend should work", function() {
        child2.addClass("bar");
        subject.prepend(child2)
        getHTML().should.equal('<div><div class="bar"></div><div class="foo"></div></div>')
    });

    it("prependTo should work", function() {
        child2.remove();
        child2.addClass("world")
        child2.prependTo(subject);
        getHTML().should.equal('<div><div class="bar world"></div><div class="foo"></div></div>')
    });

})