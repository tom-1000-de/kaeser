import Analytics from './lib/Analytics'
import ScrollReveal from 'scrollreveal'
import SmoothScroll from 'smoothscroll-polyfill'

SmoothScroll.polyfill()

const sr = ScrollReveal()


Analytics.trackSiteEvents()

Smooch.on('widget:opened', function() {
  Analytics.track('Chat', 'open')
})

Smooch.on('message:sent', function(message) {
  Analytics.track('Chat', 'sent', message)
})

$('.js-smooch-open').on('click', function(ev) {
  ev.preventDefault()
  Smooch.open()
})

sr.reveal('.js-bottom-in', { origin: 'bottom', scale: 1 })
sr.reveal('.js-top-in', { origin: 'top', distance: '50px', scale: 1 })


$('.js-there-is-more').on('click', function(ev) {
  ev.preventDefault()
  const $this = $(this)
  const modal = $this.next('.js-modal')
  const close = modal.find('.js-close')

  close.on('click touchend', function(ev) {
    ev.preventDefault()
    modal.fadeOut()
  })

  modal.fadeIn()
})


$('.js-newsletter').submit(function(e) {
  e.preventDefault()
  const $this = $(this)

  Analytics.track('Newsletter', 'send', 'before', $this.find('input[name="EMAIL"]').val())

  $.ajax({
    type: "GET",
    url: "//echtland.us11.list-manage.com/subscribe/post-json?c=?",
    data: $this.serialize(),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    error(err) { return alert("Could not connect to the registration server.") },
    success(data) {
      if (data.result !== "success") {
        $this.find('.js-newsletter-notice').html(`<p>${data.msg}</p>`)
        Analytics.track('Newsletter', 'send', 'fail')
      } else {
        $this.find('.js-newsletter-notice').html(`<p>${data.msg}</p>`)
        Analytics.track('Newsletter', 'send', 'success', $this.find('input[name="EMAIL"]').val())
      }
    }
  })
})


$('.js-nav-open').on('click', function(ev) {
  ev.preventDefault()

  $('.js-nav-list').fadeToggle()

  $('.js-nav-list a').on('click', function(ev) {
    $('.js-nav-list').fadeOut()
  })
})

$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});
