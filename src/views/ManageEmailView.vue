<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-5">
      <label class="input-label text-base mb-2">
        {{ title }}
      </label>
      <input-modal
        v-model="content"
        :loading="isLoading"
        :placeholder="placeholder"
        :description="description"
        :input-type="inputType"
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
  <div
    v-if="isShowSessionDetails"
    class="text-center text-slate-700 mt-5 text-sm"
  >
    <div>申請時間：{{ sessionTm || "未知" }}</div>
    <div>申請識別碼：{{ sessionId || "未知" }}</div>
    <div>申請來源裝置：{{ sessionUa || "未知" }}</div>
    <div>申請來源 IP 位址：{{ sessionIp || "未知" }}</div>
  </div>
  <toast-modal v-model="statusMessage" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useClient } from '../clients/sara.js';

import InputModal from '../components/InputModal.vue';
import ToastModal from '../components/ToastModal.vue';

const isLoading = ref(false);
const statusMessage = ref('');
const currentMail = ref('');
const sessionId = ref('');
const sessionUa = ref('');
const sessionIp = ref('');
const sessionTm = ref('');
const content = ref('');

const router = useRouter();
const client = useClient();

const title = computed(() => {
  return !sessionId.value ? '請輸入新的電子郵件地址：' : '請輸入您的轉移代碼：';
});

const placeholder = computed(() => {
  return !sessionId.value ? '例如：sara@web-tech.tw' : '例如：12345678';
});

const description = computed(() => {
  return !sessionId.value ? '' : `請於新的電子郵件信箱 ${currentMail.value} 收取轉移代碼。`;
});

const inputType = computed(() => {
  return !sessionId.value ? 'email' : 'text';
});

const emptyWarning = computed(() => {
  return !sessionId.value ? '請輸入電子郵件地址' : '請輸入轉移代碼';
});

const isShowSessionDetails = computed(() => {
  return !!sessionId.value;
});

const onClickCancel = () => {
  if (window.history.length) {
    router.back();
  } else {
    router.replace('/');
  }
};

const onSubmit = async (value) => {
  if (!value) {
    statusMessage.value = emptyWarning.value;
    return;
  }

  statusMessage.value = '';
  isLoading.value = true;
  if (!sessionId.value) {
    await doRequest(value);
  } else {
    await verifyRequest(value);
  }
  isLoading.value = false;
};

const doRequest = async (value) => {
  try {
    const response = await client.put('users/me/email', {
      json: {
        email: value,
      },
    });
    const result = await response.json();
    if (result?.session_id) {
      sessionId.value = result.session_id;
      sessionUa.value = result.session_ua;
      sessionIp.value = result.session_ip;
      sessionTm.value = result.session_tm;
      currentMail.value = content.value;
      content.value = '';
    } else {
      statusMessage.value = '發生錯誤 (無錯誤代碼)';
    }
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
  }
};

const verifyRequest = async (value) => {
  try {
    await client.patch('users/me/email', {
      json: {
        session_id: sessionId.value,
        code: value,
      }
    });
    statusMessage.value = '修改成功，正在寫入憑證...';
    setTimeout(() => router.replace('/manage'), 500);
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
  }
};
</script>
