const _currentIndex = Symbol();

export default class GameModel {
  constructor(urlRead, urlWrite) {
    this[_currentIndex] = 0;
    this.questions = [];
    this.urlRead = urlRead;
    this.urlWrite = urlWrite;
  }

  loadQuestions() {
    return fetch(this.urlRead)
      .then((response) => {
        return response.json();
      });
  }

  loadResults() {
    return fetch(this.urlWrite)
      .then((response) => {
        return response.json();
      });
  }

  sendResult(data, adapter) {
    const requestSettings = {
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(this.urlWrite, requestSettings);
  }

  getNextQuestion() {
    if (this[_currentIndex] === this.questions.length) {
      this[_currentIndex] = 0;
    }
    const next = this[_currentIndex]++;
    return this.questions[next];
  }
}

