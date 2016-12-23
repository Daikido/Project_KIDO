(function () {

    function ratioCalculate(max, guide) {
        var sum = 0;
        var sumr = 0;

        guide.map(g => {
            if (g == null) g = '*1';
            if (g[0] == '*') sumr += +g.substr(1);
            else sum += +g;
        });

        if (sum <= max) {
            var remain = max - sum;
            return guide.map(g => g[0] == '*' ? remain * (+g.substr(1)) / sumr : (+g));
        } return guide.map(g => g[0] == '*' ? 0 : (max * (+g) / sum));
    }


    function update() {

        [...document.querySelectorAll(".row")].map(row => {
            var lines = [...row.querySelectorAll(":scope>.line")];
            var layoutguide = ratioCalculate(row.getBoundingClientRect().width,
                lines.map(l => l.attributes.layout != undefined ?l.attributes.layout.value :'*1'));
            lines.map((line, i) => {
                line.style.width = layoutguide[i].toString() + "px";
            })
        });

        [...document.querySelectorAll(".line"),...document.querySelectorAll(".container")].map(row => {
            var lines = [...row.querySelectorAll(":scope>.row")];
            var layoutguide = ratioCalculate(row.getBoundingClientRect().height,
                lines.map(l => l.attributes.layout != undefined ?l.attributes.layout.value :'*1'));
            lines.map((line, i) => {
                line.style.height = layoutguide[i].toString() + "px";
            })
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
    addEventListener("resize", update);
    update();
})();