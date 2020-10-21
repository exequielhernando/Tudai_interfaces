 
  document.addEventListener("DOMContentLoaded", () => {
    let loader = document.querySelector(".loader-content");
    let content = document.querySelector("#content");
    
    loading();

    function loading() {
      setTimeout(function () {
        loader.classList.remove("loader-content");
        loader.classList.add("hide-load");
        content.classList.remove("hide-content");
        content.classList.add("animacion-ingreso");
      }, 3000);
    }
   
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
  });

