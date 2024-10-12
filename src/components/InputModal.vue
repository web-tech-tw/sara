<template>
  <div>
    <div class="flex rounded bg-white w-auto shadow-md md:w-[30rem]">
      <input
        v-model="content"
        :disabled="props.loading"
        :placeholder="props.placeholder"
        class="
          w-full
          border-none
          bg-transparent
          px-4
          py-1
          text-gray-900
          outline-none
          focus:outline-none
        "
        type="text"
        @keydown.enter="submit"
      >
      <button
        class="m-2 rounded px-4 py-2 font-semibold"
        :disabled="props.loading"
        @click="submit"
      >
        <svg
          class="mt-1 h-6 w-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <p class="text-base mt-2">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

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
