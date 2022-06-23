
// #region Declaration

var infiniteScroll = null;

var $itemList = null;
var $itemsFound = null;
var $inputSearch = null;

var _animationScroll = 500;
var _maxPages = 20;

// #endregion

//#region functions

//To view number as 8.748
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

// Search button
function Search(searchValue) {

  var show = $(".navbar-collapse").hasClass("show");
  var delay = 0;

  if (show) {
    $('.navbar-collapse').collapse('hide');
    delay = 200;
  }

  // Wait bootstrap navbar transition
  setTimeout(function () {

    var is = infiniteScroll.$el["format.infinitescroll"];

    var request = new Object();

    request.startIndex = 0;
    request.filter = searchValue;
    request.pageSize = is.request.pageSize;
    request.counter = 0;
    request.order = (is.request.order != null) ? is.request.order : null;
    request.distance = (is.request.distance != null) ? is.request.distance : null;
    request.latitude = (is.request.latitude != null) ? is.request.latitude : null;
    request.longitude = (is.request.longitude != null) ? is.request.longitude : null;

    is.reload(request);

  }, delay);
}

//#endregion

// #region Modal & Toast

// Show modal
function ShowModal(jqXHR, exception, url = '/') {

  var msg = 'Uncaught Error.<br>Exception: ' + exception + '<br>Response: ' + jqXHR.responseText;

  if (exception === 'abort')
    return;

  if (jqXHR.status === 0)
    msg = 'Please check your internet connection and retry.';

  else if (jqXHR.status === 400)
    msg = 'Bad request [400].';

  else if (jqXHR.status === 401) {
    window.location = '/users/login?RequestPath=' + encodeURIComponent(url);
    return;
  }

  else if (jqXHR.status === 403)
    msg = 'Not authorized [403].';

  else if (jqXHR.status === 404)
    msg = 'Requested page not found [404].';

  else if (jqXHR.status === 500)
    msg = 'Internal Server Error [500].<br>Exception: ' + exception + '<br>Response: ' + jqXHR.responseText;

  else if (exception === 'parsererror')
    msg = 'Requested JSON parse failed.';

  else if (exception === 'timeout')
    msg = 'Time out error.';

  else if (exception === 'abort')
    msg = 'Ajax request aborted.';

  $('#modalTitle').html('Error');
  $('#modalBody').html('An error has appear while retrieving data!<br>' + msg);
  $("#modalCenter").modal('show');
}

// Show toast
function ShowToast(title, msg, url = null, delay = 30000) {

  $toastContainer = $('[data-type="toast-container"]');
  let $toast = $('[data-type="toast-model"]').clone(true, true);
  $toast.show();
  $toast.removeAttr('data-type');
  $toast.attr('data-autohide', false);

  if (url != null) {
    $toast.find('.toast-body').click(function () {
      window.location = url;
    });

    $toast.css('cursor', 'pointer');
  }

  if (delay != 0)
    $toast.data('time', setTimeout(function () {
      $toast.toast('hide');
      $toast.remove();
    }, delay));

  $toast.hover(function () {
    clearTimeout($toast.data('time'));
  });

  $toast.mouseleave(function () {

    setTimeout(function () {
      $toast.toast('hide');
      $toast.remove();
    }, delay = 0 ? 30000 : delay);
  });

  $toast.addClass('toast');
  $toast.find('[data-type="toast-title"]').html(title);
  $toast.find('.toast-body').html(msg);

  /* Remove the first children if there is more than 5 notifications */
  if ($('[data-type="toast-container"]').children().length > 5)
    $('[data-type="toast-container"]').children()[0].remove();

  $toastContainer.append($toast);

  $toast.toast('show');
}

// #endregion

// #region Ajax

// #endregion

//#region Vue infinitescroll plugin

