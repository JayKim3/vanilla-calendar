import { $ } from "../util/index.js";

class TodoList {
  constructor({ initialTodo }) {
    const $todoList = $(".todo-list");

    this.$todoList = $todoList;
    this.todos = initialTodo;
  }

  setState(nextData) {
    this.todos = nextData;
    this.render();
  }

  render() {
    const todoText = this.todos.reduce((htmlString, currentValue) => {
      const { content, time, isCompleted } = currentValue;
      const todo = isCompleted
        ? `<li>${content}<span>${time}</span></li>`
        : `<li><strike>${content}</strike><span>${time}</span></li>`;
      htmlString += todo;
      return `${htmlString}`;
    }, "");
    this.$todoList.innerHTML = todoText;
  }
}

export default TodoList;
