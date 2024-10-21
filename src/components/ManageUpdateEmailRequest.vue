<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-auto">
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md">
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            修改電子郵件地址：
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="rounded bg-white md:flex">
              <label
                class="w-full py-1 text-gray-600 md:w-64"
                for="email"
              >
                新的電子郵件地址：
              </label>
              <input
                id="email"
                v-model="inputContent"
                class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring"
                placeholder="例如：sara@web-tech.tw"
                type="email"
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import {
  useClient,
} from "../clients/sara";

const emits = defineEmits(["state", "status"]);

const isLoad = ref(false);
const isDone = ref(false);

const inputContent = ref("");

const isDisabled = computed(() => {
  return isLoad.value || isDone.value;
});

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async (value) => {
  const client = useClient();
  const response = await client.put("users/me/email", {
    json: {
      email: value
    },
  });
  const result = await response.json();

  isDone.value = true;
  emits("state", {
    name: "ManageUpdateEmailVerify",
    props: {
      sessionId: result.session_id,
      sessionTm: result.session_tm,
      sessionUa: result.session_ua,
      sessionIp: result.session_ip,
      currentMail: value,
    },
  });
};

const onSubmit = async () => {
  const { value } = inputContent;
  if (!value) {
    emits("status", {
      message: "請輸入新的電子郵件地址",
    });
    return;
  }

  isLoad.value = true;
  await requestSubmit(value);
  isLoad.value = false;
};
</script>
