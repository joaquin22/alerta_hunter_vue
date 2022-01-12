<template>
  <div>
    <Breadcrumbs title="Alertas" />
    <div class="container-fluid">
      <div class="row user-cards">
        <div class="col-sm-12 col-xl-8">
          <b-card header-tag="div">
            <b-card-text class="mb-0">
              <markerMaps :marker="marker" :zoom="zoom" />
            </b-card-text>
          </b-card>
        </div>
        <div class="col-sm-12 col-xl-4">
          <b-alert show variant="info" v-show="alertasExists">No hay mas alertas por atender</b-alert>

          <VuePerfectScrollbar class="scroll-area" :settings="settings6">
            <alertas
              v-for="a in alertas"
              :key="a.id"
              :datos="a"
              @goMap="goMap"
              @atendido="atendido"
            />
          </VuePerfectScrollbar>
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

const db = firebase.initializeApp({ projectId: "alerta-2056a" }).firestore();

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
    goMap(position) {
      this.marker = position;
      this.zoom = 15;
    },
    atendido(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { atendidoSerenazgo: true },
      };
      dispatch("incidentes/updateIncidentes", payload);
      var jobskill_query = db.collection("incidentes").where("id", "==", id);
      jobskill_query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    },
  },
  //   firestore: {
  //     alertas: db.collection("incidentes"),
  //   },
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