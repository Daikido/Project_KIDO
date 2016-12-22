function ShowLayoutBar(){
    [...document.querySelectorAll(".row")].map(row=>{
        row.appendChild(CreateDom("div", {className:"layoutbar top"}));
        row.appendChild(CreateDom("div", {className:"layoutbar bottom"}));
    });
    [...document.querySelectorAll(".line")].map(line=>{
        line.appendChild(CreateDom("div", {className:"layoutbar left"}));
        line.appendChild(CreateDom("div", {className:"layoutbar right"}));
    });
}

function HideLayoutBar(){
    [...document.querySelectorAll(".layoutbar")].map(bar=>bar.remove());
}