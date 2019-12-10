let numberOfFilmsWatched = Math.floor(Math.random() * 21);

/**
 * Возращает звание пользователя в зависимости от числа просмотренных фильмов
 * @param {*} count - число просмотренных фильмов
 * @return {String}
 */
const checkUserRank = (count) => {
  if (count > 0 && count <= 10) {
    return `Novice`;
  }

  if (count > 10 && count <= 21) {
    return `Fan`;
  }

  if (count > 21) {
    return `Movie Buff`;
  }

  return ``;
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
