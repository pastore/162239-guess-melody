import { initialState, setNextLevel, setLives, addPassedLevel, COUNT_GAME_LEVELS, TIME_GAME_OVER, COUNT_GAME_TIME} from '../../data/data';
import ArtistLevelView from './views/ArtistLevelView';
import GenreLevelView from './views/GenreLevelView';
import SuccessResultView from '../result/views/SuccessResultView';
import FailResultView from '../result/views/FailResultView';
import levelType from '../../data/types/levelType';
import changeView from '../../utils/changeView';

export default class GameController {
    constructor(state = initialState) {
        this.state = state;
        this._utils.setLevelView();
    }

    init() {
        changeView(this.view);

        this.view.onAnswer = (answer) => {
            switch (answer){
                case true:
                    this.state = this.view.state;
                    this.state = addPassedLevel(this.state);
                    if (this.state.countPassedLevels === COUNT_GAME_LEVELS){
                        this.view = new SuccessResultView(this.state);
                        this.view.onRepeat = this._utils.onRepeat;
                    }
                    else {
                        this.state = setNextLevel(this.state);
                        this._utils.setLevelView();
                    }
                    break;
                case false:
                    this.state = this.view.state;
                    var tempLives = this.state.lives - 1;
                    this.state = setLives(this.state, tempLives);
                    if (this.state.lives === 0){
                        this.view = new FailResultView(this.state);
                        this.view.onRepeat = this._utils.onRepeat;
                    }
                    else {
                        this.state = setNextLevel(this.state);
                        this._utils.setLevelView();
                    }
                    
                    break;
            }
            this.init();
        }
    }

    get _utils() {
        return {
            onRepeat: () => {
                this.state = initialState;
                this._utils.setLevelView();
                this.init();
            },
            setLevelView: () => {
                switch (this.state.level) {
                    case levelType.Artist:
                        this.view = new ArtistLevelView(this.state);
                        break;
                    case levelType.Genre:
                        this.view = new GenreLevelView(this.state);
                        break;
                }
            }
        };
    }
}