(function () {
    function getOffsetSize(element) {
        var style = getComputedStyle(element);
        return {
            width:
            parseInt(style.marginLeft) +
            parseInt(style.marginRight) +
            parseInt(style.borderLeftWidth) +
            parseInt(style.borderRightWidth) +
            parseInt(style.paddingLeft) +
            parseInt(style.paddingRight),
            height:
            parseInt(style.marginTop) +
            parseInt(style.marginBottom) +
            parseInt(style.borderTopWidth) +
            parseInt(style.borderBottomWidth) +
            parseInt(style.paddingTop) +
            parseInt(style.paddingBottom)
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
    function layoutRow(row, width, height, master) {
        if(!master){
            var offset = getOffsetSize(row);
            height-=offset.height;
            width-=offset.width;
            row.style.width = width+"px";
            row.style.height = height+"px";  
        }
        
        var lines = Array.from(row.querySelectorAll(":scope>.line"));
        var layoutguide = ratioCalculate(width,
            lines.map(l => l.attributes.layout != undefined ? l.attributes.layout.value : '*1'));
        lines.map((line, i) => {
            layoutLine(line, layoutguide[i], height);
        })
    }
    function layoutLine(row, width, height, master) {
        if(!master){
            var offset = getOffsetSize(row);
            height-=offset.height;
            width-=offset.width;
            row.style.width = width+"px";
            row.style.height = height+"px";            
        }
        
        var lines = Array.from(row.querySelectorAll(":scope>.row"));
        var layoutguide = ratioCalculate(height,
            lines.map(l => l.attributes.layout != undefined ? l.attributes.layout.value : '*1'));
        lines.map((line, i) => {
            layoutRow(line, width, layoutguide[i]);
        });
    }

    function update(info) {
        Array.from(document.querySelectorAll(".container")).map((ele, i, arr) => {
            ele.style.zIndex = arr.length - i;
            var rect = ele.getBoundingClientRect();
            layoutLine(ele, rect.width, rect.height, true);
        });
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
    window.update = update;
})();