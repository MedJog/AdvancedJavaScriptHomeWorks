/*Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.
• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:
{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска"
}
• Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
• Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)*/
console.log("Задание 1.");
const musicCollection = {
  albums: [
    { title: "Hybrid Theory", artist: "Linkin Park", year: "2000" },
    { title: "Internal Wrangler", artist: "Clinic", year: "2000" },
    { title: "200 по встречной", artist: "Тату", year: "2001" },
    { title: "Hot Fuss", artist: "The killers", year: "2004" },
    { title: "Good girl gone bad", artist: "Rihanna", year: "2007" },
  ],
};

musicCollection[Symbol.iterator] = function () {
  const array = this.albums;
  let current = 0;
  return {
    next() {
      if (current < array.length) {
        return { value: array[current++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};
for (const albums of musicCollection) {
  console.log(
    `Название альбома: ${albums.title}. Исполнитель: ${albums.artist} (${albums.year}).`
  );
}
/*Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда. Необходимо создать систему управления этими заказами, которая позволит:
• Отслеживать, какой повар готовит какое блюдо.
• Записывать, какие блюда заказал каждый клиент.
Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.
Повара и их специализации:
Виктор - специализация: Пицца.
Ольга - специализация: Суши.
Дмитрий - специализация: Десерты.
Блюда и их повара:
Пицца "Маргарита" - повар: Виктор.
Пицца "Пепперони" - повар: Виктор.
Суши "Филадельфия" - повар: Ольга.
Суши "Калифорния" - повар: Ольга.
Тирамису - повар: Дмитрий.
Чизкейк - повар: Дмитрий.
Заказы:
Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
Клиент Ирина заказала: Чизкейк. */
// повара  и их специализация
const kitchen = new Map();
kitchen.set("Пицца", "Виктор");
kitchen.set("Суши", "Ольга");
kitchen.set("Десерт", "Дмитрий");
// список блюд для заказа
const dishes = [
  "Пицца Маргарита",
  "Пицца Пепперони",
  "Суши Филадельфия",
  "Суши Калифорния",
  "Десерт Тирамису",
  "Десерт Чизкейк",
];
// список клиентов
const clients = [
  { name: "Алексей" },
  { name: "Мария" },
  { name: "Ирина" },
  { name: "Татьяна" },
  { name: "Артём" },
  { name: "Василий" },
];

// рандомное число от 0 до 5 (случайный выбор для блюда и клиента)
function randomInt() {
  return Math.floor(Math.random() * 6);
}
// функция для формирования списка заказов
function getOrderList(number) {
  const orders = new Map();
  for (let count = 0; count < number; count++) {
    orders.set(clients[randomInt()], dishes[randomInt()]);
  }
  return orders;
}
// функция для получения информации о поваре
function getCookName(dish) {
  if (dish.includes("Пицца")) {
    cook = kitchen.get("Пицца");
  } else if (dish.includes("Суши")) {
    cook = kitchen.get("Суши");
  } else if (dish.includes("Десерт")) {
    cook = kitchen.get("Десерт");
  }
  return cook;
}
// функция для вывода информации о заказах
function showOrders(orders) {
  orders.forEach((dishes, client) => {
    let cookName = getCookName(dishes);
    console.log(`Клиент: ${client.name} заказал ${dishes}. Повар: ${cookName}.`);
  });
}
console.log("Задание 2.");
const newOrders = getOrderList(5);
showOrders(newOrders);
