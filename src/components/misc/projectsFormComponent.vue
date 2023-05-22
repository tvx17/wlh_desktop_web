<template>
  <div>Hallo</div>

  <div class="disabled" v-if="v_data">
    <br/>
    <table>
      <tr>
        <td>Datensatz-ID</td>
        <td>{{ v_data['id'] }}</td>
      </tr>
      <tr>
        <td>Erstellt</td>
        <td>{{ v_data['createdAt'] }}</td>
      </tr>
      <tr>
        <td>Geändert</td>
        <td>{{ v_data['updatedAt'] }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import requests from 'src/app/requests';
import {onMounted, ref, watch} from 'vue';

const p_props = defineProps(['id', 'mode']);
const e_emitter = defineEmits(['close']);

const v_id = ref(-1);
const v_data = ref({});
const v_owners = ref();
const v_visiblity = ref({
                          description: true
                        });

const m_submit = () => {
  v_data.value['id'] = v_id.value;
  requests.put('projects', v_data.value);
  e_emitter('close');
};
const m_reset = () => {
  e_emitter('close');
};

const m_load = async () => {
  v_data.value = await requests.getById('projects', v_id.value);
  v_data.value['isActive'] = v_data.value['isActive'] === 1;
  v_owners.value = await requests.getAll('users');
};

watch(() => p_props.id, (currentValue, oldValue) => {
  v_id.value = currentValue;
});

onMounted(async () => {
  v_id.value = p_props.id;
  await m_load();
});

</script>
