<template>
  <div>
    <carousel
      :per-page="perPage"
      :mouse-drag="false"
      navigation-enabled
      navigation-next="<i class='fa fa-chevron-right'></i>"
      navigation-previous="<i class='fa fa-chevron-left'></i>"
    >
      <slide
        data-index="index"
        data-name="MySlideName"
        @slideclick="handleSlideClick"
        v-for="(estate, index) in condos"
        :key="index"
      >
        <CardEstate :item="estate" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import CardEstate from "@/components/Cards/CardEstate.vue"
export default {
  components: {
    CardEstate
  },
  props: {
    condos: [Object, Array],
  },
  computed: {
    perPage() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1200) {
        return 4;
      } else if (screenWidth >= 768) {
        return 3;
      } else {
        return 1;
      }
    },
  },
  methods: {
    handleSlideClick(dataset) {
      console.log(dataset.index, dataset.name);
    },
  },
};
</script>
