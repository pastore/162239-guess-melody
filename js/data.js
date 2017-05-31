import audioList from './audioList';

const intialState = {
    level: `level-artist`,
    lives: 3,
    time: 0
};

const levels = {
    'level-artist': {
        artist: {},
        answers: []
    },
    'level-genre': {
        genre: {},
        answers: []
    }
};