<template>
  <div>
    <Breadcrumbs title="Marcadores" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Tipos de Marcadores
                <a
                  v-b-modal.modal-6
                  class="btn btn-primary pull-right m-l-10"
                  @click="modal.title = 'Nuevo Tipo de Marcador'"
                >Añadir Nuevo Tipo de Marcador</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table striped hover :items="tipos" :fields="fields">
                <template #cell(imagen)="row">
                  <b-img
                    v-bind="mainProps"
                    rounded="circle"
                    :src="row.item.imagen"
                    alt="Circle image"
                  ></b-img>
                </template>
                <template #cell(actions)="row">
                  <b-button variant="danger" class="mb-3 mr-1" @click="deleteModal(row.item)">
                    <i class="fa fa-trash pr-0"></i>
                  </b-button>
                  <b-button variant="primary" class="mb-3 mr-1" @click="editModal(row.item)">
                    <i class="fa fa-pencil pr-0"></i>
                  </b-button>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <!-- MODAL ADD -->
    <b-modal
      id="modal-6"
      :title="modal.title"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @ok="submitForm"
    >
      <b-form>
        <b-form-group id="input-tipo" label="Nombre:" label-for="tipo">
          <b-form-input id="tipo" type="text" placeholder="Nombre" v-model="form.tipo"></b-form-input>
        </b-form-group>

        <b-form-group id="input-tipo" label="Imagen:" label-for="tipo">
          <b-form-file
            @change="handleFileUpload( $event )"
            placeholder="Seleccione una imagen..."
            drop-placeholder="Drop file here..."
            browse-text="Buscar"
          ></b-form-file>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      mainProps: {
        blankColor: "#777",
        width: 65,
        height: 65,
        class: "m1",
      },
      form: {
        tipo: null,
        imagen: null,
      },
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "tipo",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "imagen",
          label: "Imagen",
          sortable: false,
          sortDirection: "desc",
        },
        { key: "actions", label: "Acciones" },
      ],
      modal: {
        title: "",
      },
    };
  },
  validations: {
    form: {
      titulo: {
        required,
      },
      area: {
        required,
      },
      nivel: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      tipos: (state) => state.marcadores.tipos,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      dispatch("marcadores/getTipoMarcadores");
    },
    handleFileUpload(e) {
      this.form.imagen = e.target.files[0];
    },
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      const { dispatch } = this.$store;
      const { form } = this;
      let formData = new FormData();
      formData.append("tipo", form.tipo);
      formData.append("imagen", form.imagen);
      dispatch("marcadores/addTipoMarcadores", formData);
      // console.log(formData);
      // for (var key of formData.entries()) {
      //   console.log(key[0] + ", " + key[1]);
      // }
    },
    showToast(mensaje, icono, type) {
      this.$toasted.show(mensaje, {
        theme: "outline",
        position: "top-right",
        icon: icono,
        type: type,
        duration: 2000,
      });
    },
  },
};
</script>