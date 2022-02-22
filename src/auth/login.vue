<template>
  <div>
    <!-- page-wrapper Start-->
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div>
              <div>
                <a class="logo">
                  <img
                    class="img-fluid for-light"
                    src="../assets/images/logo/logo-hunter.png"
                    alt="looginpage"
                    v-bind="imgProps"
                  />
                  <img
                    class="img-fluid for-dark"
                    src="../assets/images/logo/logo_dark.png"
                    alt="looginpage"
                  />
                </a>
              </div>
              <div class="login-main">
                <b-card>
                  <template #title>
                    <img src="../assets/images/login/jwt.svg" />
                    <span>JWT</span>
                  </template>
                  <b-card-text>
                    <b-alert
                      variant="danger"
                      show
                      dismissible
                      class="alert alert-danger dark alert-dismissible"
                      v-show="hasError"
                    >{{errorMessage}}</b-alert>
                    <form class="theme-form" @submit.prevent="handleSubmit">
                      <div class="form-group">
                        <label for="username">Usuario</label>
                        <input
                          type="text"
                          v-model="username"
                          name="username"
                          class="form-control"
                          placeholder="Usuario"
                          :class="{ 'is-invalid': submitted && !username }"
                        />
                        <div
                          v-show="submitted && !username"
                          class="invalid-feedback"
                        >El campo no puede etar vacio</div>
                      </div>
                      <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input
                          type="password"
                          v-model="passwordjwt"
                          name="password"
                          class="form-control"
                          placeholder="Contraseña"
                          :class="{
                                'is-invalid': submitted && !passwordjwt,
                              }"
                        />
                        <div
                          v-show="submitted && !passwordjwt"
                          class="invalid-feedback"
                        >El campo no puede etar vacio</div>
                      </div>
                      <div class="form-group mt-3 mb-0">
                        <button class="btn btn-primary btn-block" :disabled="loggingIn">Login</button>
                      </div>
                    </form>
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- latest jquery-->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      type: "password",
      username: "",
      passwordjwt: "",
      clientIp: "",
      submitted: false,
      imgProps: {
        width: 100,
      },
    };
  },
  computed: {
    // JWT authentication
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
    hasError() {
      return this.$store.state.alert.hasError;
    },
    errorMessage() {
      return this.$store.state.alert.message;
    },
  },
  created() {
    // reset login status for JWT
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((response) => {
        this.clientIp = response.ip;
      });
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    // JWT authentication
    handleSubmit() {
      this.submitted = true;
      const { username, passwordjwt, clientIp } = this;
      const { dispatch } = this.$store;
      if (username && passwordjwt) {
        dispatch("authentication/login", { username, passwordjwt, clientIp });
      }
    },
    // show/hide password
    showPassword: function () {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    // Firebase login
  },
};
</script>
