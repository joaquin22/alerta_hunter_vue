<template>
  <div>
    <Breadcrumbs title="Alertas" />
    <div class="container-fluid">
      <div class="row user-cards">
        <div class="col-sm-12 col-xl-8">
          <b-card header-tag="div" title="Mapa">
            <b-card-text class="mb-0">
              <markerMaps :marker="marker" :zoom="zoom" />
            </b-card-text>
          </b-card>
        </div>
        <div class="col-sm-12 col-xl-4">
          <b-alert :show="alertasExists" variant="info">No hay mas alertas por atender</b-alert>
          <b-card no-body>
            <b-tabs card>
              <b-tab no-body title="Alertas">
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

              <b-tab no-body title="Enviados">
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
    <!-- AÑADIR MARCADOR MODAL -->
    <b-modal
      id="modal-atendido"
      title="Atendido"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
      @ok="submitForm"
    >
      <b-form>
        <b-form-group id="input-personal" label="Personal:" label-for="personal">
          <b-form-select :options="personal" v-model="form.personalSeguridad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-unidad" label="Unidad:" label-for="unidad">
          <b-form-select :options="unidad" v-model="form.unidad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
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
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import markerMaps from "@/components/Maps/markerMaps.vue";
import alertas from "@/components/alertas.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.initializeApp({ projectId: "hunter-seguro" }).firestore();

export default {
  components: {
    markerMaps,
    VuePerfectScrollbar,
    alertas,
  },
  data() {
    return {
      form: {
        id: null,
        personalSeguridad: null,
        unidad: null,
        observacion: null,
        estado: "ATENDIDO",
        atendidoSerenazgo: true,
        usuario: null,
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
    };
  },
  computed: {
    alertasExists() {
      if (this.alertas.length == 0) return true;
      else return false;
    },
    ...mapState({
      unidad: (state) => state.unidad.unidad,
      personal: (state) => state.personal.personal,
    }),
  },
  created() {
    this.form.usuario = this.$store.state.authentication.user.id;
    console.log(this.$store.state.authentication.user);
    this.getIncidentes();
    this.getEnviados();
    this.getPersonal();
    this.getUnidad();
  },
  methods: {
    getPersonal() {
      const { dispatch } = this.$store;
      dispatch("personal/getPersonal");
    },
    getUnidad() {
      const { dispatch } = this.$store;
      dispatch("unidad/getUnidad");
    },
    getIncidentes() {
      db.collection("incidentes")
        .orderBy("id", "desc")
        .onSnapshot((querySnapshot) => {
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
    goMap(position) {
      this.marker = position;
      this.zoom = 15;
    },
    enviado(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "ENVIADO" },
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(id, "incidentes", true);
    },
    atendido(id) {
      this.form.id = id;
      this.$bvModal.show("modal-atendido");
      // const { dispatch } = this.$store;
      // const payload = {
      //   id: id,
      //   datos: { estado: "ATENDIDO", atendidoSerenazgo: true },
      // };
      // dispatch("incidentes/updateIncidentes", payload);
      // this.eliminarFireStore(id, "enviados");
    },
    bloquear(usuarioId, id) {
      const { dispatch } = this.$store;
      const payloadUser = {
        id: usuarioId,
        datos: { estado: "BLOQUEADO" },
      };
      dispatch("ciudadanos/updateCiudadanos", payloadUser);
      const payload = {
        id: id,
        datos: { estado: "CERRADO" },
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(id, "incidentes");
    },
    fuera(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "FUERA_JURISDICCION" },
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(id, "incidentes");
    },
    eliminarFireStore(id, collection, mover = false) {
      var docData = db.collection(collection).where("id", "==", id);
      docData.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (mover) {
            db.collection("enviados").doc(doc.id).set(doc.data());
          }
          doc.ref.delete();
        });
      });
    },
    submitForm() {
      const { dispatch } = this.$store;
      const { form } = this;
      console.log(form);
      const payload = {
        id: form.id,
        datos: form,
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(form.id, "enviados");
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