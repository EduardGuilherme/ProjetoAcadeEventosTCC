<template>
  <div id="favorite-page" class="has-bottom-menu animation-transition">
    <ToolBarComponent label="Eventos que você salvou" link="/home" />
    <div class="container has-toolbar">
      <div class="info">
        <span class="font-weight -bold">Você receberá uma notificação no dia do evento.*</span>
      </div>
      <EventFavoriteListComponent />
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import MenuBottomComponent from "../components/MenuBottomComponent.vue";
import ToolBarComponent from "../components/ToolBarComponent.vue";
import EventFavoriteListComponent from "../components/EventFavoriteListComponent.vue";
export default {
  name: "Favorite",
  components: {
    MenuBottomComponent,
    ToolBarComponent,
    EventFavoriteListComponent
  }
};
</script>

<style lang="scss" scoped>
#favorite-page {
  .info {
    margin-bottom: 20px;
    span {
      color: #c7181d;
    }
  }
}
</style>