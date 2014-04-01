var Canvas = {

  init: function() {
    this.can = document.getElementById("can");
    this.ctx = this.can.getContext("2d");
    this.maxWidth = 460;
    this.lineHeight = 42;
    this.x = (this.can.width - this.maxWidth) / 2;
    this.y = (this.can.height /2);
    // this.setColors();
    // this.renderWatermark();
    this.default_font = 38;
    this.ctx.font = "bold " + this.default_font +"pt Berkshire Swash";
  },

  renderWatermark: function() {
    this.ctx.font = '10pt Arial';
    this.ctx.fillText('outloudradio.org', 380, 390);
    this.ctx.font = "bold " + this.default_font + "pt Berkshire Swash";
  },

  setColors: function() {
    this.ctx.fillStyle = $("#bgColor").val();
    this.ctx.fillRect(0,0,500,400);
    this.ctx.fillStyle = $("#fgColor").val();
  },

  createQuote: function(quote) {
    words = quote.split(' ');
    var first_word = words[0];
    first_word = first_word.split('');
    if (first_word[first_word.length - 1] == ':') {
      words = words.slice(1, words.length);
      words[0] = '"' + words[0];
      words[words.length-1] = words[words.length-1] + '"';
    } else {
      words[0] = '"' + words[0];
      words[words.length-1] = words[words.length-1] + '"';
    }
    return words;
  },

  // Add x variable change to this function
  calcYposition: function(quote) {
    var words = this.createQuote(quote);

    var y = this.y;
    var line = '';

    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > this.maxWidth && i > 0) {
        line = words[i] + ' ';
        Canvas.updateLineHeight(1);
        Canvas.updateFontSize(2);
        if ((y - Canvas.lineHeight/2) > (Canvas.can.height/10)) {
          y -= Canvas.lineHeight /2;
        } else {
          return y;
        }
      } else {
        line = testLine;
      }
    }
    return y;
  },

  updateLineHeight: function(line_decrement) {
    Canvas.lineHeight -= line_decrement;
  },

  updateFontSize: function(font_decrement) {
    Canvas.default_font -= font_decrement;
    Canvas.ctx.font = "bold " + this.default_font  +"pt Berkshire Swash";
  },

  renderText: function(quote) {
    Canvas.setColors();
    Canvas.renderWatermark();
    var words = this.createQuote(quote);

    var line = '';
    var y = this.calcYposition(quote);

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > this.maxWidth && n > 0) {
        this.ctx.fillText(line, this.x, y);
        line = words[n] + ' ';
        y += this.lineHeight;
      }
      else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, this.x, y);
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.can.width, this.can.height);
  }
};