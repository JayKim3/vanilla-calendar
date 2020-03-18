// import dummyData from "./dummyData.js";
import Calendar from "./Calendar.js";
import TodoList from "./todo/TodoList.js";

class App {
  $target = null;
  constructor($target) {
    this.$target = $target;

    this.Calendar = new Calendar({
      $target,
      initialDate: Date()
    });
  }
}

export default App;
