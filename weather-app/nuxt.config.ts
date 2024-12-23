// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // buildModules: [
  //   '@nuxt/typescript-build',
  //   '@nuxtjs/tailwindcss',
  // ],
  css: [
    '@/assets/tailwind.css',
  ],
  modules: [
    "@nuxtjs/i18n",
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    "@nuxt/image",
  ],
  i18n: {
    vueI18n: './i18n.config.ts' 
  },
  // i18n: {
  //   lazy: true,
  //   langDir: "langs", 
  //   strategy: "no_prefix",
  //   defaultLocale: "fr",
  //   locales: [
  //       { code: "fr", name: "Français", file: "fr.json"},
  //       { code: "en", name: "English", file: "en.json" },
  //   ],
  // },
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
      API_MAP: process.env.API_MAP
    },
  },
  plugins: [
    '~/plugins/forecasts.js'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  ssr: false,  
})