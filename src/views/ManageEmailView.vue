<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col">
      <label class="input-label text-base mb-2">{{ title }}</label>
      <p class="input-label text-base mb-2 text-red-600">{{ statusMessage }}</p>
      <input-modal :loading="isLoading" :placeholder="placeholder" :description="description" @submit="submit" />
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <button class="
        bg-white-500
        shadow-md
        text-sm text-black
        font-bold
        py-3
        md:px-8
        px-4
        hover:bg-slate-100
        rounded
        mr-3
      " @click="cancel">
      取消
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useClient } from '../clients/sara.js';

import InputModal from '../components/InputModal.vue';

const isLoading = ref(false);
const statusMessage = ref('');
const sessionId = ref('');

const router = useRouter();
const client = useClient();

const title = computed(() => {
  return !sessionId.value ? '請輸入新的電子郵件地址：' : '請輸入您的轉移代碼：';
});

const placeholder = computed(() => {
  return !sessionId.value ? '例如：sara@web-tech.tw' : '例如：12345678';
});

const description = computed(() => {
  return !sessionId.value ? '' : '請於您的新的電子郵件信箱收取轉移代碼。';
});

const cancel = () => {
  if (window.history.length) {
    router.back();
  } else {
    router.replace('/');
  }
};

const submit = (value) => {
  if (!value) {
    statusMessage.value = '請輸入資料';
    return;
  }

  statusMessage.value = '';
  isLoading.value = true;
  if (!sessionId.value) {
    doRequest(value);
  } else {
    verifyRequest(value);
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
