window.ui = window.ui || {};

(function (window) {
  'use strict';

  function Base() {
    
  }

  Base.prototype.isTouchable = function () {
    let is_touchable = false;

    try {
      document.createEvent('TouchEvent');
      is_touchable = true;
    } catch (e) {
    }

    // クロージャー: 2回目以降はこちらが呼ばれる
    this.isTouchable = function() {
      return is_touchable;
    };

    return is_touchable;
  };

  Base.prototype.getTouchStartName = function () {
    return this.isTouchable() ? 'touchstart' : 'mousedown';
  };

  Base.prototype.getTouchMoveName = function () {
    return this.isTouchable() ? 'touchmove' : 'mousemove';
  };

  Base.prototype.getTouchEndName = function () {
    return this.isTouchable() ? 'touchend' : 'mouseup';
  };

  Base.prototype.getTouchCancelName = function () {
    return this.isTouchable() ? 'touchcancel' : 'mouseleave';
  };

  window.ui.Base = Base;

})(window);