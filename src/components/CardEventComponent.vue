<template>
  <div class="card-event-component-content">
    <router-link :to="`/event/${id}`" class="card-event-component">
      <div class="image" v-bind:style="{ 'background-image': 'url(' + image + ')' }"></div>
      <div class="description d-flex -justify-space-between -align-center">
        <div class="info">
          <div class="college">
            <span class="font-size -size-12 font-weight -bold">{{ institute }}</span>
          </div>
          <div class="name">
            <h2 class="font-size -size-16 font-weight -bold">{{ title }}</h2>
          </div>
          <div class="city">
            <span class="font-size -size-10">{{ city }} - {{ state }}</span>
          </div>
        </div>
        <div class="date d-flex -f-direction-column -align-center">
          <span class="day font-size -size-16 font-weight -bold">{{ day }}</span>
          <span class="month font-size -size-16 font-weight -bold">{{ month }}</span>
        </div>
      </div>
    </router-link>
    <div v-if="status_event === 0" class="controler">
      <button @click.prevent="acceptEvent(id)" class="btn-controler accept">Aceitar</button>
      <button @click.prevent="removeEvent(id)" class="btn-controler reprove">Não Aceitar</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "CardEventComponent",
  props: [
    "id",
    "image",
    "title",
    "institute",
    "city",
    "state",
    "day",
    "month",
    "image",
    "status_event"
  ],
  methods: {
    acceptEvent(id) {
      Axios.put(`http://localhost:6002/events/status/${id}`, {
        status_event: 1
      })
        .then(res => {
          this.$toast(
            "Evento Aprovado! Ao atualizar a pagina o evento aparecerá na listagem.",
            {
              className: ["toast-sucess"],
              horizontalPosition: "center",
              verticalPosition: "top"
            }
          );
          setTimeout(() => {
            this.$store.dispatch("loadInativesEvents");
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeEvent(id) {
      Axios.put(`http://localhost:6002/events/status/${id}`, {
        status_event: 2
      })
        .then(res => {
          this.$toast("Evento esta ausentado!", {
            className: ["toast-sucess"],
            horizontalPosition: "center",
            verticalPosition: "top"
          });
          setTimeout(() => {
            this.$store.dispatch("loadInativesEvents");
          }, 1000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.card-event-component-content {
  margin: 10px 0;
  .controler {
    .btn-controler {
      width: 50%;
      padding: 10px 0;
      cursor: pointer;
      &.accept {
        background-color: #309541;
        color: #fff;
      }
      &.reprove {
        background-color: #c7181d;
        color: #fff;
      }
    }
  }
}
.card-event-component {
  margin-top: 10px;
  text-decoration: none;
  .image {
    width: 100%;
    height: 130px;
    background-position: center;
    background-size: cover;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
  .description {
    padding: 10px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    background-color: #e8e8e8;
    .info {
      max-width: 173px;
      .college {
        span {
          color: #309541;
        }
      }
      .name {
        margin-top: 10px;
      }
      .name,
      .city {
        span,
        h2 {
          color: #333333;
        }
      }
    }
    .date {
      background-color: #c7181d;
      padding: 10px;
      border-radius: 8px;
      .day,
      .month {
        color: #fff;
      }
    }
  }
}
</style>