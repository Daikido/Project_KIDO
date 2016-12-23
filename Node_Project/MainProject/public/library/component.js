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
            me.setting != null) onready(me);
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
                setting: setting,
            }, null, ele => {
                this.script(ele, setting);
                var placeholder = CreateDom("div", { className: "component blank" });

                //█▀▀▄ █▀▀█ █▀▀█ █▀▀█ 
                //█  █ █▄▄▀ █▄▄█ █ ▄▄ 
                //█▄▄▀ █  █ █  █ █▄▄█
                Drag.start(ele, function () {  // on drag
                    layoutbar.show();
                    ele.parentNode.insertBefore(placeholder, ele);
                    ele.remove();
                    return new DragData(ele.setting, ele);
                }, function () {  // success
                    layoutbar.hide();

                    if (
                        [...placeholder.parentNode.parentNode.childNodes]
                            .filter(n => n.nodeName!="#text").length <= 1)
                        placeholder.parentNode.parentNode.remove();

                    if ([...placeholder.parentNode.childNodes]
                        .filter(n => n.nodeName!="#text").length <= 1)
                        placeholder.parentNode.remove();

                    placeholder.remove();
                }, function () {  // failed
                    layoutbar.hide();
                    placeholder.parentNode.insertBefore(ele, placeholder);
                    placeholder.remove();
                })
            });
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
