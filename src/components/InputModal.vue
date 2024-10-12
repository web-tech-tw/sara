<template>
  <div>
    <div class="flex rounded bg-white w-auto shadow-md md:w-[30rem]">
      <input
        v-model="content"
        :disabled="props.loading"
        :placeholder="props.placeholder"
        class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
        type="text"
        @keydown.enter="submit"
      >
      <button
        class="m-2 rounded px-4 py-2 font-semibold"
        :disabled="props.loading"
        @click="submit"
      >
        <img
          v-if="props.loading"
          :src="LoadingCircle"
          class="h-6 w-6 my-1 animate-spin"
        >
        <img
          v-else
          :src="NextCircle"
          class="h-6 w-6 my-1"
        >
      </button>
    </div>
    <p class="text-base mt-2">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

import NextCircle from '../assets/NextCircle.svg';
import LoadingCircle from '../assets/LoadingCircle.svg';

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const content = ref('');

const emit = defineEmits(['input', 'submit']);

const submit = () => {
  emit('submit', content.value);
  content.value = '';
};
</script>
