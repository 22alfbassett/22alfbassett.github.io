"use strict";

//Get locally stored values using json

//Add pre-existing notes to the list
let elements = localStorage.getItem("notes");

//Note input text display
let addNoteButton = document.getElementById('add');
let addNoteBlock = document.getElementById('addNoteBlock');
addNoteBlock.style.display = 'none';
addNoteButton.addEventListener('click', () => {
    appendNoteName.value = ""; //Clear out input fields
    appendNoteContent.value = "";
    if (addNoteBlock.style.display === 'none') addNoteBlock.style.display = "block";
    else addNoteBlock.style.display = 'none';
});

let container = document.getElementById('notes'); //List of notes
container.innerHTML = localStorage.getItem("notes");
let notes = container.children;

//Remote note funcitonality
let removeNoteBlock = document.getElementById("remove");
removeNoteBlock.addEventListener('click', () => {
for (let i = 0; i < notes.length; i++) {
    let buttons = notes[i].getElementsByTagName('input');
    if (buttons[0].checked) {
        buttons[0].parentElement.remove();
        i--;
    }
}
localStorage.setItem("notes", container.innerHTML); //Update localStorage
});

//Add note functionality
let appendNoteButton = document.getElementById("inputAddNote");
let appendNoteName = document.getElementById("inputName");
let appendNoteContent = document.getElementById("inputDescription");
appendNoteButton.addEventListener('click', () => {
    let name = appendNoteName.value;
    let desc = appendNoteContent.value;
    let appendNote = document.createElement("div");
    let appendName = document.createElement("h4");
    let appendDesc = document.createElement("p");
    let appendDate = document.createElement("p");
    let appendCheck = document.createElement("input");
    appendNote.className = "note-container";
    appendName.innerHTML = name;
    appendDesc.innerHTML = desc;
    let today = new Date();
    appendDate.innerHTML = today.toDateString();
    appendCheck.type = "checkbox";
    appendNote.appendChild(appendCheck);
    appendNote.appendChild(appendName);
    appendNote.appendChild(appendDesc);
    appendNote.appendChild(appendDate);
    container.appendChild(appendNote);
    localStorage.setItem("notes", container.innerHTML); //Update localStorage
    appendNoteName.value = ""; //Clear out input fields
    appendNoteContent.value = "";
    addNoteBlock.style.display = 'none'; //Hide the input display when we are done
})