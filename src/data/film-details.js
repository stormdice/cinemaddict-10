const filmDetails = {
  filmInfo: {
    title: `The Great Flamarion`,
    alternativeTitle: `Original: The Great Flamarion`,
    totalRating: 8.9,
    poster: `./images/posters/the-great-flamarion.jpg`,
    ageRating: 18,
    director: `Anthony Mann`,
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`]
  },
  release: {
    date: `30 March 1945`,
    country: `USA`
  },
  runtime: `1h 18m`,
  genres: [`Drama`, `Film-Noir`, `Mystery`],
  description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.`
};

const filmDetailsControlsData = [
  {
    name: `watchlist`,
    desc: `Add to watchlist`
  },
  {
    name: `watched`,
    desc: `Already watched`
  },
  {
    name: `favorite`,
    desc: `Add to favorites`
  }
];

const FilmDetailsEmojiData = [
  {
    id: `emoji-smile`,
    value: `sleeping`,
    imgSrc: `./images/emoji/smile.png`
  },
  {
    id: `emoji-sleeping`,
    value: `neutral-face`,
    imgSrc: `./images/emoji/sleeping.png`
  },
  {
    id: `emoji-gpuke`,
    value: `grinning`,
    imgSrc: `./images/emoji/puke.png`
  },
  {
    id: `emoji-angry`,
    value: `grinning`,
    imgSrc: `./images/emoji/angry.png`
  }
];

export {filmDetails, filmDetailsControlsData, FilmDetailsEmojiData};
