<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-5">
      <label class="input-label text-base mb-2">
        {{ title }}
      </label>
      <input-modal
        v-model="inputContent"
        :input-description="inputDescription"
        :input-placeholder="inputPlaceholder"
        :is-load="isLoad"
        :is-done="isDone"
        @submit="onSubmit"
      />
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <button
      class="flex items-center space-x-2 bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3"
      @click="onClickCancel"
    >
      取消
    </button>
  </div>
  <div class="text-center text-slate-700 mt-5 text-sm">
    <div>申請時間：{{ props.sessionTm || "未知" }}</div>
    <div>申請識別碼：{{ props.sessionId || "未知" }}</div>
    <div>申請來源裝置：{{ props.sessionUa || "未知" }}</div>
    <div>申請來源 IP 位址：{{ props.sessionIp || "未知" }}</div>
  </div>
  <div
    v-show="props.currentMail"
    class="text-center text-slate-700 mt-5 text-sm"
  >
    <div>目標電子郵件地址：{{ props.currentMail || "未知" }}</div>
  </div>
</template>

<script setup>
import {ref} from "vue";

import {
  useClient,
} from "../clients/sara.js";

import InputModal from "../components/InputModal.vue";

import {
  setLoginEmailHistory,
  safeUrlAssignRefer,
} from "../utils.js";

const props = defineProps({
  sessionId: {
    type: String,
    required: true,
  },
  sessionTm: {
    type: String,
    required: true,
  },
  sessionUa: {
    type: String,
    required: true,
  },
  sessionIp: {
    type: String,
    required: true,
  },
  currentMail: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["state", "status"]);

const title = "請輸入您的註冊代碼：";

const inputDescription = `請於您的電子郵件信箱 ${props.currentMail} 收取註冊代碼。`;
const inputPlaceholder = "例如：1234567";
const inputContent = ref("");

const isLoad = ref(false);
const isDone = ref(false);

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async (value) => {
  const client = useClient();

  try {
    await client.patch("users", {
      json: {
        session_id: props.sessionId,
        code: value,
      },
    });

    isDone.value = true;
    emits("status", {
      message: "註冊成功，正在寫入憑證...",
    });
    setLoginEmailHistory(props.currentMail);
    safeUrlAssignRefer();
  } catch (e) {
    console.error(e);
    const errorCode = e?.response?.status || "無錯誤代碼";
    emits("status", {
      message: `發生錯誤 (${errorCode})`,
    });
  }
};

const onSubmit = async (value) => {
  if (!value) {
    emits("status", {
      message: "請輸入註冊代碼",
    });
    return;
  }

  isLoad.value = true;
  await requestSubmit(value);
  isLoad.value = false;
};
</script>
