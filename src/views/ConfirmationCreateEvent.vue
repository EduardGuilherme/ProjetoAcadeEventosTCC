<template>
  <div id="confirmation-create-event-page">
    <div class="container">
      <div class="title">
        <h1>Seu evento foi criado com sucesso!</h1>
      </div>
      <div class="subtitle">
        <span>Meio caminho ja foi andado! Seu evento está sendo avaliado por nossos administradores. Em breve ele aparecerá no AcadEventos!</span>
      </div>
      <div class="cta-home">
        <router-link to="/home" href="#" class="btn -green">Voltar para home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationCreateEvent"
};
</script>

<style lang="scss">
#confirmation-create-event-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
      h1 {
        font-size: 30px;
        text-align: center;
        font-weight: bold;
      }
    }
    .subtitle {
      text-align: center;
      margin-top: 10px;
      span {
        font-size: 20px;
      }
    }
    .cta-home {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>