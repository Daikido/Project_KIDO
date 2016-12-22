(function () {
    function update() {
        [...document.querySelectorAll(".row")].map(row => {
            var lines = [...row.querySelectorAll(".line")];
            lines.map(line => {
                line.style.width = 100 / lines.length + "%";
            })
        })

    }
    setInterval(update, 30);
    update();
})();