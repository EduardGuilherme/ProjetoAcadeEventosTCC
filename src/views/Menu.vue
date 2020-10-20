<template>
  <div id="menu-page" class="animation-transition">
    <ToolBarComponent label="Configurações" link="/home" />
    <div class="profile">
      <div class="container d-flex -justify-center -align-center -f-direction-column">
        <div
          class="image"
          v-if="renderData"
          v-bind:style="{ 'background-image': 'url(' + user.image + ')' }"
        ></div>
        <div class="name">
          <span v-if="renderData" class="font-size -size-20 font-weight -bold">{{ user.name }}</span>
        </div>
        <div class="course">
          <span v-if="renderData" class="font-size -size-18 font-weight -bold">{{ courseName }}</span>
        </div>
        <router-link class="edit-profile font-size -size-12" to="/configuration">Editar perfil</router-link>
      </div>
    </div>

    <div class="back-account-container d-flex -justify-center -align-center">
      <div class="container">
        <a href="#" class="btn -black" @click.prevent="logOutAccount">Sair da conta</a>
      </div>
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import ToolBarComponent from "../components/ToolBarComponent";
import MenuBottomComponent from "../components/MenuBottomComponent";
import Auth from "../auth/index";
import Axios from "axios";
export default {
  name: "Menu",
  components: {
    ToolBarComponent,
    MenuBottomComponent
  },
  data() {
    return {
      user: null,
      renderData: false,
      courseName: null
    };
  },
  created() {
    this.getStudent();
  },
  methods: {
    logOutAccount() {
      Auth.destroyToken("token");
      this.$router.push("/");
    },
    getStudent() {
      let user_id = localStorage.getItem("user_id");
      Axios.get(`http://localhost:6002/students/account/${user_id}`)
        .then(res => {
          this.user = res.data.data[0];
          if (this.user) this.renderData = true;
          this.getCourse();

          console.log(this.user);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCourse() {
      let id_course = this.user.id_course;

      Axios.get(`http://localhost:6002/courses/${id_course}`)
        .then(res => {
          console.log(res);
          this.courseName = res.data.data[0].name;
          console.log(this.courseName);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#menu-page {
  .profile {
    position: relative;
    background-color: #000;
    padding-bottom: 50px;
    padding-top: 20px;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      background-repeat: repeat;
      height: 10px;
      background-size: 20px 20px;
      background-image: radial-gradient(
        circle at 10px -5px,
        transparent 12px,
        #fff 13px
      );
    }
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      background-repeat: repeat;
      height: 15px;
      background-size: 40px 20px;
      background-image: radial-gradient(
        circle at 10px 15px,
        #fff 12px,
        transparent 13px
      );
    }
    .image {
      width: 100px;
      height: 100px;
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      border: 2px solid #309541;
      filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.5));
    }
    .name {
      margin-top: 20px;
      text-align: center;
      span {
        color: #fff;
      }
    }
    .course {
      margin-top: 10px;
      text-align: center;
      span {
        color: #309541;
      }
    }
    .edit-profile {
      color: #fff;
      margin-top: 10px;
    }
  }
  .back-account-container {
    margin-top: 30px;
  }
}
</style>