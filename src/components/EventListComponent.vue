<template>
  <div id="event-list-component">
    <ul class="event-list">
      <li class="event" v-for="event in events.data" :key="event.id">
        <CardEventComponent
          :id="event.id"
          :image="event.image"
          :title="event.name"
          :institute="event.institution_name"
          :city="getCityByCep(event.cep)"
          :state="getStateByCep(event.cep)"
          :day="getDayByDate(event.start_date)"
          :month="getMonthByDate(event.start_date)"
          :status_event="event.status_event"
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
  name: "EventListComponent",
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
    this.$store.dispatch("loadEvents");
  },
  computed: mapState(["events"]),
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