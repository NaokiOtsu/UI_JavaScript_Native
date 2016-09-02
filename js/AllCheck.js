window.ui = window.ui || {};

(function(window) {
	'use strict';
	
	var DATA_ATTR_NAME = {
		'trigger': 'data-all-checkbox-trigger',
		'children': 'data-all-checkbox-children'
	};

	function AllCheck() {
		this.trigger = document.querySelector('['+ DATA_ATTR_NAME.trigger +']');
		this.children = document.querySelectorAll('['+ DATA_ATTR_NAME.children +']');

		this.eventBinds();
	}
	
	AllCheck.prototype.eventBinds = function() {
		this.trigger.addEventListener('change', this.allCheckToggle.bind(this));
	};
	
	AllCheck.prototype.allCheckToggle = function(event) {
		if (this.trigger.checked) {
			this.children.forEach(function(element, index) {
				element.checked = true;
			});
		} else {
			this.children.forEach(function(element, index) {
				element.checked = false;
			});
		}
	};
	
	window.ui.AllCheck = AllCheck;
	
})(window);