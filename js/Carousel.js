window.ui = window.ui || {};

(function (window) {
  'use strict';

  const DATA_ATTR_NAME = {
    'contents' : 'data-carousel-contents',
    'prev'     : 'data-carousel-prev',
    'next'     : 'data-carousel-next',
    'thumb'    : 'data-carousel-thumb'
  };

  function Carousel() {
    this.contents = document.querySelector('['+ DATA_ATTR_NAME.contents +']');
    this.prev     = document.querySelector('['+ DATA_ATTR_NAME.prev +']');
    this.next     = document.querySelector('['+ DATA_ATTR_NAME.next +']');
    this.thumb    = document.querySelector('['+ DATA_ATTR_NAME.thumb +']').children;

    this.counter = 0;
    this.length = this.contents.children.length;

    this.bindEvents();
    this.thumbCheck();
  }

  Carousel.prototype.bindEvents = function () {
    this.prev.addEventListener('click', this.onPrev.bind(this));
    this.next.addEventListener('click', this.onNext.bind(this));
    window.addEventListener('resize', this.move.bind(this));
  };
  
  Carousel.prototype.onPrev = function () {
    this.counter = this.counter - 1;
    if (this.counter <= -1) this.counter = this.length - 1;

    this.move();
    this.thumbCheck();
  };

  Carousel.prototype.onNext = function () {
    this.counter = this.counter + 1;
    if (this.counter >= this.length) this.counter = 0;

    this.move();
    this.thumbCheck();
  };

  Carousel.prototype.move = function () {
    const width = this.contents.clientWidth;
    this.contents.style.webkitTransform = 'translateX(-'+ (width * this.counter) +'px)';
  };

  Carousel.prototype.thumbCheck = function () {
    const thumbArray = Array.prototype.slice.call(this.thumb);
    thumbArray.forEach(function(element, index) {
      element.classList.remove('active');
    });
    this.thumb[this.counter].classList.add('active');
  };

  window.ui.Carousel = Carousel;

})(window);