const modal = document.getElementById("modal");
const addBtn = document.querySelector(".add");
const cancelBtn = document.querySelector(".modal-cancel");
const startBtn = document.querySelector(".modal-start");

const mainStartBtn=document.querySelector('.start-button');
const mainPausetBtn=document.querySelector('.pause-button');
const mainResetBtn=document.querySelector('.reset-button');
const taskDone = document.querySelector('.js-focus-over');

const audio = document.querySelector('.js-audio-select');
const doneButton = document.querySelector('.js-task-done');
let playAudio = new Audio();

document.addEventListener("DOMContentLoaded", () => {
    addInput();
    // Safety check (prevents errors)
    if (!modal || !addBtn || !cancelBtn || !startBtn) {
      console.error("Modal elements not found!");
      return;
    }

    // Open modal
    addBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    // Close modal - Cancel
    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

  });



let timerId = null;
let pausedH = 0;
let pausedM= 0;
let pausedS = 0;
let isPaused = false;
let displayMsg = document.querySelector('.current-task');


startBtn.addEventListener('click',()=>{
  const modalBox=document.querySelector('.modal-content');
  const input = document.querySelector('.countdown-title');
  let currentTask=input.value;
  const { h, m, s }=getTime(modalBox);
  updateTime(h, m, s);
  modal.style.display = "none";
  displayMsg.classList.add('current-task-display');
  displayMsg.innerText=currentTask;
  input.value= '';
});

mainStartBtn.addEventListener('click',()=>{
  const main=document.querySelector('.main-timer');
  const input = document.querySelector('.tittle-input');
  let currentTask=input.value;
  const { h, m, s }=getTime(main);
  updateTime(h, m, s);
  displayMsg.classList.add('current-task-display');
  displayMsg.innerText=currentTask;
  input.value= '';
});


mainPausetBtn.addEventListener('click',()=>{
  if(!isPaused){
    clearInterval(timerId);
    isPaused=true;
    return;
  }
  isPaused=false;
  updateTime(pausedH,pausedM,pausedS)
})

mainResetBtn.addEventListener('click',()=>{
  updateTime(0,0,0)
})

function getTime(container) {
  return {
    h: Number(container.querySelector('.js-hours').value),
    m: Number(container.querySelector('.js-minutes').value),
    s: Number(container.querySelector('.js-seconds').value)
  };
}

  
function updateTime(h, m, s){

  pausedH = h;
  pausedM = m;
  pausedS = s;
  const displayHours = document.querySelector('.js-display-hours');
  const displayMinutes = document.querySelector('.js-display-minutes');
  const displaySeconds = document.querySelector('.js-display-seconds');

    updateDisplay(h, m, s, displayHours, displayMinutes, displaySeconds);

    clearInterval(timerId);

    timerId=setInterval(()=>{
      if(s>0){
        s--;
      }
      else if(m>0){
        m--;
        s=59;
      } else if(h>0){
        h--;
        m=59;
        s=59;
      } else {
        clearInterval(timerId);
        console.log('Timer over')
        playSelecetedAudio();
      }

  pausedH = h;
  pausedM = m;
  pausedS = s;
    updateDisplay(h, m, s, displayHours, displayMinutes, displaySeconds);
},1000);
}

function updateDisplay(h, m, s,displayHours,displayMinutes,displaySeconds){
    displayHours.innerText=twoDigit(h);
    displayMinutes.innerText=twoDigit(m);
    displaySeconds.innerText=twoDigit(s);
}

function twoDigit(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function playSelecetedAudio(){
  const selectedAudio = audio.value;

  if(!selectedAudio) return;

  playAudio.src = selectedAudio;
  playAudio.currentTime=0;
  taskDone.style.display='block';
  playAudio.loop=true;
  playAudio.play();
  const displayMsg = document.querySelector('.current-task');
  displayMsg.innerText = 'Job Done!!!'
  
}

doneButton.addEventListener('click',()=>{
  taskDone.style.display='none';
  playAudio.pause();        
  playAudio.currentTime = 0; 
  playAudio.loop = false;
})

function addInput() {
  // Modal input
  const modalInput = document.querySelector('.countdown-title');
  const mainInput = document.querySelector('.tittle-input'); // main clock input
  const displayMsg = document.querySelector('.current-task');

  if (!displayMsg) return;

  // Function to handle Enter
  function handleEnter(input) {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const currentTask = input.value.trim();
        if (currentTask === "") return;

        displayMsg.classList.add('current-task-display');
        displayMsg.innerText = currentTask;

        input.value = '';
      }
    });
  }

  if (modalInput) handleEnter(modalInput);
  if (mainInput) handleEnter(mainInput);
}




