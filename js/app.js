$(function() {
  console.log('testing');
  console.log(jQuery);

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
});