$("body").ready(init());

var can, ctx;
var maxWidth = 375;
var lineHeight = 25;
var x = (can.width - maxWidth) / 2;
var y = (can.height /2) + (lineHeight /2);
var text = $(".quote:visible").html();


function init() {
  can = document.getElementById("can");
  ctx = can.getContext("2d");
}

ctx.fillStyle = $("#bgColor").val();
ctx.fillRect(0,0,500,400);
ctx.fillStyle = $("#fgColor").val();
ctx.font = "16pt Calibri";

function getY() {
  var line = '';
  for (var i = 0; i < text.length; i++) {
    var testLine = line + text[i];
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
            // console.log(y);
            line = text[i];
            y -= lineHeight;
          } else {
            line = testLine;
          }
      }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}