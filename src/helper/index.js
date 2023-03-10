
export const numberFormatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0
  })
   
export const bahtFormatted = (price, showSymbol = false) => {
    if (showSymbol) {
      return numberFormatter.format(price)
    }
    return `${numberFormatter.format(price)}`.replace('฿', '') // บาท`// .replace('฿', '')
}