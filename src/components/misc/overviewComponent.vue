<template>
  <q-expansion-item
    v-model="overviewVisible"
    :class="'text-h6 ' + (!overviewVisible ? 'bg-light-blue text-white' : '')"
    dense
    :label="props.title"
  >
    <q-table
      flat
      bordered
      :rows="tableData"
      :columns="props.columns"
      row-key="name"
      v-model:selected="selected"
      :filter="filter"
      @row-click="m.loadSelected"
    >
      <template v-slot:top-left>
        <q-btn :label="props.newButtonText" @click="m.new" dense flat/>
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Suchen">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

      </template>
    </q-table>
  </q-expansion-item>
</template>

<script setup>
import requests from 'src/app/requests';
import {data, overviewVisible, reload} from 'src/app/store';

import {onMounted, ref, watch} from 'vue';


const props = defineProps(['dataTable', 'title', 'update', 'newButtonText','columns', 'newValues']);
const emitter = defineEmits(['selectedRow', 'createNew', 'updated']);


const tableData = ref([]);
const filter = ref('');
const selected = ref([]);


const m = {
  load    : async () => {
    tableData.value = await requests.get(props['dataTable'], {deleted: false});
  },
  loadSelected: async (evt, row, index) => {
    overviewVisible.value = false;
//    emitter('selectedRow', row.id);
    data.value = await requests.getById(props['dataTable'], row.id);
  },
  new: () => {
    overviewVisible.value = false;
    data.value = props.newValues
  }
};


watch(reload, async (newValue, oldValue) => {
  if (newValue) {
    await m.load();
    reload.value = false;
    overviewVisible.value = true;
  }
});


onMounted(async () => {
  await m.load();
});

</script>
