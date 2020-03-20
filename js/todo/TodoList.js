import { $ } from "../util/index.js";

class TodoList {
  constructor({ initialTodo, onTodoToggle, onTodoRemove, onModifyModal }) {
    const $todoList = $(".todo-list");

    this.$todoList = $todoList;
    this.todos = initialTodo;
    this.onTodoToggle = onTodoToggle;
    this.onTodoRemove = onTodoRemove;
    this.onModifyModal = onModifyModal;

    this.onClick = e => {
      const node = e.target.nodeName;
      const id = e.target.id;
      const name = e.target.name;

      if (node === "LI" || node === "STRIKE") {
        this.onTodoToggle(id);
      } else if (name === "remove") {
        this.onTodoRemove(id);
      } else if (name === "modify") {
        const todo = this.todos.filter(todo => {
          return todo._id === Number(id) ? todo : "";
        });
        this.onModifyModal(todo, id);
      }
    };
  }

  setState(nextTodos) {
    console.log(nextTodos);
    this.todos = nextTodos;
    this.render();
  }

  render() {
    const todoText = this.todos.reduce((htmlString, currentValue) => {
      const { _id, content, time, isCompleted } = currentValue;
      const todo = isCompleted
        ? `<li id=${_id}>${content}<span>${time}</span><img id=${_id} name="modify" src="../image/modify.png"/><img id=${_id} name="remove" src="../image/delete.png" /></li>`
        : `<li><strike id=${_id}>${content}</strike><span>${time}</span><img id=${_id} name="modify"
         src="../image/modify.png"/><img id=${_id} name="remove" src="../image/delete.png" /></li>`;
      htmlString += todo;
      return `${htmlString}`;
    }, "");
    this.$todoList.innerHTML = todoText;

    this.$todoList.addEventListener("click", this.onClick);
    // 함수로 따로 안빼주고 밑에처럼 바로 코드를 넣어주면 여러번 코드가 실행되는데 Why??
    // this.$todoList.addEventListener("click", e => {
    //   if (e.target.nodeName === "LI" || e.target.nodeName === "STRIKE") {
    //     this.onTodoToggle(e.target.id);
    //   }
    // });
  }
}

export default TodoList;
