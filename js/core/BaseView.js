export default class BaseView {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    const element = document.createElement(`template`);
    element.innerHTML = this.template;
    return element.content;
  }

  bind() {}

  unbind() {}
}


