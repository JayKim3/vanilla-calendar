// import dummyData from "./dummyData.js";
import Calendar from "./Calendar.js";
import TodoHeader from "./todo/TodoHeader.js";

class App {
  $target = null;
  constructor() {
    this.Calendar = new Calendar({
      initialDate: new Date()
    });

    this.TodoHeader = new TodoHeader({});

    this.Calendar.setState("");
  }
}

export default App;
