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

    $("#share_button").click(function(e) {
      e.preventDefault();
      text = $(".quote:visible").html();
      getY();
      wrapText(ctx, text, x, y, maxWidth, lineHeight);
    });
  }
};

// <div id="mImageBox">
//     <img id='my_image' src='http://www.catster.com/files/original.jpg'/>
// </div>
// <script>
//     $('#my_image').click(function(e) {
//         u = this.src;
//         window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u));
//     })
// </script>
