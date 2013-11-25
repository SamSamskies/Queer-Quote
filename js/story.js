var StoryController = {

  data: [],

  init: function(linksTarget){
    this.linksTarget = linksTarget
    this.getStories();
  },

  getStories: function() {
    var self = this
    $.getJSON(App.outloudStoriesProxy, function(stories){
      self.saveStories(stories, self.addStoryLinkListeners)
    })
  },

  saveStories: function(stories, linkListenersCallback){
    var self = this
    $.each(stories, function(i,story){        
      var title = story['node_title']
      var storyData = {
        soundcloudPermalink: title.replace(/\'/g,"").replace(/ /g,"-").toLowerCase(),
        srtUrl: story['Transcript File'],
      }
      self.data.push(storyData)
      self.insertStoryLink(i, title)
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
      var storyData = StoryController.data[i]
      Player.reset(storyData);
    })
  }
}