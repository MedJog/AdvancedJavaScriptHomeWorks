/* Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их. Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.*/
const initialData = [
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
const productSelect = document.querySelector('.select')
const inputEl = document.querySelector('.review-input');
const buttonEl = document.querySelector('.button');
const reviewsContainer = document.querySelector('.reviews-container');


// функция для добавления отзыва
function addReview(productName, reviewText) {
  if (reviewText.length < 50 || reviewText.length > 500) {
      throw new Error("Отзыв содержит менее 50 или более 500 символов!");
}
// Найти продукт по названию и добавить отзыв
const product = initialData.find(p => p.product === productName);
if (product) {
    const newReview = {
        id: (product.reviews.length + 1).toString(),
        text: reviewText
    };
    product.reviews.push(newReview);
    return newReview;
} else {
    throw new Error("Продукт не найден.");
}
}
// Обработчик клика на кнопку отправки
buttonEl.addEventListener('click', () => {
  // const reviewInput = document.getElementById('review-input');
  const reviewText = inputEl.value.trim();
  try {
      // добавим отзыв к продукту, который выберем из списка
      const productName = productSelect.value; //  это выбранный продукт
      const newReview = addReview(productName, reviewText);
      displayReviews();
      inputEl.value = ''; // Очистить поле ввода
  } catch (error) {
    console.log(error.message); // Показываем сообщение об ошибке
  }
});

// Функция для отображения отзывов
function displayReviews() {
  reviewsContainer.innerHTML = ''; // Очистить контейнер
// перебираем массив объектов
  initialData.forEach(product => {
      const productElement = document.createElement('div'); // создаём блок для названия продукта (телефона)
      productElement.className = 'product'; // присваиваем класс
      productElement.textContent = product.product; // добавляем контент
      reviewsContainer.appendChild(productElement); // добавляем элемент в контейнер с отзывами
// перебираем отзывы на продукт
      product.reviews.forEach(review => {
          const reviewElement = document.createElement('div'); // создаём блок для текста отзыва 
          reviewElement.className = 'review'; // присваиваем класс
          reviewElement.textContent = review.text; // добавляем контент
          reviewsContainer.appendChild(reviewElement); // добавляем элемент в контейнер с отзывами
      });
  });
}

// Загрузка начальных данных при загрузке страницы
window.onload = displayReviews;
// displayReviews();

// buttonEl.addEventListener('click', function() {
//   try {
//     let inputText = inputEl.value.trim();
//     console.log(inputText);
//     console.log(typeof(inputText));
//     console.log(inputText.lenght);
//     if (inputText.lenght < 50 || inputText.lenght > 500) {
//       throw new Error('Отзыв содержит менее 50 или более 500 символов!')
//     }
//     reviewsEl.insertAdjacentHTML('beforeend', `<p class="text">${inputText}</p>`);
//     inputEl.value = '';
//   } catch (error) {
//     console.log(error.message);
//   }
// });