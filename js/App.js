// import dummyData from "./dummyData.js";
import Calendar from "./Calendar.js";
import TodoHeader from "./todo/TodoHeader.js";
import TodoList from "./todo/TodoList.js";
import dummyData from "./dummyData.js";

class App {
  $target = null;
  date = new Date();
  todos = [];
  constructor() {
    this.Calendar = new Calendar({
      initialDate: this.date,
      onClickPrevious: () => {
        const month = this.date.getMonth();
        this.date.setMonth(month - 1);
        this.Calendar.setState(this.date);
      },
      onClickNext: () => {
        const month = this.date.getMonth();
        this.date.setMonth(month + 1);
        this.Calendar.setState(this.date);
      },
      onDayClick: e => {
        if (e.target.nodeName === "TD") {
          const date = e.target.textContent;
          this.date.setDate(date);
          this.TodoHeader.setState(this.date);
          this.TodoList.setState(dummyData);
        }
      }
    });

    this.TodoHeader = new TodoHeader({
      initialDate: this.date
    });

    this.TodoList = new TodoList({
      initialTodo: this.todos
    });

    this.Calendar.setState(this.date);
  }
}

export default App;
