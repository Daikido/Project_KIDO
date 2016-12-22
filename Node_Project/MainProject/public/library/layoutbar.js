var layoutbar = {

    show: function () {
        [...document.querySelectorAll(".row")].map(row => {
            CreateDom("div", { className: "layoutbar top" }, row, ele => {
                Drag.end(ele, function (data) {
                    var newRow = CreateDom("div", { className: "row" });
                    var newLine = CreateDom("div", { className: "line" }, newRow);
                    newLine.appendChild(data.element);
                    row.parentNode.insertBefore(newRow, row);
                });
            });
            CreateDom("div", { className: "layoutbar bottom" }, row, ele => {
                Drag.end(ele, function (data) {
                    var newRow = CreateDom("div", { className: "row" });
                    var newLine = CreateDom("div", { className: "line" }, newRow);
                    newLine.appendChild(data.element);
                    if (row.nextSibling != null)
                        row.parentNode.insertBefore(newRow, row.nextSibling);
                    else row.parentNode.appendChild(newRow);
                });
            });
        });
        [...document.querySelectorAll(".line")].map(line => {
            CreateDom("div", { className: "layoutbar left" }, line, ele => {
                Drag.end(ele, function (data) {
                    var newLine = CreateDom("div", { className: "line" });
                    newLine.appendChild(data.element);
                    line.parentNode.insertBefore(newLine, line);
                });
            });
            CreateDom("div", { className: "layoutbar right" }, line, ele => {
                Drag.end(ele, function (data) {
                    var newLine = CreateDom("div", { className: "line" });
                    newLine.appendChild(data.element);
                    if (line.nextSibling != null)
                        line.parentNode.insertBefore(newLine, line.nextSibling);
                    else line.parentNode.appendChild(newLine);
                });
            });
        });
    },
    hide: function () {
        [...document.querySelectorAll(".layoutbar")].map(bar => bar.remove());
    }
};