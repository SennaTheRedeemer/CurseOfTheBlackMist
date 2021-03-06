let intervalID = null;
let isClockOn = false;
let selectedAnimalID = null;
let countToTrash = 0;

window.onload = () => {
    changeTime();
    fillCagesSelect();
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
const createTable = () => {
    $('#animalsTable').empty();
    // Create the table headers
    $('#animalsTable').append('<tr id="header">');
    shortenedAnimalKeys.forEach((key) => {
        $('#header').append(`<th> ${animalKeysHebrew[key]} </th>`);
    })
    $('#header').append(`<th></th>`);

    // Create the table body
    animals.forEach((animal) => {
        $('#animalsTable').append(`<tr id="${animal['id']}Row">`);
        shortenedAnimalKeys.forEach((key) => {
            $(`#${animal['id']}Row`).append(`<td name="${animal["id"]}"> ${animal[key]} </td>`);
            $(`td[name =${animal["id"]}]`).click(function() {

                // Color the selected row
                $("#animalsTable").find('*').removeClass('selectedRow')
                let parent = $(this).closest('tr');
                parent.children().each(function() {
                    $(this).addClass( "selectedRow" );
                })

                selectedAnimalID = animal["id"];
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
        $(`#${animal['id']}Row`).append(`<td id="trash${animal['id']}"><i class="far fa-trash-alt"></i></td>`);
        $( `#trash${animal['id']}`).click(function() {
            let parent = $(this).closest('tr');
            parent.toggleClass("strikeout");
            parent.toggleClass("toDelete");
            if($(parent).hasClass( "toDelete" )) {
                countToTrash++;
            }
            else {
                countToTrash--
            };
            checkTrashButton();
            parent.children().each(function() {
                $(this).toggleClass( "remove" );
            })
        })
    });
    $("td").hover(
        function() {
            let parent = $(this).closest('tr');
            parent.children().each(function() {
                $(this).addClass( "hovered" );
            })
        }, 
        function() {
            let parent = $(this).parent()
            parent.children().each(function() {
                $(this).removeClass( "hovered" );
            })
        }
    );
};

// Toggle trash button visability
const checkTrashButton = () => {
    if(countToTrash > 0) {
        $('#deleteAnimals').addClass( "show" );
        $('#deleteAnimals').removeClass( "hidden" );
    }
    else {
        $('#deleteAnimals').addClass( "hidden" );
        $('#deleteAnimals').removeClass( "show" );
    }
}

const fillCagesSelect = () => {
    cages.forEach((cage) => {
        let option = new Option(cage, cage);
        $(option).html(cage);
        $("#cage").append(option);
    })
}

const addAnimal = () => {
    let newAnimal = {};
    let newAnimalFields = $('#newAnimalForm').serializeArray();
    newAnimalFields.forEach((field) => {
        newAnimal[field.name] = field.value;
    });
    let takenIDs = animals.map(({ id }) => id); // filtrer 
    newAnimal.id = parseInt(newAnimal.id);
    if(animals.filter((animal) => {return animal.id === newAnimal.id}).length > 0) {
        alert("מזהה החיה הזה כבר משומש לחיה אחרת. אנא נסה שוב.");
    }
    else if (newAnimal.name == "") {
        alert("אנא מלא שם לחיה");
    }
    else if (newAnimal.legs < 0) {
        alert("מספר רגליים צריך להיות חיובי או 0");
    }
    else {
        animals.push(newAnimal);
        $("#animals").trigger( "click" );
    }
}

// Toggle animal section visability
$("#animals").click(function() {
    $('#animalsTable').empty();
    $("#animalsSection").addClass("show");
    $("#newAnimalSection").removeClass("show");
    countToTrash = 0;
    createTable();
    checkTrashButton();
})

$("#deleteAnimals").click(function() {
    $(".toDelete").each(function() {
       let deleteAnimalID = parseInt($(this).attr('id'));
       // If the selected detailed animal is to be deleted, empty details.
       if(deleteAnimalID == selectedAnimalID) {
            $('#chosenAnimalName').text("החיה הנבחרת:");
            $('#chosenAnimalDescription').text("תיאור החיה הנבחרת");
       }
       animals = animals.filter((animal) => {return animal.id != deleteAnimalID;});
    })
    createTable();
    countToTrash = 0;
    checkTrashButton();
});

$("#addAnimal").click( function() {
    $('#animalsTable').empty();
    $("#animalsSection").removeClass("show");
    $("#newAnimalSection").addClass("show");
    countToTrash = 0;
});

