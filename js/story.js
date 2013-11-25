var StoryController = {

  data: [],

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
      var storyData = {
        soundcloudPermalink: title.replace(/\'/g,"").replace(/ /g,"-").toLowerCase(),
        srtUrl: story['Transcript File'],
      }
      self.data.push(storyData)
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
      var storyData = StoryController.data[i]
      Player.reset(storyData);
    })
  }
}