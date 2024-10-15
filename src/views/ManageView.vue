<template>
  <div class="flex justify-center my-8 py-16">
    <div
      v-if="profile"
      class="flex flex-col mx-5 md:mx-auto"
    >
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div
          v-if="!isEdit"
          class="overflow-hidden shadow-md"
        >
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            您好，{{ profile.nickname }}，這裡是您的個人資料：
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <span class="text-gray-600">暱稱：</span>{{ profile.nickname }}<br>
            <span class="text-gray-600">電子郵件地址：</span>{{ profile.email }}<br>
            <span class="text-gray-600">Sara 系統使用者識別碼：</span>{{ profile._id }}
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
          <div
            v-if="isShowRoles"
            class="p-6 bg-white border-b border-gray-200"
          >
            <span class="text-gray-600">持有權限：</span>
            <ul class="list-disc ml-7">
              <li
                v-for="(i, j) in profile.roles"
                :key="j"
              >
                {{ i }}
              </li>
            </ul>
          </div>
        </div>
        <div
          v-else
          class="overflow-hidden shadow-md"
        >
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            修改個人資料：
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="flex rounded bg-white">
              <label
                class="px-4 py-1 text-gray-600"
                for="nickname"
              >暱稱：</label>
              <input
                id="nickname"
                v-model="field.nickname"
                class="border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
                placeholder="例如：星川 サラ"
                type="text"
              >
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            若要修改電子郵件地址，請點
            <router-link
              class="text-amber-900"
              to="/manage/email"
            >
              此處
            </router-link>
            。
          </div>
          <div class="p-6 bg-white border-gray-200 text-right">
            <button
              class="bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3"
              @click="onSubmitEdit"
            >
              確定修改
            </button>
            <button
              class="bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
              @click="onClickCancelEdit"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      {{ profile === null ? "載入中..." : "發生錯誤" }}
    </div>
  </div>
  <toast-modal v-model="statusMessage" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

import { useClient } from '../clients/sara.js';

import ToastModal from '../components/ToastModal.vue';

const {
  VITE_INDEX_INTE_HOST: indexInteHost,
  VITE_SARA_TOKEN_NAME: saraTokenName,
  VITE_SARA_GUARD_NAME: saraGuardName,
} = import.meta.env;

const statusMessage = ref('');
const isEdit = ref(false);
const field = ref({
  nickname: '',
});
const profile = ref(null);

const client = useClient();

const isShowRoles = computed(() => {
  return Array.isArray(profile.value?.roles) && profile.value.roles.length;
});

const onClickLogout = () => {
  localStorage.removeItem(saraTokenName);
  localStorage.removeItem(saraGuardName);
  location.replace(indexInteHost);
};

const onClickDelete = () => {
  statusMessage.value = "尚未實作";
};

const onClickEdit = () => {
  isEdit.value = true;
};

const onClickCancelEdit = () => {
  isEdit.value = false;
};

const onSubmitEdit = async () => {
  await client.put('users/me', {
    json: {
      nickname: field.value.nickname,
    }
  });
  statusMessage.value = "修改成功";
  setTimeout(() => {
    location.reload();
  }, 1300);
};

onMounted(async () => {
  try {
    const response = await client.get("users/me");
    const result = await response.json();
    profile.value = result.profile;
    field.value.nickname = result.nickname;
  } catch (e) {
    console.warn(e.message);
  }
});
</script>
