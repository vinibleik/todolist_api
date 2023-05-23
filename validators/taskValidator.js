const Joi = require("joi");

const taskSchema = Joi.object({
  id: Joi.number().integer().greater(0),
  name: Joi.string().min(3).max(20).alphanum().required(),
  priority: Joi.string().valid("low", "normal", "high").required(),
}).with("id", ["name", "priority"]);

/**
 * @typedef {Object} Validate
 * @property {any} value - Validated value.
 * @property {string | undefined} error - Error message if validation failed, undefined otherwise.
 */

module.exports = {
  /**
   * Validates an id for an task.
   * @param {number} id - Task id.
   * @returns {Validate}
   */
  validateId(id) {
    const { error, value } = Joi.number().integer().greater(0).validate(id);
    if (error) {
      return /** @type {Validate} */ ({
        value,
        error: error.message,
      });
    }
    return /** @type {Validate} */ ({
      value,
      error,
    });
  },

  /**
   * Validates an task.
   * @param {Object} task - An object representing a task.
   * @returns {Validate}
   */
  validateTask(task) {
    const { error, value } = taskSchema.validate(task);
    if (error) {
      return /** @type {Validate} */ ({
        value,
        error: error.message,
      });
    }
    return /** @type {Validate} */ {
      value,
      error,
    };
  },
};
