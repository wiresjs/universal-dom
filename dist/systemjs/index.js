System.register(["./UniversalDom"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UniversalDom_1;
    var Dom;
    return {
        setters:[
            function (UniversalDom_1_1) {
                UniversalDom_1 = UniversalDom_1_1;
            }],
        execute: function() {
            exports_1("Dom", Dom = UniversalDom_1.UniversalDom);
        }
    }
});
