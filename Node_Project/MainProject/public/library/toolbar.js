(function () {
    var ToolBar = {
        getSingle: function (toolPath) {
            var tr = CreateDom("tr");
            var td = CreateDom("td", {}, tr);
            var i = CreateDom("i", { textContent: "Loading " + toolPath }, td);

            new Component(toolPath, function (component) {
                i.textContent = component.info.name;
                Drag.start(td, function () {
                    layoutbar.show();
                    return new DragData({}, component.build({}));
                }, layoutbar.hide, layoutbar.hide);
            });

            return tr;
        }
    }
    var toolbar = document.querySelector("#toolbar");
    var toollist = request("componentlist", function(info){
        var list = JSON.parse(info);
        for(var i in list){
            var single = ToolBar.getSingle(list[i]);
            toolbar.appendChild(single);
        }
    });

})();

