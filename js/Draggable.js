window.ui = window.ui || {};

(function (window) {
  'use strict';

  const DATA_ATTR_NAME = {
    'target': 'data-draggable-target'
  };

  function Draggable() {
    window.ui.Base.apply(this, arguments); // super()

    this.target = document.querySelector('['+ DATA_ATTR_NAME.target +']');

    this.x = 0;
    this.y = 0;
    this.target_width = '';
    this.touching = false;

    this.bindEvents();
  }
  Draggable.prototype = Object.create(window.ui.Base.prototype); // extend
  Draggable.prototype.constructor = Draggable;

  Draggable.prototype.bindEvents = function () {
    this.target.addEventListener(this.getTouchStartName(), this.start.bind(this));
    this.target.addEventListener(this.getTouchMoveName(), this.move.bind(this));
    this.target.addEventListener(this.getTouchEndName(), this.end.bind(this));
    window.requestAnimationFrame(this.tick.bind(this));
  };

  Draggable.prototype.start = function (event) {
    console.log('start');
    this.x = this.getPositionX(event);
    this.y = this.getPositionY(event);
    this.touching = true;
  };

  Draggable.prototype.move = function (event) {
    console.log('move');
    this.x = this.getPositionX(event);
    this.y = this.getPositionY(event);
  };

  Draggable.prototype.end = function (event) {
    console.log('end');
    this.touching = false;
  };

  Draggable.prototype.cancel = function (event) {
    console.log('cancel');
    this.touching = false;
  };

  Draggable.prototype.getPositionX = function (event) {
    var x = this.isTouchable() ? event.changedTouches[0].clientX : event.clientX;
    // x = x - (x - this.target.offsetLeft);
    return x;
  };

  Draggable.prototype.getPositionY = function (event) {
    var y = this.isTouchable() ? event.changedTouches[0].clientY : event.clientY;
    // y = y - (y - this.target.offsetTop);
    return y;
  };

  Draggable.prototype.tick = function () {
    window.requestAnimationFrame(this.tick.bind(this));

    if (!this.touching) return; 
    console.log('tick');
    
    this.target.style.left = this.x + 'px';
    this.target.style.top = this.y + 'px';
  };

  window.ui.Draggable = Draggable;

})(window);