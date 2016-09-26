var root = document.getElementById("root");


var getHTML = function(remove) {
    remove = remove === undefined ? true : false;
    var html = root.innerHTML;
    html = html.replace(/\r?\n|\r|\t/g, '');
    html = html.replace(/\s{2,}/g, ' ');
    html = html.trim();
    return html;
}

var subject;
describe("Generic test", function() {
    it("Should create an element", function() {
        subject = Dom.createElement("div");
        root.appendChild(subject.getOriginal());
        getHTML().should.equal("<div></div>")
    });

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
        subject.remove();




    });

    it("Should create an attribute via .attr", function() {

    });
})