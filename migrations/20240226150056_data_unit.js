/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("data_unit", (table) => {
    table.increments(),
      table.string("code_number"),
      table.integer("hour_meter"),
      table.string("date_in"),
      table.string("time_in"),
      table.string("time_out"),
      table.integer("no_WO"),
      table.string("trouble"),
      table.string("pic"),
      table.string("duration");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("data_unit");
};
