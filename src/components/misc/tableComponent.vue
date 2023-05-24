<template>
  <q-table
    flat
    bordered
    :rows="tableData"
    :columns="columns"
    row-key="name"
    v-model:selected="selected"
    :filter="filter"
    @row-click="m.selected"
  >
    <template v-slot:top-left>
      <q-btn :label="props.newButtonText" @click="emitter('createNew')" dense flat/>
    </template>
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Suchen">
        <template v-slot:append>
          <q-icon name="search"/>
        </template>
      </q-input>

    </template>
  </q-table>

</template>

<script setup>
import requests from 'src/app/requests';

import {onMounted, ref, watch} from 'vue';


const props = defineProps(['dataTable', 'title', 'new', 'update', 'newButtonText']);
const emitter = defineEmits(['selectedRow', 'createNew', 'updated']);

const columns = [
  {
    name    : 'summary',
    required: true,
    label   : 'Zusammenfassung',
    align   : 'left',
    field   : 'summary',
    sortable: true
  }
];

const tableData = ref([]);
const filter = ref('');
const selected = ref([]);
const selectedId = ref();

const m = {
  load    : async () => {
    tableData.value = await requests.get(props['dataTable'], {deleted: false});
  },
  selected: (evt, row, index) => {
    emitter('selectedRow', row.id);
  }
};


watch(() => props['update'], async (newValue, oldValue) => {
  if (newValue) {
    await m.load();
    emitter('updated');
  }
});


onMounted(async () => {
  await m.load();
});

</script>
