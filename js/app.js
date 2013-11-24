$(document).ready(function() {
  Player.init( '#soundcloud', 'http://soundcloud.com/outloud-radio-1/a-trans-cendent-perspective' );
  App.initListeners();
});


var App = {
  initListeners: function() {
    $('#footnote').on('click', '.quote', function(e) {

      // temporary just for show
      u = 'http://www.catster.com/files/original.jpg'
      window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u));
      e.preventDefault()
    });

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
  }
}

// <div id="mImageBox">
//     <img id='my_image' src='http://www.catster.com/files/original.jpg'/>
// </div>
// <script>
//     $('#my_image').click(function(e) {
//         u = this.src;
//         window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u));
//     })
// </script>
