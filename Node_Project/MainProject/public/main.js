new Component("header").onload(function (component) {
    document.body.appendChild(component.editable());
});

new Component("text").onload(function (component) {
    document.body.appendChild(component.editable());
});

new Component("time").onload(function (component) {
    document.body.appendChild(component.editable());
});

var a = document.querySelector("#btn_a");
var b = document.querySelector("#btn_b");
var c = document.querySelector("#btn_c");

Drag.start(a, function () {
    a.textContent = "被抓走了";
    return new DragData("按鈕 a 的資料", "按鈕 a")
},function(){
    a.textContent = "按鈕a 耶~";
},function(){
    a.textContent = "按鈕a 掉了";
});

Drag.start(b, function () {
    b.textContent = "被抓走了";
    return new DragData("按鈕 b 的資料", "按鈕 b")
},function(){
    b.textContent = "按鈕b 耶~";
},function(){
    b.textContent = "按鈕b 掉了";
});

Drag.end(c, function (data) {
    c.textContent = data.data;
    c.style.backgroundColor="";
}, function (data) {
    c.style.backgroundColor="lightGreen";
}, function (data) {
    c.style.backgroundColor="";
});