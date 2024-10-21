<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-auto">
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md">
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            修改個人資料：
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="rounded bg-white md:flex">
              <label
                class="w-full py-1 text-gray-600 md:w-16"
                for="nickname"
              >
                暱稱：
              </label>
              <input
                id="nickname"
                v-model="fields.nickname"
                class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring"
                placeholder="星川 サラ"
                type="text"
                :disabled="isDisabled"
              >
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            若要修改電子郵件地址，請點
            <span
              class="cursor-pointer text-sky-500 hover:text-sky-700"
              @click="onClickUpdateEmail"
            >
              此處
            </span>
            。
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
    </div>
  </div>
</template>
  
<script setup>
import { ref, reactive, computed } from "vue";

import {
  useClient,
} from "../clients/sara";

const props = defineProps({
  nickname: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["state", "status"]);

const isLoad = ref(false);
const isDone = ref(false);

const fields = reactive({
  nickname: props.nickname,
});

const isDisabled = computed(() => {
  return isLoad.value || isDone.value;
});

const onClickUpdateEmail = () => {
  emits("state", {
    name: "ManageUpdateEmailRequest",
  });
};

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async () => {
  const client = useClient();
  await client.put("users/me", {
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
