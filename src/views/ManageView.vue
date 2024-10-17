<template>
  <div class="flex justify-center my-8 py-16">
    <div
      v-if="myProfile.isLoaded"
      class="flex flex-col mx-auto"
    >
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div
          v-if="isDelete"
          class="overflow-hidden shadow-md"
        >
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            刪除帳號
          </div>
          <div class="p-6 bg-white border-b border-gray-200 text-red-600">
            ⚠️ 請注意，刪除帳號後，所有資料將無法復原。
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <p class="text-amber-500">
              ‼️ 刪除並非完全抹除 ‼️
            </p>
            本系統將保留您的「Sara 系統使用者識別碼」以供您先前曾使用的服務繼續應用，但會將您的暱稱及電子郵件地址設為無效值。<br>
            這意味著，您將 <span class="text-red-600">永久喪失</span>
            本帳號的存取權限，您將不再被識別為「同一個使用者」。但您的互動紀錄仍會保留在系統中作為服務參照。
            <div class="my-3">
              以下是將被刪除的資料：
              <ul class="list-disc ml-6">
                <li>暱稱</li>
                <li>電子郵件地址</li>
                <li>您對本「Sara 系統使用者識別碼」之存取權限</li>
              </ul>
            </div>
            在帳號刪除後，您將無法再次使用此帳號登入本系統。<br>
            但您可使用相同的電子郵件地址重新註冊新帳號。
          </div>
          <div class="p-6 bg-white border-b border-gray-200 text-red-600">
            請注意，刪除帳號後，所有資料將無法復原。<br>
            本操作無法撤銷，請謹慎考慮。<br>
            若確定刪除，請輸入 DELETE 以確認。
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            將被刪除的帳號資訊如下：
            <div class="p-6">
              <span class="text-gray-600">暱稱：</span>{{ myProfile.nickname }}<br>
              <span class="text-gray-600">電子郵件地址：</span>{{ myProfile.email }}<br>
              <span class="text-red-600">（資料將會立即抹除，不會保存您的資訊）</span>
            </div>
            將解除存取權限的使用者識別碼如下：
            <div class="p-6">
              <span class="text-gray-600">Sara 系統使用者識別碼：</span>{{ myProfile._id }}<br>
              <span class="text-gray-600">Sara 系統權限烙印：</span>{{ myProfile.roles.length }} 組<br>
              <span class="text-red-600">（資料仍會保留在系統中，但將無法再次使用）</span>
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="flex rounded bg-white">
              <label
                class="w-20 px-4 py-1 text-gray-600"
                for="confirm"
              >刪除：</label>
              <input
                id="confirm"
                v-model="fieldDelete.confirm"
                class="border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
                placeholder="若確定刪除，請輸入 DELETE"
                type="text"
              >
            </div>
          </div>
          <div class="p-6 bg-white border-gray-200 text-right">
            <button
              class="bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3"
              @click="onSubmitDelete"
            >
              確定修改
            </button>
            <button
              class="bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
              @click="onClickCancelDelete"
            >
              取消
            </button>
          </div>
        </div>
        <div
          v-else-if="isEdit"
          class="overflow-hidden shadow-md"
        >
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            修改個人資料：
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="flex rounded bg-white">
              <label
                class="w-20 px-4 py-1 text-gray-600"
                for="nickname"
              >暱稱：</label>
              <input
                id="nickname"
                v-model="fieldEdit.nickname"
                class="border-none bg-transparent px-4 py-1 text-gray-900 outline-none focus:outline-none"
                placeholder="例如：星川 サラ"
                type="text"
              >
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            若要修改電子郵件地址，請點
            <router-link
              class="text-sky-500 hover:text-sky-700"
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
        <div
          v-else
          class="overflow-hidden shadow-md"
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
          <div
            v-if="isShowRoles"
            class="p-6 bg-white border-b border-gray-200"
          >
            <span class="text-gray-600">持有權限：</span>
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
    </div>
    <div v-else>
      {{ myProfile.isError ? "發生錯誤" : "載入中..." }}
    </div>
  </div>
  <toast-modal v-model="statusMessage" />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

import { useClient } from '../clients/sara.js';

import ToastModal from '../components/ToastModal.vue';

const {
  VITE_INDEX_INTE_HOST: indexInteHost,
  VITE_SARA_TOKEN_NAME: saraTokenName,
  VITE_SARA_GUARD_NAME: saraGuardName,
} = import.meta.env;

const statusMessage = ref('');
const isDelete = ref(false);
const isEdit = ref(false);
const fieldDelete = ref({
  confirm: '',
});
const fieldEdit = ref({
  nickname: '',
});
const myProfile = reactive({
  isLoaded: false,
  isError: false,
});

const client = useClient();

const isShowRoles = computed(() => {
  return Array.isArray(myProfile?.roles) && myProfile.roles.length;
});

const onClickLogout = () => {
  localStorage.removeItem(saraTokenName);
  localStorage.removeItem(saraGuardName);
  location.replace(indexInteHost);
};

const onClickDelete = () => {
  isDelete.value = true;
};

const onClickCancelDelete = () => {
  isDelete.value = false;
};

const onSubmitDelete = async () => {
  if (fieldDelete.value.confirm !== 'DELETE') {
    statusMessage.value = "請輸入 DELETE 以確認刪除";
    return;
  }
  await client.delete('users/me');
  statusMessage.value = "刪除成功";
  setTimeout(() => {
    location.replace(indexInteHost);
  }, 1300);
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
      nickname: fieldEdit.value.nickname,
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

    const {profile} = result;
    Object.assign(myProfile, profile);
    myProfile.isLoaded = true;

    const {nickname} = profile;
    fieldEdit.value.nickname = nickname;
  } catch (e) {
    console.warn(e.message);
  }
});
</script>
