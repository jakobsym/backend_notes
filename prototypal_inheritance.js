/* Common Design Patterns */

// - Prototypal Inheritance -
// Recommended method ( Prototypal Inheritance ):
// A Person is a Player
function Person (name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log("Hello, Im %s\n", this.name);
}

function Player (name, age){
    this.name = name;
    this.age = age;
}

Player.prototype.getAge = function () {
    console.log("My age is %d", this.age);
}

// Make 'Player' inherits from 'Person'
Object.setPrototypeOf(Player.prototype, Person.prototype);
// Accessing an objects 'prototype':
Object.getPrototypeOf(Player.prototype); // should return 'Person.prototype'

const player1 = new Player('Ron', 23);
const player2 = new Player('Lisa', 22);

// 'Person' specific method, being accessed by 'Player' objects thanks to Prototypal Inheritance
console.log(player1.sayName());
console.log(player2.sayName());

console.log(player1.getAge());
console.log(player2.getAge());



// Object Constructor practice:
function Book (title, author, pageNum, bookRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.bookRead = bookRead;
    this.bookReport = function() {
        if (bookRead){
            console.log(title + " by " + author + ", "  + pageNum + " pages, " + "already read.");
        }
        else{
            console.log(title + " by " + author + ", "  + pageNum + " pages, " + "not read yet.");
        }
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const lotr = new Book("Lord of the Rings", "J.R.R. Tolkien", 400, false);

theHobbit.bookReport();
lotr.bookReport();