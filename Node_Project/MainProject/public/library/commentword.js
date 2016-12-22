function BIGCOMMENTWORD(str) {
    var len = [5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 6, 6, 6, 5, 5, 5, 6, 6, 5, 6, 6, 6, 6, 6];
    var sta = [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 6, 6, 6, 5, 5, 5, 6, 6, 5, 6, 6, 6, 6];
    for(var i in sta){
        if(i>0)
        sta[i] = sta[i-1]+sta[i];
    }
    var map = [
        "█▀▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀▀ █▀▀█ █  █ ▀█▀    █ █ ▄▀ █    █▀▄▀█ █▄  █ █▀▀▀█ █▀▀█ █▀▀█ █▀▀█ █▀▀▀█ ▀▀█▀▀ █  █ █   █ █   █ ▀▄ ▄▀ █   █ █▀▀▀█ ",
        "█▄▄█ █▀▀▄ █    █  █ █▀▀▀ █▀▀▀ █ ▄▄ █▀▀█  █  ▄  █ █▀▄  █    █ █ █ █ █ █ █   █ █▄▄█ █  █ █▄▄▀ ▀▀▀▄▄   █   █  █  █ █  █ █ █   █   █▄▄▄█ ▄▄▄▀▀ ",
        "█  █ █▄▄█ █▄▄█ █▄▄▀ █▄▄▄ █    █▄▄█ █  █ ▄█▄ █▄▄█ █  █ █▄▄█ █   █ █  ▀█ █▄▄▄█ █    ▀▀█▄ █  █ █▄▄▄█   █   ▀▄▄▀  ▀▄▀  █▄▀▄█ ▄▀ ▀▄   █   █▄▄▄█ "
    ];
    str = str.toLowerCase();
    
    var strs = ["", "", ""];
    for(var i =0;i<3;i++){
        [...str].map(s=>{
            
            var n = s.charCodeAt(0)-97;
            var ss = map[i].substr(sta[n], len[n]);
            strs[i]+=ss;
        });
    }
    return strs.join('\r\n');
}