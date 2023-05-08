<template>
  <div class="layout-style-header">
    <div class="wrapper">
      <div class="header">
        <div class="coniainer-fluid">
          <div class="navb-logo">
            <img
              class="img-logo"
              src="@/assets/RentCentral-logo.png"
              @click="onPush()"
              alt="logo"
            />
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
              <div>
                <div style="display: flex; justify-content: center; align-items: center;">
                  <div v-if="user.first_name" style="display: flex; align-items: center;">
                    <img class="img" :src="user.image" />
                    <div style="margin-right: 5px; color: #000;">{{ user.first_name }} {{ user.last_name }}</div>
                  </div>
                  <b-dropdown
                    size="lg"
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                  >
                    <template #button-content>
                      <i class="fa-solid fa-user-tie"></i>
                      <i
                        class="fa-solid fa-sort-down"
                        style="margin-left: 5px"
                      ></i>
                    </template>
                    <b-dropdown-item href="/manage"
                      >ภาพรวมอสังหาริมทรัพย์</b-dropdown-item
                    >
                    <b-dropdown-item v-if="isRoleAdmin" href="/admin">
                      เมนู admin
                    </b-dropdown-item>
                    <b-dropdown-item href="/manage/user"
                      >ตั้งค่าโปรไฟล์</b-dropdown-item
                    >
                    <b-dropdown-item @click="logout"
                      >ออกจากระบบ</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </div>
            </div>
            <!-- hamberker mobile -->
            <!-- <div class="mobile-toggler">
              <a href="#" data-toggle="modal" data-target="#navbarmodal">
                <i class="fa-solid fa-bars"></i>
              </a>
            </div> -->
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
                    <button
                      class="modal-button"
                      @click="redirectPath('/login')"
                    >
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
                <li>
                  <a href="/privacy" target="_blank"
                    >นโยบายคุ้มครองข้อมูลส่วนบุคคล</a
                  >
                </li>
                <li>
                  <a href="/termofservice" target="_blank"
                    >ข้อตกลงผู้ให้บริการ</a
                  >
                </li>
              </ul>
            </div>
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
        image: "",
        first_name: "",
        last_name: "",
      },
      isUser: false,
    };
  },
  watch: {
    $route: function () {
      this.isUserLogin();
    },
  },
  computed: {
    isRoleAdmin() {
      const adminRole = JSON.parse(localStorage.getItem("profiles"))
      return adminRole.role === "ADMIN" ? true : false
    }
  },
  methods: {
    onPush() {
      this.$router.push("/");
    },
    async isUserLogin() {
      const profiles = await JSON.parse(localStorage.getItem("profiles"));
      if (profiles) {
        this.isUser = true;
        this.getProfileName()
      } else {
        this.isUser = false;
      }
    },
    redirectPath(path) {
      return this.$router.push(path);
    },
    async logout() {
      // const headers = {
      //   headers: {
      //     token: localStorage.getItem("token")
      //   }
      // }
      // await this.$axios.post(this.$API_URL + "/logout", headers).then((res) => {
      //     console.log('res:', res)
      // });
      await localStorage.removeItem("profiles");
      await localStorage.removeItem("token");
      if (this.$router.currentRoute.path === "/landingpage") {
        window.location.reload();
      }
      if (!JSON.parse(localStorage.getItem("profiles"))) {
        this.$router.push("/landingpage");
      }
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    getProfileName(){
      const getProfileName = window.localStorage.getItem("profiles");
      const formatToString = JSON.parse(getProfileName);
      this.user.first_name = formatToString.first_name;
      this.user.last_name = formatToString.last_name;
    }
  },
  mounted() {
    this.isUserLogin();
    console.log('admin : ', this.isRoleAdmin())
  },
};
</script>
<style lang="scss" scoped>
@import url("@/assets/scss/_headerstyle.scss");
@import url("@/assets/scss/_footerstyle.scss");

@media only screen and (max-width: 767px) {
  .header .coniainer-fluid {
    padding-right: 10px;
  }

  .navb-logo {
    padding-left: 10px !important;
  }
}
</style>
