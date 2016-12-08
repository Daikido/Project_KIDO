(function(files){
    var main = {};
    var prev = main;
    files.map(file=>{
        var script = document.createElement("script");
        script.src = file;
        prev.onload = function(){
            document.body.appendChild(script);
        }
        prev = script;
    });
    main.onload();
})([
    "javascript/library/dom.js",
    "javascript/library/component.js",
    "main.js"
]);