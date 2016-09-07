window.ui = window.ui || {};

(function (window) {
  'use strict';

  const DATA_ATTR_NAME = {
    'trigger': 'data-auto-scroll-trigger'
  };

  const ID_NAME = {
    'hoge2': 'hoge2'
  };

  function AutoScroll() {
    this.trigger = document.querySelector('['+ DATA_ATTR_NAME.trigger +']');
    
    this.bindEvents();

    window.requestAnimationFrame(function() {
      const hoge2 = document.getElementById(ID_NAME.hoge2);
      hoge2.scrollIntoView(true);
    }.bind(this));
  }

  AutoScroll.prototype.bindEvents = function () {
    this.trigger.addEventListener('click', this.scroll.bind(this, 0));
  };

  AutoScroll.prototype.scroll = function (scrollNum) {
    if (typeof scrollNum === 'undefined') scrollNum = 0;

    window.scrollTo(0, scrollNum);
  };

  window.ui.AutoScroll = AutoScroll;

})(window);