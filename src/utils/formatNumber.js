export default function formatNumber(num, locale = "vn", options) {
  return Intl.NumberFormat(locale, options).format(num);
}
