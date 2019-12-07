let numberOfFilmsWatched = Math.floor(Math.random() * 21);

/**
 * Возращает звание пользователя в зависимости от числа просмотренных фильмов
 * @param {*} count - число просмотренных фильмов
 * @return {String}
 */
const checkUserRank = (count) => {
  let rank = ``;

  if (count > 0 && count <= 10) {
    rank = `Novice`;
  }

  if (count > 10 && count <= 21) {
    rank = `Fan`;
  }

  if (count > 21) {
    rank = `Movie Buff`;
  }

  return rank;
};

const userRank = checkUserRank(numberOfFilmsWatched);

/**
 * создаёт и возвращает разметку профиля
 * @return {String}
 */
export const getProfileTemplate = () => (/* html */
  `<section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);
