function createDom(a, b, c, d) { a = document.createElement(a); if (b instanceof Object) for (var e in b) a[e] = b[e]; c instanceof Node && c.appendChild(a); d instanceof Function && d(a); return a };

var selectedElement = null;

function clearSelection() {
    selectedElement = null;
    [...document.querySelectorAll(".editor-heightlight")].map(e => e.remove());
}

window.daikido.onrefresh(function () {
    if (selectedElement != null)
        hightLight(selectedElement);
});

function hightLight(element) {
    clearSelection();
    selectedElement = element;
    createDom("div", {
        className: "editor-heightlight editor"
    }, element.parentNode, ele => {
        var rect = element.getBoundingClientRect();
        var rect2 = element.parentNode.getBoundingClientRect();
        ele.style.position = "absolute";
        ele.style.top = rect.top - rect2.top + "px";
        ele.style.left = rect.left - rect2.left + "px";
        ele.style.width = rect.width - 4 + "px";
        ele.style.height = rect.height - 4 + "px";
        ele.style.boxShadow = "0 0 100px black, inset 0 0 20px black";
        ele.style.borderRadius = "10px";
        ele.style.zIndex = "99";
        ele.style.border = "solid 2px white"
    })
}

function showBorder(ele) {
    /*
    [...ele.querySelectorAll('.row,.line')].map(e => {
        e.style.border = e.editortemp;
        e.editortemp = e.style.border;
        e.style.border = "solid 1px gray";
    });*/
}
function hideBorder(ele) {/*
    [...ele.querySelectorAll('.row,.line')].map(e => {
        e.style.border = e.editortemp;
    });*/
}

addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key.toLowerCase() == "e") {
        e.preventDefault();
        activeEditor();
    }
})
var closeEditor = function () { };
function activeEditor() {
    closeEditor();
    var main = createDom("div", {
        className: "container editor"
    });



    var panel = createDom("div", {
        className: "row editor",
    }, main, ele => {
        ele.setAttribute("layout", "64");
        ele.setAttribute("color", "white");
        ele.style.overflow = "hidden";
    });

    var content = createDom("div", {
        className: "row editor",
        innerHTML: document.body.innerHTML
    }, main, ele => ele.style.overflow = "hidden");

    document.body.innerHTML = "";

    var clickedSelection = false;
    content.addEventListener("mousedown", function (e) {
        if (e.srcElement.classList.contains("editor-heightlight")) {
            clickedSelection = true;
            e.preventDefault();
        }
        else if (e.srcElement.classList.contains("editor"));
        else {
            clickedSelection = false;            
            hightLight(e.srcElement);
            e.preventDefault();
        }
    });

    content.addEventListener("mouseup", function (e) {
        if (e.srcElement.classList.contains("editor-heightlight")) {
            if(clickedSelection) clearSelection();
        }        
        if (e.srcElement.classList.contains("editor")) return;
        if (selectedElement != null) hightLight(selectedElement.parentNode);
        clickedSelection = false;

    });

    document.body.appendChild(main);
    daikido.pageUpdate(0);

    closeEditor = function () {
        clearSelection();
        document.body.innerHTML = content.innerHTML;
        daikido.pageUpdate(0);
    }
    content.style.overflow = "hidden";


    // methods
    function notEditor(ele) {
        if (ele == null) return null;
        return ele.classList.contains("editor") ? null : ele;
    }
    function deleteSelected() {
        var last =
            notEditor(selectedElement.previousElementSibling) ||
            notEditor(selectedElement.nextElementSibling) ||
            notEditor(selectedElement.parentNode);
        selectedElement.remove();
        hightLight(last);
    }

    function setText() {

        if (selectedElement.nodeName.toLowerCase() == "div") {
            var result = prompt("請輸入文字", "");
            if (result != null) createDom("p", { textContent: result }, selectedElement);
        } else {
            var result = prompt("請輸入文字", selectedElement.textContent);
            if (result != null) selectedElement.textContent = result;
        }
    }

    function setLayout() {
        var result = prompt("請輸入比例或大小", (selectedElement.attributes.layout || { value: "*1" }).value);
        if (result != null) {
            selectedElement.setAttribute("layout", result);
        }
    }

    function setSize() {
        function reset(tag) {
            selectedElement.classList.remove("big");
            selectedElement.classList.remove("mid");
            selectedElement.classList.remove("normal");
            if (tag != null) selectedElement.classList.add(tag);
        }
        if (selectedElement == null) return;
        drawMenu([
            { text: "大", onclick: reset.bind(null, "big") },
            { text: "中", onclick: reset.bind(null, "mid") },
            { text: "一般", onclick: reset.bind(null, "normal") },
            { text: "正常", onclick: reset.bind(null, null) }
        ], contentMenu);
    }
    function setAlign() {
        drawMenu([
            {
                text: "水平", onclick: function () {
                    function reset(tag) {
                        if (selectedElement.classList.contains("center")) {
                            selectedElement.classList.remove("center");
                            selectedElement.classList.add("center-v");
                        }
                        selectedElement.classList.add("wrap");
                        selectedElement.classList.remove("left");
                        selectedElement.classList.remove("right");
                        selectedElement.classList.remove("center-h");
                        if (tag != null) selectedElement.classList.add(tag);
                        if (selectedElement.classList.contains("center-h") &&
                            selectedElement.classList.contains("center-v")) {
                            selectedElement.classList.remove("center-h");
                            selectedElement.classList.remove("center-v");
                            selectedElement.classList.add("center");
                        }
                    }
                    drawMenu([
                        { text: "左", onclick: reset.bind(null, "left") },
                        { text: "中", onclick: reset.bind(null, "center-h") },
                        { text: "右", onclick: reset.bind(null, "right") },
                        { text: "無", onclick: reset.bind(null, null) },
                    ], setAlign);
                }
            },
            {
                text: "垂直", onclick: function () {
                    function reset(tag) {
                        if (selectedElement.classList.contains("center")) {
                            selectedElement.classList.remove("center");
                            selectedElement.classList.add("center-h");
                        }
                        selectedElement.classList.add("wrap");
                        selectedElement.classList.remove("top");
                        selectedElement.classList.remove("bottom");
                        selectedElement.classList.remove("center-v");
                        if (tag != null) selectedElement.classList.add(tag);
                        if (selectedElement.classList.contains("center-h") &&
                            selectedElement.classList.contains("center-v")) {
                            selectedElement.classList.remove("center-h");
                            selectedElement.classList.remove("center-v");
                            selectedElement.classList.add("center");
                        }
                    }
                    drawMenu([
                        { text: "上", onclick: reset.bind(null, "top") },
                        { text: "中", onclick: reset.bind(null, "center-v") },
                        { text: "下", onclick: reset.bind(null, "bottom") },
                        { text: "無", onclick: reset.bind(null, null) },
                    ], setAlign);
                }
            }], contentMenu);
    }

    var reverseAnimation = false;
    function drawMenu(array, back) {
        mousedown = false;
        panel.innerHTML = "";
        if (back instanceof Function)
            array.unshift({ text: "く", tcolor: "red", onclick: back, layout: "64", back: true })
        array.map(e => {
            createDom("div", {
                className: "line hover " + (reverseAnimation ? "fadeout" : "fadein")
            }, panel, ele => {

                createDom("h2", { className: "wrap center", textContent: e.text }, ele, t => {
                    t.setAttribute("color", e.tcolor || "black");
                });
                ele.setAttribute("layout", e.layout || "*1");
                ele.setAttribute("color", e.color || "white");
                ele.setAttribute("shade", e.shade || "500");
                ele.addEventListener("mousedown", function (m) {
                    m.preventDefault();
                });
                ele.onclick = function (m) {
                    m.preventDefault();
                    e.onclick();
                }
                if (e.back) ele.onclick = function (m) {
                    m.preventDefault();
                    reverseAnimation = true;
                    e.onclick();
                    reverseAnimation = false;
                }
            });
        })
    }


    function menu() {
        hideBorder(content);
        drawMenu([
            { text: "內容", onclick: contentMenu },
            { text: "版面", onclick: objMenu },
        ], closeEditor)
    }

    function contentMenu() {
        drawMenu([
            { text: "文字", onclick: setText },
            { text: "大小", onclick: setSize },
            { text: "對齊", onclick: setAlign },
            {
                text: "顏色", onclick: function () {
                    if (selectedElement)
                        colorPanel(function (r) {
                            if (r == null) selectedElement.setAttribute("color", "none");
                            selectedElement.setAttribute("color", r.color);
                            selectedElement.setAttribute("shade", r.shade);
                        }, contentMenu);
                }
            }
        ], menu);
    }

    function objMenu() {
        showBorder(content);
        drawMenu([
            { text: "新增", tcolor: "green", onclick: objCreateMenu },
            { text: "刪除", tcolor: "red", onclick: deleteSelected },
            { text: "調整", tcolor: "black", onclick: setLayout },
        ], menu)
    }

    function objCreateMenu() {


        var target = selectedElement;

        function createElement() {
            target = selectedElement;

            if (target != null)
                while (target.parentNode != null && !(
                    target.parentNode.classList.contains("container") ||
                    target.parentNode.classList.contains("row") ||
                    target.parentNode.classList.contains("line"))) {
                    target = target.parentNode;
                }

            if (target != null)
                if (target.classList.contains("editor")) return;

            var className = target.className;
            var div = createDom("div", {
                className: className
            });
            return div;
        }
        function createElement2() {
            target = selectedElement;
            var className = "row";
            if (target == null) return createDom("div", { className: "page" });
            if (target.classList.contains("row")) className = "line";
            if (target.classList.contains("container")) className = "row";
            var div = createDom("div", {
                className: className
            });
            return div;
        }


        drawMenu([
            {
                text: "前面", onclick: function () {
                    if (target == null) return;
                    var element = createElement()
                    target.parentNode.insertBefore(element, target);
                    hightLight(element);
                }
            },
            {
                text: "後面", onclick: function () {
                    if (target == null) return;
                    var element = createElement();
                    if (target.nextSibling != null)
                        target.parentNode.insertBefore(element, target.nextSibling);
                    else target.parentNode.appendChild(element);
                    hightLight(element);
                }
            },
            {
                text: "裡面", onclick: function () {
                    if (target == null) target = content;
                    var element = createElement2();
                    target.appendChild(element);
                    hightLight(element);
                }
            },

        ], objMenu)
    }

    function colorPanel(callback, back) {
        var buttons = [{
            text: "無",
            onclick: function () {
                callback(null);
            }
        }];
        for (var i in daikido.colors) {
            (function (color) {
                buttons.push({
                    color: color,
                    onclick: function () {
                        var buttons = [];
                        if (color == "black" || color == "white") {
                            callback({ color: color, shade: 500 })
                        } else {
                            ["100", "300", "500", "700", "900"].map(j => {
                                buttons.push({
                                    color: color,
                                    shade: j,
                                    text: j == "500" ? color : "",
                                    onclick: function () {
                                        callback({
                                            color: color,
                                            shade: j
                                        })
                                    }
                                });
                            });
                            drawMenu(buttons, function () {
                                colorPanel(callback, back)
                            });
                        }
                    }
                })
            })(i);
        }
        drawMenu(buttons, back);
    }

    menu();

}