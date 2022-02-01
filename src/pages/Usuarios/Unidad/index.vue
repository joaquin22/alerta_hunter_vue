<template>
  <div>
    <Breadcrumbs title="Unidades" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Unidades
                <a
                  v-b-modal.modal-6
                  class="btn btn-primary pull-right m-l-10"
                  @click="modal.title = 'Nueva Unidad'"
                >Añadir nueva Unidad</a>
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <b-table
                  striped
                  hover
                  :items="unidad"
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
                  :total-rows="unidad.length"
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
        <b-form-group id="input-numero" label="Número:" label-for="numero">
          <b-form-input
            :state="validateState('numero')"
            id="numero"
            type="text"
            placeholder="Movil 01"
            v-model="form.numero"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-placa" label="Placa:" label-for="placa">
          <b-form-input
            :state="validateState('placa')"
            id="placa"
            type="text"
            placeholder="00-0000"
            v-model="form.placa"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
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
        numero: null,
        placa: null,
      },
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "numero",
          label: "Número",
          sortable: true,
          sortDirection: "desc",
          formatter: (value) => {
            return value ? value.toUpperCase() : value;
          },
        },
        {
          key: "placa",
          label: "Placa",
          sortable: true,
          sortDirection: "desc",
          formatter: (value) => {
            return value ? value.toUpperCase() : value;
          },
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
      numero: {
        required,
      },
      placa: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      unidad: (state) => state.unidad.unidad,
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
        numero: null,
        placa: null,
      };
      this.edit = false;

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("unidad/getUnidad");
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
        dispatch("unidad/updateUnidad", {
          id: this.updateId,
          datos: form,
        }).then(() => {
          this.resetForm();
          this.showToast(
            "Se edito correctamente el unidad",
            "check",
            "success"
          );
          this.edit = false;
          this.$nextTick(() => {
            this.$bvModal.hide("modal-6");
          });
        });
      } else {
        dispatch("unidad/addUnidad", form).then(() => {
          this.resetForm();
          this.showToast(
            "Se agrego correctamente el unidad",
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
        text: `¿Esta seguro que desea elimnar a ${row.numero} ?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          const { dispatch } = this.$store;
          dispatch("unidad/deleteUnidad", row.id);
          this.showToast("Se elimino correctamente", "trash", "error");
        }
      });
    },
    editModal(item) {
      this.modal.title = "Editar Unidad";
      this.form.numero = item.numero;
      this.form.placa = item.placa;
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