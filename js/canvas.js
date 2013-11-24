$("body").ready(init());
var can, ctx;

function init() {
    can = document.getElementById("can");
    ctx = can.getContext("2d");
}

function drawText(text) {
    ctx.fillStyle = $("#bgColor").val();
    ctx.fillRect(0,0,500,400);
    ctx.fillStyle = $("#fgColor").val();
    ctx.font = "24pt Helvetica";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, can.width / 2 , can.height / 2);
}