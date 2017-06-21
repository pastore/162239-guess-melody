export default class AbstractView {
  get template() {
    throw new Error(`You have to define template for view`);
  }
  render() {
    const element = document.createElement(`template`);
    element.innerHTML = this.template;
    return element.content;
  }

  bind() { }

  unbind() { }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}


