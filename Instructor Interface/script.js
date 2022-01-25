
var lessons_array = [];
var counter = 0;

function createIframeCode(lesson){
    console.log("lesson is: ")
    console.log(lesson)
    let code 
    if (lesson){
        code = `http://127.0.0.1:5500/index.html?lesson=${lesson}`;
    }
    else{
         code = `http://127.0.0.1:5500/index.html`;
    }
    //`<iframe src="/static/vocabulary-table.html" data-lesson="${lesson}" data-unit="${unit}" scrolling="no"> </iframe>`;
    return code;
}


function copyCode(){
     outputTextarea.select();
     document.execCommand("copy");
}

const createBtn = document.querySelector("#create-btn");
const addBtn = document.querySelector("#add-btn");
const outputTextarea = document.querySelector("#output-textarea");


createBtn.addEventListener("click",function(){
    let lessons_str = ''; 
    for (i = 0; i <= counter; i++) {
        let lesson = document.querySelector("#lesson_" + i).value; 
        let units = document.querySelector("#unit_"+ i).value;
        console.log("lesson is here: ")
        console.log(lesson);
        if(lesson){
            lessons_str += lesson
        }

        if (lesson && units) {
            // lessons_str += lesson
            lessons_str += ":"
            lessons_str += units
            lessons_str += "$" 
        }

        if (lesson && !units) {
            lessons_str += "$" 
        }
    }

    // lessons_array.push(lesson);
    // lessons_array.push(":");
    // lessons_array.push(units);
    // lessons_array.push("$");
   
    console.log(lessons_str);
   let code = createIframeCode(lessons_str);
   outputTextarea.innerHTML = code;
   copyCode();
});


addBtn.addEventListener("click",function(i){
   // let lesson =  document.querySelector("#lesson").value; 
   // let unit = document.querySelector("#unit").value; 
   // let code = createIframeCode(unit, lesson);
   // outputTextarea.innerHTML = code;
   // copyCode();
   counter++;
   console.log("counter is: ")
   console.log(counter)
   var d1 = document.getElementById("new_lesson")
    d1.insertAdjacentHTML("beforeend",
        "<div id=\"new_lesson\">\n" + 
        "<label> Lesson<br><input id=\"lesson_" + counter + "\" type=\"text\" ><label>\n" + 
        "<label> Unit<br><input id=\"unit_" + counter + "\" type=\"text\" ><label>\n" +
        "<label> -----------------------------------------------------------------------------------------------------------------------------------<br><label>\n" +
        "</div>\n"
    );


});

// $("#add-btn").click(function () {
//     var d1 = document.getElementById("new_lesson")
//     d1.insertAdjacentHTML("beforeend",
//         "<div id=\"new_lesson\">\n" + 
//         "<label> Lesson<br><input id=\"lesson\" type=\"text\" ><label>\n" + 
//         "<label> Unit<br><input id=\"unit\" type=\"text\" ><label>\n" +
//         "<button id=\"add-btn\">+</button>\n" +
//         "</div>\n"
//     );
// });
