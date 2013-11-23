// http://ericpugh.github.io/Soundcloud-Hyperaudio-Demo/
        
            $(document).ready(function(){

                  //http://popcornjs.org/documentation
                  var popcorn = Popcorn.soundcloud("SCplayer", "http://soundcloud.com/onmdap/after-elections-what-now-for");
                  popcorn.on( "load", function() {
                        popcorn.play();
                        document.getElementById("media-duration").innerHTML = popcorn.duration();
                        document.getElementById("media-volume").innerHTML = popcorn.volume();
                        document.getElementById("media-currentTime").innerHTML = popcorn.currentTime();
                        // Reset all scrollable panes
                        $('div.pane').scrollTo(0);
                        //write the sc comments in sidebar
                        getComments();
                  });
                  popcorn.on("timeupdate", function() {
                        document.getElementById("media-currentTime").innerHTML = popcorn.currentTime();
                  });
                  popcorn.on("volumechange", function() {
                        document.getElementById("media-volume").innerHTML = popcorn.volume();
                  });
                  popcorn.on("readystatechange", function() {
                        document.getElementById("media-readyState").innerHTML = popcorn.video.readyState;
                  });
                  popcorn.on("seeked", function(){
                        //Scroll to the active word
                        activeWord = $(".readme").first();
                        $('div.pane').stop().scrollTo(activeWord,800);
                  });
                  // transcript link to soundcloud timeline
                  $('#transcript #transcript-content span').on('click',function(){  
                        var jumpTo = $(this).attr('m')/1000; 
                        //jump timeline
                        popcorn.currentTime(jumpTo).play();
                        //get the clicked word and display definition
                        var lookup = $(this).text();
                        getDefinition(lookup);
                        return false;
                  });
                        
                  //add "future" class to transcript for readability
                  $("#transcript-content span").each(function(i) { 
                        var timeInSecs = $(this).attr("m") / 1000;
                        popcorn.transcript({
                              time: timeInSecs,
                              futureClass: "readme",
                              target: this
                        });  
                  }); 
                  
                  function getComments(){
                        //output soundcloud comments
                        //TODO: convert the time from Soundcloud to seconds so we can link the output comment to the audio timeline.
                        var comment;
                        $.getJSON("http://api.soundcloud.com/tracks/30601944/comments.json?client_id=7f293a1d5fddb694643dd05f5b1c7f21",
                              function(json, status){
                                    if(status == "success"){
                                            for (var i = 0; i < json.length; i++){
                                                if(json[i].kind == 'comment'){
                                                      commentDiv = $('#SCcomments');
                                                      comment = '<div class="comment-item"><a href="' + json[i].user.permalink_url + '">' +
                                                       '<img class="comment-avatar" width="75px" height="75px" src="' + json[i].user.avatar_url + '" /></a>' +
                                                            '<a class="comment-user" href="' + json[i].user.permalink_url + '">' + json[i].user.username + '</a>' +      
                                                       '<p class="comment-body">' + json[i].body + '</p>' +
                                                       '</div>';
                                                       commentDiv.prepend(comment);
                                                }
                                          }
                                    }
                              });
                  } // end getComments

                  //display the definition of clicked word
                  function getDefinition(lookup){
                        //ignore short words
                        if(lookup.length > 5){
                              //set loading image
                              $("#definition").addClass('loading');
                              $.getJSON("http://en.wiktionary.org/w/api.php?action=query&list=search&rvprop=content&format=json&srsearch="+ lookup +"&callback=?",
                                    function(json, status){
                                          if(status == "success"){
                                                //output the word definition box
                                                $("#definition").hide();
                                                //TODO title is undefined when no result returned
                                                var definitionTitle = json.query.search[0].title;
                                                var definitionText = json.query.search[0].snippet;
                                                //console.log("the definition is: " + definitionTitle + ", " + definitionText);
                                                if(definitionTitle.length > 0){
                                                      $("#definition p.word").html(definitionTitle);
                                                      $("#definition p.word-definition").html(definitionText);
                                                      $("#definition").removeClass('loading');
                                                      $("#definition").show();
                                                }
                                          }
                              });
                        }
                  } //end getDefinition
                  
                              
            });
      
      