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
            <p class="category">อสังหาฯ ปล่อยเช่า</p>
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
            <p class="category">อสังหาฯ ที่ถูกเช่า</p>
            <h3 class="title">
              {{ filterRented() }}
              <small>หลัง</small>
            </h3>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-33"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <i class="fa-solid fa-chalkboard"></i>
          </template>

          <template slot="content">
            <p class="category">อสังหาฯ ถูกระงับ</p>
            <h3 class="title">
              {{ filterSuspended() }}
              <small>หลัง</small>
            </h3>
          </template>
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
                    placeholder="ค้นหาอสังหาริมทรัพย์"
                    v-model="filter_text"
                  />
                  <div
                    class="input-group-append cursor-pointer"
                    @click="filterEstate"
                  >
                    <span class="input-group-text"
                      ><i class="fa-solid fa-magnifying-glass"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </md-card-header>
          <md-card-content>
            <div v-if="products.length > 0">
              <md-table
                v-model="products"
                :table-header-color="dataBackgroundColor"
              >
                <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                  <md-table-cell md-label="ลำดับ">{{
                    getOverAllIndex(index)
                  }}</md-table-cell>
                  <md-table-cell md-label="ชื่ออสังหาฯ">{{
                    item.estate_name
                  }}</md-table-cell>
                  <md-table-cell md-label="ประเภทอสังหาฯ">{{
                    item.estate_type
                  }}</md-table-cell>
                  <md-table-cell md-label="ราคา">{{
                    item.estate_price
                  }}</md-table-cell>
                  <md-table-cell md-label="พื้นที่/ตร.ม">{{
                    item.estate_area
                  }}</md-table-cell>
                  <md-table-cell md-label="ห้องนอน">{{
                    item.estate_bedrooms
                  }}</md-table-cell>
                  <md-table-cell md-label="ห้องนำ้">{{
                    item.estate_bathrooms
                  }}</md-table-cell>
                  <md-table-cell md-label="โรงรถ">{{
                    item.estate_garage
                  }}</md-table-cell>
                  <md-table-cell md-label="สถานะ" class="full-cell">
                    <div v-if="item.estate_status === 'available'">ว่าง</div>
                    <div v-else-if="item.estate_status === 'sold'">ขายแล้ว</div>
                    <div v-else-if="item.estate_status === 'suspended'">
                      ถูกระงับ
                    </div>
                    <div v-else-if="item.estate_status === 'rented'">เช่า</div>
                  </md-table-cell>
                </md-table-row>
              </md-table>
            </div>
            <div
              v-else
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <div class="w-250px">
                <img
                  class="w-100"
                  src="../../assets/img/estate/emptyproduct.png"
                  alt=""
                />
              </div>
              <div>
                <p class="kanit m-0">
                  <strong> ไม่พบอสังหาริมทรัพย์ของคุณ </strong>
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
      filter_text: "",
      busy: false,
      dataBackgroundColor: "blue",
      products: [],
      totalItems: null,
      totalPages: null,
      currentPage: 1,
      perPage: 8,
    };
  },
  methods: {
    filterEstate() {
      this.getListEstateAdmin();
    },
    changePage(numPage) {
      this.getListEstateAdmin(numPage);
    },
    getOverAllIndex(index) {
      return this.currentPage * 8 - 8 + index + 1;
    },
    getListEstateAdmin(page = null) {
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const bodyJson = {
        filter_text: this.filter_text,
        page: page ? page : this.currentPage,
      };
      this.busy = true;
      this.$axios
        .post(this.$API_URL + "/admin/list/estate", bodyJson, headers)
        .then((res) => {
          console.log("res: ", res);
          this.products = res.data.estate.estates;
          this.totalItems = res.data.estate.totalItems;
          this.currentPage = res.data.estate.currentPage;
          this.totalPages = res.data.estate.totalPages;
          console.log("this.products: ", this.products);
        })
        .finally(() => {
          this.busy = false;
        });
    },
    filterAvailable() {
      const filterlength = this.products.filter(
        (product) => product.estate_status === "available"
      );
      return filterlength.length;
    },
    filterRented() {
      const filterlength = this.products.filter(
        (product) => product.estate_status === "rented"
      );
      return filterlength.length;
    },
    filterSuspended() {
      const filterlength = this.products.filter(
        (product) => product.estate_status === "suspended"
      );
      return filterlength.length;
    },
  },
  mounted() {
    this.getListEstateAdmin();
    console.log("available: ", this.filterAvailable());
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
