<template>
  <div>
    <BlockUI v-if="busy">
      <div class="loader-spinner"></div>
    </BlockUI>
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <div class="d-flex align-items-center justify-content-between row">
            <div class="col-12 col-lg-12">
              <div>
                <h4 class="title">อสังหาริมทรัพย์ที่ถูกรายงาน</h4>
                <p class="category">
                  ข้อมูลรายละเอียดของอสังหาริมทรัพย์ที่ถูกรายงาน
                </p>
              </div>
            </div>
            <!-- <div class="col-12 col-lg-6">
              <div class="input-group mt-4 w-100">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ค้นหาอสังหาริมทรัพย์"
                />
                <div class="input-group-append cursor-pointer">
                  <span class="input-group-text"
                    ><i class="fa-solid fa-magnifying-glass"></i
                  ></span>
                </div>
              </div>
            </div> -->
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="users.length > 0">
            <md-table v-model="users" :table-header-color="dataBackgroundColor">
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="ลำดับรายงาน">{{
                  getOverAllIndex(index)
                }}</md-table-cell>
                <md-table-cell
                  md-label="วันที่รายงาน"
                  class="created-at-cell"
                  >{{ formatDateThai(item.created_at) }}</md-table-cell
                >
                <md-table-cell md-label="ชื่อ-สกุล (ผู้รายงาน)">{{
                  item.user.first_name + " " + item.user.last_name
                }}</md-table-cell>
                <md-table-cell md-label="เบอร์โทรศัพท์ (ผู้รายงาน)">{{
                  item.user.phone
                }}</md-table-cell>
                <md-table-cell md-label="ชื่ออสังหาฯ">{{
                  item.estate.estate_name
                }}</md-table-cell>
                <md-table-cell md-label="ประเภทอสังหาฯ">{{
                  item.estate.estate_type
                }}</md-table-cell>
                <md-table-cell md-label="สถานะ">
                  <div v-if="item.estate.estate_status === 'available'">
                    ว่าง
                  </div>
                  <div v-else-if="item.estate.estate_status === 'sold'">
                    ขายแล้ว
                  </div>
                  <div v-else-if="item.estate.estate_status === 'suspended'">
                    ถูกระงับ
                  </div>
                  <div v-else-if="item.estate.estate_status === 'rented'">
                    เช่า
                  </div>
                </md-table-cell>
                <md-table-cell md-label="ชื่อ-นามสกุล (เจ้าของอสังหาฯ)">{{
                  item.estate.user.first_name + " " + item.estate.user.last_name
                }}</md-table-cell>
                <md-table-cell md-label="เบอร์โทรศัพท์ (เจ้าของอสังหาฯ)">{{
                  item.estate.user.phone
                }}</md-table-cell>
                <md-table-cell md-label="รายละเอียด">{{
                  item.description
                }}</md-table-cell>
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
</template>

<script>
export default {
  data() {
    return {
      dataBackgroundColor: "orange",
      users: [],
      totalItems: null,
      totalPages: null,
      currentPage: 1,
      perPage: 8,
      busy: false,
    };
  },
  methods: {
    changePage(key) {
      this.getAllReport(key);
    },
    getOverAllIndex(index) {
      return this.currentPage * 8 - 8 + index + 1;
    },
    async getAllReport(page = null) {
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const bodyJson = {
        currentPage: page ? page : this.currentPage,
      };
      this.busy = true;
      await this.$axios
        .post(this.$API_URL + "/all/report", bodyJson, headers)
        .then((res) => {
          console.log("res: ", res);
          this.users = res.data.report.reports;
          this.totalItems = res.data.report.totalItems;
          this.totalPages = res.data.report.totalPages;
          this.currentPage = res.data.report.currentPage;
          this.busy = false;
        });
    },
    formatDateThai(datenow) {
      let date = new Date(datenow);
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    formatPrice(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
    this.getAllReport();
  },
};
</script>

<style lang="scss">
.created-at-cell {
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drop-box-shadow {
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
