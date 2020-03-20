import { $, ESC_KEY } from "../util/index.js";
class TodoModify {
  constructor({ onTodoModify }) {
    this.content = "";
    this.id = "";
    const $modal = $(".modal-wrapper");
    const $modifyInput = $(".modify-input");
    const $closeBtn = $(".close-btn");
    const $modifyBtn = $(".modify-btn");
    const $cancelBtn = $(".cancel-btn");

    this.$modal = $modal;
    this.$modifyInput = $modifyInput;
    this.$modifyBtn = $modifyBtn;
    this.$closeBtn = $closeBtn;
    this.$cancelBtn = $cancelBtn;

    this.onTodoModify = onTodoModify;

    window.addEventListener("keyup", e => {
      if (e.keyCode === ESC_KEY) {
        this.$modal.style.display = "none";
      }
    });

    this.$closeBtn.addEventListener("click", () => {
      this.$modal.style.display = "none";
    });

    this.$cancelBtn.addEventListener("click", () => {
      this.$modal.style.display = "none";
    });

    this.$modifyBtn.addEventListener("click", () => {
      this.content = this.$modifyInput.value;
      this.onTodoModify(this.content, this.id);
      this.$modal.style.display = "none";
    });
  }
  setState(content, id) {
    this.content = content;
    this.id = id;
    this.render();
  }
  render() {
    this.$modal.style.display = "block";
    this.$modifyInput.value = this.content;
  }
}

export default TodoModify;
