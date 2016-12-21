var x = new Component("components/header", function () {
    $("#odd > div:nth-child(1) > div:nth-child(1)")[0].appendChild(x.build({ text: "我是標題" }))
    console.log("123");
});
