import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerId) {
    // FORMS START

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal'); //закрывает модальное окно
        }, 3000);
    }

// MODAL THANKS END

}

export default forms;