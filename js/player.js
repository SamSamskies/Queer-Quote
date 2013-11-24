var Player = {

  init: function(options) {
    this.pop = Popcorn.soundcloud( options.container, options.soundcloudUrl);
    var self = this
    $.getJSON(options.srtUrl, function(response){
      self.transcript = new Transcript(response)
      self.generateFootnotes(options.footnoteTarget)
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
  }
}







