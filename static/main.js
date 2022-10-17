/**
 * main.js
 * written by Alex Shandilis
 * 
 * This file stores all of our front-end JavaScript code for the translator.
 * We use JavaScript for managing the interface and creating user interactions,
 * and it is strictly only for functionality we wish to handle on the browser-
 * side. Because we cannot run Python in a browser, and because we cannot
 * depend on our end-user's hardware for a reliable and consistent user-
 * experience, we take care of translation on the back-end! See trans.py to
 * learn about the backend. 
 */


// these variables store components in our application
var input = document.querySelector("#input > textarea"),
    output = document.getElementById("output"),
    input_lang_selector = document.querySelector("#selector > .input"),
    output_lang_selector = document.querySelector("#selector > .output");


// just adding some fun placeholder text :)
input.value = "ich bin eine banane";
output.textContent = "I am a banana";
input_lang_selector.value = "German";
output_lang_selector.value = "English";

// this function uses your browser's speech synthesis API to produce output for 
// the given string
function speak(speech) {
    let utterance = new SpeechSynthesisUtterance(speech);
    speechSynthesis.speak(utterance);
}


// below section is dedicated to our translator
var prev_input =  input.value;

// this is the function that we will use for retrieving the final translation, 
// both for using the Googletrans library as well as our own final translation 
// model. In both cases, our Python code will create a simple JSON response 
// containing a key called "output" which points to a value that stores the 
// actual returned translation.
async function getTranslation(string_to_translate) {
    if(prev_input == input.value || input.value == '') {
        console.log(prev_input + ", " + input.innerText);
        alert("Please enter something different, then try translating again...");
        return;
    } else {
        prev_input = input.value;
    }
    output.innerText = ("... loading translation ...");
    var req = window.location.origin + "/translate?str=" + string_to_translate 
            + "&from=" + input_lang_selector.value + "&to=" 
            + output_lang_selector.value;
    //we make a fetch request that 
    const response = await fetch(
        req,
        {
            method: 'GET'
        }
    )
    const data = await response.json();
    if(data.status == "0") {
        console.log(data);
        output.innerText = data.output;
    } else {
        console.log(data);
        output.innerText = "There was an error while translating.";
    }
    // fetch(req)
    // .then(response => response.json())
    // .then(json => {
    //     console.log(json);
    //     output.innerText = json.output;
    // });
}

// the code below this line is for visual purposes