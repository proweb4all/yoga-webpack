function timer(){
    // Timer
    const deadline = '2019-03-28';

    let getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    let setClock = (id, endtime) => {
        const timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        if (Date.parse(endtime) <= Date.parse(new Date())) {
            hours.textContent = minutes.textContent = seconds.textContent = '00';
            return;
        }

        let set2Char = (num) => {
            (num <= 9) ? num = '0' + num : {};
            return num;
        };

        let updateClock = () => {
            const t = getTimeRemaining(endtime);
            //console.log(t);
            hours.textContent = set2Char(t.hours);
            minutes.textContent = set2Char(t.minutes);
            seconds.textContent = set2Char(t.seconds);
            //console.log(hours.textContent, minutes.textContent, seconds.textContent);
            (t.total <= 0) ? clearInterval(timeInterval) : {};
        };
        const timeInterval = setInterval(updateClock, 1000);
    };
    setClock('timer', deadline);
}

module.exports = timer;