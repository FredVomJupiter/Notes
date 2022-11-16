let database = [];

/**
 * 1. Main thread starting point
 */
function createNote() {
    if (title.value === '' & textarea.value === '') {
        alert('Title and/or Text missing');
    } else {
        save();
        hideInputCard();
        render();
    }
}

/**
 * 1.1 called by createNote()
 */
function save() {
    let newTitle = document.getElementById('title');
    let newText = document.getElementById('textarea');
    let newNote = { "title": newTitle.value, "text": newText.value };
    database.push(newNote);
    let savedData = JSON.stringify(database);
    localStorage.setItem('data', savedData);
}

/**
 * 1.2 called by createNote()
 */
function hideInputCard() {
    clearUserInput();
    let card = document.getElementById('collapseWidthExample');
    card.classList.remove('show'); //Hides the input card
    showButton(); //Shows the "create note" button again
}

/**
 * 1.2.1 called by hideInputCard()
 */
function clearUserInput() {
    let title = document.getElementById('title');
    let textarea = document.getElementById('textarea');
    title.value = '';
    textarea.value = '';
}

/**
 * 1.2.2 called by hideInputCard()
 */
function showButton() {
    let createNote = document.getElementById('createNote');
    createNote.classList.remove('d-none');
}

/**
 * 1.3 called by createNote()
 */
function render() {
    load();
    createNoteTemplate();
}

/**
 * 1.3.1 called by render()
 */
function load() {
    let loadedData = localStorage.getItem('data');
    if (loadedData !=null) {
        database = JSON.parse(loadedData);
    }
}

/**
 * 1.3.2 called by render()
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
 * 1.3.2.1 called by createNoteTemplate()
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
 * 1.3.2.2 called by createNoteTemplate()
 * @param index of database
 */
function writeCardInput(index) {
    let title = document.getElementById(`title${index}`);
    let text = document.getElementById(`textarea${index}`);
    title.value += database[index].title;
    text.value += database[index].text;
}







