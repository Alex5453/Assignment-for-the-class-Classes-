"use strict";

// Базовый класс печатного издания
class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  fix() {
    this.state = this._state * 1.5;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  get state() {
    return this._state;
  }
}

// Наследники PrintEditionItem
class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

// Класс библиотеки
class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const book = this.books.find((item) => item[type] === value);
    return book || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.name === bookName);
    if (index === -1) {
      return null;
    }
    return this.books.splice(index, 1)[0];
  }
}



// Тестирование
const library = new Library("Районная библиотека");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);

library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);

library.addBook(
  new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138)
);

library.addBook(new Magazine("Мурзилка", 1924, 60));

// Поиск
console.log(library.findBookBy("name", "Властелин колец")); // null
console.log(library.findBookBy("releaseDate", 1924).name);  // "Мурзилка"

// Выдача
console.log("Книг до выдачи: " + library.books.length); // 4
const book = library.giveBookByName("Машина времени");
console.log("Книг после выдачи: " + library.books.length); // 3

// Повреждение и восстановление книги
book.state = 10;
console.log("Состояние до восстановления: " + book.state); // 10
book.fix();
console.log("Состояние после восстановления: " + book.state); // 15

// Попытка вернуть в библиотеку (не добавится, т.к. состояние < 30)
library.addBook(book);
console.log("Книг после попытки вернуть повреждённую: " + library.books.length); // всё ещё 3

// Допустим, полностью восстановили
book.state = 100;
library.addBook(book);
console.log("Книг после повторной попытки вернуть: " + library.books.length); // 4