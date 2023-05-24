<template>
  <q-page class="q-ma-lg">
    <q-expansion-item
      v-model="overviewVisible"
      :class="'text-h6 '+(overviewVisible ? '' : 'bg-secondary')"
      dense
      label="Benutzer/-innen"
    >
      <table-component
        new-button-text="Neu"
        :update="updateData"
        data-table="users"
        title="Projekte"
        @updated="updateData = false"
        @create-new="m.new"
        @selected-row="m.load"/>
    </q-expansion-item>
    <div v-if="Object.keys(data).length > 0">
      <br/>
      <q-separator/>
      <br/>
      <div class="text-h6">
        <span v-if="data.pseudonym">{{ data.pseudonym }}</span>
        <span v-if="data.pseudonym">&nbsp;(</span>
        <span>{{ data.firstname }} {{ data.lastname }}</span>
        <span v-if="data.pseudonym">)</span>
      </div>
      <q-form
        @submit="m.save"
        class="q-gutter-md text-overline">
        <div>
          <q-btn dense label="Löschen" class="full-width" color="negative" @click="m.delete"/>
        </div>
        <div class="row">
          <div class="col-2">Bezeichnung</div>
          <div class="col">
            <q-input label="Bezeichnung" dense v-model="data.summary"/>
          </div>
        </div>
        <div class="row">
          <div class="col-2">Name</div>
          <div class="col-4 q-pr-sm">
            <q-input label="Vorname" dense v-model="data.firstname"/>
          </div>
          <div class="col-4 q-pl-sm">
            <q-input label="Nachname" dense v-model="data.lastname"/>
          </div>
        </div>
        <div class="row">
          <div class="col-2">Pseudonym</div>
          <div class="col">
            <q-input label="Pseudonym" dense v-model="data.pseudonym"/>
          </div>
        </div>
        <div class="row">
          <div class="col-2">Geschlecht</div>
          <div class="col">
            <q-select label="Geschlecht" dense :options="['männlich', 'weiblich','divers']" v-model="data.sex"/>
          </div>
        </div>

        <q-separator/>
        <!--<div>
          <div class="row">
            <div class="col">
              <q-btn label="Neue Eigenschaft" @click="data.push({type:'', value:''})"/>
            </div>
          </div>
          <div class="row" v-for="(property, index) in data" :key="index">
            <div class="col-1">
              <q-btn label="L" @click="data.splice(index, 1)"/>
            </div>
            <div class="col-3">
              <q-select :options="options" v-model="property.type" dense/>
            </div>
            <div class="co">
              <q-input v-model="property.value" dense/>
            </div>
          </div>
        </div>-->


        <br/>
        <q-btn
          class="text-center full-width"
          color="primary"
          label="Speichern"
          type="submit"/>
      </q-form>
      <div/>
    </div>
  </q-page>
</template>

<script setup>
import TableComponent from 'components/misc/tableComponent.vue';
import {useQuasar} from 'quasar';
import requests from 'src/app/requests';
import {onMounted, ref} from 'vue';

const $q = useQuasar();

const options = ['Vorname', 'Nachname', 'Geburtsdatum', 'Todesdatum', 'Geschlecht'];

const visibility = ref(
  {
    description: false,
  });

const overviewVisible = ref(true);

const updateData = ref(false);

const data = ref({});


const m = {
  load  : async (rowId) => {
    data.value = await requests.getById('users', rowId);
    overviewVisible.value = false;
  },
  new   : () => {
    overviewVisible.value = false;
    data.value = {
      id       : null,
      summary  : 'Name',
      firstname: '',
      lastname : '',
      pseudonym: '',
      sex      : '',
      isActive : true
    };
  },
  save  : async () => {
    if (data.value['id']) {
      await requests.put('users', data.value);
      updateData.value = true;
      $q.notify({
        color: 'positive',
        textColor: 'white',
        message: 'Änderungen gespeichert.'
      })
    } else {
      await requests.post('users', data.value);
      updateData.value = true;
      $q.notify({
        color: 'positive',
        textColor: 'white',
        message: 'Neuer Benutzer erstellt.'
      })
    }
    data.value = {};
    overviewVisible.value = true;
  },
  delete: async () => {
    $q.dialog({
                title  : 'Loeschen',
                message: 'Möchten sie wirklich löschen?',
                cancel : true

              }).onOk(async () => {
      await requests.delete('users', data.value['id']);
      data.value = {};
      updateData.value = true;
      overviewVisible.value = true;
    });

  }
};
onMounted(async () => {
});
</script>
