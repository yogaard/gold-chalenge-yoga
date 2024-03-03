/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("data_unit").del();
  await knex("data_unit").insert([
    {
      id: 1,
      code_number: "LD0001",
      hour_meter: 3000,
      date_in: "21/02/24",
      time_in: "07:00",
      time_out: "10:00",
      no_WO: 263546,
      trouble: "periodic service 500HM",
      pic: "steven,eko",
      duration: "04:00",
    },
    {
      id: 2,
      code_number: "LD0002",
      hour_meter: 3001,
      date_in: "21/02/24",
      time_in: "07:00",
      time_out: "10:00",
      no_WO: 263546,
      trouble: "periodic service 500HM",
      pic: "mario,bran",
      duration: "04:00",
    },
    {
      id: 3,
      code_number: "LD0001",
      hour_meter: 3000,
      date_in: "21/02/24",
      time_in: "07:00",
      time_out: "10:00",
      no_WO: 263546,
      trouble: "periodic service 500HM",
      pic: "hesel,vandy",
      duration: "04:00",
    },
    {
      id: 4,
      code_number: "LD0001",
      hour_meter: 3000,
      date_in: "21/02/24",
      time_in: "07:00",
      time_out: "10:00",
      no_WO: 263546,
      trouble: "periodic service 500HM",
      pic: "steven,eko",
      duration: "04:00",
    },
    {
      id: 5,
      code_number: "LD0002",
      hour_meter: 3001,
      date_in: "21/02/24",
      time_in: "07:00",
      time_out: "10:00",
      no_WO: 263546,
      trouble: "periodic service 500HM",
      pic: "mario,bran",
      duration: "04:00",
    },
    {
      id: 6,
      code_number: "LD0001",
      hour_meter: 3000,
      date_in: "21/02/24",
      time_in: "07:00",
      time_out: "10:00",
      no_WO: 263546,
      trouble: "periodic service 500HM",
      pic: "hesel,vandy",
      duration: "04:00",
    },
  ]);
};
