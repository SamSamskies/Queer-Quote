$(document).ready(function() {
  Player.init( '#soundcloud', 'http://soundcloud.com/outloud-radio-1/a-trans-cendent-perspective' );
  App.initListeners();
});

var App = {
  initListeners: function() {
    $("#update").click(function(e) {
      e.preventDefault();
      drawText();
    });
  }
};

