OutdatedBrowser = (function () {
  function OutdatedBrowser(_options) {
    var self = this;

    this._id = new Mongo.ObjectID().toHexString();

    _options = _options || {};

    if(_options.lowerThan == 'IE8' || _options.lowerThan == 'borderSpacing') {
      this.lowerThan = 'borderSpacing';
    } else if (_options.lowerThan == 'IE9' || _options.lowerThan == 'boxShadow') {
      this.lowerThan = 'boxShadow';
    } else if (_options.lowerThan == 'IE11' || _options.lowerThan == 'borderImage') {
      this.lowerThan = 'borderImage';
    } else {
      this.lowerThan = 'transform';
    }

    if ( !this._support(this.lowerThan) ) {
      this.view = Blaze.renderWithData(Template.outdated_browser, {
        message: _options.message || "Update your browser to view this website correctly.",
        title: _options.title || "Your browser is out-of-date!",
        button: _options.button || "Update my browser now ",
        bgColor: _options.bgColor || "#F25648",
        color: _options.color || "#FFF",
        _id: this._id
      }, document.body);

      Meteor.setTimeout(function() {self._init();}, 50);
    }

  }

  OutdatedBrowser.prototype._init = function () {
    var self = this;
    this.outdated   = $("#" + this._id);

    if(!this.outdated) {
      Meteor.setTimeout(function() { self._init(); }, 50);
      return;
    }

    for (var i = 1; i <= 100; i++) {
      Meteor.setTimeout(function () {self._opacity(i);}, i * 8);
    }

    this.closeButton  = this.outdated.find("#ob-close");

    this._closeListener = this._closeListener.bind(this);

    this.closeButton.bind('click', this._closeListener);

  };

  OutdatedBrowser.prototype._destroy = function () {
    Blaze.remove(this.view);
  };

  OutdatedBrowser.prototype._closeListener = function () {
    this.outdated.style.display = 'none';
    this._destroy();
    return false;
  };

  OutdatedBrowser.prototype._opacity = function (opacity_value) {
    this.outdated.style.opacity = opacity_value / 100;
    this.outdated.style.filter = 'alpha(opacity=' + opacity_value + ')';
    if (opacity_value == 1) {
      this.outdated.style.display = 'block';
    }
  };

  OutdatedBrowser.prototype._support = (function() {
    var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;

    return function(prop) {
      if ( prop in div.style ) { return true; }

      prop = prop.replace(/^[a-z]/, function(val) {
        return val.toUpperCase();
      });

      while(len--) {
        if ( vendors[len] + prop in div.style ) {
          return true;
        }
      }
      return false;
    };
  })();

  return OutdatedBrowser;

})();
