export default {
    srcDir: __dirname,
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Dobavki.ru',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: '',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap',
            },
        ],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['./assets/sass/vendor.scss', './assets/sass/app.scss'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        './plugins/element-ui.js',
        './plugins/api/index.js',
        {
            src: './plugins/nuxt-client-init.js',
            ssr: false,
        },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/style-resources',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // Simple usage
        'cookie-universal-nuxt',

        // https://www.npmjs.com/package/@nuxtjs/google-tag-manager
        // ["@nuxtjs/google-tag-manager", {
        //     id: "GTM-5TQT362",
        //     pageTracking: true,
        //     dev: true,
        // }],
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    styleResources: {
        scss: [
            '~assets/sass/_variables.scss',
        ],
    },

    server: {
        host: '0.0.0.0',
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, "server.key")),
        //     cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),
        // },
    },

    router: {
        routeNameSplitter: '.',
    },

    publicRuntimeConfig: {
        apiHost: process.env.API_URL || 'http://localhost:8000',
        frontendHost: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
};
