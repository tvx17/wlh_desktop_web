<template>
  <q-page className="flex flex-center">
    <display-component
      data-table="characters"
      dialog-component="projects"
      :texts="{newProjectTitle:'Neuer Charakter',newProjectMessage:'Name des neuen Charakters',deleteTitle:'Charakter löschen', deleteLabel:'der Charakter',singular:'Charakter', plural:'Charaktere'}"/>


  </q-page>
</template>

<script setup>
import DisplayComponent from 'components/misc/displayComponent.vue';
</script>
