<template>
  <q-page class="flex flex-center">
    <q-card style="width: 75%;">
      <q-card-section>
        <content-section/>
      </q-card-section>
      <q-card-section>
        <q-input label="Überschrift" v-model="headline"></q-input>
        <q-editor style="width: 75%;" v-model="text"/>
      </q-card-section>
    </q-card>


  </q-page>
</template>

<script setup>


import {ref} from 'vue';
import ContentSection from 'components/write/contentSection.vue';

const text           = ref('Der Text');
const headline       = ref('Die Überschrift');


</script>
