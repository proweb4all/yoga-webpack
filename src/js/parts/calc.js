function calc(){
    let inputsCalc = document.querySelectorAll('.counter-block-input, #select'),
        inputCalc = document.querySelectorAll('.counter-block-input'),
        totalValue = document.querySelector('#total');
        totalValue.textContent = 0;
    inputsCalc.forEach((elem) => {
        elem.addEventListener('input', () => {
            let res = Math.round(+inputsCalc[0].value * +inputsCalc[1].value * +inputsCalc[2].options[inputsCalc[2].selectedIndex].value * 4000);
            animNum(totalValue, res, 50, 1000);
        })
    });
    inputCalc.forEach((elem) => {
        elem.addEventListener('input', function(e){ //keyup
            this.value = this.value.replace(/[^0-9]/g, '')
            let res = Math.round(+inputsCalc[0].value * +inputsCalc[1].value * +inputsCalc[2].options[inputsCalc[2].selectedIndex].value * 4000);
            animNum(totalValue, res, 50, 1000);
        });
    });

    // Анимация числа
    function animNum(elem, n, f, t){
        let num = n || 0,
            fps = f || 10, 
            time = t || 1000, 
            steps = time / (1000 / fps), 
            cNum = 0,
            d0 = num / steps;
        let timer = setInterval(function(){
            cNum += d0;
            elem.textContent = cNum;
            steps--;
            if(steps <= 0){
                clearInterval(timer);
            }
        }, (1000 / fps));
    }    
}

module.exports = calc;