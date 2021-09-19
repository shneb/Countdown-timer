const timePicker = document.querySelector(".timePicker");

const hr = document.querySelector(".timePicker .hour .hr");
const min = document.querySelector(".timePicker .minute .min");

const hr_up = document.querySelector(".timePicker .hour .hr-up");
const hr_down = document.querySelector(".timePicker .hour .hr-down");


const min_up = document.querySelector(".timePicker .minute .min-up");
const min_down = document.querySelector(".timePicker .minute .min-down");


let hour = 0;
let minute = 0;

hr_up.addEventListener("click", hour_up);
hr_down.addEventListener("click", hour_down);

min_up.addEventListener("click", minute_up);
min_down.addEventListener("click", minute_down);

min.addEventListener("change", minuteChange);
hr.addEventListener("change", hourChange);

function hourChange(e){
    if(e.target.value >23){
        e.target.value = 23;
    } else if(e.target.value = ""){
        e.target.value="00";
    }

    if(e.target.value == ""){
        e.target.value = formatTime(hour);
    }
    hour = e.target.value;
}

function minuteChange(e){
    if(e.target.value > 59){
        e.target.value = 59;
    } else if(e.target.value <0){
        e.target.value="00";
    }

    if(e.target.value == ""){
        e.target.value = formatTime(minute);
    }
    minute = e.target.value;
}

function hour_up(){
    hour++;
    if(hour>23){
        hour = 0;
    }
    setTime();
}
function hour_down(){
    hour--;
    if(hour<0){
        hour = 23;
    }
    setTime();
}
function minute_up(){
    minute++;
    if(minute>59){
        minute = 0;
        hour++;
    }
    setTime();
}
function minute_down(){
    minute--;
    if(minute<0){
        minute = 59;
        minute--;
    }
    setTime();
}
function setTime(){
    hr.value = formatTime(hour);
    min.value = formatTime(minute);
    timePicker.dataset.time = formatTime(hour) + ':' + formatTime(minute);
}
function formatTime(time){
    if(time<10){
        time='0' + time;
     }
     return time;
}