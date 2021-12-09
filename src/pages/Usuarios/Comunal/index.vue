<template>
  <div>
    <Breadcrumbs title="Usuarios" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Comunal
                <a
                  v-b-modal.modal-6
                  class="btn btn-primary pull-right m-l-10"
                >Añanir nuevo Comunal</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table striped hover :items="usuarios"></b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <!-- MODAL ADD -->
    <b-modal
      id="modal-6"
      title="Nuevo Serenazgo"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @ok="submitForm"
    >
      <b-form>
        <b-form-group id="input-nombre" label="Nombre:" label-for="nombres">
          <b-form-input id="nombres" type="text" placeholder="Nombre" v-model="form.first_name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-apellido" label="Apellido:" label-for="apellidos">
          <b-form-input id="apellidos" type="text" placeholder="Apellido" v-model="form.last_name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-email" label="E-mail:" label-for="E-mail">
          <b-form-input id="email" type="email" placeholder="E-mail" v-model="form.username"></b-form-input>
        </b-form-group>

        <b-form-group id="input-password" label="Contraseña:" label-for="password">
          <b-form-input
            id="password"
            type="password"
            placeholder="Password"
            v-model="form.password"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        password: "",
        username: "",
      },
    };
  },
  computed: {
    ...mapState({
      usuarios: (state) => state.usuarios.comunales,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      dispatch("usuarios/getComunales");
    },
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.$touch();
      if (!this.$v.form.$anyError) {
        const { dispatch } = this.$store;
        const { form } = this;
        dispatch("usuarios/addComunal", form);
      }
    },
  },
};
</script>