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

    $('button#share').on('click', function share() {
      var img;
      try {
        img = Canvas.can.toDataURL('image/jpeg', 0.9).split(',')[1];
      } catch(e) {
        img = Canvas.can.toDataURL().split(',')[1];
      }
      var w = window.open();
      w.document.write('Uploading... This may take a moment.');
      $.ajax({
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': 'Client-ID 05de8015cc777bc'
        },
        type: 'POST',
        data: {
          type: 'base64',
          title: 'test title',
          caption: 'Canvas.quote',
          image: img
        },
        dataType: 'json'
      }).success(function(data) {
        w.close();
        var imgurLink = data.data.link;
        FB.ui({
          method: 'feed',
          picture: imgurLink,
          name: "Queer Quote",
          link: "http://samsamskies.github.io/Queer-Quote/",
          caption: "Listen to ouLoud Radio at Queer Quote",
          description: '"' + quote + '"'
        }, function(response){});
      }).error(function() {
        alert('Could not reach api.imgur.com. Sorry :(');
          w.close();
        });
    }),

    $('#share_modal').on('hidden.bs.modal', function () {
      Canvas.clear()
      Canvas.init()
      Player.pop.play()
    });
  }
};