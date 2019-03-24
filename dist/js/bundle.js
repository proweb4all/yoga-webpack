/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./parts/calc.js":
/*!***********************!*\
  !*** ./parts/calc.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  var inputsCalc = document.querySelectorAll('.counter-block-input, #select'),
      inputCalc = document.querySelectorAll('.counter-block-input'),
      totalValue = document.querySelector('#total');
  totalValue.textContent = 0;
  inputsCalc.forEach(function (elem) {
    elem.addEventListener('input', function () {
      var res = Math.round(+inputsCalc[0].value * +inputsCalc[1].value * +inputsCalc[2].options[inputsCalc[2].selectedIndex].value * 4000);
      animNum(totalValue, res, 50, 1000);
    });
  });
  inputCalc.forEach(function (elem) {
    elem.addEventListener('input', function (e) {
      //keyup
      this.value = this.value.replace(/[^0-9]/g, '');
      var res = Math.round(+inputsCalc[0].value * +inputsCalc[1].value * +inputsCalc[2].options[inputsCalc[2].selectedIndex].value * 4000);
      animNum(totalValue, res, 50, 1000);
    });
  }); // Анимация числа

  function animNum(elem, n, f, t) {
    var num = n || 0,
        fps = f || 10,
        time = t || 1000,
        steps = time / (1000 / fps),
        cNum = 0,
        d0 = num / steps;
    var timer = setInterval(function () {
      cNum += d0;
      elem.textContent = cNum;
      steps--;

      if (steps <= 0) {
        clearInterval(timer);
      }
    }, 1000 / fps);
  }
}

module.exports = calc;

/***/ }),

/***/ "./parts/form.js":
/*!***********************!*\
  !*** ./parts/form.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function form() {
  var message = {
    //loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...'
  };
  var form = document.querySelector('.main-form'),
      statusMessage = document.createElement('div');
  statusMessage.classList.add('status');

  function sendForm(elem) {
    elem.addEventListener('submit', function (event) {
      event.preventDefault();
      elem.appendChild(statusMessage);
      var input = elem.getElementsByTagName('input'),
          formData = new FormData(form);
      var obj = {};
      formData.forEach(function (value, key) {
        obj[key] = value;
      });
      var json = JSON.stringify(obj);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          var request = new XMLHttpRequest();
          request.open('POST', 'server.php'); //        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
          request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200 && request.status < 300) {
                resolve();
              } else {
                reject();
              }
            }
          });
          request.send(json); //request.send(formData);
        });
      }

      function clearInput() {
        for (var i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      postData(formData).then(function () {
        statusMessage.style.backgroundImage = 'url(img/loading.gif)';
        statusMessage.textContent = '';
      }).then(function () {
        statusMessage.style.backgroundImage = '';
        statusMessage.textContent = message.success;
      }).catch(function () {
        statusMessage.style.backgroundImage = '';
        statusMessage.textContent = message.failure;
      }).then(clearInput);
    });
  } // попап-формы


  sendForm(form); // Нижняя форма

  var form1 = document.querySelector('#form');
  statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  sendForm(form1); // Input telephone

  var inputTel = document.querySelectorAll('.popup-form__input, .form__input');
  inputTel.forEach(function (elem) {
    elem.addEventListener('focus', function () {
      if (!/^\+\d*$/.test(elem.value)) elem.value = '+';
    });
    elem.addEventListener('keypress', function (e) {
      if (!/\d/.test(e.key)) e.preventDefault();
    });
  });
}

module.exports = form;

/***/ }),

/***/ "./parts/modal.js":
/*!************************!*\
  !*** ./parts/modal.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {
  // Modal
  var more = document.querySelectorAll('.more, .description-btn'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close');
  more.forEach(function (item) {
    item.addEventListener('click', function () {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
      overlay.style.display = 'none';
      item.classList.remove('more-splash');
      document.body.style.overflow = '';
    });
  });
}

module.exports = modal;

/***/ }),

/***/ "./parts/scroll.js":
/*!*************************!*\
  !*** ./parts/scroll.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function scroll() {
  var menu = document.querySelector('#menu');
  var anc = menu.querySelectorAll('a[href*="#"]');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var anchor = _step.value;
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    };

    for (var _iterator = anc[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

module.exports = scroll;

/***/ }),

/***/ "./parts/slider.js":
/*!*************************!*\
  !*** ./parts/slider.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
  var slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');
  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    slides.forEach(function (item) {
      return item.style.display = 'none';
    });
    dots.forEach(function (item) {
      return item.classList.remove('dot-active');
    });
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function () {
    return plusSlides(-1);
  });
  next.addEventListener('click', function () {
    return plusSlides(1);
  });
  dotsWrap.addEventListener('click', function (e) {
    for (var i = 1; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) currentSlide(i);
    }
  });
}

module.exports = slider;

/***/ }),

/***/ "./parts/tabs.js":
/*!***********************!*\
  !*** ./parts/tabs.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
  var tab = document.querySelectorAll('.info-header-tab'),
      info = document.querySelector('.info-header'),
      tabContent = document.querySelectorAll('.info-tabcontent');

  var hideTabContent = function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  };

  hideTabContent(1);

  var showTabContent = function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  };

  info.addEventListener('click', function (e) {
    var target = e.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (var i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
}

module.exports = tabs;

/***/ }),

/***/ "./parts/timer.js":
/*!************************!*\
  !*** ./parts/timer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
  // Timer
  var deadline = '2019-03-25';

  var getTimeRemaining = function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor(t / 1000 % 60),
        minutes = Math.floor(t / 1000 / 60 % 60),
        hours = Math.floor(t / (1000 * 60 * 60));
    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  var setClock = function setClock(id, endtime) {
    var timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');

    if (Date.parse(endtime) <= Date.parse(new Date())) {
      hours.textContent = minutes.textContent = seconds.textContent = '00';
      return;
    }

    var set2Char = function set2Char(num) {
      num <= 9 ? num = '0' + num : {};
      return num;
    };

    var updateClock = function updateClock() {
      var t = getTimeRemaining(endtime); //console.log(t);

      hours.textContent = set2Char(t.hours);
      minutes.textContent = set2Char(t.minutes);
      seconds.textContent = set2Char(t.seconds); //console.log(hours.textContent, minutes.textContent, seconds.textContent);

      t.total <= 0 ? clearInterval(timeInterval) : {};
    };

    var timeInterval = setInterval(updateClock, 1000);
  };

  setClock('timer', deadline);
}

module.exports = timer;

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var tabs = __webpack_require__(/*! ./parts/tabs.js */ "./parts/tabs.js"),
      timer = __webpack_require__(/*! ./parts/timer.js */ "./parts/timer.js"),
      modal = __webpack_require__(/*! ./parts/modal.js */ "./parts/modal.js"),
      slider = __webpack_require__(/*! ./parts/slider.js */ "./parts/slider.js"),
      form = __webpack_require__(/*! ./parts/form.js */ "./parts/form.js"),
      calc = __webpack_require__(/*! ./parts/calc.js */ "./parts/calc.js"),
      scroll = __webpack_require__(/*! ./parts/scroll.js */ "./parts/scroll.js");

  tabs();
  timer();
  modal();
  slider();
  form();
  calc();
  scroll();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map