export function template(selector = "#time-block-template") {
  const element = document.querySelector(selector);
  if (selector && element) {
    return document.importNode(element.content.firstElementChild, true);
  }
  return null;
}
