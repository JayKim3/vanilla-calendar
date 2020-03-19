import { $, dayArray, monthArray } from "../util/index.js";

class TodoHeader {
  constructor({ initialDate }) {
    const $img = $("img");
    const $mainDay = $(".main-day");
    const $mainDate = $(".main-date");

    let isWhiteMode = window.matchMedia("(prefers-color-scheme:white)");

    this.date = initialDate;
    this.$img = $img;
    this.$mainDay = $mainDay;
    this.$mainDate = $mainDate;

    $img.addEventListener("click", () => {
      if (isWhiteMode) {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#363c4f";
        this.$img.src = "../image/moon.png";
        isWhiteMode = false;
      } else {
        document.body.style.backgroundColor = "#363c4f";
        document.body.style.color = "#fff";
        this.$img.src = "../image/sun.jpeg";
        isWhiteMode = true;
      }
    });
  }

  setState(nextData) {
    this.date = nextData;
    this.render();
  }

  render() {
    const day = this.date.getDay();
    const date = this.date.getDate();
    const year = this.date.getFullYear();
    const month = monthArray[this.date.getMonth()];

    this.$mainDay.innerHTML = dayArray[day];
    this.$mainDate.innerHTML = `${date}th ${month} ${year}`;
  }
}

export default TodoHeader;
