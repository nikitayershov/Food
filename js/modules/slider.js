function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide), // '.offer__slide'
        slider = document.querySelector(container), //'.offer__slider'
        prev = document.querySelector(prevArrow), // '.offer__slider-prev'
        next = document.querySelector(nextArrow), //'.offer__slider-next'
        total = document.querySelector(totalCounter), // '#total'
        current = document.querySelector(currentCounter), //'#current'
        slidesWrapper = document.querySelector(wrapper), // '.offer__slider-wrapper'
        slidesField = document.querySelector(field), // '.offer__slider-inner'
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'; // выстраивает слайды в строку
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow ='hidden'; // скрывает слайды не попадающие в область видимости


    slides.forEach(slide => {
        slide.style.width = width; // теперь все слайды точно одинаковой ширины
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function changeDot(i) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[i].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.textContent = getZero(slideIndex);

        changeDot(slideIndex - 1);
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        current.textContent = getZero(slideIndex);

        changeDot(slideIndex - 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click',(e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            current.textContent = getZero(slideIndex);

            changeDot(slideIndex - 1);
        });
    });

    function getZero(num) { // добавляет ноль если значкение < 10
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
}

export default slider;