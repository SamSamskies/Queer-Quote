$("body").ready(init());
var can, ctx;

function init() {
    can = document.getElementById("can");
    ctx = can.getContext("2d");
}

function drawText() {
      // var size = $("#size").val(),
      // bgColor = $("#bgColor").val(),
      // fgColor = $("#fgColor").val(),
      // originalText = $("#text").val(),
      // finalText = originalText.split(' ').join('+');
      // console.log(finalText);
    ctx.fillStyle = "000000";
    ctx.fillRect(0,0,500,400);
    ctx.fillStyle = $("#fgColor").val();
    ctx.font = "24pt Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText($("#text").val(), can.width / 2 , can.height / 2);
}