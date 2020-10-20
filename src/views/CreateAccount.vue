<template>
  <div id="create-account-page" class="has-bottom-menu animation-transition">
    <ToolBarComponent :label="`Vamos realizar o seu cadastro`" link="/" />
    <div class="card-content container has-toolbar">
      <div class="label">
        <span>Primeiro vamos criar a sua conta</span>
      </div>
      <div class="form-content">
        <div class="input-control">
          <input
            type="email"
            class="font-size -size-16 font-weight -bold"
            placeholder="Email"
            v-model="account.email"
          />
        </div>
        <div class="input-control">
          <input
            type="password"
            class="font-size -size-16 font-weight -bold"
            placeholder="Senha"
            id="in-password"
            v-model="account.password"
          />
        </div>
        <div class="input-control">
          <input
            type="password"
            class="font-size -size-16 font-weight -bold"
            placeholder="Confirmação da Senha"
            id="in-confirm-password"
            v-model="confirmPassword"
          />
        </div>
        <div class="input-control">
          <a href="#" class="btn -green" @click.prevent="validateForm">Avançar</a>
        </div>
      </div>
      <div class="form-step">
        <span class="dot active"></span>
        <span class="dot"></span>
      </div>
    </div>
    <MenuBottomComponent />
  </div>
</template>

<script>
import ToolBarComponent from "../components/ToolBarComponent.vue";
import MenuBottomComponent from "../components/MenuBottomComponent.vue";
import Auth from "../auth/index";
import Axios from "axios";
export default {
  name: "CreateAccount",
  components: {
    ToolBarComponent,
    MenuBottomComponent
  },
  data() {
    return {
      account: {
        email: null,
        password: null,
        is_administrator: 1
      },
      confirmPassword: null
    };
  },
  beforeCreate: function() {
    document.body.className = "create-account";
  },
  methods: {
    validateForm() {
      if (this.account.email && this.account.password && this.confirmPassword) {
        if (this.account.password !== this.confirmPassword) {
          this.$toast(
            "A senha de confirmação não está batendo com o campo de senha",
            {
              className: ["toast-warning"],
              horizontalPosition: "center",
              verticalPosition: "top"
            }
          );
          document.getElementById("in-confirm-password").value = "";
          document.getElementById("in-confirm-password").focus();
        } else {
          Axios.post("http://localhost:6002/accounts/create", this.account)
            .then(res => {
              if (res.data.err) {
                this.$toast(res.data.message, {
                  className: ["toast-warning"],
                  horizontalPosition: "center",
                  verticalPosition: "top"
                });
              } else {
                console.log(res);
                Axios.post("http://localhost:6002/accounts/", this.account)
                  .then(res => {
                    localStorage.setItem(
                      "id_create_account",
                      res.data.account[0].id
                    );
                    Auth.setToken(`Bearer ${res.data.token}`);
                    console.log(res);
                    localStorage.setItem("user_id", res.data.account[0].id);
                    this.$router.push("/create-profile");
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.$toast(
          "Existem campos que não foram preenchidos! Por favor, verifique os campos novamente.",
          {
            className: ["toast-warning"],
            horizontalPosition: "center",
            verticalPosition: "top"
          }
        );
      }
    }
  }
};
</script>

<style lang="scss">
body.create-account {
  background-color: #fff;
}
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