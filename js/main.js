let database = [];

let deletedNotes = [];

// Boolean switch used for search field's search moduls: false => searches database, true => searches deletedNotes
let trashActive = false;


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
    if (loadedData != null) {
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
            <div id="card${index}" class="card" style="width: 20rem; background: white">
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
                        <button id="update${index}" type="button" class="btn btn-primary" onclick="updateCard(${index})">Update</button>
                    </div>
                    <div class="confirm" id="confirmation${index}" style="font-size: 12px; margin-left: 8px"></div>
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
            <div id="cardRemoved${index}" class="card" style="width: 20rem; background: white">
                <div class="card-body">
                    <!--Bootstrap input text-->
                    <div class="input-group">
                        <input id="titleRemoved${index}" type="text" class="form-control" disabled="true" style="background: white">
                    </div>
                    <!--Bootstrap input textarea-->
                    <div class="input-group mb-3">
                        <textarea id="textareaRemoved${index}" type="textarea" class="form-control" disabled="true" style="background: white"></textarea>
                    </div>
                    <!--Bootstrap input dropdown button-->
                    <div class="btn-group">
                        <button id="deleteRemoved${index}" type="button" class="btn btn-danger" onclick="deleteRemoved(${index})">Delete</button>
                        <button id="restoreRemoved${index}" type="button" class="btn btn-secondary" onclick="restoreRemoved(${index})">Restore</button>
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
    if (loadedData != null) {
        deletedNotes = JSON.parse(loadedData);
    }
}


function showNotes() {
    trashActive = false;
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    let canvasTrash = document.getElementById('canvasTrash');
    canvasTrash.classList.add('d-none')
    checkNavbarSelection();
    render();
}


function showTrash() {
    trashActive = true;
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

/**
 * E.1 navbar link activation starts here
 */
function checkNavbarSelection() {
    let canvas = document.getElementById('canvas');
    if (canvas.classList.contains('d-none')) {
        activateTrash();
    } else {
        activateNotes();
    }
}


function activateTrash() {
    let trashLink = document.getElementById('trashLink');
    let noteLink = document.getElementById('notesLink');
    noteLink.style.textDecoration = "none";
    noteLink.style.color = "grey";
    trashLink.style.textDecoration = "underline";
    trashLink.style.color = "black";
}


function activateNotes() {
    let trashLink = document.getElementById('trashLink');
    let noteLink = document.getElementById('notesLink');
    trashLink.style.textDecoration = "none";
    trashLink.style.color = "grey";
    noteLink.style.textDecoration = "underline";
    noteLink.style.color = "black";
}

/**
 * F.1 update button starts here
 * @param {*} index as string to identify card
 */
function updateCard(index) {
    let newTitle = document.getElementById(`title${index}`).value;
    let newText = document.getElementById(`textarea${index}`).value;
    database[index].title = newTitle;
    database[index].text = newText;
    saveJSON('database');
    printConfirmation(index); // Printing confirmation message below card's buttons
    setTimeout(function () { // After 2 seconds the confirmation will be removed
        removeConfirmation(index);
    }, 2000);
}


function printConfirmation(index) {
    let card = document.getElementById(`confirmation${index}`);
    card.innerHTML = "update successfull";
}


function removeConfirmation(index) {
    let card = document.getElementById(`confirmation${index}`);
    card.innerHTML = "";
}

/**
 * G.1 search function filters start here
 */
function filterCards() {
    let searchString = document.getElementById('form1').value;
    searchString = searchString.toLowerCase();
    if (searchString != '') {
        let filteredDatabase = [];
        let indexList = [];
        if (trashActive) {
            filterTrash(searchString, filteredDatabase, indexList);
        } else {
            filterNonTrash(searchString, filteredDatabase, indexList);
        }
    }
}


function filterTrash(searchString, filteredDatabase, indexList) {
    for (i = 0; i < deletedNotes.length; i++) {
        if (deletedNotes[i].title.toLowerCase().includes(searchString) || deletedNotes[i].text.toLowerCase().includes(searchString)) {
            filteredDatabase.push(deletedNotes[i]);
            indexList.push(i);
        }
    }
    renderFilter(filteredDatabase, indexList);
}


function filterNonTrash(searchString, filteredDatabase, indexList) {
    for (i = 0; i < database.length; i++) {
        if (database[i].title.toLowerCase().includes(searchString) || database[i].text.toLowerCase().includes(searchString)) {
            filteredDatabase.push(database[i]);
            indexList.push(i);
        }
    }
    renderFilter(filteredDatabase, indexList);
}


function renderFilter(filteredDatabase, indexList) {
    if (filteredDatabase != null) {
        if (trashActive) {
            renderFilteredTrash(filteredDatabase, indexList);
        } else {
            renderFilteredNoneTrash(filteredDatabase, indexList);
        }
    }
}


function renderFilteredTrash(filteredDatabase, indexList) {
    let trashbin = document.getElementById('trash');
    trashbin.innerHTML = '';
    for (i = 0; i < filteredDatabase.length; i++) {
        let note = document.createElement('div');
        note.setAttribute("id", `filteredNote${i}`);
        note.innerHTML += htmlTemplateDeleted(indexList[i]);
        trashbin.appendChild(note);
        writeTrashInput(indexList[i]);
    }
}


function renderFilteredNoneTrash(filteredDatabase, indexList) {
    let noteArea = document.getElementById('noteArea');
    noteArea.innerHTML = '';
    for (i = 0; i < filteredDatabase.length; i++) {
        let note = document.createElement('div');
        note.setAttribute("id", `filteredNote${i}`);
        note.innerHTML += htmlTemplate(indexList[i]);
        noteArea.appendChild(note);
        writeCardInput(indexList[i]);
    }
}

/**
 * H.1 filter button starts here
 */
function removeFilter() {
    let searchString = document.getElementById('form1');
    searchString.value = '';
    if (trashActive) {
        renderTrash();
    } else {
        render();
    }
}