function Transcript(quotes) {
  this.quotes = []
  for (i = 0; i < quotes.length; i++) {
    var start_time = convertTime(quotes[i].start_time.replace(/\D/g,''))
    var end_time = convertTime(quotes[i].end_time.replace(/\D/g,''))
    var text = quotes[i].text
    this.quotes.push(new Quote(start_time, end_time, text))
  }
}

function convertTime(hhmmssmmm) {
  var hours = hhmmssmmm.substr(0,2)
  var mins = hhmmssmmm.substr(2,2)
  var secs = hhmmssmmm.substr(4,2)
  var millis = hhmmssmmm.substr(6,3)

  return (60*60*hours) + (60*mins) + (1*secs) + (millis / 1000) 
}
