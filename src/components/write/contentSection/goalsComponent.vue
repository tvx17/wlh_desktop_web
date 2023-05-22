<template>
  <div>
    <div class="row">
      <div class="col">
        <q-btn icon="fa-solid fa-eye" dense flat @click="isVisible = !isVisible"/>

      </div>
      <div class="text-h6 col-10">Ziele</div>
      <div class="col">
          <q-btn icon="add" flat dense/>
        </div>
    </div>

    <div v-if="isVisible">Ziele</div>
  </div>



</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['contentId'])

const summary = ref('Zusammenfassung');
const isVisible = ref(false);
</script>
