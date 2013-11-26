var LinkController = {

  storyData: [],

  init: function(linksTarget, apiUrl){
    this.linksTarget = linksTarget
    this.apiUrl = apiUrl
    this.getStories();
  },

  getStories: function(){
    var self = this
    $.getJSON(this.apiUrl, function(stories){
      self.saveStories(stories)
    })
  },

  saveStories: function(stories){
    var self = this
    $.each(stories, function(i,story){        
      var story = {
        title: story['node_title'],
        description: story['iTunes Subtitle'],
        soundcloudPermalink: story['permalink'],
        srtUrl: story['Transcript File'],
        artworkUrl: story['artwork_url']
      }
      self.storyData.push(story)
      self.insertStoryLink(i, story)
    })
    self.addStoryLinkListeners()
  }, 

  insertStoryLink: function(i, options){
    var storyLink = "<a href='#'><img class='story' data-id='" + i + "' src='" + options.artworkUrl + "' alt='" + options.title + "'></a>"
    $(this.linksTarget).append(storyLink)
  },

  addStoryLinkListeners: function(){
    $('.story').on('click', function(e){
      e.preventDefault()
      var i = e.target.dataset.id
      var newStory = LinkController.storyData[i]
      Player.reset(newStory);
    })
  }
}