export function priceWithComma(price: string | undefined): string {
  if (typeof price == "string")
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else return "";
}
