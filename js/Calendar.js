import { $ } from "./util/index.js";

class Calendar {
  constructor({ initialDate }) {
    this.$thead = $("thead");
    this.$tbody = $("tbody");
    this.$currentDate = $(".currentDate");
    this.date = initialDate;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
  }

  setState(nextData) {
    this.render();
  }

  createheadDays() {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthArray = [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const daysText = days.reduce((htmlString, currentValue) => {
      const day = `<td>${currentValue}</td>`;
      htmlString += day;
      return `${htmlString}`;
    }, "");
    this.$currentDate.innerHTML = `${monthArray[this.month]} ${this.year}`;
    this.$thead.innerHTML = `<tr>${daysText}</tr>`;
  }

  isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }

  createTable(year, month) {
    const cal = new Date(year, month, 1);
    const day = cal.getDay();
    // 각 월에 대한 일수
    let date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let count = 0;
    //윤년여부
    if (this.isLeapYear(year)) {
      //윤년인 경우
      date[1] = 29;
    } else {
      console.log("date: " + date[month]);
    }

    let tableText = "<tr>";
    for (var i = 0; i < day; i++) {
      tableText += "<td>&nbsp</td>";
      count++;
    }

    for (let i = 1; i <= date[month]; i++) {
      if (count == 0) {
        tableText += "<td style='color: red'>" + i + "</td>";
      } else if (count == 6) {
        tableText += "<td style='color: blue'>" + i + "</td>";
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
  }

  render() {
    this.createheadDays();
    this.createTable(this.year, this.month);
  }
}

export default Calendar;
