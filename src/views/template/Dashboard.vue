<template>
  <div class="content content-padding">
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
              25
              <small>หลัง</small>
            </h3>
          </template>

          <!-- <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Last 24 Hours
            </div>
          </template> -->
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
              12
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
            <i class="fa-solid fa-chalkboard"></i>
          </template>

          <template slot="content">
            <p class="category">อสังหาฯ ถูกคอมเม้นต์</p>
            <h3 class="title">2 หลัง</h3>
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
              <md-table
                v-model="users"
                :table-header-color="dataBackgroundColor"
              >
                <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                  <md-table-cell md-label="ลำดับ">{{ index }}</md-table-cell>
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
                  <md-table-cell md-label="สถานะ">{{
                    item.estate_status
                  }}</md-table-cell>
                </md-table-row>
              </md-table>
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
      dataBackgroundColor: "blue",
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
        },
      ],
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
  methods: {
    getOverAllIndex(index) {
      return this.search.page * 25 - 25 + index + 1;
    },
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
