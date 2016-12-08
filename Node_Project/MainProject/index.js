var express = require('express'),
    app = express();

app.use(express.static(__dirname + "/public"));

app.listen(25565, function () {
    console.log("server running on 25565");
});