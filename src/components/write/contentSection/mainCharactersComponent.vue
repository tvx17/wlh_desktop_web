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
         @click="dialogVisible = true"
         onmouseout="style='text-decoration:none'"
         onmouseover="style='text-decoration:underline'"
         style="text-decoration:none">{{ character.name }}<span v-if="(index + 1) < characters.length">, </span></a>
    </div>
  </div>
  <q-dialog v-model="dialogVisible" position="top">
    <q-card style="min-width: 75%;">
      <q-card-section>
        <q-bar>
          <div class="text-weight-bolder">Charaktername</div>
          <q-space/>
          <q-btn dense flat icon="fa-solid fa-xmark"/>
        </q-bar>
        <q-btn icon="fa-regular fa-trash-can" dense class="full-width" flat>
          <q-tooltip>Charakter löschen</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        Hallo
      </q-card-section>
    </q-card>
  </q-dialog>


</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['contentId'])

const isVisible = ref(true);
const characters = ref([{id: 1, name: 'Char1'}, {id: 2, name: 'Char2'}])
const dialogVisible = ref(false)

</script>
