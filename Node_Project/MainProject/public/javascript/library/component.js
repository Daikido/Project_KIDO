function request(path, callback) {
    var req = new XMLHttpRequest();
    req.open("get", path);
    req.onload = function () {
        callback(this.responseText);
    }
    req.send();
}

function Component(name) {
    var folder = "/components/" + name + "/";
    this.info = null;
    this.script = null;
    this.html = null;
    var me = this;

    function readyStateChanged(){
        if(me.info!=null&&me.script!=null&&me.html!=null){
            console.log(waitForReady);
            waitForReady.map(callback=>callback(me));
            waitForReady = [];
        }
    }
    var waitForReady = [];
    this.onload = function(callback){
        waitForReady.push(callback);
        if(this.info!=null&&this.script!=null&&this.html!=null){
            callback(this);
        }
    };

    request(folder + "info.json", function (info) {
        me.info = JSON.parse(info);
        readyStateChanged();
    });
    request(folder + "script.js", function (info) {
        me.script = new Function(info + "build(...arguments)");
        readyStateChanged();
    });
    request(folder + "index.html", function (info) {
        me.html = info;
        readyStateChanged();
    });

    this.build = function (setting) {
        return CreateDom("div",
            {
                className: "component",
                innerHTML: this.html
            }, null, ele => this.script(ele, setting));
    }

    this.panel = function (callback, setting) {
        var panel = CreateDom("div", { className: "component panel" });
        CreateDom("h1", {textContent:this.info.name}, panel);
        CreateDom("p", {textContent:this.info.description}, panel);
        var settingElement = {};
        for (var i in this.info.attribute) {
            var attr = this.info.attribute[i];
            var row = CreateDom("div", { className: "row" }, panel);

            CreateDom("label", { textContent: attr.name }, row);
            settingElement[attr.id] = CreateDom("input", { type: attr.type }, row);
            if(setting!=undefined) settingElement[attr.id].value = setting[attr.id];
        }
        var confirm = CreateDom("button", {textContent:"確認", name:"confirm"}, panel);
        confirm.onclick = function(){
            var result = {};
            for(var i in settingElement) result[i] = settingElement[i].value;
            callback(result);
        }
        return panel;
    }

    this.editable = function(){
        var table = CreateDom("div",{className:"component editable"});
        var content = CreateDom("div", {className:"content"}, table);
        var setting = undefined;

        function panelPage(){
            content.innerHTML = "";
            content.appendChild(me.panel(function(result){
                setting = result;
                buildPage()
            }, setting));
        }
        function buildPage(){
            content.innerHTML = "";
            content.appendChild(me.build(setting));
            CreateDom("button", {textContent:"編輯", name:"edit", onclick:function(){
                panelPage();
            }}, content);
        }
        panelPage();
        return table;
    }
}
