<template>
  <div v-if="!isRegistered">
    <div class="flex justify-center my-8 py-16">
      <div class="flex flex-col mx-auto">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md">
            <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
              尚未註冊
            </div>
            <div class="p-6 bg-white border-b border-gray-200">
              您好，您輸入的電子郵件地址：
              <div class="text-slate-900 my-3">
                {{ currentMail }}
              </div>
              尚未於 Sara 系統註冊帳號。
            </div>
            <div class="p-6 bg-white border-b border-gray-200">
              若您確定曾經註冊過：<br>
              請檢查您輸入的電子郵件地址，<br>
              並點選「取消」以重新輸入。
            </div>
            <div class="p-6 bg-white border-b border-gray-200">
              若您未曾註冊：<br>
              請點選「註冊」以進行註冊。<br>
              註冊即代表您同意我們的
              <a
                href="https://web-tech.tw/#/privacy"
                class="text-sky-500 hover:text-sky-700"
                target="_blank"
              >
                隱私權政策
              </a>。
            </div>
            <div class="p-6 bg-white border-b border-gray-200 text-right">
              <button
                class="bg-amber-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-amber-600 rounded mr-3"
                @click="onClickRegister"
              >
                註冊
              </button>
              <button
                class="bg-white shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
                @click="onClickCancel"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex justify-center my-8 py-16">
      <div class="flex flex-col mx-5">
        <label class="input-label text-base mb-2">
          {{ title }}
        </label>
        <input-modal
          v-model="content"
          :loading="isLoading"
          :done="isDone"
          :placeholder="placeholder"
          :description="description"
          :input-type="inputType"
          :input-history="inputHistory"
          @submit="onSubmit"
        />
      </div>
    </div>
    <div
      v-if="isShowKeypass"
      class="flex justify-center mt-5"
    >
      <button
        class="flex items-center space-x-2 bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3"
        @click="onClickPasskey"
      >
        <span>
          <loading-circle-icon
            v-if="isLoading"
            class="h-5 w-5 animate-spin"
          />
          <finger-print-icon
            v-else
            class="h-5 w-5"
          />
        </span>
        <span class="font-bold">
          Passkey
        </span>
      </button>
    </div>
    <div
      v-if="isShowClearHistory"
      class="flex justify-center mt-5"
    >
      <button
        class="flex items-center space-x-2 bg-white-500 text-sm text-black font-bold py-1 md:px-3 px-4 hover:bg-slate-100 rounded mr-3"
        @click="onClickClearHistory"
      >
        <span class="font-bold">
          清除登入記錄
        </span>
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
    <div
      v-show="currentMail"
      class="text-center text-slate-700 mt-5 text-sm"
    >
      <div>目標電子郵件地址：{{ currentMail || "未知" }}</div>
    </div>
  </div>
  <toast-modal v-model="statusMessage" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { FingerPrintIcon } from "@heroicons/vue/24/solid";

import LoadingCircleIcon from '../components/LoadingCircleIcon.vue';

import {
  browserSupportsWebAuthn,
  startAuthentication,
} from '@simplewebauthn/browser';

import { useClient } from '../clients/sara.js';
import { exitApplication } from '../utils.js';

import InputModal from '../components/InputModal.vue';
import ToastModal from '../components/ToastModal.vue';

const loginEmailHistoryKey = 'saraLoginEmailHistory';
const registerEmailKey = 'saraRegisterEmail';

const isLoading = ref(false);
const isDone = ref(false);
const isRegistered = ref(true);
const inputHistory = ref('');
const statusMessage = ref('');
const currentMail = ref('');
const sessionId = ref('');
const sessionUa = ref('');
const sessionIp = ref('');
const sessionTm = ref('');
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
  return browserSupportsWebAuthn() && !sessionId.value;
});

const isShowClearHistory = computed(() => {
  return !sessionId.value && !!inputHistory.value;
});

const isShowSessionDetails = computed(() => {
  return !!sessionId.value;
});

const onClickPasskey = async () => {
  const {value} = content;
  if (!value) {
    statusMessage.value = emptyWarning.value;
    return;
  }

  isLoading.value = true;
  try {
    const response = await client.post("tokens/passkeys", {
      json: {
        email: value,
      }
    });
    const {
      session_id: passkeySessionId,
      session_options: sessionOptions,
    } = await response.json();

    const credential = await startAuthentication({
      optionsJSON: sessionOptions,
    });
    await client.patch('tokens/passkeys', {
      json: {
        session_id: passkeySessionId,
        credential,
      }
    });
    isDone.value = true;
    statusMessage.value = '登入成功，正在寫入憑證...';
    localStorage.setItem(loginEmailHistoryKey, value);
    exitApplication();
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
    isLoading.value = false;
  }
};

const onClickClearHistory = () => {
  localStorage.removeItem(loginEmailHistoryKey);
  inputHistory.value = "";
  statusMessage.value = "成功清除登入記錄";
};

const onClickRegister = () => {
  sessionStorage.setItem(registerEmailKey, currentMail.value);
  router.push('/register');
};

const onClickCancel = () => {
  location.reload();
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
      sessionUa.value = result.session_ua;
      sessionIp.value = result.session_ip;
      sessionTm.value = result.session_tm;
      currentMail.value = value;
      inputHistory.value = '';
      content.value = '';
    } else {
      statusMessage.value = '發生錯誤 (無錯誤代碼)';
    }
  } catch (e) {
    if (e?.response?.status === 404) {
      currentMail.value = value;
      isRegistered.value = false;
      content.value = '';
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
    isDone.value = true;
    statusMessage.value = '登入成功，正在寫入憑證...';
    localStorage.setItem(loginEmailHistoryKey, currentMail.value);
    exitApplication();
  } catch (e) {
    const errorCode = e?.response?.status || '無錯誤代碼';
    statusMessage.value = `發生錯誤 (${errorCode})`;
    console.error(e.message);
  }
};

onMounted(() => {
  inputHistory.value = localStorage.getItem(loginEmailHistoryKey);
});
</script>
