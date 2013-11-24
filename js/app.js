$(document).ready(function() {
  Player.init({
    container: App.soundcloudContainerId,
    footnoteTarget: App.footnoteTarget,
    soundcloudUrl: App.soundcloudUrl,
    srtUrl: App.srtApiEndpoint + App.srtUrl
  });
  App.initListeners();
});


var App = {

  // Update these 2 urls to change what podcast gets loaded on the page
  soundcloudUrl: 'http://soundcloud.com/outloud-radio-1/a-trans-cendent-perspective',
  srtUrl: 'http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt',

  soundcloudContainerId: '#soundcloud',
  footnoteTarget: 'footnote',
  srtApiEndpoint: 'http://srt2json.herokuapp.com/?url=',

  initListeners: function() {

    $("#share_button").click(function(e) {
      e.preventDefault();

      text = $(".quote:visible")
      text = (text.length > 0) ? text.html() : 'Play the podcast. :)'

      getY();
      wrapText(ctx, text, x, y, maxWidth, lineHeight);

      Player.pop.pause()
    });

    $("#soundcloud").on('DOMSubtreeModified', function() {
      $('.spinner').fadeOut()

    });

    $('button#share').on('click', function() {
      u = 'http://www.catster.com/files/original.jpg'
      window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u));
    })

    $('#share_modal').on('hidden.bs.modal', function () {
      Player.pop.play()
    })
  }
};
