let database = [
    {
        "title": "Just a sample title",
        "text": "Just a sample text",
        "background": "red",
        "textcolor": "green"
    }
]


function hideButton() {
    let createNote = document.getElementById('createNote');
    createNote.classList.add('d-none');
}


function createNote() {
    hideInputCard();
    render();
}


function showButton() {
    let createNote = document.getElementById('createNote');
    createNote.classList.remove('d-none');
}


function hideInputCard() {
    if (checkUserInput()) {
        let card = document.getElementById('collapseWidthExample');
        card.classList.remove('show'); //Hides the input card
        showButton(); //Shows the "create note" button again
    } else {
        alert("Please enter Title and Text!");
    }
}


function checkUserInput() {
    let title = document.getElementById('title');
    let textarea = document.getElementById('textarea');
    if (title.value === '' & textarea.value === '') {
        return false; // If no user input return false
    } else {
        title.value = '';
        textarea.value = '';
        return true; // If there is user input return true
    }
}


function render() {
    let noteArea = document.getElementById('noteArea');
    noteArea.innerHTML = '';
    createNoteTemplate(noteArea);
}


function createNoteTemplate() {
    for(i=0; i < database.length; i++) {
        let note = document.createElement('div');
        note.setAttribute("id", `note${i}`);
        note.innerHTML = htmlTemplate(i);
        noteArea.appendChild(note);
        writeCardInput(i);
    } 
}


function htmlTemplate(index) {
    return `
        <div style="min-height: 120px;">
            <!--Bootstrap card-->
            <div id="card${i}" class="card" style="width: 23rem;">
                <div class="card-body">
                    <!--Bootstrap input text-->
                    <div class="input-group">
                        <input id="title${i}" type="text" class="form-control" placeholder="Title">
                    </div>
                    <!--Bootstrap input textarea-->
                    <div class="input-group mb-3">
                        <textarea id="textarea${i}" type="textarea" class="form-control"></textarea>
                    </div>
                    <!--Bootstrap input dropdown button-->
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle d-none" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Options
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Background color</a></li>
                            <li><a class="dropdown-item" href="#">Text color</a></li>
                            <li><a class="dropdown-item" href="#">Create list</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function writeCardInput(index) {
    let title = document.getElementById(`title${index}`);
    let text = document.getElementById(`textarea${index}`);
    let card = document.getElementById(`card${index}`);
    title.value = database[index].title;
    text.value = database[index].text;
    card.setAttribute("background", database[index].background);
    card.setAttribute("color", database[index].textcolor);
}