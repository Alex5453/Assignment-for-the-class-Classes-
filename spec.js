describe("Классы цифровой библиотеки", function () {

  describe("Класс Book и его наследники", function () {
    it("должен корректно создавать экземпляр Book", function () {
      const book = new Book("Автор", "Название", 2020, 300);
      expect(book.author).toBe("Автор");
      expect(book.name).toBe("Название");
      expect(book.releaseDate).toBe(2020);
      expect(book.pagesCount).toBe(300);
      expect(book.type).toBe("book");
    });

    it("должен корректно устанавливать тип для NovelBook", function () {
      const novel = new NovelBook("Автор", "Роман", 1999, 250);
      expect(novel.type).toBe("novel");
    });

    it("должен корректно устанавливать тип для FantasticBook", function () {
      const fantasy = new FantasticBook("Автор", "Фантастика", 2001, 400);
      expect(fantasy.type).toBe("fantastic");
    });

    it("должен корректно устанавливать тип для DetectiveBook", function () {
      const detective = new DetectiveBook("Автор", "Детектив", 1990, 150);
      expect(detective.type).toBe("detective");
    });
  });

  describe("Метод fix()", function () {
    it("должен улучшать состояние книги в 1.5 раза, но не больше 100", function () {
      const book = new Book("Автор", "Название", 2020, 300);
      book.state = 40;
      book.fix();
      expect(book.state).toBe(60);

      book.state = 90;
      book.fix();
      expect(book.state).toBe(100); // не превышает максимум
    });
  });

  describe("Класс Library", function () {
    let library;
    let book1, book2;

    beforeEach(function () {
      library = new Library("Тестовая библиотека");
      book1 = new Book("Автор 1", "Книга 1", 2000, 200);
      book2 = new Book("Автор 2", "Книга 2", 2010, 150);
    });

    it("должен добавлять книги с состоянием больше 30", function () {
      book1.state = 80;
      library.addBook(book1);
      expect(library.books.length).toBe(1);
    });

    it("не должен добавлять книги с состоянием 30 и ниже", function () {
      book2.state = 25;
      library.addBook(book2);
      expect(library.books.length).toBe(0);
    });

    it("должен находить книгу по типу и значению", function () {
      library.addBook(book1);
      const found = library.findBookBy("name", "Книга 1");
      expect(found).toBe(book1);
    });

    it("должен возвращать null, если книга не найдена", function () {
      const result = library.findBookBy("author", "Неизвестный");
      expect(result).toBeNull();
    });

    it("должен выдавать книгу по имени и удалять её из библиотеки", function () {
      library.addBook(book1);
      const givenBook = library.giveBookByName("Книга 1");
      expect(givenBook).toBe(book1);
      expect(library.books.length).toBe(0);
    });

    it("должен возвращать null, если книга для выдачи не найдена", function () {
      const result = library.giveBookByName("Неизвестная");
      expect(result).toBeNull();
    });
  });

});
