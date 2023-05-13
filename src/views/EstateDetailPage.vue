<template>
  <div class="detail-wrapper">
    <div class="detail-card">
      <div class="status">
        <div
          class="estate-status"
          v-if="estate.estate_status === 'available'"
          style="background: linear-gradient(60deg, #66bb6a, #43a047)"
        >
          <p>
            <strong>ว่าง</strong>
          </p>
        </div>
        <div
          v-else-if="estate.estate_status === 'rented'"
          class="estate-status"
          style="background: linear-gradient(60deg, #df4759, #cc0000)"
        >
          <p>
            <strong>ไม่ว่าง</strong>
          </p>
        </div>
        <div
          v-else-if="estate.estate_status === 'suspended'"
          class="estate-status"
          style="background: linear-gradient(60deg, #ffa726, #fb8c00)"
        >
          <p>
            <strong>ถูกระงับ</strong>
          </p>
        </div>
        <div
          v-else-if="estate.estate_status === 'sold'"
          class="estate-status"
          style="background: linear-gradient(60deg, #26c6da, #00acc1)"
        >
          <p>
            <strong>ขายแล้ว</strong>
          </p>
        </div>
      </div>
      <div class="detail-header">
        <h1 class="margin-right-10px">{{ estate.estate_name }}</h1>
        <span>
          <i class="fa-solid fa-circle-check"></i>
        </span>
      </div>
      <div class="estate-rating">
        <span v-for="n in 5" :key="n" :class="{ active: n <= average_rate }">
          <i class="fa-solid fa-star"></i>
        </span>
      </div>
      <div class="detail-price">
        <i class="fa-solid fa-tag"></i>
        <p>{{ formatMoney(estate.estate_price) }} บาท</p>
      </div>
      <div>
        <b-carousel
          id="estate-carousel"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            v-for="(item, index) in estate.estate_image"
            :key="index"
            class="w-100 height-650px"
          >
            <template #img>
              <img
                class="img-fluid w-100 contain-image"
                :src="linkImage(item)"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <div class="detail-location">
        <i class="fa-solid fa-location-dot"></i>
        <p>
          {{ returnLocation() }}
        </p>
      </div>
      <div class="estate-room">
        <div class="detail-bedroom">
          <i class="fa-solid fa-bed"></i>
          <p>{{ estate.estate_bedrooms }} ห้องนอน</p>
        </div>
        <div class="detail-bathroom">
          <i class="fa-solid fa-bath"></i>
          <p>{{ estate.estate_bathrooms }} ห้องนำ้</p>
        </div>
      </div>
      <div class="estate-area">
        <div class="detail-garage">
          <i class="fa-solid fa-warehouse"></i>
          <p>{{ estate.estate_garage }} โรงรถ</p>
        </div>
        <div class="detail-area">
          <i class="fa-solid fa-chart-area"></i>
          <p>{{ estate.estate_area }} ตร.ม</p>
        </div>
      </div>
      <div class="detail-estate">
        <!-- todo ใส่รายละเอียดเพิ่มเติ่ม หัวข้อแต่งตรงนี้ด้วย -->
        <p>{{ estate.estate_description }}</p>
      </div>
      <div class="map-container">
        <GmapMap
          ref="mymap"
          :center="center"
          :zoom="14"
          style="width: 100%; height: 300px"
          map-type-id="roadmap"
          :options="{
            zoomControl: true,
            fullscreenControl: false,
            disableDefaultUI: true,
          }"
        >
          <GmapMarker :position="markerPosition" @click="handleMarkerClick" />
        </GmapMap>
      </div>
      <div class="owner-wrapper">
        <div class="owner-detail">
          <div class="owner-pic">
            <div class="owner-avatar">
              <img
                :src="
                  profile.image_profile
                    ? linkImageProfile
                    : require('../assets/img/default_avatar.png')
                "
                alt="Profile picture"
              />
            </div>
          </div>
          <h2>{{ profile.first_name }} {{ profile.last_name }}</h2>
          <p>ลงประกาศ : {{ formatDateThai(estate.created_at) }}</p>
          <div class="owner-contract">
            <div class="owner-phone">
              <i class="fa-solid fa-phone"></i>
              <p>เบอร์โทร : {{ profile.phone }}</p>
            </div>
            <div class="owner-line" v-if="profile.Line_id">
              <i class="fa-brands fa-line"></i>
              <p>Line : {{ profile.Line_id }}</p>
            </div>
            <div class="owner-email">
              <i class="fa-solid fa-envelope"></i>
              <p>Email : {{ profile.email }}</p>
            </div>
            <div v-if="!isUserProfileEqual" class="chat-owner">
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
      <div v-if="!isUserProfileEqual" class="detail-report">
        <b-button
          v-b-modal.modal-1
          class="button-report"
          @click="checkuserModal()"
          variant="#df4759"
          >แจ้งรายงาน</b-button
        >
      </div>
      <div>
        <div
          v-for="item in visibleReviews"
          :key="item.review_id"
          class="detail-review mt-2"
        >
          <div class="review-header">
            <img
              class="reviewer-img"
              :src="
                item.user.image_profile
                  ? linkImage(item.user.image_profile)
                  : require('../assets/img/default_avatar.png')
              "
              alt="reviewerImage"
            />
            <h2 class="reviewer-name">
              {{ item.user.first_name }} {{ item.user.last_name }}
            </h2>
            <div class="review-date">{{ formatDateThai(item.created_at) }}</div>
          </div>
          <div class="review-text">{{ item.description }}</div>
          <div class="review-rating">
            <span
              v-for="n in 5"
              :key="n"
              :class="{ active: n <= item.rate_score }"
            >
              <i class="fa-solid fa-star"></i>
            </span>
          </div>
        </div>
        <div v-if="visibleReviews.length < review.length">
          <b-button variant="primary" block @click="showMore"
            >อ่านเพิ่มเติ่ม</b-button
          >
        </div>
      </div>
      <div class="review-estate mt-3" v-if="isUser && !isUserProfileEqual">
        <b-form-input
          type="text"
          v-model="comment.text"
          placeholder="รีวิวอสังหาริมทรัพย์..."
          :class="{ 'is-invalid': $v.comment.text.$error }"
        ></b-form-input>
        <div class="rating">
          <p>ให้คะแนน</p>
          <b-form-rating
            id="rating-inline"
            class="star-rating"
            inline
            value="0"
            v-model="comment.star"
          ></b-form-rating>
        </div>
        <div class="div-review-btn">
          <b-button block type="submit" @click="actionReview">รีวิว</b-button>
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
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      comment: {
        text: "",
        star: 5,
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
        lat: 0,
        lng: 0,
      },
      slide: 0,
      sliding: null,
      markerPosition: {
        lat: 0,
        lng: 0,
      },
      estate: {},
      profile: {},
      review: [],
      visibleReviews: [],
      numToShow: 3,
      average_rate: null,
    };
  },
  validations: {
    comment: {
      text: { required },
    },
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
    isUserProfileEqual() {
      const user = JSON.parse(localStorage.getItem("profiles"));
      return user ? this.profile.user_id === user.user_id : true;
    },
    linkImageProfile() {
      return this.$API_URL + "/" + this.profile.image_profile;
    },
  },
  methods: {
    linkImage(img) {
      return this.$API_URL + "/" + img;
    },
    actionReview() {
      this.$v.comment.$touch();
      if (this.$v.comment.$invalid) {
        return false;
      }

      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const bodyJson = {
        description: this.comment.text,
        rate_score: this.comment.star,
      };
      this.$axios
        .post(
          this.$API_URL + `/review/${this.estate.estate_id}`,
          bodyJson,
          headers
        )
        .then((res) => {
          console.log("res create: ", res);
        })
        .finally(async () => {
          await this.getReviewByEstateId();
        });
    },
    formatDateThai(datenow) {
      let date = new Date(datenow);
      return date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    returnLocation() {
      return `${this.estate.address} ${this.estate.state} ${this.estate.districts} ${this.estate.province} ${this.estate.postcode}`;
    },
    formatMoney(num) {
      num = parseFloat(num);
      if (typeof num !== "number" || isNaN(num)) {
        return "";
      }

      let parts = num.toFixed(0).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    handleMarkerClick() {
      const mapsUrl = `https://www.google.com/maps?q=${this.markerPosition.lat},${this.markerPosition.lng}`;
      window.open(mapsUrl, "_blank");
    },
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
    actionReport() {
      if (!this.report.detail) {
        this.report.detailError = "กรุณากรอกรายละเอียดการรายงาน";
        return false;
      }
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const bodyJson = {
        description: this.report.detail,
      };
      this.$axios
        .post(
          this.$API_URL + `/report/${this.estate.estate_id}`,
          bodyJson,
          headers
        )
        .then(() => {})
        .finally(() => {
          this.$bvModal.hide("modal-report");
        });
    },
    openModal(key) {
      if (key === "report") {
        this.$bvModal.show("modal-report");
      } else {
        this.$bvModal.show("modal-alert");
      }
    },
    checkuserModal() {
      if (this.isUser === true) {
        this.openModal("report");
      } else {
        this.openModal("alert");
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
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    async getEstateId() {
      console.log("estateId: ", this.$route.params.estateId);
      await this.$axios
        .get(this.$API_URL + `/estate/${this.$route.params.estateId}`)
        .then((res) => {
          this.estate = res.data.estate;
          this.markerPosition.lat = parseFloat(this.estate.lat);
          this.markerPosition.lng = parseFloat(this.estate.lng);
          this.center.lat = parseFloat(this.estate.lat);
          this.center.lng = parseFloat(this.estate.lng);
          const jsonData = JSON.parse(this.estate.estate_image);
          const updatedData = jsonData.map((image) =>
            image.replace(/\\/g, "/")
          );
          this.estate.estate_image = updatedData;
          console.log("this.estate: ", this.estate);
        });
    },
    async getReviewByEstateId() {
      await this.$axios
        .get(this.$API_URL + `/review/${this.estate.estate_id}`)
        .then((res) => {
          this.review = res.data.review;
          this.average_rate = res.data.average_rate;
        });
    },
    async getProfile() {
      await this.$axios
        .get(this.$API_URL + `/user/${this.estate.estate_user_id}`)
        .then((res) => {
          this.profile = res.data.user;
        });
      console.log("this.res: ", this.profile);
    },
    showMore() {
      const newNumToShow = this.visibleReviews.length + this.numToShow;
      this.visibleReviews = this.review.slice(0, newNumToShow);
    },
  },

  async mounted() {
    this.isUserLogin();
    await this.getEstateId();
    await this.getProfile();
    await this.getReviewByEstateId();
    this.visibleReviews = this.review.slice(0, this.numToShow);
  },
};
</script>

<style lang="scss" scoped>
.contain-image {
  object-fit: cover;
}
// .height-650px {
//   height: 650px;
// }
</style>
