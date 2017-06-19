const sectionMain = document.querySelector(`section.main`);

const changeView = (view) => {
    sectionMain.innerHTML = ``;
    sectionMain.appendChild(view.element);
};

export default changeView;