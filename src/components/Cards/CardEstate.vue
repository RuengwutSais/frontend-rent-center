<template>
  <div class="card">
    <div class="card-img">
      <img :src="linkImage(item.estate_image)" alt="estate image" />
      <div class="card-status">
        <div class="estate-status"  v-if="item.estate_status === 'available'" style="background: linear-gradient(60deg, #69b66d, #43a047);">
          <p>
            <strong>ว่าง</strong>
          </p>
        </div>
        <div v-else-if="item.estate_status === 'rented'" class="estate-status"  style="background: linear-gradient(60deg, #df4759, #CC0000 );">
          <p>
            <strong>ไม่ว่าง</strong>
          </p>
        </div>
        <div v-else-if="item.estate_status === 'suspended'" class="estate-status"  style="background: linear-gradient(60deg, #ffa726, #fb8c00);">
          <p>
            <strong>ถูกระงับ</strong>
          </p>
        </div>
        <div v-else-if="item.estate_status === 'sold'" class="estate-status"  style="background: linear-gradient(60deg, #26c6da, #00acc1);">
          <p>
            <strong>ขายแล้ว</strong>
          </p>
        </div>
      </div>
    </div>
    <div class="card-info">
      <div class="card-name">
        <p>{{ truncatedText(item.estate_name) }}</p>
        <div v-if="item.estate_verify === 'verify'">
          <i class="fa-solid fa-circle-check"></i>
        </div>
      </div>
      <div class="card-price">
        <i class="fa-solid fa-tag"></i>
        <p>{{ formatMoney(item.estate_price) }}</p>
      </div>
      <div class="card-location">
        <i class="fa-solid fa-location-dot"></i>
        <p>{{ item.province }}</p>
      </div>
      <div class="card-bottom">
        <div class="estate-room">
        <div class="card-bedroom">
          <i class="fa-solid fa-bed"></i>
          <p>{{ item.estate_bedrooms }} ห้องนอน</p>
        </div>
        <div class="card-bathroom">
          <i class="fa-solid fa-bath"></i>
          <p>{{ item.estate_bathrooms }} ห้องนำ้</p>
        </div>
      </div>
      <div class="estate-area">
        <div class="card-garage">
          <i class="fa-solid fa-warehouse"></i>
          <p>{{ item.estate_garage }} โรงรถ</p>
        </div>
        <div class="card-area">
          <i class="fa-solid fa-chart-area"></i>
          <p>{{ item.estate_area }} ตร.ม</p>
        </div>
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
    linkImage(images) {
      const jsonData = JSON.parse(images);
      const updatedData = jsonData.map(image => image.replace(/\\/g, "/"));
      return this.$API_URL +  '/' + updatedData[0]
    },
    truncatedText(text) {
      if (text.length > 50) {
        return text.slice(0, 50) + "...";
      } else {
        return text;
      }
    },
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
