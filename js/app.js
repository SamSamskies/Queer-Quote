$(document).ready(function() {
  Player.init( '#soundcloud', 'http://soundcloud.com/outloud-radio-1/a-trans-cendent-perspective' )

  $("button").click(function(e) {
    e.preventDefault();
    console.log(bgColor);
    var size = $("#size").val(),
    bgColor = $("#bgColor").val(),
    fgColor = $("#fgColor").val(),
    originalText = $("#text").val(),
    finalText = originalText.split(' ').join('+');
    console.log(finalText);
    $("#image_display").html('<img src="http://dummyimage.com/' + size + '/' + bgColor + '/' + fgColor + '.png&text=' + finalText + '">');
  });
})
