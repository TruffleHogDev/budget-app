export const currencyFormatter = new Intl.NumberFormat(undefined, { //undefined defaults to the end user's current locale
    currency: "cad",
    style: "currency",
    minimumFractionDigits: 0,
}) 