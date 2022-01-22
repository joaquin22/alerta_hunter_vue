<template>
  <div>
    <Breadcrumbs title="Incidentes" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>
                Incidentes
                <json-excel :data="incidentes" :fields="json_fields">
                  <a class="btn btn-primary pull-right m-l-10">Exportar Excel</a>
                </json-excel>
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive datatable-vue">
                <b-table
                  show-empty
                  stacked="md"
                  :items="incidentes"
                  :fields="tablefields"
                  :current-page="currentPage"
                  :per-page="perPage"
                ></b-table>
              </div>

              <b-col md="6" class="p-0 mt-5">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="incidentes.length"
                  :per-page="perPage"
                  class="my-0"
                ></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import JsonExcel from "vue-json-excel";

export default {
  components: {
    JsonExcel,
  },
  data() {
    return {
      tablefields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        {
          key: "datosCiudadano.nombres",
          label: "Ciudadano",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "fechaCreacion",
          label: "Fecha",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "tipoIncidente.titulo",
          label: "Incidente",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "calificacion",
          label: "Calificación",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "estado_display",
          label: "Estado",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "tipoOrigen_display",
          label: "Tipo de origen",
          sortable: true,
          sortDirection: "desc",
        },
      ],
      json_fields: {
        ID: "id",
        Ciudadano: "ciudadanoNombre",
        Fecha: "fechaCreacion",
        "Tipo de Incidente": "tipoIncidente.titulo",
      },
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    ...mapState({
      incidentes: (state) => {
        return state.incidentes.incidentes;
      },
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    getData() {
      const { dispatch } = this.$store;
      dispatch("incidentes/getIncidentes");
    },
  },
};
</script>