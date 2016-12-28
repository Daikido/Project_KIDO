(function () {
    function getOffsetSize(element) {
        var style = getComputedStyle(element);
        return {
            width:
            parseInt(style.marginLeft) + parseInt(style.marginRight) +
            parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth) +
            parseInt(style.paddingLeft) + parseInt(style.paddingRight),
            height:
            parseInt(style.marginTop) + parseInt(style.marginBottom) +
            parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth) +
            parseInt(style.paddingTop) + parseInt(style.paddingBottom)
        }
    }

    function ratioCalculate(max, guide) {
        guide = guide.map(g => {
            if (g == null) return { type: "ratio", value: 1 };
            else if (g[0] == '*') return { type: "ratio", value: +g.substr(1) };
            else return { type: "real", value: +g };
        });
        var sum = guide.filter(x => x.type == "real").reduce((a, b) => a + b.value, 0);
        var sumr = guide.filter(x => x.type == "ratio").reduce((a, b) => a + b.value, 0);

        if (sum <= max && sumr > 0) {
            var remain = max - sum;
            var result = guide.map(g => g.type == "ratio" ? Math.round(remain * g.value / sumr) : g.value);
            var sum = result.reduce((a, b) => a + b, 0);
            result[result.length - 1] -= sum - max;
            return result;
        }
        return guide.map(g => (g.type == "ratio" ? 0 : g.value));
    }

    function layout(type, ele, width, height, master) {
        if (!master) {
            var offset = getOffsetSize(ele);
            height -= offset.height;
            width -= offset.width;
            ele.style.width = width + "px";
            ele.style.height = height + "px";
        }

        var eles = Array.from(ele.querySelectorAll(":scope>." + { row: "line", line: "row" }[type]));
        var layoutguide = ratioCalculate({ row: width, line: height }[type],
            eles.map(l => l.attributes.layout != undefined ? l.attributes.layout.value : '*1'));
        eles.map((ele, i) => {
            layout({ row: "line", line: "row" }[type], ele,
                type == "row" ? layoutguide[i] : width,
                type == "line" ? layoutguide[i] : height);
        })
    }

    function update(info) {
        Array.from(document.querySelectorAll(".container")).map((ele, i, arr) => {
            var rect = ele.getBoundingClientRect();
            layout("line", ele, rect.width, rect.height, true);
        });
        Array.from(document.querySelectorAll("[layer]")).map(ele=>ele.style.zIndex = ele.attributes.layer);
    }

    var mo = new MutationObserver(function (records) {
        mo.disconnect();
        update();
        mo.observe(document, config);
    });

    var config = { childList: true, subtree: true, attributes: true };

    addEventListener("resize", function () {
        document.body.style.overflow = "hidden";
        update();
        document.body.style.overflow = "auto";
        update();
    });

    setTimeout(function () {
        update();
    }, 0);

    mo.observe(document, config);
})();