let currentCard;
let count = 0;
let timeCount = 0;
let entered_before = false;



// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
//  this code if for the timer


var minutesLabel = document.getElementById("timer");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer;

//start the timer and game
$("#start_game-btn").click(function () {
    timer = setInterval(setTime, 1000);
    $("#popup_container").css("display", "none");
});



function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
// This code handle getting words from local json file and chose from them randomly according to the wanted lessons and units.
function loadJson(url) {
    var json;
    $.ajax({
        url: url,
        async: false,
        dataType: "json",
        success: function (response) {
            json = response;
        },
    });
    return json;
}

function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

//for game of matching audio to hebrew words
let game_type = getParam('media');
if (game_type === "audio") {
    $('.instructions').text('התאימו את ההקלטות בערבית לפירוש העברי ');
}

function filterWordsByLesson(Words, lesson) {
    if (lesson) {
        return Words.filter((word) => word.lesson == lesson);
    } else {
        return Words;
    }
}

function filterWordsByUnits(Words, Units) {

    if (Units) {
        var units_array_str = Units.split(',');
        var units_array_int = [];

        for (elem in units_array_str) {
            units_array_int.push(parseInt(units_array_str[elem]));
        }

        return Words.filter((word) => units_array_int.includes(word.unit));
    } else {
        return Words;
    }
}

function filtereWords(Words, units_array) {
    let filteringWords = []
    let tmp = []

    for (let i = 0; i < units_array.length; i += 2) {
        tmp = filterWordsByLesson(Words, units_array[i]);
        tmp = filterWordsByUnits(tmp, units_array[i + 1]);
        let merged = filteringWords.concat(tmp);
        filteringWords = merged;
    }

    return filteringWords;
}

function lesson_parser(Words, lessons) {
    if (lessons) {
        let lessons_array = lessons.split('$');
        let units_array = [];
        let curr = [];

        for (let i = 0; i < (lessons_array.length); i++) {
            if (lessons_array[i] != '') {
                curr = lessons_array[i].split(":");
                units_array.push(curr[0]);
                units_array.push(curr[1]);
            }
        }

        return filtereWords(Words, units_array);
    } else {
        return Words;
    }
}

