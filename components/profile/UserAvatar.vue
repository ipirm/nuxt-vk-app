<template>
  <div class="user_avatar">
    <div class="user_avatar__image_wrap">
      <v-img
        class="user_avatar__image"
        width="142"
        style="margin:auto"
        height="142"
        cover
        :src="src"
        :lazy-src="lazy"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    lazy: String
  }
};
</script>

<style>
.user_avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  width: 170px;
  background: linear-gradient(#09329e 0%, #7a14b0 100%);
  border-radius: 200px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
}
.user_avatar__image_wrap {
  width: 142px;
  height: 142px;
}
.user_avatar__image {
  border-radius: 900px;
}
</style>