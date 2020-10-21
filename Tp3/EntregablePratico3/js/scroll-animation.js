let border1 = document.querySelector("#border1");
    let border2 = document.querySelector("#border2");
    let border3 = document.querySelector("#border3");
    let border4 = document.querySelector("#border4");

window.addEventListener("scroll", () =>{
    let valueY = window.scrollY;
    border1.style.left = valueY * 0.5 + 'px';
    border1.style.top = valueY * 0.8 + 'px';
  
    border2.style.left = -valueY + 1320 + 'px';
    border2.style.top = -valueY + 840 + 'px';
        
    border3.style.left = -valueY  + 1600 + 'px';
    border3.style.top = (valueY - 1000 ) * 0.8 + 'px';
  
    border4.style.left = -valueY + 2100 + 'px';
    border4.style.top = -valueY + 1680 + 'px';
});
  