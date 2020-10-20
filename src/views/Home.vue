<template>
  <div id="home-page" class="has-bottom-menu animation-transition">
    <FilterComponent />

    <div class="container">
      <EventListComponent />
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import FilterComponent from "../components/FilterComponent";
import CardEventComponent from "../components/CardEventComponent";
import EventListComponent from "../components/EventListComponent";
import MenuBottomComponent from "../components/MenuBottomComponent";

import Axios from "axios";

export default {
  name: "Home",
  components: {
    FilterComponent,
    CardEventComponent,
    EventListComponent,
    MenuBottomComponent
  },
  data() {
    return {
      events: []
    };
  },
  beforeCreate: function() {
    document.body.className = "home";
  },
  created() {}
};
</script>

<style lang="scss">
</style>