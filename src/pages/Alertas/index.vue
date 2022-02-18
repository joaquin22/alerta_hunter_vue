<template>
  <div>
    <Breadcrumbs title="Alertas" />
    <div class="container-fluid">
      <div class="row user-cards">
        <div class="col-sm-12 col-xl-8">
          <b-card header-tag="header">
            <template #header>
              <h4 class="mb-0">
                Mapa
                <a v-b-modal.modal-alertas class="btn btn-primary pull-right">Añadir Nuevo</a>
              </h4>
            </template>
            <b-card-text class="mb-0">
              <markerMaps :marker="getMarker" :zoom="zoom" :isCreate="false" />
            </b-card-text>
          </b-card>
        </div>
        <div class="col-sm-12 col-xl-4">
          <b-card no-body>
            <b-tabs card>
              <b-tab no-body>
                <template #title>
                  Alertas
                  <label class="badge badge-primary">{{alertas.length}}</label>
                </template>

                <b-alert :show="alertas.length==0" variant="info">No hay mas alertas por atender</b-alert>
                <VuePerfectScrollbar class="scroll-area" :settings="settings6">
                  <b-list-group>
                    <alertas
                      v-for="a in alertas"
                      :key="a.id"
                      :datos="a"
                      @goMap="goMap"
                      @enviado="enviado"
                      @bloquear="bloquear"
                      @fuera="fuera"
                    />
                  </b-list-group>
                </VuePerfectScrollbar>
              </b-tab>

              <b-tab no-body>
                <template #title>
                  Enviados
                  <label class="badge badge-primary">{{enviados.length}}</label>
                </template>
                <b-alert :show="enviados.length==0" variant="info">No hay mas alertas</b-alert>
                <VuePerfectScrollbar class="scroll-area" :settings="settings6">
                  <b-list-group>
                    <alertas
                      v-for="a in enviados"
                      :key="a.id"
                      :datos="a"
                      :enviados="true"
                      @goMap="goMap"
                      @enviado="enviado"
                      @atendido="atendido"
                      @bloquear="bloquear"
                      @fuera="fuera"
                    />
                  </b-list-group>
                </VuePerfectScrollbar>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-atendido"
      title="Atendido"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @ok="submitForm"
      @hidden="resetForm"
    >
      <b-form>
        <b-form-group id="input-personal" label="Personal:" label-for="personal">
          <b-form-input type="text" disabled v-model="personalText"></b-form-input>
        </b-form-group>

        <b-form-group id="input-unidad" label="Unidad:" label-for="unidad">
          <b-form-input type="text" disabled v-model="unidadText"></b-form-input>
        </b-form-group>

        <b-form-group id="input-calificacion" label="Calificación:" label-for="calificacion">
          <star-rating :max-rating="5" :star-size="30" v-model="form.calificacionCiudadano"></star-rating>
        </b-form-group>

        <b-form-group id="input-observacion" label="Observación:" label-for="observacion">
          <b-form-textarea
            id="observacion"
            v-model="form.observacion"
            placeholder="Observación"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-imagen" label="Imagen de evidencia:" label-for="imagen">
          <b-form-file
            @change="handleFileUpload( $event )"
            placeholder="Seleccione una imagen..."
            drop-placeholder="Drop file here..."
            browse-text="Buscar"
          ></b-form-file>
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- AÑADIR PERSONAL Y UNIDADES -->
    <b-modal
      id="modal-enviado"
      title="Enviar Personal"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @hidden="resetForm"
      @ok="enviarPersonal"
    >
      <b-form>
        <b-form-group id="input-personal" label="Personal:" label-for="personal">
          <b-form-select :options="personal" v-model="formPersonal.personalSeguridad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-unidad" label="Unidad:" label-for="unidad">
          <b-form-select :options="unidad" v-model="formPersonal.unidad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>

    <!-- AÑADIR NUEVO INCIDENTE MODAL -->

    <b-modal
      id="modal-alertas"
      title="Nuevo Incidente"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @hidden="resetForm"
      @ok="handleOk"
    >
      <b-form>
        <b-form-group id="input-nombres" label="Nombre Completo:" label-for="nombres">
          <b-form-input
            id="nombres"
            type="text"
            placeholder="Nombre Completo"
            v-model="formIncidente.nombres"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-dni" label="DNI:" label-for="dni">
          <b-form-input id="dni" type="text" placeholder="DNI" v-model="formIncidente.dni"></b-form-input>
        </b-form-group>

        <b-form-group id="input-telefono" label="Teléfono:" label-for="telefono">
          <b-form-input
            :state="validateState('telefono')"
            id="telefono"
            type="text"
            placeholder="Telefono"
            v-model="formIncidente.telefono"
          ></b-form-input>
          <b-form-invalid-feedback id="input-2-live-feedback">Este campo es obligatorio.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-origen" label="Tipo de Origen:" label-for="origen">
          <b-form-select :options="origen" v-model="formIncidente.tipoOrigen">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group
          id="input-tipo-incidente"
          label="Tipo de Incidente:"
          label-for="tipo-incidente"
        >
          <b-form-select :options="incidentes" v-model="formIncidente.tipoIncidente">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-personal" label="Personal:" label-for="personal">
          <b-form-select :options="personal" v-model="formIncidente.personalSeguridad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-unidad" label="Unidad:" label-for="unidad">
          <b-form-select :options="unidad" v-model="formIncidente.unidad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapState } from "vuex";
