<template>
  <q-page className="flex flex-center">
    <display-component
      data-table="objects"
      dialog-component="projects"
      :texts="{newProjectTitle:'Neues Objekt',newProjectMessage:'Name des neuen Objekts',deleteTitle:'Objektr löschen', deleteLabel:'das Objekt',singular:'Objekt', plural:'Objekte'}"/>


  </q-page>
</template>

<script setup>
import DisplayComponent from 'components/misc/displayComponent.vue';
</script>
