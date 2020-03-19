import { $ } from "../util/index.js";

class TodoHeader {
  constructor({}) {
    const $img = $("img");
    let isWhiteMode = window.matchMedia("(prefers-color-scheme:white)");

    this.$img = $img;

    this.$img.addEventListener("click", () => {
      console.log(isWhiteMode);
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
}

export default TodoHeader;
