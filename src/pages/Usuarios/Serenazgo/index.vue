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

    <!-- DELETE MODAL -->
    <b-modal
      title="Eliminar Serenazgo"
      cancel-title="Cancelar"
      ok-title="Eliminar"
      id="modal-delete"
      @ok="eliminar(deleteModalItem.id)"
    >Esta seguro que desea eliminar a {{deleteModalItem.first_name}}</b-modal>
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
    };
  },
  computed: {
    ...mapState({
      usuarios: (state) => state.usuarios.serenazgos,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      dispatch("usuarios/getSerenazgo");
    },
    submitForm() {
      this.$v.$touch();
      if (!this.$v.form.$anyError) {
        const { dispatch } = this.$store;
        const { form } = this;
        dispatch("usuarios/addSerenazgo", form);
        this.$toasted.show("Se agrago un nuevo usuario", {
          theme: "outline",
          position: "top-right",
          icon: "check",
          type: "success",
          duration: 2000,
        });
      }
    },
    editModal(item) {
      this.form.first_name = item.first_name;
      this.form.last_name = item.last_name;
      this.form.username = item.email;
      this.$bvModal.show("modal-usuario");
      this.modal.title = "Editar Serenazgo";
    },
    deleteModal(item) {
      this.deleteModalItem = item;
      this.$bvModal.show("modal-delete");
    },
    eliminar(id) {
      const { dispatch } = this.$store;
      dispatch("usuarios/deleteSerenazgo", id);
      this.$toasted.show("El usuario se ha eliminado correctamente", {
        theme: "outline",
        position: "top-right",
        icon: "trash",
        type: "error",
        duration: 2000,
      });
    },
  },
};
</script>