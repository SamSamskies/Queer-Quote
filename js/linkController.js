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
      var title = story['node_title']
      var story = {
        soundcloudPermalink: title.replace(/\'/g,"").replace(/ /g,"-").toLowerCase(),
        srtUrl: story['Transcript File'],
      }
      self.storyData.push(story)
      self.insertStoryLink(i, title)
    })
    self.addStoryLinkListeners()
  }, 

  insertStoryLink: function(i, title){
    var storyLink = "<a class='story' data-id='" + i + "' href=#>" + title + "</a>"
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