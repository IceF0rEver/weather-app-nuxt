<template>
  <div
    class="mx-auto min-h-screen flex flex-col dark:bg-gray-800 bg-gray-300"
  >
   <div class="flex justify-between px-4 pt-4">
      <div class="flex">
        <ChangeLang/>
        <DarkMode/>
      </div>
      <div class=" z-10 flex items-center ">
        <NuxtLink to="/">
          <Icon name="akar-icons:cross" class="text-black dark:text-white" size="25" />
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-col p-4">
      <!-- Formulaire d'ajout de localisation -->
      <AddFrom></AddFrom>

      <!-- Liste des localisations favorites -->
      <FavoritesList></FavoritesList>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="scss" scoped></style>
