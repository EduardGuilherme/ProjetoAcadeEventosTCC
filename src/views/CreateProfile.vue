<template>
  <div id="create-profile-page" class="has-bottom-menu animation-transition">
    <ToolBarComponent :label="`Vamos realizar o seu cadastro`" />
    <div class="card-content container has-toolbar">
      <div class="label">
        <span>Agora, vamos continuar com o seu perfil.</span>
      </div>
      <div class="form-content">
        <div class="input-control">
          <img class="preview" :src="account.image" alt />
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
            placeholder="Nome"
            v-model="account.name"
          />
        </div>

        <div class="input-control">
          <select v-model="account.id_course" class="font-size -size-16 font-weight -bold">
            <option
              :value="`${parseInt(course.id)}`"
              v-for="course in courses"
              :key="course.id"
            >{{ course.name }}</option>
          </select>
        </div>
        <div class="input-control">
          <textarea
            class="font-size -size-16 font-weight -bold"
            placeholder="Descrição do estudante"
            v-model="account.description"
          ></textarea>
        </div>
        <div class="input-control">
          <a href="#" class="btn -green" @click.prevent="saveStudent">Cadastrar</a>
        </div>
      </div>
      <div class="form-step">
        <span class="dot"></span>
        <span class="dot active"></span>
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
  name: "CreateProfile",
  components: {
    ToolBarComponent,
    MenuBottomComponent
  },
  data() {
    return {
      account: {
        name: null,
        image: null,
        description: null,
        id_account: null,
        id_course: null,
        id_institution: null
      },
      courses: null,
      isValid: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getCourses();
      this.account.id_account = parseInt(
        localStorage.getItem("id_create_account")
      );
      this.account.id_institution = 5;
    },
    getCourses() {
      Axios.get("http://localhost:6002/courses")
        .then(res => {
          this.courses = res.data.data;
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

      Axios.post(URL, data, config)
        .then(res => {
          console.log("image upload res > ", res);
          this.account.image = res.data.data.url;
          console.log("chegou aqui: " + this.account.image);
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveStudent() {
      if (
        this.account.name &&
        this.account.image &&
        this.account.description &&
        this.account.id_account &&
        this.account.id_course &&
        this.account.id_institution
      ) {
        this.isValid = true;
      }

      if (this.isValid) {
        Axios.post("http://localhost:6002/students", this.account)
          .then(res => {
            console.log(res);
            localStorage.removeItem("id_create_account");
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss">
.form-content {
  .input-control {
    position: relative;
    margin: 20px 0;
    input,
    select {
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
.form-step {
  position: absolute;
  bottom: -50px;
  left: calc(50% - 20px);
  z-index: 10;
  display: flex;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #000;
    margin: 0 5px;
    &.active {
      background-color: #309541;
    }
  }
}
.card-content {
  position: relative;
}
</style>