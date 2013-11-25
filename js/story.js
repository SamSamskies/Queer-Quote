var StoryController = {

  data: [],

  init: function(linksTarget){
    this.linksTarget = linksTarget
    this.getStories();
  },

  getStories: function() {
    $.getJSON(App.outloudStoriesProxy, function(stories){
      StoryController.saveStories(stories, StoryController.addStoryLinkListeners)
    })
  },

  saveStories: function(stories, linkListenersCallback){
    $.each(stories, function(i,story){        
      var title = story['node_title']
      var storyData = {
        soundcloudPermalink: title.replace(/\'/g,"").replace(/ /g,"-").toLowerCase(),
        srtUrl: story['Transcript File'],
      }
      StoryController.data.push(storyData)
      StoryController.insertStoryLink(i, title)
    })
    linkListenersCallback()
  }, 

  insertStoryLink: function(i, title){
    var storyLink = "<a class='story' data-id='" + i + "' href=#>" + title + "</a>"
    $(this.linksTarget).append(storyLink)
  },

  addStoryLinkListeners: function(){
    $('.story').on('click', function(e){
      e.preventDefault()
      var i = e.target.dataset.id
      var story = StoryController.data[i]
      var soundcloudPermalink = story.soundcloudPermalink
      var srtUrl = story.srtUrl
      Player.reset()
      Player.init({
        container: App.soundcloudContainerId,
        footnoteTarget: App.footnoteTarget,
        soundcloudUrl: App.soundcloudBaseUrl + soundcloudPermalink,
        srtUrl: App.srtApiEndpoint + srtUrl
      });
    })
  }
}