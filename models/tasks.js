import { Task } from "./task.js";
import colors from "colors";

export class Tasks {
  constructor() {
    this._list = {};
  }

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listTasks() {
    console.log();
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}`;
      const { desc, completedIn } = task;
      const status = completedIn ? "Completed".green : "Pending".red;
      console.log(`${idx.green}. ${desc} :: ${status}`);
    });
  }

  listCompletedTasks(completed = true) {
    console.log();
    let idx = 1;
    this.listArr.forEach((task) => {
      const { desc, completedIn } = task;
      const status = completedIn ? "Completed".green : "Pending".red;
      if (completed) {
        if (completedIn) {
          const date = completedIn.split("T")[0];
          const time = completedIn.split("T")[1].split(".")[0];
          console.log(
            `${idx.toString().green}. ${desc} ${"::".yellow} ${date} - ${time}`
          );
          idx++;
        }
      } else {
        if (!completedIn) {
          console.log(
            `${idx.toString().green}. ${desc} ${"::".yellow} ${status}`
          );
          idx++;
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedIn = null;
      }
    });
  }
}
