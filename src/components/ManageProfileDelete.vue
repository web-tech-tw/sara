<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col max-w-2xl mx-auto">
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md">
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
              <span class="text-gray-600">暱稱：</span>{{ props.nickname }}<br>
              <span class="text-gray-600">電子郵件地址：</span>{{ props.email }}<br>
              <span class="text-red-600">（資料將會立即抹除，不會保存您的資訊）</span>
            </div>
            將解除存取權限的使用者識別碼如下：
            <div class="p-6">
              <span class="text-gray-600">Sara 系統使用者識別碼：</span>{{ props.id }}<br>
              <span class="text-gray-600">Sara 系統權限烙印：</span>{{ props.roles.length }} 組<br>
              <span class="text-red-600">（資料仍會保留在系統中，但將無法再次使用）</span>
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="rounded bg-white md:flex">
              <label
                class="w-full py-1 text-gray-600 md:w-16"
                for="confirm"
              >
                刪除：
              </label>
              <input
                id="confirm"
                v-model="inputContent"
                class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring"
                placeholder="若確定刪除，請輸入 DELETE"
                type="text"
                :disabled="isDisabled"
              >
            </div>
          </div>
          <div class="p-6 bg-white border-gray-200 text-right">
            <button
              class="bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3"
              :disabled="isDisabled"
              @click="onSubmit"
            >
              確定刪除
            </button>
            <button
              class="bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
              :disabled="isDisabled"
              @click="onClickCancel"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import {
  useClient,
} from "../clients/sara.js";

const {
  VITE_HOME_INTE_HOST: homeInteHost,
} = import.meta.env;

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["status"]);

const isLoad = ref(false);
const isDone = ref(false);

const inputContent = ref("");

const isDisabled = computed(() => {
  return isLoad.value || isDone.value;
});

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async () => {
  const client = useClient();
  await client.delete("users/me");

  isDone.value = true;
  emits("status", {
    message: "刪除成功",
  });
  setTimeout(() => {
    location.replace(homeInteHost);
  }, 1300);
};

const onSubmit = async () => {
  const {value} = inputContent;
  if (value !== "DELETE") {
    emits("status", {
      message: "請輸入 DELETE 以確認刪除",
    });
    return;
  }

  isLoad.value = true;
  await requestSubmit();
  isLoad.value = false;
};
</script>