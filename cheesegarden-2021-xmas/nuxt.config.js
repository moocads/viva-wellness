export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Cheese Garden | Sakura Spring Collection",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      // { name: "viewport", content: "width=1100" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=UA-179040938-1",
        async: "true",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["ant-design-vue/dist/antd.css", "~assets/scss/global.scss"],
  styleResources: {
    scss: ["./assets/scss/*.scss"],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/antd-ui",
    "@/plugins/gsap",
    {
      src: "~/plugins/ga.js",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    timing: false,
  },
};
