export class DeafultAdapter {
    toServer(data) {
        return data;
    }
}

export default new class extends DeafultAdapter {
    toServer(data) {
      return JSON.stringify({ time: data.time, answers: data.points});
    }
}