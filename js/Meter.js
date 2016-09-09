window.ui = window.ui || {};

(function (window) {
  'use strict';

  var CLASS_NAME = {
    'gauge': 'meter-gauge'
  };

  function Meter() {
    window.ui.Base.apply(this, arguments); // super()

    this.gauge = document.querySelector('.' + CLASS_NAME.gauge);

    this.now_exp = 300;
    this.next_exp = 1000;
    this.get_exp = 900;
    this.repeat = 0;

    this.init();

    setTimeout(function() {
      this.expGet();
      this.transitionOn();
    }.bind(this), 1000);
  }
  Meter.prototype = Object.create(window.ui.Base.prototype); // extend
  Meter.prototype.constructor = Meter;

  Meter.prototype.init = function () {
    this.setWidth(this.getPercent());
  };

  Meter.prototype.setWidth = function (percent) {
    this.gauge.style.width = percent + '%';
  };

  Meter.prototype.transitionOn = function () {
    this.gauge.style.transition = 'width .5s ease-in-out';
  };

  Meter.prototype.transitionOff = function () {
    this.gauge.style.transition = '';
  };

  Meter.prototype.getPercent = function () {
    return Math.floor(this.now_exp / this.next_exp * 100);
  };

  Meter.prototype.expGet = function () {
    this.now_exp = this.now_exp + this.get_exp;
    this.repeat = Math.floor(this.now_exp / this.next_exp);
    
    if (this.repeat >= 1) {
      var remain = this.repeat;
      this.repeatGauge(remain);
    } else {
      this.setWidth(this.getPercent());
    }
  };

  Meter.prototype.repeatGauge = function(num) {
    var remain = num; // 残り回数

    if (remain >= 1) {
      this.setWidth(100);
      this.gauge.addEventListener('webkitTransitionEnd', this.transitionEnd.bind(this, remain));
    } else {
      this.setWidth(this.getPercent());
    }
  };

  Meter.prototype.transitionEnd = function(remain) {
    // event.removeEventListener('webkitTransitionEnd', this.transitionEnd.bind(this, remain));
    event.target.removeEventListener('webkitTransitionEnd', this.transitionEnd);
    
    this.transitionOff();
    this.gauge.style.width = 0;

    setTimeout(function() {
      this.transitionOn();
      this.repeatGauge(remain - 1);
    }.bind(this), 100);
  };

  window.ui.Meter = Meter;

})(window);