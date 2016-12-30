function createDom(a, b, c, d) { a = document.createElement(a); if (b instanceof Object) for (var e in b) a[e] = b[e]; c instanceof Node && c.appendChild(a); d instanceof Function && d(a); return a };

var selectedElement = null;

function clearSelection() {
    selectedElement = null;
    [...document.querySelectorAll(".editor-heightlight")].map(e => e.remove());
}

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
        ele.style.width = rect.width + "px";
        ele.style.height = rect.height + "px";
        ele.style.boxShadow = "0 0 100px black, inset 0 0 10px white";
        ele.style.borderRadius = "10px";
        ele.style.zIndex = "99";
    })
}

function showBorder(ele){
    [...ele.querySelectorAll('.row,.line')].map(e=>{
        e.editortemp = e.style.border;
        e.style.border="solid 1px gray";
    });
}
function hideBorder(ele){
    [...ele.querySelectorAll('.row,.line')].map(e=>{
        e.style.border=e.editortemp;
    });
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
        ele.setAttribute("color", "black");
    });

    var content = createDom("div", {
        className: "row editor",
        innerHTML: document.body.innerHTML
    }, main, ele => ele.style.overflow = "hidden");

    document.body.innerHTML = "";

    content.addEventListener("click", function (e) {
        console.log(e);
        if (e.srcElement.classList.contains("editor-heightlight")) clearSelection();
        else if (e.srcElement.classList.contains("editor"));
        else {
            hightLight(e.srcElement);
            e.preventDefault();
        }
    })

    document.body.appendChild(main);

    closeEditor = function () {
        clearSelection();
        document.body.innerHTML = content.innerHTML;
    }
    content.style.overflow = "hidden";


    // methods

    function deleteSelected() {
        selectedElement.remove();
        clearSelection();
    }

    function setText() {
        var result = prompt("請輸入文字", selectedElement.textContent);
        if (result != null) selectedElement.textContent = result;
    }


    function drawMenu(array, back) {
        panel.innerHTML = "";
        if(back instanceof Function ) 
        array.unshift({ text: "<", tcolor: "red", onclick: back, layout:"128" })
        array.map(e => {
            createDom("div", { className: "line fadein hover" }, panel, ele => {

                createDom("h1", { className: "wrap center", textContent: e.text }, ele, t => {
                    t.setAttribute("color", e.tcolor || "black");
                });
                ele.setAttribute("layout", e.layout || "*1");
                ele.setAttribute("color", e.color || "white");
                ele.setAttribute("shade", e.shade || "500");

                ele.onclick = e.onclick;
            });
        })
    }


    function menu() {
        hideBorder(content);
        drawMenu([
            { text: "內容", onclick: contentMenu },
            { text: "物件", onclick: objMenu },
        ], closeEditor)
    }

    function contentMenu() {
        drawMenu([
            { text: "文字", onclick: setText },
            { text: "顏色",  onclick: function () {
                    if (selectedElement)
                        colorPanel(function (r) {
                            if (r == null) selectedElement.setAttribute("color", "none");
                            selectedElement.setAttribute("color", r.color);
                            selectedElement.setAttribute("shade", r.shade);
                        }, objMenu);
                }
            }
        ], menu);
    }

    function objMenu() {
        showBorder(content);
        drawMenu([
            { text: "新增", color: "green", onclick: objCreateMenu },
            { text: "刪除", color: "red", onclick: deleteSelected },
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

            var className = "row";
            if (target.parentNode.classList.contains("row")) className = "line";
            if (target.parentNode.classList.contains("container")) className = "page";
            var div = createDom("div", {
                className: className
            });
            return div;
        }
        function createElement2() {
            var className = "row";
            if (target == null) return createDom("div", { className: "page" });
            if (target.classList.contains("row")) className = "line";
            if (target.classList.contains("container")) className = "page";
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
                    setTimeout(function () { hightLight(element) }, 100);
                }
            },
            {
                text: "後面", onclick: function () {
                    if (target == null) return;
                    var element = createElement();
                    if (target.nextSibling != null)
                        target.parentNode.insertBefore(element, target.nextSibling);
                    else target.parentNode.appendChild(element);
                    setTimeout(function () { hightLight(element) }, 100);
                }
            },
            {
                text: "裡面", onclick: function () {
                    if (target == null) target = content;
                    var element = createElement2();
                    target.appendChild(element);
                    setTimeout(function () { hightLight(element) }, 100);
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
                            ["100", "500", "900"].map(j => {
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