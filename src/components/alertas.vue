<template>
  <b-card header-tag="div" :bg-variant="datos.color" class="h-25 card-alertas" @click="goMap">
    <h6>{{datos.tipo}}</h6>
    <b-card-text class="mb-0">
      Nombres: {{datos.nombre}}
      <br />
      Nro. Documento: {{datos.dni}}
      <br />
      Ubicación: {{datos.ubicacion}}
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
        lat: parseInt(cooredenadas[0]),
        lng: parseInt(cooredenadas[1]),
      };
      this.$emit("goMap", position);
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