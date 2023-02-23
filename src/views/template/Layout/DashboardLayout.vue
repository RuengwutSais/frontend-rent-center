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
      <sidebar-link to="/admin/user">
        <md-icon>person</md-icon>
        <p>ตั้งค่าบัญชี</p>
      </sidebar-link>
      <sidebar-link to="/admin/table">
        <md-icon>content_paste</md-icon>
        <p>อสังหาริมทรัพย์</p>
      </sidebar-link>
      <sidebar-link to="/admin/typography">
        <md-icon>library_books</md-icon>
        <p>ข้อความ</p>
      </sidebar-link>
      <sidebar-link to="/admin/icons">
        <md-icon>bubble_chart</md-icon>
        <p>ค้นหา</p>
      </sidebar-link>
      <sidebar-link to="/admin/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/admin/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>ออกจากระบบ</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/views/template/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import SidebarLink from '@/components/SidebarPlugin/SidebarLink.vue';

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin,
    SidebarLink
  },
  data() {
    return {
      sidebarBackground: "green",
    };
  },
  methods: {
    linktoPath(key) {
      this.$router.push({ path: `/${key}`})
    }
  }
};
</script>
