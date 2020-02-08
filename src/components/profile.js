const userRanks = {
  novice: {
    min: 1,
    max: 10
  },
  fan: {
    min: 11,
    max: 20
  },
  movieBuff: {
    min: 21
  }
};

/**
 * Возвращает звание пользователя в зависимости от количества просмотренных фильмов
 * @param {number} moviesWatched - количество просмотренных фильмов
 * @return {string}
 */
const getUserRank = (moviesWatched) => {
  if (moviesWatched >= userRanks.novice.min && moviesWatched <= userRanks.novice.max) {
    return `Novice`;
  }

  if (moviesWatched >= userRanks.fan.min && moviesWatched <= userRanks.fan.max) {
    return `Fan`;
  }

  if (moviesWatched >= userRanks.movieBuff.min) {
    return `Movie buff`;
  }

  return ``;
};

/**
 * Создаёт и возвращает разметку звания пользователя
 * @param {number} count - количество просмотренных фильмов
 * @return {string}
 */
const createProfileTemplate = (count) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(count)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileTemplate};
