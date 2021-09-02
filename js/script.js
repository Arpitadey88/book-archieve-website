const searchResult = document.getElementById('search-result');
const bookContainer = document.getElementById('book-container');
const searchField = document.getElementById('search-field');
const showError = document.getElementById('error');
const spinner = document.getElementById("spinner");

const loadBooks = () => {
    fetch("https://openlibrary.org/search.json?q=book")
        .then(res => res.json())
        .then(data => showBooks(data.docs));
}
loadBooks();
const showBooks = (books) => {
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('col-md-3');
        bookDiv.innerHTML = `
                   <div class="card h-100 shadow rounded-2 border border-2">
                        <div class="card-body">
                            <img width ="200px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="Image Not Found">
                            <h3>${book.title}</h3>
                        </div>
                        <div class="card-footer">
                            <button class="li-bg px-3 text-center">Read</button> 
                        </div>
                    </div>
        `;
        bookContainer.appendChild(bookDiv);
    });
}

const searchBook = () => {
    const searchText = searchField.value;
    if (searchText === "") {
        showError.innerText = "Search field can not be empty!!";
        return;
    }
    else {
        showError.innerText = "";
    }
    // clear input data
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    spinner.classList.remove("d-none");

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            // Setting a timer of 1.5s,
            setTimeout(() => {
                spinner.classList.add("d-none");
                showBookResult(data.docs);
            }, 1500);
        })
}

const showBookResult = books => {

    if (books.length == 0) {
        showError.innerText = "No Result Found!!"
    }
    bookContainer.innerHTML = '';
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('col');
        bookDiv.innerHTML = `
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="Image Not Found">
                    <div class="card-body">
                        <h5>${book.title}</h5>
                        <p>Author Name: ${book.author_name[0]}</p>
                        <p>Publisher:${book.publisher[0]}</p>
                        <p>First Publish Date:${book.first_publish_year}</p>
                        <p>Result Found: ${books.length}</p>  
                    </div>
                    <div class="card-footer">
                        <button class="li-bg">Details</button>
                    </div>
                </div>
                `;
        searchResult.appendChild(bookDiv);
        if (books.length > 0) {
            document.getElementById('total-result').innerText = `Found ${books.length} Books`;
        }
    })
}

