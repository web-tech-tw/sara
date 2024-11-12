<template>
  <div class="input-modal">
    <div class="flex rounded bg-white w-auto h-16 shadow-md md:w-[30rem]">
      <input
        v-model="inputContent"
        class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
        :placeholder="props.inputPlaceholder"
        :type="props.inputType"
        :disabled="isDisabled"
        @focus="onFocus"
        @keydown.enter="onSubmit"
      >
      <button
        v-if="!props.noSubmit"
        class="m-2 rounded px-4 py-2 font-semibold"
        :disabled="isDisabled"
        @click="onSubmit"
      >
        <check-circle-icon
          v-if="props.isDone"
          class="h-6 w-6 my-1"
        />
        <loading-circle-icon
          v-else-if="props.isLoad"
          class="h-6 w-6 my-1 animate-spin"
        />
        <arrow-right-circle-icon
          v-else
          class="h-6 w-6 my-1"
        />
      </button>
    </div>
    <button
      v-show="isShowHistory"
      class="w-[90%] mx-auto flex items-center space-x-2 bg-white-500 shadow-md text-md text-slate-700 font-normal py-3 md:px-8 px-4 hover:bg-slate-100 rounded mt-1 animate-fade"
      :disabled="isDisabled"
      @click="onClickHistory"
    >
      {{ props.inputHistory }}
    </button>
    <p class="text-base mt-2">
      {{ props.description }}
    </p>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from "vue";

import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

import LoadingCircleIcon from "./LoadingCircleIcon.vue";

const props = defineProps({
  inputPlaceholder: {
    type: String,
    required: false,
    default: () => "",
  },
  inputDescription: {
    type: String,
    required: false,
    default: () => "",
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
  isLoad: {
    type: Boolean,
    required: false,
    default: () => true,
  },
  isDone: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  noSubmit: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const inputContent = defineModel({
  type: String,
});

const emits = defineEmits(["submit"]);

const isShowHistoryRaw = ref(false);

const isShowHistory = computed(() => {
  return !!props.inputHistory &&
    !inputContent.value &&
    isShowHistoryRaw.value;
});

const isDisabled = computed(() => {
  return props.isLoad || props.isDone;
});

const onClickHistory = () => {
  inputContent.value = props.inputHistory;
  isShowHistoryRaw.value = false;
};

const onFocus = () => {
  isShowHistoryRaw.value = true;
};

const onBlur = (e) => {
  if (!document.querySelector(".input-modal").contains(e.target)) {
    isShowHistoryRaw.value = false;
  }
};

const onSubmit = () => {
  emits("submit", inputContent.value);
};

onMounted(() => {
  document.addEventListener("click", onBlur);
});

onUnmounted(() => {
  document.removeEventListener("click", onBlur);
});
</script>
