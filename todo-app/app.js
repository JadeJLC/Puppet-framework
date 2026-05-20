import { createRouter } from "../monFramework/router.j";

const router = createRouter({
  "/active": displayTasksInProgress,
  "/todo": displayUnstartedTasks,
  "/completed": displayCompletedTasks,
  "/": displayAllTasks,
  "/all": displayAllTasks,
  "/clear": clearAllCompletedTasks,
  "/new": addNewTask,
});
