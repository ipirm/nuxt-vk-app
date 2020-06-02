<template>
  <div class="header">
    <v-layout row justify-space-between>
      <IconButton title="Страница вконтакте" src="/vk.png"></IconButton>
      <IconButton title="Написать" src="/write.png"></IconButton>
      <IconButton title="Добавить в мои контакты" src="/add_to_contacts.png"></IconButton>
    </v-layout>
  </div>
</template>

<script>
import IconButton from "../other/IconButton";
export default {
  components: {
    IconButton
  }
};
</script>

<style>
.header {
  padding: 0 40px;
  width: 100%;
}
</style>