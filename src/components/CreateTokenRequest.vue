<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-5">
      <label class="input-label text-base mb-2">
        {{ title }}
      </label>
      <input-modal
        v-model="inputContent"
        :input-placeholder="inputPlaceholder"
        :input-type="inputType"
        :input-history="inputHistory"
        :is-load="isLoad"
        :is-done="isDone"
        :no-submit="isUsingPasskey"
        @submit="onSubmit"
      />
    </div>
  </div>
  <div
    v-if="isShowPasskey"
    class="flex justify-center mt-5"
  >
    <button
      class="flex items-center space-x-2 bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded mr-3"
      @click="onClickPasskey"
    >
      <span>
        <check-circle-icon
          v-if="isDone"
          class="h-5 w-5"
        />
        <loading-circle-icon
          v-if="isLoad"
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
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import {
  CheckCircleIcon,
  FingerPrintIcon,
} from "@heroicons/vue/24/solid";

import LoadingCircleIcon from "./LoadingCircleIcon.vue";

import {
  browserSupportsWebAuthn,
  startAuthentication,
} from "@simplewebauthn/browser";

import {
  useClient,
} from "../clients/sara.js";

import {
  getLoginEmailHistory,
  setLoginEmailHistory,
  clearLoginEmailHistory,
  safeUrlAssignRefer,
} from "../utils.js";

import InputModal from "./InputModal.vue";

const title = "請輸入您的電子郵件地址：";

const inputPlaceholder = "例如：sara@web-tech.tw";
const inputType = "email";

const inputContent = ref("");
const inputHistory = ref("");

const isLoad = ref(false);
const isDone = ref(false);
const isUsingPasskey = ref(false);

const isShowPasskey = computed(() => {
  return browserSupportsWebAuthn();
});

const isShowClearHistory = computed(() => {
  return !!inputHistory.value;
});

const emits = defineEmits(["state", "status"]);

const onClickPasskey = async () => {
  const {value} = inputContent;
  if (!value) {
    emits("status", {
      message: "請輸入電子郵件地址",
    });
    return;
  }

  isLoad.value = true;
  await requestPasskey(value);
  isLoad.value = false;
};

const onClickClearHistory = () => {
  clearLoginEmailHistory();
  inputHistory.value = "";
  emits("status", {
    message: "成功清除登入記錄",
  });
};

const requestPasskey = async (value) => {
  const client = useClient();

  try {
    isUsingPasskey.value = true;

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
    await client.patch("tokens/passkeys", {
      json: {
        session_id: passkeySessionId,
        credential,
      }
    });

    isDone.value = true;
    emits("status", {
      message: "登入成功，正在寫入憑證...",
    });
    setLoginEmailHistory(value);
    safeUrlAssignRefer();
  } catch (e) {
    console.error(e);
    const errorCode = e?.response?.status || "無錯誤代碼";
    emits("status", {
      message: `發生錯誤 (${errorCode})`,
    });

    isUsingPasskey.value = false;
  }
}

const requestSubmit = async (value) => {
  const client = useClient();

  try {
    const response = await client.post("tokens", {
      json: {
        email: value,
      },
    });

    const result = await response.json();
    if (!result?.session_id) {
      emits("status", {
        message: "發生錯誤 (無錯誤代碼)",
      });
      return;
    }

    emits("state", {
      name: "CreateTokenVerify",
      props: {
        sessionId: result.session_id,
        sessionTm: result.session_tm,
        sessionUa: result.session_ua,
        sessionIp: result.session_ip,
        currentMail: value,
      },
    });
  } catch (e) {
    if (e?.response?.status === 404) {
      emits("state", {
        name: "CreateTokenEmpty",
        props: {
          currentMail: value,
        },
      });
      return;
    }

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
      message: "請輸入電子郵件地址",
    });
    return;
  }

  isLoad.value = true;
  await requestSubmit(value);
  isLoad.value = false;
};

onMounted(() => {
  inputHistory.value = getLoginEmailHistory();
});
</script>
