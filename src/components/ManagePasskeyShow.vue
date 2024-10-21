<template>
  <div class="flex justify-center my-8 py-16">
    <div class="flex flex-col mx-auto">
      <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
        <div class="overflow-hidden shadow-md">
          <div class="p-6 bg-white border-b border-gray-200">
            <div>ID: {{ props.id }}</div>
            <div>Label: {{ props.label }}</div>
            <div>Public Key: {{ props.publicKey }}</div>
            <div>Counter: {{ props.counter }}</div>
            <div>Transports: {{ props.transports }}</div>
            <div>Created At: {{ props.createdAt }}</div>
            <div>Updated At: {{ props.updatedAt }}</div>
          </div>
        </div>
        <div class="p-6 bg-white border-gray-200 text-right">
          <button
            class="bg-white-500 shadow-md text-sm text-black font-bold py-3 md:px-8 px-4 hover:bg-slate-100 rounded"
            @click="onClickCancel"
          >
            取消
          </button>
        </div>
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

const onClickCancel = () => {
    location.reload();
};
</script>