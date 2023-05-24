<template>
  <q-page class="q-ma-lg">
    <div v-if="owners.length >0">
      <q-expansion-item
        v-model="overviewVisible"
        class="text-h6"
        dense
        label="Projekte">
        <table-component
          new-button-text="Neues Projekt"
          :update="updateData"
          data-table="projects"
          title="Projekte"
          @updated="updateData = false"
          @create-new="m.new"
          @selected-row="m.load"/>
      </q-expansion-item>
      <div v-if="Object.keys(data).length > 0">
        <br/>
        <q-separator/>
        <br/>
        <div class="text-h6">Angezeigtes Projekt: {{ data.summary }}</div>
        <q-form
          @submit="m.save"
          @reset="m.reset"
          class="q-gutter-md">
          <q-input
            v-model="data.summary"
            :rules="[ val => val && val.length > 0 || 'Feld darf nicht leer sein']"
            label="Projektname"
            lazy-rules/>
          <div>
            <div class="row">
              <div class="col">
            <span><q-btn
              :icon="visibility.description ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"
              dense
              flat
              @click="visibility.description = !visibility.description"/></span>
                <span>Beschreibung</span>
              </div>
            </div>
            <div class="row" v-if="visibility.description">
              <div class="col">
                <q-editor v-model="data.description"/>
              </div>
            </div>
          </div>
          <q-select
            v-model="data.owner"
            :options="owners"
            option-value="id"
            option-label="summary"
            emit-value
            map-options
            label="Besitzer/-in"/>
          <q-checkbox v-model="data.isActive" dense :label="  data.isActive ? 'Projekt ist aktiv' : 'Projekt ist nicht aktiv'"/>
          <br/>
          <q-btn
            class="text-center full-width"
            color="primary"
            label="Speichern"
            type="submit"/>
        </q-form>
        <div/>
      </div>
    </div>
    <div v-else>Bitte zuerst eine Benutzerin / einen Benutzer anlegen.</div>
  </q-page>
</template>

<script setup>
import TableComponent from 'components/misc/tableComponent.vue';
import requests from 'src/app/requests';
import {onMounted, ref} from 'vue';

const owners = ref([]);

const visibility = ref(
  {
    description: false,
  });

const overviewVisible = ref(true);

const updateData = ref(false);

const data = ref({});

const m = {
  load: async (rowId) => {

    data.value = await requests.getById('projects', rowId);
    overviewVisible.value = false;
  },
  new : () => {
    overviewVisible.value = false;
    data.value = {
      id         : null,
      summary    : 'Neues Projekt',
      description: '',
      owner      : '',
      isActive   : false
    };
  },
  save: async () => {
    if (data.value['id']) {
      await requests.put('projects', data.value);
      updateData.value = true;
    } else {
      await requests.post('projects', data.value);
      updateData.value = true;
    }
    overviewVisible.value = true;
  },
};
onMounted(async () => {
  owners.value = await requests.get('users',{deleted: false});
});
</script>
