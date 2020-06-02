<template>
  <v-layout class="user_info" column align-center justify-start>
    <div class="user_info__role">{{role}}</div>
    <div class="user_info__name">{{name}}</div>
    <div class="user_info__city">{{city}}</div>
  </v-layout>
</template>

<script>
export default {
  props: {
    role: String,
    name: String,
    city: String
  }
};
</script>

<style>
.user_info {
  margin-top: 13px;
}

.user_info__role {
  font-size: 15px;
  color: #9a9a9a;
}

.user_info__name {
  font-size: 24px;
}

.user_info__city {
  font-size: 16px;
}
</style>