<template>
  <div id="create-event-page" class="has-bottom-menu animation-transition">
    <ToolBarComponent :label="`Vamos adicionar o seu evento`" link="/home" />
    <div class="container has-toolbar">
      <div class="form-content">
        <div class="input-control">
          <img class="preview" :src="event.image" alt />
        </div>
        <div class="input-control">
          <input
            type="file"
            class="font-size -size-16 font-weight -bold"
            name="photo"
            accept="image/*"
            @change="uploadImage"
            id="file-input"
            value="Browse..."
          />
          <label for="photo" class="input-file-btn">Select file</label>
          <br />
          <br />
          <br />
        </div>
        <div class="input-control">
          <input
            type="text"
            class="font-size -size-16 font-weight -bold"
            placeholder="Titulo do evento"
            v-model="event.name"
          />
        </div>
        <div class="input-control">
          <input
            type="text"
            class="font-size -size-16 font-weight -bold"
            placeholder="Data inicial do evento"
            v-model="event.start_date"
            @change="convertDataStartDate(event.start_date)"
          />
        </div>
        <div class="input-control">
          <input
            type="text"
            class="font-size -size-16 font-weight -bold"
            placeholder="Data final do evento"
            v-model="event.final_date"
            @change="convertDataFinalDate(event.final_date)"
          />
        </div>
        <div class="input-control">
          <input
            type="text"
            class="font-size -size-16 font-weight -bold"
            placeholder="Horário inicial do evento"
            v-model="event.start_time"
          />
        </div>

        <div class="input-control">
          <textarea
            class="font-size -size-16 font-weight -bold"
            placeholder="Descrição do evento"
            v-model="event.description"
          ></textarea>
        </div>
        <div class="input-control">
          <a href="#" class="btn -green" @click.prevent="saveEvent">Cadastrar</a>
        </div>
      </div>
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import ToolBarComponent from "../components/ToolBarComponent.vue";
import MenuBottomComponent from "../components/MenuBottomComponent.vue";

import Axios from "axios";
export default {
  name: "CreateEvent",
  components: {
    ToolBarComponent,
    MenuBottomComponent
  },
  data() {
    return {
      event: {
        name: null,
        image: null,
        start_date: null,
        final_date: null,
        start_time: null,
        status_event: 0,
        description: null,
        id_institution: 1,
        id_student: null
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let user_id = localStorage.getItem("user_id");
      this.getIdStudent(user_id);
    },
    getIdStudent(user_id) {
      Axios.get(`http://localhost:6002/students/account/${user_id}`)
        .then(res => {
          console.log(res);
          this.event.id_student = res.data.data[0].id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadImage(event) {
      const URL = "https://api.imgbb.com/1/upload";

      let data = new FormData();
      data.append("key", "abfb4071c1cd05b47c4d1781d3073ff2");
      data.append("image", event.target.files[0]);
      data.append("name", "my-picture");

      let config = {
        header: {
          "Content-Type": "image/png"
        }
      };

      Axios.post(URL, data, config).then(res => {
        console.log("image upload res > ", res);
        this.event.image = res.data.data.url;
      });
    },
    saveEvent() {
      Axios.post("http://localhost:6002/events", this.event)
        .then(res => {
          if (res.data.message === "Erro ao inserir o evento.") {
            this.$toast(res.data.message, {
              className: ["toast-error"],
              horizontalPosition: "center",
              verticalPosition: "top"
            });
          } else {
            this.$router.push("/confirmation");
          }

          console.log(res);
        })
        .catch(err => {
          if (err) {
            this.$toast(res.data.message, {
              className: ["toast-error"],
              horizontalPosition: "center",
              verticalPosition: "top"
            });
          }
          console.log(err);
        });
    },
    convertDataStartDate(date) {
      var b = date.split(/\D/);
      this.event.start_date = b.reverse().join("-");
    },
    convertDataFinalDate(date) {
      var b = date.split(/\D/);
      this.event.final_date = b.reverse().join("-");
    }
  }
};
</script>

<style lang="scss">
.form-content {
  .input-control {
    position: relative;
    margin: 20px 0;

    input {
      width: 100%;
      height: 47px;
      border: 2px solid #000;
      border-radius: 12px;
      padding-left: 15px;
      color: #000;
      &:focus {
        &::placeholder {
          padding-left: 5px;
          transition: 0.2s ease-in;
        }
      }
      &::placeholder {
        color: rgba(0, 0, 0, 0.9);
        font-size: 16px;
        transition: 0.2s ease-in;
      }
    }
    input[type="file"] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 47px;
      z-index: 99;
      color: rgba(0, 0, 0, 0.9);
      font-size: 16px;
      transition: 0.2s ease-in;
    }
    .input-file-btn {
      position: absolute;
      left: 0;
      border: 2px solid #000;
      right: 0;
      height: 47px;
      border-radius: 11px;
      display: flex;
      align-items: center;
      padding-left: 15px;
      color: rgba(0, 0, 0, 0.9);
      font-size: 16px;
      transition: 0.2s ease-in;
      font-weight: bold;
    }
    .preview {
      width: 40px;
    }
    textarea {
      width: 100%;
      height: 150px;
      border: 2px solid #000;
      border-radius: 12px;
      padding-top: 15px;
      padding-left: 15px;
      &:focus {
        &::placeholder {
          padding-left: 5px;
          transition: 0.2s ease-in;
        }
      }
      &::placeholder {
        color: rgba(0, 0, 0, 0.9);
        font-size: 16px;
        transition: 0.2s ease-in;
      }
    }
  }
}
.toast-error {
  background: red !important;
  width: 100% !important;
  margin-top: 10px !important;
}
</style>