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
            return guide.map(g => g.type == "ratio" ? Math.floor(remain * g.value / sumr) : g.value);
        } return guide.map(g => (g.type == "ratio" ? 0 : g.value));
    }
    function layoutRow(row, max){
        var lines = [...row.querySelectorAll(":scope>.line")];
        var layoutguide = ratioCalculate(max,
            lines.map(l => l.attributes.layout != undefined ?l.attributes.layout.value :'*1'));
        lines.map((line, i) => {
            line.style.width = layoutguide[i].toString() + "px";
            layoutLine(line, row.getBoundingClientRect().height);
        })
    }
    function layoutLine(row, max){
        var lines = [...row.querySelectorAll(":scope>.row")];
        var layoutguide = ratioCalculate(max,
            lines.map(l => l.attributes.layout != undefined ?l.attributes.layout.value :'*1'));
        lines.map((line, i) => {
            line.style.height = layoutguide[i].toString() + "px";
            layoutRow(line, row.getBoundingClientRect().width);
        })
    }

    function update() {
        [...document.querySelectorAll(".layer")].map(ele=>layoutLine(ele, ele.getBoundingClientRect().height));
    }

    var layoutstarted = false;
    var mo = new MutationObserver(function (records) {
        if (layoutstarted) return;
        layoutstarted = true;
        update();
        layoutstarted = false;
    });
    mo.observe(document, { childList: true, subtree: true });
    addEventListener("resize", update);
    update();
})();