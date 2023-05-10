<template>
    <div>
      <BlockUI v-if="busy">
      <div class="loader-spinner"></div>
    </BlockUI>
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <div class="d-flex align-items-center justify-content-between row">
            <div class="col-12 col-lg-6">
              <div>
                <h4 class="title">ยกเลิกการระงับอสังหาริมทรัพย์</h4>
                <p class="category">ข้อมูลรายละเอียดของอสังหาริมทรัพย์ที่ถูกระงับ</p>
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
                <div class="input-group-append cursor-pointer" @click="findEstateSuspended">
                  <span class="input-group-text"
                    ><i class="fa-solid fa-magnifying-glass"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div v-if="users.length > 0">
            <md-table v-model="users" :table-header-color="dataBackgroundColor">
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="ลำดับ">{{ getOverAllIndex(index) }}</md-table-cell>
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
                  <div v-if="item.estate_status === 'available'">
                    ว่าง
                  </div>
                  <div v-else-if="item.estate_status === 'sold'">
                    ขายแล้ว
                  </div>
                  <div v-else-if="item.estate_status === 'suspended'">
                    ถูกระงับ
                  </div>
                  <div v-else-if="item.estate_status === 'rented'">
                    เช่า
                  </div>
                </md-table-cell>
                <md-table-cell md-label="จัดการ">
                  <div class="d-flex flex-row">
                    <div
                      class="w-100 mr-4 cursor-pointer"
                      @click="openModal('cancle-hold', item.estate_id)"
                    >
                    <i class="fa-solid fa-house-circle-check" style="font-size: 16px;"></i>
                    </div>
                  </div>
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
                <strong> ไม่พบอสังหาริมทรัพย์ </strong>
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
    <div class="modal-cancle-hold">
      <b-modal ref="ModalCancleHold" id="modal-cancle-hold" hide-header centered hide-footer>
        <template>
          <div
            class="d-flex align-items-center flex-column justify-content-center mt-3"
          >
            <div>
                <i class="fa-solid fa-triangle-exclamation" style="color: #df4759; font-size: 40px;"></i>
            </div>
            <h5>กรุณายืนยันการยกเลิกระงับอสังหาริมทรพย์</h5>
          </div>

          <div class="d-flex justify-content-center mt-3">
            <div>
              <b-button
                @click="close('close-cancle-hold')"
                style="
                  color: #fff;
                  background-color: #000;
                  border: 1px solid #000;
                  height: 2.5em;
                  width: 6em;
                  margin-right: 20px;
                  font-family: 'Kanit';
                "
              >
                ยกเลิก
              </b-button>
              <b-button
                variant="danger"
                @click="actionHold()"
                style="
                  color: #fff;
                  background-color: #df4759;
                  border: 1px solid #df4759;
                  height: 2.5em;
                  width: 6em;
                  margin-right: 20px;
                  font-family: 'Kanit';
                "
              >
                ถอนระงับ
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataBackgroundColor: "green",
      users: [
        {
          estate_id: 1,
          estate_name: "สิรินคอนโด",
          estate_type: "คอนโด",
          estate_location: "",
          estate_price: "1,500,000",
          estate_area: "60",
          estate_bedrooms: "2",
          estate_bathrooms: "4",
          estate_garage: "1",
          estate_description: "",
          estate_image: "",
          estate_status: "ไม่ว่าง",
          estate_user_id: "",
          gps_latitude: "",
          gps_longitude: "",
          province_id: "",
          geographies_id: "",
          amphures_id: "",
          districts_id: "",
          user: {
            user_id: "",
            phone: "0988482480",
            first_name: "พิธา",
            last_name: "ก้าวไกล",
          },
        },
      ],
      perPage: 8,
      totalItems: null,
      totalPages: null,
      currentPage: 1,
      filter_text: "",
      tempCancelId: null,
      busy: false,
    };
  },
  methods: {
    openModal(key, estateId) {
      if (key === "cancle-hold") {
        this.$bvModal.show("modal-cancle-hold");
        this.tempCancelId = estateId
      }
    },
    findEstateSuspended() {
      this.getsuspendedList()
    },
    changePage(numPage) {
      this.getsuspendedList(numPage)
    },
    getsuspendedList(page = null) {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      }
      const bodyJson = {
        filter_text: this.filter_text,
        page: page ? page : this.currentPage
      }
      this.busy = true;
      this.$axios.post(this.$API_URL + '/admin/list/onlysuspended', bodyJson, headers).then((res) => {
        console.log('res: ', res)
        this.users = res.data.estate.estates
        this.currentPage = res.data.estate.currentPage
        this.totalItems = res.data.estate.totalItems
        this.totalPages = res.data.estate.totalPages
        this.busy = false;
      })
    },
    actionHold() {
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      }
      this.$axios.post(this.$API_URL + `/admin/cancel/suspended/${this.tempCancelId}`, {}, headers).then((res) => {
        console.log('res cancel: ', res)
      }).finally(() => {
        this.$bvModal.hide("modal-cancle-hold");
        this.getsuspendedList()
      })
    },
    close(key) {
      if (key === "close-cancle-hold") {
        this.$bvModal.hide("modal-cancle-hold");
      }
    },
    getOverAllIndex(index) {
      return this.currentPage * this.perPage - this.perPage + index + 1;
    },
    formatPrice(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  mounted() {
    this.getsuspendedList()
  }
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