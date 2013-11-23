var Player = {

  init: function(container, url) {
    this.pop = Popcorn.soundcloud( container, url );
    this.transcript = new Transcript('http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt')
    this.generateTranscripts()
  },

  generateTranscripts: function() {
    $.each(Player.transcript.quotes, function(index, quote) {
      Player.pop.footnote( {
        start: quote.start,
        end: quote.end,
        text: quote.text,
        target: 'footnote'
      })
    })
  }
}

