<template>
  <div>
    <div
        class="md-layout-item md-size-100"
        v-if="stepPage === 'listEstate'"
      >
        <md-card>
          <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">อสังหาริมทรัพย์</h4>
            <p class="category">ข้อมูลรายละเอียดอสังหาริมทรัพย์ทั้งหมดของคุณ</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="users" :table-header-color="dataBackgroundColor">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ลำดับ">{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="ชื่อ - นามสกุล">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="ประเภทอสังหาริมทรัพย์">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="ราคา">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="พื้นที่">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="ห้องน้ำ">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="ห้องนอน">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="โรงรถ">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="สถานะ">{{ item.salary }}</md-table-cell>
                  <md-table-cell md-label="รูปภาพ">{{ item.salary }}</md-table-cell>

                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
    </div>
        <div class="md-layout-item md-size-100 py-3" v-if="stepPage === 'addEstate'" >
            <div class="drop-box-shadow px-3 py-3">
                <div class="">
                    <h2 style="font-weight: 900;">เพิ่มอสังหาริมทรัพย์</h2>
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
                        <div>
                            ปักหมุดอสังหาฯ
                        </div>
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
                        <md-button class="md-raised md-success">เพิ่มอสังหาริมทรัพย์</md-button>
                        <md-button class="md-raised md-danger">ยกเลิก</md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataBackgroundColor: 'blue',
            inputEstate: {
                email: '',
                firstname: '',
                lastname: '',
                phone: '',
                lineid: ''
            },
            stepPage: 'addEstate',
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
                long: ""
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.drop-box-shadow {
    // border: 1px solid black;
    border-radius: 1em;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>