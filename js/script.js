//TABS START
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
    }); 
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
// TABS END

// TIMER START

const deadline = '2022-05-02';

function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date()); //превращаем строку в дату и отнимаем текущую дату

    if (t <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
    days = Math.floor(t / (1000 * 60 * 60 * 24)); // количество дней до дедлайна
    hours = Math.floor(t / (1000 * 60 * 60) % 24); // количество часов
    minutes = Math.floor((t / 1000 / 60) % 60);
    seconds = Math.floor((t / 1000) % 60);
    }

    return {
        'total': t, //общее количество оставшихся милисекунд
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) { // добавляет ноль если значкение < 10
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function  setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); // предотвращает мигание верстки(чтобы не ждать секунду после обновления страницы)

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);

// MODAL START

const modalShowBtns = document.querySelectorAll('[data-modal]'),
      modalCloseBtn = document.querySelector('[data-close]'),
      modalForm = document.querySelector('.modal form'),
      modal = document.querySelector('.modal');
console.log(modalForm);

modalShowBtns.forEach(button => { // открытие модального окна
    button.addEventListener('click', () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; //блокирует прокрутку страницы при вызове мод окна
    });
});

function closeModal() { // закрытие модального окна
    modal.classList.remove('show');
    document.body.style.overflow = ''; // возвращает прокрутку страницы
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => { // закрытие модального окна кликнув по пустой обоасти
    if (e.target === modal) {
       closeModal();
    }
});

document.addEventListener('keydown', (e) => { //закрытие мод окна с помощью Escape
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});