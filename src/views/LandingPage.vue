<template>
  <div>
    <div class="picture-search">
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
    </div>
    <div>
      <div class="estate-pop">
        <h1>คอนโดแนะนำ</h1>
        <div class="more-estate">
          <a href="">ดูคอนโดเพิ่มเติม ></a>
        </div>
        <div class="">
          <global-carousel :condos="condos" />
        </div>
      </div>
      <div class="estate-pop">
        <h1>บ้านเดี่ยวแนะนำ</h1>
        <div class="more-estate">
          <a href="">ดูบ้านเดี่ยวเพิ่มเติม ></a>
        </div>
        <div class="">
          <global-carousel :condos="estates" />
        </div>
      </div>
      <div class="estate-pop">
        <h1>ทาวน์เฮ้าส์แนะนำ</h1>
        <div class="more-estate">
          <a href="">ดูทาวน์เฮ้าส์เพิ่มเติม ></a>
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
      condos: [
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+1",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+2",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+3",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+4",
        },
        {
          price: "Condo price",
          name: "Condo name",
          location: "Condo location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+5",
        },
      ],
      estates: [
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+1",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+2",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+3",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+4",
        },
        {
          price: "Estates price",
          name: "Estates name",
          location: "Estates location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+5",
        },
      ],
      townhouses: [
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+1",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+2",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+3",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+4",
        },
        {
          price: "Townhouse price",
          name: "Townhouse name",
          location: "Townhouse location",
          bedroom: "N/A",
          bathroom: "N/A",
          garage: "N/A",
          area: "N/A",
          image: "https://via.placeholder.com/350x200?text=Estate+5",
        },
      ],
      translateValue: 0,
      maxCard: 4,
    };
  },
  methods: {
    findEstate() {
      return this.$router.push({ path: '/listestate', query: { filter_text: this.filter_text}})
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
  },
  mounted() {
    console.log("condos", this.condos.length);
  },
};
</script>
