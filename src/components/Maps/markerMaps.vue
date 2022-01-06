<template>
  <div>
    <GmapMap :center="marker" :zoom="12" style="width: 100%; height: 500px">
      <GmapMarker :position="marker" :draggable="true" @drag="updateCoordinates" />
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
          lat: -16.39889,
          lng: -71.535,
        };
      },
    },
  },
  data() {
    return {
      center: {
        lat: -16.39889,
        lng: -71.535,
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