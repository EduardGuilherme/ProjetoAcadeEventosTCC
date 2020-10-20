<template>
  <div id="configuration-page">
    <ToolBarComponent label="Vamos configurar seu perfil" link="/menu" />
    <div class="container">
      <div class="image-profile">
        <img src alt />
      </div>
      <div class="form-content">
        <div class="input-control">
          <input v-if="loadDatas" type="text" v-model="user.name" placeholder="Nome do estudante" />
        </div>
        <div class="input-control">
          <input v-if="loadDatas" type="email" v-model="user.email" placeholder="Email" />
        </div>
        <div class="input-control">
          <input v-if="loadDatas" type="password" v-model="user.password" placeholder="Senha" />
        </div>
        <div class="input-control">
          <textarea v-if="loadDatas" type="text" v-model="user.description" placeholder="Descrição"></textarea>
        </div>
        <div class="input-control">
          <a href="#" class="btn -green" @click.prevent="updateAccount">Salvar</a>
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
  name: "Configuration",
  components: {
    ToolBarComponent,
    MenuBottomComponent
  },
  data() {
    return {
      user: null,
      loadDatas: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getStudents();
    },
    getStudents() {
      let user_id = localStorage.getItem("user_id");

      Axios.get(`http://localhost:6002/students/account/${user_id}`)
        .then(res => {
          this.user = res.data.data[0];
          console.log(this.user.name);
          if (this.user) {
            this.loadDatas = true;
          }
          console.log(this.user);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateAccount() {
      let user_id = localStorage.getItem("user_id");
      Axios.put(`http://localhost:6002/students/${this.user.id}`, {
        name: this.user.name,
        image: this.user.image,
        description: this.user.description,
        id_account: this.user.id_account,
        id_course: this.user.id_course,
        id_institution: this.user.id_institution
      })
        .then(res => {
          console.log(res);
          Axios.put(`http://localhost:6002/accounts/${user_id}`, {
            email: this.user.email,
            password: this.user.password,
            is_administrator: false
          })
            .then(res => {
              console.log(res);
              this.$toast(res.data.message, {
                className: ["toast-sucess"],
                horizontalPosition: "center",
                verticalPosition: "top"
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>