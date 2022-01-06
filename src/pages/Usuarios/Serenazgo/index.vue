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
                Serenazgos
                <a
                  v-b-modal.modal-usuario
                  class="btn btn-primary pull-right m-l-10"
                  @click="modal.title = 'Nuevo Serenazgo'"
                >Añanir nuevo serenazgo</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table striped hover :items="usuarios" :fields="fields">
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
      id="modal-usuario"
      :title="modal.title"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submitForm">
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
    };
  },
  computed: {
    ...mapState({
      usuarios: (state) => state.serenazgos.serenazgos,
    }),
    hasError() {
      return this.$store.state.serenazgos.hasError;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      dispatch("serenazgos/getSerenazgos");
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.submitForm();
    },
    async submitForm() {
      const { dispatch } = this.$store;
      const { form } = this;

      if (this.edit) {
        if (!form.password) {
          delete form["password"];
        }
        dispatch("serenazgos/updateSerenazgo", {
          id: this.updateId,
          datos: form,
        }).then(() => {
          this.$nextTick(() => {
            this.$bvModal.hide("modal-usuario");
          });
          this.showToast("Se edito al usuario", "check", "success");
          this.edit = false;
        });
      } else {
        await dispatch("serenazgos/addSerenazgo", form).then(() => {
          this.$nextTick(() => {
            this.$bvModal.hide("modal-usuario");
          });
          this.showToast("Se agrago un nuevo usuario", "check", "success");
        });
      }
      this.form = {
        first_name: "",
        last_name: "",
        password: "",
        username: "",
      };
    },
    editModal(item) {
      this.form.first_name = item.first_name;
      this.form.last_name = item.last_name;
      this.form.username = item.email;
      this.edit = true;
      this.updateId = item.id;
      this.$bvModal.show("modal-usuario");
      this.modal.title = "Editar Serenazgo";
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
          dispatch("serenazgos/deleteSerenazgo", row.id);
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