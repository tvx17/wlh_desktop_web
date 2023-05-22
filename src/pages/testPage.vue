<template>
  <q-page class="q-ma-md">
    <q-expansion-item label="Charakter auf Projektebene" default-opened>
      <q-card>
        <q-card-section>
          <div>Löschen</div>
        </q-card-section>
      </q-card>
      <q-card style="min-width: 90%;">
        <q-card-section>
          <div class="text-h6">Charakter XYZ</div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div>
            <div class="row">
              <div class="col">
                <q-btn label="Hinzufügen"/>
              </div>
            </div>
            <div class="row" v-for="(characterName, characterIndex) in characterNames" :key="characterIndex">
              <div class="col-2">Hoch/Runter</div>
              <div class="col-2">Löschen</div>
              <div class="col"><q-select :options="characterNameTypes" v-model="characterName.type" dense/></div>
              <div class="col"><q-input v-model="characterName.name" dense/> </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <span>Beschreibung</span>
          </div>
          <div>
            <span><q-checkbox label="Körperliche Beschreibung"/></span>
            <span><q-checkbox label="Geistige Beschreibung"/></span>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <span>Ereignisse</span>
          </div>
          <div>
            Geburt, Tod, Hochzeit, Scheidung, usw.
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            Ziele des Charakters
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item label="Szene">
      Zeitpunkt z.B. vor Szene X, nach Szene X, genaues Datum, ca. Datum z.B. 2 Wochen nach/vor Ereignis/Szene usw.
    </q-expansion-item>
  </q-page>
</template>

<script setup>
import {ref} from 'vue';

const characterNames = ref([{type: 'vorname', name: 'Charakter XYZ'}, {type: 'nachname', name: 'Charakter XYZ'}]);
const characterNameTypes = ['vorname', 'nachname','weiterer Name','Pseudonym','Spitzname'];
</script>
