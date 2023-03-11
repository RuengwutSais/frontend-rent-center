<template>
  <div class="card">
    <div class="card-img">
      <img :src="item.image" alt="estate image" />
    </div>
    <div class="card-info">
      <div class="card-name">
        <p>{{ item.name }}</p>
      </div>
      <div class="card-price">
        <i class="fa-solid fa-tag"></i>
        <p>{{ item.price }}</p>
      </div>
      <div class="card-location">
        <i class="fa-solid fa-location-dot"></i>
        <p>{{ item.location }}</p>
      </div>
      <div class="estate-room">
        <div class="card-bedroom">
          <i class="fa-solid fa-bed"></i>
          <p>{{ item.bedroom }}</p>
        </div>
        <div class="card-bathroom">
          <i class="fa-solid fa-bath"></i>
          <p>{{ item.bathroom }}</p>
        </div>
      </div>
      <div class="estate-area">
        <div class="card-floor">
          <i class="fa-solid fa-stairs"></i>
          <p>{{ item.floor }}</p>
        </div>
        <div class="card-area">
          <i class="fa-solid fa-chart-area"></i>
          <p>{{ item.area }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        item: [Object, Array]
    },
}
</script>
