<template>
    <div class=" z-10 flex flex-row items-center p-4 gap-2">
        <Icon name="material-symbols:light-mode-outline" class="text-black dark:text-white" size="25" />
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" @click="toggleTheme" :checked="colorMode.preference === 'dark'">
        <div class="relative w-11 h-6 bg-gray-100 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-700"></div>
      </label>
      <Icon name="tdesign:mode-dark" class="text-black dark:text-white" size="25" />
    </div>
  </template>

<script setup>
const colorMode = useColorMode();
const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};
</script>

<style scoped>
.theme-icon {
    @apply w-7 h-7 cursor-pointer transition-transform duration-100;
}
.theme-icon:hover {
    @apply scale-125;
}
</style>
