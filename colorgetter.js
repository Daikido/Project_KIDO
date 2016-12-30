var groups = [...document.querySelectorAll('.color-group')];
var result = groups.map(g => {
    try {
        return {
            name: g.querySelector('.name').textContent,
            colors: [...g.querySelectorAll('.color')].map(c => {
                return {
                    type: c.querySelector('.shade').textContent,
                    code: c.querySelector('.hex').textContent
                }
            })
        }
    } catch (e) {
        return 0;
    }
})


var obj = {};

for(var i in result){
    var c = result[i];
    if(c==0) break;
    c.name = c.name.toLowerCase();
    obj[c.name] = {};
    for(var j in c.colors){
        var cc = c.colors[j];
        obj[c.name][cc.type] = cc.code;
    }
}

JSON.stringify(obj);