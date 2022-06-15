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


function createUrl(lesson, media) {
    let url = location.href.substring(0, location.href.indexOf("instructor"));
    if (lesson || media) {
        url += "?";
        if (lesson) {
            url += "lesson=" + lesson;
            if (media) {
                url += "&media=" + media;
            }
        }
        else {
            if (media) {
                url += "media=" + media;
            }
        }
    }
    return url;
}

function getUniques(data, filter) {
    let uniques = [];
    for (var i = 0; i < data.length; i++) {
        if (!data.includes(data[i][filter])) {
            if (!uniques.includes(data[i][filter])) {
                uniques.push(data[i][filter]);
            }
        }
    }
    return uniques;
}


$("#create-game").on("click", function () {
    selectedLesson = $(".lesson").val();
    selectedUnit = $(".unit").val();
    selectedMedia = $(".media").val();


    if (!selectedLesson) {
        alert("נא לבחור שיעור");
    }
    else {
        if (selectedMedia == "text") {
            media = 0;
        }
        else {
            media = selectedMedia;
        }
        if(selectedUnit != 0){
             url = createUrl(selectedLesson + ":" + selectedUnit, media);
        }
        else{
             url = createUrl(selectedLesson, 0 , media);
        }
        $(".result a").attr("href", url).html(url);
        $(".result .iframe textarea").html(`<iframe
         src="${url}" style="width:100%;height:90vh">
</iframe>`);
        $(".result").show();
    }
});




$(".copy-code").on("click", function () {
    $(".iframe textarea").select();
    document.execCommand("copy");
})

let selectedLesson = 0;
let selectedUnit = 0;
let selectedMedia = 0;
let gameNumWords = 0;
let url;


let allwords = loadJson("../vocab.json");

let lessons = []
lessons = getUniques(allwords, "lesson");


lessons.forEach(function (lesson) {
    let element = `<option value="${lesson}">${lesson}</option>`;
    $(".lesson").append(element);
});


$(".lesson").on("change", function () {

    selectedLesson = $(this).val();
    let units = [];
    lessonWords = allwords.filter(function (word) {
        return word.lesson == selectedLesson;
    });
    units = getUniques(lessonWords, "unit");
    $(".unit").empty();
    $(".unit").append('<option value="0">שיעור שלם</option>');
    $(".unit").removeAttr("disabled");
    units.forEach(function (unit) {
        let element = `<option value="${unit}">${unit}</option>`;
        $(".unit").append(element);

    });
});


