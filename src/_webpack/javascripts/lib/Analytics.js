function isElementInView(element, fullyInView) {
  var pageTop = $(window).scrollTop()
  var pageBottom = pageTop + $(window).height()
  var elementTop = $(element).offset().top
  var elementBottom = elementTop + $(element).height()

  if (fullyInView === true) {
    return ((pageTop < elementTop) && (pageBottom > elementBottom))
  } else {
    return ((elementTop <= pageBottom) && (elementBottom >= pageTop))
  }
}

export default class Analytics {
  static track(category, action, label = null, value = null) {
    const eventData = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action
    }

    if (label != null) eventData['eventLabel'] = label
    if (value != null) eventData['eventValue'] = value

    ga('send', eventData)
  }

  static trackSiteEvents() {
    $('.js-track-visible').one('gettingVisible', function(ev) {
      const data = $(this).data()
      Analytics.track(data.trackCategory, data.trackAction, data.trackLabel, data.trackValue)
    })

    $('.js-track-click').on('click', function(ev) {
      if ($(this).data('trackLabel')) {
        Analytics.track('Link', 'click', $(this).data('trackLabel'))
      } else {
        Analytics.track('Link', 'click', this.href)
      }
    })

    $(window).scroll(function() {
      const elements = $('.js-track-visible')
      elements.each(function() {
        if (isElementInView(this)) {
          $(this).trigger('gettingVisible')
        }
      })
    })
  }
}
