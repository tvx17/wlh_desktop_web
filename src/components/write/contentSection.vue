<template>
  <q-expansion-item dense label="Inhalt" v-model="contentVisible">
    <div>Was wissen die Charaktere am Anfang, am Ende2</div>
    <q-separator/>
    <summary-component/>
    <q-separator/>
    <goals-component/>
    <q-separator/>
    <main-characters-component/>

    <!--<div>Handelnde Personen (was wissen die Personen zu diesem Zeitpunkt, wie ändern sich Beziehungen)</div>
    <div>Weitere Personen</div>
    <div>Orte (Zustandsänderungen)</div>
    <div>Gegenstände (Zustandsänderungen)</div>-->

  </q-expansion-item>
</template>

<script setup>
import {ref} from 'vue';
import SummaryComponent from "components/write/contentSection/summaryComponent.vue";
import GoalsComponent from "components/write/contentSection/goalsComponent.vue";
import MainCharactersComponent from "components/write/contentSection/mainCharactersComponent.vue";

const contentVisible = ref(true);
const sections = ref({conclusion: false})
</script>
