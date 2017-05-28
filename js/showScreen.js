const sectionMain = document.querySelector(`section.main`);
const showScreen = (element) => {
  const firstChild = sectionMain.firstChild;
  if (firstChild){
      sectionMain.replaceChild(element,firstChild);
  }
  else {
      sectionMain.appendChild(element);
  }
};

export default showScreen;