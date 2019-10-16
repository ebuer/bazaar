import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../../node_modules/vegas/dist/vegas.min'
import '../../node_modules/@fortawesome/fontawesome-free/js/all'
import '../../node_modules/magnific-popup/dist/jquery.magnific-popup.min'
import './base/vue'
import './base/custom'


window.exist = function (selector) {
    return selector.length > 0 ? true : false
}

window.preloader = function (method, selector) {
    if (method === 'show') {
        if ($('.preloader').length === 0) {
            let pre = $('<div class="preloader"><img class="icon" src="preloader.gif" alt=""></div>')
            pre.css('opacity', '0')
            $('body').append(pre)
            setTimeout(function () {
                $('.preloader').css('opacity', '1')
            }, 300)
        }
    } else {
        if ($('.preloader').length > 0) {

            $('.preloader').css('opacity', '0')

            setTimeout(function () {
                $('.preloader').remove()
            }, 300)
        }
    }
}
// preloader('show')

$(document).ready(function () {

    // TODO get src and text from html

    axios.get('http://kapalicarsiorganizasyon.com/api/api.php/records/home_slider?filter=is_deleted,eq,0')
        .then(res => {
            const slides = res.data.records
            const sliderArray = []
            slides.forEach(function (data) {
                sliderArray.push({
                    src: '/uploads/' + data.src,
                    overlaytext: data.overlaytext
                })
            })

            if (sliderArray.length === 0) sliderArray.push({src: '../images/wedding2.jpg', overlaytext: "Kapalıçarşı"})

            $('.js-main-slider').vegas({
                delay: 5000,
                slides: sliderArray,
                walk: function (index, slideSettings) {
                    if ($('.js-slider-text').length === 0) $('.js-main-slider').append("<div class='slider-text js-slider-text'></div>");

                    let sliderText = $('.js-slider-text')
                    sliderText.removeClass('active')
                    setTimeout(function () {
                        sliderText.text(slideSettings.overlaytext).addClass('active')
                    }, 500)

                }
            });
        })


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


    // set min height from pages
    let headerHeight = $('.header').height();
    let footerHeight = $('.footer').height()
    $('.page').css('min-height', 'calc(100vh - ' + headerHeight + 'px - ' + footerHeight + 'px)')


    setTimeout(function () {
        preloader('hide')
    }, 500)

});

window.initGallery = function (selector) {

    $.each(selector, function (index, val) {
        $(val).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {enabled: true},
        });

    })

}