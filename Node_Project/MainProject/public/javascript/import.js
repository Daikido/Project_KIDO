(function (a) { var c = {}, b = c; a.map(function (c) { var a = document.createElement("script"); a.src = c; b.onload = function () { document.body.appendChild(a) }; b = a }); c.onload() })([
    "library/dom.js",
    "library/drag.js",
    "library/component.js",
    "main.js"
]);

(function (a) { a.map(function (a) { var b = document.createElement("link"); b.rel = "stylesheet"; b.href = a; document.body.appendChild(b) }) })([
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "style/overwatch.css",
    "library/drag.css",
    "library/component.css"
]);