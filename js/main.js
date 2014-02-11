(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.RootLoader = (function() {
    RootLoader.prototype.opacityValue = 0;

    RootLoader.prototype.event = null;

    RootLoader.prototype.menu = null;

    RootLoader.prototype.MAXCONNECTIONS = 15.0;

    RootLoader.prototype.TABLET_MAXCONNECTIONS = 3.0;

    function RootLoader() {
      this.error = __bind(this.error, this);
      this.complete = __bind(this.complete, this);
      this.progress = __bind(this.progress, this);
      this.start = __bind(this.start, this);
      this.loader = new createjs.LoadQueue(false);
      this.loader.setMaxConnections(this.MAXCONNECTIONS);
      this.loader.addEventListener('error', this.error);
      this.loader.addEventListener('complete', this.complete);
      this.loader.addEventListener('progress', this.progress);
      this.start();
    }

    RootLoader.prototype.start = function() {
      this.HAS_ERROR = false;
      this.assets = [
        {
          id: '0',
          src: 'images/'
        }, {
          id: '1',
          src: 'images/'
        }
      ];
      return this.loader.loadManifest(this.assets);
    };

    RootLoader.prototype.progress = function(event_) {
      var percent;
      percent = Math.round(this.loader.progress * 100);
      return console.log(" Loading : " + percent);
    };

    RootLoader.prototype.complete = function(event_) {
      return this.main = new main();
    };

    RootLoader.prototype.error = function(e_) {
      this.HAS_ERROR = true;
      return console.log('ERROR : AppLoader', e_);
    };

    return RootLoader;

  })();

  window.main = (function() {
    function main() {
      console.log('appLaunched');
    }

    return main;

  })();

}).call(this);
