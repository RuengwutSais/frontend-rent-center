<template>
  <div class="content content-padding">
    <BlockUI v-if="busy">
      <div class="loader-spinner"></div>
    </BlockUI>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <i class="fa-solid fa-house"></i>
          </template>

          <template slot="content">
            <p class="category">อสังหาริมทรัพย์ ที่ปล่อยเช่า</p>
            <h3 class="title">
              {{ filterAvailable() }}
              <small>หลัง</small>
            </h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <i class="fa-solid fa-house-user"></i>
          </template>

          <template slot="content">
            <p class="category">อสังหาริมทรัพย์ ที่ถูกเช่า</p>
            <h3 class="title">
              {{ filterRented() }}
              <small>หลัง</small>
            </h3>
          </template>

          <!-- <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">warning</md-icon>
              <a href="#pablo">Get More Space...</a>
            </div>
          </template> -->
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fa-solid fa-flag"></i>
          </template>

          <template slot="content">
            <p class="category">อสังหาริมทรัพย์ ที่ถูกระงับ</p>
            <h3 class="title">
              {{ filterSuspended() }}
              <small>หลัง</small>
            </h3>
          </template>

          <!-- <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template> -->
        </stats-card>
      </div>
      <div class="md-layout-item md-size-100">
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <div class="d-flex align-items-center justify-content-between row">
              <div class="col-12 col-lg-6">
                <div>
                  <h4 class="title">รายการอสังหาริมทรัพย์</h4>
                  <p class="category">ข้อมูลรายละเอียดของอสังหาริมทรัพย์</p>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="input-group mt-4 w-100">
                  <input
                    type="text"
                    class="form-control"
                    v-model="filter_text"
                    placeholder="ค้นหาอสังหาริมทรัพย์"
                  />
                  <div class="input-group-append cursor-pointer" @click="getListMyEstate(currentPage)">
                    <span class="input-group-text"
                      ><i class="fa-solid fa-magnifying-glass"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
          <div>
            <div v-if="products.length > 0">
              <md-table
              v-model="products"
              :table-header-color="dataBackgroundColor"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="ลำดับ">{{
                  getOverAllIndex(index)
                }}</md-table-cell>
                <md-table-cell md-label="ชื่ออสังหาริมทรัพย์">{{
                  item.estate_name
                }}</md-table-cell>
                <md-table-cell md-label="ประเภทอสังหาริมทรัพย์">{{
                  item.estate_type
                }}</md-table-cell>
                <md-table-cell md-label="ราคา">{{
                  formatPrice(item.estate_price)
                }}</md-table-cell>
                <md-table-cell md-label="พื้นที่/ตร.ม">{{
                  item.estate_area
                }}</md-table-cell>
                <md-table-cell md-label="ห้องน้ำ">{{
                  item.estate_bathrooms
                }}</md-table-cell>
                <md-table-cell md-label="ห้องนอน">{{
                  item.estate_bedrooms
                }}</md-table-cell>
                <md-table-cell md-label="ที่จอดรถ">{{
                  item.estate_garage
                }}</md-table-cell>
                <md-table-cell md-label="สถานะ">
                  <div v-if="item.estate_status === 'available'">
                      ให้เช่า
                  </div>
                  <div v-else-if="item.estate_status === 'sold'">
                      ขายแล้ว
                  </div>
                  <div v-else-if="item.estate_status === 'suspended'">
                      ถูกระงับ
                  </div>
                  <div v-else-if="item.estate_status === 'rented'">
                      เช่าแล้ว
                  </div>
                </md-table-cell>
              </md-table-row>
              </md-table>
            </div>
            <div v-else class="d-flex flex-column justify-content-center align-items-center">
              <div class="w-250px">
                <img class="w-100" src="@/assets/img/estate/emptyproduct.png" alt="">
              </div>
              <div>
                <p class="kanit m-0">
                  <strong>
                    ไม่พบอสังหาริมทรัพย์ของคุณ
                  </strong>
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalItems"
                :per-page="perPage"
                @change="changePage"
                prev-icon="prevIcon"
                next-icon="nextIcon"
                first-icon="firstIcon"
                last-icon="lastIcon"
              ></b-pagination>
            </div>
          </div>
        </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StatsCard } from "@/components";

export default {
  name: "DashboardView",
  components: {
    StatsCard,
  },
  data() {
    return {
      estateStatus: [],
      dataBackgroundColor: "blue",
      busy: false,
      products: [],
      totalItems: null,
      totalPages: null,
      currentPage: 1,
      perPage: 8,
      filter_text: "",
    };
  },
  methods: {
    changePage(key) {
      this.getListMyEstate(key);
    },
    async getListMyEstate(page = null) {
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const bodyJson = {
        filter_text: this.filter_text,
        page: page ? page : this.currentPage,
      };
      this.busy = true
      await this.$axios
        .post(this.$API_URL + "/get/list/estate", bodyJson, headers)
        .then((res) => {
          console.log("res", res);
          this.products = res.data.estate.estates ;
          this.currentPage = res.data.estate.currentPage;
          this.totalItems = res.data.estate.totalItems;
          this.totalPages = res.data.estate.totalPages;
        }).finally(() => {
          this.busy = false
        })
    },
    filterAvailable() {
      const filterlength = this.estateStatus.find(
        (product) => product.estate_status === "available"
      );
      return filterlength && filterlength.count ? filterlength.count : 0;
    },
    filterRented() {
      const filterlength = this.estateStatus.find(
        (product) => product.estate_status === "rented"
      );
      return filterlength && filterlength.count ? filterlength.count : 0;
    },
    filterSuspended() {
      const filterlength = this.estateStatus.find(
        (product) => product.estate_status === "suspended"
      );
      return filterlength && filterlength.count ? filterlength.count : 0;
    },
    getOverAllIndex(index) {
      return this.currentPage * 8 - 8 + index + 1;
    },
    formatPrice(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    getAllstatus() {
      const header = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      this.$axios.post(this.$API_URL + '/status/estate', {},header).then((res) => {
        console.log('res.data.data: ', res.data.estate)
        this.estateStatus = res.data.estate
      })
    }
  },
  async mounted() {
    await this.getListMyEstate();
    this.getAllstatus()
  },
};
</script>

<style lang="scss" scoped>
.drop-box-shadow {
  // border: 1px solid black;
  border-radius: 1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0 12px 20px -10px;
}
.input-group input {
  border-radius: 0.7em;
}

.input-group-text {
  border-radius: 0.7em;
}
</style>
