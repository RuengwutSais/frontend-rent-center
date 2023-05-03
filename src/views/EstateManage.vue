<template>
  <div>
    <div class="md-layout-item md-size-100" v-if="stepPage === 'listEstate'">
      <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
          <div class="d-flex align-items-center justify-content-between row">
            <div class="col-12 col-lg-6">
              <div>
                <h4 class="title">อสังหาริมทรัพย์</h4>
                <p class="category">
                  ข้อมูลรายละเอียดอสังหาริมทรัพย์ทั้งหมดของคุณ
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="input-group mt-4">
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
            <div class="col-12 col-lg-6">
              <div class="mt-4">
                <b-button
                  class="d-flex justify-content-center align-items-center w-25"
                  style="
                    color: #fff;
                    background-color: #000;
                    border: 1px solid #000;
                    height: 2em;
                  "
                  @click="goToListState('addEstate')"
                >
                  <i class="fa-solid fa-plus"></i>
                </b-button>
              </div>
            </div>
          </div>
        </md-card-header>
        <md-card-content>
          <div>
            <md-table v-model="users" :table-header-color="dataBackgroundColor">
              <md-table-row slot="md-table-row" slot-scope="{ item, index }">
                <md-table-cell md-label="ลำดับ">{{ index }}</md-table-cell>
                <md-table-cell md-label="ชื่อ - นามสกุล">{{
                  item.name
                }}</md-table-cell>
                <md-table-cell md-label="ประเภทอสังหาฯ">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="ราคา">{{ item.salary }}</md-table-cell>
                <md-table-cell md-label="พื้นที่">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="ห้องน้ำ">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="ห้องนอน">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="โรงรถ">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="สถานะ">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="รูปภาพ">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="จัดการ">
                  <div class="d-flex flex-row">
                    <div class="w-100 mr-4 cursor-pointer">
                      <i
                        class="fa-solid fa-pen-to-square"
                        @click="goToListState('editEstate')"
                      ></i>
                    </div>
                    <div class="w-100 cursor-pointer">
                      <i
                        class="fa-solid fa-trash-can"
                        @click="openModal('trash')"
                      ></i>
                    </div>
                  </div>
                </md-table-cell>
              </md-table-row>
            </md-table>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div
      class="md-layout-item md-size-100 py-3"
      v-if="stepPage === 'addEstate'"
    >
      <div class="d-flex justify-content-start">
        <div class="cursor-pointer" @click="goToListState('listEstate')">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          <span>ย้อนกลับ</span>
        </div>
      </div>
      <div class="drop-box-shadow px-3 py-3 mt-2">
        <div class="">
          <h2 style="font-weight: 900">เพิ่มอสังหาริมทรัพย์</h2>
        </div>
        <div class="row">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ชื่ออสังหา ฯ </label>
            <b-form-input
              v-model="addEstate.name"
              placeholder="กรุณาใส่ชื่ออสังหาฯ"
              :class="{ 'is-invalid': $v.addEstate.name.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> ตำบล/แขวง</label>
            <thai-address-input type="subdistrict"
            v-model="addEstate.state"
            input-class="form-control"
            placeholder="กรุณากรอกตำบล/แขวง"
            @selected="onSelected"></thai-address-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> อำเภอ/เขต </label>
            <thai-address-input type="district"
              v-model="addEstate.district"
              input-class="form-control"
              placeholder="กรุณากรอกอำเภอหรือเขต"
              @selected="onSelected"></thai-address-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ราคา </label>
            <b-form-input
              v-model="addEstate.price"
              placeholder="กรุณาใส่ราคาอสังหาฯ"
              @input="inputFormPrice($event, 'addEstate')"
              :class="{ 'is-invalid': $v.addEstate.price.$error }"
            ></b-form-input>
          </div>
           <div class="col-lg-3 col-sm-12">
            <label for=""> จังหวัด </label>
            <thai-address-input
              type="province"
              v-model="addEstate.province"
              input-class="form-control"
              placeholder="กรุณาพิมจังหวัด"
              @selected="onSelected"></thai-address-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> รหัสไปรษณีย์ </label>
            <thai-address-input type="district"
            v-model="addEstate.zipcode"
            input-class="form-control"
            placeholder="กรุณารหัสไปรษณีย์"
            @selected="onSelected"></thai-address-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ประเภทอสังหาฯ </label>
            <b-form-input
              v-model="addEstate.typeEstate"
              placeholder="ประเภทอสังหาริมทรัพย์"
            ></b-form-input>
          </div>
          <div class="col-lg-6 col-sm-12">
            <label for=""> ที่อยู่ </label>
            <b-form-input
              v-model="addEstate.address"
              placeholder="กรอกที่อยู่"
              :class="{ 'is-invalid': $v.addEstate.address.$error }"
            ></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-3 col-sm-12">
            <label for=""> ตารางเมตร </label>
            <b-form-input
              v-model="addEstate.typeEstate"
              placeholder="ประเภทอสังหาริมทรัพย์"
            ></b-form-input>
          </div>
          <div class="col-3"></div>
          <div class="col-lg-6 col-sm-12 align-self-end mt-4">
            <b-button
              block
              variant="success"
              @click="$bvModal.show('modal-gps')"
            >
              <i
                class="fa-solid fa-map-location-dot"
                style="color: #ffffff"
              ></i>
              ปักหมุดอสังหาฯ
            </b-button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องนอน </label>
            <b-form-input
              v-model="addEstate.bedroom"
              placeholder=""
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องน้ำ </label>
            <b-form-input
              v-model="addEstate.bathroom"
              placeholder=""
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> โรงรถ </label>
            <b-form-input
              v-model="addEstate.garage"
              placeholder=""
            ></b-form-input>
          </div>
          <div class="col-lg-6 col-sm-12 align-self-end">
            <label for="">อัพโหลดรูปภาพ</label>
            <b-form-file multiple>
              <template slot="file-name" slot-scope="{ names }">
                <b-badge variant="dark">{{ names[0] }}</b-badge>
                <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                  + {{ names.length - 1 }} More files
                </b-badge>
              </template>
            </b-form-file>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for="">รายละเอียดเพิ่มเติ่ม</label>
            <b-form-textarea
              id="textarea"
              v-model="addEstate.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="col-lg-6 mt-4 align-self-end">
            <div class="d-flex align-items-end justify-content-end">
              <div class="mr-2">
                <b-button variant="primary" @click="actionAddEstate"> ยืนยันเพิ่มอสังหา ฯ </b-button>
              </div>
              <div>
                <b-button variant="danger"> รีเซ็ต </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="md-layout-item md-size-100 py-3"
      v-if="stepPage === 'editEstate'"
    >
      <div class="d-flex justify-content-start">
        <div class="cursor-pointer" @click="goToListState('listEstate')">
          <i class="fa-solid fa-arrow-left mr-2"></i>
          <span>ย้อนกลับ</span>
        </div>
      </div>
      <div class="drop-box-shadow px-3 py-3 mt-2">
        <div class="">
          <h2 style="font-weight: 900">แก้ไขอสังหาริมทรัพย์</h2>
        </div>
        <div class="row">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ชื่ออสังหา ฯ </label>
            <b-form-input
              v-model="editEstate.name"
              placeholder="กรุณาใส่ชื่ออสังหาฯ"
            ></b-form-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> จังหวัด </label>
            <b-form-input
              v-model="editEstate.province"
              placeholder="เลือกจังหวัด"
            ></b-form-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> อำเภอ/เขต </label>
            <b-form-input
              v-model="editEstate.state"
              placeholder="เลือกอำเภอและเขต"
            ></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ราคา </label>
            <b-form-input
              v-model="editEstate.price"
              placeholder="กรุณาใส่ราคาอสังหาฯ"
            ></b-form-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> รหัสไปรษณีย์ </label>
            <b-form-input
              v-model="editEstate.zipcode"
              placeholder="กรุณากรอกรหัสไปรษณีย์"
            ></b-form-input>
          </div>
          <div class="col-3" />
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ประเภทอสังหาฯ </label>
            <b-form-input
              v-model="editEstate.typeEstate"
              placeholder="ประเภทอสังหาริมทรัพย์"
            ></b-form-input>
          </div>
          <div class="col-lg-6 col-sm-12">
            <label for=""> ที่อยู่ </label>
            <b-form-input
              v-model="editEstate.address"
              placeholder="กรอกที่อยู่"
            ></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-3 col-sm-12">
            <label for=""> ตารางเมตร </label>
            <b-form-input
              v-model="editEstate.typeEstate"
              placeholder="ประเภทอสังหาริมทรัพย์"
            ></b-form-input>
          </div>
          <div class="col-3"></div>
          <div class="col-lg-6 col-sm-12 align-self-end mt-4">
            <b-button
              block
              variant="success"
              @click="$bvModal.show('modal-gps')"
            >
              <i
                class="fa-solid fa-map-location-dot"
                style="color: #ffffff"
              ></i>
              ปักหมุดอสังหาฯ
            </b-button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องนอน </label>
            <b-form-input
              v-model="editEstate.bedroom"
              placeholder=""
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องน้ำ </label>
            <b-form-input
              v-model="editEstate.bathroom"
              placeholder=""
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> โรงรถ </label>
            <b-form-input
              v-model="editEstate.garage"
              placeholder=""
            ></b-form-input>
          </div>
          <div class="col-lg-6 col-sm-12 align-self-end">
            <label for="">อัพโหลดรูปภาพ</label>
            <b-form-file multiple>
              <template slot="file-name" slot-scope="{ names }">
                <b-badge variant="dark">{{ names[0] }}</b-badge>
                <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                  + {{ names.length - 1 }} More files
                </b-badge>
              </template>
            </b-form-file>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for="">รายละเอียดเพิ่มเติ่ม</label>
            <b-form-textarea
              id="textarea"
              v-model="editEstate.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <div class="col-lg-6 mt-4 align-self-end">
            <div class="d-flex align-items-end justify-content-end">
              <div class="mr-2">
                <b-button variant="primary"> ยืนยันแก้ไขอสังหา ฯ </b-button>
              </div>
              <div>
                <b-button variant="danger"> รีเซ็ต </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-yes-or-no">
      <b-modal
        ref="modalYesOrNo"
        id="modal-yes-or-no"
        hide-header
        centered
        hide-footer
      >
        <template>
          <div
            class="d-flex align-items-center flex-column justify-content-center mt-3"
          >
            <div>
              <i class="fa-solid fa-triangle-exclamation" style="color: #df4759; font-size: 40px;"></i>
            </div>
            <p>
              ท่านยืนยันที่จะลบ
              <span class="text-primary"> ddd </span>
              หรือไม่ ?
            </p>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <div>
              <b-button
                @click="close('yesorno')"
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
                @click="actionYesOrNo()"
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
                ยืนยัน
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>
    </div>
    <div class="modal-gps">
      <b-modal
        ref="modalGPS"
        id="modal-gps"
        hide-header
        centered
        hide-footer
        size="lg"
      >
        <template>
          <div
            class="d-flex align-items-center flex-column justify-content-center mt-3"
          >
            <!-- <div class="position-relative" style="padding: 0"> -->
            <GmapMap
              ref="mymap"
              :center="center"
              :zoom="17"
              style="width: 100%; height: 550px"
              map-type-id="roadmap"
              @center_changed="updateCenter"
              :options="{
                zoomControl: true,
                fullscreenControl: false,
                disableDefaultUI: true,
              }"
            >
            </GmapMap>
            <div
              class="position-absolute"
              style="
                margin-left: auto;
                margin-right: auto;
                left: 0;
                right: 0;
                text-align: center;
                top: 50%;
              "
            >
              <i
                class="fa-solid fa-location-dot"
                style="color: #ff0000; font-size: 30px"
              ></i>
            </div>
            <!-- </div> -->
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import { required } from "vuelidate/lib/validators"
export default {
  data() {
    return {
      dataBackgroundColor: "blue",
      center: {
        lat: 13.759235,
        lng: 100.557259,
      },
      coordinates: {
        lat: 0,
        lng: 0,
      },
      inputEstate: {
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        lineid: "",
      },
      stepPage: "listEstate",
      users: [
        {
          id: 1,
          name: "Dakota Rice",
          salary: "$36,738",
          country: "Niger",
          city: "Oud-Turnhout",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          salary: "$23,738",
          country: "Curaçao",
          city: "Sinaai-Waas",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Overland Park",
        },
        {
          id: 4,
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Gloucester",
        },
      ],
      addEstate: {
        name: "",
        price: "",
        province: "",
        state: "",
        district: "",
        zipcode: "",
        typeEstate: "",
        maskprice: "",
        address: "",
        taragMeter: "",
        taragVar: "",
        bedroom: "",
        bathroom: "",
        garage: "",
        description: "",
        images: [],
        lat: "",
        long: "",
      },
      editEstate: {
        estate_id: "",
        name: "",
        price: "",
        province: "",
        state: "",
        zipcode: "",
        typeEstate: "",
        address: "",
        taragMeter: "",
        taragVar: "",
        bedroom: "",
        bathroom: "",
        garage: "",
        description: "",
        images: [],
        lat: "",
        long: "",
      },
      myCurrentmaps: {
        lat: 0,
        lng: 0,
      },
    };
  },
  computed: {
    google() {
      return gmapApi;
    },
  },
  validations: {
    addEstate: {
      name: { required },
      price: { required },
      province: { required },
      state: { required },
      district: { required },
      zipcode: { required },
      typeEstate: { required },
      address: { required },
      taragMeter: { required },
      taragVar: { required },
      bedroom: { required },
      bathroom: { required },
      garage: { required },
    }
  },
  methods: {
    inputFormPrice($e, key) {
      if(key === 'addEstate') {
        // const price = Number($e);
        // // Format the number as Thai Baht currency with a comma separator
        // const formattedPrice = price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
        // Update the price property with the formatted value
        this.addEstate.price = $e
      }
    },
    onSelected(address) {
      this.addEstate.province = address.province
      this.addEstate.state = address.subdistrict
      this.addEstate.district = address.district
      this.addEstate.zipcode = address.postalCode
      // this.province = address.province;
      // this.postalCode = address.postalCode;
    },
    actionAddEstate() {
      this.$v.addEstate.$touch();
      if (this.$v.addEstate.$invalid) {
        return false
      }
      const headers = {
        headers: {
          token: localStorage.getItem("token")
        }
      }

      const bodyJson = {
        estate_name: "",
        estate_type: "",
        estate_location: "",
        estate_price: "",
        estate_area: "",
        estate_bedrooms: "",
        estate_bathrooms: "",
        estate_garage: "",
        estate_description: "",
        estate_image: "",
        estate_status: "",
        estate_user_id: "",
        gps_latitude: "",
        gps_longitude: "",
        province_id: "",
        geographies_id: "",
        amphures_id: "",
        districts_id: ""
      }
      this.$axios.post(this.$API_URL + '/create/estate', bodyJson, headers).then((res) => {
        console.log('res: ', res)
      })
    },
    openModal(key) {
      if (key === "trash") {
        this.$bvModal.show("modal-yes-or-no");
      }
    },
    goToListState(key) {
      this.stepPage = key;
    },
    actionYesOrNo() {},
    close(key) {
      if (key === "yesorno") {
        this.$bvModal.hide("modal-yes-or-no");
      }
    },
    getOverAllIndex(index) {
      return this.search.page * 25 - 25 + index + 1;
    },
    updateCenter(location) {
      console.log("update center", location);
      this.coordinates = {
        lat: location.lat(),
        lng: location.lng(),
      };
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
