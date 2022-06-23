/* ========================================
   Vue Infinite scroll v1.0.1
   https://www.Kamaleoon.it/
   Copyright (c) 2022 Format s.r.l.
   Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)

   Requires: vue.infinitescroll.css
             vue 2.6.14, jquery 3.3.x, bootstrap 4.3.x
   ======================================== */

// #region Declaration

// #endregion

// Auto self call function
(function (global, factory) {
  global.infiniteScroll = factory();
}
(this, function () {

  'use strict';

  // Plugin definition
  var infinitescroll_version = '1.0.1';
  var infinitescroll_pluginName = 'format.infinitescroll';
  var infinitescroll_fileName = "vue.infinitescroll";

  //#region Declarations

  // Defaults variables
  var DEFAULTS = {
      url: '/auctions/paging'     // data url
    , type: 'POST'                // type of request
    , request: {                  // request
        startIndex: 0
      , counter: 0
      , pageSize: 10,
    }                             
    , response: null              // response
    , slidetime: 'fast'           // animation slide time
    , animateduration: 1000       // animation duration
    , itemsfound: 'itemsFound'    // tag counter
    , loadonstart: false          // make the first request on init (document ready)
    , autoscroll: false           // auto position on first element (used on serch)
    , scrollmode: 'scroll'        // load data on scroll or click
    , loading: 'Loading...'       // text to show
    , noitems: 'No items found'   // text to show 
    , allload: 'All items loaded' // text to show
    , offset: 0                   // load advance in px
    , onload: undefined           // onload event
  };

  // Bar Style
  var barStyle = {
    successStriped: { class: 'progress-bar progress-bar-striped progress-bar-animated bg-success rounded', style: 'width: 100%; height: 2rem;' }
    , warning: { class: 'progress-bar progress-bar-striped progress-bar-animated bg-warning rounded', style: 'width: 100%; height: 2rem; color: #5a5a5a' }
    , success: { class: 'progress-bar bg-success rounded', style: 'width: 100%; height: 2rem;' }
    , danger: { class: 'progress-bar bg-danger rounded', style: 'width: 100%; height: 2rem;' }
  };

  //#endregion

  //#region Windows events

  // Checks if the Element is in the ViewPort
  var isInViewportIS = function isInViewportIS($el, offset) {

    var elementTop = $el.offset().top;
    var elementBottom = elementTop + $el.outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() + offset;

    var retVal = $el.is(":visible")
              && (elementBottom > viewportTop && elementTop < viewportBottom);

    return retVal;
  };

  // Scroll
  var scroll = function scroll () {

    var self = this;
    var el = this.el;
    var options = this.options;

    // if we are still grabbing items or we haven't data or if we have reached last page... stop it.
    if (self.inProgress
     || self.response?.nextIndex == 0
     || self.response?.rowsCount == 0
     || self.response?.Items.length < self.request.pageSize)
      return;

    // Ask for the next page
    if (isInViewportIS(self.$progressBar, options.offset))
      load.call(self);
  }

  //#endregion

  //#region Render HTML

  // showProgress
  var showProgress = function showProgress(style, msg) {

    var self = this;
    var options = self.options;

    // Already visible with the same text
    if (self.$progressBar.is(':visible') && self.$progressBar.text() === msg)
      return;

    self.$progressBar.removeClass();

    self.$progressBar.addClass(style.class);
    self.$progressBar.attr('style', style.style);
    self.$progressBar.text(msg);

    self.$progressBar.hide().fadeIn(options.slidetime);
  }

  // refreshMarker
  var refreshMarker = function refreshMarker () {

    var self = this;
    var options = self.options;

    // In progress...
    if (self.inProgress) {

      if (options.scrollmode == "scroll"
      || (options.scrollmode == "click&scroll" && self.request.counter > 1))
        showProgress.call(self, barStyle.warning, options.loading);

      if (options.scrollmode == "click"
      || (options.scrollmode == "click&scroll" && self.request.counter <= 1)) {

        self.$el.find('[data-type="loaded"]').hide();
        self.$el.find('[data-type="loading"]').show();
      }

      return;
    }

    // Complete
    if (self.response?.rowsCount == 0) {

      // No items found
      showProgress.call(self, barStyle.danger, options.noitems);
      self.$ListMore.hide();
    }
    else if (self.response?.Items.length < self.request.pageSize || self.response?.nextIndex == 0) {

      // All items loaded
      showProgress.call(self, barStyle.success, options.allload);
      self.$ListMore.hide();
    }
    else if (options.scrollmode == "scroll"
         || (options.scrollmode == "click&scroll" && self.request.counter > 1)) {

      // Show progress bar
      self.$progressBar.show();
      self.$ListMore.hide();
    }      
    else if (options.scrollmode == "click"
         || (options.scrollmode == "click&scroll" && self.request.counter <= 1)) {

      // Show list more button
      self.$progressBar.hide();
      self.$ListMore.show();
    }

    if (options.scrollmode == "click"
     || options.scrollmode == "click&scroll") {

      self.$el.find('[data-type="loaded"]').show();
      self.$el.find('[data-type="loading"]').hide();
    }
    
  }

  // scrollToMarker
  var scrollToMarker = function scrollToMarker() {

    var self = this;
    var options = self.options;

    $('html, body').stop().delay(options.slidetime).animate({
      scrollTop: self.$startMarker.offset().top - ($(".navbar").length != 0 ? $(".navbar").height() : 0)
    }, options.slidetime, 'easeInOutExpo', function () {

      // Counter animation on scroll complete.
      $({ Counter: 0 }).animate({ Counter: self.response?.rowsCount }, {
        duration: options.animateduration,
        easing: 'swing',
        step: function () {
          self.$itemsFound.text(Math.ceil(this.Counter));
        }
      });
    });
  }

  //#endregion

  //#region Bind

  // Bind and get attributes from the directive, call check method
  var doBind = function doBind() {

    var self = this;
    var el = self.el;
    var $el = self.$el;

    // Parameters
    self.options = $.extend({ iconBasePath: './' }, DEFAULTS, self.vm.$data, self.$el.data());
    var options = self.options;

    // Model
    self.model = options.model;

    // Request & Response
    self.request = options.request;
    self.response = options.response;

    // Model
    if (options.model)
      self.vm.$data.model = options.model;

    // Model from response
    if (options.response)
      self.vm.$data.model = options.response.Items;

    // Public functions
    self.reload = function (request, scroll = true) {

      if (options.scrollmode == "click&scroll")
        $(window).unbind('scroll');

      load.call(self, request, scroll, false)
    };

    // Listen event parameter
    // infinite scroll will check again when the event is emitted in Vue instance.
    var eventName = el.getAttribute('data-listen-for-event');
    if (eventName)
      self.vm.$on(eventName, function () {
        doCheck.call(self);
      });

    // Get item list & progressBar
    self.$startMarker = $('[data-type="startMarker"]');
    self.$itemsFound = $('[data-type="itemsFound"]');

    self.$progressBar = $('[data-type="progressBar"]');
    self.$ListMore = $el.find('[data-type="listMore"]');    

    // Infinite scroll
    if (options.scrollmode == "scroll") {

      // Windows scroll event
      $(window).scroll(function () { scroll.call(self) });
    }

    // Click on butto to load more items
    if (options.scrollmode == "click") {

      self.$ListMore.click(function () {

        $(this).tooltip('hide');
        load.call(self);
      });
    }

    // Click & after scroll
    if (options.scrollmode == "click&scroll") {

      self.$ListMore.click(function () {

        // Windows scroll event
        $(window).scroll(function () { scroll.call(self) });

        $(this).tooltip('hide');
        load.call(self);
      });
    }

    // Load on start
    if (options.loadonstart)
      load.call(self, options.request, options.autoscroll, false);

    // Scroll on start
    else if (options.autoscroll)
      scrollToMarker.call(self);

    // Refresh marker
    else
      refreshMarker.call(self);

    // Bind function
    if (self.expression)
      self.expression();
  };

  //#endregion

  //#region Ajax calls

  // Load
  var load = function (request = null, scroll = false, append = true) {

    var self = this;
    var el = this.el;
    var options = this.options;

    if (request != null)
      self.request = request;

    $.ajax({

      type: options.type,
      url: options.url,
      data: JSON.stringify(self.request),
      contentType: "application/json",

      beforeSend: function () {

        self.inProgress = true;
        self.appendInProgress = append;

        // Refresh marker
        refreshMarker.call(self);
      },

      success: function (response) {

        self.response = response;

        if (self.response === null)
          return;

        // Set model with items data
        if (self.vm.$data.model == null || !append) {

          self.vm.$data.model = response.Items;
        }
        // Append items data to model
        else {

          // Bug Microsoft Edge (84.0.522.40) cursor scoll down during data update (Not remove... untill next version)
          setTimeout(function () {

            self.vm.$data.model = self.vm.$data.model.concat(response.Items);
          }, 10);
        }

        // Raise onload event
        if (self.vm.onload !== undefined)
          self.vm.onload.call(self, response);

        else if (options.onload !== undefined)
          options.onload.call(self, response);

        // Scroll down to position, animation on toolbar search
        if (scroll)
          scrollToMarker.call(self);

        // update row count only on first request
        else if (self.request.startIndex == 0)
          self.$itemsFound.text(response.rowsCount);
      },

      complete: function () {

        if (self.request.counter != null)
          self.request.counter++;

        // Update next request
        if (self.request != null
         && self.response != null) {

          self.request.startIndex = self.response?.nextIndex;
          self.request.userSearchID = self.response?.userSearchID;
        }

        setTimeout(function () {

          self.inProgress = false;
          self.appendInProgress = false;

          // Refresh marker
          refreshMarker.call(self);
        }, 5);
      },

      error: function (jqXHR, textStatus, errorThrown) {

        try {
          var exceptionData = JSON.parse(jqXHR.responseText)

          if (exceptionData.status === 422) {

            var exception = exceptionData.message.split('||');
            var args = (exception.length > 1) ? exception[1].split('|') : null;

            var msg = (res.db[exception[0]] == null) ? exception[0] : res.db[exception[0]].format(args);
            throw new Error(msg);
          }

          throw exceptionData;
        }
        catch (ex) {
          ShowModal(jqXHR, ex.message);
        }
      }

    });
  }

  //#endregion

  //#region CSS functions

  // Load a CSS file
  var loadCSS = function () {

    var href = $("script[src*='" + infinitescroll_fileName + "']").attr('src').split("-")[0];

    if ($("link[href*='" + infinitescroll_fileName + "']").length == 0) {
      var css = $("<link rel='stylesheet' type='text/css' href='" + href + ".css'>");
      $("head").append(css);
    }
  };

  loadCSS();

  //#endregion

  //#region InfiniteScroll Vue directive

  var InfiniteScroll = {

    // Vue Custom directive see:  https://vuejs.org/v2/guide/custom-directive.html

    // Called only once, when the directive is first bound to the element.
    bind: function bind(el, binding, vnode) {

      el[infinitescroll_pluginName] = {
        el: el,
        $el: $(el),
        vm: vnode.context,
        expression: binding.value,
        args: arguments
      };

      // Called after the instance has been mounted see: https://vuejs.org/v2/api/#mounted
      el[infinitescroll_pluginName].vm.$on('hook:mounted', function () {

        // Defer the callback to be executed after the next DOM update cycle see: https://vuejs.org/v2/api/#vm-nextTick
        el[infinitescroll_pluginName].vm.$nextTick(function () {

          doBind.call(el[infinitescroll_pluginName]);
        });
      });

    },

    // Called when the bound element has been inserted into its parent node
    inserted: function inserted(el, binding, vnode) {      
    },

    // Called only once, when the directive is unbound from the element.
    unbind: function unbind(el) {

      if (el && el[infinitescroll_pluginName] && el[infinitescroll_pluginName].scrollEventTarget)
        el[infinitescroll_pluginName].scrollEventTarget.removeEventListener('scroll', el[infinitescroll_pluginName].scrollListener);
    }
  };

  //#endregion

  //#region Install directive

  var install = function install(Vue) {

    Vue.directive('FormatInfiniteScroll', InfiniteScroll);
  };

  if (window.Vue) {

    window.infiniteScroll = InfiniteScroll;
    Vue.use(install);
  }

  // Install
  InfiniteScroll.install = install;

  //#endregion

  return InfiniteScroll;
})
);