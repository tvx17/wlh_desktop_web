<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerOpen = !drawerOpen"
        />

        <q-toolbar-title>
          WLH
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
    >
      <q-list dense>
        <q-item v-for="(item, index) in drawerData" v-bind:key="index" :clickable="item.type === 'item'" :to="(item.type === 'item') ? item.target : ''">
          <q-item-section v-if="item.type === 'menu'">
            <q-item-label header class="text-h6">{{ item.label }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="item.type === 'item'">
            {{ item.label }}
          </q-item-section>
          <q-item-section v-if="item.type === 'separator'">
            <q-separator/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref} from 'vue';
//t('layouts.mainLayout.application')
const drawerData = [
  {type: 'menu', label: 'Allgemein'},
  {type: 'item', label: 'Projekte', target: '/app/projects'},
  {type: 'item', label: 'Benutzer/-innen', target: '/app/users'},
  {type: 'separator'},
  {type: 'menu', label: 'Projekt'},
  {type: 'item', label: 'Einstellungen', target: '/project/settings'},
  {type: 'item', label: 'Exportieren', target: '/app/test'},
  {type: 'separator'},
  {type: 'item', label: 'Charaktere', target: '/project/characters'},
  {type: 'item', label: 'Orte', target: '/project/locations'},
  {type: 'item', label: 'Gegenstände', target: '/project/objects'},
  {type: 'separator'},
  {type: 'menu', label: 'Inhalt'},
  {type: 'item', label: 'Bücher', target: '/project/characters'},
  {type: 'item', label: 'Szenen', target: '/project/characters'},


];

const drawerOpen = ref(false);


</script>
