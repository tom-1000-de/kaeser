var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
    playerDefaults = {autoplay: 0, loop: true, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
      {'videoId': 'srtm1nOjCog', 'startSeconds': 0, 'suggestedQuality': 'hd720'},
    ],
    currVid = 0;

window.onYouTubeIframeAPIReady = function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

window.onPlayerReady = function onPlayerReady(event){
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

window.onPlayerStateChange = function onPlayerStateChange(e) {
  if (e.data === 1){
    $('.c-masthead')
      .css('background-image', 'none')
      .css('background-color', 'transparent')

    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 2){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);

  } else if (e.data === YT.PlayerState.ENDED) {
    tv.playVideo();
  }
}

function vidRescale(){

  var w = $(window).width()+200,
    h = $(window).height()+200;

  if (w/h > 16/9){
    tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
    $('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span:first-of-type').on('click', function(){
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});

$('.hi span:last-of-type').on('click', function(){
  $('.hi em:nth-of-type(2)').html('~');
  tv.pauseVideo();
});
