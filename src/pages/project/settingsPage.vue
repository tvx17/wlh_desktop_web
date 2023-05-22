<template>
  <q-page class="flex flex-center">
    <q-card style="width: 90%;">
      <q-card-section>
        <projects-form-component id="1" mode="standalone"/>
      </q-card-section>
    </q-card>


  </q-page>
</template>

<script setup>
import ProjectsFormComponent from 'components/misc/projectsFormComponent.vue';
import {onMounted, ref} from 'vue';
import data from 'src/app/requests';

const project = ref({});
const users = ref({});

onMounted(async () => {
  users.value = await data.getAll('users');
  project.value = await data.getById('projects', 1);
});

</script>
