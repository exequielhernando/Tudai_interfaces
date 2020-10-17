let openNav = document.querySelector("#openNav");
let closeNav = document.querySelector("#closeNav");

const open = () =>{
    document.getElementById("mySidenav").style.width = "100%";
}
/* Close when someone clicks on the "x" symbol inside the overlay */
const  close = () => {
    document.getElementById("mySidenav").style.width = "0%";
}

openNav.addEventListener("click", open);
closeNav.addEventListener("click", close);