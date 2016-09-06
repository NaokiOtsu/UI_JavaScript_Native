window.ui = window.ui || {};

(function (window) {
  'use strict';



  function AutoScroll() {

  }

  Accordion.prototype.eventBinds = function () {
    this.trigger.forEach(function (element, index) {
      element.addEventListener('click', this.onClick.bind(this));
    }.bind(this));
  };

  Accordion.prototype.onClick = function (event) {
    var trigger_name = event.currentTarget.getAttribute(DATA_ATTR_NAME.trigger);
    var target_contents = document.querySelectorAll('[' + DATA_ATTR_NAME.contents + '="' + trigger_name + '"]');

    target_contents.forEach(function (element, index) {
      element.classList.toggle(CLASS_NAME.active);
      if (element.classList.contains(CLASS_NAME.active)) {
        element.style.height = this.data_height[trigger_name] + 'px';
      } else {
        element.style.height = 0;
      }
    }.bind(this));
  };

  window.ui.AutoScroll = AutoScroll;

})(window);