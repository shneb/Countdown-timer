//declare const
const eventMonth = document.getElementById("eventMonth");
const eventYear = document.getElementById("eventYear");
const eventDay = document.getElementById("eventDay");
const eventHr = document.getElementById("hr");
const eventMin = document.getElementById("min");
const secondOutPut= document.querySelector(".secondRes");
const eventNameDis = document.getElementById("eventNameDis");
//declare variables
let eventName = document.querySelector("#eventName");
let dayOutPut = document.querySelector(".dayRes");
let hourOutPut= document.querySelector(".hourRes");
let minuteOutPut= document.querySelector(".minuteRes");
let dateInput ="";

// on load an event will check if the storage has been defined previously
window.addEventListener("load", () => {
	if(localStorage.getItem("eventName") == null || 
	localStorage.getItem("eventDate") == null){
		defaultSettings();
	} else{
		eventNameDis.innerHTML = localStorage.getItem("eventName");
		dateInput = localStorage.getItem("eventDate");
		countdownDisplay();
	}
});

// declare functions
dateGenerator();
goodSynced();

// event Listeners
document.getElementById("startBtn").addEventListener("click", submit);
document.getElementById("editBtn").addEventListener("click", defaultSettings);

const start = () => {
	setTimeout(function() {
		confetti.start()
	}, 1000); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
};

//  for stopping the confetti 

const stop = () => {
	setTimeout(function() {
		confetti.stop()
	}, 5000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
};


function timeEnd(){

}


function submit(){
	
	if(dateCheck() == true && nameCheck() == true ){
		dateInput = eventMonth.value +" "+ eventDay.value + " " + "," +eventYear.value + " " + eventHr.value + ":" + eventMin.value + ":00";
		countdownDisplay();
		saveSession();
		eventNameDis.innerHTML = eventName.value;
		
	}else if(dateCheck() == false && nameCheck() == false){
		document.getElementById("eventNameError").style.display = "block";
		document.getElementById("eventDateError").style.display = "block";
	}else if(dateCheck() == false){
		document.getElementById("eventDateError").style.display = "block";
	}else if(nameCheck() == false){
		document.getElementById("eventNameError").style.display = "block";
	}
}


function countdownDisplay(){
	if(count <= now){
		start();
		stop();
	}else{

	}
	
	setInterval(countdown, 1000);
	document.getElementById("eventForm").style.display = "none";
	document.getElementById("comingSoon").style.display = "";
	document.getElementById("editBtn").style.display = "";

}

document.getElementById("eventName").addEventListener("change",function gg() {console.log(eventName.value);});

function countdown () {

	const countDate = new Date(dateInput).getTime();
	
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second *60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day)/ hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    dayOutPut.innerHTML = textDay;
    hourOutPut.innerHTML = textHour;
    minuteOutPut.innerHTML = textMinute;
    secondOutPut.innerHTML = textSecond;
} 

function nameCheck(){
	if(eventName.value == ""){
		return false;
	}else{
		return true;
	}
}

function dateCheck() {
	
	const eventMonth = $.trim($("#eventMonth").children("option:selected").text());
	const eventYear = document.getElementById("eventYear").value;
	const eventDay = document.getElementById("eventDay").value;

	const today = new Date();
	let expiryDate = new Date();

	expiryDate.setFullYear(eventYear, eventMonth-1, eventDay);

	if (expiryDate < today || eventDay == "" || eventDay > 31) {
		return false;
	} else {

		return true;
	}
}

// save info into the local storage
function saveSession(){
	localStorage.setItem("eventName", eventName.value);
	localStorage.setItem("eventDate", dateInput);
}

function defaultSettings(){
	document.getElementById("eventForm").style.display = "";
	document.getElementById("comingSoon").style.display = "none";
	document.getElementById("editBtn").style.display = "none";

}

function dateGenerator() {
	const months = ["","Jan", "Feb", "Mar", "Apr", "May", "jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

	let yearOption = "";
	let monthOption ="";
	let years;

	let d = new Date();
	let currentDate = d.getFullYear();
	// this loop to generate years
	for (let i = 1; i <= 30; i++) {
		years = ((currentDate - 1) + i);
		yearOption += ("<option" + " value=" + "'" + years + "'" + ">" + years + "</option>");
		document.getElementById("eventYear").innerHTML = yearOption;
	}
	// this loop to generate months
	for (let i =1; i <= 12; i++) {
		monthOption += ("<option" + " value=" + "'" + months[i] + "'"  +">" + n(i) + "</option>");
		document.getElementById("eventMonth").innerHTML = monthOption;
	}
}

function goodSynced(){
	
	const now = new Date().getHours();
	if( now > 5 && now < 12){
		document.getElementById("goodDay").innerHTML += " morning!";
	}else if (now >= 12 && now < 18){
		document.getElementById("goodDay").innerHTML += " Afternoon!";
	}else if (now >= 18 && now < 22){
		document.getElementById("goodDay").innerHTML += " evening!";
	}else{
		document.getElementById("goodDay").innerHTML += " Night!";

	}
}
// this function is to make sure the months are 2 digits
function n(n) {
	return n > 9 ? "" + n : "0" + n;
}

// emoji
$(document).ready(function()
{
    $(".eventName").emojioneArea({
        pickerPosition: "bottom",
        tones: false
    });
}
);