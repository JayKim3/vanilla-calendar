import Calendar from "./Calendar.js";
import TodoHeader from "./todo/TodoHeader.js";
import TodoInput from "./todo/TodoInput.js";
import TodoList from "./todo/TodoList.js";
import TodoCount from "./todo/TodoCount.js";
import TodoModify from "./todo/TodoModify.js";
import { checkError } from "./validation/index.js";
// import dummyData from "./dummyData.js";

class App {
  constructor() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.nowMonth = this.date.getMonth();

    this.getAllTodoLocalStorage();
    this.getDailyTodoLocalStorage();

    this.Calendar = new Calendar({
      initialDate: this.date,
      nowMonth: this.nowMonth,
      onClickPrevious: () => {
        this.month = this.date.getMonth();
        this.date.setMonth(this.month - 1);
        this.Calendar.setState(this.date);
      },
      onClickNext: () => {
        this.month = this.date.getMonth();
        this.date.setMonth(this.month + 1);
        this.Calendar.setState(this.date);
      },
      onDayClick: e => {
        if (e.target.nodeName === "TD" && e.target.textContent !== " ") {
          const nowDate = this.selectedDate(e.target.textContent);
          this.date.setDate(this.day);
          this.TodoHeader.setState(this.date);
          this.dailyTodos = this.todos.filter(todo => {
            return todo.stringDate === nowDate ? todo : "";
          });
          this.setDailyTodoLocalStorage();
          this.TodoList.setState(this.dailyTodos);
          this.TodoCount.setState(this.dailyTodos);
          this.Calendar.setState(this.date);
        }
      }
    });

    this.TodoHeader = new TodoHeader({
      initialDate: this.date
    });

    this.TodoInput = new TodoInput({
      initialDate: this.date,
      initialId: 0,
      onAddTodo: newTodo => {
        this.todos.push(newTodo);
        this.setAllTodoLocalStorage();
        const nowDate = this.selectedDate();
        this.dailyTodos = this.todos.filter(todo => {
          return todo.stringDate === nowDate ? todo : "";
        });
        this.setDailyTodoLocalStorage();
        this.TodoList.setState(this.dailyTodos);
        this.TodoCount.setState(this.dailyTodos);
      },
      onAllRemoveTodo: () => {
        // 현재 todos에 있는 dailyTodos를 지워줘야함

        console.log(this.todos);

        this.dailyTodos = [];
        this.TodoList.setState(this.dailyTodos);
        this.TodoCount.setState(this.dailyTodos);
        this.setAllTodoLocalStorage();
        this.setDailyTodoLocalStorage();
      }
    });

    this.TodoList = new TodoList({
      initialTodo: this.todos,
      onTodoToggle: id => {
        this.dailyTodos = this.dailyTodos.filter(todo => {
          return todo._id === Number(id)
            ? // 밑에 코드 이해 안감
              [(todo.isCompleted = !todo.isCompleted)]
            : todo;
        });
        this.setAllTodoLocalStorage();
        this.setDailyTodoLocalStorage();
        this.TodoList.setState(this.dailyTodos);
        this.TodoCount.setState(this.dailyTodos);
      },
      onTodoRemove: id => {
        this.dailyTodos = this.dailyTodos.filter(todo => {
          return todo._id !== Number(id) ? todo : "";
        });
        this.todos = this.todos.filter(todo => {
          return todo._id !== Number(id) ? todo : "";
        });
        this.setAllTodoLocalStorage();
        this.setDailyTodoLocalStorage();
        this.TodoList.setState(this.dailyTodos);
        this.TodoCount.setState(this.dailyTodos);
      },
      onModifyModal: (todo, id) => {
        this.TodoModify.setState(this.date, todo[0].content, id);
      },
      onTodoStar: id => {
        this.dailyTodos = this.dailyTodos.filter(todo => {
          return todo._id === Number(id)
            ? // 밑에 코드 이해 안감
              [(todo.star = !todo.star)]
            : todo;
        });
        this.setAllTodoLocalStorage();
        this.setDailyTodoLocalStorage();
        this.TodoList.setState(this.dailyTodos);
      }
    });

    this.TodoCount = new TodoCount({
      totalTodo: () => {
        return this.dailyTodos.length;
      },
      onCompletedTodo: () => {
        return this.dailyTodos.filter(todo => todo.isCompleted).length;
      }
    });

    this.TodoModify = new TodoModify({
      modalDate: this.selectedDate,
      onTodoModify: (content, id) => {
        this.dailyTodos = this.dailyTodos.filter(todo => {
          return todo._id === Number(id) ? (todo.content = content) : todo;
        });
        this.todos = this.todos.filter(todo => {
          return todo._id === Number(id) ? (todo.content = content) : todo;
        });
        this.setAllTodoLocalStorage();
        this.setDailyTodoLocalStorage();
        this.TodoList.setState(this.dailyTodos);
      }
    });

    this.render();
  }

  selectedDate(textContent) {
    if (textContent) {
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.day = textContent;
    } else {
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.day = this.date.getDate();
    }
    return `${this.year}-${this.month + 1}-${this.day}`;
  }

  setAllTodoLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  getAllTodoLocalStorage() {
    try {
      const todos = localStorage.getItem("todos");
      this.todos = checkError.isNotArray(JSON.parse(todos));
    } catch (e) {
      this.todos = [];
    }
  }

  setDailyTodoLocalStorage() {
    localStorage.setItem("dailyTodos", JSON.stringify(this.dailyTodos));
  }

  getDailyTodoLocalStorage() {
    try {
      const dailyTodos = localStorage.getItem("dailyTodos");
      this.dailyTodos = checkError.isNotArray(JSON.parse(dailyTodos));
    } catch (e) {
      this.dailyTodos = [];
    }
  }

  render() {
    this.Calendar.setState(this.date);
    this.TodoHeader.setState(this.date);
    const nowDate = this.selectedDate();
    this.dailyTodos = this.todos.filter(todo => {
      return todo.stringDate === nowDate ? todo : "";
    });
    this.TodoList.setState(this.dailyTodos);
    this.TodoCount.setState(this.dailyTodos);
  }
}

export default App;
