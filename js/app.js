$(document).ready(function() {
  LocationHash.parse()
  LinkController.init(App.storyLinksTarget, App.outloudStoriesProxy);
  Canvas.init()
  App.initListeners();
});


var App = {

  // Update these 2 urls to change what podcast gets loaded on the page
  soundcloudPermalink: 'a-trans-cendent-perspective',
  //srtUrl: 'http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt',

  soundcloudBaseUrl: 'http://soundcloud.com/outloud-radio-1/',
  srtApiEndpoint: 'http://srt2json.herokuapp.com/?url=',
  outloudStoriesProxy: "http://srt2json.herokuapp.com/outloud-stories",

  soundcloudContainerId: '#soundcloud',
  footnoteTarget: '#footnote',
  storyLinksTarget: '.thumbnails',

  initListeners: function() {

    $("#share_button").click(function(e) {
      e.preventDefault();

      quote = $(".quote:visible")
      quote = (quote.length > 0) ? quote.html() : 'Play the podcast. :)'

      Canvas.renderText(quote);
      Player.pop.pause()
    });

    $(":input").change(function() {
      Canvas.init();
      Canvas.renderText($(".quote:visible").html());
    });

    $("#soundcloud").on('DOMSubtreeModified', function() {
      $('.spinner').fadeOut()

    });

    $('button#share').on('click', function() {
      Canvas2Image.saveAsPNG($("#can")[0]);
    })

    $('#share_modal').on('hidden.bs.modal', function () {
      Canvas.clear()
      Canvas.init()
      Player.pop.play()
    })

  }
};
