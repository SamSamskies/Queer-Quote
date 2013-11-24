var Player = {

  init: function(container, url) {
    this.pop = Popcorn.soundcloud( container, url );
    var self = this
    $.getJSON("http://srt2json.herokuapp.com/?url=http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt", function(response){
      self.transcript = new Transcript(response)
      self.generateTranscripts()
    })
  },

  generateTranscripts: function() {
    $.each(Player.transcript.quotes, function(index, quote) {
      if (index === 0){
        quote.start += .0001 // so that the first subtitle does not appear until player starts
      }
      Player.pop.footnote( {
        start: quote.start,
        end: quote.end,
        text: quote.text,
        target: 'footnote'
      })
    })
  }
}







