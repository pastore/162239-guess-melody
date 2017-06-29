import {addLeadingZero} from '../timer';
import gameConstans from '../core/types/gameConstans';

const timerTemplate = (time) => {
  const minutes = Math.floor(time / 60);
  const secundes = time % 60;

  const length = 2 * Math.PI * 370;
  const stepLength = length / gameConstans.COUNT_GAME_TIME;
  const lengthToClear = stepLength * (gameConstans.COUNT_GAME_TIME - time);

  return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center" stroke-dasharray=${length.toString()} stroke-dashoffset=${lengthToClear.toString()}></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">${addLeadingZero(minutes)}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${addLeadingZero(secundes)}</span>
  </div>
  </svg>`;
};

export default timerTemplate;
