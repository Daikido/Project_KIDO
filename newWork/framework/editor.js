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
        ele.style.boxShadow = "0 0 100px black, inset 0 0 10px white, 0 0 20px red,inset 0 0 2px red";
        ele.style.borderRadius = "10px";
    })
}
addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key == "e") {
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

    var content = createDom("div", {
        className: "row editor",
        innerHTML: document.body.innerHTML
    }, main, ele => ele.style.overflow = "hidden");

    var panel = createDom("div", {
        className: "row editor",

    }, main, ele => ele.setAttribute("layout", "200"));
    document.body.innerHTML = "";

    content.addEventListener("click", function (e) {
        console.log(e);
        if (e.srcElement.classList.contains("editor-heightlight")) clearSelection();
        else if (e.srcElement.classList.contains("editor"));
        else hightLight(e.srcElement);
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

    function setText(){
        var result = prompt("請輸入文字", selectedElement.textContent);
        if(result!=null) selectedElement.textContent = result;
    }



    createDom("div", { className: "line" }, panel, ele => {
        createDom("h1", { className: "wrap center", textContent: "關閉編輯" }, ele);
        ele.setAttribute("color", "green");
        ele.onclick = closeEditor
    });
    createDom("div", { className: "line" }, panel, ele => {
        createDom("h1", { className: "wrap center", textContent: "文字" }, ele);
        ele.setAttribute("color", "white");
        ele.onclick = setText
    });
    createDom("div", { className: "line" }, panel, ele => {
        createDom("h1", { className: "wrap center", textContent: "顏色" }, ele);
        ele.setAttribute("color", "yellow");
        ele.onclick = closeEditor
    });
    createDom("div", { className: "line" }, panel, ele => {
        createDom("h1", { className: "wrap center", textContent: "刪除" }, ele);
        ele.setAttribute("color", "red");
        ele.onclick = deleteSelected
    });
}