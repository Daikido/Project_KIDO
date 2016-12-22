var x = new Component("components/header", function () {
    [...document.querySelectorAll(".line")].map((ele,i)=>{
        ele.appendChild(x.build({ text: "cute"+i }));
    });
});