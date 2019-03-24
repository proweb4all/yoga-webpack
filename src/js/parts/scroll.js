function scroll(){
    const menu = document.querySelector('#menu');
    const anc = menu.querySelectorAll('a[href*="#"]');
    for (let anchor of anc) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }    
}

module.exports = scroll;