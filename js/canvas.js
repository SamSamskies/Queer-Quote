var Canvas = {

  init: function() {
    this.can = document.getElementById("can");
    this.ctx = this.can.getContext("2d");
    this.maxWidth = 375;
    this.lineHeight = 40;
    this.x = (this.can.width - this.maxWidth) / 2;
    this.y = (this.can.height /2) + (this.lineHeight /2);
    this.ctx.fillStyle = $("#bgColor").val();
    this.ctx.fillRect(0,0,500,400);
    this.ctx.fillStyle = $("#fgColor").val();
    this.ctx.font = "bold 22pt Berkshire Swash";
  },

  repositionY: function(quote) {
    var line = '';
    for (var i = 0; i < quote.length; i++) {
      var testLine = line + quote[i];
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > this.maxWidth && i > 0) {
        // console.log(y);
        line = quote[i];
        this.y -= this.lineHeight;
      } else {
        line = testLine;
      }
    }
  },

  wrapText: function(quote) {
    var words = quote.split(' ');
    var line = '';

    this.repositionY(quote)

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > this.maxWidth && n > 0) {
        this.ctx.fillText(line, this.x, this.y);
        line = words[n] + ' ';
        this.y += this.lineHeight;
      }
      else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, this.x, this.y);
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.can.width, this.can.height);
  }
}