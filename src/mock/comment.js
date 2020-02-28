import {getRandomArrayItem} from '../utils/common.js';
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
    date: `2019-05-11T16:12:32.554Z`,
    emotion: getRandomArrayItem(EMOTIONS),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
