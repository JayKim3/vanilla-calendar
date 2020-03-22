import { $, ESC_KEY } from "../util/index.js";
class TodoModify {
  constructor({ modalDate, onTodoModify }) {
    this.content = "";
    this.id = "";
    const $modal = $(".modal-wrapper");
    const $modifyInput = $(".modify-input");
    const $closeBtn = $(".close-btn");
    const $modifyBtn = $(".modify-btn");
    const $cancelBtn = $(".cancel-btn");
    const $modalDate = $(".modal-date");

    this.$modal = $modal;
    this.$modifyInput = $modifyInput;
    this.$modifyBtn = $modifyBtn;
    this.$closeBtn = $closeBtn;
    this.$cancelBtn = $cancelBtn;
    this.$modalDate = $modalDate;

    this.modalDate = modalDate;
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

    this.onClick = e => {
      const className = e.target.className;
      if (className === "modal-wrapper") {
        this.$modal.style.display = "none";
      }
    };
  }
  setState(date, content, id) {
    this.date = date;
    this.content = content;
    this.id = id;
    this.render();
  }
  render() {
    this.$modal.style.display = "block";
    this.$modifyInput.value = this.content;
    this.$modalDate.textContent = this.modalDate();
    this.$modal.addEventListener("click", this.onClick);
  }
}

export default TodoModify;
