<template>
  <div class="input-modal">
    <div class="flex rounded bg-white w-auto shadow-md md:w-[30rem]">
      <input
        v-model="content"
        :disabled="props.loading"
        :placeholder="props.placeholder"
        class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
        :type="inputType"
        @focus="onFocus"
        @keydown.enter="onSubmit"
      >
      <button
        class="m-2 rounded px-4 py-2 font-semibold"
        :disabled="props.loading"
        @click="onSubmit"
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
    <button
      v-show="isShowHistory"
      class="w-[90%] mx-auto flex items-center space-x-2 bg-white-500 shadow-md text-md text-slate-700 font-normal py-3 md:px-8 px-4 hover:bg-slate-100 rounded mt-1 animate-fade"
      @click="onClickHistory"
    >
      {{ inputHistory }}
    </button>
    <p class="text-base mt-2">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

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
  inputType: {
    type: String,
    required: false,
    default: () => "text",
  },
  inputHistory: {
    type: String,
    required: false,
    default: () => "",
  },
});

const content = defineModel({
  type: String,
});

const emits = defineEmits(['submit']);

const isShowHistoryRaw = ref(false);

const isShowHistory = computed(() => {
  return !!props.inputHistory && !content.value && isShowHistoryRaw.value;
});

const onClickHistory = () => {
  content.value = props.inputHistory;
  isShowHistoryRaw.value = false;
};

const onFocus = () => {
  isShowHistoryRaw.value = true;
};

const onBlur = (e) => {
  if (!document.querySelector('.input-modal').contains(e.target)) {
    isShowHistoryRaw.value = false;
  }
};

const onSubmit = () => {
  emits('submit', content.value);
};

onMounted(() => {
  document.addEventListener('click', onBlur);
});

onUnmounted(() => {
  document.removeEventListener('click', onBlur);
});
</script>
