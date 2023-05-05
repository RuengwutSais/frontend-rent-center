export const numberFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
});

export const bahtFormatted = (price, showSymbol = false) => {
  if (showSymbol) {
    return numberFormatter.format(price);
  }
  return `${numberFormatter.format(price)}`.replace("฿", ""); // บาท`// .replace('฿', '')
};

import Vue from "vue";
const vm = new Vue();

export const showErrorModal = (msgBody, OkmsgTitle = "ตกลง") => {
  vm.$bvModal.msgBoxOk(msgBody, {
    title: "ข้อผิดพลาด",
    size: "sm",
    buttonSize: "sm",
    okVariant: "danger",
    okTitle: OkmsgTitle,
    contentClass: "modal-errors",
    headerClass: "p-2 border-bottom-0",
    footerClass: "p-2 border-top-0",
    centered: true,
  });
};
