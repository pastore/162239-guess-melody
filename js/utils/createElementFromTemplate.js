const createElementFromTemplate = (template) => {
  const element = document.createElement(`template`);
  element.innerHTML = template;
  return element.content;
};

export default createElementFromTemplate;
