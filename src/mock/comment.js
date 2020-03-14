import {getRandomArrayItem, getRandomDate} from '../utils/common.js';
import {EMOTIONS} from '../const.js';

const AUTORS = [
  `Tim Makoveev`,
  `John Doe`,
  `Petya Vasechkin`,
];

const COMMENT_TEXTS = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const generateComment = () => {
  return {
    id: String(Math.random()),
    author: getRandomArrayItem(AUTORS),
    text: getRandomArrayItem(COMMENT_TEXTS),
    date: getRandomDate(new Date(2020, 0, 1), new Date()),
    emotion: getRandomArrayItem(EMOTIONS),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
