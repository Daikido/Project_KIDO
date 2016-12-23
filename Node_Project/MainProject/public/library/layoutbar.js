var layoutbar = {
    show: function () {
        var target = document.querySelector("#odd");

        function dragIn(ele) { return function () { ele.classList.add("hover") } };
        function dragOut(ele) { return function () { ele.classList.remove("hover") } };
        [...target.querySelectorAll(".row")].map(row => {
            CreateDom("div", { className: "layoutbar top" }, row, ele => {
                Drag.end(ele, function (data) {
                    var newRow = CreateDom("div", { className: "row" },null, ele=>ele.setAttribute("layout", "200"));
                    var newLine = CreateDom("div", { className: "line" }, newRow);
                    newLine.appendChild(data.element);
                    row.parentNode.insertBefore(newRow, row);
                }, dragIn(ele), dragOut(ele));
            });
            CreateDom("div", { className: "layoutbar bottom" }, row, ele => {
                Drag.end(ele, function (data) {
                    var newRow = CreateDom("div", { className: "row" },null, ele=>ele.setAttribute("layout", "200"));
                    var newLine = CreateDom("div", { className: "line" }, newRow);
                    newLine.appendChild(data.element);
                    if (row.nextSibling != null)
                        row.parentNode.insertBefore(newRow, row.nextSibling);
                    else row.parentNode.appendChild(newRow);
                }, dragIn(ele), dragOut(ele));
            });
        });
        [...target.querySelectorAll(".line")].map(line => {
            CreateDom("div", { className: "layoutbar left" }, line, ele => {
                Drag.end(ele, function (data) {
                    var newLine = CreateDom("div", { className: "line" });
                    newLine.appendChild(data.element);
                    line.parentNode.insertBefore(newLine, line);
                }, dragIn(ele), dragOut(ele));
            });
            CreateDom("div", { className: "layoutbar right" }, line, ele => {
                Drag.end(ele, function (data) {
                    var newLine = CreateDom("div", { className: "line" });
                    newLine.appendChild(data.element);
                    if (line.nextSibling != null)
                        line.parentNode.insertBefore(newLine, line.nextSibling);
                    else line.parentNode.appendChild(newLine);
                }, dragIn(ele), dragOut(ele));
            });
        });
    },
    hide: function () {
        [...document.querySelectorAll(".layoutbar")].map(bar => bar.remove());
    }
};