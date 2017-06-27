const _currentIndex = Symbol();

export default class BaseModel {
  constructor() {
    this[_currentIndex] = 0;
    this.questions = [];
  }

  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model.`);
  }

  load(url) {
    return fetch(url)
      .then((response) => {
        return response.json();
      });
  }

  send(data, adapter) {
    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(this.urlWrite, requestSettings);
  }

  shuffle() {
    for (let i = this.questions.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.questions[i - 1], this.questions[j]] = [this.questions[j], this.questions[i - 1]];
    }
  }

  getNextQuestion() {
    if (this[_currentIndex] === this.questions.length) {
      this[_currentIndex] = 0;
    }
    const next = this[_currentIndex]++;
    return this.questions[next];
  }
}
