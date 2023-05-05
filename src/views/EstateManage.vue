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
                  v-model="filter_text"
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
                <md-table-cell md-label="ประเภทอสังหาฯ">{{
                  item.estate_type
                }}</md-table-cell>
                <md-table-cell md-label="ราคา">{{
                  item.estate_price
                }}</md-table-cell>
                <md-table-cell md-label="พื้นที่">{{
                  item.estate_area
                }}</md-table-cell>
                <md-table-cell md-label="ห้องน้ำ">{{
                  item.estate_bathrooms
                }}</md-table-cell>
                <md-table-cell md-label="ห้องนอน">{{
                  item.estate_bedrooms
                }}</md-table-cell>
                <md-table-cell md-label="โรงรถ">{{
                  item.estate_garage
                }}</md-table-cell>
                <md-table-cell md-label="สถานะ">
                  {{ item.estate_status }}
                </md-table-cell>
                <md-table-cell md-label="รูปภาพ">
                  <div class="w-100 mr-4 cursor-pointer">
                    <i class="fa-regular fa-images"></i>
                  </div>
                  <!-- // TODO: ทำ modal เพิ่ม -->
                </md-table-cell>
                <md-table-cell md-label="จัดการ">
                  <div class="d-flex flex-row">
                    <div class="w-100 mr-4 cursor-pointer">
                      <i
                        class="fa-solid fa-pen-to-square"
                        @click="goToListState('editEstate', item.estate_id)"
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
            <thai-address-input
              type="subdistrict"
              v-model="addEstate.state"
              placeholder="กรุณากรอกตำบล/แขวง"
              :input-class="
                $v.addEstate.state.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              @selected="onSelected"
            ></thai-address-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> อำเภอ/เขต </label>
            <thai-address-input
              type="district"
              v-model="addEstate.district"
              :input-class="
                $v.addEstate.district.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              placeholder="กรุณากรอกอำเภอหรือเขต"
              @selected="onSelected"
            ></thai-address-input>
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
              :input-class="
                $v.addEstate.province.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              placeholder="กรุณากรอกจังหวัด"
              @selected="onSelected"
            >
            </thai-address-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> รหัสไปรษณีย์ </label>
            <thai-address-input
              type="district"
              v-model="addEstate.zipcode"
              :input-class="
                $v.addEstate.zipcode.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              placeholder="กรุณารหัสไปรษณีย์"
              @selected="onSelected"
            >
            </thai-address-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ประเภทอสังหาฯ </label>
            <b-form-select
              v-model="addEstate.typeEstate"
              :options="optionstypeEstate"
              placeholder="กรุณาเลือกประเภทอสังหาริมทรัพย์"
              :class="{ 'is-invalid': $v.addEstate.typeEstate.$error }"
            ></b-form-select>
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
              v-model="addEstate.taragMeter"
              placeholder="กรุณากรอกขนาดพื้นที่ ตร.ม"
              :class="{ 'is-invalid': $v.addEstate.taragMeter.$error }"
            ></b-form-input>
          </div>
          <div class="col-3"></div>
          <div class="col-lg-6 col-sm-12 align-self-end mt-4">
            <b-button
              block
              variant="success"
              @click="openModal('addEstate-gps')"
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
              type="number"
              v-model="addEstate.bedroom"
              placeholder="กรุณากรอกจำนวนห้องนอน"
              :class="{ 'is-invalid': $v.addEstate.bedroom.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องน้ำ </label>
            <b-form-input
              type="number"
              v-model="addEstate.bathroom"
              placeholder="กรุณากรอกจำนวนห้องน้ำ"
              :class="{ 'is-invalid': $v.addEstate.bathroom.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> โรงรถ </label>
            <b-form-input
              type="number"
              v-model="addEstate.garage"
              placeholder="กรุณากรอกจำนวนของโรงรถ"
              :class="{ 'is-invalid': $v.addEstate.garage.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-6 col-sm-12">
            <label for="">รายละเอียดเพิ่มเติ่ม</label>
            <span
              class="cursor-pointer"
              v-b-tooltip.hover.top
              title="ในกรณีที่เลือกประเภทอสังหาริมทรัพย์ เป็นคอนโด กรุณากรอกรายละเอียดเพิ่มเติ่มเช่น เลขห้อง อาคารตึก ฯลฯ"
            >
              (โปรดอ่านรายละเอียด
              <i class="ml-1 fa-solid fa-circle-exclamation"></i>)
            </span>
            <b-form-textarea
              id="textarea"
              v-model="addEstate.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12 align-self-end">
            <label for="file-upload">อัพโหลดรูปภาพ</label>
            <span
              class="cursor-pointer"
              v-b-tooltip.hover.top
              title="สามารถอัพโหลดรูปภาพได้ไม่เกิน 5 ภาพ ขนาดไม่เกิน 10MB/ภาพ และอัพโหลดได้แค่สกุล(.pjg, .png, .jpeg)"
            >
              (โปรดอ่านรายละเอียด
              <i class="ml-1 fa-solid fa-circle-exclamation"></i>)
            </span>
            <b-form-file
              id="file-upload"
              v-model="files"
              @input="onFileSelected"
              max-file-count="5"
              multiple
            >
              <template slot="file-name" slot-scope="{ names }">
                <b-badge variant="dark">{{ names[0] }}</b-badge>
                <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                  + {{ names.length - 1 }} More files
                </b-badge>
              </template>
            </b-form-file>
            <ul>
              <li v-for="(file, index) in selectedFiles" :key="index">
                {{ file.name }}
                <button @click="deleteFile(index)">Delete</button>
              </li>
            </ul>
          </div>
          <div class="col-lg-6 mt-4 align-self-end">
            <div class="d-flex align-items-end justify-content-end">
              <div class="mr-2">
                <b-button variant="primary" @click="actionAddEstate">
                  ยืนยัน
                </b-button>
              </div>
              <div>
                <b-button variant="danger" @click="ResetInput('resetadd')">
                  รีเซ็ต
                </b-button>
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
              v-model="editEstate.taragMeter"
              placeholder="กรุณากรอกขนาดพื้นที่ ตร.ม"
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
          <div class="col-lg-6 col-sm-12">
            <label for="">รายละเอียดเพิ่มเติ่ม</label>
            <span
              class="cursor-pointer"
              v-b-tooltip.hover.top
              title="ในกรณีที่เลือกประเภทอสังหาริมทรัพย์ เป็นคอนโด กรุณากรอกรายละเอียดเพิ่มเติ่มเช่น เลขห้อง อาคารตึก ฯลฯ"
            >
              (โปรดอ่านรายละเอียด
              <i class="ml-1 fa-solid fa-circle-exclamation"></i>)
            </span>
            <b-form-textarea
              id="textarea"
              v-model="editEstate.description"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12 align-self-end">
            <label for="file-upload">อัพโหลดรูปภาพ</label>
            <span
              class="cursor-pointer"
              v-b-tooltip.hover.top
              title="สามารถอัพโหลดรูปภาพได้ไม่เกิน 5 ภาพ ขนาดไม่เกิน 10MB/ภาพ และอัพโหลดได้แค่สกุล(.pjg, .png, .jpeg)"
            >
              (โปรดอ่านรายละเอียด
              <i class="ml-1 fa-solid fa-circle-exclamation"></i>)
            </span>
            <b-form-file
              id="file-upload"
              v-model="files"
              @input="onFileSelected"
              max-file-count="5"
              multiple
            >
              <template slot="file-name" slot-scope="{ names }">
                <b-badge variant="dark">{{ names[0] }}</b-badge>
                <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                  + {{ names.length - 1 }} More files
                </b-badge>
              </template>
            </b-form-file>
            <ul>
              <li v-for="(file, index) in selectedFiles" :key="index">
                {{ file.name }}
                <button @click="deleteFile(index)">Delete</button>
              </li>
            </ul>
          </div>

          <div class="col-lg-6 mt-4 align-self-end">
            <div class="d-flex align-items-end justify-content-end">
              <div class="mr-2">
                <b-button variant="primary"> ยืนยัน </b-button>
              </div>
              <div>
                <b-button variant="danger" @click="ResetInput('resetedit')">
                  รีเซ็ต
                </b-button>
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
              <i
                class="fa-solid fa-triangle-exclamation"
                style="color: #df4759; font-size: 40px"
              ></i>
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
              :center="coordinates"
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
import { required } from "vuelidate/lib/validators";
import { showErrorModal } from "../helper/index";
export default {
  data() {
    return {
      filter_text: "",
      dataBackgroundColor: "blue",
      center: {
        lat: 13.759235,
        lng: 100.557259,
      },
      coordinates: {
        lat: 13.759235,
        lng: 100.557259,
      },
      inputEstate: {
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        lineid: "",
      },
      stepPage: "listEstate",
      optionstypeEstate: [
        { value: null, text: "กรุณาเลือกประเภทอสังหาริมทรัพย์" },
        { value: "คอนโด", text: "คอนโด" },
        { value: "บ้านเดี่ยว", text: "บ้านเดี่ยว" },
        { value: "ทาวน์เฮ้าส์", text: "ทาวน์เฮ้าส์" },
        { value: "อพาร์ทเมนท์", text: "อพาร์ทเมนท์" },
      ],
      totalPages: null,
      currentPage: 1,
      totalItems: 50,
      perPage: 8,
      products: [],
      addEstate: {
        name: "",
        price: "",
        province: "",
        state: "",
        district: "",
        zipcode: "",
        typeEstate: null,
        maskprice: "",
        address: "",
        taragMeter: "",
        bedroom: 0,
        bathroom: 0,
        garage: 0,
        description: "",
        images: [],
        lat: "",
        lng: "",
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
        lng: "",
      },
      myCurrentmaps: {
        lat: 0,
        lng: 0,
      },
      files: [],
      selectedFiles: [],
      formSelect: new FormData(),
      timeoutId: null,
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
      bedroom: { required },
      bathroom: { required },
      garage: { required },
    },
    editEstate: {
      name: { required },
      price: { required },
      province: { required },
      state: { required },
      district: { required },
      zipcode: { required },
      typeEstate: { required },
      address: { required },
      taragMeter: { required },
      bedroom: { required },
      bathroom: { required },
      garage: { required },
    },
  },
  methods: {
    onFileSelected(key) {
      if (key.length >= 6) {
        this.files = [];
        return false;
      } else {
        this.selectedFiles = key;
      }
    },
    deleteFile(index) {
      this.selectedFiles.splice(index, 1);
    },
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
      await this.$axios
        .post(this.$API_URL + "/get/list/estate", bodyJson, headers)
        .then((res) => {
          console.log("res", res);
          this.products = res.data.estate.estates;
          this.currentPage = res.data.estate.currentPage;
          this.totalItems = res.data.estate.totalItems;
          this.totalPages = res.data.estate.totalPages;
        });
    },
    inputFormPrice($e, key) {
      if (key === "addEstate") {
        this.addEstate.price = $e;
      }
    },
    onSelected(address) {
      this.addEstate.province = address.province;
      this.addEstate.state = address.subdistrict;
      this.addEstate.district = address.district;
      this.addEstate.zipcode = address.postalCode;
    },
    actionAddEstate() {
      this.$v.addEstate.$touch();
      if (this.$v.addEstate.$invalid) {
        return false;
      }
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      this.selectedFiles.forEach((file) => {
        this.formSelect.append("images", file);
      });
      let setNameFile = [];
      if (this.selectedFiles.length > 0) {
        this.$axios
          .post(this.$API_URL + "/uploadimage", this.formSelect)
          .then((res) => {
            res.data.filepaths.map((res) => {
              setNameFile.push(res);
            });
          });
      }
      const bodyJson = {
        estate_name: this.addEstate.name,
        estate_type: this.addEstate.typeEstate,
        estate_price: this.addEstate.price,
        estate_area: this.addEstate.taragMeter,
        estate_bedrooms: this.addEstate.bedroom,
        estate_bathrooms: this.addEstate.bathroom,
        estate_garage: this.addEstate.garage,
        estate_description: this.addEstate.description,
        estate_image: setNameFile,
        estate_verify: "verify",
        lat: this.coordinates.lat,
        lng: this.coordinates.lng,
        province: this.addEstate.province,
        state: this.addEstate.state,
        districts: this.addEstate.district,
        postcode: this.addEstate.zipcode,
      };
      this.$axios
        .post(this.$API_URL + "/create/estate", bodyJson, headers)
        .then((res) => {
          console.log("res: ", res);
          if (res.data.status) {
            this.goToListState("listEstate");
            this.getListMyEstate();
            this.ResetInput("resetadd");
          } else {
            showErrorModal("ขออภัย,เกิดข้อผิดพลาด");
          }
        });
    },
    openModal(key) {
      if (key === "trash") {
        this.$bvModal.show("modal-yes-or-no");
      } else if (key === "addEstate-gps") {
        this.$bvModal.show("modal-gps");
      }
    },
    goToListState(key, formParam = null) {
      if (key === "editEstate") {
        const editvalue = this.products.find(
          (res) => res.estate_id === formParam
        );
        console.log("This edit value :", editvalue);
        this.editEstate.estate_id = editvalue.estate_id;
        this.editEstate.name = editvalue.estate_name;
        this.editEstate.price = editvalue.estate_price;
        this.editEstate.state = editvalue.state;
        this.editEstate.zipcode = editvalue.postcode;
        this.editEstate.province = editvalue.province;
        this.editEstate.typeEstate = editvalue.estate_type;
        this.editEstate.address = editvalue.estate_description;
        this.editEstate.price = editvalue.estate_price;
        this.editEstate.taragMeter = editvalue.estate_area;
        this.editEstate.bedroom = editvalue.estate_bedrooms;
        this.editEstate.bathroom = editvalue.estate_bathrooms;
        this.editEstate.garage = editvalue.estate_garage;
        this.editEstate.images = editvalue.estate_image;
        this.editEstate.lat = editvalue.lat;
        this.editEstate.lng = editvalue.lng;
      }
      this.stepPage = key;
    },
    actionYesOrNo() {},
    close(key) {
      if (key === "yesorno") {
        this.$bvModal.hide("modal-yes-or-no");
      }
    },
    getOverAllIndex(index) {
      return this.currentPage * 8 - 8 + index + 1;
    },
    updateCenter(location) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      console.log("update center", location);
      this.timeoutId = setTimeout(() => {
        this.coordinates = {
          lat: location.lat(),
          lng: location.lng(),
        };
      }, 500); // 500ms delay
    },
    ResetInput(key) {
      if (key === "resetadd") {
        this.addEstate.name = "";
        this.addEstate.state = "";
        this.addEstate.district = "";
        this.addEstate.price = "";
        this.addEstate.province = "";
        this.addEstate.zipcode = "";
        this.addEstate.typeEstate = null;
        this.addEstate.address = "";
        this.addEstate.taragMeter = "";
        this.addEstate.bedroom = 0;
        this.addEstate.bathroom = 0;
        this.addEstate.garage = 0;
        this.addEstate.description = "";
      } else if (key === "resetedit") {
        this.editEstate.name = "";
        this.editEstate.state = "";
        this.editEstate.district = "";
        this.editEstate.price = "";
        this.editEstate.province = "";
        this.editEstate.zipcode = "";
        this.editEstate.typeEstate = null;
        this.editEstate.address = "";
        this.editEstate.taragMeter = "";
        this.editEstate.bedroom = 0;
        this.editEstate.bathroom = 0;
        this.editEstate.garage = 0;
        this.editEstate.description = "";
      }
    },
  },
  async mounted() {
    await this.getListMyEstate();
    console.log("this.products: ", this.products);
  },
};
</script>

<style lang="scss" scoped>
.font-size-tooltip {
  color: #123456;
  font-size: 12px !important;
}
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
