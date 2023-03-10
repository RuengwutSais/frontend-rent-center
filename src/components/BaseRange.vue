<template>
  <div>
    <b-button id="my-button">Button</b-button>
    <b-popover
      v-model="visible"
      class="input-group-addon"
      placement="bottomLeft"
      triggers="click"
      target="my-button"
    >
      <template #content>
        <div style="width: 350px">
          <b-input-group compact class="mb-4">
            <b-form-input
              v-model="from"
              prepend="จาก:"
              type="number"
              placeholder="Minimum"
              class="w-50 border-right-0"
            />
            <b-form-input
              v-model="to"
              prepend="ถึง:"
              type="number"
              placeholder="Maximum"
              class="border-right-0 border-left-0 w-50"
            />
          </b-input-group>
          <p>
            <b-slider
              v-model="value"
              range
              :min="0"
              :max="10000000"
              :tooltip-visible="false"
              :ticks="marks_sell"
              :step="100000"
              @change="onChange"
              @mouseup="onAfterChange"
            />
          </p>
          <div class="text-right mt-5">
            <b-button variant="primary" @click="onSubmit"> ตกลง </b-button>
          </div>
        </div>
      </template>
      <b-form-input v-model="input" readonly />
    </b-popover>
  </div>
</template>
<script>
import { bahtFormatted } from "@/helper";
export default {
  data() {
    const min = undefined;
    const max = undefined;
    return {
      type: "sell",
      visible: true,
      value: [0, 10000000],
      from: min,
      to: max,
      input: "ราคา",
      marks_sell: {
        0: "-1m",
        1000000: "1m",
        2000000: "2m",
        3000000: "3m",
        4000000: "4m",
        5000000: "5m",
        6000000: "6m",
        7000000: "7m",
        8000000: "8m",
        9000000: "9m",
        10000000: "+10m",
      },
      marks_rent: {
        1000: "<2k",
        2000: "2k",
        3000: "3k",
        4000: "4k ",
        5000: "5k ",
        6000: "6k",
        7000: "7k",
        8000: "8k",
        10000: "10k",
        15000: "15k",
        20000: "20k",
      },
    };
  },
  watch: {
    from(val) {
      const tmp = this.value;
      tmp[0] = +val;
      this.value = [...tmp];
      this.onChange(tmp);
    },
    to(val) {
      const tmp = this.value;
      tmp[1] = +val;
      this.value = [...tmp];
      this.onChange(tmp);
    },
  },
  mounted() {
    if (this.$route.query.type) {
      const price_min = parseInt(this.$route.query.price_min);
      const price_max = parseInt(this.$route.query.price_max);
      const data = [price_min || undefined, price_max || undefined];
      this.value = data;
      this.input = `เรทราคา ${bahtFormatted(
        price_min || 0
      )} ถึง ${bahtFormatted(price_max || 10000000)} +`;
      if (data.price_min && data.price_max) {
        this.onSubmit();
      }
    }
  },
  methods: {
    onChange(value) {
      this.from = value[0];
      this.to = value[1];
      this.input = `เรทราคา ${bahtFormatted(value[0])} ถึง ${bahtFormatted(
        value[1]
      )}`;
    },
    onSubmit() {
      console.log("this.value_price : ", this.value);
      this.$emit("filterByPriceChanged", this.value);
      this.visible = false;
    },
  },
};
</script>
<style scoped>
.background {
  color: whitesmoke !important;
  background-color: #000 !important;
  border-color: #006697 !important;
}
</style>
