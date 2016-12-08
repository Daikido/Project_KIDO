function CreateDom(tagname, modifiers, parent, callback){
    var element = document.createElement(tagname);
    if(modifiers instanceof Object) for(var i in modifiers) element[i] = modifiers[i];
    if(parent instanceof Node) parent.appendChild(element);
    if(callback instanceof Function) callback(element);
    return element;
}