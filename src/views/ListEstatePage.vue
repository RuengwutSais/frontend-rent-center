<template>
  <div class="container">
    <div class="d-flex w-100">
      <div class="input-group mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="ค้นหาอสังหาริมทรัพย์"
          v-model="filter_text"
          @click="findEstate"
          @keydown.enter="findEstate"
        />
        <div class="input-group-append cursor-pointer">
          <span class="input-group-text"
            ><i class="fa-solid fa-magnifying-glass"></i
          ></span>
        </div>
      </div>
    </div>
    <div class="row mt-3 height-1350px">
      <div class="col-12 col-lg-4">
        <div class="select-type-estate">
          <label for="">ประเภทอสังหาฯ</label>
          <b-form-select
            v-model="search.estate_type"
            :options="optionsTypeSelect"
            class="mt-2"
          >
            <template #first>
              <b-form-select-option value="all"
                >-- ประเภทอสังหาริมทรัพย์ทั้งหมด --</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
        <div class="select-city mt-2">
          <div class="row">
            <div class="col-6">
              <label for="">ตำบล</label>
              <b-form-input
                v-model="search.state"
                placeholder="เลือกตำบล/แขวง"
              ></b-form-input>
            </div>
            <div class="col-6">
              <label for="">อำเภอ/เขต</label>
              <b-form-input
                v-model="search.districts"
                placeholder="เลือกอำเภอ/เขต"
              ></b-form-input>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <label for="">จังหวัด</label>
              <b-form-input
                v-model="search.province"
                placeholder="เลือกจังหวัด"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-type-range-price mt-2">
          <div class="row">
            <div class="col-6">
              <label for="">ราคาต่ำสุด</label>
              <b-form-input
                v-model="search.estate_price.start"
                placeholder="กรอกราคาต่ำสุด"
              ></b-form-input>
            </div>
            <div class="col-6">
              <label for="">ราคาสูงสุด</label>
              <b-form-input
                v-model="search.estate_price.end"
                placeholder="กรอกราคาสูงสุด"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-tlm mt-2">
          <label for="">ขนาด : ตร.ม.</label>
          <div class="row">
            <div class="col-6">
              <b-form-input
                v-model="search.estate_area.start"
                placeholder="ขนาดพื้นที่ต่ำสุด"
              ></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input
                v-model="search.estate_area.end"
                placeholder="ขนาดพื้นที่สูงสุด"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-room-bed mt-2">
          <div class="row">
            <div class="col-12">
              <label for="">ที่จอดรถ</label>
              <b-form-select v-model="search.estate_garage" :options="optionsGarage">
              </b-form-select>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label for="">ห้องนอน</label>
              <b-form-select v-model="search.estate_bedrooms" :options="optionsBedroom">
                <template #first>
                  <b-form-select-option value="all"
                    >-- ทั้งหมด --</b-form-select-option
                  >
                </template>
              </b-form-select>
            </div>
            <div class="col-6">
              <label for="">ห้องน้ำ</label>
              <b-form-select v-model="search.estate_bathrooms" :options="optionsToilet">
                <template #first>
                  <b-form-select-option value="all"
                    >-- ทั้งหมด --</b-form-select-option
                  >
                </template>
              </b-form-select>
            </div>
          </div>
        </div>
        <div class="button-summit mt-4">
          <b-button variant="outline-primary" @click="findEstate" block>ค้นหา</b-button>
        </div>
      </div>
      <div class="col-12 col-lg-8 border-left-solid position-relative">
        <div class="height-custom">
          <div class="estate-list">
            <div class="row">
              <div
                v-for="(item, index) in itemsEstate.data"
                :key="index"
                class="col-lg-4 col-md-6 col-sm-6 mt-2"
              >
                <CardEstate class="cursor-pointer w-100 height-fixed-350px" :item="item" @click.native="pushDetailEstate(item.estate_id)" />
              </div>
            </div>
          </div>
          <div class="center-pagination">
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
      </div>
    </div>
  </div>
</template>

