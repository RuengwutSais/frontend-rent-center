<template>
  <div class="wrapper">
    <div class="header">
      <div class="coniainer-fluid">
        <div class="navb-logo">
          <img class="img-logo" src="@/assets/RentCentral-logo.png" @click="onPush()" alt="logo" />
        </div>
        <div class="navb-items">
          <div v-if="!isUser" class="d-flex flex-row">
            <div class="items">
              <button class="button-nav" @click="redirectPath('/register')">
                ลงทะเบียน
              </button>
            </div>
            <div class="items">
              <button class="button-nav" @click="redirectPath('/login')">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
          <div v-else>
            <div v-if="user.image" class="">
              <img class="img" :src="user.image" />
            </div>
            <div v-else>
              <div>
                <b-dropdown
                  size="lg"
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template #button-content>
                    <i class="fa-solid fa-user-tie"></i>
                  </template>
                  <b-dropdown-item href="/manage">ภาพรวมอสังหาริมทรัพย์</b-dropdown-item>
                  <b-dropdown-item href="/manage/user">ตั้งค่าโปรไฟล์</b-dropdown-item>
                  <b-dropdown-item @click="logout"
                    >ออกจากระบบ</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </div>
          </div>
          <!-- hamberker mobile -->
          <div class="mobile-toggler" v-if="!isUser">
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
          v-if="!isUser"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
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
                  <button
                    class="modal-button"
                    @click="redirectPath('/register')"
                  >
                    ลงทะเบียน
                  </button>
                </div>
                <div>
                  <button class="modal-button" @click="redirectPath('/login')">
                    เข้าสู่ระบบ
                  </button>
                </div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="margin-4rem padding-bottom-5rem">
      <router-view></router-view>
    </div>
    <div class="footer-layout">
      <div class="footer-container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <p class="company-name">Rent Central</p>
            <p>@ Copy Right</p>
          </div>
          <div class="col-sm-12 col-md-6">
            <ul class="footer-links">
              <li><a href="/privacy" target="_blank">นโยบายคุ้มครองข้อมูลส่วนบุคคล</a></li>
              <li><a href="/termofservice" target="_blank">ข้อตกลงผู้ให้บริการ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        image: ''
      },
      isUser: false
    };
  },
  watch: {
    $route: function(){
      this.isUserLogin()
    }
  },
  methods: {
    onPush() {
      this.$router.push('/')
    },
    async isUserLogin() {
      const profiles = await JSON.parse(localStorage.getItem("profiles"));
      if (profiles) {
        this.isUser = true
      }else {
        this.isUser = false
      }
    },
    redirectPath(path) {
      return this.$router.push(path);
    },
    async logout() {
      this.$axios.post(this.$API_URL + '/logout')
      await localStorage.removeItem('profiles');
      if(this.$router.currentRoute.path === '/landingpage'){
        window.location.reload();
      }
      if(!JSON.parse(localStorage.getItem('profiles'))){
        this.$router.push('/landingpage');
      }
    }
  },
  mounted() {
    this.isUserLogin()
  }
};
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/_headerstyle.scss");
@import url("@/assets/scss/_footerstyle.scss");
</style>
