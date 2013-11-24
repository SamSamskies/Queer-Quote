$(document).ready(function() {
  App.initListeners();
  Player.init({
    container: App.soundcloudContainerId,
    footnoteTarget: App.footnoteTarget,
    soundcloudUrl: App.soundcloudUrl,
    srtUrl: App.srtApiEndpoint + App.srtUrl
  });
  Canvas.init()
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

      quote = $(".quote:visible")
      quote = (quote.length > 0) ? quote.html() : 'Play the podcast. :)'

      Canvas.wrapText(quote);
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
