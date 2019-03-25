require('formdata-polyfill');
window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    let tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js'),
        modal = require('./parts/modal.js'),
        slider = require('./parts/slider.js'),
        form = require('./parts/form.js'),
        calc = require('./parts/calc.js');
        //scroll = require('./parts/scroll.js');

    tabs();
    timer();
    modal();
    slider();
    form();
    calc();
    //scroll();
});
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}