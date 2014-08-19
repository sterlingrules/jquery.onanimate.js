(function($) {

  var animateEvent     = null,
      transitionEvents = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      animateEvents    = 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
      Utils;

  Utils = {
    whichEvent: function(settings) {
      if (settings.transition) settings.animation = false;
      return settings;
    }
  };

  function OnAnimate($el, settings, callback) {
    var defaults = {
          addClass: '',
          removeClass: '',
          transition: false,
          animation: true,
          ms: 0
        };

    settings = typeof settings === 'object' ? $.extend(defaults, settings) : defaults;

    this.settings = Utils.whichEvent(settings);
    this.$el = $el;
    
    /*
     * Determine if callback. Allows setting
     * a callback without options.
     */

    if (callback) {
      this.callback = typeof callback === 'function' ? callback : function() {};
    } else {
      this.callback = typeof settings === 'function' ? settings : function() {};
    }

    this.init();
  }

  OnAnimate.prototype.init = function() {
    this.getEvents();
    this.listenForEnd();
  }

  OnAnimate.prototype.destroy = function() {
    this.$el.off(this.animateEvent);
  }

  OnAnimate.prototype.getEvents = function() {
    this.animateEvent = this.settings.transition ? transitionEvents : animateEvents;
    if (this.settings.transition && this.settings.animate) this.animateEvent = transitionEvents + ' ' + animateEvents;
  }

  OnAnimate.prototype.listenForEnd = function() {
    var self = this;

    this.$el
      .addClass(self.settings.addClass)
      .removeClass(self.settings.removeClass)
      .one(self.animateEvent, function() {
        setTimeout(function(){
          self.callback.call(self.$el);
          self.destroy();
        }, self.settings.ms);
      });
  }

  $.fn.onAnimate = function(settings, callback) {
    return this.each(function() {
      var onAnimate = new OnAnimate($(this), settings, callback);
    });
  };

})(jQuery);
