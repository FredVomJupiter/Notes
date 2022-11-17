let database = [];

let deletedNotes = [];


function start() {
    checkNavbarSelection();
    render();
    renderTrash()
}


/**
 * A.1. Main thread starting point
 */
function createNote() {
    if (title.value === '' && textarea.value === '') {
        alert('Title and/or Text missing');
    } else {
        save();
        hideInputCard();
        render();
    }
}

/**
 * A.1.1 called by createNote()
 */
function save() {
    let newTitle = document.getElementById('title');
    let newText = document.getElementById('textarea');
    let newNote = { "title": newTitle.value, "text": newText.value };
    database.push(newNote);
    saveJSON("database")
}

/**
 * A.1.2 called by createNote()
 */
function hideInputCard() {
    clearUserInput();
    let card = document.getElementById('collapseWidthExample');
    card.classList.remove('show'); //Hides the input card
    showButton(); //Shows the "create note" button again
}

/**
 * A.1.2.1 called by hideInputCard()
 */
function clearUserInput() {
    let title = document.getElementById('title');
    let textarea = document.getElementById('textarea');
    title.value = '';
    textarea.value = '';
}

/**
 * A.1.2.2 called by hideInputCard()
 */
function showButton() {
    let createNote = document.getElementById('createNote');
    createNote.classList.remove('d-none');
}

/**
 * A.1.3 called by createNote()
 */
function render() {
    load();
    createNoteTemplate();
}

/**
 * A.1.3.1 called by render()
 */
function load() {
    let loadedData = localStorage.getItem('data');
    if (loadedData !=null) {
        database = JSON.parse(loadedData);
    }
}

/**
 * A.1.3.2 called by render()
 */
function createNoteTemplate() {
    let noteArea = document.getElementById('noteArea');
    noteArea.innerHTML = '';
    if (database != null) {
        for (i = 0; i < database.length; i++) {
            let note = document.createElement('div');
            note.setAttribute("id", `note${i}`);
            note.innerHTML += htmlTemplate(i);
            noteArea.appendChild(note);
            writeCardInput(i);
        }
    }
}

/**
 * A.1.3.2.1 called by createNoteTemplate()
 */
function htmlTemplate(index) {
    return `
        <div id="container${index}" style="min-height: 120px;">
            <!--Bootstrap card-->
            <div id="card${index}" class="card" style="width: 23rem; background: #ced4da">
                <div class="card-body">
                    <!--Bootstrap input text-->
                    <div class="input-group">
                        <input id="title${index}" type="text" class="form-control" placeholder="Title">
                    </div>
                    <!--Bootstrap input textarea-->
                    <div class="input-group mb-3">
                        <textarea id="textarea${index}" type="textarea" class="form-control"></textarea>
                    </div>
                    <!--Bootstrap input dropdown button-->
                    <div class="btn-group">
                        <button id="delete${index}" type="button" class="btn btn-danger" onclick="deleteCard(${index})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * A.1.3.2.2 called by createNoteTemplate()
 * @param index of database
 */
function writeCardInput(index) {
    let title = document.getElementById(`title${index}`);
    let text = document.getElementById(`textarea${index}`);
    title.value += database[index].title;
    text.value += database[index].text;
}


/**
 * B.1 Delete process starts here
 * @param {*} index of database
 */
 function deleteCard(index) {
    saveTrash(index);
    database.splice(index, 1);
    //Save current database
    let savedData = JSON.stringify(database);
    localStorage.setItem('data', savedData);
    //Render the new database
    render();
}


function hideButton() {
    let createNote = document.getElementById('createNote');
    createNote.classList.add('d-none');
}

/**
 * C.1 Render Trash starts here
 */
function renderTrash() {
    loadTrash();
    createTrashTemplate();
}


function createTrashTemplate() {
    let trashbin = document.getElementById('trash');
    trashbin.innerHTML = '';
    if (deletedNotes != null) {
        for (i = 0; i < deletedNotes.length; i++) {
            let note = document.createElement('div');
            note.setAttribute("id", `deletedNote${i}`);
            note.innerHTML += htmlTemplateDeleted(i);
            trashbin.appendChild(note);
            writeTrashInput(i);
        }
    }
}


function htmlTemplateDeleted(index) {
    return `
        <div id="containerRemoved${index}" style="min-height: 120px;">
            <!--Bootstrap card-->
            <div id="cardRemoved${index}" class="card" style="width: 23rem; background: #ced4da">
                <div class="card-body">
                    <!--Bootstrap input text-->
                    <div class="input-group">
                        <input id="titleRemoved${index}" type="text" class="form-control" placeholder="Title">
                    </div>
                    <!--Bootstrap input textarea-->
                    <div class="input-group mb-3">
                        <textarea id="textareaRemoved${index}" type="textarea" class="form-control"></textarea>
                    </div>
                    <!--Bootstrap input dropdown button-->
                    <div class="btn-group">
                        <button id="deleteRemoved${index}" type="button" class="btn btn-danger" onclick="deleteRemoved(${index})">Delete</button>
                        <button id="restoreRemoved${index}" type="button" class="btn btn-primary" onclick="restoreRemoved(${index})">Restore</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function writeTrashInput(index) {
    let title = document.getElementById(`titleRemoved${index}`);
    let text = document.getElementById(`textareaRemoved${index}`);
    title.value += deletedNotes[index].title;
    text.value += deletedNotes[index].text;
}


function saveTrash(index) {
    let deletedNote = database[index];
    deletedNotes.push(deletedNote);
    saveJSON("deletedNotes");
}


function loadTrash() {
    let loadedData = localStorage.getItem('deletedData');
    if (loadedData !=null) {
        deletedNotes = JSON.parse(loadedData);
    }
}


function showNotes() {  
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    let canvasTrash = document.getElementById('canvasTrash');
    canvasTrash.classList.add('d-none')
    checkNavbarSelection();
    render();
}


function showTrash() {
    let canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    let canvasTrash = document.getElementById('canvasTrash');
    canvasTrash.classList.remove('d-none');
    checkNavbarSelection();
    renderTrash();
}


function deleteRemoved(index) {
    deletedNotes.splice(index, 1);
    saveJSON("deletedNotes");
    renderTrash();
}


function restoreRemoved(index) {
    let restoredNote = deletedNotes[index];
    database.push(restoredNote);
    saveJSON("database");
    deletedNotes.splice(index, 1);
    saveJSON("deletedNotes");
    renderTrash();
}

/**
 * A.1.1.1 called by save()
 * @param {*} option referencing the arrays defined on top "deletedNotes" or "database" 
 */
function saveJSON(option) {
    if ("database") {
        let savedData = JSON.stringify(database);
        localStorage.setItem('data', savedData);
    }
    if ("deletedNotes") {
        let savedData = JSON.stringify(deletedNotes);
        localStorage.setItem('deletedData', savedData);
    }
}


function checkNavbarSelection() {
    console.log("checking...");
    let canvas = document.getElementById('canvas');
    let trashLink = document.getElementById('trashLink');
    let noteLink = document.getElementById('notesLink');
    if (canvas.classList.contains('d-none')) {
        console.log("trashLink active");
        noteLink.style.textDecoration = "none";
        trashLink.style.textDecoration = "underline";
    } else {
        console.log("notesLink active");
        trashLink.style.textDecoration = "none";
        noteLink.style.textDecoration = "underline";
    }
}