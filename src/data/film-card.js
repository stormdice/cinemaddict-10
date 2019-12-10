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
  const rating = (Math.random() * 10).toFixed(1);
  const year = Math.floor(2000 + Math.random() * 10);
  const durationHours = Math.floor(Math.random() * 3);
  const durationMinutes = Math.floor(Math.random() * 60);
  const genre = getRandomElementFromArray(genres);
  const imgSrc = getRandomElementFromArray(imgPaths);
  const description = descriptions.slice(0, getRandomIndex(descriptions)).join(` `);
  const commentsCount = Math.floor(Math.random() * 1000);

  return ({
    title,
    rating,
    year,
    duration: `${durationHours}h ${durationMinutes}m`,
    genre,
    imgSrc,
    description,
    commentsCount,
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

const FILM_COUNT = 17;

/**
 * Возвращает массив фильмов
 * @param {Number} count - требуемое количество фильмов
 * @return {Array}
 */
const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

const films = generateFilms(FILM_COUNT);

const sortedByRating = [...films].sort((a, b) => {
  return b.rating - a.rating;
});

const sortedByComments = [...films].sort((a, b) => {
  return b.commentsCount - a.commentsCount;
});

const filmsSortedByRating = sortedByRating.slice(0, 2);
const filmsSortedByComments = sortedByComments.slice(0, 2);

const filmListExtraData = [
  {
    name: `Top rated`,
    sort: filmsSortedByRating
  },
  {
    name: `Most commented`,
    sort: filmsSortedByComments
  }
];

export {filmListExtraData, films, FILM_COUNT};
