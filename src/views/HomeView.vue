<template>
  <component
    :is="currentTab" 
    v-bind="stateProps"
    @state="onState"
    @status="onStatus"
  />
  <toast-modal v-model="statusMessage" />
</template>

<script setup>
import { ref, computed } from "vue";

import CreateTokenRequest from "../components/CreateTokenRequest.vue";
import CreateTokenEmpty from "../components/CreateTokenEmpty.vue";
import CreateTokenVerify from "../components/CreateTokenVerify.vue";

import CreateUserRequest from "../components/CreateUserRequest.vue";
import CreateUserVerify from "../components/CreateUserVerify.vue";

import ToastModal from "../components/ToastModal.vue";

const stateName = ref("CreateTokenRequest");
const stateProps = ref(null);

const statusMessage = ref("");

const tabs = {
  CreateTokenRequest,
  CreateTokenEmpty,
  CreateTokenVerify,
  CreateUserRequest,
  CreateUserVerify,
};

const currentTab = computed(
  () => tabs[stateName.value],
);

const onState = ({name, props}) => {
  stateName.value = name;
  stateProps.value = props ?? {};
  requestAnimationFrame(() => {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  });
};

const onStatus = ({message}) => {
  statusMessage.value = message;
};
</script>
