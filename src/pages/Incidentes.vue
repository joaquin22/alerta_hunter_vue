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
                Incidentes
                <a
                  v-b-modal.modal-6
                  class="btn btn-primary pull-right m-l-10"
                >Añanir nuevo Tipo de Incidente</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table striped hover :items="incidentes"></b-table>
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
        <b-form-group id="input-titulo" label="Titulo:" label-for="titulo">
          <b-form-input id="titulo" type="text" placeholder="Titulo" v-model="form.titulo"></b-form-input>
        </b-form-group>

        <b-form-group id="input-area" label="Area:" label-for="area">
          <b-form-select id="area" v-model="form.area" :options="tipoArea"></b-form-select>
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
        titulo: "",
        area: "",
      },
      tipoArea: [
        { value: "SERENAZGO", text: "Serenazgo" },
        { value: "COMUNAL", text: "Comunal" },
      ],
    };
  },
  computed: {
    ...mapState({
      incidentes: (state) => state.incidentes.incidentes,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      dispatch("incidentes/getIncidentes");
    },
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.$touch();
      if (!this.$v.form.$anyError) {
        const { dispatch } = this.$store;
        const { form } = this;
        dispatch("incidentes/addIncidente", form);
        this.$nextTick(() => {
          this.$bvModal.hide("modal-6");
        });
      }
    },
  },
};
</script>