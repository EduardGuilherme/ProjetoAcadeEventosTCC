<template>
  <div id="event-list-component">
    <ul class="event-list">
      <li class="event" v-for="inativeEvent in inativeEvents.data" :key="inativeEvent.id">
        <CardEventComponent
          :id="inativeEvent.id"
          :image="inativeEvent.image"
          :title="inativeEvent.name"
          :institute="inativeEvent.institution_name"
          :city="getCityByCep(inativeEvent.cep)"
          :state="getStateByCep(inativeEvent.cep)"
          :day="getDayByDate(inativeEvent.start_date)"
          :month="getMonthByDate(inativeEvent.start_date)"
          :status_event="inativeEvent.status_event"
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
  name: "EventInativeListComponent",
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
    this.$store.dispatch("loadInativesEvents");
    console.log(this.$store.dispatch("loadInativesEvents"));
  },
  computed: mapState(["inativeEvents"]),
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

<style lang="scss">
.aprovacao {
  text-align: center;
  font-size: 20px;
  margin-top: 200px;
}
</style>;