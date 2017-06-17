export function nows(strings: TemplateStringsArray) {
  return strings.raw[0].replace(/\s+/g, ' ').trim();
}
