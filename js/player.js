var Player = {

  init: function(options) {
    this.pop = Popcorn.soundcloud( options.container, options.soundcloudUrl);
    var self = this
    $.getJSON(options.srtUrl, function(response){
      self.transcript = new Transcript(response)
      self.generateTranscripts(options.footnoteTarget)
    })
  },

  generateTranscripts: function(footnoteTarget) {
    $.each(Player.transcript.quotes, function(index, quote) {
      Player.pop.footnote( {
        start: quote.start,
        end: quote.end,
        text: quote.text,
        target: footnoteTarget
      })
    })
  }
}







