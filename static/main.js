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
}

// the code below this line is for visual purposes
function swap() {
    if(input_lang_selector.value == "Detect") return;
    var new_input = output.innerText,
        new_output = input.value,
        new_input_lang = output_lang_selector.value,
        new_output_lang = input_lang_selector.value;
    output.innerText = new_output;
    input.value = new_input;
    output_lang_selector.value = new_output_lang;
    input_lang_selector.value = new_input_lang;
}

async function getTranslationPairings() {
    input_lang_selector.innerHTML = "<option value='unk'>... loading ...</option>";
    output_lang_selector.innerHTML = "<option value='unk'>... loading ...</option>";
    var req = window.location.origin + "/getCombos";
    const response = await fetch(
        req,
        {
            method: 'GET'
        }
    );
    const data = await response.json();
    console.warn(data);
    keys = Object.keys(data);
    input_lang_selector.innerHTML = "";
    output_lang_selector.innerHTML = "";
    console.log("TEST");
    for(var i = 0; i < keys.length; i++) {
        add_pairing([keys[i], data[keys[i]]]);
    }
}   

function add_pairing(pair) {
    console.log("ADDING PAIRING");
    var in_str = pair[0],
        out_str = pair[1];
    var input_op = document.createElement("option"),
        output_op = document.createElement("option");
    input_op.setAttribute("value", in_str);
    output_op.setAttribute("value", out_str);
    input_op.innerHTML = in_str;
    output_op.innerHTML = out_str;
    console.log(pair);
    input_lang_selector.innerHTML += input_op.outerHTML;
    output_lang_selector.innerHTML += output_op.outerHTML;
}

getTranslationPairings();