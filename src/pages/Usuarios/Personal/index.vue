<template>
  <div>
    <Breadcrumbs title="personal" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Personal
                <a
                  v-b-modal.modal-6
                  class="btn btn-primary pull-right m-l-10"
                  @click="modal.title = 'Nuevo Personal'"
                >Añadir nuevo Personal</a>
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <b-table
                  striped
                  hover
                  :items="personal"
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
                  :total-rows="personal.length"
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
        <b-form-group id="input-nombres" label="Nombres:" label-for="nombres">
          <b-form-input
            :state="validateState('nombres')"
            id="nombres"
            type="text"
            placeholder="Nombres"
            v-model="form.nombres"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-apellidos" label="Apellidos:" label-for="apellidos">
          <b-form-input
            :state="validateState('apellidos')"
            id="apellidos"
            type="text"
            placeholder="Apellidos"
            v-model="form.apellidos"
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
        nombres: null,
        apellidos: null,
      },
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nombres",
          label: "Nombres",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "apellidos",
          label: "Apellidos",
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
      nombres: {
        required,
      },
      apellidos: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      personal: (state) => state.personal.personal,
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
        nombres: null,
        apellidos: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("personal/getPersonal");
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
        dispatch("personal/updatePersonal", {
          id: this.updateId,
          datos: form,
        }).then(() => {
          this.resetForm();
          this.showToast(
            "Se edito correctamente el personal",
            "check",
            "success"
          );
          this.edit = false;
          this.$nextTick(() => {
            this.$bvModal.hide("modal-6");
          });
        });
      } else {
        dispatch("personal/addPersonal", form).then(() => {
          this.resetForm();
          this.showToast(
            "Se agrego correctamente el personal",
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
        text: `¿Esta seguro que desea elimnar a ${row.nombres} ?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          const { dispatch } = this.$store;
          dispatch("personal/deletePersonal", row.id);
          this.showToast("Se elimino correctamente", "trash", "error");
        }
      });
    },
    editModal(item) {
      this.modal.title = "Editar Personal";
      this.form.nombres = item.nombres;
      this.form.apellidos = item.apellidos;
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