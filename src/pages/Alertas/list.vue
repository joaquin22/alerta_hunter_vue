<template>
  <div>
    <Breadcrumbs title="Incidentes" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Incidentes</h5>
            </div>
            <div class="card-body">
              <b-row>
                <b-col xl="6" class="delete-datatable">
                  <b-input-group class="datatable-btn">
                    <b-form-input v-model="filter" placeholder="Buscar"></b-form-input>
                    <b-input-group-append>
                      <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>

                <b-col xl="6">
                  <json-excel :data="incidentes" :fields="json_fields" name="incidentes.xls">
                    <a class="btn btn-secondary pull-right m-l-10">Exportar Excel</a>
                  </json-excel>
                </b-col>
              </b-row>
              <div class="table-responsive datatable-vue">
                <b-table show-empty stacked="md" :items="incidentes" :fields="tablefields" :current-page="currentPage"
                  :per-page="perPage" :filter="filter">
                  <template #cell(actions)="row">
                    <b-button variant="secondary" class="mb-3 mr-1" @click="verMas(row.item)">
                      <i class="fa fa-eye pr-0"></i>
                    </b-button>
                  </template>
                </b-table>
              </div>

              <b-col md="6" class="p-0 mt-5">
                <b-pagination v-model="currentPage" :total-rows="incidentes.length" :per-page="perPage"
                  class="my-0"></b-pagination>
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="info-modal" title="Información" class="theme-modal" centered>
      <p>
        <strong>Ciudadano:</strong>
        {{ datos.ciudadano | uppercase }}
      </p>
      <p>
        <strong>Dni:</strong>
        {{ datos.dni }}
      </p>
      <p>
        <strong>Teléfono:</strong>
        {{ datos.telefono }}
      </p>
      <p>
        <strong>Fecha:</strong>
        {{ datos.fecha }}
      </p>
      <p>
        <strong>Tipo de Incidente:</strong>
        {{ datos.incidente | uppercase }}
      </p>
      <p>
        <strong>Calificación:</strong>
        <star-rating :max-rating="5" :star-size="30" v-model="datos.calificacion" :read-only="true"></star-rating>
      </p>
      <p>
        <strong>Estado:</strong>
        {{ datos.estado | uppercase }}
      </p>
      <p>
        <strong>Tipo de Origen:</strong>
        {{ datos.origen | uppercase }}
      </p>
      <p>
        <strong>Usuario que Atendio:</strong>
        {{ datos.usuario | uppercase }}
      </p>
      <p>
        <strong>Personal:</strong>
        {{ datos.personal | uppercase }}
      </p>
      <p>
        <strong>Unidad:</strong>
        {{ datos.unidad | uppercase }}
      </p>
      <p>
        <strong>Observación:</strong>
        {{ datos.observación | uppercase }}
      </p>
      <p>
        <strong>Imagen de evidencia:</strong>
        <br />
        <expandable-image v-if="datos.imagen" :src="datos.imagen" :closeOnBackgroundClick="true" />
        <label v-else>No subio una imagen</label>
        <!-- <b-img
          v-if="datos.imagen"
          :src="datos.imagen"
          fluid
          v-bind="mainProps"
          @click="mostrarImagen(datos.imagen)"
        ></b-img>-->
      </p>
    </b-modal>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapState } from "vuex";
import JsonExcel from "vue-json-excel";
export default {
  components: {
    StarRating,
    JsonExcel,
  },
  data() {
    return {
      mainProps: { width: 200, height: 200 },
      tablefields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        {
          key: "datosCiudadano.nombres",
          label: "Ciudadano",
          sortable: true,
          sortDirection: "desc",
          formatter: (value) => {
            return value ? value.toUpperCase() : value;
          },
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
          formatter: (value) => {
            return value ? value.toUpperCase() : value;
          },
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
          formatter: (value) => {
            return value ? value.toUpperCase() : value;
          },
        },
        {
          key: "tipoOrigen_display",
          label: "Tipo de origen",
          sortable: true,
          sortDirection: "desc",
          formatter: (value) => {
            return value ? value.toUpperCase() : value;
          },
        },
        { key: "actions", label: "Acciones" },
      ],
      json_fields: {
        ID: "id",
        Ciudadano: "datosCiudadano.nombres",
        Dni: "datosCiudadano.dni",
        Telefono: "datosCiudadano.telefono",
        Fecha: "fechaCreacion",
        "Tipo de Incidente": "tipoIncidente.titulo",
        Calificacion: "calificacion",
        Estado: "estado",
        Origen: "tipoOrigen_display",
        "Usuario que Atendio": "usuario_display",
        Personal: "personal_display",
        Unidad: "unidad_display",
        Observación: "observacion",
      },
      currentPage: 1,
      perPage: 10,
      filter: null,
      datos: {
        ciudadano: "",
        dni: "",
        telefono: "",
        fecha: "",
        incidente: "",
        calificacion: 0,
        estado: "",
        origen: "",
        usuario: "",
        personal: "",
        unidad: "",
        observación: "",
        imagen: "",
      },
    };
  },
  computed: {
    ...mapState({
      incidentes: (state) => {
        return state.incidentes.incidentes;
      },
    }),
  },
  filters: {
    uppercase: function (value) {
      if (value) return value.toUpperCase();
      return value;
    },
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
    verMas(item) {
      this.$bvModal.show("info-modal");
      this.datos = {
        ciudadano: item.datosCiudadano.nombres,
        dni: item.datosCiudadano.dni,
        telefono: item.datosCiudadano.telefono,
        fecha: item.fechaCreacion,
        incidente: item.tipoIncidente.titulo,
        calificacion: item.calificacion,
        estado: item.estado,
        origen: item.tipoOrigen_display,
        usuario: item.usuario_display,
        personal: item.personal_display,
        unidad: item.unidad_display,
        observación: item.observacion,
        imagen: item.imagen,
      };
    },
    mostrarImagen(url) {
      this.$swal({
        title: "Evidencia",
        imageUrl: url,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    },
  },
};
</script>