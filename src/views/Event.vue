<template>
  <div id="single-event-page" class="has-bottom-menu">
    <ToolBarComponent v-if="dataReady" :label="truncateText(`${event.name}`)" link="/home" />
    <button class="btn-favorite" @click.prevent="addFavorite()">
      <img src="/img/icons/star.svg" alt />
    </button>
    <div
      v-if="dataReady"
      class="feature-image"
      v-bind:style="{ 'background-image': 'url(' + event.image + ')' }"
    ></div>
    <div class="container">
      <div class="title-event">
        <h1 v-if="dataReady" class="font-size -size-20 font-weight -bold">{{ event.name }}</h1>
      </div>
      <div class="info-event d-flex -align-center">
        <img src="/img/icons/locate.svg" alt />
        <span
          class="font-size -size-18"
          v-if="dataReady"
        >{{ address.logradouro }}, {{event.number}} - {{ address.localidade }} - {{ address.uf }}</span>
      </div>
      <div class="info-event d-flex -align-center">
        <img src="/img/icons/time.svg" alt />
        <span
          class="font-size -size-18"
          v-if="dataReady"
        >{{formatDate(event.start_date)}} - {{ formatTime(event.start_time) }}</span>
      </div>
      <div class="info-container">
        <div class="title-info-container">
          <h3 class="font-size -size-20 font-weight -bold">Descrição do evento</h3>
        </div>
        <div class="description-info-container">
          <p>{{ event.description}}</p>
        </div>
      </div>
      <div class="info-container">
        <div class="title-info-container">
          <h3 class="font-size -size-20 font-weight -bold">Local</h3>
        </div>
        <div class="description-info-container">
          <p>{{ event.institution_name }}</p>
          <p
            v-if="dataReady"
          >{{ address.logradouro }}, {{ event.number }} - {{ address.bairro }} - {{ address.localidade }} - {{address.uf}}</p>
        </div>
      </div>
      <div id="map-container-google-1" class="z-depth-1-half map-container">
        <iframe
          v-if="dataReady"
          :src="`https://maps.google.com/maps?q=${address.logradouro},${event.number},${address.bairro}&t=&z=15&ie=UTF8&iwloc=&output=embed`"
          frameborder="0"
          style="border:0"
          width="100%"
          height="100%"
          allowfullscreen
          controls="false"
        ></iframe>
      </div>
      <div class="info-container">
        <div class="title-info-container">
          <h3 class="font-size -size-20 font-weight -bold">Sobre o Produtor</h3>
        </div>
        <div class="description-info-container">
          <h3 class="title-productor font-size -size-20 font-weight -bold">{{ event.student_name }}</h3>
          <p>{{ event.student_description}}</p>
        </div>
      </div>
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import ToolBarComponent from "../components/ToolBarComponent";
import MenuBottomComponent from "../components/MenuBottomComponent";
import Axios from "axios";
export default {
  name: "Event",
  components: {
    ToolBarComponent,
    MenuBottomComponent
  },
  data() {
    return {
      event: null,
      address: null,
      user: null,
      institution: null,
      dataReady: false,
      loadTime: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    truncateText(text, limit = 24) {
      let text_limited = text.slice(0, limit);
      return text.length > limit ? `${text_limited}...` : text;
    },
    init() {
      this.getEventData();
      this.getAddressByCep();
    },
    getEventData() {
      let id = this.$route.params.id;
      this.event = Axios.get(`http://localhost:6002/events/${id}`)
        .then(res => {
          this.event = res.data.data[0];
          console.log(this.event);
          localStorage.setItem("cep", this.event.cep);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAddressByCep() {
      let cep = localStorage.getItem("cep");
      Axios.get(`http://viacep.com.br/ws/${cep}/json/`).then(res => {
        this.address = res.data;
        //if (this.address) this.dataReady = true;
        if (this.event && this.address) this.dataReady = true;
      });
    },
    formatDate(date) {
      let d = new Date(date);
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    },
    formatTime(time) {
      if (time) {
        return time.slice(0, 5);
        this.loadTime = true;
      }
    },
    addFavorite() {
      let user_id = localStorage.getItem("user_id");
      let event_id = this.event.id;
      Axios.post("http://localhost:6002/favorites/create", {
        id_user: user_id,
        id_event: event_id
      })
        .then(res => {
          this.$toast("Evento adicionado aos favoritos com sucesso!", {
            className: ["toast-sucess"],
            horizontalPosition: "center",
            verticalPosition: "top"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
#single-event-page {
  .btn-favorite {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 15px;
    margin-top: 15px;
    outline: none;
    img {
      width: 20px;
    }
  }
  .feature-image {
    width: 100%;
    height: 300px;
    background-position: center;
    background-size: cover;
  }

  .container {
    .title-event {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 2px solid #309541;
    }
    .info-event {
      margin: 10px 0;
      img {
        width: 25px;
      }
      span {
        margin-left: 10px;
      }
    }
    .info-container {
      background-color: #f7f7f7;
      padding: 10px;
      margin-top: 20px;
      .title-info-container {
        margin: 10px 0;
      }
      .description-info-container {
        p,
        span {
          line-height: 120%;
          margin-top: 5px;
        }
      }
    }
    #map-container-google-1 {
      width: 100vw;
      height: 300px;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      margin-top: 20px;
    }
  }
}
.toast-sucess {
  background-color: green !important;
  width: 100% !important;
  margin-top: 20px !important;
}
</style>