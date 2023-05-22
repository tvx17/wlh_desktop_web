<template>
  <q-page className="flex flex-center">
    <display-component
      data-table="locations"
      dialog-component="projects"
      :texts="{newProjectTitle:'Neuer Ort',newProjectMessage:'Name des neuen Orts',deleteTitle:'Ort löschen', deleteLabel:'der Ort',singular:'Ort', plural:'Orte'}"/>


  </q-page>
</template>

<script setup>
import DisplayComponent from 'components/misc/displayComponent.vue';
</script>
