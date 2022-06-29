function modal() {
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
}

module.exports = modal;
