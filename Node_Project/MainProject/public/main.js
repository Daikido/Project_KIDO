var x = new Component("components/header", function () {
    document.querySelector(".line").appendChild(x.build({ text: "我是標題" }))
});
ShowLayoutBar();