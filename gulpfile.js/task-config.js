module.exports = {
    html: true,
    images: true,
    fonts: true,
    static: true,
    customHtml: true,
    svgSprite: true,
    ghPages: true,
    stylesheets: true,
    javascripts: {
        entry: {
            // files paths are relative to
            // javascripts.dest in path-config.json
            app: ["./app.js"]
        },
        provide: {
            $: "jquery",
            jQuery: "jquery",
            axios: "axios",
            Vue: "vue/dist/vue.js",
        }
    },

    browserSync: {
        open: false,
        server: {
            // should match `dest` in
            // path-config.json
            baseDir: 'public',

        }
    },

    production: {
        rev: false
    }
}