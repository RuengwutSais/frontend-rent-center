<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="card-title">{{ user.firstname }}  {{ user.lastname }}</h4>
      <b-button variant="primary">
        อัพโหลดรูปภาพ
      </b-button>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg"),
    },
    user: {
      type: Object,
    }
  },
  data() {
    return {};
  },
};
</script>
<style></style>
