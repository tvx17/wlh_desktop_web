<template>
  <q-btn
    dense
    label="Speichern2"
    class="full-width"
    color="negative"
    @click="saveDataset"
  />
</template>

<script setup>
import {useQuasar} from 'quasar';
import requests from 'src/app/requests';
import {data, overviewVisible, reload} from 'src/app/store';
import {onMounted} from 'vue';

const props = defineProps(['dataTable']);
const emits = defineEmits(['actionExecuted']);

const $q = useQuasar();


const saveDataset = async () => {
  if (data.value['id']) {
    await requests.put(props.dataTable, data.value);
    $q.notify({
                color    : 'positive',
                textColor: 'white',
                message  : 'Änderungen gespeichert.'
              });
    reload.value = true;
  } else {
    await requests.post(props.dataTable, data.value);
    reload.value = true;
    $q.notify({
                color    : 'positive',
                textColor: 'white',
                message  : 'Neuer Datensatz erstellt.'
              });
  }
  data.value = {};
  overviewVisible.value = true;
};

onMounted(async () => {
});

</script>
