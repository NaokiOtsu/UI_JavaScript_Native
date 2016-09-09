window.ui = window.ui || {};

(function (window) {
  'use strict';

  const DATA_ATTR_NAME = {
    'target': 'data-draggable-target'
  };

  function Draggable() {
    window.ui.Base.apply(this, arguments); // super()

    this.target = document.querySelector('['+ DATA_ATTR_NAME.target +']');

    this.start_x   = 0;
    this.start_y   = 0;
    this.current_x = 0;
    this.current_y = 0;
    this.touching  = false;

    this.bindEvents();
  }
  Draggable.prototype = Object.create(window.ui.Base.prototype); // extend
  Draggable.prototype.constructor = Draggable;

  Draggable.prototype.bindEvents = function () {
    this.target.addEventListener(this.getTouchStartName(), this.start.bind(this));
    this.target.addEventListener(this.getTouchMoveName(), this.move.bind(this));
    this.target.addEventListener(this.getTouchEndName(), this.end.bind(this));
    this.target.addEventListener(this.getTouchCancelName(), this.cancel.bind(this));
    window.requestAnimationFrame(this.tick.bind(this));
  };

  Draggable.prototype.start = function (event) {
    this.start_x = this.getClientX(event) - event.target.offsetLeft;
    this.start_y = this.getClientY(event) - event.target.offsetTop;
    this.current_x = this.getClientX(event);
    this.current_y = this.getClientY(event);
    
    this.touching = true;
  };

  Draggable.prototype.move = function (event) {
    this.current_x = this.getClientX(event);
    this.current_y = this.getClientY(event);
  };

  Draggable.prototype.end = function (event) {
    this.touching = false;
  };

  Draggable.prototype.cancel = function (event) {
    this.touching = false;
  };

  Draggable.prototype.getClientX = function (event) {
    return this.isTouchable() ? event.changedTouches[0].clientX : event.clientX;
  };

  Draggable.prototype.getClientY = function (event) {
    return this.isTouchable() ? event.changedTouches[0].clientY : event.clientY;
  };

  Draggable.prototype.tick = function () {
    window.requestAnimationFrame(this.tick.bind(this));

    if (!this.touching) return;

    this.target.style.left = this.current_x - this.start_x + 'px';
    this.target.style.top = this.current_y - this.start_y + 'px';
  };

  window.ui.Draggable = Draggable;

})(window);