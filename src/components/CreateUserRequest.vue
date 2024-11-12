<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-5">
      <label class="input-label text-base mb-2">
        {{ title }}
      </label>
      <input-modal
        v-model="inputContent"
        :input-placeholder="inputPlaceholder"
        :is-load="isLoad"
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
    <div>目標電子郵件地址：{{ props.currentMail || "未知" }}</div>
  </div>
</template>

<script setup>
import {ref} from "vue";

import {
  useClient,
} from "../clients/sara";

import InputModal from "../components/InputModal.vue";

const props = defineProps({
  currentMail: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["state", "status"]);

const title = "請輸入您的暱稱：";

const inputPlaceholder = "例如：星川 サラ";
const inputContent = ref("");

const isLoad = ref(false);

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async (value) => {
  const client = useClient();

  try {
    const response = await client.post("users", {
      json: {
        email: props.currentMail,
        nickname: value,
      },
    });
    const result = await response.json();
    emits("state", {
      name: "CreateUserVerify",
      props: {
        sessionId: result.session_id,
        sessionTm: result.session_tm,
        sessionUa: result.session_ua,
        sessionIp: result.session_ip,
        currentMail: props.currentMail,
      },
    });
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
      message: "請輸入暱稱",
    });
    return;
  }

  isLoad.value = true;
  await requestSubmit(value);
  isLoad.value = false;
};
</script>
