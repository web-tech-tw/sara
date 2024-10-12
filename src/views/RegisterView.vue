<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col">
      <label class="input-label text-base mb-2">{{ title }}</label>
      <p class="input-label text-base mb-2 text-red-600">
        {{ statusMessage }}
      </p>
      <input-modal
        :loading="isLoading"
        :placeholder="placeholder"
        :description="description"
        @submit="submit"
      />
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <button
      class="
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
      "
      @click="cancel"
    >
      取消
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useClient } from '../clients/sara.js';
import { exitApplication } from '../utils.js';

import InputModal from '../components/InputModal.vue';

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

const isLoading = ref(false);
const statusMessage = ref('');
const sessionId = ref('');

const router = useRouter();
const client = useClient();

const title = computed(() => {
  return !sessionId.value ? '請輸入您的暱稱：' : '請輸入您的註冊代碼：';
});

const placeholder = computed(() => {
  return !sessionId.value ? '例如：星川 サラ' : '例如：1234567';
});

const description = computed(() => {
  return !sessionId.value ? '' : '請於您的電子郵件信箱收取註冊代碼。';
});

const cancel = () => {
  if (window.history.length) {
    router.back();
  } else {
    router.replace('/');
  }
};

const submit = async (value) => {
  if (!value) {
    statusMessage.value = '請輸入資料';
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
  const registerEmail = sessionStorage.getItem("sara_register_email");
  try {
    const response = await client.post('users', {
      json: {
        email: registerEmail,
        nickname: value,
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
    await client.patch('users', {
      json: {
        session_id: sessionId.value,
        code: value,
      }
    });
    statusMessage.value = '註冊成功，正在寫入憑證...';
    sessionStorage.removeItem("sara_register_email");
    exitApplication();
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
  }
};

onMounted(() => {
  const registerEmail = sessionStorage.getItem("sara_register_email");
  if (!registerEmail) {
    router.replace('/');
  }
});
</script>
