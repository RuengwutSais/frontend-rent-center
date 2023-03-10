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
            <div
              class="card"
            >
              <div class="card-img">
                <img :src="estate.image" alt="estate image" />
              </div>
              <div class="card-info">
                <div class="card-name">
                  <p>{{ estate.name }}</p>
                </div>
                <div class="card-price">
                  <i class="fa-solid fa-tag"></i><p>{{ estate.price }}</p>
                </div>
                <div class="card-location">
                  <i class="fa-solid fa-location-dot"></i><p>{{ estate.location }}</p>
                </div>
                <div class="estate-room">
                  <div class="card-bedroom">
                    <i class="fa-solid fa-bed"></i><p>{{ estate.bedroom }}</p>
                  </div>
                  <div class="card-bathroom">
                    <i class="fa-solid fa-bath"></i><p>{{ estate.bathroom }}</p>
                  </div>
                </div>
                <div class="estate-area">
                  <div class="card-floor">
                    <i class="fa-solid fa-stairs"></i><p>{{ estate.floor }}</p>
                  </div>
                  <div class="card-area">
                    <i class="fa-solid fa-chart-area"></i><p>{{ estate.area }}</p>
                  </div>
                </div>
              </div>
            </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
export default {
    props: {
        condos: [Object, Array]
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
