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
              <b-form-input v-model="search.province" placeholder="เลือกจังหวัด"></b-form-input>
            </div>
            <div class="col-6">
              <label for="">อำเภอ/เขต</label>
              <b-form-input v-model="search.district" placeholder="เลือกอำเภอ/เขต"></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-type-range-price mt-2">
          <div class="row">
            <div class="col-6">
              <label for="">ราคาต่ำสุด</label>
              <b-form-input v-model="search.price.minPrice" placeholder="กรอกราคาต่ำสุด"></b-form-input>
            </div>
            <div class="col-6">
              <label for="">ราคาสูงสุด</label>
              <b-form-input v-model="search.price.maxPrice" placeholder="กรอกราคาสูงสุด"></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-tlm mt-2">
          <label for="">ขนาด : ตร.ม.</label>
          <div class="row">
            <div class="col-6">
              <b-form-input v-model="search.tlm.min" placeholder="ขนาดพื้นที่ต่ำสุด"></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input v-model="search.tlm.max" placeholder="ขนาดพื้นที่สูงสุด"></b-form-input>
            </div>
          </div>
        </div>
        <div class="select-tlm mt-2">
          <label for="">ขนาด : ตร.ว.</label>
          <div class="row">
            <div class="col-6">
              <b-form-input v-model="search.tlv.min" placeholder="ขนาดพื้นที่ต่ำสุด"></b-form-input>
            </div>
            <div class="col-6">
              <b-form-input v-model="search.tlv.max" placeholder="ขนาดพื้นที่สูงสุด"></b-form-input>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8 border-left-solid position-relative">
        <div class="center-pagination">
          <b-pagination v-model="currentPage" pills :total-rows="rows"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        typeSelect: "",
        price: { minPrice: 10000, maxPrice: 1000000 },
        province: '',
        district: '',
        tlm: { min: null, max: null},
        tlv: { min: null, max: null}
      },
      optionsTypeSelect: [
        { value: "A", text: "Option A (from options prop)" },
        { value: "B", text: "Option B (from options prop)" },
      ],
      rows: 100,
      currentPage: 1
    };
  },
  methods: {
    findEstate() {},
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
</style>
