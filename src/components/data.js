const navigationLinksData = [
  {
    name: `All movies`,
    path: `#all`,
    active: true,
    additional: false,
    desription: false
  },
  {
    name: `Watchlist`,
    path: `#watchlist`,
    active: false,
    additional: false,
    desription: true,
    desriptionItemCount: 13
  },
  {
    name: `History`,
    path: `#history`,
    active: false,
    additional: false,
    desription: true,
    desriptionItemCount: 8
  },
  {
    name: `Favorites`,
    path: `#favorites`,
    active: false,
    additional: false,
    desription: true,
    desriptionItemCount: 4
  },
  {
    name: `Stats`,
    path: `#stats`,
    active: false,
    additional: true,
    desription: false
  }
];

const sortLinksData = [
  {
    name: `Sort by default`,
    active: true
  },
  {
    name: `Sort by date`,
    active: false
  },
  {
    name: `Sort by rating`,
    active: false
  }
];

const filmCardsData = [
  {
    title: `The Dance of Life`,
    rating: `8.3`,
    year: `1929`,
    duration: `1h 55m`,
    genre: `Musical`,
    imgSrc: `./images/posters/the-dance-of-life.jpg`,
    description: `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
    commentsCount: `5`,
    addToWatchlist: false,
    markAsWatched: false,
    favorite: false,
  },
  {
    title: `Sagebrush Trail`,
    rating: `3.2`,
    year: `1933`,
    duration: `54m`,
    genre: `Western`,
    imgSrc: `./images/posters/sagebrush-trail.jpg`,
    description: `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
    commentsCount: `89`,
    addToWatchlist: true,
    markAsWatched: false,
    favorite: false,
  },
  {
    title: `The Man with the Golden Arm`,
    rating: `9.0`,
    year: `1955`,
    duration: `1h 59m`,
    genre: `Drama`,
    imgSrc: `./images/posters/the-man-with-the-golden-arm.jpg`,
    description: `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
    commentsCount: `18`,
    addToWatchlist: false,
    markAsWatched: true,
    favorite: false,
  },
  {
    title: `Santa Claus Conquers the Martians`,
    rating: `2.3`,
    year: `1964`,
    duration: `1h 21m`,
    genre: `Comedy`,
    imgSrc: `./images/posters/santa-claus-conquers-the-martians.jpg`,
    description: `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
    commentsCount: `465`,
    addToWatchlist: false,
    markAsWatched: false,
    favorite: true,
  },
  {
    title: `Popeye the Sailor Meets Sindbad the Sailor`,
    rating: `6.3`,
    year: `1936`,
    duration: `16m`,
    genre: `Cartoon`,
    imgSrc: `./images/posters/popeye-meets-sinbad.png`,
    description: `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
    commentsCount: `0`,
    addToWatchlist: true,
    markAsWatched: true,
    favorite: true,
  }
];

const filmCardControlsData = [
  {
    name: `film-card__controls-item--add-to-watchlist`,
    active: true
  },
  {
    name: `film-card__controls-item--mark-as-watched`,
    active: true
  },
  {
    name: `film-card__controls-item--favorite`,
    active: true
  }
];

export {navigationLinksData, sortLinksData, filmCardsData, filmCardControlsData};
