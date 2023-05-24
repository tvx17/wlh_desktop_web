<template>
  <q-btn
    class="full-width"
    color="negative"
    dense
    label="Löschen"
    @click="deleteDataset"
  />
</template>

<script setup>
import {useQuasar} from 'quasar';
import requests from 'src/app/requests';
import {data, reload} from 'src/app/store';
import {onMounted} from 'vue';

const props = defineProps(['dataTable']);
const emits = defineEmits(['actionExecuted']);

const $q = useQuasar();


const deleteDataset = async () => {
  $q.dialog({
              title  : 'Loeschen',
              message: 'Möchten sie wirklich löschen?',
              cancel : true

            }).onOk(async () => {
    await requests.delete(props.dataTable, data.value['id']);
    data.value = {};
    reload.value = true;
  });
};

onMounted(async () => {
});

</script>
