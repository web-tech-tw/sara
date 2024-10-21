<template>
  <div class="flex justify-center my-8 py-16">
    <div v-if="myProfile.isDead">
      發生錯誤
    </div>
    <div v-else-if="myProfile.isLoad">
      載入中...
    </div>
    <div
      v-else
      class="flex flex-col mx-auto"
    >
      <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
        您好，{{ myProfile.nickname }}，這裡是您的個人資料：
      </div>
      <div class="p-6 bg-white border-b border-gray-200">
        <span class="text-gray-600">暱稱：</span>{{ myProfile.nickname }}<br>
        <span class="text-gray-600">電子郵件地址：</span>{{ myProfile.email }}<br>
        <span class="text-gray-600">Sara 系統使用者識別碼：</span>{{ myProfile._id }}
      </div>
      <div class="p-6 bg-white border-b border-gray-200 text-right">
        <button
          class="bg-amber-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-amber-600 rounded mr-3"
          @click="onClickLogout"
        >
          登出
        </button>
        <button
          class="bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3"
          @click="onClickDelete"
        >
          刪除帳號
        </button>
        <button
          class="bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded"
          @click="onClickEdit"
        >
          修改個人資料
        </button>
      </div>
      <div class="p-6 bg-white border-b border-gray-200">
        <span class="text-gray-600">通行金鑰：</span>
        <div
          v-show="!myProfile.passkeys.length"
          class="text-center text-slate-600"
        >
          尚未設定通行金鑰
        </div>
        <div>
          <button
            v-for="(i, j) in myProfile.passkeys"
            :key="j"
            class="w-full bg-white shadow-md text-sm text-slate-700 font-bold py-3 md:px-8 px-4 my-1 hover:bg-slate-300 rounded"
            @click="onClickPasskeyManage(i)"
          >
            {{ i.label }}
          </button>
        </div>
        <button
          v-if="isShowPasskeyAdd"
          class="w-full bg-white shadow-md text-sm text-slate-700 font-bold py-3 md:px-8 px-4 my-3 hover:bg-slate-300 rounded"
          @click="onClickPasskeyAdd"
        >
          <plus-icon class="w-6 h-6 inline-block -mt-1 mr-2" />
          新增通行金鑰
        </button>
      </div>
      <div
        v-if="isShowRoles"
        class="p-6 bg-white border-b border-gray-200"
      >
        <span class="text-gray-600">持有權限烙印：</span>
        <ul class="list-disc ml-7">
          <li
            v-for="(i, j) in myProfile.roles"
            :key="j"
          >
            {{ i }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";

import {
    PlusIcon,
} from "@heroicons/vue/24/solid";

import {
    browserSupportsWebAuthn,
    startRegistration,
} from "@simplewebauthn/browser";

import { useClient } from "../clients/sara.js";

const {
    VITE_HOME_INTE_HOST: homeInteHost,
    VITE_SARA_TOKEN_NAME: saraTokenName,
    VITE_SARA_GUARD_NAME: saraGuardName,
} = import.meta.env;

const emits = defineEmits(["state", "status"]);

const myProfile = reactive({
    passkeys: [],
    isLoad: true,
    isDead: false,
});

const isShowRoles = computed(() => {
    return Array.isArray(myProfile?.roles) && myProfile.roles.length;
});

const isShowPasskeyAdd = computed(() => {
    return browserSupportsWebAuthn();
});

const onClickLogout = () => {
    localStorage.removeItem(saraTokenName);
    localStorage.removeItem(saraGuardName);
    location.replace(homeInteHost);
};

const onClickDelete = () => {
    emits("state", {
        name: "ManageProfileDelete",
        props: {
            id: myProfile._id,
            nickname: myProfile.nickname,
            email: myProfile.email,
            roles: myProfile.roles,
        },
    });
};

const onClickEdit = () => {
    emits("state", {
        name: "ManageProfileEdit",
        props: {
            nickname: myProfile.nickname,
        },
    });
};

const onClickPasskeyManage = (passkey) => {
    emits("state", {
        name: "ManagePasskeyShow",
        props: passkey,
    });
};

const onClickPasskeyAdd = async () => {
    const client = useClient();

    const response = await client.post("users/me/passkeys");
    const {
        session_id: sessionId,
        session_options: sessionOptions,
    } = await response.json();

    let credential;
    try {
        credential = await startRegistration({
            optionsJSON: sessionOptions,
        });
    } catch (e) {
        console.error(e);
        emits("status", {
            message: "通行金鑰新增失敗",
        });
        return;
    }

    try {
        await client.patch("users/me/passkeys", {
            json: {
                session_id: sessionId,
                credential,
            },
        });
        emits("status", {
            message: "通行金鑰新增成功",
        });
        setTimeout(() => {
            location.reload();
        }, 1300);
    } catch (e) {
        console.error(e);
        emits("status", {
            message: "通行金鑰新增失敗",
        });
        return;
    }
};

onMounted(async () => {
    const client = useClient();

    try {
        const response = await client.get("users/me");
        const result = await response.json();

        const { profile } = result;
        Object.assign(myProfile, profile);

        requestAnimationFrame(() => {
            myProfile.isLoad = false;
        });
    } catch (e) {
        console.warn(e.message);
        myProfile.isDead = true;
    }
});
</script>
