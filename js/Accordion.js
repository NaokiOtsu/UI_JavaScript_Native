window.ui = window.ui || {};

(function (window) {
  'use strict';

  var DATA_ATTR_NAME = {
    trigger  : 'data-accordion-trigger',
    contents : 'data-accordion-contents'
  };

  var CLASS_NAME = {
    active: 'active'
  };

  function Accordion() {
    window.ui.Base.apply(this, arguments); // super()
    
    this.trigger  = document.querySelectorAll('[' + DATA_ATTR_NAME.trigger + ']');
    this.contents = document.querySelectorAll('[' + DATA_ATTR_NAME.contents + ']');

    // 要素のHeight取得
    this.data_height = {};
    this.contents.forEach(function (element, index) {
      var data_name = element.getAttribute(DATA_ATTR_NAME.contents);
      this.data_height[data_name] = element.offsetHeight;
      element.style.height = 0;
    }.bind(this));

    this.eventBinds();
  }
  Accordion.prototype = Object.create(window.ui.Base.prototype); // extend
  Accordion.prototype.constructor = Accordion;

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

  window.ui.Accordion = Accordion;

})(window);