import DefaultAdapter from './DefaultAdapter';

export default new class extends DefaultAdapter {
  toServer(data) {
    return JSON.stringify({time: data.time, answers: data.points});
  }
}();
