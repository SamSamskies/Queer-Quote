var LocationHash = {
  parse: function(){
    var hashstr = window.location.hash.substring(1)
    if (hashstr.length) 
      LocationHash.permalink = hashstr
  },
  permalink: App.soundcloudPermalink,
  update: function(newPermalink){
    window.location.hash = newPermalink
  }
}