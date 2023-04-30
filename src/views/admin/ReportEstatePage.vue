<template>
  <div>
    <div class="md-layout-item md-size-100">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <div class="d-flex align-items-center justify-content-between row">
            <div class="col-12 col-lg-6">
              <div>
                <h4 class="title">อสังหาริมทรัพย์ที่ถูกรายงาน</h4>
                <p class="category">
                  ข้อมูลรายละเอียดของอสังหาริมทรัพย์ที่ถูกรายงาน
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-6">
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
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div>
            <md-table v-model="users" :table-header-color="dataBackgroundColor">
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="ลำดับรายงาน">{{
                  index
                }}</md-table-cell>
                <md-table-cell md-label="ชื่ออสังหาฯ">{{
                  item.estate.estate_name
                }}</md-table-cell>
                <md-table-cell md-label="ประเภทอสังหาฯ">{{
                  item.estate.estate_type
                }}</md-table-cell>
                <md-table-cell md-label="สถานะ">{{
                  item.estate.estate_status
                }}</md-table-cell>
                <md-table-cell md-label="ชื่อ-นามสกุล">{{
                  item.user.first_name + " " + item.user.last_name
                }}</md-table-cell>
                <md-table-cell md-label="รายละเอียด">{{
                  item.description
                }}</md-table-cell>
              </md-table-row>
            </md-table>
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
      users: [
        {
          report_id: 1,
          estate: {
            estate_id: 1,
            estate_name: "สิรินคอนโด",
            estate_type: "คอนโด",
            estate_location: "",
            estate_price: "",
            estate_area: "",
            estate_bedrooms: "",
            estate_bathrooms: "",
            estate_garage: "",
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
          },
          user: {
            user_id: "",
            phone: "0988482480",
            first_name: "พิธา",
            last_name: "ก้าวไกล",
          },
          description: "ไม่สะอาดเลย 8 ปีแล้ว",
        },
      ],
    };
  },
  methods: {
    getOverAllIndex(index) {
      return this.search.page * 25 - 25 + index + 1;
    },
  },
};
</script>

<style lang="scss">
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
