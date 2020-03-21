import { $, svg_xmlns, star_path } from "../util/index.js";

class TodoList {
  constructor({
    initialTodo,
    onTodoToggle,
    onTodoRemove,
    onModifyModal,
    onTodoStar
  }) {
    const $todoList = $(".todo-list");

    this.$todoList = $todoList;
    this.todos = initialTodo;
    this.onTodoToggle = onTodoToggle;
    this.onTodoRemove = onTodoRemove;
    this.onModifyModal = onModifyModal;
    this.onTodoStar = onTodoStar;

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
      } else if (node === "path") {
        this.onTodoStar(id);
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
      const { _id, content, time, isCompleted, star } = currentValue;
      const todo = isCompleted
        ? `<li id=${_id}>${content}<span>${time}</span><img id=${_id} name="modify" src="../image/modify.png"/><img id=${_id} name="remove" src="../image/delete.png" />`
        : `<li><strike id=${_id}>${content}</strike><span>${time}</span><img id=${_id} name="modify"
         src="../image/modify.png"/><img id=${_id} name="remove" src="../image/delete.png" />
        `;

      const checkStar = star
        ? `<svg xmlns=${svg_xmlns}>
         <path id=${_id} 
             fill = "yellow"
             d="${star_path}"
              transform="translate(-100)"></path>
          </svg>`
        : `<svg xmlns=${svg_xmlns}>
          <path id=${_id} 
              d="${star_path}"
               transform="translate(-100)"></path>
           </svg></li>`;

      htmlString += todo + checkStar;
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
