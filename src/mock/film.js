import {formatDuration} from '../utils/common.js';
import {getRandomIntegerNumber, getRandomArrayItem} from '../utils/common.js';

const FILM_TITLES = [
  `The Lighthouse`,
  `Little Women`,
  `The Irishman`,
  `Marriage Story`,
  `Jojo Rabbit`,
  `A Beautiful Day in the Neighbourhood`,
  `Hustlers`,
  `Atlantique`,
  `1917`,
  `Monos`,
  `Bait`,
  `Us`,
  `Apollo 11`,
  `Once Upon a Time… in Hollywood`,
  `The Farewell`,
  `Fight Club`,
  `The Good, The Bad And The Ugly`,
  `Pulp Fiction`,
  `The Lord Of The Rings: The Return Of The King`,
  `Schindler's List`,
  `12 Angry Men`,
  `The Dark Knight`,
  `The Godfather`,
  `The Shawshank Redemption`
];

const POSTERS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

const AGES_RATING = [0, 6, 12, 16, 18];

const GENRES = [
  `Comedy`,
  `Western`,
  `Musical`,
  `Cartoon`,
  `Drama`,
  `Mystery`,
  `Film-Noir`
];

const COUNTRIES = [
  `USA`,
  `Finland`,
  `Australia`,
  `England`
];

const DESCRIPTION_TEXT = TEXT.split(`. `);

const generateRating = () => {
  return (getRandomIntegerNumber(0, 10) + Math.random()).toFixed(1);
};

const generateReleaseDate = () => {
  return getRandomIntegerNumber(Math.pow(8, 13), Math.pow(8.5, 13));
};

const parseReleaseDate = (date) => {
  return new Date(date);
};

const generateRuntime = () => {
  return getRandomIntegerNumber(45, 200);
};

const generateGenres = (genres) => {
  return genres
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generateDescriptions = (descriptions) => {
  return descriptions
    .filter(() => Math.random() > 0.5)
    .slice(0, 3)
    .join(`. `);
};

const generateFilm = () => {
  return {
    id: String(new Date() + Math.random()),
    title: getRandomArrayItem(FILM_TITLES),
    originalTitle: getRandomArrayItem(FILM_TITLES),
    totalRating: generateRating(),
    country: getRandomArrayItem(COUNTRIES),
    poster: getRandomArrayItem(POSTERS),
    ageRating: getRandomArrayItem(AGES_RATING),
    releaseDate: parseReleaseDate(generateReleaseDate()),
    runtime: formatDuration(generateRuntime()),
    genre: new Set(generateGenres(GENRES)),
    description: generateDescriptions(DESCRIPTION_TEXT),
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: getRandomIntegerNumber(0, 20)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
