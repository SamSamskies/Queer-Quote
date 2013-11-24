$(document).ready(function() {

  // Update these 2 urls to change what podcast gets loaded on the page
  var soundcloudUrl = 'http://soundcloud.com/outloud-radio-1/a-trans-cendent-perspective'
  var srtUrl = 'http://srt2json.herokuapp.com/?url=http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt'

  Player.init({
    container: '#soundcloud',
    footnoteTarget: 'footnote',
    soundcloudUrl: soundcloudUrl,
    srtUrl: srtUrl
  });
  App.initListeners();
});

var App = {
  initListeners: function() {
    $('#footnote').on('click', '.quote', function(e) {

      // temporary just for show
      u = 'http://www.catster.com/files/original.jpg'
      window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u));
      e.preventDefault()
    });

    $("#share_button").click(function(e) {
      e.preventDefault();
      drawText($(".quote:visible").html());
    });

    $("#soundcloud").bind('DOMSubtreeModified', App.hideSpinner);
  },

  hideSpinner: function() {
    $('.spinner').fadeOut()
  }
};
