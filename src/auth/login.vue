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
                    src="../assets/images/logo/login.png"
                    alt="looginpage"
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
                    <div class="alert alert-info">
                      Username: test
                      <br />Password: test
                    </div>
                    <form class="theme-form" @submit.prevent="handleSubmit">
                      <div class="form-group">
                        <label for="username">Username</label>
                        <input
                          type="text"
                          v-model="username"
                          name="username"
                          class="form-control"
                          :class="{ 'is-invalid': submitted && !username }"
                        />
                        <div
                          v-show="submitted && !username"
                          class="invalid-feedback"
                        >Username is required</div>
                      </div>
                      <div class="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          v-model="passwordjwt"
                          name="password"
                          class="form-control"
                          :class="{
                                'is-invalid': submitted && !passwordjwt,
                              }"
                        />
                        <div
                          v-show="submitted && !passwordjwt"
                          class="invalid-feedback"
                        >Password is required</div>
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
import firebase from "firebase";
import Userauth from "../auth/js/index";

export default {
  name: "login",
  data() {
    return {
      type: "password",
      username: "admin",
      passwordjwt: "admin",
      submitted: false,
    };
  },
  computed: {
    // JWT authentication
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {
    // reset login status for JWT
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    // JWT authentication
    handleSubmit() {
      this.submitted = true;
      const { username, passwordjwt } = this;
      const { dispatch } = this.$store;
      if (username && passwordjwt) {
        dispatch("authentication/login", { username, passwordjwt });
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
    signUp: function () {
      this.submitted = true;
      if (this.email === "" && this.password === "") {
        (this.email = "test@admin.com"), (this.password = "test@123456");
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(
            (result) => {
              Userauth.localLogin(result);
              this.$router.replace("/");
            },
            (err) => {
              (this.email = "test@admin.com"), (this.password = "test@123456");
              this.$toasted.show("Oops..." + err.message, {
                theme: "bubble",
                position: "bottom-right",
                type: "error",
                duration: 2000,
              });
            }
          );
      }
    },
    // Social login
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          Userauth.localLogin(result);
          this.$router.replace("/");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    socialLoginFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          Userauth.localLogin(result);
          this.$router.replace("/");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    socialLoginTwitter() {
      const provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          Userauth.localLogin(result);
          this.$router.replace("/");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    socialLoginGit() {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          Userauth.localLogin(result);
          this.$router.replace("/");
        })
        .catch((err) => {
          alert("Oops. " + err.message);
        });
    },
    // Auth0 login
    login() {
      Userauth.login();
    },
  },
};
</script>
