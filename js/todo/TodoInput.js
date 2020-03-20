import { $, ENTER_KEY } from "../util/index.js";
import { checkError } from "../validation/index.js";

class TodoInput {
  constructor({ initialDate, initialId, onAddTodo }) {
    const $input = $("#text-input");
    const $Time = $("#time-input");
    const $addBtn = $("#add-btn");

    this.date = initialDate;
    this.initialId = initialId;
    this.onAddTodo = onAddTodo;

    $input.placeholder = "할 일을 입력해주세요";

    this.checkInputTodo = (content, time) => {
      checkError.isEmptyText(content);
      checkError.isTime(time);

      this.initialId += 1;

      const newTodo = {
        _id: this.initialId,
        stringDate: this.nowDate(),
        content,
        time,
        isCompleted: false
      };
      this.onAddTodo(newTodo);
      $input.value = "";
      $input.focus();
    };

    $addBtn.addEventListener("click", () => {
      const content = $input.value;
      const time = $Time.value;
      this.checkInputTodo(content, time);
    });

    $input.addEventListener("keypress", e => {
      const content = $input.value;
      const time = $Time.value;

      if (e.keyCode === ENTER_KEY) {
        this.checkInputTodo(content, time);
      }
    });
  }

  nowDate() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const day = this.date.getDate();
    return `${year}-${month + 1}-${day}`;
  }
}

export default TodoInput;
