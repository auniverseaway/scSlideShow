jQuery.fn.CreateSCShow = function() {
    slideShow = this;
  slideChildren = slideShow.children(".slide");

  // Dynamically add our ids and buttons based on our slide count
  $(slideChildren).each(function(index) {
    $(this).attr("id", "slide-" + index);
    $("#controls").append("<a href='#' class='slide-button' id='button-" + index + "'>" + index++ + "</a>");
  });

  slideShow.children(".slide").Rotate({ cycleTime: 5000, fadeTime: 1000 });
  
  jQuery('.slide-button').click(function(){
    var buttonId = jQuery(this).attr('id'); // get the current button id
    jQuery('.slide-button').removeClass('active'); // remove all active classes on the slide buttons
    jQuery(this).addClass('active');
    var showSlide = buttonId.replace("button","slide");
    jQuery("#" + showSlide).siblings(".slide").fadeOut(function(){
      jQuery("#" + showSlide).fadeIn();
    });
    return false;
  });
}

jQuery.fn.Rotate = function(config) {
    var currentIdx = 0;
    var items = [];
    var itemCount = this.each(function(idx, a) {
      items.push(jQuery(a));
    }).length;

    function rotateItem()
    {
      var front = items[currentIdx];
      var back = items[currentIdx = ((currentIdx + 1) % itemCount)];

      // Fade in the back before we hide the front
      back.fadeIn(config.fadeTime);

      // Let's find out what button to make "active"
      var slideId = jQuery(back).attr('id');
      var activeButton = slideId.replace("slide","button");
      jQuery('.slide-button').removeClass('active');
      jQuery("#" + activeButton).addClass('active');

      // Fade out the front and then hide
      front.fadeOut(config.fadeTime, function() { 
        front.hide(); 
      });
    }
    setInterval(rotateItem, config.cycleTime);
}