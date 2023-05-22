<template>
  <q-dialog v-model="v_dialogVisible" position="top" full-width>
    <q-card>

      <q-card-section>
        <div class="text-h6">{{ p_props.component }}</div>
        <div class="row">
          <div class="col text-h6" style="text-align: justify">{{ p_props.singular }}</div>
          <div class="col-1" style="text-align: right">
            <q-btn icon="fa-solid fa-xmark" dense flat @click="e_emitter('close')"/>
          </div>
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <component :is="v_component" :id="p_props.id" mode="dialog" @close="e_emitter('close')"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import ProjectsFormComponent from 'components/misc/projectsFormComponent.vue';
import {onMounted, ref, watch} from 'vue';

const p_props = defineProps(['id', 'isDisplayed', 'singular', 'component']);
const e_emitter = defineEmits(['close'])

const v_dialogVisible = ref(false);
const v_component = ref()

watch(() => p_props.isDisplayed,(currentValue, oldValue) => {
  v_dialogVisible.value = currentValue
})

const m_setComponent = (componentStr) => {
  switch (componentStr) {
    case 'projects':
      v_component.value = ProjectsFormComponent
      break
  }
}

onMounted(async () => {
  m_setComponent(p_props.component)
  v_dialogVisible.value = p_props.isDisplayed;
});

</script>
