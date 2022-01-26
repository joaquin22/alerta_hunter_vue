<template>
  <div>
    <GmapMap
      :options="mapOptions"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 500px"
      ref="mapRef"
    >
      <GmapMarker
        v-if="isCreate"
        :position="getPosition"
        :draggable="true"
        @drag="updateCoordinates"
      />
      <GmapMarker v-else :position="marker" />
    </GmapMap>
  </div>
</template>
<script>
export default {
  props: {
    marker: {
      type: Object,
      default: function () {
        return {
          lat: -16.440132,
          lng: -71.559042,
        };
      },
    },
    zoom: {
      type: Number,
      default: 12,
    },
    isCreate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    getPosition() {
      return this.marker;
    },
  },
  watch: {
    marker(newValue) {
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({ lat: newValue.lat, lng: newValue.lng });
        map.setZoom(15);
      });
    },
  },
  data() {
    return {
      center: {
        lat: -16.440132,
        lng: -71.559042,
      },
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        disableDoubleClickZoom: false,
      },
    };
  },
  methods: {
    updateCoordinates(location) {
      const position = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      };
      this.$emit("create", position);
    },
  },
};
</script>