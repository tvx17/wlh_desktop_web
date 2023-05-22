<template>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue';
import data from 'src/app/requests'

onMounted(async () => {
  await data.setupCheck()
  // const ist = await window.arsch.jaha('mein freund das auto');
  // alert(ist)
});

</script>
