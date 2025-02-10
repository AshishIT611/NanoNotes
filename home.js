const recentNotes = [];

const addRecentNote = (noteTitle) => {
    const recentNotesContainer = document.getElementById("recent-notes-container");
    const recentNote = document.createElement("div");
    recentNote.classList.add("recent-note");

    const noteIcon = document.createElement("i");
    noteIcon.classList.add("fa-solid", "fa-note-sticky");
    recentNote.appendChild(noteIcon);

    const noteTitleElement = document.createElement("span");
    noteTitleElement.textContent = noteTitle;
    recentNote.appendChild(noteTitleElement);

    recentNote.addEventListener("click", () => {
        alert(`Opened ${noteTitle}`);
    });

    recentNotesContainer.prepend(recentNote);

    if (recentNotesContainer.childElementCount > 5) {
        recentNotesContainer.removeChild(recentNotesContainer.lastChild);
    }
};

const createNote = () => {
    const contentDiv = document.getElementById("content");
    const notesContainer = document.getElementById("notes-container");
    const pagesContainer = document.getElementById("pages-container");
    contentDiv.style.display = "none";

    const note = document.createElement("div");
    note.classList.add("note");

    const title = document.createElement("h3");
    title.textContent = "Untitled";
    title.contentEditable = "true";
    note.appendChild(title);

    const content = document.createElement("textarea");
    content.classList.add("note-content");
    content.placeholder = "Write your note here...";
    note.appendChild(content);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    note.appendChild(saveButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    note.appendChild(deleteButton);

    // Create a word counter element
    const wordCounter = document.createElement("div");
    wordCounter.classList.add("word-counter");
    wordCounter.textContent = "Word Count: 0";
    note.appendChild(wordCounter);

    content.addEventListener("input", () => {
        const text = content.value.trim();
        const words = text.split(/\s+/).filter(word => word.length > 0);
        wordCounter.textContent = `Word Count: ${words.length}`;
    });

    notesContainer.appendChild(note);

    const pageOption = document.createElement("div");
    pageOption.classList.add("page-option");
    pageOption.textContent = "Untitled";
    pagesContainer.appendChild(pageOption);

    deleteButton.addEventListener("click", () => {
        note.remove();
        pageOption.remove();
    });

    title.addEventListener("input", () => {
        pageOption.textContent = title.textContent || "Untitled";
    });

    saveButton.addEventListener("click", () => {
        alert("Note Saved!");
        addRecentNote(title.textContent || "Untitled");
    });
};

const createNewPage = () => {
    const notesContainer = document.getElementById("notes-container");
    const contentDiv = document.getElementById("content");
    const pagesContainer = document.getElementById("pages-container");

    notesContainer.innerHTML = "";
    contentDiv.style.display = "block";
    contentDiv.querySelector(".name").textContent = "Welcome to a New Page";

    pagesContainer.innerHTML = "";
};

const addPage = () => {
    const pagesContainer = document.getElementById("pages-container");
    const notesContainer = document.getElementById("notes-container");

    const pageOption = document.createElement("div");
    pageOption.classList.add("untitled");
    pageOption.textContent = "Untitled";
    pagesContainer.appendChild(pageOption);

    const newPage = document.createElement("div");
    newPage.classList.add("note");
    const newTitle = document.createElement("h3");
    newTitle.textContent = "Untitled";
    newTitle.contentEditable = "true";
    newPage.appendChild(newTitle);

    const newContent = document.createElement("textarea");
    newContent.classList.add("note-content");
    newContent.placeholder = "Write your note here...";
    newPage.appendChild(newContent);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save-button");
    newPage.appendChild(saveButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    newPage.appendChild(deleteButton);

    const wordCounter = document.createElement("div");
    wordCounter.classList.add("word-counter");
    wordCounter.textContent = "Word Count: 0";
    newPage.appendChild(wordCounter);

    newContent.addEventListener("input", () => {
        const text = newContent.value.trim();
        const words = text.split(/\s+/).filter(word => word.length > 0);
        wordCounter.textContent = `Word Count: ${words.length}`;
    });

    notesContainer.appendChild(newPage);

    pageOption.addEventListener("click", () => {
        alert(`Opened ${pageOption.textContent}`);
    });

    newTitle.addEventListener("input", () => {
        pageOption.textContent = newTitle.textContent || "Untitled";
    });

    deleteButton.addEventListener("click", () => {
        newPage.remove();
        pageOption.remove();
    });

    saveButton.addEventListener("click", () => {
        alert("Note Saved!");
        addRecentNote(newTitle.textContent || "Untitled");
    });
};

const deletePage = () => {
    const notesContainer = document.getElementById("notes-container");
    const pagesContainer = document.getElementById("pages-container");

    notesContainer.innerHTML = "";
    pagesContainer.innerHTML = "";
};

const searchNotes = (query) => {
    const notes = document.querySelectorAll(".note");
    notes.forEach((note) => {
        const title = note.querySelector("h3").textContent.toLowerCase();
        const content = note.querySelector(".note-content").value.toLowerCase();
        if (title.includes(query.toLowerCase()) || content.includes(query.toLowerCase())) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
};

const sidebarIcons = {
    search: () => {
        const searchInput = document.createElement("input");
        searchInput.placeholder = "Search notes...";
        searchInput.classList.add("search-input");
        const sidebar = document.querySelector(".sidebar");
        sidebar.appendChild(searchInput);

        searchInput.addEventListener("input", (event) => {
            searchNotes(event.target.value);
        });
    },
    trash: () => {
        deletePage();
    },
    newPage: createNewPage,
    addPage: addPage,
};

document.querySelector(".fa-magnifying-glass").addEventListener("click", sidebarIcons.search);
document.querySelector(".fa-trash").addEventListener("click", sidebarIcons.trash);
document.querySelector(".fa-circle-plus").addEventListener("click", sidebarIcons.newPage);
document.querySelector(".fa-plus").addEventListener("click", sidebarIcons.addPage);

const trashButton = document.querySelector(".fa-trash-can");
if (trashButton) {
    trashButton.addEventListener("click", () => {
        deletePage();
    });
};

document.getElementById("btn").addEventListener("click", createNote);

const searchPage = (searchTerm) => {
    const pagesContainer = document.getElementById("pages-container");
    const pageOptions = pagesContainer.querySelectorAll(".page-option");

    pageOptions.forEach((pageOption) => {
        const pageTitle = pageOption.textContent.toLowerCase();
        if (pageTitle.includes(searchTerm.toLowerCase())) {
            pageOption.style.display = "block";
        } else {
            pageOption.style.display = "none";
        }
    });
};

const settingsIcon = document.getElementById("settings-icon");
const settingsOptions = document.getElementById("settings-options");

settingsIcon.addEventListener("click", () => {
    settingsOptions.style.display = settingsOptions.style.display === "none" ? "flex" : "none";
});

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll(".sidebar, .sidebar .title, .sidebar i, .right, .note, .note h3, .note-content, .save-button, .delete-button").forEach((element) => {
        element.classList.toggle("dark-mode");
    });

    // Change page title color in dark mode for the notes section
    const pageTitles = document.querySelectorAll(".note h3");
    pageTitles.forEach(title => {
        if (document.body.classList.contains("dark-mode")) {
            title.style.color = "#ddd"; // Lighter color for readability
        } else {
            title.style.color = ""; // Reset to default
        }
    });

    // Change page title color in dark mode for the "Add a Page" section (aside)
    const pageOptions = document.querySelectorAll(".page-option");
    pageOptions.forEach(pageOption => {
        if (document.body.classList.contains("dark-mode")) {
            pageOption.style.color = "#ddd"; // Lighter color for readability
        } else {
            pageOption.style.color = ""; // Reset to default
        }
    });
};


const fontThemeSelector = document.createElement("select");
fontThemeSelector.classList.add("font-theme-selector");
const themes = ["Default", "Serif", "Monospace", "Large Text", "High Contrast"];
themes.forEach(theme => {
    const option = document.createElement("option");
    option.value = theme;
    option.textContent = theme;
    fontThemeSelector.appendChild(option);
});
fontThemeSelector.addEventListener("change", (event) => {
    document.body.classList.remove(...themes.map(t => t.toLowerCase().replace(" ", "-")));
    document.body.classList.add(event.target.value.toLowerCase().replace(" ", "-"));
});
document.body.prepend(fontThemeSelector);