function form(){
    let message = {
        //loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };
    function sendForm(elem) {
        elem.addEventListener('submit', function(event){
            event.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            elem.appendChild(statusMessage);
            let input = elem.getElementsByTagName('input'),
                formData = new FormData(elem);
            let obj = {};
            formData.forEach(function(value, key){
                obj[key] = value;
            });
            //console.log('formData', formData);
            //console.log('obj', obj);
            let json = JSON.stringify(obj);

            function postData(data){
                return new Promise(function(resolve, reject){
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
            //        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    request.addEventListener('readystatechange', function(){
                        if (request.readyState < 4){
                            resolve()
                        } else if (request.readyState === 4){
                            if (request.status == 200 && request.status < 300){
                                resolve();
                            } else {
                                reject()
                            }
                        }
                    });
                    request.send(json);
                    //request.send(formData);
                })
            }
            function clearInput(){
                for (let i = 0; i < input.length; i++){
                    input[i].value = '';
                }
            }
            postData(formData)
                .then(() => {
                    statusMessage.style.backgroundImage = 'url(img/loading.gif)';
                    statusMessage.textContent = '';
                })
                .then(() => {
                    statusMessage.style.backgroundImage = '';
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.style.backgroundImage = '';
                    statusMessage.textContent = message.failure;
                })
                .then(clearInput)
        });
    }
    // попап-формы
    let form = document.querySelector('.main-form');
    sendForm(form);
    // Нижняя форма
    let form1 = document.querySelector('#form');
    sendForm(form1);

    // Input telephone
    let inputTel = document.querySelectorAll('.popup-form__input, .form__input');
    inputTel.forEach(function(elem){
        //elem.addEventListener('focus', () => {if(!/^\+\d*$/.test(elem.value)) elem.value = '+';});
        elem.addEventListener('keypress', e => {if(!/\d/.test(e.key)) e.preventDefault();});
    });

}

module.exports = form;