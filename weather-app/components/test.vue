<template>
    <div>
      <h1>{{$t('hello')}}</h1>
      <pre>Latitude: {{ coords.latitude }}, Longitude: {{ coords.longitude }}</pre>
    </div>
    <!-- <div> -->
    <!-- <pre>{{ test.data }}</pre> -->
    <!-- <pre>{{ test1.data }}</pre> -->
    <!-- </div> -->
</template>
  
<script setup>
  import { useGeolocation } from '@vueuse/core'
  
  const { coords } = useGeolocation()

  const test1 = await useAsyncData("response", ()=> $fetch(`https://api.openweathermap.org/data/2.5/weather?lat=50.8504&lon=4.3488&appid=a1141dd0573960bfdabff538fc1dc90c&lang=fr&units=metric`));
  // const test = await useAsyncData("response", ()=> $fetch(`https://api.openweathermap.org/data/2.5/forecast?q=belgique&appid=a1141dd0573960bfdabff538fc1dc90c&lang=fr&units=metric`));

</script>
  