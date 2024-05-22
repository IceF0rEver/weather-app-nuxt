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
  ],
  i18n: {
    lazy: true,
    langDir: "langs", 
    strategy: "prefix_except_default",
    defaultLocale: "fr",
    locales: [
        { code: "fr", name: "Français", file: "fr.json"},
        { code: "en", name: "English", file: "en.json" },
    ],
  }
})