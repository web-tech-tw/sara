<template>
  <button
    v-show="model"
    type="button"
    class="fixed right-2 lg:right-24 top-24 z-50 rounded-md px-4 py-2 text-white transition bg-amber-600 hover:bg-slate-300"
    @click="onClickClose"
  >
    <div class="flex items-center space-x-2">
      <p class="font-bold">
        {{ model }}
      </p>
    </div>
  </button>
</template>

<script setup>
import {watch} from "vue";

let timer;

const model = defineModel({
  type: String,
});

function onClickClose() {
  if (timer) {
    clearTimeout(timer);
  }
  model.value = "";
}

watch(model, () => {
  if (!model.value) return;
  timer = setTimeout(onClickClose, 3000);
});
</script>
