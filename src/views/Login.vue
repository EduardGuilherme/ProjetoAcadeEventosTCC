<template>
  <div id="login-page" class="animation-transition">
    <div class="container">
      <div class="logo row">
        <div class="col-12 d-flex -justify-center -align-center">
          <img src="img/logo-ifsp.png" alt />
        </div>
      </div>

      <div class="form">
        <div class="row">
          <div class="col-12">
            <div class="input-control">
              <input
                type="text"
                name="email"
                placeholder="Usuário"
                class="font-size -size-16"
                v-model="email"
                id="in-email"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="input-control">
              <input
                type="password"
                class="font-size -size-16"
                placeholder="Senha"
                name="password"
                v-model="password"
                id="in-password"
                autocomplete="off"
              />
            </div>
          </div>
        </div>

        <div class="forget-content row">
          <div class="col-12 d-flex -justify-end -align-end">
            <router-link to="path={#}" id="forget-pass">Esqueci a senha</router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <a href="#" class="btn -green" @click.prevent="onSubmit">Entrar</a>
          </div>
        </div>
      </div>

      <div class="sign">
        <div class="span row">
          <div class="col-12">
            <span
              class="font-size -size-16 font-weight -bold"
            >Ainda não tem uma conta na Acadeventos?</span>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <router-link :to="{ path: 'create-account' }" class="btn -border-green">Cadastrar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Auth from "../auth/index";
export default {
  name: "Login",
  beforeCreate: function() {
    document.body.className = "login";
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      Axios.post("http://localhost:6002/accounts", {
        email: this.email,
        password: this.password
      })
        .then(res => {
          console.log(res.data.code);
          if (res.data.code === 401) {
            this.$toast(res.data.message, {
              className: ["toast-warning"],
              horizontalPosition: "center",
              verticalPosition: "top"
            });
            document.getElementById("in-email").value = "";
            document.getElementById("in-email").focus();
            document.getElementById("in-password").value = "";
          } else {
            Auth.setToken(`Bearer ${res.data.token}`);
            console.log(res);
            localStorage.setItem("user_id", res.data.account[0].id);
            localStorage.setItem(
              "is_admin",
              res.data.account[0].is_administrator
            );

            res.data.account[0].is_administrator === 0
              ? this.$router.push("/home")
              : this.$router.push("/administrator");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
body.login {
  position: relative;
  background-image: url("../../public/img/login/bg-login.png");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.logo {
  padding-top: 50px;
  img {
    width: 77px;
  }
}

.form {
  padding-top: 50px;
  .input-control {
    width: 100%;
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    input {
      border: none;
      background-color: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 1);
      color: #fff;
      font-size: 16px;
      padding-bottom: 10px;
      &:focus {
        &::placeholder {
          padding-left: 5px;
          transition: 0.2s ease-in;
        }
      }
      &::placeholder {
        font-weight: 700;
        transition: 0.2s ease-in;
      }
    }
    &.in-focus {
      label {
        font-size: 13px;
        top: -10px;
      }
    }
  }
  .forget-content {
    margin: 10px 0;
    a {
      color: #fff;
    }
  }
  .btn {
    margin-top: 10px;
  }
}

.sign {
  margin-top: 40px;
  .span {
    padding: 0 10%;
    text-align: center;
    span {
      color: #fff;
    }
  }

  .btn {
    margin-top: 20px;
  }
}

.toast-warning {
  background: red !important;
  width: 100% !important;
  margin-top: 10px !important;
}
</style>