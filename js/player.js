var Player = {

  init: function(options) {
    this.containerTarget = options.container
    this.footnoteTarget = options.footnoteTarget
    this.setupPlayerAndTranscripts(options.soundcloudUrl, options.srtUrl)
  },

  setupPlayerAndTranscripts: function(soundcloudUrl, srtUrl){
    this.setupPlayer(soundcloudUrl)
    this.getTranscript(srtUrl)
  },

  setupPlayer: function(soundcloudUrl){
    this.pop = Popcorn.soundcloud(this.containerTarget, soundcloudUrl);
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

  reset: function(){
    this.clearPlayer()

  },

  clearPlayer: function(){
    $(this.containerTarget).empty()
    $(this.footnoteTarget).empty()
  }

}







