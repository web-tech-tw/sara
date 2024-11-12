<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col max-w-2xl mx-auto">
      <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
        Passkey 通行金鑰 — {{ props.label }}
      </div>
      <div class="p-6 bg-white border-b border-gray-200">
        <span class="text-gray-600">金鑰識別碼: </span>{{ props.id }}<br>
        <span class="text-gray-600">使用次數*: </span>{{ props.counter }}<br>
        <span class="text-gray-600">傳輸機制: </span>{{ transports }}<br>
        <span class="text-gray-600">建立時間: </span>{{ props.createdAt }}<br>
        <span class="text-gray-600">更新時間: </span>{{ props.updatedAt }}<br>
      </div>
      <div class="p-6 bg-white border-b border-gray-200 text-sm text-gray-600 inline-block">
        <span>*「Passkeys 通行金鑰」並非「Security Keys 安全金鑰」，</span>
        <span>雖 WebAuthn 2 規範曾因安全考量（重放攻擊問題）提及「Signature Counter 簽名計數器」機制。</span>
        <span>但由於跨裝置傳輸驗證特性，因現今各家安全裝置廠商的同步技術問題因素，</span>
        <span>當前絕大部分裝置<b>並無實作</b>「使用次數」跨裝置計數同步機制。</span>
        <span>基於各項技術原因限制，本數值將永久保持為「0」。</span>
      </div>
      <div class="p-6 bg-white border-gray-200 text-right">
        <button
          class="bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3"
          @click="onClickEdit"
        >
          修改
        </button>
        <button
          class="bg-red-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-red-600 rounded mr-3"
          @click="onClickDelete"
        >
          移除
        </button>
        <button
          class="bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
          @click="onClickCancel"
        >
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
  },
  counter: {
    type: Number,
    required: true,
  },
  transports: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["state"]);

const transports = computed(() => {
  if (!props.transports?.length) {
    return "不支援";
  }
  return props.transports.join("、");
});

const onClickEdit = () => {
  emits("state", {
    name: "ManagePasskeyEdit",
    props: {
      id: props.id,
      label: props.label,
    },
  });
};

const onClickDelete = () => {
  emits("state", {
    name: "ManagePasskeyDelete",
    props: {
      id: props.id,
      label: props.label,
    },
  });
};

const onClickCancel = () => {
  emits("state", {
    name: "ManageProfileShow",
  });
};
</script>
