(function () {
    function update() {
        [...document.querySelectorAll(".row")].map(row => {
            var lines = [...row.querySelectorAll(".line")];
            lines.map(line => {
                line.style.width = 100 / lines.length + "%";
            })
        })

    }
    var layoutstarted = false;
    var mo = new MutationObserver(function(records){
        if(layoutstarted) return;
        layoutstarted = true;
        update();
        layoutstarted = false;
    });
    mo.observe(document, {childList: true, subtree:true});
    update();
})();