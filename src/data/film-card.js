import {getRandomBoolean} from '../utils';
import {getRandomIndex} from '../utils';
import {getRandomElementFromArray} from '../utils';

const titles = [
  `Avengers: Endgame`,
  `Star Wars: The Force Awakens`,
  `Avengers: Infinity War`,
  `Jurassic World`,
  `The Lion King`,
  `The Avengers`,
  `Furious 7`,
  `Avengers: Age of Ultron`,
  `Black Panther`,
  `Harry Potter and the Deathly Hallows – Part 2`,
  `Star Wars: The Last Jedi`,
  `Jurassic World: Fallen Kingdom`,
  `Frozen`,
  `Beauty and the Beast`,
  `Incredibles 2`
];

const genres = [
  `Drama`,
  `Mystery`,
  `Comedy`,
  `Western`,
  `Musical`,
  `Cartoon`
];

const imgPaths = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`
];

/**
 * Возвращает фильм со случайными данными
 * @return {Object}
 */
const generateFilm = () => {
  const title = getRandomElementFromArray(titles);
  const getRandomRating = Math.random() * 10;
  const rating = getRandomRating.toFixed(1);
  const randomYear = Math.floor(2000 + Math.random() * 10);
  const durationHours = Math.floor(Math.random() * 3);
  const durationMinutes = Math.floor(Math.random() * 60);
  const genre = getRandomElementFromArray(genres);
  const imgPath = getRandomElementFromArray(imgPaths);
  const description = descriptions.slice(0, getRandomIndex(descriptions)).join(`.`);
  const comments = Math.floor(Math.random() * 400);

  return ({
    title: `${title}`,
    rating: `${rating}`,
    year: `${randomYear}`,
    duration: `${durationHours}h ${durationMinutes}m`,
    genre: `${genre}`,
    imgSrc: `${imgPath}`,
    description: `${description}`,
    commentsCount: `${comments}`,
    controls: [
      {
        name: `add-to-watchlist`,
        desc: `Add to watchlist`,
        active: getRandomBoolean()
      },
      {
        name: `mark-as-watched`,
        desc: `Mark as watched`,
        active: getRandomBoolean()
      },
      {
        name: `favorite`,
        desc: `Mark as favorite`,
        active: getRandomBoolean()
      }
    ]
  });
};

/**
 * Возвращает массив фильмов
 * @param {Number} count - требуемое количество фильмов
 * @return {Array}
 */
const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

const filmListExtraData = [
  {
    name: `Top rated`
  },
  {
    name: `Most commented`
  }
];

export {generateFilms, filmListExtraData};
