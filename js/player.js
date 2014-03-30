var Player = {

  init: function(options) {
    this.containerTarget = options.container,
    this.footnoteTarget = options.footnoteTarget,
    this.soundcloudBaseUrl = options.soundcloudBaseUrl,
    this.srtApiEndpoint = options.srtApiEndpoint,
    this.setupPlayerAndTranscripts(options.soundcloudPermalink, options.srtUrl)
  },

  setupPlayerAndTranscripts: function(soundcloudPermalink, srtUrl){
    var soundcloudUrl = this.soundcloudBaseUrl + soundcloudPermalink
    var srtRequestUrl = this.srtApiEndpoint + srtUrl
    this.setupPlayer(soundcloudUrl)
    this.getTranscript(srtRequestUrl)
  },

  setupPlayer: function(soundcloudUrl){
    // Recommended 'Wrapper' Method:
    var wrapper = Popcorn.HTMLSoundCloudAudioElement(this.containerTarget)
    wrapper.src = soundcloudUrl
    this.pop = Popcorn(wrapper)

    // // Deprecated 'Player' Method:
    //this.pop = Popcorn.soundcloud(this.containerTarget, soundcloudUrl);
    // // Error Message: Deprecated player 'soundcloud'. Please use Popcorn.HTMLSoundCloudAudioElement directly.
  },

  getTranscript: function(srtUrl){
    var self = this
    $.getJSON(srtUrl, function(response){
      self.transcript = new Transcript(response)
      self.generateFootnotes(self.footnoteTarget)
    })
  },

  generateFootnotes: function(footnoteTarget) {
    $.each(Player.transcript.quotes, function(index, quote) {
      if (index === 0){
        quote.start += .0001 // so that the first subtitle does not appear until player starts
      }
      Player.pop.footnote( {
        start: quote.start,
        end: quote.end,
        text: quote.text,
        target: footnoteTarget
      })
    })
  },

  reset: function(options){
    this.clearPlayer()
    this.setupPlayerAndTranscripts(options.soundcloudPermalink, options.srtUrl)
  },

  clearPlayer: function(){
    $(this.containerTarget).empty()
    $(this.footnoteTarget).empty()
  }

}







