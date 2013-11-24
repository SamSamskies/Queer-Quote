function Transcript(quotes) {
  this.quotes = []
  for (i = 0; i < quotes.length; i++) {
    this.quotes.push(new Quote(quotes[i].start_time.replace(/\D/g,'')/1000,
                               quotes[i].end_time.replace(/\D/g,'')/1000,
                               quotes[i].text))
  }
  console.log(quotes)
}