import markerMaps from "@/components/Maps/markerMaps.vue";
import alertas from "@/components/alertas.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.initializeApp({ projectId: "hunter-seguro" }).firestore();

export default {
  mixins: [validationMixin],
  components: {
    markerMaps,
    VuePerfectScrollbar,
    alertas,
    StarRating,
  },
  data() {
    return {
      formIncidente: {
        nombres: null,
        dni: null,
        telefono: null,
        tipoOrigen: null,
        personalSeguridad: null,
        unidad: null,
        estado: "ENVIADO",
        tipoIncidente: null,
      },
      form: {
        id: null,
        observacion: null,
        estado: "ATENDIDO",
        atendidoSerenazgo: true,
        usuario: null,
        calificacionCiudadano: 1,
        imagen: null,
      },
      formPersonal: {
        id: null,
        personalSeguridad: null,
        unidad: null,
        estado: "ENVIADO",
      },
      settings6: {
        maxScrollbarLength: 60,
      },
      alertas: [],
      enviados: [],
      marker: {
        lat: -16.440132,
        lng: -71.559042,
      },
      zoom: 12,
      origen: [
        {
          text: "Telefonico",
          value: "TELEFONICO",
        },
        {
          text: "Patrullaje",
          value: "PATRULLAJE",
        },
      ],
      personalText: null,
      unidadText: null,
      alertasLen: 0,
    };
  },
  validations: {
    formIncidente: {
      telefono: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      unidad: (state) => state.unidad.unidad,
      personal: (state) => state.personal.personal,
      incidentes: (state) => state.incidentes.tipoIncidentes,
    }),
    getMarker() {
      return this.marker;
    },
  },
  mounted() {
    // this.getIncidentes();
    this.getIncidentesLen();
  },
  created() {
    this.getEnviados();
    this.getPersonal();
    this.getUnidad();
    this.getData();
  },
  methods: {
    handleFileUpload(e) {
      this.form.imagen = e.target.files[0];
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.formIncidente[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        id: null,
        observacion: null,
        estado: "ATENDIDO",
        atendidoSerenazgo: true,
        usuario: null,
        imagen: null,
      };

      this.formIncidente = {
        nombres: null,
        dni: null,
        telefono: null,
        tipoOrigen: null,
        personalSeguridad: null,
        unidad: null,
        estado: "ENVIADO",
        tipoIncidente: null,
      };

      this.formPersonal = {
        id: null,
        personalSeguridad: null,
        unidad: null,
        estado: "ENVIADO",
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    getPersonal() {
      const { dispatch } = this.$store;
      dispatch("personal/getPersonal");
    },
    getUnidad() {
      const { dispatch } = this.$store;
      dispatch("unidad/getUnidad");
    },
    getIncidentesLen() {
      db.collection("incidentes")
        .get()
        .then((doc) => {
          this.alertasLen = doc.size;
          this.getIncidentes();
        });
    },
    getIncidentes() {
      db.collection("incidentes")
        .orderBy("id", "desc")
        .onSnapshot((querySnapshot) => {
          if (querySnapshot.size > this.alertasLen) {
            this.showNotification();
            this.alertasLen = querySnapshot.size;
          }
          this.alertas = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.alertas.push(data);
          });
        });
    },
    getEnviados() {
      db.collection("enviados")
        .orderBy("id", "desc")
        .onSnapshot((querySnapshot) => {
          this.enviados = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.enviados.push(data);
          });
        });
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("incidentes/getTipoIncidentes");
    },
    goMap(position) {
      this.marker = position;
      this.zoom = 15;
    },
    enviado(id) {
      this.formPersonal.id = id;
      this.$bvModal.show("modal-enviado");
    },
    atendido(datos) {
      // console.log(datos);
      this.personalText = datos.personal;
      this.unidadText = datos.unidad;
      this.form.id = datos.id;
      this.$bvModal.show("modal-atendido");
    },
    bloquear(usuarioId, id) {
      const { dispatch } = this.$store;
      const payloadUser = {
        id: usuarioId,
        datos: { estado: "BLOQUEADO" },
      };
      dispatch("ciudadanos/updateCiudadanos", payloadUser);
      this.eliminarBloqueados(usuarioId);
    },
    fuera(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "FUERA_JURISDICCION" },
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(payload, "incidentes");
    },
    eliminarFireStore(form, collection, mover = false) {
      const { getters } = this.$store;
      var docData = db.collection(collection).where("id", "==", form.id);
      docData.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (mover) {
            let data = doc.data();
            const personal = getters["personal/getPersonal"](
              form.personalSeguridad
            );
            const unidad = getters["unidad/getUnidad"](form.unidad);
            data["personal"] = personal.text;
            data["unidad"] = unidad.text;
            db.collection("enviados").doc(doc.id).set(data);
          }
          doc.ref.delete();
        });
      });
    },
    eliminarBloqueados(id) {
      const { dispatch } = this.$store;
      var docData = db.collection("incidentes").where("usuarioId", "==", id);
      docData.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const id = doc.data().id;
          const payload = {
            id: id,
            datos: { estado: "CERRADO" },
          };
          dispatch("incidentes/updateIncidentes", payload);
          doc.ref.delete();
        });
      });
    },
    submitForm() {
      const { dispatch } = this.$store;
      const { form } = this;
      let formData = new FormData();

      form.usuario = this.$store.state.authentication.user.id;
      formData.append("observacion", form.observacion);
      formData.append("estado", form.estado);
      formData.append("atendidoSerenazgo", form.atendidoSerenazgo);
      formData.append("calificacionCiudadano", form.calificacionCiudadano);
      formData.append("usuario", form.usuario);
      if (form.imagen) formData.append("imagen", form.imagen);
      const payload = {
        id: form.id,
        datos: formData,
      };
      dispatch("incidentes/imagenIncidentes", payload);
      this.eliminarFireStore(form, "enviados");
      this.resetForm();
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$v.formIncidente.$touch();
      if (this.$v.formIncidente.$anyError) {
        return;
      }
      this.nuevoIncidente();
    },
    nuevoIncidente() {
      const { dispatch } = this.$store;
      const { formIncidente } = this;
      dispatch("incidentes/addIncidente", formIncidente);
      this.resetForm();
      this.$nextTick(() => {
        this.$bvModal.hide("modal-alertas");
      });
    },
    enviarPersonal() {
      const { dispatch } = this.$store;
      const { formPersonal } = this;

      const payload = {
        id: formPersonal.id,
        datos: formPersonal,
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(formPersonal, "incidentes", true);
      this.resetForm();
    },
    showNotification() {
      if (Notification.permission === "granted") {
        const notification = new Notification("Nuevo alerta", {
          body: "Se ha registrado una nueva alerta",
          icon: "yourimageurl.png",
        });
        notification.onclick = () => {
          window.location.href = "https://www.hunterseguro.com/app/alertas";
        };
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    },
  },
};
</script>


<style>
.scroll-bar-wrap {
  overflow: hidden;
}
.scroll-area {
  margin: auto;
  height: 600px;
}
</style>