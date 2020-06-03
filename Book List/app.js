class Book {
    constructor(title, author, isbn, classificacao) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.classificacao = classificacao;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><div class="stars-outer">
      <div class="stars-inner"></div>
     </div>
    <span class="number-rating">${book.classificacao}</span></td>
      <td>${book.isbn}</td>
      
      <td><a href="#" class="delete">X<a></td>
      
    `;
        //Classificação
        //rating primario
        const firstRating = 5;
        const ratingControl = document.getElementById('rating-control');

        list.appendChild(row);
    }

    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        document.getElementById('rating-control').value = '';
    }
    getRatings(rating) {
        // Get percentage
        const starPercentage = (rating / 5) * 100;
        console.log(starPercentage);

        // Round to nearest 10
        const starPercentageRounded = `${
            Math.round(starPercentage / 10) * 10
        }%`;

        // Set width of stars-inner to percentage
        document.querySelector(
            `.stars-inner`
        ).style.width = starPercentageRounded;

        // Add number rating
        document.querySelector(`.number-rating`).innerHTML = rating;
        // console.log(rating);
    }
}

// Local Storage Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function (book) {
            const ui = new UI();

            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

    //add função das classificações no local storage
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value,
        classificacao = document.getElementById('rating-control').value;

    // Instantiate book
    const book = new Book(title, author, isbn, classificacao);

    // Instantiate UI
    const ui = new UI();

    console.log(ui);

    // Validate
    if (title === '' || author === '' || isbn === '' || classificacao === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //classificação

        const rating = classificacao;
        console.log(rating);
        // Make sure 5 or under
        if (rating > 5) {
            alert('Please rate 1 - 5');
            return;
        }

        // Add book to list
        ui.addBookToList(book);

        // Add to LS
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();

        ui.getRatings(rating);
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    //Instantiate UI
    const ui = new UI();

    //delete book
    ui.deleteBook(e.target);

    //Remove from LC
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //aqui provavelmente ta apagando o isbn

    //show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault;
});

//get ratings
// function getRatings(rating) {
//     // Get percentage
//     const starPercentage = (rating / 5) * 100;
//     console.log(starPercentage);

//     // Round to nearest 10
//     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

//     // Set width of stars-inner to percentage
//     document.querySelector(`.stars-inner`).style.width = starPercentageRounded;

//     // Add number rating
//     document.querySelector(`.number-rating`).innerHTML = rating;
//     // console.log(rating);
// }
