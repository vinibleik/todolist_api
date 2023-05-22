const tasks = require("../models/tasks");

describe("Initial tasks", () => {
  test("getTasks should return an empty list!", () => {
    const tasksArray = tasks.getTasks();
    expect(tasksArray).toEqual([]);
    expect(tasksArray.length).toBe(0);
  });

  test("getTaskById should return undefined", () => {
    expect(tasks.getTaskById(0)).toBe(undefined);
  });

  test("getTaskIndexById should return -1", () => {
    expect(tasks.getTaskIndexById(0)).toBe(-1);
  });
});

describe("Adding new tasks", () => {
  let taskOne, taskTwo, taskThree;
  let task1, task2, task3;

  beforeAll(() => {
    taskOne = { id: 1, name: "taskOne", priority: "low" };
    taskTwo = { id: 2, name: "taskTwo", priority: "normal" };
    taskThree = { id: 3, name: "taskThree", priority: "high" };
    task1 = tasks.newTask(taskOne.name, taskOne.priority);
    task2 = tasks.newTask(taskTwo.name, taskTwo.priority);
    task3 = tasks.newTask(taskThree.name, taskThree.priority);
  });

  test("newTask should return the created tasks!", () => {
    expect(task1).toEqual(taskOne);
    expect(task2).toEqual(taskTwo);
    expect(task3).toEqual(taskThree);
  });

  test("The tasks arrays should be updated!", () => {
    const tasksArray = tasks.getTasks();
    expect(tasksArray).toEqual([taskOne, taskTwo, taskThree]);
    expect(tasksArray.length).toBe(3);
  });

  test("getTaskById should return the task or undefined!", () => {
    const undef1 = tasks.getTaskById(0);
    const task1 = tasks.getTaskById(1);
    const task2 = tasks.getTaskById(2);
    const task3 = tasks.getTaskById(3);
    const undef2 = tasks.getTaskById(4);

    expect(undef1).toStrictEqual(undefined);
    expect(task1).toEqual(taskOne);
    expect(task2).toEqual(taskTwo);
    expect(task3).toEqual(taskThree);
    expect(undef2).toStrictEqual(undefined);
  });

  test("getTaskIndexById should the task index or -1!", () => {
    const undef1 = tasks.getTaskIndexById(0);
    const task1 = tasks.getTaskIndexById(1);
    const task2 = tasks.getTaskIndexById(2);
    const task3 = tasks.getTaskIndexById(3);
    const undef2 = tasks.getTaskIndexById(4);

    expect(undef1).toStrictEqual(-1);
    expect(task1).toEqual(0);
    expect(task2).toEqual(1);
    expect(task3).toEqual(2);
    expect(undef2).toStrictEqual(-1);
  });
});

describe("Updating tasks", () => {
  const newName = "newName";
  const newPriority = "newPriority";

  const updatedTasks = [
    { id: 1, name: newName, priority: newPriority },
    { id: 2, name: newName, priority: newPriority },
    { id: 3, name: newName, priority: newPriority },
  ];

  test("updateTask with invalid id should return undefined!", () => {
    expect(tasks.updateTask(0, newName, newPriority)).toStrictEqual(undefined);
    expect(tasks.updateTask(4, newName, newPriority)).toStrictEqual(undefined);
  });

  test("updateTask should return the updated task!", () => {
    expect(tasks.updateTask(1, newName, newPriority)).toEqual(updatedTasks[0]);
    expect(tasks.updateTask(2, newName, newPriority)).toEqual(updatedTasks[1]);
    expect(tasks.updateTask(3, newName, newPriority)).toEqual(updatedTasks[2]);
  });

  test("The task list should be updated too!", () => {
    expect(tasks.getTasks()).toEqual(updatedTasks);
  });
});

describe("Deleting tasks", () => {
  test("deleteTask tasks with invalid id should return undefined!", () => {
    expect(tasks.deleteTask(0)).toStrictEqual(undefined);
    expect(tasks.deleteTask(4)).toStrictEqual(undefined);
  });

  test("deleteTask should return the task deleted!", () => {
    const newName = "newName";
    const newPriority = "newPriority";

    const deletedTasks = [
      { id: 1, name: newName, priority: newPriority },
      { id: 2, name: newName, priority: newPriority },
      { id: 3, name: newName, priority: newPriority },
    ];
    expect(tasks.deleteTask(1)).toEqual(deletedTasks[0]);
    expect(tasks.deleteTask(2)).toEqual(deletedTasks[1]);
    expect(tasks.deleteTask(3)).toEqual(deletedTasks[2]);
  });

  test("deleteTask with an empty list should return undefined!", () => {
    expect(tasks.deleteTask(0)).toStrictEqual(undefined);
  });

  test("The task list should be empty now!", () => {
    const tasksArray = tasks.getTasks();
    expect(tasksArray).toEqual([]);
    expect(tasksArray.length).toBe(0);
  });
});
