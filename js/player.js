var Player = {

  init: function(options) {
    this.container = options.container
    this.footnoteTarget = options.footnoteTarget
    this.pop = Popcorn.soundcloud( this.container, options.soundcloudUrl);
    this.getTranscript(options.srtUrl)
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
    $(App.soundcloudContainerId).empty()
    $(App.footnoteTarget).empty()
  }
}







