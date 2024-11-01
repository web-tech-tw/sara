<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col max-w-2xl mx-auto">
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md">
          <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
            修改個人資料：
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            <div class="px-3 mb-3">
              <img
                :src="identicon"
                :alt="fields.nickname"
                class="rounded-full w-32 h-32 mx-auto"
                title="來自 Gravatar 的大頭貼"
              >
            </div>
            <div class="rounded bg-white md:flex">
              <label
                class="w-full py-1 text-gray-600 md:w-16"
                for="nickname"
              >
                暱稱：
              </label>
              <input
                id="nickname"
                v-model="fields.nickname"
                class="w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring"
                placeholder="星川 サラ"
                type="text"
                :disabled="isDisabled"
              >
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            若要修改電子郵件地址，請點
            <span
              class="cursor-pointer text-sky-600 hover:text-sky-500"
              @click="onClickUpdateEmail"
            >
              此處
            </span>
            。
            <div class="text-sm text-gray-600 mt-1">
              本系統儲存你的電子郵件地址僅供識別使用，不會用於任何廣告或行銷用途。該資訊為存取本帳號的唯一識別方法，請務必使用最常用的電子郵件地址，以免遺失帳號存取權限。
            </div>
          </div>
          <div class="p-6 bg-white border-b border-gray-200">
            若要修改大頭貼，須前往
            <span
              class="cursor-pointer text-sky-600 hover:text-sky-500"
              @click="onClickUpdateAvatar"
            >
              Gravatar.com
            </span>
            。
            <div class="text-sm text-gray-600 mt-1">
              我們使用 Gravatar 服務來提供大頭貼，您可以在 Gravatar 網站上使用您的電子郵件地址註冊帳號，並上傳您的大頭貼。
            </div>
            <div class="text-sm text-gray-600 mt-1">
              本系統不會儲存您的大頭貼，而是透過去識別化技術提供對應大頭貼的圖片網址。
            </div>
          </div>
          <div class="p-6 bg-white border-gray-200 text-right">
            <button
              class="bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3"
              :disabled="isDisabled"
              @click="onSubmit"
            >
              確定修改
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
import { ref, reactive, computed } from "vue";

import {
  useClient,
} from "../clients/sara";

const props = defineProps({
  nickname: {
    type: String,
    required: true,
  },
  avatarHash: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["state", "status"]);

const isLoad = ref(false);
const isDone = ref(false);

const fields = reactive({
  nickname: props.nickname,
});

const isDisabled = computed(() => {
  return isLoad.value || isDone.value;
});

const identicon = computed(() => {
    const {avatarHash} = props;
    return `https://api.gravatar.com/avatar/${avatarHash}?d=identicon&s=200`;
});

const onClickUpdateEmail = () => {
  emits("state", {
    name: "ManageUpdateEmailRequest",
  });
};

const onClickUpdateAvatar = () => {
  window.open("https://gravatar.com");
};

const onClickCancel = () => {
  location.reload();
};

const requestSubmit = async () => {
  const client = useClient();
  await client.put("users/me", {
    json: fields,
  });

  isDone.value = true;
  emits("status", {
    message: "修改成功",
  });
  setTimeout(() => {
    location.reload();
  }, 1300);
};

const onSubmit = async () => {
  isLoad.value = true;
  await requestSubmit();
  isLoad.value = false;
};
</script>
