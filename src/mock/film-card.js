const TITLES = [
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

const GENRES = [
  `Drama`,
  `Mystery`,
  `Comedy`,
  `Western`,
  `Musical`,
  `Cartoon`
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

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Ut enim ad minim veniam, quis nostrud exercitation.`,
  `Duis aute irure dolor in reprehenderit in voluptate.`,
  `Excepteur sint occaecat cupidatat non proident.`,
  `Vitae congue eu consequat ac.`,
  `Et tortor consequat id porta nibh venenatis.`,
  `Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum.`,
  `Odio morbi quis commodo odio aenean sed adipiscing diam.`,
  `Sed tempus urna et pharetra pharetra massa.`,
  `Quam vulputate dignissim suspendisse in est.`,
  `Faucibus turpis in eu mi bibendum neque egestas.`,
  `Luctus venenatis lectus magna fringilla urna.`,
  `Condimentum mattis pellentesque id nibh tortor id aliquet lectus.`
];

const RARS = [0, 6, 12, 16, 18];

const WRITERS = [
  `Quentin Tarantino`,
  `Christopher Nolan`,
  `Joel Coen`,
  `Michael Mann`,
  `Frank Darabont`,
  `Sergio Leone`
];

const ACTORS = [
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Brad Pitt`,
  `Michael Caine`,
  `Robert De Niro`,
  `Matt Damon`,
  `Tom Hanks`,
  `Christian Bale`,
  `Gary Oldman`,
];

const DIRECTORS = [
  `Christopher Nolan`,
  `Steven Spielberg`,
  `Quentin Tarantino`,
  `Martin Scorsese`,
  `Stanley Kubrick`,
];

/**
 * Возращает случайный индекс массива
 * @param {Array} array - данные из массива
 * @return {Number}
 */
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

/**
 * Возращает случайное булево значение
 * @return {Boolean}
 */
const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

/**
 * Возращает случайный элемент из массива
 * @param {Array} array - данные из массива
 * @return {String}
 */
const getRandomElementFromArray = (array) => {
  const randomIdx = getRandomIndex(array);
  const randomElement = array.find((title, idx) => idx === randomIdx);

  return randomElement;
};

/**
 * Возвращает фильм со случайными данными
 * @return {Object}
 */
const generateFilm = () => {
  const title = getRandomElementFromArray(TITLES);
  const originalTitle = `Original: ${title}`;
  const totalRating = (Math.random() * 10).toFixed(1);
  const poster = getRandomElementFromArray(POSTERS);
  const ageRating = getRandomElementFromArray(RARS);
  const director = getRandomElementFromArray(DIRECTORS);
  const writers = WRITERS.slice(0, getRandomIndex(WRITERS)).join(`, `);
  const actors = ACTORS.slice(0, getRandomIndex(ACTORS)).join(`, `);
  const date = Math.floor(2000 + Math.random() * 10);
  const country = `USA`;
  const hours = Math.floor(Math.random() * 3);
  const minutes = Math.floor(Math.random() * 60);
  const genres = GENRES;
  const description = DESCRIPTIONS.slice(0, getRandomIndex(DESCRIPTIONS));
  const comments = Math.floor(Math.random() * 1000);

  return ({
    filmInfo: {
      title,
      originalTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
    },
    release: {
      date,
      country
    },
    runtime: `${hours}h ${minutes}m`,
    genres,
    description,
    comments,
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

export {generateFilms};
