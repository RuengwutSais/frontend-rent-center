<template>
  <div class="detail-wrapper">
    <div class="detail-card">
      <div class="detail-header">
        <h1>Estate Name</h1>
        <div class="estate-status">
          <p>ว่าง/ไม่ว่าง</p>
        </div>
      </div>
      <div class="estate-rating">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="detail-price">
        <i class="fa-solid fa-tag"></i>
        <p>Estate Price</p>
      </div>
      <div class="detail-location">
        <i class="fa-solid fa-location-dot"></i>
        <p>Estate location</p>
      </div>
      <div class="estate-room">
        <div class="detail-bedroom">
          <i class="fa-solid fa-bed"></i>
          <p>N/A</p>
        </div>
        <div class="detail-bathroom">
          <i class="fa-solid fa-bath"></i>
          <p>N/A</p>
        </div>
      </div>
      <div class="estate-area">
        <div class="detail-garage">
          <i class="fa-solid fa-warehouse"></i>
          <p>N/A</p>
        </div>
        <div class="detail-area">
          <i class="fa-solid fa-chart-area"></i>
          <p>N/A</p>
        </div>
      </div>
      <div class="detail-estate">
        <p>Estate Detail</p>
      </div>
      <div class="map-container">
        <GmapMap
          ref="mymap"
          :center="center"
          :zoom="14"
          style="width: 100%; height: 300px;"
          map-type-id="roadmap"
          :options="{
            zoomControl: true,
            fullscreenControl: false,
            disableDefaultUI: true,
          }"
        >
        </GmapMap>
        <div class="location-dot">
          <i
            class="fa-solid fa-location-dot"
            style="color: #ff0000 !important; font-size: 30px;"
          ></i>
        </div>
      </div>
      <div class="owner-wrapper">
        <div class="owner-detail">
          <div class="owner-pic">
            <div class="owner-avatar">
              <img src="../assets/img/user_avatar.png" alt="Profile picture" />
            </div>
          </div>
          <h2>Owner Name</h2>
          <p>ลงประกาศ : N/A</p>
          <div class="owner-contract">
            <div class="owner-phone">
              <i class="fa-solid fa-phone"></i>
              <p>เบอร์โทร : N/A</p>
            </div>
            <div class="owner-line">
              <i class="fa-brands fa-line"></i>
              <p>Line : N/A</p>
            </div>
            <div class="owner-email">
              <i class="fa-solid fa-envelope"></i>
              <p>Email : N/A</p>
            </div>
            <div class="chat-owner">
              <form>
                <input
                  class="chat-input"
                  type="text"
                  placeholder="แชทกับผู้ประกาศ..."
                />
                <button class="chat-button" type="submit">
                  <i class="fa-solid fa-paper-plane"></i>
                  ส่ง
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-report">
        <b-button
          v-b-modal.modal-1
          class="button-report"
          @click="checkuserModal()"
          variant="#df4759"
          >แจ้งรายงาน</b-button
        >
      </div>
      <div class="detail-review">
        <div class="review-header">
          <img
            class="reviewer-img"
            :src="reviewerImg.image"
            alt="reviewerImage"
          />
          <h2 class="reviewer-name">{{ reviewerName.name }}</h2>
          <div class="review-date">{{ reviewDate.date }}</div>
        </div>
        <div class="review-text">{{ reviewText.detail }}</div>
        <div class="review-rating">
          <span
            v-for="n in 5"
            :key="n"
            :class="{ active: n <= reviewRating.rating }"
          >
            <i class="fa-solid fa-star"></i>
          </span>
        </div>
      </div>
      <div class="review-estate" v-if="isUser">
        <input
          class="review-input"
          type="text"
          placeholder="รีวิวอสังหาริมทรัพย์..."
        />
        <div class="rating">
          <p>ให้คะแนน</p>
          <b-form-rating
            id="rating-inline"
            class="star-rating"
            inline
            value="0"
          ></b-form-rating>
          <div class="div-review-btn"></div>
          <button class="review-button" type="submit">รีวิว</button>
        </div>
      </div>
    </div>
    <div class="modal-report">
      <b-modal
        ref="modalReport"
        id="modal-report"
        hide-header
        centered
        hide-footer
      >
        <template>
          <div
            class="d-flex align-items-center flex-column justify-content-center mt-3"
          >
            <h4>กรุณาระบุข้อมูลการรายงาน</h4>
            <input
              class="report-input"
              type="text"
              v-model="report.detail"
              placeholder="รายละเอียดการรายงาน"
              @blur="validateReport"
              style="
                width: 100%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                border-radius: 0.5em;
                border: none;
                padding: 10px;
                margin-top: 20px;
                font-family: 'Kanit';
              "
            />
            <div
              v-if="report.detailError"
              style="display: flex; align-items: center; margin-top: 5px"
            >
              <i
                class="fa-solid fa-circle-xmark error-icon"
                style="color: #df4759"
              ></i>
              <p class="message_error">{{ report.detailError }}</p>
            </div>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <div>
              <b-button
                @click="closeReport('canclereport')"
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
                variant="danger"
                @click="actionReport()"
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
                รายงาน
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>
    </div>
    <div class="modal-alert">
      <b-modal
        ref="modalalert"
        id="modal-alert"
        hide-header
        centered
        hide-footer
      >
        <template>
          <div
            class="d-flex align-items-center flex-column justify-content-center mt-3"
          >
            <h4>กรุณาเข้าสู่ระบบเพื่อรายงานอสังหาริมทรัพย์</h4>
          </div>
          <div class="d-flex justify-content-center mt-3">
            <div>
              <b-button
                @click="closeAlert('canclealert')"
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
                ตกลง
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
export default {
  data() {
    return {
      reviewerImg: {
        image: "https://via.placeholder.com/350x200?text=User",
        type: String,
        required: true,
      },
      reviewerName: {
        name: "Reviewer Name",
        type: String,
        required: true,
      },
      reviewDate: {
        date: "Review Date",
        type: String,
        required: true,
      },
      reviewText: {
        detail: "Review Detail",
        type: String,
        required: true,
      },
      reviewRating: {
        rating: 4,
        type: Number,
        required: true,
      },
      report: {
        detail: "",
        detailError: "",
      },
      user: {
        image: "",
      },
      isUser: false,
      center: {
        lat: 18.313244,
        lng: 99.421067,
      },
    };
  },
  watch: {
    $route: function () {
      this.isUserLogin();
    },
  },
  computed: {
    google() {
      return gmapApi;
    },
  },
  methods: {
    onPush() {
      this.$router.push("/");
    },
    async isUserLogin() {
      const profiles = await JSON.parse(localStorage.getItem("profiles"));
      if (profiles) {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    },
    redirectPath(path) {
      return this.$router.push(path);
    },
    async logout() {
      this.$axios.post(this.$API_URL + "/logout");
      await localStorage.removeItem("profiles");
      if (this.$router.currentRoute.path === "/landingpage") {
        window.location.reload();
      }
      if (!JSON.parse(localStorage.getItem("profiles"))) {
        this.$router.push("/landingpage");
      }
    },
    actionReport() {
      this.validateReport();
    },
    openModal(key) {
      if (key === "report") {
        this.$bvModal.show("modal-report");
      }
      else{
        this.$bvModal.show("modal-alert")
      }
    },
    checkuserModal(){
      if(this.isUser === true){
        this.openModal('report');
      }
      else{
        this.openModal('alert');
      }
    },
    closeReport(key) {
      if (key === "canclereport") {
        this.$bvModal.hide("modal-report");
        this.report.detail = "";
        this.report.detailError = "";
      }
    },
    closeAlert(key) {
      if (key === "canclealert") {
        this.$bvModal.hide("modal-alert");
      }
    },
    validateReport() {
      if (!this.report.detail) {
        this.report.detailError = "กรุณากรอกรายละเอียดการรายงาน";
      } else {
        this.report.detailError = "";
      }
    },
  },
  mounted() {
    this.isUserLogin();
  },
};
</script>
