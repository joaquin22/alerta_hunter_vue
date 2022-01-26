<template>
  <div>
    <Breadcrumbs title="Marcadores" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Marcadores
                <a
                  v-b-modal.marcador-modal
                  class="btn btn-primary pull-right m-l-10"
                  @click="cambiarModal('HUNTER')"
                >Añadir nuevo Marcador Hunter</a>
                <a
                  v-b-modal.marcador-modal
                  class="btn btn-primary pull-right m-l-10"
                  @click="cambiarModal('AREQUIPA')"
                >Añadir nuevo Marcador Arequipa</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table
                striped
                hover
                :items="marcadores"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
              >
                <template #cell(actions)="row">
                  <b-button variant="danger" class="mb-3 mr-1" @click="deleteAlert(row.item)">
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
                  :total-rows="marcadores.length"
                  :per-page="perPage"
                  class="my-0"
                ></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- AÑADIR MARCADOR MODAL -->
    <b-modal
      id="marcador-modal"
      size="lg"
      :title="modal.title"
      class="theme-modal"
      centered
      @hidden="resetForm"
      @ok="submitForm"
      ref="marcadorModal"
    >
      <b-form>
        <b-form-group label="Ubicación:" label-for="ubicacion" v-show="isAQP">
          <markerMaps :marker="marker" @create="addLatLng"></markerMaps>
        </b-form-group>

        <b-form-group label="Nombre:" label-for="nombre">
          <b-form-input
            :state="validateState('nombre')"
            id="nombre"
            type="text"
            placeholder="Nombre"
            v-model="form.nombre"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Falta el nombre del marcador.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Teléfono:" label-for="telefono">
          <b-form-input
            :state="validateState('telefono')"
            id="telefono"
            type="text"
            placeholder="Telefono"
            v-model="form.telefono"
            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Falta el telefono del marcador.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Dirección:" label-for="direccion">
          <b-form-input
            :state="validateState('direccion')"
            id="direccion"
            type="text"
            placeholder="Dirección"
            v-model="form.direccion"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Falta la dirección del marcador.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          :label="isMapa?'Mostrar en el mapa:':'Mostrar ubicación en Google Maps'"
          label-for="mostrar"
        >
          <div class="media-body text-left icon-state">
            <label class="switch">
              <input type="checkbox" v-model="form.mostrar" />
              <span class="switch-state"></span>
            </label>
          </div>
        </b-form-group>
        <label for v-show="isAQP">Tipo de marcador</label>
        <b-list-group horizontal v-show="isAQP">
          <b-list-group-item
            tag="a"
            href="#"
            v-for="tipo in tipos"
            :key="tipo.id"
            @click="selectTipo(tipo.id)"
            :class="{active:tipoSelected == tipo.id}"
          >
            <img :src="tipo.imagen" alt />
            {{tipo.tipo}}
          </b-list-group-item>
        </b-list-group>
        <br />
        <p style="color:red" v-show="error">Seleccione un tipo de marcador</p>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import markerMaps from "@/components/Maps/markerMaps.vue";

