export function template(query = "#time-block-template") {
  const element = document.querySelector(query);
  if (query && element) {
    return document.importNode(element.content.firstElementChild, true);
  }
  return null;
}
