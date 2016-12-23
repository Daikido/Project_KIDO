function DragHandler() {
    var floating = CreateDom("div", { className: "floating hide" }, document.body);
    var floating_text = CreateDom("p", {}, floating);

    this.dragging = false;
    var me = this;

    addEventListener("mouseup", function (event) {
        if (me.dragging) {
            if (me.onfailed instanceof Function) me.onfailed();
            me.dragging = false;
            me.dragging = null;
            me.onsuccess = null;
            me.onfailed = null;
        }
        floating.className = "floating hide";
    });

    addEventListener("mousemove", function (event) {
        if (me.dragging) {
            floating.className = "floating show";
            floating.style.left = event.clientX + "px";
            floating.style.top = event.clientY + "px";
        }
    });

    this.start = function (element, ondrag, onsuccess, onfailed) {
        element.addEventListener("mousedown", function (event) {
            event.preventDefault();
            me.dragging = ondrag();
            floating.innerHTML = "";
            floating.appendChild(me.dragging.element);
            //floating_text.textContent = me.dragging.info;
            me.onsuccess = onsuccess;
            me.onfailed = onfailed;

            floating.className = "floating show";
            floating.style.left = event.clientX + "px";
            floating.style.top = event.clientY + "px";
        });
    }

    this.end = function (element, ondrop, onin, onout) {
        element.addEventListener("mouseup", function (event) {
            if (me.dragging) {
                ondrop(me.dragging)
                if (me.onsuccess instanceof Function) me.onsuccess();
                me.dragging = null;
            }
        });

        element.addEventListener("mouseenter", function (event) {
            if (me.dragging) if (onin instanceof Function) onin(me.dragging);
        });

        element.addEventListener("mouseout", function (event) {
            if (me.dragging) if (onin instanceof Function) onout(me.dragging);
        });
    }
}

function DragData(data, element) {
    this.data = data;
    this.element = element;
}

var Drag = new DragHandler();