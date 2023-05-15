<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :sidebar-item-color="sidebarBackground"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/dashboard">
        <md-icon>dashboard</md-icon>
        <p>ภาพรวม</p>
      </sidebar-link>
      <sidebar-link to="/admin/reportestate">
        <md-icon>content_paste</md-icon>
        <p>รายงานอสังหาฯ</p>
      </sidebar-link>
      <sidebar-link to="/admin/holdestate">
        <i class="fa-solid fa-house-flag" style="color: #000; margin-left: 4px;"></i>
        <p>ระงับอสังหาฯ</p>
      </sidebar-link>
      <sidebar-link to="/admin/canclehold">
        <i class="fa-solid fa-house-circle-check" style="color: #000; margin-left: 4px"></i>
        <p>ยกเลิกระงับอสังหาฯ</p>
      </sidebar-link>
      <div class="active-pro px-4">
        <b-button class="w-100" @click="logout" style="background-color: #FFF; border-color: #FFF; display: flex; align-items: center; margin-top: 16px;">
        <md-icon>unarchive</md-icon>
        <p>ออกจากระบบ</p>
        </b-button>
      </div>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/views/template/Layout/MobileMenu.vue";
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue';


export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
    SidebarLink
  },
  data() {
    return {
      sidebarBackground: "green",
    };
  },
  methods: {
    async logout() {
      // const headers = {
      //   headers: {
      //     token: localStorage.getItem("token")
      //   }
      // }
      // await this.$axios.post(this.$API_URL + "/logout", headers).then((res) => {
      //     console.log('res:', res)
      // });
      await localStorage.removeItem('profiles');
      await localStorage.removeItem('token');
      if(this.$router.currentRoute.path === '/landingpage'){
        window.location.reload();
      }
      if(!JSON.parse(localStorage.getItem('profiles'))){
        this.$router.push('/landingpage');
      }
    },
    linktoPath(key) {
      this.$router.push({ path: `/${key}`})
    }
  }
};
</script>
