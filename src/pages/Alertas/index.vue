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
      <div class="row">
        <div class="col-sm-12 col-xl-8">
          <b-card header-tag="div"></b-card>
        </div>
      </div>
    </div>
    <!-- AÑADIR MARCADOR MODAL -->
  </div>
</template>

<script>
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
  },
  created() {
    this.getIncidentes();
    this.getEnviados();
  },
  methods: {
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
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "ATENDIDO", atendidoSerenazgo: true },
      };
      dispatch("incidentes/updateIncidentes", payload);
      this.eliminarFireStore(id, "enviados");
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