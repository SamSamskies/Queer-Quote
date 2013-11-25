$(document).ready(function() {
  Player.init({
    container: App.soundcloudContainerId,
    footnoteTarget: App.footnoteTarget,
    soundcloudUrl: App.soundcloudBaseUrl + App.soundcloudPermalink,
    srtUrl: App.srtApiEndpoint + App.srtUrl
  });
  Canvas.init()
  App.getMoreStories();
  App.initListeners();
});


var App = {

  // Update these 2 urls to change what podcast gets loaded on the page
  soundcloudPermalink: 'a-trans-cendent-perspective',
  srtUrl: 'http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt',

  soundcloudBaseUrl: 'http://soundcloud.com/outloud-radio-1/',
  srtApiEndpoint: 'http://srt2json.herokuapp.com/?url=',
  outloudStoriesProxy: "http://srt2json.herokuapp.com/outloud-stories",

  soundcloudContainerId: '#soundcloud',
  footnoteTarget: 'footnote',
  storyLinksTarget: '.footer',
  moreStories: [],

  getMoreStories: function() {
    $.getJSON(App.outloudStoriesProxy, function(stories){
      App.saveStories(stories, App.addStoryLinkListeners)
    })
  },

  saveStories: function(stories, linkListenersCallback){
    $.each(stories, function(i,story){        
      var title = story['node_title']
      var storyData = {
        soundcloudPermalink: title.replace(/\'/g,"").replace(/ /g,"-").toLowerCase(),
        srtUrl: story['Transcript File'],
      }
      App.moreStories.push(storyData)
      App.insertStoryLink(i, title)
    })
    linkListenersCallback()
  }, 

  insertStoryLink: function(i, title){
    var storyLink = "<a class='story' data-id='" + i + "' href=#>" + title + "</a>"
    $(App.storyLinksTarget).append(storyLink)
  },

  addStoryLinkListeners: function(){
    $('.story').on('click', function(e){
      e.preventDefault()
      var story = App.moreStories[e.target.dataset.id]
      var soundcloudPermalink = story.soundcloudPermalink
      var srtUrl = story.srtUrl
      $(App.soundcloudContainerId).empty()
      Player.init({
        container: App.soundcloudContainerId,
        footnoteTarget: App.footnoteTarget,
        soundcloudUrl: App.soundcloudBaseUrl + soundcloudPermalink,
        srtUrl: App.srtApiEndpoint + srtUrl
      });
    })
  },

  initListeners: function() {

    $("#share_button").click(function(e) {
      e.preventDefault();

      quote = $(".quote:visible")
      quote = (quote.length > 0) ? quote.html() : 'Play the podcast. :)'

      Canvas.wrapText(quote);
      Player.pop.pause()
    });

    $("#bgColor").change(function() {
      Canvas.lineHeight = 42;
      Canvas.default_font = 38;
      Canvas.ctx.fillStyle = $("#bgColor").val();
      Canvas.ctx.fillRect(0,0,500,400);
      Canvas.ctx.fillStyle = $("#fgColor").val();
      Canvas.wrapText($(".quote:visible").html());
      Canvas.renderWatermark();
    });

    $("#fgColor").change(function() {
      Canvas.lineHeight = 42;
      Canvas.default_font = 38;
      Canvas.ctx.fillStyle = $("#fgColor").val();
      Canvas.wrapText($(".quote:visible").html());
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
