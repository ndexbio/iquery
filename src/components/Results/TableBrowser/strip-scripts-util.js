export const stripScripts = entry => {
  return entry
    .toString()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\ *>/gi, "")
}