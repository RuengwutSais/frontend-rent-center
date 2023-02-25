<template>
    <div class="wrapper">
    <header class="header">
      <div class="coniainer-fluid">
        <div class="navb-logo">
          <img class="img-logo" src="@/assets/logo.png" alt="logo" />
        </div>
        <div class="navb-items">
          <div class="items">
            <button class="button-nav">ลงทะเบียน</button>
          </div>
          <div class="items">
            <button class="button-nav">เข้าสู่ระบบ</button>
          </div>
          <div class="mobile-toggler">
            <a href="#" data-toggle="modal" data-target="#navbarmodal">
              <i class="fa-solid fa-bars"></i>
            </a>
          </div>
        </div>
        <div
          class="modal fade"
          id="navbarmodal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <img
                  class="img-logo"
                  src="@/assets/logo.png"
                  alt="logo-mobile"
                />
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i class="fa-sharp fa-solid fa-xmark"></i>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <button class="modal-button">ลงทะเบียน</button>
                </div>
                <div>
                  <button class="modal-button">เข้าสู่ระบบ</button>
                </div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
        <dashboard-content> </dashboard-content>
    <footer class="footer">
        <div class="footer-container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
            <p class="company-name">Rent Central</p>
            <p>@ Copy Right</p>
            </div>
            <div class="col-sm-12 col-md-6">
            <ul class="footer-links">
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Terms of Service</a></li>
            </ul>
            </div>
        </div>
        </div>
    </footer>
    </div>
  </template>
  
  <script>
  import DashboardContent from "./Content.vue";
  
  export default {
    components: {
      DashboardContent,
    },
    data() {
      return {
        
      };
    },
    methods: {
      linktoPath(key) {
        this.$router.push({ path: `/${key}`})
      }
    }
  };
  </script>
  
<style scoped>
@import "@/assets/css/landingpage_style.css";
</style>