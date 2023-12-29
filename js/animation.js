var lastClicked = null;
$(".mybutton").on({
      "click": function(event) {
            if(!$(this).is(lastClicked)) {
                  if(lastClicked) {
                        lastClicked.animate({
                              height: '-=10',
                              opacity: '1.0'}, 
                              "slow");
                  }
      
                  $(this).animate({
                        height: '+=10',
                        opacity: '0.4'}, 
                        "slow");
                  
                  lastClicked = $(this);
            }
      }, 
      "mouseenter": function(event) {
           // if(!$(this).is(lastClicked)) {
                  $(this).animate({
                        top: '+=2'}, 
                        "fast"); 
            //}     
      }, 
      "mouseleave": function(event) {
            //if(!$(this).is(lastClicked)) {
                  $(this).animate({
                        top: '-=2'}, 
                        "fast");   
            //}
      }
});