function initVue(model) {

  infiniteScroll = new Vue({

    el: "#listAuctions",

    data: {
      model: model,
      autoscroll: false,
      onload: function (response) {

        // Stop infinite scroll after max pages...
        if (this.request.counter > _maxPages)
          this.response.nextIndex = 0;
      }
    },

    methods: {

      priceDecimals: function(price) {
        return (',' + parseFloat(price % 1).toFixed(2).substring(2));
      },

      priceNumbers: function(price) {
        return formatNumber(Math.floor((parseFloat(price)).toFixed(2)));
      },

      space: function(item) {
        return (item.Place.City == '') ? '' : ' - ';
      },

      // Get string and return decoded html
      decodeHtml: function(string) {
        return $("<div/>").html(string).text();
      },

      onload: function (response) {
      },

      afterbind: function () {
      },

      // lazyloading directive
      lazyLoading: function (el, binding) {

        $(el).Lazy({

          scrollDirection: 'vertical',
          effect: 'fadeIn',
          effectTime: 100,
          threshold: 1080,

          afterLoad: function (element) {

            $(element).parent().find('.img-loading').hide();
          },

          onError: function (element) {

            $(element).attr('src', binding.value.miss);
            $(element).parent().find('.img-loading').hide();
          }
        });
      },

      // Tooltip directive
      tooltip: function (el, binding) {

        $(el).tooltip({
          title: binding.value.title,
          placement: binding.value.direction == null ? "auto" : binding.value.direction,
          trigger: 'hover',
          delay: { show: 1000, hide: 0 }
        });
      },

    },

    computed: {
      options: function () {
        return this.$el['format.infinitescroll'].options;
      }
    },

    mounted: function () {
    },

    watch: {
    },

    directives: {

      // Lazy loading
      'lazyloading': {

        bind: function (el, binding, vnode) {

          setTimeout(function () {
            vnode.context.lazyLoading(el, binding);
          }, 0);
        },

        update: function (el, binding, vnode) {

          if (vnode.context.$el["format.infinitescroll"].appendInProgress)
            return;

          setTimeout(function () {
            $(el).data('handled', false);
            vnode.context.lazyLoading(el, binding);
          }, 0);
        },

        unbind: function (el, binding, vnode) {

          setTimeout(function () {
            $(el).data('handled', false);
            $(el).data('plugin_lazy').destroy();
          }, 0);
        }
      },

      // Tooltip
      'tooltip': {

        bind: function (el, binding, vnode) {

          setTimeout(function () {
            vnode.context.tooltip(el, binding);
          }, 1000);
        },

        update: function (el, binding, vnode) {

          if (vnode.context.$el["format.infinitescroll"].appendInProgress)
            return;

          setTimeout(function () {
            $(el).tooltip('dispose');
            vnode.context.tooltip(el, binding);
          }, 0);
        },

        unbind: function (el, binding, vnode) {

          setTimeout(function () {
            $(el).tooltip('dispose');
          }, 0);
        }
      }
    }

  });

}

//#endregion

// #region Init variables & Ready

// Init Jquery variables
function initJQueryVar() {

  $itemList = $('[data-type="itemsList"]');
  $itemsFound = $('[data-type="itemsFound"]');
  $inputSearch = $("input[name='search']");
}

// Ready
$(document).ready(function () {

  initJQueryVar();

  // Smooth scrolling feature
  $('a.page-scroll').bind('click', function (event) {

    var $el = $(this);

    $el.tooltip("hide");

    $('html, body').stop().animate({
      scrollTop: $($el.attr('href')).offset().top
    }, _animationScroll, 'easeInOutExpo');

    event.preventDefault();
  });

  // Stop the animation if mouse wheel
  $('html, body').bind('mousewheel', function (e) {
    $('html, body').stop();
  });

  // Search button submit 
  $("[data-type=search]").submit(function (e) {

    // Update filters
    request = new Object();
    request.filter = $inputSearch.val();

    // Search
    Search(request.filter);

    e.preventDefault();
  });

  // Init tooltip
  $('[data-toggle="tooltip"]').tooltip({
    delay: { show: 1000, hide: 0 },
    trigger: "hover"
  });

});

// #endregion