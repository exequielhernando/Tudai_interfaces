 
  document.addEventListener("DOMContentLoaded", () => {
    let loader = document.querySelector(".loader-content");
    let content = document.querySelector("#content");
    let border1 = document.querySelector("#border1");
    let border2 = document.querySelector("#border2");
    let border3 = document.querySelector("#border3");
    let border4 = document.querySelector("#border4");
    let countdownNodo = document.querySelector(".simply-section");
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
//#region countdown
  const getRemainTime = deadline => {
    let now = new Date();
      remainTime = (new Date(deadline) - now + 1000 )/1000;
      remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
      remainMinutes = ('0' + Math.floor(remainTime /60 % 60)).slice(-2);
      remainHours = ('0' + Math.floor(remainTime /3600 % 24)).slice(-2);
      remainDays = Math.floor(remainTime / (3600 *24));
        
      return{
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays
      }
  }
  const countdown = deadline => {
    const timerUpdate = setInterval( () => {
      let time = getRemainTime(deadline);
      countdownNodo.innerHTML = `<span class="simply-amount">${time.remainDays} Days</span>
                                <span class="simply-amount">${time.remainHours} Hours  </span>
                                <span class="simply-amount">:${time.remainMinutes} Minutes</span>
                                <span class="simply-amount">:${time.remainSeconds} Seconds</span> `;

      if (time.remainTime <= 1) {
        clearInterval(timerUpdate);
        countdownNodo.innerHTML = `<h1 class="simply-word">La magia ha llegado</h1>`
      }
    }, 1000 )
  }
  let deadline = new Date("Oct 24, 2020 16:58:25 GMT-0300");
  countdown(deadline);

//#endregion
    openNav.addEventListener("click", open);
    closeNav.addEventListener("click", close);
  });

