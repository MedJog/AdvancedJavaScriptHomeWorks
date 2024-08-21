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
  {
    product: "Motorolla",
    reviews: [],
  },
  {
    product: "Sony Ericsson",
    reviews: [],
  },
];
// Преобразование массива объектов в строку и запись исходных данных в Local Storage
localStorage.setItem("allReviews", JSON.stringify(initialReviews));

// находим элементы
const productNameSelect = document.querySelector(".select"); // выбор названия телефона
const inputField = document.querySelector(".review-input"); // поле ввода текста отзыва
const buttonAddRewiew = document.querySelector(".button-add"); // кнопка добавить отзыв
const reviewsContainer = document.querySelector(".reviews-container"); // контейнер для отзывов
const buttonShowProducts = document.querySelector(".button-show"); // кнопка списка товаров с отзывами
const listOfProducts = document.querySelector(".prducts-with-review"); // список продуктов с отзывами


// функция для добавления отзыва
function addReview(productName, reviewText) {
  if (reviewText.length < 1) {
    throw new Error("Отзыв содержит недостаточно символов!");
}
  const allReviews = JSON.parse(localStorage.getItem("allReviews")); // забираем данные из Local Storage
  const product = allReviews.find((p) => p.product === productName); // находим продукт по названию
  if (product) {
    // если продукт найден
    const newReview = {
      id: (product.reviews.length + 1).toString(),
      text: reviewText,
    };
    product.reviews.push(newReview); // добавляем отзыв
    localStorage.clear();
    localStorage.setItem("allReviews", JSON.stringify(allReviews)); // перезапись в Local Storage
    return newReview;
  } else {
    throw new Error("Продукт не найден.");
  }
}
// внешний вид - вывод отзыва на экран
function dysplayReview(product) {
  reviewsContainer.innerHTML = '';
  const productElement = document.createElement("div"); // создаём блок для всего продукта 
  productElement.className = "product"; // присваиваем класс
  const productNameEl = document.createElement("h3"); // создаём блок для имени продукта (телефона)
  productNameEl.className = "product-name"; // присваиваем класс
  productNameEl.textContent = product.product; // добавляем контент
  productElement.appendChild(productNameEl); // добавляем имя продукта в контейнер продукта
  reviewsContainer.appendChild(productElement); // добавляем элемент в контейнер с отзывами
  // перебираем отзывы на продукт
  product.reviews.forEach((review) => {
    const reviewElement = document.createElement("div"); // создаём блок для отзыва и кнопки удаления
    reviewElement.className = "review"; // присваиваем класс

    const reviewTextEl = document.createElement("p"); // создаём парграф для текста отзыва
    reviewElement.className = "review-text"; // присваиваем класс
    reviewTextEl.textContent = review.text; // добавляем контент
    reviewElement.appendChild(reviewTextEl); // добавляем текст в блок для отзыва и кнопки

    const buttonRemoveReview = document.createElement("button"); // создаем кнопку для удаления отзыва
    buttonRemoveReview.textContent = "Удалить отзыв"; // добавляем контент
    buttonRemoveReview.className = "delete-button"; // присваиваем класс
    reviewElement.appendChild(buttonRemoveReview); // добавляем кнопку удаления отзыва в блок для отзыва и кнопки
    productElement.appendChild(reviewElement);
    reviewsContainer.appendChild(productElement);
  });
}

// функция поиска  и показа продуктов с отзывами
function productsWithReviews() {
  listOfProducts.innerHTML = ""; // Очистить контейнер
  const allReviews = JSON.parse(localStorage.getItem("allReviews")); // забираем данные из Local Storage
  allReviews.forEach((product) => {
    if (product.reviews.length > 0) {
      const listProductEl = document.createElement("li"); // создаем элемент списка
      listProductEl.className = "product-name";
      listProductEl.textContent = product.product;
      listOfProducts.appendChild(listProductEl);
      //показать отзыв на данный продукт
      listProductEl.addEventListener("click", () => {
        dysplayReview(product);
      });
    }
  });
}

// Обработчик клика на кнопку отправки отзыва
buttonAddRewiew.addEventListener("click", () => {
  const reviewText = inputField.value.trim();
  try {
    // добавим отзыв к продукту, который выберем из списка
    const productName = productNameSelect.value; //  это выбранный продукт
    addReview(productName, reviewText);
    alert("Ваш отзыв успешно добавлен!");
    inputField.value = ""; // Очистить поле ввода
  } catch (error) {
    console.log(error.message); // Показываем сообщение об ошибке
  }
});
// обработчик клика на кнопку для показа списка продуктов с отзывами
buttonShowProducts.addEventListener("click", () => {
  productsWithReviews();
});
// удаление отзыва на продукт
reviewsContainer.addEventListener('click', event => {
if (event.target.classList.contains('delete-button')) {
  const removingItem = event.target.closest('div'); // находим ближайший к кнопке элемент
  const removingText = removingItem.querySelector('p'); // находим элемент с текстом отзыва
  removingItem.parentNode.removeChild(removingItem);  // удаляем отзыв со страницы
  const allReviews = JSON.parse(localStorage.getItem("allReviews")); // забираем данные из Local Storage
  localStorage.clear();
  allReviews.forEach(product => {
    product.reviews.forEach(review => {
      if (review.text === removingText.textContent) {
        const index = product.reviews.indexOf();
        product.reviews.splice(index, 1);
        alert('Отзыв удалён!');
      }
      if (product.reviews.length === 0) {
        alert('На этот продукт больше нет отзывов.');
        reviewsContainer.innerHTML = '';
      }
    });
  });
  localStorage.setItem("allReviews", JSON.stringify(allReviews)); // перезапись в Local Storage
}
});


