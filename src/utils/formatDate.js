export default function formatDate(date, options, locale = "en-Us") {
  return Intl.DateTimeFormat(locale, options).format(date);
}
