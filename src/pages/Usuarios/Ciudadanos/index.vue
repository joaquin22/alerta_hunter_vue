<template>
  <div>
    <Breadcrumbs title="Ciudadanos" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Ciudadanos</h5>
            </div>
            <div class="card-body">
              <b-row>
                <b-col xl="10" class="delete-datatable">
                  <b-input-group class="datatable-btn">
                    <b-form-input v-model="filter" placeholder="Buscar por Nombres" class="mr-3"></b-form-input>
                    <b-button
                      variant="success"
                      :disabled="!filter"
                      @click="setFilter(filter)"
                      class="mr-1"
                    >Buscar</b-button>
                    <b-button variant="primary" @click="limpiar">Limpiar</b-button>
                  </b-input-group>
                </b-col>
              </b-row>
              <div class="table-responsive datatable-vue">
                <vuetable
                  ref="vuetable"
                  :api-url="apiBase"
                  :query-params="makeQueryParams"
                  :per-page="perPage"
                  :reactive-api-url="true"
                  :fields="fields"
                  :append-params="moreParams"
                  pagination-path
                  @vuetable:pagination-data="onPaginationData"
                >
                  <div slot="actions" slot-scope="props">
                    <b-button
                      variant="primary"
                      class="mb-3 mr-1"
                      @click.stop="confimacion('desbloquear',props.rowData.id)"
                      v-if="props.rowData.estado=='BLOQUEADO'"
                    >Desbloquear</b-button>
                    <b-button
                      variant="danger"
                      class="mb-3 mr-1"
                      @click.stop="confimacion('bloquear',props.rowData.id)"
                      v-if="props.rowData.estado=='ACTIVO'"
                    >Bloquear</b-button>
                  </div>
                </vuetable>
                <vuetable-pagination-bootstrap
                  class="mt-4"
                  ref="pagination"
                  @vuetable-pagination:change-page="onChangePage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../../../constants/config";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePaginationBootstrap from "../../../components/Common/VuetablePaginationBootstrap";
export default {
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
  },
  data() {
    return {
      isLoad: false,
      apiBase: apiUrl + "/ciudadanos/",
      sort: "",
      page: 1,
      perPage: 10,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      selectedItems: [],
      filter: "",
      moreParams: {},
      fields: [
        {
          name: "id",
          title: "ID",
          titleClass: "",
          sortField: "id",
        },
        {
          name: "nombreCompleto",
          title: "Nombres",
          titleClass: "",
          sortField: "nombreCompleto",
        },
        {
          name: "telefono",
          title: "Teléfono",
          titleClass: "",
          sortField: "telefono",
        },
        {
          name: "direccion",
          title: "Dirección",
          titleClass: "",
          sortField: "direccion",
        },
        {
          name: "dni",
          title: "DNI",
          titleClass: "",
          sortField: "dni",
        },
        {
          name: "estado",
          title: "Estado",
          titleClass: "",
        },
        {
          name: "actions",
          title: "Acciones",
          titleClass: "",
        },
      ],
    };
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    },
  },
  created() {},
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    makeQueryParams(sortOrder, currentPage) {
      this.selectedItems = [];
      let query = {};

      if (sortOrder[0] != undefined) {
        query = {
          order_by: sortOrder[0].field,
          page_no: currentPage,
          per_page: this.perPage,
        };
        if (sortOrder[0].direction == "desc") {
          query["order_type"] = "-";
        }
      } else {
        query = {
          page_no: currentPage,
          per_page: this.perPage,
        };
      }

      return query;
      // return sortOrder[0]
      //   ? {
      //       order_by: sortOrder[0] ? sortOrder[0].field : "",
      //       order_type: sortOrder[0] ? sortOrder[0].field : "",
      //       page_no: currentPage,
      //       per_page: this.perPage,
      //     }
      //   : {
      //       page_no: currentPage,
      //       per_page: this.perPage,
      //     };
    },
    onRowClass(dataItem) {
      if (this.selectedItems.includes(dataItem.id)) {
        return "selected";
      }
      return "";
    },

    rowClicked(dataItem, event) {
      const itemId = dataItem.id;
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map((item) => {
            return item.id;
          })
        );
        this.selectedItems = [...new Set(this.selectedItems)];
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter((x) => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    rightClicked(dataItem, field, event) {
      event.preventDefault();
      if (!this.selectedItems.includes(dataItem.id)) {
        this.selectedItems = [dataItem.id];
      }
      this.$refs.contextmenu.show({ top: event.pageY, left: event.pageX });
    },

    changePageSize(perPage) {
      this.perPage = perPage;
      this.$refs.vuetable.refresh();
    },

    searchChange(val) {
      this.search = val;
      this.$refs.vuetable.refresh();
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map((x) => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    confimacion(fnc, id) {
      this.$swal({
        text: `¿Esta seguro que desea continuar ?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this[fnc](id);
        }
      });
    },
    bloquear(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "BLOQUEADO" },
      };
      dispatch("ciudadanos/updateCiudadanos", payload).then(() => {
        this.$nextTick(() => {
          this.$refs.vuetable.refresh();
        });
      });
    },
    desbloquear(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "ACTIVO" },
      };
      dispatch("ciudadanos/updateCiudadanos", payload).then(() => {
        this.$nextTick(() => {
          this.$refs.vuetable.refresh();
        });
      });
    },
    setFilter(filterText) {
      this.moreParams = {
        nombreCompleto: filterText,
      };
      this.$nextTick(() => {
        this.$refs.vuetable.refresh();
      });
    },
    limpiar() {
      this.filter = "";
      this.setFilter("");
    },
  },
};
</script>