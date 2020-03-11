import AbstractComponent from "./abstract-component.js";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import {getUserRank} from './profile.js';

const FilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

const renderChart = (ctx, films) => {
  const genreLabels = films
    .map((film) => film.genre)
    .reduce((acc, genres) => {
      return acc.concat(Array.from(genres));
    }, [])
    .filter(getUniqItems);

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genreLabels,
      datasets: [{
        data: genreLabels
          .map((genre) => films.reduce((acc, film) => {
            const targetFilmsCount = Array.from(film.genre)
              .filter((it) => it === genre).length;

            return acc + targetFilmsCount;
          }, 0)),
        backgroundColor: genreLabels.map(() => `#ffe800`),
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: true
        },
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
            stepSize: 1
          },
        }]
      },
      legend: {
        display: false
      }
    }
  });
};

const createUserRankTemplate = (count) => {
  return (
    `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getUserRank(count)}</span>
    </p>`
  );
};

const createStatisticsTemplate = (watchedFilms) => {
  const watchedFilmsCount = watchedFilms.length;

  const checkTotalDurationCount = (films) => {
    if (!films.length) {
      return films.length;
    }

    return films
      .map((film) => film.runtime)
      .reduce((acc, runtime) => acc + runtime);
  };

  const totalDurationCount = checkTotalDurationCount(watchedFilms);

  const DURATION = {
    HOURS: Math.trunc(totalDurationCount / 60),
    MINUTES: totalDurationCount % 60,
  };

  // const getwatchedFilmsGenres = watchedFilms
  //   .map((film) => Array.from(film.genre));

  // const getFavoriteGenres = getwatchedFilmsGenres
  //   .map((film) => Array.from(film));

  return (
    `<section class="statistic">
      ${watchedFilmsCount ? createUserRankTemplate(watchedFilmsCount) : ``}

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsCount}<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${DURATION.HOURS} <span class="statistic__item-description">h</span> ${DURATION.MINUTES} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">пока хз</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

const getTodayWatchedFIlms = (films) => {
  return films
    .map((film) => film.watchingDate);
};

export default class Statistics extends AbstractComponent {
  constructor(films) {
    super();

    this._films = films;
    this._currentFilterType = FilterType.ALL_TIME;

    this._onFilterChange = this._onFilterChange.bind(this);

    this._onFilterChange(this._currentFilterType);
    this._setFilterChangeHandler(this._onFilterChange);
    console.log(getTodayWatchedFIlms(this._films));
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }

  _renderCharts(films) {
    const element = this.getElement();

    const ctx = element.querySelector(`.statistic__chart`);

    this._genresChart = renderChart(ctx, films);
  }

  _setFilterChangeHandler(handler) {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const filter = evt.target.value;

      this._currentFilterType = filter;

      handler(filter);
    });
  }

  _onFilterChange(filter) {
    switch (filter) {
      case FilterType.ALL_TIME:
        this._renderCharts(this._films);
        break;
      case FilterType.TODAY:
        console.log(`sad`);
        break;
      case FilterType.WEEK:
        console.log(`За неделю`);
        break;
      case FilterType.MONTH:
        console.log(`За месяц`);
        break;
      case FilterType.YEAR:
        console.log(`За год`);
        break;
    }
  }
}
