window.ui = window.ui || {};

(function (window) {
  'use strict';

  var DATA_ATTR_NAME = {
    'trigger'  : 'data-all-checkbox-trigger',
    'children' : 'data-all-checkbox-children'
  };

  function AllCheck() {
    window.ui.Base.apply(this, arguments); // super()
    
    this.trigger  = document.querySelector('[' + DATA_ATTR_NAME.trigger + ']');
    this.children = document.querySelectorAll('[' + DATA_ATTR_NAME.children + ']');

    this.eventBinds();
  }
  AllCheck.prototype = Object.create(window.ui.Base.prototype); // extend
  AllCheck.prototype.constructor = AllCheck;

  AllCheck.prototype.eventBinds = function () {
    this.trigger.addEventListener('change', this.allCheckToggle.bind(this));
  };

  AllCheck.prototype.allCheckToggle = function (event) {
    this.children.forEach(function (element, index) {
      if (this.trigger.checked) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    }.bind(this));

  };

  window.ui.AllCheck = AllCheck;

})(window);