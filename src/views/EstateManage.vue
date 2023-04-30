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
            <div  class="col-12 col-lg-6">
              <div class="mt-4">
                <b-button
                  class="d-flex justify-content-center align-items-center w-25"
                  style="
                  color: #fff;
                  background-color: #000;
                  border: 1px solid #000;
                  height: 2em;"
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
                      <i class="fa-solid fa-pen-to-square"></i>
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
        <div class="md-layout">
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>ชื่ออสังหา ฯ</label>
              <md-input v-model="addEstate.name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-25 md-size-25">
            <md-field>
              <label>จังหวัด</label>
              <md-input v-model="addEstate.province" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-25 md-size-25">
            <md-field>
              <label>อำเภอเขต</label>
              <md-input v-model="addEstate.state" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>ราคา</label>
              <md-input v-model="addEstate.price" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-25">
            <md-field>
              <label>รหัสไปรษณีย์</label>
              <md-input v-model="addEstate.zipcode" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>ประเภทอสังหาฯ</label>
              <md-input v-model="addEstate.typeEstate" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <md-field>
              <label>ที่อยู่</label>
              <md-input v-model="addEstate.address" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-25 md-size-25">
            <md-field>
              <label>ตารางเมตร</label>
              <md-input v-model="addEstate.taragMeter" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-25 md-size-25">
            <md-field>
              <label>ตารางวา</label>
              <md-input v-model="addEstate.taragVar" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-50">
            <div>ปักหมุดอสังหาฯ</div>
          </div>
          <div class="md-layout-item md-small-size-25 md-size-25">
            <md-field>
              <label>ห้องนอน</label>
              <md-input v-model="addEstate.bedroom" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-25 md-size-25">
            <md-field>
              <label>ห้องน้ำ</label>
              <md-input v-model="addEstate.bathroom" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-50 md-size-25">
            <md-field>
              <label>โรงรถ</label>
              <md-input v-model="addEstate.garage" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>รายละเอียดเพิ่มเติม</label>
              <md-input v-model="addEstate.description" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success"
              >เพิ่มอสังหาริมทรัพย์</md-button
            >
            <md-button class="md-raised md-danger">ยกเลิก</md-button>
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
              <img src="@/assets/warning.svg" alt="" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataBackgroundColor: "blue",
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
    };
  },
  methods: {
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
