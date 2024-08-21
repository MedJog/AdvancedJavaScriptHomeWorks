/*Задание
Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.
Страница добавления отзыва:
Поле для ввода названия продукта.
Текстовое поле для самого отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.
Страница просмотра отзывов:
Показывает список всех продуктов, о которых были оставлены отзывы.
При клике на название продукта отображается список всех отзывов по этому продукту.
Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).*/

// чистим Local Storage
localStorage.clear();
// исходные данные - массив объектов
const initialReviews = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];
// Преобразование массива объектов в строку
const initialReviewsString = JSON.stringify(initialReviews);

// записываем исходные данные в Local Storage
localStorage.setItem('allReviews', initialReviewsString);

// находим элементы
const productNameSelect = document.querySelector(".select");
const inputField = document.querySelector(".review-input");
const buttonAddRewiew = document.querySelector(".button-add");
// контейнер для отзывов
const reviewsContainer = document.querySelector(".reviews-container");

// функция для добавления отзыва
function addReview(productName, reviewText) {
// забираем данные из Local Storage
const allReviews = JSON.parse(localStorage.getItem('allReviews'));
// Найти продукт по названию и добавить отзыв
const product = allReviews.find(p => p.product === productName);
if (product) {
    const newReview = {
        id: (product.reviews.length + 1).toString(),
        text: reviewText
    };
    product.reviews.push(newReview); // добавляем отзыв
    localStorage.clear();
    localStorage.setItem('allReviews',JSON.stringify(allReviews)); // перезапись в Local Storage
    alert('Ваш отзыв успешно добавлен!');
    return newReview;
} else {
    throw new Error("Продукт не найден.");
}
}
// Обработчик клика на кнопку отправки
buttonAddRewiew.addEventListener('click', () => {
  const reviewText = inputField.value.trim();
  try {
      // добавим отзыв к продукту, который выберем из списка
      const productName = productNameSelect.value; //  это выбранный продукт
      addReview(productName, reviewText);
      displayReviews();
      inputField.value = ''; // Очистить поле ввода
  } catch (error) {
    console.log(error.message); // Показываем сообщение об ошибке
  }
});

// Функция для отображения всех отзывов
function displayReviews() {
  reviewsContainer.innerHTML = ''; // Очистить контейнер
  // забираем данные из Local Storage
  const allReviews = JSON.parse(localStorage.getItem('allReviews'));
  // перебираем массив объектов
  allReviews.forEach((product) => {
    const productElement = document.createElement('div'); // создаём блок для всего продукта (телефона)
    productElement.className = 'product'; // присваиваем класс
    const productNameEl = document.createElement('h3'); // создаём блок для имени продукта (телефона)
    productNameEl.className = 'product-name'; // присваиваем класс
    productNameEl.textContent = product.product; // добавляем контент
    productElement.appendChild(productNameEl); // добавляем имя продукта в контейнер продукта
    reviewsContainer.appendChild(productElement); // добавляем элемент в контейнер с отзывами
    // перебираем отзывы на продукт
    product.reviews.forEach((review) => {
      const reviewElement = document.createElement('div'); // создаём блок для отзыва и кнопки удаления
      reviewElement.className = 'review'; // присваиваем класс

      const reviewTextEl = document.createElement('p'); // создаём парграф для текста отзыва 
      reviewElement.className = 'review-text'; // присваиваем класс
      reviewTextEl.textContent = review.text; // добавляем контент
      reviewElement.appendChild(reviewTextEl); // добавляем текст в блок для отзыва и кнопки

      const buttonRemoveReview = document.createElement('button'); // создаем кнопку для удаления отзыва
      buttonRemoveReview.textContent = 'Удалить отзыв'; // добавляем контент
      reviewElement.appendChild(buttonRemoveReview);  // добавляем кнопку удаления отзыва в блок для отзыва и кнопки
      productElement.appendChild(reviewElement); 
      // вешаем на кнопку событие удаление отзыва
      buttonRemoveReview.addEventListener('click', () => {
        console.log('отзыв удален');
      })
    });
  });
}
displayReviews();

