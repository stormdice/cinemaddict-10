import AbstractComponent from "./abstract-component.js";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const renderChart = (ctx) => {
  return new Chart(ctx, {
    type: `bar`,
    data: {
      labels: [`Red`, `Blue`, `Yellow`, `Green`, `Purple`, `Orange`],
      datasets: [{
        label: `# of Votes`,
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          `rgba(255, 99, 132, 0.2)`,
          `rgba(54, 162, 235, 0.2)`,
          `rgba(255, 206, 86, 0.2)`,
          `rgba(75, 192, 192, 0.2)`,
          `rgba(153, 102, 255, 0.2)`,
          `rgba(255, 159, 64, 0.2)`
        ],
        borderColor: [
          `rgba(255, 99, 132, 1)`,
          `rgba(54, 162, 235, 1)`,
          `rgba(255, 206, 86, 1)`,
          `rgba(75, 192, 192, 1)`,
          `rgba(153, 102, 255, 1)`,
          `rgba(255, 159, 64, 1)`
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

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
          <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">Sci-Fi</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class Statistics extends AbstractComponent {
  constructor() {
    super();

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _renderCharts() {
    const element = this.getElement();

    const ctx = element.querySelector(`.statistic__chart`);

    this._genresChart = renderChart(ctx);
  }
}
