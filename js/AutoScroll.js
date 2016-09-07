window.ui = window.ui || {};

(function (window) {
  'use strict';



  function AutoScroll() {

  }

  AutoScroll.prototype.eventBinds = function () {
    this.trigger.forEach(function (element, index) {
      element.addEventListener('click', this.onClick.bind(this));
    }.bind(this));
  };

  window.ui.AutoScroll = AutoScroll;

})(window);