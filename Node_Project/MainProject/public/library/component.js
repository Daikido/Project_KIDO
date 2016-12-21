function request(path, callback) {
    var req = new XMLHttpRequest();
    req.open("get", path);
    req.onload = function () {
        callback(this.responseText);
    }
    req.send();
}

function Component(folder, onready) {
    this.folder = folder;
    this.info = null;
    this.script = null;
    this.html = null;
    this.setting = null;
    var me = this;
    function readyStateChanged() {
        if (me.info != null &&
            me.script != null &&
            me.html != null &&
            me.setting != null) onready();
    }

    request(folder + "/info.json", function (info) {
        me.info = JSON.parse(info);
        readyStateChanged();
    });
    request(folder + "/script.js", function (info) {
        me.script = new Function(info + "build(...arguments)");
        readyStateChanged();
    });
    request(folder + "/index.html", function (info) {
        me.html = info;
        readyStateChanged();
    });
    request(folder + "/setting.html", function (info) {
        me.setting = info;
        readyStateChanged();
    });


    this.build = function (setting) {
        return CreateDom("div",
            {
                className: "component",
                innerHTML: this.html,
                object: this,
            }, null, ele => this.script(ele, setting));
    }

    this.panel = function (callback, setting) {
        return CreateDom("div",
            {
                className: "component",
                innerHTML: this.setting,
                object: this,
            }, null);
    }
}
