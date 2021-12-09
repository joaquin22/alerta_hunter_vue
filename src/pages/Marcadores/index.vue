<template>
  <div>
    <Breadcrumbs title="Marcadores" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Incidentes
                <a
                  v-b-modal.addMarcador
                  class="btn btn-primary pull-right m-l-10"
                >Añanir nuevo Marcador</a>
              </h5>
            </div>
            <div class="card-body">
              <b-table striped hover :items="marcadores" :fields="fields"></b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- AÑADIR MARCADOR MODAL -->
    <b-modal id="addMarcador" size="lg" title="Large Modal" class="theme-modal" centered>
      <markerMaps></markerMaps>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import markerMaps from "@/components/Maps/markerMaps.vue";
export default {
  components: {
    markerMaps,
  },
  data() {
    return {
      form: {
        titulo: "",
        area: "",
      },
      tipoArea: [
        { value: "SERENAZGO", text: "Serenazgo" },
        { value: "COMUNAL", text: "Comunal" },
      ],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "titulo",
          label: "Titulo",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "telefono",
          label: "Telefono",
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
    };
  },
  computed: {
    ...mapState({
      marcadores: (state) => state.marcadores.marcadores,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      dispatch("marcadores/getMarcadores");
    },
  },
};
</script>
