export function priceWithComma(price: string | undefined): string {
  if (typeof price == "string") {
    if (price.includes(".")) {
      const number = parseFloat(price).toFixed(2);
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  } else return "";
}
