<template>
  <div>
    <div class="row">
      <div class="col">
        <q-btn icon="fa-solid fa-eye" dense flat @click="isVisible = !isVisible"/>

      </div>
      <div class="text-h6 col-10">Handelnde Personen</div>
      <div class="col">
        <q-btn icon="add" flat dense/>
      </div>
    </div>

    <div v-if="isVisible">
      <a v-for="(character, index) in characters"
         v-bind:key="index"
         href="#"
         onmouseout="style='text-decoration:none'"
         onmouseover="style='text-decoration:underline'"
         style="text-decoration:none">{{ character.name }}<span v-if="(index + 1) < characters.length">, </span></a>
    </div>
  </div>


</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['contentId'])

const isVisible = ref(true);
const characters = ref([{id: 1, name: 'Char1'}, {id: 2, name: 'Char2'}])

</script>
