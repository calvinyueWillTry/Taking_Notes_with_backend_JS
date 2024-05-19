let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');//wraps the note title and text
  noteTitle = document.querySelector('.note-title');//note title text box
  noteText = document.querySelector('.note-textarea');//note text text box
  saveNoteBtn = document.querySelector('.save-note');//save note button
  newNoteBtn = document.querySelector('.new-note');//append button
  clearBtn = document.querySelector('.clear-btn');//delete button
  noteList = document.querySelectorAll('.list-container .list-group');//empty area to left for new notes inputted
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () => //404 not found 
  fetch('/api/notes', { //GET request, retrieve notes from /api/notes
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const saveNote = (note) =>
  fetch('/api/notes', { //POST request, save a new note to /api/notes, sending the note data in the request body as JSON.
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, { //DELETE request, delete a note with an id from the /api/notes/:id, (:id is the unique ID of the note to be deleted)
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const renderActiveNote = () => {//hide the save and delete buttons
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);//display
    noteTitle.setAttribute('readonly', true);//set note title in notelist area as read-only note
    noteText.setAttribute('readonly', true);//set note text in notelist area as read-only note
    noteTitle.value = activeNote.title;//convert note title to object (29)
    noteText.value = activeNote.text;//convert note text to object (29)
  } else {
    hide(newNoteBtn);//hides
    noteTitle.removeAttribute('readonly');//delete note title in notelist area
    noteText.removeAttribute('readonly');//delete note text in notelist area
    noteTitle.value = '';//converts it into empty string
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,//saves it as the title section
    text: noteText.value//saves it as the text section
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
const handleRenderBtns = () => { //visibility of buttons
  show(clearBtn);//display
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);//hide delete if nothing inputted
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);//hide save if nothing inputted
  } else {
    show(saveNoteBtn);//display save if something's there
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {//awaits the notes.json() method to convert the notes object to JSON format.
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') { //looks for that href
    noteList.forEach((el) => (el.innerHTML = ''));//sets their inner HTML to an empty string
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  //create list items with text content and a delete button based on the parameters passed to it.
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);
      
      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) { //checks if there's something there
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => { //iterates over each element in the jsonNotes array (132)
    const li = createLi(note.title);//pass the title property of the note as an argv
    li.dataset.note = JSON.stringify(note);
    //"li" is set to a stringify version of the note object. 
    //This allows you to store data associated with the list item.
    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);//line 31 then 131
//404 not found? 
if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);//save button, goes to 75
  newNoteBtn.addEventListener('click', handleNewNoteView);//new note, goes to 112
  clearBtn.addEventListener('click', renderActiveNote);//delete button, goes to 56
  noteForm.addEventListener('input', handleRenderBtns);//button to hide notes from note title/text (119)
}

getAndRenderNotes();//404 not found?
//http://localhost:5009/notes