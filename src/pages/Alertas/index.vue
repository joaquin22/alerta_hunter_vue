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
          <VuePerfectScrollbar class="scroll-area" :settings="settings6">
            <alertas v-for="a in alertas" :key="a.id" :datos="a" @goMap="goMap" />
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
    alertasComputed() {
      return this.alertas;
    },
  },
  created() {
    this.getIncidentes();
  },
  methods: {
    getIncidentes() {
      db.collection("incidentes")
        .orderBy("id")
        .onSnapshot((querySnapshot) => {
          this.alertas = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.alertas.push(data);
          });
        });
    },
    goMap(position) {
      console.log(position);
      this.marker = position;
      this.zoom = 15;
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