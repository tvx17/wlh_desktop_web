<template>
  <q-page class="flex flex-center">
    <display-component
      data-table="users"
      dialog-component="users"
      new-title="Neuer/e Benutzer/-in"
      new-message="Name des/der neuen Benutzers/-in"
      delete-title="Benutzer/-in löschen"
      delete-label="den/die Benutzer/-in"
      singular="Benutzer/-in"
      plural="Benutzer/-innen"/>

    <div>Hallo: {{ $t('components') }}</div>
  </q-page>
</template>

<script setup>
import DisplayComponent from 'components/misc/displayComponent.vue';
</script>
