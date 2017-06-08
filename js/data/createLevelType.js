import levelType from './types/levelType';
import audioList from './audioList';

const createLevelType = (_levelType) => {
  let countChoices = 0;
  switch (_levelType) {
    case levelType.Artist:
      countChoices = 3;
      break;
    case levelType.Genre:
      countChoices = 4;
      break;
  }

  let audios = new Set();

  while (audios.size < countChoices) {
    const randomIndex = Math.floor(Math.random() * audioList.length);
    if (!audios.has(randomIndex)) {
      audios.add(randomIndex);
    }
  }
  let filterAudioList = audioList.filter((item, index) => {
    return audios.has(index);
  });
  const randomAnswerIndex = Math.floor(Math.random() * countChoices);

  return {
    answers: filterAudioList,
    rightAnswer: filterAudioList[randomAnswerIndex]
  };
};

export default createLevelType;
