<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col max-w-2xl mx-auto">
      <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
        移除 Passkey 通行金鑰 — {{ props.label }}
      </div>
      <div class="p-6 bg-white border-b border-gray-200">
        您確定要移除此 Passkey 通行金鑰嗎？此動作無法復原。
      </div>
      <div class="p-6 bg-white border-gray-200 text-right">
        <button
          class="bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3"
          :disabled="isDisabled"
          @click="onSubmit"
        >
          確定移除
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
import {ref, computed} from "vue";

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

const isDisabled = computed(() => {
  return isLoad.value || isDone.value;
});

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async () => {
  const client = useClient();
  await client.delete(`users/me/passkeys/${props.id}`);

  isDone.value = true;
  emits("status", {
    message: "移除成功",
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
