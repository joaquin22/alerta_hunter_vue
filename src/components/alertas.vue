<template>
  <b-card class="card-alertas" :style="{ 'background-color': datos.color }" @click.stop="goMap">
    <b-card-title>{{datos.tipo}}</b-card-title>
    <b-card-text class="mb-0">
      Nombres: {{datos.nombre}}
      <br />
      Nro. Documento: {{datos.id}}
      <br />
      Telefono: {{datos.telefono}}
      <br />
      Ubicación: {{datos.ubicacion}}
      <b-button pill variant="primary" @click.stop="atendido">Atendido</b-button>
    </b-card-text>
  </b-card>
</template>


<script>
export default {
  props: {
    datos: {
      type: Object,
      default: function () {
        return {
          id: "",
          nombre: "",
          dni: "",
          tipo: "",
          ubicacion: "",
          nivel: "",
          color: "primary",
        };
      },
    },
  },
  methods: {
    goMap() {
      let cooredenadas = this.datos.ubicacion.split(",");
      const position = {
        lat: parseFloat(cooredenadas[0]),
        lng: parseFloat(cooredenadas[1]),
      };
      this.$emit("goMap", position);
    },
    atendido() {
      this.$emit("atendido", this.datos.id);
    },
  },
};
</script>
<style>
.card-alertas {
  margin-bottom: 5px !important;
  cursor: pointer;
}
</style>