export default {
  mixins: [validationMixin],
  components: {
    markerMaps,
  },
  data() {
    return {
      form: {
        latitud: -16.440132,
        longitud: -71.559042,
        nombre: null,
        telefono: null,
        direccion: null,
        mostrar: true,
        tipoMarcador: null,
        lugar: null,
      },
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "nombre",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "lugar",
          label: "Lugar",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "telefono",
          label: "Teléfono",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "direccion",
          label: "Dirección",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "estado",
          label: "Estado",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Acciones" },
      ],
      modal: {
        title: "",
        action: {
          create: false,
        },
      },
      updateId: 0,
      tipoSelected: 0,
      marker: {
        lat: -16.440132,
        lng: -71.559042,
      },
      isMapa: true,
      error: false,
      currentPage: 1,
      perPage: 10,
    };
  },
  validations: {
    form: {
      nombre: {
        required,
      },
      telefono: {
        required,
      },
      direccion: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      marcadores: (state) => state.marcadores.marcadores,
      tipos: (state) => state.marcadores.tipos,
    }),
    showMap() {
      return this.form.lugar == "HUNTER";
    },
    isAQP() {
      return this.form.lugar == "AREQUIPA" ? false : true;
    },
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
        latitud: -16.440132,
        longitud: -71.559042,
        nombre: null,
        telefono: null,
        direccion: null,
        mostrar: true,
        tipoMarcador: null,
        lugar: null,
      };
      this.tipoSelected = 0;

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("marcadores/getMarcadores");
      dispatch("marcadores/getTipoMarcadores");
    },
    addLatLng(LatLng) {
      this.form.latitud = LatLng.lat;
      this.form.longitud = LatLng.lng;
    },
    submitForm(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        if (this.tipoSelected == 0 && this.isMapa) this.error = true;
        else this.error = false;
        return;
      }
      const { dispatch } = this.$store;

      const { form } = this;
      let lugar = this.form.lugar;
      if (lugar == "AREQUIPA") {
        form.latitud = null;
        form.longitud = null;
      }

      console.log(form);
      if (this.modal.action.create) {
        dispatch("marcadores/addMarcador", form).then(() => {
          this.resetForm();
          this.showToast(
            "Se agrego correctamente el marcador",
            "check",
            "success"
          );
          this.$nextTick(() => {
            this.$bvModal.hide("marcador-modal");
          });
        });
      } else {
        dispatch("marcadores/updateMarcador", {
          id: this.updateId,
          datos: form,
        }).then(() => {
          this.resetForm();
          this.showToast("El marcador fue editado", "info", "info");
          this.$nextTick(() => {
            this.$bvModal.hide("marcador-modal");
          });
        });
      }
      this.modal.action.create = false;
    },
    updateCurrImg(input) {
      this.form.imagen = input.target.files[0];
    },
    cambiarModal(lugar) {
      this.resetForm();
      this.form.lugar = lugar;
      this.modal.action.create = true;
      this.modal.title = "Agregar Marcador " + lugar;
      if (lugar == "AREQUIPA") {
        this.form.mostrar = false;
        this.isMapa = false;
      } else {
        this.form.mostrar = true;
        this.isMapa = true;
      }
    },
    mostrarMapa(event) {
      if (this.form.lugar == "AREQUIPA") {
        this.isMapa = event.target.checked;
      }
    },
    deleteAlert(row) {
      this.$swal({
        text: `¿Esta seguro que desea elimnar el marcador de ${row.nombre} ?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          const { dispatch } = this.$store;
          dispatch("marcadores/deleteMarcador", row.id);
          this.showToast(
            "El marcador se ha eliminado correctamente",
            "trash",
            "error"
          );
        }
      });
    },
    editModal(item) {
      this.form.latitud = item.latitud;
      this.form.longitud = item.longitud;
      this.form.nombre = item.nombre;
      this.form.telefono = item.telefono;
      this.form.direccion = item.direccion;
      this.form.lugar = item.lugar;
      this.form.mostrar = item.mostrar;
      if (this.form.lugar == "AREQUIPA") {
        this.isMapa = item.mostrar;
      } else {
        this.isMapa = true;
        this.form.tipoMarcador = { id: item.tipoMarcador.id };
        this.tipoSelected = item.tipoMarcador.id;
      }

      if (item.latitud && item.longitud) {
        this.marker = {
          lat: item.latitud,
          lng: item.longitud,
        };
      }
      this.updateId = item.id;
      this.$bvModal.show("marcador-modal");

      this.modal.action.create = false;
      this.modal.title = "Editar Marcador";
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
    selectTipo(id) {
      this.tipoSelected = id;
      this.form.tipoMarcador = {
        id: id,
      };
    },
  },
};
</script>
