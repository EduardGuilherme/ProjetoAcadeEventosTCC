<template>
  <div id="search-page" class="has-bottom-menu animation-transition">
    <ToolBarComponent />
    <FilterComponent />
    <div class="container has-toolbar">
      <input
        class="font-size -size-18 font-weight -bold"
        name="search-input"
        type="text"
        placeholder="Qual evento deseja buscar?"
      />

      <EventListComponent />
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import EventListComponent from "../components/EventListComponent";
import MenuBottomComponent from "../components/MenuBottomComponent";
import FilterComponent from "../components/FilterComponent";
import ToolBarComponent from "../components/ToolBarComponent.vue";
export default {
  name: "Search",
  components: {
    EventListComponent,
    MenuBottomComponent,
    FilterComponent,
    ToolBarComponent
  }
};
</script>

<style lang="scss" scoped>
input[name="search-input"] {
  width: 100%;
  height: 50px;
  padding-left: 15px;
  color: #000;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 12px;
  &::placeholder {
    color: #000;
  }
}
</style>