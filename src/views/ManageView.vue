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

import ToastModal from "../components/ToastModal.vue";

import ManageProfileShow from "../components/ManageProfileShow.vue";
import ManageProfileEdit from "../components/ManageProfileEdit.vue";
import ManageProfileDelete from "../components/ManageProfileDelete.vue";

import ManagePasskeyShow from "../components/ManagePasskeyShow.vue";

import ManageUpdateEmailRequest from "../components/ManageUpdateEmailRequest.vue";
import ManageUpdateEmailVerify from "../components/ManageUpdateEmailVerify.vue";

const stateName = ref("ManageProfileShow");
const stateProps = ref(null);

const statusMessage = ref("");

const tabs = {
  ManageProfileShow,
  ManageProfileEdit,
  ManageProfileDelete,
  ManagePasskeyShow,
  ManageUpdateEmailRequest,
  ManageUpdateEmailVerify,
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
