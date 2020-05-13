let intervalID = null;
let isClockOn = false;

window.onload = () => {
    changeTime();
}

const changeTime = () => {
    const today = new Date();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    minutes = padZeros(minutes);
    seconds = padZeros(seconds);

    document.getElementById('clock').innerHTML = `<i class="far fa-clock" style="padding-left:5px"></i> ${hours}:${minutes}:${seconds}`;
}

const clockButtonClick = () => {
    if (isClockOn) {
        clearInterval(intervalID);
        isClockOn = false;
        document.getElementById('clockButton').innerHTML = "Turn ON";
        document.getElementById('clockButton').style.backgroundColor = "lightgreen";
    }
    else {
        changeTime()
        intervalID = setInterval(changeTime, 1000);
        isClockOn = true;
        document.getElementById('clockButton').innerHTML = "Turn OFF";
        document.getElementById('clockButton').style.backgroundColor = "lightcoral";
    }
}

const padZeros = (time) => {
    if (time < 10) {time = "0" + time;}  // add zero in front of numbers < 10
    return time;
}