<template>
  <div
    :style="{
      background: 'url(/images/' + img + ')',
    }"
    class="mx-auto p-4 min-h-screen flex flex-col"
    style="background-size: cover"
  >
    <div class="fixed top-2 right-5 text-4xl">
      <a href="" class="text-white"
        ><NuxtLink :to="localePath({ name: 'index' })">x</NuxtLink></a
      >
    </div>
    <!-- Formulaire d'ajout de localisation -->
    <AddFrom></AddFrom>

    <!-- Liste des localisations favorites -->
    <FavoritesList></FavoritesList>
  </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath();
const img = useState<string>("image");
</script>

<style lang="scss" scoped></style>
