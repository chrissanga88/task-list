import Header from "./header.js";
import TaskList from "./taskList.js";
import TaskListItem from "./taskListItem.js";

function createDocument(title, tasks = []) {
  const header = new Header().render();
  const taskListItems = tasks.map(
    (task) => new TaskListItem([task.text], task.priority)
  );
  const taskList = new TaskList(taskListItems).render();

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="../assets/style.css" />
    </head>
    <body>
      <div class="card">
        ${header}
        ${taskList}
      </div>
    </body>
  </html>
  `;
}

export {createDocument};
