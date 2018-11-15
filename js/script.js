'use strict';
//two ways to get the banner fade-in fade-out effect

//1. use eq filtering to fade in next sibling, fade out all others 
$(function() {
  var bannerIndex = 0;
  var numSiblings = $(".banner").length;
  var paused = false;
  /*********************************************Fade Fx ************************************************/
  $(".left-switch").click(function() {
      bannerIndex = (bannerIndex - 1) % numSiblings;
      // $(".banner").eq($bannerIndex).addClass("active-banner").siblings().removeClass("active-banner");
      $(".banner").eq(bannerIndex).fadeIn('fast').siblings().fadeOut('fast');//use the fadeIn() and fadeOut() in jQuery to realize more gentle switch
      paused = true;
      setTimeout(function(){ paused = false}, 5000);
  });

  $(".right-switch").click(function() {
      loopForward();
      paused = true;
      setTimeout(function(){ paused = false}, 5000);
  });

  function loopForward() {
    bannerIndex = (bannerIndex + 1) % numSiblings;
    $(".banner")
      .eq(bannerIndex).fadeIn('fast')
      .siblings().fadeOut('fast');
  }

  setInterval(function(){
      if(!paused) loopForward(); // use paused as the switch of the setInterval
  }, 5000);

  /*********************************************Translate Fx ************************************************/
  //caching the DOM, for faster access later!
  var $topBanner = $("#top-banner-1");
  var $bannerSequence = $topBanner.find(".banner-sequence-1"); // use find based on cached jQuery Obj for faster access
  var $banner = $bannerSequence.find(".banner-1");
  var index = 0;
  var count = $banner.length;
  var width = $("#top-banner-1").width();
  $banner.width(width);
  $bannerSequence.width(width * count);

  $(window).resize(function() {
    var width = $topBanner.width();
    $banner.width(width);
    $bannerSequence.width(width * count);
  });

  function playNext() {
    var width = $topBanner.width();
    var transitionTime = 300 * (width / 1500); 
    $bannerSequence.animate({ 'margin-left': '-=' + width}, transitionTime, function() {
      index ++;
      if(index == count - 1) {
        index = 0;
        $bannerSequence.css('margin-left', 0);
      }
    });
  }

  function playPrev() {
    var width = $topBanner.width();
    var transitionTime = 300 * (width / 1500); 
    if(--index == -1) {
      index = count - 2;
      $bannerSequence.css('margin-left', -width * (count - 1));
    } 
    $bannerSequence.animate({ 'margin-left': '+=' + width}, transitionTime); //since index-decrement and animate() here are not indivisable step, immediate consecutive call can break the logic and cause chaos
  }

  $(".left-switch-1").click(function() {
    playPrev();
  });

  $(".right-switch-1").click(function() {
    playNext();
  });
  
  var interval;
  function startSlider() {
    interval = setInterval(playNext, 8000); // one drawback of this method is that the last slide won't stay, once the animation is complete, the margin-left will be reset to 0.
  //thus we need to append a extra first slide at the end
  }

  function pauseSlider() {
    clearInterval(interval);
  }
  $topBanner.on('mouseenter', pauseSlider).on('mouseleave', startSlider);
  startSlider(); //Don't forget!

//2.Only display the first element in the jQuery object, fade out current and fade in next, then append current to end.
  $("#slideshow > .slide").slice(1).hide(); // this line is necessary to make sure only the first card is shown, otherwise the image below will be visable during the first number of shifts
  
  setInterval(function() {
    $("#slideshow > .slide:first")
      .fadeOut('slow')
      .next().fadeIn('slow')
      .end()
      .appendTo('#slideshow');
  }, 5000);

});







