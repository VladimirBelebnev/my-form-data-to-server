const forms = (formSelector, inputSelector, phoneInputSelector, statusClass, serverUrl) => {
    const form = document.querySelectorAll(formSelector),
        inputs = document.querySelectorAll(inputSelector),
        phoneInputs = document.querySelectorAll(phoneInputSelector);

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

    const message = {
        loading: 'Загрузка...',
        succses: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так.'
    };

    const postData = async (url, data) => {
        document.querySelector(statusClass).textContent = message.loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData(serverUrl, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.succses;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;