<template>
  <div>
    <nuxt></nuxt>
  </div>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";

export default {
  computed: {
    user: {
      set(user) {
        this.$store.commit("user/set", user);
      },
      get() {
        return this.$store.state.user.current;
      }
    }
  },

  data() {
    return {};
  },

  async beforeMount() {
    this.user = await bridge.sendPromise("VKWebAppGetUserInfo");
    console.log(this.user);
  }
};
</script>
