var myLibrary = []; // array to store book objects
var currentLibrary = []; // keeps current state of shown library (all, read or not etc.)
// var isList = false; // should book view be shown as list or as set of cards (default)

// book object constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.dateAdded = Date.now() // used as an id
    this.isRead = false;
}

// deep copy of array
function arrayDeepCopy(arrayToCopy) {
    return JSON.parse(JSON.stringify(arrayToCopy));
}

// save library to localStorage
function saveLibrary() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

// read library from localStorage
function readLibrary() {
    myLibrary = JSON.parse(localStorage.getItem("library"));
    if (! myLibrary) {
        myLibrary = [];
    };
}

// add book to the library
function addBookToLibrary(title, author, pages) {
    myLibrary.push(new Book(title, author, pages));
    saveLibrary();
    currentLibrary = arrayDeepCopy(myLibrary);
    currentLibrary = sortByTitle(currentLibrary);
    clearBooksList();
    fillBooksList(currentLibrary);
}

// // create book line element
// function createBookLineElement(book) {
//     let bookList = document.getElementById("book-list");
//     let bookLine = document.createElement("div");
//     bookLine.classList.add("book-element");
//     bookLine.classList.add("line");
//     bookLine.setAttribute("id", book.dateAdded);
//     bookList.appendChild(bookLine);
//     let bookDescription = `"${book.title}" by ${book.author}, ${book.pages} pages, ${book.isRead ? "read already" : "not read yet"}`;
//     let para = document.createElement("p");
//     para.innerText = bookDescription;
//     bookLine.appendChild(para);

//     // add "Mark as read", "Edit" and "Remove" buttons
//     const markReadButton = document.createElement("button");
//     markReadButton.classList.add("mark-read-button");
//     markReadButton.setAttribute("id", ("mark-read-" + book.dateAdded));
//     markReadButton.innerText = "Mark as read";
//     bookLine.appendChild(markReadButton);
//     markReadButton.addEventListener("click", (e) => {
//         let bookId = getBookId(e.target.id);
//         for (let i = 0; i < myLibrary.length; i++) {
//             if (myLibrary[i].dateAdded.toString() === bookId) {
//                 myLibrary[i].isRead = true;
//                 saveLibrary();
//                 clearBooksList();
//                 currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
//                 fillBooksList(currentLibrary);
//                 break;
//             };
//         };
//     })

//     const editButton = document.createElement("button");
//     editButton.classList.add("edit-button");
//     editButton.setAttribute("id", ("edit-" + book.dateAdded));
//     editButton.innerText = "Edit book";
//     bookLine.appendChild(editButton);
//     editButton.addEventListener("click", (e) => {
//         let editDialog = document.getElementById("edit-book-dialog");
//         editDialog.showModal();
//         editTitle = document.getElementById("edit-title");
//         editTitle.value = book.title;
//         editAuthor = document.getElementById("edit-author");
//         editAuthor.value = book.author;
//         editPages = document.getElementById("edit-pages");
//         editPages.value = book.pages;
//         editNotRead = document.getElementById("edit-not-read");
//         editRead = document.getElementById("edit-read");
//         if (book.isRead === true) {
//             editRead.setAttribute("checked", "checked");
//         } else {
//             editNotRead.setAttribute("checked", "checked");
//         };
//         let editCancelBtn = document.getElementById("cancel-edit");
//         editCancelBtn.addEventListener("click", () => {
//             editDialog.close();
//         });
//         let editSaveBtn = document.getElementById("save-edit");
//         editSaveBtn.addEventListener("click", () => {
//             for (let i = 0; i < myLibrary.length; i++) {
//                 if (myLibrary[i].dateAdded === book.dateAdded) {
//                     myLibrary[i].title = editTitle.value;
//                     myLibrary[i].author = editAuthor.value;
//                     myLibrary[i].pages = editPages.value;
//                     if (editRead.checked === true) {
//                         myLibrary[i].isRead = true;
//                     } else {
//                         myLibrary[i].isRead = false;
//                     };
//                     saveLibrary();
//                     clearBooksList();
//                     currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
//                     fillBooksList(currentLibrary);
//                     editDialog.close();
//                     break;
//                 };
//             };
//         });
//     })


