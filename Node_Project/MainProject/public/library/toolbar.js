var ToolBar = {
    getSingle : function(toolPath){
        var tr = CreateDom("tr");
        var td = CreateDom("td",{},tr);
        var i = CreateDom("i", {textContent: "Loading "+toolPath}, td);
        
        new Component(toolPath, function(component){
            i.textContent = component.info.name;
            Drag.start(td, function(){
                return new DragData({}, component.build({}));
            });
        });

        return tr;
    }
}

