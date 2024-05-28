<template>
    <section class="z-10 bg-white dark:bg-black dark:bg-opacity-80 rounded-lg shadow p-5">
        <h2 class="font-bold text-xl mb-4 dark:text-gray-50">{{$t('title.favorites')}}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Exemple de localisation favorite -->
            <Favorite v-for="city in LocalStorage.findAll()" :key="city.city && city.country" :city="city"></Favorite>
        </div>
      </section>
</template>

<script setup>
import { LocalStorage } from "~/composables/local.js";
</script>