var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    app = express();

app.use(express.static(__dirname + "/public"));

app.listen(25565, function () {
    console.log("server running on 25565");
});

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

app.get('/componentlist', function(req, res){
    var directories = getDirectories("public/components");
    var components = [];
    for(var i in directories){
        var dir = "components/"+directories[i];
        if(fs.existsSync("public/"+dir+"/info.json")) 
        components.push(dir);
    }
    res.send(components);
});