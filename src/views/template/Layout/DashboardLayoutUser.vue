<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :sidebar-item-color="sidebarBackground"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/manage/dashboard">
        <md-icon>dashboard</md-icon>
        <p>ภาพรวม</p>
      </sidebar-link>
      <sidebar-link to="/manage/user">
        <md-icon>person</md-icon>
        <p>ตั้งค่าบัญชี</p>
      </sidebar-link>
      <sidebar-link to="/manage/estate">
        <md-icon>content_paste</md-icon>
        <p>จัดการอสังหาริมทรัพย์</p>
      </sidebar-link>
      <sidebar-link to="/manage/chatuser">
        <md-icon>library_books</md-icon>
        <p>ข้อความ</p>
      </sidebar-link>
      <div @click="logout" class="active-pro">
        <sidebar-link to="/landingpage" >
        <md-icon>unarchive</md-icon>
        <p>ออกจากระบบ</p>
        </sidebar-link>
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
