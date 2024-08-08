/*Задание 1
Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
Реализуйте геттер allBooks, который возвращает текущий список книг.
Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.*/
class Books {
  #books = [];
  // конструктор
  constructor(books) {
    try {
      if (books.length !== (new Set(books)).size) {
        throw new Error ('В списке есть дубликаты!');
      }
      this.#books = books;
    } catch (error) {
      console.log(error.message);
    } 
  }
  // возвращает текущий список книг
  get allBooks() {
    return this.#books;
  }
  // проверить наличие книги в библиотеке
  hasBook(title) {
    return this.#books.includes(title) ? true : false;
  }
  // добавить книгу в список
  addBook(title) {
    try {
      if (this.#books.includes(title)) {
        throw new Error ('Такая книга уже есть в библиотеке.')
      }
      this.#books.push(title);
      return this.#books;
    } catch (error) {
      console.log(error.message);
    }
  }
  // удалить книгу из списка
  removeBook(title) {
    try {
      if (!this.#books.includes(title)) {
        throw new Error ('Такой книги в библиотеке нет.')
      }
      const index = this.#books.findIndex((book) => book === title);
      this.#books.splice(index,1);
      console.log(`Книга ${title} удалена.`);
      return this.#books;
    } catch (error) {
      console.log(error.message);
    }
  }
  // показать весь список книг
  print() {
    if(this.#books.length === 0) { 
      console.log('Книг нет.');
    } else {
      console.log('Список книг библиотеки:');
    this.#books.forEach((el) => {
      console.log(el);
    });
    }
  }
}

const books1 = new Books;
books1.addBook('Повести Белкина');
books1.addBook('Сказки');
books1.addBook('Роман в письмах');
books1.addBook('Руслан и Людмила');
books1.addBook('Руслан и Людмила');
books1.print();

console.log('Применение геттера');
const arr = books1.allBooks;
console.log(arr);
//создаём объект через конструктор (с дубликатами)
const books2 = ['1984', 'Мёртвая зона', 'Оно', 'Куджо', 'Мизери', '1984'];
const books3 = new Books(books2);
books3.print();
// создаём объект через конструктор (без дубликатов)
const books4 = ['1984', 'Мёртвая зона', 'Оно', 'Куджо', 'Мизери'];
const books5 = new Books(books4);
books5.print();
// удаление книги
books5.removeBook('1984');
books5.print();
// удаление книги, которой нет в списке
books5.removeBook('Сказки');
books5.print();