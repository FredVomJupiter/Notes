let deletedNotes = [];


function showTrash() {
    let canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    let trashbin = document.getElementById('trash');
    trashbin.classList.remove('d-none');
}


function showNotes() {
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    let trashbin = document.getElementById('trash');
    trashbin.classList.add('d-none');
}


function hideButton() {
    let createNote = document.getElementById('createNote');
    createNote.classList.add('d-none');
}

/**
 * 1. Delete process starts here
 * @param {*} index of database
 */
function deleteCard(index) {
    collectDeletedNote(index);
    database.splice(index, 1);
    //Save current database
    let savedData = JSON.stringify(database);
    localStorage.setItem('data', savedData);
    //Render the new database
    render();
}


function collectDeletedNote(index) {
    let deletedNote = database[index];
    deletedNotes.push(deletedNote);

    let trashbin = document.getElementById('trash');
    trashbin.innerHTML = '';
    if (deletedNotes != null) {
        for (i = 0; i < deletedNotes.length; i++) {
            let note = document.createElement('div');
            note.setAttribute("id", `deletedNote${i}`);
            note.innerHTML += htmlTemplateDeleted(i);
            trashbin.appendChild(note);
            console.log(deletedNotes);
            let title = document.getElementById(`titleRemoved${i}`);
            let text = document.getElementById(`textareaRemoved${i}`);
            title.value += database[index].title;
            text.value += database[index].text;
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