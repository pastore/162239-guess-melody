export const getStatistics = (state) => {
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
