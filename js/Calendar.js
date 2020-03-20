import { $, dayArray, monthArray } from "./util/index.js";
import { checkError } from "./validation/index.js";

class Calendar {
  constructor({ initialDate, onClickPrevious, onClickNext, onDayClick }) {
    const $previousBtn = $("#previous-btn");
    const $nextBtn = $("#next-btn");

    this.$thead = $("thead");
    this.$tbody = $("tbody");
    this.$currentDate = $(".currentDate");
    this.date = initialDate;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();

    this.onClickPrevious = onClickPrevious;
    this.onClickNext = onClickNext;
    this.onDayClick = onDayClick;

    $previousBtn.addEventListener("click", this.onClickPrevious);
    $nextBtn.addEventListener("click", this.onClickNext);
  }

  setState(nextData) {
    this.date = nextData;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.render();
  }

  createTextDays() {
    const daysText = dayArray.reduce((htmlString, currentValue) => {
      const day = `<td>${currentValue}</td>`;
      htmlString += day;
      return `${htmlString}`;
    }, "");
    this.$currentDate.innerHTML = `${monthArray[this.month]} ${this.year}`;
    this.$thead.innerHTML = `<tr>${daysText}</tr>`;
  }

  createTable(year, month) {
    const cal = new Date(year, month, 1);
    const day = cal.getDay();
    const nowDate = this.date.getDate();

    // 각 월에 대한 일수
    let date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let count = 0;
    //윤년여부
    if (checkError.isLeapYear(this.year)) {
      //윤년인 경우
      date[1] = 29;
    }

    let tableText = "<tr>";
    for (var i = 0; i < day; i++) {
      tableText += "<td style='cursor: not-allowed'> </td>";
      count++;
    }

    for (let i = 1; i <= date[month]; i++) {
      if (count == 0) {
        tableText += "<td style='color: red'>" + i + "</td>";
      } else if (count == 6) {
        tableText += "<td style='color: blue'>" + i + "</td>";
      } else if (i === nowDate) {
        tableText += "<td style='background-color:purple'>" + i + "</td>";
      } else {
        tableText += "<td>" + i + "</td>";
      }
      count += 1;
      if (count == 7) {
        tableText += "</tr><tr>";
        count = 0;
      }
    }
    tableText += "</tr>";
    this.$tbody.innerHTML = tableText;
    this.$tbody.addEventListener("click", this.onDayClick);
  }

  render() {
    this.createTextDays();
    this.createTable(this.year, this.month);
  }
}

export default Calendar;
