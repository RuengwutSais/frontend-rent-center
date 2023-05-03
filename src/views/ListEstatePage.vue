<template>
  <div class="container">
    <div class="d-flex w-100">
      <div class="input-group mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="ค้นหาอสังหาริมทรัพย์"
          @keydown.enter="findEstate()"
        />
        <div class="input-group-append cursor-pointer">
          <span class="input-group-text"
            ><i class="fa-solid fa-magnifying-glass"></i
          ></span>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12 col-lg-4">
        <div class="select-type-estate">
          <label for="">ประเภทอสังหาฯ</label>
          <b-form-select
            v-model="search.typeSelect"
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
              <label for="">จังหวัด</label>
              <b-form-input
                v-model="search.province"
                placeholder="เลือกจังหวัด"
              ></b-form-input>
            </div>
            <div class="col-6">
              <label for="">อำเภอ/เขต</label>
              <b-form-input
                v-model="search.district"
                placeholder="เลือกอำเภอ/เขต"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-type-range-price mt-2">
          <div class="row">
            <div class="col-6">
              <label for="">ราคาต่ำสุด</label>
              <b-form-input
                v-model="search.price.minPrice"
                placeholder="กรอกราคาต่ำสุด"
              ></b-form-input>
            </div>
            <div class="col-6">
              <label for="">ราคาสูงสุด</label>
              <b-form-input
                v-model="search.price.maxPrice"
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
                v-model="search.tlm.min"
                placeholder="ขนาดพื้นที่ต่ำสุด"
              ></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input
                v-model="search.tlm.max"
                placeholder="ขนาดพื้นที่สูงสุด"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-tlv mt-2">
          <label for="">ขนาด : ตร.ว.</label>
          <div class="row">
            <div class="col-6">
              <b-form-input
                v-model="search.tlv.min"
                placeholder="ขนาดพื้นที่ต่ำสุด"
              ></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input
                v-model="search.tlv.max"
                placeholder="ขนาดพื้นที่สูงสุด"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-room-bed mt-2">
          <div class="row">
            <div class="col-6">
              <label for="">ห้องนอน</label>
              <b-form-select v-model="search.bedroom" :options="optionsBedroom">
                <template #first>
                  <b-form-select-option value="all"
                    >-- ทั้งหมด --</b-form-select-option
                  >
                </template>
              </b-form-select>
            </div>
            <div class="col-6">
              <label for="">ห้องน้ำ</label>
              <b-form-select v-model="search.toilet" :options="optionsToilet">
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
          <b-button variant="outline-primary" block>ค้นหา</b-button>
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
                <CardEstate class="cursor-pointer" :item="item" @click.native="pushDetailEstate(item.id)" />
              </div>
            </div>
          </div>
          <div class="center-pagination">
            <b-pagination
              v-model="currentPage"
              pills
              :total-rows="rows"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardEstate from "@/components/Cards/CardEstate.vue";
export default {
  components: {
    CardEstate,
  },
  data() {
    return {
      itemsEstate: {
        data: [
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+1",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+2",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+3",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+4",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+5",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+6",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+7",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+8",
          },
          {
            id: "1",
            price: "Condo price",
            name: "Condo name",
            location: "Condo location",
            bedroom: "N/A",
            bathroom: "N/A",
            garage: "N/A",
            area: "N/A",
            image: "https://via.placeholder.com/350x200?text=Estate+9",
          },
        ],
        perpage: 9,
        totalPages: 2,
        totalItems: 10,
        currentPage: 1,
      },
      search: {
        typeSelect: "all",
        price: { minPrice: 10000, maxPrice: 1000000 },
        province: "",
        district: "",
        tlm: { min: null, max: null },
        tlv: { min: null, max: null },
        bedroom: "all",
        toilet: "all",
      },
      optionsTypeSelect: [
        { value: "condo", text: "คอนโด" },
        { value: "townhouse", text: "ทาวน์เฮ้าส์" },
        { value: "panithome", text: "อาคารพาณิชย์" },
        { value: "townhome", text: "โฮมออฟฟิศ / ทาวน์โฮม" },
        { value: "onehome", text: "บ้านเดี่ยว" },
        { value: "couplehome", text: "บ้านแฝด" },
        { value: "apartment", text: "อพาร์ทเม้นท์" },
      ],
      optionsBedroom: [
        { value: "1", text: "1 ห้องนอน" },
        { value: "2", text: "2 ห้องนอน" },
        { value: "3", text: "3 ห้องนอน" },
        { value: "4", text: "4 ห้องนอน" },
        { value: "5", text: "มากกว่า 4 ห้องนอน" },
      ],
      optionsToilet: [
        { value: "1", text: "1 ห้องน้ำ" },
        { value: "2", text: "2 ห้องน้ำ" },
        { value: "3", text: "มากกว่า 2 ห้องนอน" },
      ],
      rows: 100,
      currentPage: 1,
    };
  },
  methods: {
    pushDetailEstate(key) {
      return this.$router.push({ path: `/estatedetail/${key}`});
    },
  },
};
</script>
<style lang="scss" scoped>
.mt-2 {
  margin-top: 2rem;
}
.border-left-solid {
  border-left: 2px solid #c4c0c0;
}
.center-pagination {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  margin: -5% auto;
}
.height-custom {
  height: 1150px;
}
</style>
