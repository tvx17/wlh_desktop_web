<template>
  <q-page class="q-ma-lg">
    TEST
    {{data}}
    <overview-component
      title="Test-Projekte"
      new-button-text="Neues Projekt erstellen"
      :data-table="dataTable"
      :columns="columns"
      :new-values="newValues"
    />

    <div v-if="Object.keys(data).length > 0">
      <br/>
      <q-separator/>
      <br/>
      <div class="text-h6">Angezeigtes Projekt: {{ data.summary }}</div>
      <q-form
        @submit="m.save"
        @reset="m.reset"
        class="q-gutter-md">
        <delete-button-component :data-table="dataTable"/>
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
        <save-button-component/>
      </q-form>
      <div/>
    </div>
  </q-page>
</template>

<script setup>
import DeleteButtonComponent from 'components/misc/deleteButtonComponent.vue';
import OverviewComponent from 'components/misc/overviewComponent.vue';
import SaveButtonComponent from 'components/misc/saveButtonComponent.vue';
import requests from 'src/app/requests';
import {onMounted, ref} from 'vue';
import {data} from 'src/app/store';

const dataTable = 'projects';
const newValues = {
  summary: 'Bitte Name eingeben',
  isActive: true
}

const owners = ref([]);

const visibility = ref(
  {
    description: false,
  });

const columns = [
  {
    name    : 'summary',
    required: true,
    label   : 'Auseinanderfassung',
    align   : 'left',
    field   : 'summary',
    sortable: true
  }
];

const overviewVisible = ref(true);

const updateData = ref(false);

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
  owners.value = await requests.get('users', {deleted: false});
});
</script>
