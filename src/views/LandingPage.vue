<template>
  <div>
    <div class="picture-search">
      <div class="picture-all">
        <div class="search-div d-flex w-60">
          <div class="input-group mt-4">
            <input
              type="text"
              class="form-control"
              placeholder="ค้นหาอสังหาริมทรัพย์"
              v-model="filter_text"
              @keydown.enter="findEstate()"
            />
            <div class="input-group-append cursor-pointer" @click="findEstate">
              <span class="input-group-text"
                ><i class="fa-solid fa-magnifying-glass"></i
              ></span>
            </div>
          </div>
        </div>
        <div class="gotolist-div">
          <button class="gotolist-btn" @click="redirectPath('/listestate')">
            <i class="fa-solid fa-building-circle-arrow-right"></i>
            รายการอสังหาริมทรัพย์ทั้งหมด</button>
        </div>
      </div>
    </div>
    <div>
      <div class="estate-pop">
        <h1>คอนโดแนะนำ</h1>
        <div class="more-estate">
          <a @click="FindMore('คอนโด')">ดูคอนโดเพิ่มเติม ></a>
        </div>
        <div class="">
          <global-carousel :condos="condos" />
        </div>
      </div>
      <div class="estate-pop">
        <h1>บ้านเดี่ยวแนะนำ</h1>
        <div class="more-estate">
          <a @click="FindMore('บ้านเดี่ยว')">ดูบ้านเดี่ยวเพิ่มเติม ></a>
        </div>
        <div class="">
          <global-carousel :condos="estates" />
        </div>
      </div>
      <div class="estate-pop">
        <h1>ทาวน์เฮ้าส์แนะนำ</h1>
        <div class="more-estate">
          <a @click="FindMore('ทาวน์เฮ้าส์')">ดูทาวน์เฮ้าส์เพิ่มเติม ></a>
        </div>
        <div class="">
          <global-carousel :condos="townhouses" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalCarousel from "@/components/Global/GlobalCarousel.vue";
export default {
  name: "EstateInfo",
  components: {
    GlobalCarousel,
  },
  data() {
    return {
      filter_text: "",
      estate_type: "",
      condos: [],
      estates: [],
      townhouses: [],
      translateValue: 0,
      maxCard: 4,
    };
  },
  methods: {
    findEstate() {
      return this.$router.push({
        path: "/listestate",
        query: { filter_text: this.filter_text },
      });
    },
    FindMore(key) {
      return this.$router.push({
        path: "/listestate",
        query: { estate_type: key },
      });
    },
    slideCondoLeft() {
      if (this.translateValue !== 0) {
        this.translateValue += 100;
      }
    },
    slideCondoRight() {
      if (this.translateValue !== (this.condos.length - this.maxCard) * 100) {
        this.translateValue -= 100;
      }
    },
    slideEstateLeft() {
      if (this.translateValue !== 0) {
        this.translateValue += 100;
      }
    },
    slideEstateRight() {
      if (this.translateValue !== (this.estates.length - this.maxCard) * 100) {
        this.translateValue -= 100;
      }
    },
    slideTownhouseLeft() {
      if (this.translateValue !== 0) {
        this.translateValue += 100;
      }
    },
    slideTownhouseRight() {
      if (
        this.translateValue !==
        (this.townhouses.length - this.maxCard) * 100
      ) {
        this.translateValue -= 100;
      }
    },
    getEstateByCondo() {
      this.$axios.get(this.$API_URL + "/carousel/condo").then((res) => {
        console.log("condo: ", res);
        this.condos = res.data.estate;
      });
    },
    getEstateByTownHouse() {
      this.$axios.get(this.$API_URL + "/carousel/townhouse").then((res) => {
        this.townhouses = res.data.estate;
      });
    },
    getEstateByHome() {
      this.$axios.get(this.$API_URL + "/carousel/home").then((res) => {
        this.estates = res.data.estate;
      });
    },
    redirectPath(path) {
      return this.$router.push(path);
    },
  },
  mounted() {
    console.log("condos", this.condos.length);
    this.getEstateByCondo();
    this.getEstateByTownHouse();
    this.getEstateByHome();
  },
};
</script>
