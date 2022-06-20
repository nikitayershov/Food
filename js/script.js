//TABS START
const tabs = document.querySelectorAll('.tabheader__item'), // пункт меню
      tabsContent = document.querySelectorAll('.tabcontent'), // дискрай
      tabsParent = document.querySelector('.tabheader__items'); // блок с пунктами
    

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

const deadline = '2022-07-02';

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
        'total': t, //общее количество оставшихся миллисекунд
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

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; //блокирует прокрутку страницы при вызове мод окна
}

modalShowBtns.forEach(button => { // открытие модального окна
    button.addEventListener('click', openModal);
});

function closeModal() { // закрытие модального окна
    modal.classList.remove('show');
    document.body.style.overflow = ''; // возвращает прокрутку страницы
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => { // закрытие модального окна кликнув по пустой области
    if (e.target === modal) {
       closeModal();
    }
});

document.addEventListener('keydown', (e) => { //закрытие мод окна с помощью Escape
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// const modalTimerId = setTimeout(openModal, 3000);

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll); // позволяет показать мод окно только один раз
    }
}

window.addEventListener('scroll', showModalByScroll);

// MODAL END

// CARD TEMPLATES. CLASSES START
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price; // price in USD
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.exchangeRate = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.exchangeRate;
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
        this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.' +
    ' Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,' +
    ' молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и ' +
    'импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.' +
    ' Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render();

// CARD TEMPLATES. CLASSES END

