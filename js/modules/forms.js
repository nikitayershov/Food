function forms() {
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
}

module.exports = forms;
