console.group('Vue');

if ($('#main-page').length > 0) {
    let mainPage = new Vue({
        el: '#main-page',
        data: {
            "baseUrl": "http://kapalicarsiorganizasyon.com",
            "sidebar": [
                {
                    "category": {
                        "title": "Düğün Organizasyonu",
                        "link": ""
                    },
                    "subLinks": [
                        {
                            "title": "Davet Masası Süslemeleri",
                            "link": ""
                        },
                        {
                            "title": "Nikah Masası Modelleri",
                            "link": ""
                        },
                        {
                            "title": "Yürüme Yolu Süslemeleri",
                            "link": ""
                        },
                        {
                            "title": "Teknede Düğün Organizasyonları",
                            "link": ""
                        },
                        {
                            "title": "Kır Düğünü Organizasyonları",
                            "link": ""
                        },
                        {
                            "title": "Kumsal/Plaj Düğünü Organizasyonu",
                            "link": ""
                        },
                        {
                            "title": "Düğün Organizasyonu",
                            "link": ""
                        }
                    ]
                },
                {
                    "category": {
                        "title": "Kına Organizasyonları",
                        "link": ""
                    },
                    "subLinks": [
                        {
                            "title": "Kına Organizasyonları",
                            "link": ""
                        }
                    ]
                }
            ],
            "obj": {
                "slug": "",
                "title": "",
                "link": "",
                "categoryId": "",
                "category": "",
                "header": {
                    "title": "",
                    "text": "",
                    "img": "/images/wedding4.jpg"
                },
                "main": [
                    {
                        "title": "",
                        "text": "",
                        "images": []
                    },
                ]
            }

        },
        created() {
            const self = this;
            const link = window.location.href
            let slug = link.split('?page=')[1]

            if (slug) {
                slug = slug.trim()
                let api = 'http://kapalicarsiorganizasyon.com/api/api.php/records/objects?filter=is_deleted,eq,0&filter=slug,eq,' + slug;
                let sideBar = 'http://kapalicarsiorganizasyon.com/api/sidebar.php?api=sidebar';


                axios.all([axios.get(api), axios.get(sideBar)])
                    .then(result => {
                        self.pageContent = result[0].data.records[0];
                        self.sidebar = result[1].data.sidebar
                        self.obj = JSON.parse(self.pageContent.obj)
                        setTimeout(function () {
                            let rondomNumb = Math.floor(Math.random() * 32) + 1;
                            $('.js-rondom-img').css('background-image', 'url(/images/wedding/wedding' + rondomNumb + '.jpg)')
                            $.each($('.js-inner-item'), function (index, value) {
                                $(value).find('.js-item-article').html(self.obj.main[index].text)
                            })

                            if ($('.item-images').length > 0) {
                                initGallery($('.item-images'))
                            }
                        })

                    })
                    .catch(err => {
                        console.log(err)
                        window.location.reload()
                    })

            }


        }
    });
}

if ($('#about').length > 0) {
    let aboutPage = new Vue({
        el: '#about',
        data: {
            text: ''
        },
        created() {
            const self = this;
            axios.get('http://kapalicarsiorganizasyon.com/api/api.php/records/about/1')
                .then(res => {
                    $('.js-about-text').html(res.data.text)
                })
        }
    })
}

console.groupEnd();