const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');
    

function hideTabContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    }); 'use strict';

const now = new Date();
console.log(now); // 2022-06-01T09:31:13.487Z

const userDate1 = new Date('2020-05-01');
// new Date.parse('2020-05-01'); то же самое что метод выше
console.log(userDate1); //2020-05-01T00:00:00.000Z

// в формате аргументов месяца считаются с 0, а время считается с учетом часовых поясов
const userDate2 = new Date(2020,5, 1, 20);
console.log(userDate2);// 2020-06-01T17:00:00.000Z

// любая дата в js хранится в милисекундах и отсчет ведется с 1.01.1970 года
// (для боллее раннего переиода можно использовать отрицательные значения)

// МЕТОДЫ GETTERs
console.log(now.getFullYear()); // 2022
console.log(now.getMonth()); // 5 (отсчет с 0; 6 => 5)
console.log(now.getDate()); // 1 (отсчет с еденицы)
console.log(now.getDay()); // день недели (воскресенье - 0, суббота - 6)
console.log(now.getHours()); // 13 - местное время
console.log(now.getUTCHours()); // 10 - время по UTC

console.log(now.getTimezoneOffset()); // -180 Разница в минутах между настоящим и главным часовым поясом
console.log(now.getTime());// количество милисекунд с  с 1.01.1970 (можно превратить в число поместив внутрь Data())

// МЕТОДЫ SETTTERs

const setDate = new Date();

console.log(setDate.setHours(18));
console.log(setDate)// 15:21:57 в консоли WS отображается UTC; в консоли браузера 18:24 – местное время

//даты для измерения промежутков времени
let start = new Date();

for (let i = 0; i < 10000; i++) {
    let some = i ** 3;
}

let end = new Date();
console.log(`Цикл отработал за ${end - start} миллисекунд`);
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (item === target) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});