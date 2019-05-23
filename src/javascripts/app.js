import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../../node_modules/vegas/dist/vegas.min'
import '../../node_modules/@fortawesome/fontawesome-free/js/all'
import './base/vue'
import './base/custom'

// TODO get src and text from html
$('.js-main-slider').vegas({
    delay: 5000,
    slides: [
        {src: '../images/wedding1.jpg', overlaytext: "Primerie depuis les années 1500, quand un imprimeur anonyme as"},
        {src: '../images/wedding2.jpg', overlaytext: "Dans la composition et la mise en"},
        {src: '../images/wedding3.jpg', overlaytext: "İnformatique, sans que son"},
        {src: '../images/wedding4.jpg', overlaytext: "De nombreuses suites logicielles de"}
    ],
    walk: function (index, slideSettings) {
        if ($('.js-slider-text').length === 0) $('.js-main-slider').append("<div class='slider-text js-slider-text'></div>");

        let sliderText = $('.js-slider-text')
        sliderText.removeClass('active')
        setTimeout(function () {
            sliderText.text(slideSettings.overlaytext).addClass('active')
        },500)

    }
});

window.exist = function (selector) {
    return selector.length > 0 ? true : false
}

if (exist($('.page.main'))) {
    let elements = $('.js-auto-height')
    let maxHeight = 0

    $.each(elements, function (key, val) {
        let self = $(val)
        let selfHeight = self.height();
        if (selfHeight > maxHeight) maxHeight = selfHeight
    })
    elements.height(maxHeight)
}


$.each($('[data-bg]'), function (key, val) {
    const self = $(val)
    self.css('background-image', 'url(' + self.attr('data-bg') + ')')
})