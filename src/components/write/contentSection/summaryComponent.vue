<template>
  <div>
    <div class="row">
      <div class="col">
        <q-btn icon="fa-solid fa-eye" dense flat @click="isVisible = !isVisible"/>

      </div>
      <div class="text-h6 col-11">Zusammenfassung</div>
    </div>

    <q-editor v-model="summary" v-if="isVisible"/>
  </div>


</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['contentId'])

const summary = ref('Zusammenfassung');
const isVisible = ref(false);
</script>
