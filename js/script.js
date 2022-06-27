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
      modal = document.querySelector('.modal');

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

modal.addEventListener('click', (e) => { // закрытие модального окна кликнув по пустой области
    if (e.target === modal || e.target.getAttribute('data-close') === '') {
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
    constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
        this.img = img;
        this.altimg = altimg;
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
                    <img src=${this.img} alt=${this.altimg}>
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

const getResource = async (url) => { // async ставится перед функцией
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};


getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });

// CARD TEMPLATES. CLASSES END

// FORMS START

const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => { // async ставится перед функцией
    const res = await fetch(url, { // await ставится перед операциями, которые необходимо дождаться
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};


function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img'); // элемент, который будет отображать статус отправки формы
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage); // позволяет расположить спиннер под формой

        const formData = new FormData(form); // в формах у input обязательно должен быть атрибут name !!!

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // сбрасывает значения формы
            });
        });
}

// FORMS END

// MODAL THANKS START

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide'); // скрывает старое модальное окно
    openModal();

    const thanksModal = document.createElement('div'); //динамически создает новое модальное окно
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML =`
        <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => { // удаляет новое модальное окно через 3 секунды
        thanksModal.remove();
        prevModalDialog.classList.remove('hide'); // Возвращает старое модальное окно
        closeModal(); //закрывает модальное окно
    }, 3000);
}

// MODAL THANKS END

// SLIDER START

const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex'; // выстраивает слайды в строку
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow ='hidden'; // скрывает слайды не попадающие в область видимости


slides.forEach(slide => {
    slide.style.width = width; // теперь все слайды точно одинаковой ширины
});

next.addEventListener('click', () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
});

prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
);


// showSlides(slideIndex);
//
// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }
//
// function showSlides(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }
//     if (n < 1) {
//         slideIndex = slides.length;
//     }
//
//     slides.forEach((item) => item.classList.add('hide'));
//
//     slides[slideIndex - 1].classList.add('show', 'fade');
//     slides[slideIndex - 1].classList.remove('hide');
//
//     if (slides.length < 10) {
//         current.textContent =  `0${slideIndex}`;
//     } else {
//         current.textContent =  slideIndex;
//     }
// }
//
// function plusSlides (n) {
//     showSlides(slideIndex += n);
// }
//
// prev.addEventListener('click', function(){
//     plusSlides(-1);
// });
//
// next.addEventListener('click', function(){
//     plusSlides(1);
// });

