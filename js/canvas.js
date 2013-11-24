var Canvas = {

  init: function() {
    this.can = document.getElementById("can");
    this.ctx = this.can.getContext("2d");
    this.maxWidth = 460;
    this.lineHeight = 40;
    this.x = (this.can.width - this.maxWidth) / 2;
    this.y = (this.can.height /2);
    this.setBgColor();
    this.ctx.fillStyle = $("#fgColor").val();
    // Add variable to change font size based on y
    this.renderWatermark();
    this.ctx.font = "bold 22pt Berkshire Swash";
  },

  renderWatermark: function() {
    this.ctx.font = '10pt Arial';
    this.ctx.fillText('outloudradio.org', 380, 390);
    this.ctx.font = "bold 22pt Berkshire Swash";
  },

  setBgColor: function() {
    this.ctx.fillStyle = $("#bgColor").val();
    this.ctx.fillRect(0,0,500,400);
  },

  // Add x variable change to this function
  calcYposition: function(quote) {
    var y = this.y;
    var line = '';
    for (var i = 0; i < quote.length; i++) {
      var testLine = line + quote[i];
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > this.maxWidth && i > 0) {
        // console.log(y);
        line = quote[i];
        y -= this.lineHeight /2;
      } else {
        line = testLine;
      }
    }
    return y;
  },

  wrapText: function(quote) {
    var words = quote.split(' ');
    var line = '';

    var y = this.calcYposition(quote)

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
}