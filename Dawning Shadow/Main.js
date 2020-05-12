var intervalTimeFunctionID = null
var isClockOn = false

window.onload = () => {
    changeTime()
}

const changeTime = () => {
    var today = new Date()

    var hours = today.getHours()
    var minutes = today.getMinutes()
    var seconds = today.getSeconds()

    minutes = checkTime(minutes)
    seconds = checkTime(seconds)

    document.getElementById('clock').innerHTML = `<i class="far fa-clock" style="padding-left:5px"></i>` + hours + ":" + minutes + ":" + seconds 
}

const clockButtonClick = () => {
    if (isClockOn) {
        clearInterval(intervalTimeFunctionID)
        isClockOn = false
        document.getElementById('clockButton').innerHTML = "Turn ON"
        document.getElementById('clockButton').style.backgroundColor = "lightgreen";
    }
    else {
        intervalTimeFunctionID = setInterval(changeTime, 500)
        isClockOn = true
        document.getElementById('clockButton').innerHTML = "Turn OFF"
        document.getElementById('clockButton').style.backgroundColor = "lightcoral";
    }
}

const checkTime = (time) => {
    if (time < 10) {time = "0" + time}  // add zero in front of numbers < 10
    return time
}