const { validateId, validateTask } = require("../validators/taskValidator");

describe("validateId", () => {
  test("validateId should return an error!", () => {
    for (const id of [-1, 0, 2.34]) {
      const { error, value } = validateId(id);
      expect(error).not.toBe(undefined);
      expect(value).toStrictEqual(id);
      console.log(error);
    }
  });

  test("validateId should pass!", () => {
    for (const id of [1, 2, 100, 141431]) {
      const { error, value } = validateId(id);
      expect(error).toStrictEqual(undefined);
      expect(value).toStrictEqual(id);
    }
  });
});

describe("validateTask", () => {
  describe("Invalid Schemas", () => {
    test("Invalid properties should return an error!", () => {
      const tasksArr = [
        {},
        {
          taskName: "taskName",
        },
        {
          id: 1,
          name: "taskName",
          taskPriority: "low",
        },
        {
          state: "on",
          done: false,
        },
      ];
      for (const task of tasksArr) {
        const { error, value } = validateTask({});
        expect(error).not.toBe(undefined);
      }
    });

    test("Wrong ids should returns an error!", () => {
      const name = "taskName";
      const priority = "low";
      const tasksArr = [
        {
          id: 0,
          name,
          priority,
        },
        {
          id: -1,
          name,
          priority,
        },
      ];
      for (const task of tasksArr) {
        const { error, value } = validateTask(task);
        expect(error).not.toBe(undefined);
        expect(value).toEqual(task);
      }
    });

    test("Wrong names should returns an error!", () => {
      const id = 1,
        priority = "low";
      const tasksArr = [
        {
          id,
          priority,
        },
        {
          id,
          name: 3,
          priority,
        },
        {
          id,
          name: "to",
          priority,
        },
        {
          id,
          name: "At the maximum twenty characters per name of task",
          priority,
        },
        {
          id,
          name: "Non alphanum *&!^/\\",
          priority,
        },
      ];
      for (const task of tasksArr) {
        const { error, value } = validateTask(task);
        expect(error).not.toBe(undefined);
        expect(value).toEqual(task);
      }
    });

    test("Wrong priorities should returns an error!", () => {
      const id = 1,
        name = "taskName";
      const tasksArr = [
        {
          id,
          name,
        },
        {
          id,
          name,
          priority: 3,
        },
        {
          id,
          name,
          priority: "non valid",
        },
      ];
      for (const task of tasksArr) {
        const { error, value } = validateTask(task);
        expect(error).not.toBe(undefined);
        expect(value).toEqual(task);
      }
    });

    test("Ids should requires name and priority!", () => {
      const id = 1,
        name = "taskName",
        priority = "low";
      const tasksArr = [
        {
          id,
        },
        {
          id,
          name,
        },
        {
          id,
          priority,
        },
      ];
      for (const task of tasksArr) {
        const { error, value } = validateTask(task);
        expect(error).not.toBe(undefined);
        expect(value).toEqual(task);
      }
    });
  });

  describe("Valid Schemas", () => {
    let validTasksArr = [];

    beforeAll(() => {
      const validIdsArr = [1, 2, 100];
      const validNamesArr = ["123", "abcdefghijklmnopqrst", "Alphanuns123"];
      const validPriorities = ["low", "normal", "high"];
      for (const id of validIdsArr) {
        for (const name of validNamesArr) {
          for (const priority of validPriorities) {
            validTasksArr.push({
              id,
              name,
              priority,
            });
          }
        }
      }
    });

    test("Should return the validate task and undefined error!", () => {
      for (const task of validTasksArr) {
        const { error, value } = validateTask(task);
        expect(error).toStrictEqual(undefined);
        expect(value).toEqual(task);
      }
    });
  });
});