//     const removeButton = document.createElement("button");
//     removeButton.classList.add("remove-button");
//     removeButton.setAttribute("id", ("remove-" + book.dateAdded));
//     removeButton.innerText = "Remove book";
//     bookLine.appendChild(removeButton);
//     removeButton.addEventListener("click", (e) => {
//         let removeBookDialog = document.getElementById("remove-book-dialog");
//         removeBookDialog.showModal();
//         let removeBookNoBtn = document.getElementById("remove-book-no");
//         let removeBookYesBtn = document.getElementById("remove-book-yes");
//         removeBookNoBtn.addEventListener("click", () => {
//             removeBookDialog.close();
//         });
//         removeBookYesBtn.addEventListener("click", (e) => {
//             for (let i = 0; i < myLibrary.length; i++) {
//                 if (myLibrary[i].dateAdded.toString() === bookLine.id) {
//                     myLibrary.splice(i, 1);
//                     saveLibrary();
//                     clearBooksList();
//                     currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
//                     fillBooksList(currentLibrary);
//                     removeBookDialog.close();
//                     break;
//                 };
//             };
//             })
//     })
// }

// create book card element
function createBookCardElement(book) {
    let bookList = document.getElementById("book-list");
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-element");
    bookCard.classList.add("card");
    bookCard.setAttribute("id", book.dateAdded);
    bookCard.innerHTML = `<p><span>Title: </span>"${book.title}"</p>
        <p><span>Author: </span>${book.author}</p>
        <p><span>Pages: </span>${book.pages}</p>
        <p><span>${book.isRead ? "read already" : "not read yet"}</span></p>`
    bookList.appendChild(bookCard);

    // add "Mark as read", "Edit" and "Remove" buttons
    const markReadButton = document.createElement("button");
    markReadButton.classList.add("mark-read-button");
    markReadButton.setAttribute("id", ("mark-read-" + book.dateAdded));
    markReadButton.innerText = "Mark as read";
    bookCard.appendChild(markReadButton);
    markReadButton.addEventListener("click", (e) => {
        let bookId = getBookId(e.target.id);
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].dateAdded.toString() === bookId) {
                myLibrary[i].isRead = true;
                saveLibrary();
                clearBooksList();
                currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
                fillBooksList(currentLibrary);
                break;
            };
        };
    })
    
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.setAttribute("id", ("edit-" + book.dateAdded));
    editButton.innerText = "Edit book";
    bookCard.appendChild(editButton);
    editButton.addEventListener("click", (e) => {
        let editDialog = document.getElementById("edit-book-dialog");
        editDialog.showModal();
        editTitle = document.getElementById("edit-title");
        editTitle.value = book.title;
        editAuthor = document.getElementById("edit-author");
        editAuthor.value = book.author;
        editPages = document.getElementById("edit-pages");
        editPages.value = book.pages;
        editNotRead = document.getElementById("edit-not-read");
        editRead = document.getElementById("edit-read");
        if (book.isRead === true) {
            editRead.setAttribute("checked", "checked");
        } else {
            editNotRead.setAttribute("checked", "checked");
        };
        let editCancelBtn = document.getElementById("cancel-edit");
        editCancelBtn.addEventListener("click", () => {
            editDialog.close();
        });
        let editSaveBtn = document.getElementById("save-edit");
        editSaveBtn.addEventListener("click", () => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].dateAdded === book.dateAdded) {
                    myLibrary[i].title = editTitle.value;
                    myLibrary[i].author = editAuthor.value;
                    myLibrary[i].pages = editPages.value;
                    if (editRead.checked === true) {
                        myLibrary[i].isRead = true;
                    } else {
                        myLibrary[i].isRead = false;
                    };
                    saveLibrary();
                    clearBooksList();
                    currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
                    fillBooksList(currentLibrary);
                    editDialog.close();
                    break;
                };
            };
        });
    })
    
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("id", ("remove-" + book.dateAdded));
    removeButton.innerText = "Remove book";
    bookCard.appendChild(removeButton);
    removeButton.addEventListener("click", (e) => {
        let removeBookDialog = document.getElementById("remove-book-dialog");
        removeBookDialog.showModal();
        let removeBookNoBtn = document.getElementById("remove-book-no");
        let removeBookYesBtn = document.getElementById("remove-book-yes");
        removeBookNoBtn.addEventListener("click", () => {
            removeBookDialog.close();
        });
        removeBookYesBtn.addEventListener("click", (e) => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].dateAdded.toString() === bookCard.id) {
                    myLibrary.splice(i, 1);
                    saveLibrary();
                    clearBooksList();
                    currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
                    fillBooksList(currentLibrary);
                    removeBookDialog.close();
                    break;
                };
            };
            })
    })
}

// fill books list depending on isList
function fillBooksList(library) {
    for (let book of library) {
        createBookCardElement(book);
    };
}

