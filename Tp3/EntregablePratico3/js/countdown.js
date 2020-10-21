//#region countdown
let countdownNodo = document.querySelector(".simply-section");

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