import AbstractSmartComponent from "./abstract-smart-component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUserRank} from './profile';
import {SECONDS_IN_A_MINUTE} from '../utils/common';

const getFilmsGenres = (films) => {
  return films
    .map((film) => film.genres)
    .reduce((acc, genre) => [...acc, ...genre], [])
    .reduce((obj, genre) => {
      if (!obj[genre]) {
        obj[genre] = 1;
      } else {
        obj[genre]++;
      }

      return obj;
    }, {});
};

const checkTotalDurationCount = (films) => {
  if (!films.length) {
    return films.length;
  }

  return films
    .map((film) => film.runtime)
    .reduce((acc, runtime) => acc + runtime);
};

const getFavoriteGenre = (filmGenres) => {
  const sortedGenres = Object.entries(filmGenres).sort((a, b) => b[1] - a[1]);

  if (sortedGenres.length === 0) {
    return ``;
  }

  const favoriteGenre = sortedGenres[0][0];

  const filmsCountFirstFavoriteGenre = sortedGenres[0][1];
  const filmsCountSecondFavoriteGenre = sortedGenres[1][1];

  if (filmsCountFirstFavoriteGenre === filmsCountSecondFavoriteGenre) {
    return ``;
  }

  return favoriteGenre;
};

Chart.helpers.merge(Chart.defaults, {
  scale: {
    ticks: {
      fontColor: `#ffffff`,
      padding: 110,
      fontSize: `20`,
      fontFamily: `Open Sans`,
    },
  },
  global: {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        align: `start`,
        anchor: `start`,
        clamp: true,
        color: `#ffffff`,
        font: {
          size: `20`,
          family: `Open Sans`,
        },
        offset: 50,
      },
    },
  },
});

const renderChart = (ctx, films) => {
  const genres = getFilmsGenres(films);

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genres),
      datasets: [{
        data: Object.values(genres),
        backgroundColor: `#ffe800`,
      }]
    },
    options: {
      animation: {
        duration: 2000,
      },
      scales: {
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
            stepSize: 1,
          },
        }]
      },
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

const createStatisticsTemplate = ({films}) => {
  const watchedFilmsCount = films.length;

  const totalDurationCount = checkTotalDurationCount(films);

  const DURATION = {
    HOURS: Math.trunc(totalDurationCount / SECONDS_IN_A_MINUTE),
    MINUTES: totalDurationCount % SECONDS_IN_A_MINUTE,
  };

  const favoriteGenre = getFavoriteGenre(getFilmsGenres(films));

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
          <p class="statistic__item-text">${favoriteGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();

    this._moviesModel = moviesModel;
    this._genresChart = null;

    this._setStatisticsPeriodChange = this._setStatisticsPeriodChange.bind(this);
  }

  getTemplate() {
    return createStatisticsTemplate({films: this._moviesModel.watchedFilms});
  }

  show() {
    super.show();

    this.rerender(this._moviesModel);
  }

  recoveryListeners() {
    this._setStatisticsPeriodChangeHandler(this._setStatisticsPeriodChange);
  }

  rerender(films) {
    this._moviesModel = films;

    super.rerender();
    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const ctx = element.querySelector(`.statistic__chart`);

    this._resetChart();
    this._genresChart = renderChart(ctx, this._moviesModel.statisticsFilms);
  }

  _resetChart() {
    if (this._genresChart) {
      this._genresChart.destroy();
      this._genresChart = null;
    }
  }

  _setStatisticsPeriodChangeHandler(handler) {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const filter = evt.target.value;

      this._currentFilterType = filter;

      handler(filter);
    });
  }

  _setStatisticsPeriodChange(filter) {
    this._moviesModel.statisticsFilms = filter;

    this._renderCharts();
  }
}
