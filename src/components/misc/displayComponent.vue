<template>
  <q-card style="width: 90%;">
    <q-card-section>
      <q-table
        :title="props.plural"
        grid-header
        :rows="tableData"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
        :filter="filter"
        grid
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Suchen">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn icon="fa-solid fa-plus" dense flat @click="m.new()"/>
        </template>

        <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card :class="props.selected ? 'bg-grey-2' : ''" bordered flat>
              <q-card-section>
                <div class="row">
                  <div class="col-10">
                    <q-checkbox dense v-model="props.selected" :label="props.row.summary"/>
                  </div>
                  <div class="col-2">
                    <q-btn-group flat rounded>
                      <q-btn icon="fa-solid fa-pen" size="sm" dense flat @click="m.display(props.rowIndex)"/>
                      <q-btn icon="fa-solid fa-trash" size="sm" dense flat @click="m.delete(props.rowIndex)"/>
                    </q-btn-group>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>

      </q-table>
    </q-card-section>
  </q-card>
  <dialog-component :id="selectedId"
                    :is-displayed="isDialogDisplayed"
                    :singular="props.singular"
                    :component="props.dialogComponent"
                    @close="m.closed"/>
</template>

<script setup>
import DialogComponent from 'components/misc/dialogComponent.vue';
import {useQuasar} from 'quasar';
import requests from 'src/app/requests';

import {onMounted, ref} from 'vue';

const quasar = useQuasar();

const props = defineProps(
  [
    'dataTable',
    'dialogComponent',
    'texts',
    'newTitle',
    'newMessage',
    'deleteTitle',
    'deleteLabel',
    'singular',
    'plural']);

const columns = [
  {
    name    : 'summary',
    required: true,
    label   : 'Zusammenfassung',
    align   : 'left',
    field   : row => row.name,
    sortable: true
  }
];

const tableData = ref([]);
const filter = ref('');
const selected = ref([]);
const selectedId = ref();
const isDialogDisplayed = ref(false);
const displayOnlyActiveOnes = ref(true);

const m = {
  closed : () => {
    isDialogDisplayed.value = false;
    m.load(displayOnlyActiveOnes.value);
  },
  load   : async () => {
    tableData.value = await requests.get(props['dataTable'], {isActive: true});
  },
  display: (index) => {
    selectedId.value = tableData.value[index].id;
    isDialogDisplayed.value = true;
  },
  delete : (index) => {
    quasar.dialog({
                    title     : props.deleteTitle,
                    message   : `Möchtest Du wirklich ${props['texts']['deleteLabel']} mit dem Namen \"${tableData.value[index]['name']}\" deaktivieren?`,
                    cancel    : true,
                    persistent: true
                  }).onOk(() => {
      requests.delete(props['dataTable'], tableData.value[index].id);
      m.load();
    });
  },
  new    : () => {
    quasar.dialog({
                    title     : props.newTitle,
                    message   : props.newMessage,
                    prompt    : {
                      model: '',
                      type : 'text' // optional
                    },
                    cancel    : true,
                    persistent: true
                  }).onOk(summary => {
      requests.post(props.dataTable, {summary: summary});
      m.load();
    });
  }
};


onMounted(async () => {
  await m.load();
});

</script>
