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
        :input-history="inputHistory"
        @submit="onSubmit"
      />
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <button
      v-if="isShowKeypass"
      class="flex items-center space-x-2 bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3"
      @click="onClickPasskey"
    >
      <span>
        <finger-print-icon class="h-5 w-5" />
      </span>
      <span class="font-bold">
        Passkey
      </span>
    </button>
  </div>
  <toast-modal v-model="statusMessage" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { FingerPrintIcon } from "@heroicons/vue/24/solid"

import { useClient } from '../clients/sara.js';
import { exitApplication } from '../utils.js';

import InputModal from '../components/InputModal.vue';
import ToastModal from '../components/ToastModal.vue';

const inputHistoryKey = 'saraInputHistoryLogin';

const isLoading = ref(false);
const inputHistory = ref('');
const statusMessage = ref('');
const currentMail = ref('');
const sessionId = ref('');
const content = ref('');

const client = useClient();
const router = useRouter();

const title = computed(() => {
  return !sessionId.value ? '請輸入您的電子郵件地址：' : '請輸入您的登入代碼：';
});

const placeholder = computed(() => {
  return !sessionId.value ? '例如：sara@web-tech.tw' : '例如：123456';
});

const description = computed(() => {
  return !sessionId.value ? '' : `請於您的電子郵件信箱 ${currentMail.value} 收取登入代碼。`;
});

const inputType = computed(() => {
  return !sessionId.value ? 'email' : 'text';
});

const emptyWarning = computed(() => {
  return !sessionId.value ? '請輸入電子郵件地址' : '請輸入登入代碼';
});

const isShowKeypass = computed(() => {
  return !sessionId.value;
});

const onClickPasskey = () => {
  statusMessage.value = "尚未實作";
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
    const response = await client.post('tokens', {
      json: {
        email: value,
      },
    });
    const result = await response.json();
    if (result?.session_id) {
      sessionId.value = result.session_id;
      currentMail.value = content.value;
      inputHistory.value = '';
      content.value = '';
    } else {
      statusMessage.value = '發生錯誤 (無錯誤代碼)';
    }
  } catch (e) {
    if (e?.response?.status === 404) {
      sessionStorage.setItem("sara_register_email", value);
      router.push('/register');
    } else {
      const errorCode = e?.response?.status || '無錯誤代碼';
      statusMessage.value = `發生錯誤 (${errorCode})`;
      console.error(e.message);
    }
  }
};

const verifyRequest = async (value) => {
  try {
    await client.patch('tokens', {
      json: {
        session_id: sessionId.value,
        code: value,
      }
    });
    statusMessage.value = '登入成功，正在寫入憑證...';
    localStorage.setItem(inputHistoryKey, currentMail.value);
    exitApplication();
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
  }
};

onMounted(() => {
  inputHistory.value = localStorage.getItem(inputHistoryKey);
});
</script>