<script>
import CardEstate from "@/components/Cards/CardEstate.vue";
let debounceTimer;
export default {
  components: {
    CardEstate,
  },
  data() {
    return {
      filter_text: "",
      itemsEstate: {
        data: []
      },
      search: {
        estate_type: null,
        estate_price: { start: 1000, end: 10000000 },
        province: "",
        districts: "",
        state: "",
        estate_area: { start: null, end: null },
        estate_bedrooms: null,
        estate_bathrooms: null,
        estate_garage: null,
      },
      optionsTypeSelect: [
        { value: null, text: "กรุณาเลือกประเภทอสังหาริมทรัพย์" },
        { value: "คอนโด", text: "คอนโด" },
        { value: "บ้านเดี่ยว", text: "บ้านเดี่ยว" },
        { value: "ทาวน์เฮ้าส์", text: "ทาวน์เฮ้าส์" },
        { value: "อพาร์ทเมนท์", text: "อพาร์ทเมนท์" },
      ],
      optionsBedroom: [
        { value: null, text: "กรุณาเลือกจำนวนห้องนอน" },
        { value: "1", text: "1 ห้องนอน" },
        { value: "2", text: "2 ห้องนอน" },
        { value: "3", text: "3 ห้องนอน" },
        { value: "4", text: "4 ห้องนอน" },
        { value: "5", text: "มากกว่า 4 ห้องนอน" },
      ],
      optionsGarage: [
        { value: null, text: "กรุณาเลือกจำนวนที่จอดรถ" },
        { value: "1", text: "1 ที่จอดรถ" },
        { value: "2", text: "2 ที่จอดรถ" },
        { value: "3", text: "มากกว่า 2 ที่จอดรถ" },
      ],
      optionsToilet: [
        { value: null, text: "กรุณาเลือกจำนวนห้องน้ำ" },
        { value: "1", text: "1 ห้องน้ำ" },
        { value: "2", text: "2 ห้องน้ำ" },
        { value: "3", text: "มากกว่า 2 ห้องน้ำ" },
      ],
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      perPage: 9,
    };
  },
  methods: {
    changePage(key) {
      this.getListEstateAll(key)
    },
    pushDetailEstate(key) {
      return this.$router.push({ path: `/estatedetail/${key}`});
    },
    async getListEstateAll(page = null) {
      const bodyJson = {
        filter_text: this.filter_text ? this.filter_text : "",
        estate_area: {
          start: parseInt(this.search.estate_area.start),
          end: parseInt(this.search.estate_area.end)
        },
        estate_type: this.search.estate_type,
        province: this.search.province ? this.search.province : null,
        state: this.search.state ? this.search.state : null,
        districts: this.search.districts ? this.search.districts : null,
        estate_price: {
          start: parseInt(this.search.estate_price.start),
          end: parseInt(this.search.estate_price.end)
        },
        estate_bedrooms: this.search.estate_bedrooms,
        estate_bathrooms: this.search.estate_bathrooms,
        estate_garage: this.search.estate_garage,
        page: page ? page : this.currentPage
      }
      console.log('bodyJson', bodyJson)
      await this.$axios.post(this.$API_URL + '/list/estate', bodyJson).then((res) => {
        this.itemsEstate.data = res.data.estate.estates
        this.currentPage = res.data.estate.currentPage
        this.totalItems = res.data.estate.totalItems
        this.totalPages = res.data.estate.totalPages
      })
    },
    findEstate() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.getListEstateAll();
      }, 500);
    }
  },
  mounted() {
    this.filter_text = this.$route.query.filter_text ? this.$route.query.filter_text : ""  
    this.search.estate_type = this.$route.query.estate_type ? this.$route.query.estate_type : null
    this.getListEstateAll()
  }
};
</script>
<style lang="scss" scoped>
// .height-1350px {
//   height: 1350px;
// }
.height-fixed-350px {
  height: 400px;
}
.mt-2 {
  margin-top: 2rem;
}
.border-left-solid {
  border-left: 2px solid #c4c0c0;
}
@media (max-width: 768px) {
  .border-left-solid {
    border-left: none;
  }
}
.center-pagination {
  // position: absolute;
  // left: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // transform: translate(-50%, -50%);
  margin-top: 10%;
}
// .height-custom {
//   height: 1150px;
// }
</style>
