<template>
  <div id="event-list-component">
    <ul class="event-list">
      <li class="event" v-for="favorite in favorites.data" :key="favorite.id">
        <CardEventComponent
          :id="favorite.id"
          :image="favorite.image"
          :title="favorite.name"
          :institute="favorite.institution_name"
          :city="getCityByCep(favorite.cep)"
          :state="getStateByCep(favorite.cep)"
          :day="getDayByDate(favorite.start_date)"
          :month="getMonthByDate(favorite.start_date)"
          :status_event="favorite.status_event"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardEventComponent from "./CardEventComponent";

import Axios from "axios";
export default {
  name: "EventFavoriteListComponent",
  components: {
    CardEventComponent
  },
  data() {
    return {
      city: null,
      state: null,
      day: null,
      month: null
    };
  },
  mounted() {
    this.$store.dispatch("loadFavoriteEvents");
  },
  computed: mapState(["favorites"]),
  methods: {
    getCityByCep(cep) {
      Axios.get(`http://viacep.com.br/ws/${cep}/json/`).then(res => {
        this.city = res.data.localidade;
      });
      return this.city;
    },
    getStateByCep(cep) {
      Axios.get(`http://viacep.com.br/ws/${cep}/json/`).then(res => {
        this.state = res.data.uf;
      });
      return this.state;
    },
    getDayByDate(start_date) {
      let date = new Date(start_date);
      let day = date.getUTCDate();
      return day;
    },
    getMonthByDate(start_date) {
      let date = new Date(start_date);
      let month = date.getUTCMonth();
      const month_ref = [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ"
      ];
      return month_ref[month];
    }
  }
};
</script>

<style>
</style>;