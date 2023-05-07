<template>
  <div class="card">
    <div class="card-img">
      <img :src="item.image" alt="estate image" />
    </div>
    <div class="card-info">
      <div class="card-name">
        <p>{{ item.estate_name }}</p>
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <div class="card-price">
        <i class="fa-solid fa-tag"></i>
        <p>{{ formatMoney(item.estate_price) }}</p>
      </div>
      <div class="card-location">
        <i class="fa-solid fa-location-dot"></i>
        <p>{{ item.province }}</p>
      </div>
      <div class="estate-room">
        <div class="card-bedroom">
          <i class="fa-solid fa-bed"></i>
          <p>{{ item.estate_bedrooms }}</p>
        </div>
        <div class="card-bathroom">
          <i class="fa-solid fa-bath"></i>
          <p>{{ item.estate_bathrooms }}</p>
        </div>
      </div>
      <div class="estate-area">
        <div class="card-garage">
          <i class="fa-solid fa-warehouse"></i>
          <p>{{ item.estate_garage }}</p>
        </div>
        <div class="card-area">
          <i class="fa-solid fa-chart-area"></i>
          <p>{{ item.estate_area }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: [Object, Array],
  },
  methods: {
    formatMoney(num) {
      num = parseFloat(num);
      if (typeof num !== 'number' || isNaN(num)) {
        return '';
      }
      
      let parts = num.toFixed(0).toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join('.');
    },
  }
};
</script>
