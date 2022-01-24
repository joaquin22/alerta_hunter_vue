<template>
  <div>
    <Breadcrumbs title="Noticias" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Noticias
                <a
                  v-b-modal.modal-6
                  class="btn btn-primary pull-right m-l-10"
                  @click="modal.title = 'Nueva Noticia'"
                >Añadir nueva Noticia</a>
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <b-table
                  striped
                  hover
                  :items="noticias"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                >
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
              <b-col md="6" class="p-0 mt-5">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="noticias.length"
                  :per-page="perPage"
                  class="my-0"
                ></b-pagination>
              </b-col>
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
        <b-form-group id="input-titulo" label="Titulo:" label-for="titulo">
          <b-form-input
            :state="validateState('titulo')"
            id="titulo"
            type="text"
            placeholder="Titulo"
            v-model="form.titulo"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-link" label="Link:" label-for="link">
          <b-form-input
            :state="validateState('link')"
            id="link"
            type="text"
            placeholder="https://ejemplo.com"
            v-model="form.link"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form.link.required"
            id="input-2-live-feedback"
          >Este campo es obligatorio.</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.link.url"
            id="input-2-live-feedback"
          >Debde ser un link valido.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-fecha" label="Fecha:" label-for="fecha">
          <b-form-datepicker
            :state="validateState('fecha')"
            id="datepicker-sm"
            size="sm"
            locale="es"
            class="mb-2"
            v-model="form.fecha"
          ></b-form-datepicker>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-imagen" label="Imagen:" label-for="imagen">
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
import { required, url } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        link: null,
        titulo: null,
        fecha: null,
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
          key: "titulo",
          label: "Titulo",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "fecha",
          label: "Fecha",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Acciones" },
      ],
      modal: {
        title: "",
      },
      edit: false,
      updateId: 0,
      currentPage: 1,
      perPage: 10,
    };
  },
  validations: {
    form: {
      link: {
        url,
        required,
      },
      titulo: {
        required,
      },
      fecha: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      noticias: (state) => state.noticias.noticias,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        link: null,
        titulo: null,
        fecha: null,
        imagen: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("noticias/getNoticias");
    },
    handleFileUpload(e) {
      this.form.imagen = e.target.files[0];
    },
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const { dispatch } = this.$store;
      const { form } = this;
      let formData = new FormData();
      formData.append("link", form.link);
      formData.append("titulo", form.titulo);
      formData.append("fecha", form.fecha);
      if (form.imagen) formData.append("imagen", form.imagen);

      if (this.edit) {
        dispatch("noticias/updateNoticia", {
          id: this.updateId,
          datos: formData,
        }).then(() => {
          this.resetForm();
          this.showToast(
            "Se edito correctamente la noticia",
            "check",
            "success"
          );
          this.edit = false;
          this.$nextTick(() => {
            this.$bvModal.hide("modal-6");
          });
        });
      } else {
        dispatch("noticias/addNoticia", formData).then(() => {
          this.resetForm();
          this.showToast(
            "Se agrego correctamente la noticia",
            "check",
            "success"
          );
          this.$nextTick(() => {
            this.$bvModal.hide("modal-6");
          });
        });
      }
    },
    deleteModal(row) {
      this.$swal({
        text: `¿Esta seguro que desea elimnar a ${row.titulo} ?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          const { dispatch } = this.$store;
          dispatch("noticias/deleteNoticia", row.id);
          this.showToast("Se elimino correctamente", "trash", "error");
        }
      });
    },
    editModal(item) {
      this.modal.title = "Editar Noticia";
      this.form.titulo = item.titulo;
      this.form.fecha = item.fecha;
      this.form.link = item.link;
      this.updateId = item.id;
      this.$bvModal.show("modal-6");
      this.edit = true;
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