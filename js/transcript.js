function Transcript(array_of_quotes) {
  this.quotes = []
  var self = this 
  for (i=0; i<array_of_quotes.length; i++) {
    self.quotes.push(new Quote(array_of_quotes[i].start_time, 
                               array_of_quotes[i].end_time, 
                               array_of_quotes[i].text))
  }
}
