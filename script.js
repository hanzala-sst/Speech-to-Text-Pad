
const micBtn = document.getElementById("micBtn");
const transcriptBox = document.getElementById("transcriptBox");
const timerDisplay = document.getElementById("timerDisplay");
const copyBtn = document.getElementById("copyBtn");
const deleteBtn = document.getElementById("deleteBtn");
const saveBtn = document.getElementById("saveBtn");

let recognition;
let listening = false;
let timer = null;
let seconds = 0;

//CHECK API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition not supported in this browser. Use Chrome.");
} else {
  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.continuous = false;  
  recognition.lang = "en-US"; 
}

//TIMER
function startTimer() {
  seconds = 0;
  timerDisplay.textContent = "00:00:00";
  timer = setInterval(() => {
    seconds++;
    let h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    let m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    let s = String(seconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

//RECOGNITION EVENTS
if (recognition) {
  recognition.onstart = () => {
    console.log("Started listening");
    micBtn.classList.add("recording");
    startTimer();
  };

  recognition.onresult = (event) => {
    let text = "";
    for (let i = 0; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    transcriptBox.value = text;
  };

  recognition.onerror = (e) => {
    console.log("Error:", e);
    alert("No speech detected. Try speaking closer to the mic.");
  };

  recognition.onend = () => {
    console.log("Stopped");
    micBtn.classList.remove("recording");
    stopTimer();
    listening = false;
  };
}

//MIC BUTTON
micBtn.addEventListener("click", () => {
  if (!recognition) return;

  if (!listening) {
    listening = true;
    transcriptBox.value = "";
    recognition.start();
  } else {
    listening = false;
    recognition.stop();
  }
});

//COPY
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(transcriptBox.value);
  alert("Copied!");
});

//DELETE
deleteBtn.addEventListener("click", () => {
  transcriptBox.value = "";
});

//SAVE
saveBtn.addEventListener("click", () => {
  let text = transcriptBox.value.trim();
  if (!text) return alert("Nothing to save.");

  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push({ id: Date.now(), text });
  localStorage.setItem("notes", JSON.stringify(notes));

  alert("Saved!");
});

const NOTES_KEY = 'notes';               // storage key
const notesListEl = document.getElementById('notesList');
const toggleNotesBtn = document.getElementById('toggleNotesBtn');

// Save current transcript as a note
saveBtn.addEventListener('click', () => {
  const text = (transcriptBox.value || '').trim();
  if (!text) {
    alert('Nothing to save.');
    return;
  }

  // load existing notes, add new one at the end
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
  const note = {
    id: Date.now(), 
    text: text
  };
  notes.push(note);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));

  // show notes list to user and refresh it
  if (notesListEl.hasAttribute('hidden')) {
    notesListEl.removeAttribute('hidden');
    toggleNotesBtn.textContent = 'Hide saved notes';
  }
  renderNotes();
  alert('Saved!');
});

// Render notes (simple, newest first)
function renderNotes() {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
  notesListEl.innerHTML = ''; // clear

  if (!notes.length) {
    notesListEl.innerHTML = '<p class="notes-empty">No saved notes yet.</p>';
    return;
  }

  // render newest first
  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];

    const item = document.createElement('div');
    item.className = 'note-item';

    const left = document.createElement('div');
    left.style.flex = '1';

    const meta = document.createElement('div');
    meta.className = 'note-meta';
    meta.textContent = new Date(note.id).toLocaleString();

    const text = document.createElement('div');
    text.className = 'note-text';
    text.textContent = note.text;

    left.appendChild(meta);
    left.appendChild(text);

    const actions = document.createElement('div');
    actions.className = 'note-actions';

    const delBtn = document.createElement('button');
    delBtn.className = 'note-delete';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    actions.appendChild(delBtn);
    item.appendChild(left);
    item.appendChild(actions);
    notesListEl.appendChild(item);
  }
}

// Delete note by id
function deleteNote(id) {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
  const filtered = notes.filter(n => n.id !== id);
  localStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  renderNotes();
}

// Toggle notes panel show/hide
toggleNotesBtn.addEventListener('click', () => {
  if (notesListEl.hasAttribute('hidden')) {
    notesListEl.removeAttribute('hidden');
    toggleNotesBtn.textContent = 'Hide saved notes';
    renderNotes();
  } else {
    notesListEl.setAttribute('hidden', '');
    toggleNotesBtn.textContent = 'Show saved notes';
  }
});

// on load, render notes if exist
(function initNotesOnLoad(){
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY) || '[]');
  if (notes.length) {
    // render so content is ready when user opens panel
    renderNotes();
  } else {
    notesListEl.innerHTML = '<p class="notes-empty">No saved notes yet.</p>';
  }
})();
