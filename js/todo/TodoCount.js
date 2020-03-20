import { $ } from "../util/index.js";

class TodoCount {
  constructor({ totalTodo, onCompletedTodo }) {
    const $todoCount = $(".todo-count");

    this.$todoCount = $todoCount;
    this.totalTodo = totalTodo;
    this.onCompletedTodo = onCompletedTodo;
  }
  setState(nextData) {
    this.dailyTodos = nextData;
    this.render();
  }
  render() {
    this.$todoCount.innerHTML = `할 일:${this.totalTodo()}개   / 처리할 일:${this.onCompletedTodo()}개`;
  }
}

export default TodoCount;
