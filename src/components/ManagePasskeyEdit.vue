<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col max-w-2xl mx-auto">
      <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
        修改 Passkey 通行金鑰 — {{ props.label }}
      </div>
      <div class="p-6 bg-white border-b border-gray-200">
        <div class="rounded bg-white md:flex">
          <label
            class="w-full py-1 text-gray-600 md:w-16"
            for="label"
          >
            名稱：
          </label>
          <input
            id="label"
            v-model="fields.label"
            class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring"
            placeholder="芝麻開門"
            type="text"
            :disabled="isDisabled"
          >
        </div>
      </div>
      <div class="p-6 bg-white border-gray-200 text-right">
        <button
          class="bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3"
          :disabled="isDisabled"
          @click="onSubmit"
        >
          確定修改
        </button>
        <button
          class="bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
          :disabled="isDisabled"
          @click="onClickCancel"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

import {
  useClient,
} from "../clients/sara";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["status"]);

const isLoad = ref(false);
const isDone = ref(false);

const fields = reactive({
  label: props.label,
});

const isDisabled = computed(() => {
  return isLoad.value || isDone.value;
});

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async () => {
  const client = useClient();
  await client.put(`users/me/passkeys/${props.id}`, {
    json: fields,
  });

  isDone.value = true;
  emits("status", {
    message: "修改成功",
  });
  setTimeout(() => {
    location.reload();
  }, 1300);
};

const onSubmit = async () => {
  isLoad.value = true;
  await requestSubmit();
  isLoad.value = false;
};
</script>