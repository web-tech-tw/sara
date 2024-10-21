<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-auto">
      <div class="px-6 py-4 bg-white border-b border-gray-200 font-bold">
        Passkey 通行金鑰 — {{ props.label }}
      </div>
      <div class="p-6 bg-white border-b border-gray-200">
        <span class="text-gray-600">金鑰識別碼: </span>{{ props.id }}<br>
        <span class="text-gray-600">使用次數*: </span>{{ props.counter }}<br>
        <span class="text-gray-600">傳輸機制: </span>{{ props.transports.join(", ") }}<br>
        <span class="text-gray-600">建立時間: </span>{{ props.createdAt }}<br>
        <span class="text-gray-600">更新時間: </span>{{ props.updatedAt }}<br>
      </div>
      <div class="p-6 bg-white border-b border-gray-200 text-sm text-gray-600">
        * 對於 Apple Inc. 所生產的裝置，
        基於該製造商對於 Passkey 通行金鑰的設計，
        使用次數僅供參考（可能永久為 0），
        實際使用次數可能因為 Apple Inc. 的實作方式而有所不同。
      </div>
      <div class="p-6 bg-white border-gray-200 text-right">
        <button
          class="bg-sky-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-sky-600 rounded mr-3"
          @click="onClickEdit"
        >
          修改
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

const emits = defineEmits(["state", "status"]);

const onClickEdit = () => {
  emits("status", {
    message: "尚未實作",
  });
};

const onClickCancel = () => {
  emits("state", {
    name: "ManageProfileShow",
  });
};
</script>