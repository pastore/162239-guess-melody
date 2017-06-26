export const statistics = [
  {id: 1, time: 110, answers: 3},
  {id: 2, time: 92, answers: 2},
  {id: 3, time: 84, answers: 2},
  {id: 4, time: 60, answers: 2},
  {id: 5, time: 50, answers: 1}
];

export const getStatistics = (state) => {
  const randomId = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
  statistics.push({id: randomId, time: state.time, answers: state.countPassedLevels});
  statistics.sort((a, b) => {
    if (b.answers > a.answers) {
      return 1;
    } else if (b.answers < a.answers) {
      return -1;
    }

    if (b.time < a.time) {
      return 1;
    } else if (b.time > a.time) {
      return -1;
    } else {
      return 0;
    }
  });
  let tempStatistics = statistics.map((item) => {
    return item.id;
  });
  return Math.floor(((statistics.length - 1) - tempStatistics.indexOf(randomId)) * (100 / statistics.length));
};
