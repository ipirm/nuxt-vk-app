<template>
  <v-col class="icon_button">
    <v-img class="icon_button__image" :style="'margin: auto;'" :src="src" height="65" contain></v-img>
    <v-layout align-center justify-center>
      <div class="icon_button__text">{{title}}</div>
    </v-layout>
  </v-col>
</template>

<script>
export default {
  props: {
    title: String,
    src: String
  }
};
</script>

<style>
/* Styles */

.icon_button__text {
  width: 96px;
  font-size: 14px;
  color: #a9a9a9;
  text-align: center;
}

/* Media queries */

@media screen and (max-width: 420px) {
  .icon_button {
    width: 100px;
  }
}
@media screen and (max-width: 405px) {
  .icon_button__text {
    font-size: 13px;
  }
}

@media screen and (max-width: 385px) {
  .icon_button__text {
    font-size: 12px;
  }
}
@media screen and (max-width: 365px) {
  .icon_button {
    width: 80px;
  }
  .icon_button__text {
    font-size: 11px;
  }
}

@media screen and (max-width: 345px) {
  .icon_button__text {
    font-size: 10px;
  }
}

@media screen and (max-width: 325px) {
  .icon_button {
    width: 60px;
  }
  .icon_button__text {
    font-size: 9px;
  }
}

@media screen and (max-width: 310px) {
  .icon_button__text {
    font-size: 8px;
  }
}
</style>