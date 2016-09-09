window.ui = window.ui || {};

(function (window) {
  'use strict';

  const DATA_ATTR_NAME = {
    'trigger': 'data-count-button-trigger'
  };

  const ID_NAME = {
    'result': 'result'
  };

  const INTERVAL = 1000; // カウントアップが加速する時間

  function CountButton() {
    window.ui.Base.apply(this, arguments); // super()

    this.trigger = document.querySelector('['+ DATA_ATTR_NAME.trigger +']');
    this.result  = document.getElementById(ID_NAME.result);

    this.counter = 0;
    this.plus_num = 1;
    this.timer_id;
    this.time;

    this.bindEvents();
  }
  CountButton.prototype = Object.create(window.ui.Base.prototype); // extend
  CountButton.prototype.constructor = CountButton;

  CountButton.prototype.bindEvents = function () {
    this.trigger.addEventListener(this.getTouchStartName(), this.start.bind(this));
    this.trigger.addEventListener(this.getTouchEndName(), this.end.bind(this));
    this.trigger.addEventListener(this.getTouchCancelName(), this.cancel.bind(this));
  };

  CountButton.prototype.start = function () {
    this.countUp();
    this.timeStatus(); // 経過時間計測を開始
    
    clearTimeout(this.timer_id);
    this.timer_id = setTimeout(this.countUp.bind(this), 500);
  };

  CountButton.prototype.end = function () {
    this.cancel();
  };

  CountButton.prototype.cancel = function () {
    clearTimeout(this.timer_id);
    this.plus_num = 1;
    this.cancelTimeStatus();
  };

  CountButton.prototype.countUp = function () {
    this.counter = this.counter + this.plus_num;
    this.result.innerText = this.counter;

    this.timer_id = setTimeout(this.countUp.bind(this), 100);
  };

  // 経過時間計測(requestAnimationFrameで1秒間に1回、間引く http://level0.kayac.com/2012/07/post_115.php)
  CountButton.prototype.timeStatus = function () {
    var timestamp = 0;

    function tick() {
      var now = performance.now();
      var delta = now - timestamp;

      // 1秒に1回実行
      if (delta >= INTERVAL) {
        timestamp = now;
        this.plus_num += 1;
      }

      this.time = requestAnimationFrame(tick.bind(this));
    }
    
    this.time = requestAnimationFrame(tick.bind(this));
  };

  // 経過時間計測をキャンセル
  CountButton.prototype.cancelTimeStatus = function (start_time) {
    cancelAnimationFrame(this.time);
  }

  window.ui.CountButton = CountButton;

})(window);