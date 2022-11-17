let deletedNotes = [];


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
    console.log("setting deleted note: ", deletedNote);
    deletedNotes.push(deletedNote);
    console.log("pushing deleted note: ", deletedNotes);
    let savedData = JSON.stringify(deletedNotes);
    localStorage.setItem('deletedData', savedData);
}


function loadTrash() {
    let loadedData = localStorage.getItem('deletedData');
    if (loadedData !=null) {
        deletedNotes = JSON.parse(loadedData);
    }
}