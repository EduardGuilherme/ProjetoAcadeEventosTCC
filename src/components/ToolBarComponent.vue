<template>
  <div id="toolbar-component" class="d-flex -justify-start -align-center">
    <div class="container d-flex -align-start">
      <router-link :to="`${link}`">
        <img src="/img/icons/back.svg" alt />
      </router-link>
      <span class="font-size -size-20 font-weight -bold">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "link"]
};
</script>

<style lang="scss" scoped>
#toolbar-component {
  position: absoloute;
  width: 100%;
  height: 70px;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  background-color: #000;

  a {
    img {
      width: 20px;
    }
  }

  span {
    margin-left: 20px;
    color: #fff;
  }
}
</style>