function getRandomWords(number, Words) {
    return Words
        .map((x) => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((a) => a.x)
        .slice(0, number);
}

var allwords = loadJson("custom.json");
var gameId = getParam("id");
let filteredWords;

if (!(gameId in allwords)) {
    console.log("משחק לא קיים!");
} else {
    filteredWords = allwords[gameId];
    // console.log(filterWords);
}


// var filteredWords = getRandomWords(
//   8,
//   lesson_parser(allwords, lesson)
// );

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

//pick random indexes:
function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//we use 3 arrays to pick the cards randomly
var array_of_random_indexes = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
var array_of_data = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
var words_array = [];
var audio_array = []

$.each(filteredWords, function (i, word) {
    words_array.push(word["sideA"]);
    words_array.push(word["sideB"]);

});


$.each(words_array, function (i, word) {
    var d1 = document.getElementById("cards-container")
    let counter1 = -1;
    let audio_counter = -1;
    let lang = "";
    let curr_audio;
    let style_font_size = ""

    for (const element of array_of_random_indexes) {
        counter1++;
        if ((counter1 % 2) == 1) {
            audio_counter++;
            curr_audio = audio_array[audio_counter];
        }
        if (element == i) {
            if (words_array[counter1].length > 26) {
                style_font_size = "style=\"font-size: 20px; \" "
            } else if (words_array[counter1].length > 18) {
                style_font_size = "style=\"font-size: 22px;\" "
            } else {
                style_font_size = "style=\"font-size: 25px;\" "
            }
            if ((counter1 % 2) == 1) {
                lang = "arabic";
                if (game_type === "audio") {
                    d1.insertAdjacentHTML("beforeend",
                        "<div class=" + "\"card match-" + array_of_data[counter1] + "\"" + "data-match=" + array_of_data[counter1] + " data-group=" + "\"" + lang + "\"" +
                        " data-audio=" + curr_audio + "> <img src=\"images/audio_icon.png\" width=\"60\" alt=\"play audio\" />  </div>"
                    );

                } else {
                    d1.insertAdjacentHTML("beforeend",
                        "<div " + style_font_size + "class=" + "\"card match-" + array_of_data[counter1] + "\"" + "data-match=" + array_of_data[counter1] + " data-group=" + "\"" + lang + "\"" +
                        " data-audio=" + curr_audio + "> " + words_array[counter1] + "</div>"
                    );
                }

            } else {
                lang = "hebrew";
                d1.insertAdjacentHTML("beforeend",
                    "<div " + style_font_size + "class=" + "\"card match-" + array_of_data[counter1] + "\"" + "data-match=" + array_of_data[counter1] + " data-group=" + "\"" + lang + "\"" + ">" + words_array[counter1] + "</div>"
                );
            }
        }
    }

    counter1 = -1;
});

////////////////////////////////////////////////////////////////////////////////////////////////


// code of the game:
$(".card").each(function (index, card) {
    $(card).on("click", function (e) {
        if (game_type === "audio") {
            if ($(this).data("group") == "arabic") {
                let audio1 = $(this).data("audio");
                let audio2 = new Audio(audio1);
                audio2.play();
            }
        }

        if (currentCard) { // if current card is the past card and "this" is the current card
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                card.style.pointerEvents = 'none';
            });


            if ($(this).data("match") === currentCard.data("match") && $(this).data("group") === currentCard.data("group")) {
                // if we picked the same card twice
                $(this).css("outline", "2px solid orange");
                $(this).css("background", "#F7CD7C");
                currentCard = undefined;
                $(this).css("background", "white");
                $(this).css("outline", "white");
                cards.forEach(card => {
                    card.style.pointerEvents = 'auto';
                });

            } else if ($(this).data("match") === currentCard.data("match")) {
                // if we picked the right card
                let match = $(".match-" + $(this).data("match"));
                match.css("outline", "2px solid green").css("background", "lightgreen");
                count++;

                setTimeout(function () {
                    match.css("visibility", "hidden");
                    currentCard = undefined;

                    if (count == 8) {
                        clearInterval(timer);
                        document.getElementById("finish_timer").textContent = document.getElementById("timer").textContent;
                        document.getElementById("finish_seconds").textContent = document.getElementById("seconds").textContent;
                        $("#cards-container").css("display", "none");
                        $(".end").css("display", "block");
                    }
                    cards.forEach(card => {
                        card.style.pointerEvents = 'auto';
                    });
                }, 250);

            } else { // if wrong
                $(this).css("outline", "2px solid red");
                $(this).css("background", "#ff000091");
                currentCard.css("outline", "2px solid red");
                currentCard.css("background", "#ff000091");
                var thisCard = $(this);
                currentCard.css("animation", "shake 0.5s");
                thisCard.css("animation", "shake 0.5s");

                //after a while we should remove the red on the cards
                setTimeout(function () {
                    currentCard.css("outline", "2px solid white");
                    currentCard.css("background", "white");
                    thisCard.css("background", "white");
                    thisCard.css("outline", "2px solid white");
                    currentCard.css("animation", "still");
                    thisCard.css("animation", "still");
                    currentCard = undefined;

                    cards.forEach(card => {
                        card.style.pointerEvents = 'auto';

                    });
                }, 500);

            }
        } else { // we picked the first card and currenCard is none
            $(this).css("outline", "2px solid orange");
            $(this).css("background", "#F7CD7C");
            currentCard = $(this);
        }
    });
});


//new click when we want to restart the game
$(".restart-btn").on("click", e => location.reload());

//new restart when we want to restart the game when it ends
$(".another_game-btn").on("click", e => location.reload());


// to show all the words in the end
$("#words_display-btn").click(function () {

    let words_display = document.getElementById("words_learned");

    if (!entered_before) {
        $.each(filteredWords, function (i, word) {
            words_display.insertAdjacentHTML("beforeend",
                "<div>" + word["hebrew"] + "   =   " + word["arabic"] + "</div>"
            );
        });
    }

    $("#words_learned").css("display", "block");

    document.getElementById("words_display-btn").disabled = true;
    $("#words_hide-btn").css("display", "block");

    entered_before = true;
});


$("#words_hide-btn").click(function () {
    $("#words_learned").css("display", "none");
    $('#words_display-btn').removeAttr("disabled");
    $('#words_hide-btn').css("display", "none");
});

parent.postMessage(document.body.offsetHeight + "px", "*");

window.addEventListener("message", function (event) {
    if (event.data.username) {
        document.querySelector(".username").innerHTML = event.data.username;
    }

});