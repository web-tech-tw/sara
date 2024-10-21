<template>
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
              {{ props.currentMail }}
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
</template>

<script setup>
const props = defineProps({
  currentMail: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["state"]);

const onClickRegister = () => {
  emits("state", {
    name: "CreateUserRequest",
    props: {
      currentMail: props.currentMail,
    },
  });
};

const onClickCancel = () => {
  location.reload();
};
</script>
