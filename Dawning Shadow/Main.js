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

// Create the table headers
$('#animalsTable').append('<tr id="header">');
shortenedAnimalKeys.forEach((key) => {
    $('#header').append(`<th> ${animalKeysHebrew[key]} </th>`);
})

// Create the table body
animals.forEach((animal) => {
    $('#animalsTable').append(`<tr id="${animal['id']}Row">`);
    shortenedAnimalKeys.forEach((key) => {
        $(`#${animal['id']}Row`).append(`<td name="${animal["id"]}"> ${animal[key]} </td>`);
        $(`td[name =${animal["id"]}]`).click(() => {
            // Set the name of the chosen animal 
            $('#chosenAnimalName').text(`${animal["name"]}`);
            // Add description of the chosen animal
            $('#chosenAnimalDescription').text(() => {
                let description = '';
                displayAnimalKeys.forEach((key) => {
                    description += `${animalKeysHebrew[key]}: ${animal[key]}, `;
                })
                return description.substring(0, description.length - 2) + '.';
            });
        });
    });
});


$("td").not('').hover(
    function() {
        let parent = $(this).closest('tr')
        parent.children().each(function() {
            $(this).addClass( "hovered" )
        })
    }, 
    function() {
        let parent = $(this).parent()
        parent.children().each(function() {
            $(this).removeClass( "hovered" )
        })
    }
  );