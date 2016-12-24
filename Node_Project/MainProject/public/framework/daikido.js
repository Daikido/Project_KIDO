(function () {
    function ratioCalculate(max, guide) {
        guide = guide.map(g => {
            if (g == null) return { type: "ratio", value: 1 };
            else if (g[0] == '*') return { type: "ratio", value: +g.substr(1) };
            else return { type: "real", value: +g };
        });
        var sum = guide.filter(x => x.type == "real").reduce((a, b) => a + b.value, 0);
        var sumr = guide.filter(x => x.type == "ratio").reduce((a, b) => a + b.value, 0);
        
        if (sum <= max) {
            var remain = max - sum;
            var result = guide.map(g => g.type == "ratio" ? Math.round(remain * g.value / sumr) : g.value);
            var sum = result.reduce((a,b)=>a+b,0);
            result[result.length-1]-=sum-max;

            return result;
        } 
        return guide.map(g => (g.type == "ratio" ? 0 : g.value));
    }
    function layoutRow(row, width, height){
        var lines = [...row.querySelectorAll(":scope>.line")];
        var layoutguide = ratioCalculate(width,
            lines.map(l => l.attributes.layout != undefined ?l.attributes.layout.value :'*1'));
        lines.map((line, i) => {
            line.style.width = layoutguide[i].toString() + "px";
            layoutLine(line, layoutguide[i], height);
        })
    }
    function layoutLine(row, width, height){
        var lines = [...row.querySelectorAll(":scope>.row")];
        var layoutguide = ratioCalculate(height,
            lines.map(l => l.attributes.layout != undefined ?l.attributes.layout.value :'*1'));
        lines.map((line, i) => {
            line.style.height = layoutguide[i].toString() + "px";
            layoutRow(line,width, layoutguide[i]);
        })
    }

    function update(info) {
        [...document.querySelectorAll(".layer")].map((ele, i, arr)=>{
            ele.style.zIndex = arr.length-i;
            layoutLine(ele, ele.getBoundingClientRect().width, ele.getBoundingClientRect().height);
        });
    }

    var layoutstarted = false;
    var mo = new MutationObserver(function (records) {
        if (layoutstarted) return;
        layoutstarted = true;
        update();
        layoutstarted = false;
    });
    mo.observe(document, { childList: true, subtree: true });
    addEventListener("resize", function(){
        setTimeout(function() {
            update();
        }, 5000);
    });
    update();
})();