// clear books list
function clearBooksList() {
    let elements = document.querySelectorAll(".book-element");
    for (let elem of elements) {
        elem.remove();
    };
}

// show not read books
function showNotRead() {
    clearBooksList();
    currentLibrary = sortByTitle(myLibrary.filter((book) => !book.isRead));
    fillBooksList(currentLibrary);
}

// show read already books
function showRead() {
    clearBooksList();
    currentLibrary = sortByTitle(myLibrary.filter((book) => book.isRead));
    fillBooksList(currentLibrary);
}

// remove all books (clear the library)
function removeLibrary() {
    myLibrary = [];
    currentLibrary = arrayDeepCopy(myLibrary);
    localStorage.clear();
}

// sort library by title
function sortByTitle(library) {
    return library.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        };
        return 0;
    });
}

// sort library by author
function sortByAuthor(library) {
    return library.sort((a, b) => {
        if (a.author.toLowerCase() > b.author.toLowerCase()) {
            return 1;
        } else if (a.author.toLowerCase() < b.author.toLowerCase()) {
            return -1;
        };
        return 0;
    });
}

// sort by time of adding (new first)
function sortNewFirst(library) {
    return library.sort((a, b) => {
        return b.dateAdded - a.dateAdded;
    });
}

// sort by time of adding (old first)
function sortOldFirst(library) {
    return library.sort((a, b) => {
        return a.dateAdded - b.dateAdded;
    });    
}

readLibrary();
currentLibrary = arrayDeepCopy(myLibrary);
currentLibrary = sortByTitle(currentLibrary);
clearBooksList();
fillBooksList(currentLibrary);

// add event listeners to buttons
const allBooksBtn = document.getElementById("all-books");
const notReadBtn = document.getElementById("not-read");
const readAlreadyBtn = document.getElementById("read-already");
const removeAllBtn = document.getElementById("remove-all");

allBooksBtn.addEventListener("click", () => {
    clearBooksList();
    currentLibrary = sortByTitle(arrayDeepCopy(myLibrary));
    fillBooksList(currentLibrary);
});

notReadBtn.addEventListener("click", () => {
    showNotRead();
});

readAlreadyBtn.addEventListener("click", () => {
    showRead();
});

removeAllBtn.addEventListener("click", () => {
    let removeAllDialog = document.getElementById("remove-dialog");
    let removeYesBtn = document.getElementById("remove-yes");
    let removeNoBtn = document.getElementById("remove-no");
    removeAllDialog.showModal();
    removeYesBtn.addEventListener("click", () => {
        clearBooksList();
        removeLibrary();
        removeAllDialog.close();
    });
    removeNoBtn.addEventListener("click", () => {
        removeAllDialog.close();
    })  
})

// //add event listeners to view options
// const viewOption = document.getElementById("view");
// viewOption.addEventListener("change", (e) => {
//     clearBooksList();
//     if (e.target.value === "cards") {
//         isList = false;
//     } else {
//         isList = true;
//     };
//     fillBooksList(currentLibrary);
// });

// add event listener to sorting options
const sortOption = document.getElementById("sort");
sortOption.addEventListener("change", (e) => {
    switch (e.target.value) {
        case "title":
            currentLibrary = sortByTitle(currentLibrary);
            break;
        case "author":
            currentLibrary = sortByAuthor(currentLibrary);
            break;
        case "new":
            currentLibrary = sortNewFirst(currentLibrary);
            break;
        case "old":
            currentLibrary = sortOldFirst(currentLibrary);
            break;
    };
    clearBooksList();
    fillBooksList(currentLibrary);
});

// add event listener to "Add a new book" button
const addNewBook = document.getElementById("add-new");
addNewBook.addEventListener("click", () => {
    let addNewDialog = document.getElementById("add-new-dialog");
    let cancelButton = document.getElementById("cancel-new");
    let saveButton = document.getElementById("save-new");
    addNewDialog.showModal();
    cancelButton.addEventListener("click", () => {
        addNewDialog.close();
    });
    saveButton.addEventListener("click", () => {
        let newTitle = document.getElementById("new-title");
        let newAuthor = document.getElementById("new-author");
        let newPages = document.getElementById("new-pages");
        addBookToLibrary(newTitle.value, newAuthor.value, Math.floor(newPages.value));
        addNewDialog.close();

        
    })
})

// get book id (dateAdded) from buttons
function getBookId(elementId) {
    return elementId.match(/[0-9]/g).join("");
}


