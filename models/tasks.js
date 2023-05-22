/**
 * @typedef {Object} Task
 * @property {number} id - The unique ID of the task.
 * @property {string} name - The name of the task.
 * @property {string} priority - The priority of the task.
 */

const createTask = (() => {
  let id = 0;

  /**
   * Creates a new task.
   * @param {string} name - The name of the task
   * @param {string} priority  - The priority of the task.
   * @returns {Task} The created task.
   */
  function __createTask(name, priority) {
    return /** @type {Task} */ ({ id: ++id, name, priority });
  }

  return __createTask;
})();

/**
 * An Array of Tasks containing all the tasks.
 * @type {Task[]}
 */
const tasks = [];

module.exports = {
  /**
   * Return the tasks array
   * @returns {Task[]}
   */
  getTasks() {
    return tasks;
  },

  /**
   * Returns the task with the provided id or undefined if don't find.
   * @param {number} id - The Task id to search for.
   * @returns {Task | undefined}
   */
  getTaskById(id) {
    return tasks.find((task) => task.id == id);
  },

  /**
   * Return the index of the task with the provided id or -1 if don't find.
   * @param {number} id - The task id to search for.
   * @returns {number}
   */
  getTaskIndexById(id) {
    return tasks.findIndex((task) => task.id == id);
  },

  /**
   * Creates a new task and returns it.
   * @param {string} name - The task name.
   * @param {string} priority - The task priority.
   * @returns {Task}
   */
  newTask(name, priority) {
    const task = createTask(name, priority);
    tasks.push(task);
    return task;
  },

  /**
   * Update the task's name and priority with the given id and return the updated task.
   * If the id can't be found, returns undefined.
   * @param {number} id - The task id.
   * @param {string} name - The task name.
   * @param {string} priority - The task priority.
   * @returns {Task | undefined}
   */
  updateTask(id, name, priority) {
    const task = this.getTaskById(id);
    if (task !== undefined) {
      task.name = name;
      task.priority = priority;
    }
    return task;
  },

  /**
   * Delete the task with the given id and returns it. If the id can't be find returns undefined.
   * @param {number} id - The task id.
   * @returns {Task | undefined}
   */
  deleteTask(id) {
    const index = this.getTaskIndexById(id);
    if (index === -1) {
      return undefined;
    }
    const task = tasks.splice(index, 1);
    return task[0];
  },
};
