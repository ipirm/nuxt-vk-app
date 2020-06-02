<template>
  <div class="profile_tabs">
    <v-layout class="profile_tabs__layout">
      <div @click="$emit('setActiveTab', true)" style="width:50%;height: 90px;"></div>
      <div @click="$emit('setActiveTab', false)" style="width:50%;height: 90px;"></div>
    </v-layout>
    <div class="profile_tabs__resource" v-if="isRes">
      <v-img contain src="/profile_problems_tab_unactive.png" style="height: 90px;" />
      <v-img contain src="/profile_resource_tab.png" style="height: 90px;" />
    </div>
    <div class="problems_tabs__resource" v-else>
      <v-img contain src="/profile_problems_tab_unactive.png" style="height: 90px;" />
      <v-img contain src="/profile_problems_tab.png" style="height: 90px;" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isRes: Boolean
  }
};
</script>

<style>
.profile_tabs {
  width: 100%;
  position: relative;
}
.profile_tabs .v-image {
  position: absolute;
}
.profile_tabs__layout {
  position: absolute;
  width: 100vw;
  z-index: 1;
}
.profile_tabs__resource,
.problems_tabs__resource {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
}
</style>