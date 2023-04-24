// Java Script document 

let books = [];  //Creates an empty array that stores all the Books objects created.

let title = document.querySelector('#title');  //selects the id title and creates variable 
let author = document.querySelector('#author'); //selects the id author and creates variable 
let genre = document.querySelector('#genre');   //selects the id genre and creates variable 
let addButton = document.querySelector('#addBtn')  //selects the id addBtn and creates variable 
let bookListTable = document.querySelector('#bookListTable') //selects the id bookListTable and creates variable 


//buttons variables
let editBtn = "<button class = 'edit'> Edit </button>"  
let deleteBtn = "<button class = 'delete'> Delete </button>"
let updateBtn = "<button class = 'update' onclick='updateBook(event)'> Update </button>" //an update button onclick calls updateBook function within an event parametr 


/* When the page loads, it checks whether it is the first time we this page is loaded or not. If it is the first time,
it initialises the values to store in sessionStorage. If it is not the
first time, then it gets the books text file from session storage and makes an array to add information 
about each book object to our HTML page. */

function displayList() {
    bookListTable.innerHTML = "";
    bookListTable.style.visibility = "hidden";

    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("books", JSON.stringify(books));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        books = JSON.parse(sessionStorage.getItem("books"));//Get the array of book objects from sessionStorage and assign it to the array 'books'
        let i = 0;
        books.forEach(function (b) {//Loop through each book (b) in the books array
            /*For each books in the array create a tr element that displays 
            that books's title, author and genre and add it to the tbody element on the HTML page */
            let row = document.createElement('tr');
            row.innerHTML = `
            <td>${b.title}</td>
            <td>${b.author}</td>
            <td>${b.genre}</td>
            <td>${deleteBtn}</td>
            <td>${editBtn}</td>
            `;
            bookListTable.appendChild(row);
            row.value = i;
            i = i + 1;
        });
        if (i > 0) {//Only make the select element visible once there is at least one book object added that the user can select.
            bookListTable.style.visibility = "visible";
        }
    }
}

// Book object constructor 
function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
}

//addButton listener with callback function which creates Book object  
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    JSON.parse(sessionStorage.getItem("books"));
    let newBook = new Book(
        title.value,
        author.value,
        genre.value
    );
    books.push(newBook);
    sessionStorage.setItem("books", JSON.stringify(books)); //stringifies JSON from the books array and stores it at sessionStorage
    displayList(); //calls displayList function 
})

bookListTable.addEventListener("click", (event) => {    //bookListTable click listener with callback function
    if (event.target.className === 'delete') {             //if class name is delete 
        event.target.parentElement.parentElement.style.display = "none"  //hide the whole row  
        let index = event.target.parentElement.parentElement.value;      //makes variable with particular row value
        books.splice(index, 1); //slices particular book object from the books array
        sessionStorage.setItem("books", JSON.stringify(books)); //stringifies JSON from the books array and stores it at sessionStorage
        displayList(); //calls displayList function 
    }

    if (event.target.className === 'edit') {   //If the event’s tag name is an edit class name tag,
        //changes innerHTML of each cell in a row to an input element with value of the particular row
        event.target.parentElement.parentElement.childNodes[1].innerHTML = `<input id = "newTitle"></input>`
        event.target.parentElement.parentElement.childNodes[3].innerHTML = `<input id = "newAuthor"></input>`
        event.target.parentElement.parentElement.childNodes[5].innerHTML = `<input id = "newGenre"></input>`

        //changes delete button for update batton
        event.target.parentElement.parentElement.childNodes[7].innerHTML = updateBtn;
        //removes edit button
        event.target.parentElement.style.display = "none";
    }
})

//the following function gets infrormation from the edit inputs and rewrite the particular book object with new values 
function updateBook(event) {
    let newTitle = document.querySelector("#newTitle") //selects the id newTitle and creates variable 
    let newAuthor = document.querySelector("#newAuthor") //selects the id newAuthor and creates variable 
    let newGenre = document.querySelector("#newGenre") //selects the id newGenre and creates variable 
    let index = event.target.parentElement.parentElement.value; 
    books[index].title = newTitle.value;
    books[index].author = newAuthor.value;
    books[index].genre = newGenre.value;
    sessionStorage.setItem("books", JSON.stringify(books)); //stringifies JSON from the books array and stores it at sessionStorage
    displayList(); //calls displayList function 
}






