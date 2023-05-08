<template>
  <div>
    <BlockUI v-if="busy">
      <div class="loader-spinner"></div>
    </BlockUI>
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
                <div class="input-group-append cursor-pointer" @click="getListMyEstate(currentPage)">
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
            <div v-if="products.length > 0">
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
                  formatPrice(item.estate_price)
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
                      ไม่ว่าง
                  </div>
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
                        @click="openModal('trash', item.estate_id)"
                      ></i>
                    </div>
                  </div>
                </md-table-cell>
              </md-table-row>
              </md-table>
            </div>
            <div v-else class="d-flex flex-column justify-content-center align-items-center">
              <div class="w-250px">
                <img class="w-100" src="../assets/img/estate/emptyproduct.png" alt="">
              </div>
              <div>
                <p class="kanit m-0">
                  <strong>
                    ไม่พบอสังหาริมทรัพย์ของคุณ
                  </strong>
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
              v-model="addEstate.estate_name"
              placeholder="กรุณาใส่ชื่ออสังหาฯ"
              :class="{ 'is-invalid': $v.addEstate.estate_name.$error }"
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
              v-model="addEstate.districts"
              :input-class="
                $v.addEstate.districts.$error
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
              v-model="addEstate.estate_price"
              placeholder="กรุณาใส่ราคาอสังหาฯ"
              @input="inputFormPrice($event, 'addEstate')"
              :class="{ 'is-invalid': $v.addEstate.estate_price.$error }"
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
              v-model="addEstate.postcode"
              :input-class="
                $v.addEstate.postcode.$error
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
              v-model="addEstate.estate_type"
              :options="optionstypeEstate"
              placeholder="กรุณาเลือกประเภทอสังหาริมทรัพย์"
              :class="{ 'is-invalid': $v.addEstate.estate_type.$error }"
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
              v-model="addEstate.estate_area"
              placeholder="กรุณากรอกขนาดพื้นที่ ตร.ม"
              :class="{ 'is-invalid': $v.addEstate.estate_area.$error }"
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
              v-model="addEstate.estate_bedrooms"
              placeholder="กรุณากรอกจำนวนห้องนอน"
              :class="{ 'is-invalid': $v.addEstate.estate_bedrooms.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องน้ำ </label>
            <b-form-input
              type="number"
              v-model="addEstate.estate_bathrooms"
              placeholder="กรุณากรอกจำนวนห้องน้ำ"
              :class="{ 'is-invalid': $v.addEstate.estate_bathrooms.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> โรงรถ </label>
            <b-form-input
              type="number"
              v-model="addEstate.estate_garage"
              placeholder="กรุณากรอกจำนวนของโรงรถ"
              :class="{ 'is-invalid': $v.addEstate.estate_garage.$error }"
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
              v-model="addEstate.estate_description"
              placeholder="กรุณากรอกรายละเอียดเพิ่มเติ่ม"
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
              accept=".jpg, .png, .jpeg"
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
              v-model="editEstate.estate_name"
              placeholder="กรุณาใส่ชื่ออสังหาฯ"
              :class="{ 'is-invalid': $v.editEstate.estate_name.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> ตำบล/แขวง</label>
            <thai-address-input
              type="subdistrict"
              v-model="editEstate.state"
              placeholder="กรุณากรอกตำบล/แขวง"
              :input-class="
                $v.editEstate.state.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              @selected="onEditSelected"
            ></thai-address-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> อำเภอ/เขต </label>
            <thai-address-input
              type="district"
              v-model="editEstate.districts"
              :input-class="
                $v.editEstate.districts.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              placeholder="กรุณากรอกอำเภอหรือเขต"
              @selected="onEditSelected"
            ></thai-address-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ราคา </label>
            <b-form-input
              v-model="editEstate.estate_price"
              placeholder="กรุณาใส่ราคาอสังหาฯ"
              @input="inputFormPrice($event, 'editEstate')"
              :class="{ 'is-invalid': $v.editEstate.estate_price.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> จังหวัด </label>
            <thai-address-input
              type="province"
              v-model="editEstate.province"
              :input-class="
                $v.editEstate.province.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              placeholder="กรุณากรอกจังหวัด"
              @selected="onEditSelected"
            >
            </thai-address-input>
          </div>
          <div class="col-lg-3 col-sm-12">
            <label for=""> รหัสไปรษณีย์ </label>
            <thai-address-input
              type="district"
              v-model="editEstate.postcode"
              :input-class="
                $v.editEstate.postcode.$error
                  ? 'form-control is-invalid'
                  : 'form-control'
              "
              placeholder="กรุณารหัสไปรษณีย์"
              @selected="onEditSelected"
            >
            </thai-address-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-6 col-sm-12">
            <label for=""> ประเภทอสังหาฯ </label>
            <b-form-select
              v-model="editEstate.estate_type"
              :options="optionstypeEstate"
              placeholder="กรุณาเลือกประเภทอสังหาริมทรัพย์"
              :class="{ 'is-invalid': $v.editEstate.estate_type.$error }"
            ></b-form-select>
          </div>
          <div class="col-lg-6 col-sm-12">
            <label for=""> ที่อยู่ </label>
            <b-form-input
              v-model="editEstate.address"
              placeholder="กรอกที่อยู่"
              :class="{ 'is-invalid': $v.editEstate.address.$error }"
            ></b-form-input>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-lg-3 col-sm-12">
            <label for=""> ตารางเมตร </label>
            <b-form-input
              v-model="editEstate.estate_area"
              placeholder="กรุณากรอกขนาดพื้นที่ ตร.ม"
            ></b-form-input>
          </div>
          <div class="col-3"></div>
          <div class="col-lg-6 col-sm-12 align-self-end mt-4">
            <b-button
              block
              variant="success"
              @click="openModal('editEstate-gps')"
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
              v-model="editEstate.estate_bedrooms"
              placeholder="กรุณากรอกจำนวนห้องนอน"
              :class="{ 'is-invalid': $v.editEstate.estate_bedrooms.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> ห้องน้ำ </label>
            <b-form-input
              type="number"
              v-model="editEstate.estate_bathrooms"
              placeholder="กรุณากรอกจำนวนห้องน้ำ"
              :class="{ 'is-invalid': $v.editEstate.estate_bathrooms.$error }"
            ></b-form-input>
          </div>
          <div class="col-lg-2 col-sm-12">
            <label for=""> โรงรถ </label>
            <b-form-input
              type="number"
              v-model="editEstate.estate_garage"
              placeholder="กรุณากรอกจำนวนของโรงรถ"
              :class="{ 'is-invalid': $v.editEstate.estate_garage.$error }"
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
              v-model="editEstate.estate_description"
              placeholder="กรุณากรอกรายละเอียดเพิ่มเติ่ม"
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
              accept=".jpg, .png, .jpeg"
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
                <b-button variant="primary" @click="actionEditEstate"> ยืนยัน </b-button>
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
              <span class="text-primary">{{ tempEstateDelete.estate_name }}</span>
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
      busy: false,
      tempEstateDelete: {},
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
        estate_name: "",
        estate_price: "",
        province: "",
        state: "",
        districts: "",
        postcode: "",
        estate_type: null,
        address: "",
        estate_area: "",
        estate_bedrooms: 0,
        estate_bathrooms: 0,
        estate_garage: 0,
        estate_description: "",
        images: [],
        lat: "",
        lng: "",
      },
      editEstate: {
        estate_id: "",
        estate_name: "",
        estate_price: "",
        province: "",
        state: "",
        postcode: "",
        districts: "",
        estate_type: "",
        address: "",
        estate_area: "",
        taragVar: "",
        estate_bedrooms: "",
        estate_bathrooms: "",
        estate_garage: "",
        estate_description: "",
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
      estate_name: { required },
      estate_price: { required },
      province: { required },
      state: { required },
      districts: { required },
      postcode: { required },
      estate_type: { required },
      address: { required },
      estate_area: { required },
      estate_bedrooms: { required },
      estate_bathrooms: { required },
      estate_garage: { required },
    },
    editEstate: {
      estate_name: { required },
      estate_price: { required },
      province: { required },
      state: { required },
      districts: { required },
      postcode: { required },
      estate_type: { required },
      address: { required },
      estate_area: { required },
      estate_bedrooms: { required },
      estate_bathrooms: { required },
      estate_garage: { required },
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
      this.busy = true
      await this.$axios
        .post(this.$API_URL + "/get/list/estate", bodyJson, headers)
        .then((res) => {
          console.log("res", res);
          this.products = res.data.estate.estates ;
          this.currentPage = res.data.estate.currentPage;
          this.totalItems = res.data.estate.totalItems;
          this.totalPages = res.data.estate.totalPages;
        }).finally(() => {
          this.busy = false
        })
    },
    inputFormPrice($e, key) {
      if (key === "addEstate") {
        this.addEstate.estate_price = $e;
      }else if(key === "editEstate") {
        this.editEstate.estate_price = $e;
      }
    },
    onEditSelected(address) {
      this.editEstate.province = address.province;
      this.editEstate.state = address.subdistrict;
      this.editEstate.districts = address.district;
      this.editEstate.postcode = address.postalCode;
    },
    onSelected(address) {
      this.addEstate.province = address.province;
      this.addEstate.state = address.subdistrict;
      this.addEstate.districts = address.district;
      this.addEstate.postcode = address.postalCode;
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
        estate_name: this.addEstate.estate_name,
        estate_type: this.addEstate.estate_type,
        estate_price: this.addEstate.estate_price,
        estate_area: this.addEstate.estate_area,
        estate_bedrooms: this.addEstate.estate_bedrooms,
        estate_bathrooms: this.addEstate.estate_bathrooms,
        estate_garage: this.addEstate.estate_garage,
        estate_description: this.addEstate.estate_description,
        estate_image: setNameFile,
        estate_verify: "verify",
        address: this.addEstate.address, 
        lat: this.coordinates.lat,
        lng: this.coordinates.lng,
        province: this.addEstate.province,
        state: this.addEstate.state,
        districts: this.addEstate.districts,
        postcode: this.addEstate.postcode,
      };
      this.$axios
        .post(this.$API_URL + "/create/estate", bodyJson, headers)
        .then(async (res) => {
          console.log("res: ", res);
          if (res.data.status) {
            this.goToListState("listEstate");
            await this.getListMyEstate();
            this.ResetInput("resetadd");
          } else {
            showErrorModal("ขออภัย,เกิดข้อผิดพลาด");
          }
        });
    },
    actionEditEstate() {
      this.$v.editEstate.$touch();
      if (this.$v.editEstate.$invalid) {
        return false;
      }
      // this.selectedFiles.forEach((file) => {
      //   this.formSelect.append("images", file);
      // });
      // let setNameFile = [];
      // if (this.selectedFiles.length > 0) {
      //   this.$axios
      //     .post(this.$API_URL + "/uploadimage", this.formSelect)
      //     .then((res) => {
      //       res.data.filepaths.map((res) => {
      //         setNameFile.push(res);
      //       });
      //     });
      // }
      // const bodyJson = {
      //   estate_name: this.addEstate.estate_name,
      //   estate_type: this.addEstate.estate_type,
      //   estate_price: this.addEstate.estate_price,
      //   estate_area: this.addEstate.estate_area,
      //   estate_bedrooms: this.addEstate.estate_bedrooms,
      //   estate_bathrooms: this.addEstate.estate_bathrooms,
      //   estate_garage: this.addEstate.estate_garage,
      //   estate_description: this.addEstate.estate_description,
      //   estate_image: setNameFile,
      //   estate_verify: "verify",
      //   address: this.addEstate.address, 
      //   lat: this.coordinates.lat,
      //   lng: this.coordinates.lng,
      //   province: this.addEstate.province,
      //   state: this.addEstate.state,
      //   districts: this.addEstate.districts,
      //   postcode: this.addEstate.postcode,
      // };
    },
    openModal(key, estateId = null) {
      if (key === "trash") {
        this.$bvModal.show("modal-yes-or-no");
        this.tempEstateDelete = this.products.find(res => res.estate_id === estateId)
      } else if (key === "addEstate-gps") {
        this.$bvModal.show("modal-gps");
      } else if (key === "editEstate-gps") {
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
        this.editEstate.estate_price = editvalue.estate_price;
        this.editEstate.state = editvalue.state;
        this.editEstate.postcode = editvalue.postcode;
        this.editEstate.province = editvalue.province;
        this.editEstate.estate_type = editvalue.estate_type;
        this.editEstate.estate_description = editvalue.estate_description;
        this.editEstate.estate_area = editvalue.estate_area;
        this.editEstate.estate_bedrooms = editvalue.estate_bedrooms;
        this.editEstate.estate_bathrooms = editvalue.estate_bathrooms;
        this.editEstate.estate_garage = editvalue.estate_garage;
        this.editEstate.images = editvalue.estate_image;
        this.editEstate.lat = editvalue.lat;
        this.editEstate.lng = editvalue.lng;
      }
      this.stepPage = key;
    },
    actionYesOrNo() {
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
      this.$axios.delete(this.$API_URL + `/delete/estate/${this.tempEstateDelete.estate_id}`, headers).then(async (res) => {
        if(res.data.status) {
          this.$bvModal.hide("modal-yes-or-no")
          await this.getListMyEstate();
        }else {
          this.$bvModal.hide("modal-yes-or-no")
          showErrorModal("ขออภัย,เกิดข้อผิดพลาด");
        }
      })
    },
    close(key) {
      if (key === "yesorno") {
        this.$bvModal.hide("modal-yes-or-no");
        this.tempEstateDelete = null
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
        this.addEstate.estate_name = "";
        this.addEstate.state = "";
        this.addEstate.districts = "";
        this.addEstate.estate_price = "";
        this.addEstate.province = "";
        this.addEstate.postcode = "";
        this.addEstate.address = "";
        this.addEstate.estate_area = "";
        this.addEstate.estate_bedrooms = 0;
        this.addEstate.estate_bathrooms = 0;
        this.addEstate.estate_garage = 0;
        this.addEstate.estate_description = "";
        this.addEstate.estate_type = null
        this.files = []
        this.selectedFiles = []
        this.formSelect = new FormData()
      } else if (key === "resetedit") {
        this.editEstate.estate_name = "";
        this.editEstate.state = "";
        this.editEstate.districts = "";
        this.editEstate.estate_price = "";
        this.editEstate.province = "";
        this.editEstate.postcode = "";
        this.editEstate.estate_type = null;
        this.editEstate.address = "";
        this.editEstate.estate_area = "";
        this.editEstate.estate_bedrooms = 0;
        this.editEstate.estate_bathrooms = 0;
        this.editEstate.estate_garage = 0;
        this.editEstate.estate_description = "";
        this.files = []
        this.selectedFiles = []
        this.formSelect = new FormData()
      }
    },
    formatPrice(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
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
