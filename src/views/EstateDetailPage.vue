<template>
  <div class="detail-wrapper">
    <div class="detail-card">
      <div class="detail-header">
        <h1>Estate Name</h1>
        <div class="estate-status">
          <p>ว่าง/ไม่ว่าง</p>
        </div>
      </div>
      <div class="estate-rating">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="detail-price">
        <i class="fa-solid fa-tag"></i>
        <p>Estate Price</p>
      </div>
      <div class="detail-location">
        <i class="fa-solid fa-location-dot"></i>
        <p>Estate location</p>
      </div>
      <div class="estate-room">
        <div class="detail-bedroom">
          <i class="fa-solid fa-bed"></i>
          <p>N/A</p>
        </div>
        <div class="detail-bathroom">
          <i class="fa-solid fa-bath"></i>
          <p>N/A</p>
        </div>
      </div>
      <div class="estate-area">
        <div class="detail-floor">
          <i class="fa-solid fa-stairs"></i>
          <p>N/A</p>
        </div>
        <div class="detail-area">
          <i class="fa-solid fa-chart-area"></i>
          <p>N/A</p>
        </div>
      </div>
      <div class="detail-estate">
        <p>Estate Detail</p>
      </div>
      <div class="owner-wrapper">
        <div class="owner-detail">
          <div class="owner-pic">
            <div class="owner-avatar">
              <img src="../assets/img/user_avatar.png" alt="Profile picture" />
            </div>
          </div>
          <h2>Owner Name</h2>
          <p>ลงประกาศ : N/A</p>
          <div class="owner-contract">
            <div class="owner-phone">
              <i class="fa-solid fa-phone"></i>
              <p>เบอร์โทร : N/A</p>
            </div>
            <div class="owner-line">
              <i class="fa-brands fa-line"></i>
              <p>Line : N/A</p>
            </div>
            <div class="owner-email">
              <i class="fa-solid fa-envelope"></i>
              <p>Email : N/A</p>
            </div>
            <div class="chat-owner">
              <form>
                <input
                  class="chat-input"
                  type="text"
                  placeholder="แชทกับผู้ประกาศ..."
                />
                <button class="chat-button" type="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                  ส่ง
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-report">
        <button class="button-report">แจ้งรายงาน</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import url("@/assets/scss/detailstyle.scss");
</style>
