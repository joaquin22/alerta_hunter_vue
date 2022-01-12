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
              <b-table striped hover :items="usuarios"></b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    ...mapState({
      usuarios: (state) => state.ciudadanos.ciudadanos,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const { dispatch } = this.$store;
      const payload = {
        currentPage: this.currentPage,
        perPage: this.perPage,
      };
      dispatch("ciudadanos/getCiudadanos", payload);
    },
  },
};
</script>