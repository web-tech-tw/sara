<template>
  <div class="mt-10 mx-auto py-10 max-w-7xl px-12">
    <div class="sm:text-center lg:text-left">
      <h2 class="text-2xl tracking-tight font-bold text-red-500">
        <span class="block xl:inline">⛔ 警示：本頁面僅作為開發用途</span>
        <span class="block xl:inline xl:ml-3">For debugging only</span>
      </h2>
      <h1 class="mt-3 text-4xl tracking-tight font-bold text-gray-900">
        <span class="block xl:inline">
          {{ tokenType }}
        </span>
      </h1>
      <p class="mt-3 text-base text-slate-900 sm:mx-auto lg:mx-0">
        請勿洩漏給任何人（包括家人），避免他們拿來做壞壞的事情（比如刷爆你的信用卡）。
      </p>
      <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        請保密您的金鑰，這是您的身份識別機密金鑰。
      </p>
      <div class="py-4 text-base text-slate-900 sm:mt-5 sm:mx-auto md:mt-5 lg:mx-0">
        Authorization:
        <textarea
          class="w-full h-32 border-none bg-transparent px-4 py-1 text-gray-900 outline-none rounded my-3 md:my-0 focus:ring"
          :value="tokenContent"
          disabled
        />
      </div>
      <div class="mt-3 text-base text-slate-900 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
        <input
          id="is-with-guard"
          v-model="isWithGuard"
          class="mr-3"
          type="checkbox"
        >
        <label for="is-with-guard">
          啟用 Xara Token
        </label>
      </div>
      <p
        v-show="isWithGuard"
        class="mt-3 text-base text-amber-600 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
      >
        <span class="block xl:inline">⚠️ 警告：</span>
        <span class="block xl:inline">Xara Token 是一種高度危險的金鑰，請勿隨意測試。</span>
      </p>
      <p
        v-show="isWithGuard"
        class="mt-3 text-base text-slate-900 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
      >
        <span class="block xl:inline">（Xara Token 可以變更讀取所有帳號機密，甚至還能刪掉整個帳號）</span>
        <span class="block xl:inline">（Xara Token 僅用於 Sara 系統自身）</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const {
  VITE_SARA_TOKEN_NAME: saraTokenName,
  VITE_SARA_GUARD_NAME: saraGuardName,
} = import.meta.env;

const saraToken = localStorage.getItem(saraTokenName);
const guardToken = localStorage.getItem(saraGuardName);

const isWithGuard = ref(false);

const tokenType = computed(() => {
  return isWithGuard.value ? "Xara Token" : "Sara Token";
});

const tokenContent = computed(() => {
  const tokenPrefix = isWithGuard.value ? "XARA" : "SARA";

  const xara = `${tokenPrefix} ${saraToken}|${guardToken}`;
  const sara = `${tokenPrefix} ${saraToken}`;

  return isWithGuard.value ? xara : sara;
});
</script>
