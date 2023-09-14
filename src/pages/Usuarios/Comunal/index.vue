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
                Comunales
                <a v-b-modal.modal-usuario class="btn btn-secondary pull-right m-l-10"
                  @click="modal.title = 'Nuevo Comunal'">Añadir nuevo Comunal</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table striped hover :items="usuarios" :fields="fields" :current-page="currentPage" :per-page="perPage">
                <template #cell(actions)="row">
                  <b-button variant="danger" class="mb-3 mr-1" @click="deleteModal(row.item)">
                    <i class="fa fa-trash pr-0"></i>
                  </b-button>
                  <b-button variant="secondary" class="mb-3 mr-1" @click="editModal(row.item)">
                    <i class="fa fa-pencil pr-0"></i>
                  </b-button>
                </template>
              </b-table>
              <b-col md="6" class="p-0">
                <b-pagination v-model="currentPage" :total-rows="usuarios.length" :per-page="perPage"
                  class="my-0"></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <!-- MODAL ADD -->
    <b-modal id="modal-usuario" :title="modal.title" cancel-title="Cancelar" ok-title="Guardar" class="theme-modal"
      @hidden="resetForm" @ok="handleOk">
      <b-alert variant="danger" dismissible class="alert alert-danger dark alert-dismissible" :show="error.value"
        @dismissed="error.value = false">{{ error.text }}</b-alert>
      <b-form @submit.stop.prevent="submitForm">
        <b-form-group id="input-nombre" label="Nombre:" label-for="nombres">
          <b-form-input :state="validateState('first_name')" id="nombres" type="text" placeholder="Nombre"
            v-model="form.first_name"></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-apellido" label="Apellido:" label-for="apellidos">
          <b-form-input :state="validateState('last_name')" id="apellidos" type="text" placeholder="Apellido"
            v-model="form.last_name"></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-email" label="E-mail:" label-for="E-mail">
          <b-form-input :state="validateState('username')" id="email" type="email" placeholder="E-mail"
            v-model="form.username"></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required" id="input-2-live-feedback">Este campo es
            obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-password" label="Contraseña:" label-for="password">
          <b-form-input :state="validateState('password')" id="password" type="password" placeholder="Password"
            v-model="form.password"></b-form-input>
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
        id: null,
        first_name: null,
        last_name: null,
        password: null,
        username: "",
      },
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "first_name",
          label: "Nombres",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "last_name",
          label: "Apellidos",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Acciones" },
      ],
      deleteModalItem: {},
      modal: {
        title: "",
      },
      edit: false,
      updateId: 0,
      error: {
        value: false,
        text: "",
      },
      currentPage: 1,
      perPage: 10,
    };
  },
  validations: {
    form: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      password: {
        required,
      },
      username: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      usuarios: (state) => state.comunales.comunales,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    validateState(name) {
      if (name == "password" && this.edit) return null;
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.edit = false;
      this.form = {
        id: null,
        first_name: null,
        last_name: null,
        password: null,
        username: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("comunales/getComunales");
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.form.$touch();

      if (this.edit) {
        if (this.$v.form.$anyError) {
          if (!this.$v.form.password.$anyError) {
            return;
          }
        }
      } else {
        if (this.$v.form.$anyError) {
          return;
        }
      }
      this.submitForm();
    },
    submitForm() {
      const { dispatch } = this.$store;
      const { form } = this;

      if (this.edit) {
        if (!form.password) {
          delete form["password"];
        }
        dispatch("comunales/updateComunal", {
          id: this.updateId,
          datos: form,
        })
          .then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal-usuario");
            });
            this.showToast("Se edito al usuario", "check", "success");
            this.edit = false;
          })
          .catch(() => {
            this.error = {
              value: true,
              text: "El correo ya se ha registrado",
            };
          });
      } else {
        dispatch("comunales/addComunales", form)
          .then(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal-usuario");
            });
            this.showToast("Se agrago un nuevo usuario", "check", "success");
          })
          .catch(() => {
            this.error = {
              value: true,
              text: "El correo ya se ha registrado",
            };
          });
      }
    },
    editModal(item) {
      this.form.first_name = item.first_name;
      this.form.last_name = item.last_name;
      this.form.username = item.email;
      this.form.id = item.id;
      this.edit = true;
      this.updateId = item.id;
      this.$bvModal.show("modal-usuario");
      this.modal.title = "Editar Comunal";
    },
    deleteModal(row) {
      this.$swal({
        text: `¿Esta seguro que desea elimnar a ${row.first_name} ?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          const { dispatch } = this.$store;
          dispatch("comunales/deleteComunal", row.id);
          this.showToast("Se elimino correctamente", "trash", "error");
        }
      });
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