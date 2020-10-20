<template>
  <div id="menu-bottom-component" class="d-flex -align-center -justify-center">
    <div class="container">
      <ul class="row d-flex -justify-space-between">
        <li class="d-flex -justify-center -align-center">
          <router-link to="/home" class="d-flex -justify-center -align-center -f-direction-column">
            <img src="/img/icons/home.svg" alt />
            <span class="font-size -size-12">Home</span>
          </router-link>
        </li>
        <li class="d-flex -justify-center -align-center">
          <router-link
            to="/search"
            class="d-flex -justify-center -align-center -f-direction-column"
          >
            <img src="/img/icons/search.svg" alt />
            <span class="font-size -size-12">Buscar</span>
          </router-link>
        </li>
        <li class="d-flex -justify-center -align-center">
          <router-link
            to="/create-event"
            class="d-flex -justify-center -align-center -f-direction-column"
          >
            <img src="/img/icons/plus.svg" alt />
            <span class="font-size -size-12">Adicionar</span>
          </router-link>
        </li>
        <li class="d-flex -justify-center -align-center">
          <router-link
            to="/favorite"
            class="d-flex -justify-center -align-center -f-direction-column"
          >
            <img src="/img/icons/star.svg" alt />
            <span class="font-size -size-12">Favoritos</span>
          </router-link>
        </li>
        <li class="d-flex -justify-center -align-center">
          <router-link to="/menu" class="d-flex -justify-center -align-center -f-direction-column">
            <img src="/img/icons/menu.svg" alt />
            <span class="font-size -size-12">Menu</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuBottomComponent"
};
</script>

<style lang="scss" scoped>
#menu-bottom-component {
  position: fixed;
  width: 100%;
  height: 56px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  z-index: 10;
  ul {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    li {
      height: 100%;
      a {
        text-decoration: none;
        img {
          width: 28px;
          max-height: 20px;
        }
        span {
          color: #fff;
          padding-top: 5px;
        }
      }
    }
  }
}
</style>