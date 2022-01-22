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
              <vuetable
                ref="vuetable"
                :api-url="apiBase"
                :query-params="makeQueryParams"
                :per-page="perPage"
                :reactive-api-url="true"
                :fields="fields"
                pagination-path
                :row-class="onRowClass"
                @vuetable:pagination-data="onPaginationData"
                @vuetable:row-clicked="rowClicked"
                @vuetable:cell-rightclicked="rightClicked"
              >
                <div slot="actions" slot-scope="props">
                  <b-button
                    variant="primary"
                    class="mb-3 mr-1"
                    @click="desbloquear(props.rowData.id)"
                  >Desbloquear</b-button>
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
      fields: [
        {
          name: "id",
          title: "ID",
          titleClass: "",
        },
        {
          name: "nombreCompleto",
          title: "Nombres",
          titleClass: "",
        },
        {
          name: "telefono",
          title: "Telefono",
          titleClass: "",
        },
        {
          name: "direccion",
          title: "Dirección",
          titleClass: "",
        },
        {
          name: "dni",
          title: "DNI",
          titleClass: "",
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
    makeQueryParams(sortOrder, currentPage, perPage) {
      this.selectedItems = [];
      return sortOrder[0]
        ? {
            sort: sortOrder[0]
              ? sortOrder[0].field + "|" + sortOrder[0].direction
              : "",
            page: currentPage,
            per_page: this.perPage,
            search: this.search,
          }
        : {
            page: currentPage,
            per_page: this.perPage,
            search: this.search,
          };
    },
    onRowClass(dataItem, index) {
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
    desbloquear(id) {
      const { dispatch } = this.$store;
      const payload = {
        id: id,
        datos: { estado: "ACTIVO" },
      };
      dispatch("ciudadanos/updateCiudadanos", payload);
      this.$refs.vuetable.refresh();
    },
  },
};
</script>