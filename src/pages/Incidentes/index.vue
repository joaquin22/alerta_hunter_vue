<template>
  <div>
    <Breadcrumbs title="Tipos de Incidentes" />
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
                  @click="modal.title = 'Nuevo Tipo de Incidente'"
                >Añadir nuevo Tipo de Incidente</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table
                striped
                hover
                :items="incidentes"
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
              <b-col md="6" class="p-0">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="incidentes.length"
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
      @hidden="resetForm"
      @ok="submitForm"
    >
      <b-form>
        <b-form-group id="input-titulo" label="Titulo:" label-for="titulo">
          <b-form-input
            :state="validateState('titulo')"
            id="titulo"
            type="text"
            placeholder="Nombre"
            v-model="form.titulo"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Falta el nombre del incidente.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-area" label="Area:" label-for="area">
          <b-form-select
            :state="validateState('area')"
            id="area"
            v-model="form.area"
            :options="tipoArea"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-invalid-feedback id="input-2-live-feedback">Seleccione un area.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-nivel" label="Nivel:" label-for="nivel">
          <b-form-select
            :state="validateState('nivel')"
            id="nivel"
            v-model="form.nivel"
            :options="niveles"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
          <b-form-invalid-feedback id="input-2-live-feedback">Seleccione un nivel.</b-form-invalid-feedback>
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
      form: {
        titulo: null,
        area: null,
        nivel: null,
      },
      tipoArea: [
        { value: "SERENAZGO", text: "Serenazgo" },
        { value: "COMUNAL", text: "Comunal" },
      ],
      niveles: [
        { value: "BAJA", text: "Baja" },
        { value: "MEDIA", text: "Media" },
        { value: "ALTA", text: "Alta" },
      ],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "titulo",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "area",
          label: "Area",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nivel",
          label: "Nivel",
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
      incidentes: (state) => state.incidentes.tipoIncidentes,
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
        titulo: null,
        area: null,
        nivel: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("incidentes/getTipoIncidentes");
    },
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const { dispatch } = this.$store;
      const { form } = this;
      if (this.edit) {
        dispatch("incidentes/updateTipoIncidentes", {
          id: this.updateId,
          datos: form,
        }).then(() => {
          this.resetForm();
          this.showToast(
            "Se edito correctamente el tipo de Incidente",
            "check",
            "success"
          );
          this.edit = false;
          this.$nextTick(() => {
            this.$bvModal.hide("modal-6");
          });
        });
      } else {
        dispatch("incidentes/addTipoIncidentes", form).then(() => {
          this.resetForm();
          this.showToast(
            "Se agrego correctamente el tipo de Incidente",
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
          dispatch("incidentes/deleteTipoIncidentes", row.id);
          this.showToast("Se elimino correctamente", "trash", "error");
        }
      });
    },
    editModal(item) {
      console.log("QQQ");
      this.modal.title = "Editar Tipo de Incidente";
      this.form.titulo = item.titulo;
      this.form.area = item.area;
      this.form.nivel = item.nivel;
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