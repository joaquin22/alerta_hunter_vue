<template>
  <b-list-group-item
    href="#"
    class="flex-column align-items-start"
    :style="{ 'background-color': datos.color }"
    @click.stop="goMap"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1" :style="css">{{datos.tipo}}</h5>
      <small class="text-muted">
        <b-button variant="primary" v-if="enviados" @click.stop="atendido">Atendido</b-button>
        <b-dropdown variant="primary" id="dropdown-1" text="Acciones" size="sm" right v-else>
          <b-dropdown-item @click.stop="enviado">Enviado</b-dropdown-item>
          <b-dropdown-item @click.stop="confimacion('fuera')">Fuera de Jurisdicción</b-dropdown-item>
          <b-dropdown-item @click.stop="confimacion('bloquear')">Bloquear Usuario</b-dropdown-item>
        </b-dropdown>
      </small>
    </div>

    <p class="mb-1" :style="css">Nombres: {{datos.nombre}}</p>
    <p class="mb-1" :style="css">Nro. Documento: {{datos.dni}}</p>
    <p class="mb-1" :style="css">Telefono: {{datos.telefono}}</p>
    <p class="mb-1" v-show="datos.personal" :style="css">Personal: {{datos.personal}}</p>
    <p class="mb-1" v-show="datos.unidad" :style="css">Unidad: {{datos.unidad}}</p>
    <p class="mb-1" :style="css">Ubicación: {{datos.ubicacion}}</p>
  </b-list-group-item>
  <!-- <b-card class="card-alertas" :style="{ 'background-color': datos.color }" @click.stop="goMap">
    <b-card-title>{{datos.tipo}}</b-card-title>
    <b-card-text class="mb-0">
      Nombres: {{datos.nombre}}
      <br />
      Nro. Documento: {{datos.dni}}
      <br />
      Telefono: {{datos.telefono}}
      <br />
      Ubicación: {{datos.ubicacion}}
    
      <b-dropdown variant="primary" id="dropdown-1" text="Acciones" class="m-md-2">
        <b-dropdown-item @click.stop="enviado">Enviado</b-dropdown-item>
        <b-dropdown-item @click.stop="fuera">Fuera de Jurisdicción</b-dropdown-item>
        <b-dropdown-item @click.stop="bloquear">Bloquear Usuario</b-dropdown-item>
      </b-dropdown>
    </b-card-text>
  </b-card>-->
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
    enviados: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      css: {
        color: "white",
      },
    };
  },
  methods: {
    goMap() {
      let cooredenadas = this.datos.ubicacion.split(",");
      if (cooredenadas[0] == " - ") return;
      const position = {
        lat: parseFloat(cooredenadas[0]),
        lng: parseFloat(cooredenadas[1]),
      };
      this.$emit("goMap", position);
    },
    enviado() {
      this.$emit("enviado", this.datos.id);
    },
    atendido() {
      this.$emit("atendido", this.datos);
    },
    bloquear() {
      this.$emit("bloquear", this.datos.usuarioId, this.datos.id);
    },
    fuera() {
      this.$emit("fuera", this.datos.id);
    },
    confimacion(fnc) {
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
          this[fnc]();
        }
      });
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