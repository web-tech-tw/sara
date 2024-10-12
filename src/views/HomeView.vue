<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col">
      <label class="input-label text-base mb-2">{{ title }}</label>
      <p class="input-label text-base mb-2 text-red-600">
        {{ statusMessage }}
      </p>
      <input-modal
        v-model="content"
        :loading="isLoading"
        :placeholder="placeholder"
        :description="description"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useClient } from '../clients/sara.js';
import { exitApplication } from '../utils.js';

import InputModal from '../components/InputModal.vue';

const isLoading = ref(false);
const statusMessage = ref('');
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
  return !sessionId.value ? '' : '請於您的電子郵件信箱收取登入代碼。';
});

const onSubmit = async (value) => {
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
  try {
    const response = await client.post('tokens', {
      json: {
        email: value,
      },
    });
    const result = await response.json();
    if (result?.session_id) {
      sessionId.value = result.session_id;
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
    content.value = '';
    exitApplication();
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
  }
};
</script>
