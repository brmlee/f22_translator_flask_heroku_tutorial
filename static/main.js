var output = document.getElementById("output"),
    input = document.querySelector("#input > textarea");
    input_lang_selector = document.querySelector("#selector > .input");
    output_lang_selector = document.querySelector("#selector > .output");

var input_string;

var translations = ["aafhwei","iweafjwoi","ihfoahwefi"];

function speak(speech) {
    let utterance = new SpeechSynthesisUtterance(speech);
    speechSynthesis.speak(utterance);
}

// input.addEventListener("input",function() {
//     input_string = input.value;
//     if(input_string != null) {
//         output.innerText = translations[Math.floor(Math.random() * translations.length)];
//         try {
//             // speak(input_string);
//         } catch {
//             console.log("couldn't speak");
//         }
//     }
// });

// let utterance = new SpeechSynthesisUtterance("Hello world!");
// speechSynthesis.speak(utterance);

function getTranslation(string_to_translate) {
    var req = window.location.origin + "/translate?str=" + string_to_translate + "&from=" + input_lang_selector.value + "&to=" + output_lang_selector.value;
    fetch(req)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        output.innerText = json.output;
    });
}