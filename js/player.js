Player = {

  init: function(container, url) {
    this.pop = Popcorn.soundcloud( container, url );
    this.transcript = $.getJSON("http://srt2json.herokuapp.com/?url=http://new.outloudradio.org/sites/default/files/transcripts/A_Trans-cendent_Perspective.en_.srt", function(response){
      new Transcript(response)
    })

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

