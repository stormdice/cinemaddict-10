import AbstractSmartComponent from "./abstract-smart-component.js";
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

const getTodayWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`day`), moment().endOf(`day`)));
};

const getWeekWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`isoWeek`), moment().endOf(`isoWeek`)));
};

const getMonthWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`month`), moment().endOf(`month`)));
};

const getYearWatchedFilms = (films) => {
  return films
    .filter((film) => moment(film.watchingDate).isBetween(moment().startOf(`year`), moment().endOf(`year`)));
};

export default class Statistics extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._currentFilterType = FilterType.ALL_TIME;

    this._genresChart = null;
    this._todayWatchedFilms = getTodayWatchedFilms(this._films);
    this._weekWatchedFIlms = getWeekWatchedFilms(this._films);
    this._monthWatchedFIlms = getMonthWatchedFilms(this._films);
    this._yearWatchedFIlms = getYearWatchedFilms(this._films);

    this._onFilterChange = this._onFilterChange.bind(this);

    this._onFilterChange(this._currentFilterType);
    this._setFilterChangeHandler(this._onFilterChange);
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }

  show() {
    super.show();

    this.rerender(this._films);
  }

  recoveryListeners() {
    this._setFilterChangeHandler(this._onFilterChange);
  }

  rerender(films) {
    this._films = films;

    super.rerender();

    this._renderCharts(this._films);
  }

  _renderCharts(films) {
    const element = this.getElement();
    const ctx = element.querySelector(`.statistic__chart`);

    this._resetChart();

    this._genresChart = renderChart(ctx, films);
  }

  _resetChart() {
    if (this._genresChart) {
      this._genresChart.destroy();
      this._genresChart = null;
    }
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
        this._renderCharts(this._todayWatchedFilms);
        break;
      case FilterType.WEEK:
        this._renderCharts(this._weekWatchedFIlms);
        break;
      case FilterType.MONTH:
        this._renderCharts(this._monthWatchedFIlms);
        break;
      case FilterType.YEAR:
        this._renderCharts(this._yearWatchedFIlms);
        break;
    }
  }
}
