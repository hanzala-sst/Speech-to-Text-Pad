# Speech-to-Text-Pad
A simple Speech-to-Text Pad built with JavaScript, featuring mic recording, live transcription, a timer, and easy note saving using localStorage. Users can view and delete saved notes. Uses HTML, CSS, and the Web Speech API.


---

## 🚀 How to Use
1. Open the website in **Google Chrome** (recommended).  
2. Click the **microphone button** to start recording.  
3. **Speak clearly**—the text will appear in the text box.  
4. Click the microphone again to **stop recording**.  
5. Use the buttons:
   - **Copy** → Copy the text  
   - **Delete** → Clear the text  
   - **Save** → Store the text as a note  
6. Click **Show saved notes** to view all your notes.  
7. Delete any note using the **Delete** button next to it.

---

## 📦 Save Notes Feature
Each saved note is stored inside the browser using:
index.html → UI structure
style.css → Styling
script.js → Speech recognition + DOM + notes logic


---

## 🚀 How to Use
1. Open the website in **Google Chrome** (recommended).  
2. Click the **microphone button** to start recording.  
3. **Speak clearly**—the text will appear in the text box.  
4. Click the microphone again to **stop recording**.  
5. Use the buttons:
   - **Copy** → Copy the text  
   - **Delete** → Clear the text  
   - **Save** → Store the text as a note  
6. Click **Show saved notes** to view all your notes.  
7. Delete any note using the **Delete** button next to it.

---

## 📦 Save Notes Feature
Each saved note is stored inside the browser using:


localStorage.setItem("notes", JSON.stringify(notesArray));

Notes:
- Stay saved even after refreshing the page  
- Are shown in a scrollable panel  
- Can be individually deleted  

---

## 🧠 Concepts Demonstrated
This project demonstrates:
- **DOM selection & manipulation**
- **Events** (click, input, etc.)
- **Web Speech API**
- **Conditionals & state variables**
- **Timers (setInterval)**
- **Template creation using JS**
- **localStorage CRUD operations**
- **Basic UI/UX handling**

---

## 🌐 Browser Requirements
The Web Speech API is supported mainly in:
- **Google Chrome (recommended)**  
- **Microsoft Edge**

Not supported in Firefox and some mobile browsers.

---

## 🔒 Privacy
All speech processing happens **inside the browser**.  
Notes are stored only in **localStorage on your device**.  
No data is uploaded anywhere.

---

## 🙋‍♂️ Author
Created as part of a college assignment to understand:
- Speech recognition  
- DOM events  
- JavaScript localStorage  
- Basic UI building
