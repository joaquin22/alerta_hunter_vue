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
                <a v-b-modal.modal-alertas class="btn btn-primary pull-right m-l-10">Añadir Nuevo</a>
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

    <b-modal
      id="modal-alertas"
      title="Nuevo Incidentes"
      cancel-title="Cancelar"
      ok-title="Guardar"
      class="theme-modal"
    >
      <b-form>
        <b-form-group id="input-nombres" label="Nombre Completo:" label-for="nombres">
          <b-form-input id="nombres" type="text" placeholder="Nombre Completo"></b-form-input>
        </b-form-group>

        <b-form-group id="input-dni" label="DNI:" label-for="dni">
          <b-form-input id="dni" type="text" placeholder="DNI"></b-form-input>
        </b-form-group>

        <b-form-group id="input-telefono" label="Telefono:" label-for="telefono">
          <b-form-input id="telefono" type="text" placeholder="Telefono"></b-form-input>
        </b-form-group>

        <b-form-group id="input-origen" label="Tipo de Origen:" label-for="origen">
          <b-form-select :options="origen">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-personal" label="Personal:" label-for="personal">
          <b-form-select :options="personal">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-unidad" label="Unidad:" label-for="unidad">
          <b-form-select :options="unidad">
            <template #first>
              <b-form-select-option :value="null" disabled>Seleccione una opción</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group id="input-observacion" label="Observación:" label-for="observacion">
          <b-form-textarea id="observacion" placeholder="Observación" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
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
          key: "ciudadanoNombre",
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
      origen: [
        {
          text: "Aplicativo",
          value: "APLICATIVO",
        },
        {
          text: "Telefonico",
          value: "TELEFONICO",
        },
        {
          text: "Patrullaje",
          value: "PATRULLAJE",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      incidentes: (state) => {
        return state.incidentes.incidentes;
      },
      unidad: (state) => state.unidad.unidad,
      personal: (state) => state.personal.personal,
    }),
  },
  created() {
    this.getData();
    this.getPersonal();
    this.getUnidad();
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
    getPersonal() {
      const { dispatch } = this.$store;
      dispatch("personal/getPersonal");
    },
    getUnidad() {
      const { dispatch } = this.$store;
      dispatch("unidad/getUnidad");
    },
  },
};
</script>