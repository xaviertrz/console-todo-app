import {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirm,
  showCheckList,
} from "./helpers/inquirer.js";
import { saveFile, readDB } from "./helpers/saveFile.js";
import { Tasks } from "./models/tasks.js";

async function main() {
  let option = "";
  const tasks = new Tasks();

  const dbTasks = readDB();
  if (dbTasks) {
    tasks.loadTasksFromArray(dbTasks);
  }

  do {
    option = await inquirerMenu();
    switch (option) {
      case "1":
        const desc = await readInput("Task description: ");
        tasks.createTask(desc);
        break;
      case "2":
        if (!tasks.listArr.length) {
          console.log("\nNo tasks to list");
          break;
        }
        tasks.listTasks();
        break;

      case "3":
        let completedTasks = false;
        tasks.listArr.forEach((task) => {
          if (task.completedIn) completedTasks = true;
        });

        completedTasks
          ? tasks.listCompletedTasks()
          : console.log("\nNo completed tasks");
        break;
      case "4":
        let pendingTasks = false;
        tasks.listArr.forEach((task) => {
          if (!task.completedIn) pendingTasks = true;
        });

        pendingTasks
          ? tasks.listCompletedTasks(false)
          : console.log("\nNo pending tasks");
        break;
      case "5":
        if (!tasks.listArr.length) {
          console.log("\nNo tasks to complete");
          break;
        }
        const ids = await showCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await listTasksDelete(tasks.listArr);
        if (!id) {
          console.log("\nNo tasks to delete");
        } else {
          const ok = await confirm("Are you sure?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted");
          }
        }
        break;
    }

    saveFile(tasks.listArr);
    await pause();
  } while (option !== "0");
}

main();
