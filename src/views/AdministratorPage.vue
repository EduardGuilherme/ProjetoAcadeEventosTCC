<template>
  <div id="administrator-page">
    <div class="header">
      <div class="title">
        <h1>Página de administrador</h1>
      </div>
      <div class="subtitle">
        <h2>Aprovação de Eventos cadastrados</h2>
      </div>
    </div>
    <div class="container">
      <EventInativeListComponent />
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import EventInativeListComponent from "../components/EventInativeListComponent.vue";
import MenuBottomComponent from "../components/MenuBottomComponent.vue";
export default {
  name: "AdministratorPage",
  components: { EventInativeListComponent, MenuBottomComponent },
  beforeCreate: function() {
    document.body.className = "administrator";
  }
};
</script>

<style lang="scss">
#administrator-page {
  .header {
    background-color: #000;
    padding: 20px 0;
  }
  .title {
    font-size: 25px;
    text-align: center;
    color: #fff;
  }
  .subtitle {
    font-size: 20px;
    text-align: center;
    color: #fff;
    margin-top: 10px;
  }

  #event-list-component {
    margin-top: 40px;
  }
}
body.administrator {
  background-color: #fff;
}
</style>