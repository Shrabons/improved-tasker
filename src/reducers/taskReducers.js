/* eslint-disable no-unreachable */
const defaultTask = [
  {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["Web", "react", "js"],
    priority: "High",
    isFavorite: false,
  },
];

const tasksReducers = (tasks, action) => {
  switch (action.type) {
    case "added": {
      if (action.isAdd) {
        return [...tasks, action.newTask];
      } else {
        return tasks.map((task) => {
          if (task.id === action.newTask.id) {
            return action.newTask;
          }

          return task;
        });
      }
      break;
    }
    case "delete": {
      return tasks.filter((item) => item.id !== action.id);
      break;
    }
    case "allDelete": {
      tasks.length = 0;
      return [...tasks];
      break;
    }
    case "favourite": {
      if (!action.fav) {
        let taskIndex = tasks.findIndex((task) => task.id === action.id);
        let newTasks = [...tasks];
        newTasks[taskIndex].isFavorite = true;
        return newTasks;
      } else {
        let taskIndex = tasks.findIndex((task) => task.id === action.id);
        let newTasks = [...tasks];
        newTasks[taskIndex].isFavorite = false;
        return newTasks;
      }
      break;
    }
    case "search": {
      let searchValue = tasks.filter((task) =>
        task.title.toLowerCase().includes(action.searchTerm.toLowerCase())
      );
      return [...searchValue];
      break;
    }
    default: {
      throw Error("No action matche");
    }
  }
};

export { defaultTask, tasksReducers };
