const selectMenu = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime,
  isAlarmSet = false,
  ringTone = new Audio("./assets/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  // getting hours,mins,secs
  let date = new Date();
  h = date.getHours();
  m = date.getMinutes();
  s = date.getSeconds();
  ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? (h = 12) : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringTone.play();
    ringTone.loop = true;
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringTone.pause();
    content.classList.remove("disabled");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  if (
    time.includes("hour") ||
    time.includes("minute") ||
    time.includes("am/pm")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disabled");
  setAlarmBtn.innerText = "Clear Alarm";
}
setAlarmBtn.addEventListener("click", setAlarm);
