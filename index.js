const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const db = require("./db");
const pg = require("pg");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DIALECT,
  port: process.env.PORT_NUMBER,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("error in connection");
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("error executing query");
    }
    console.log("Connected to database");
  });
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// formulir tambah data
app.get("/form", (req, res) => {
  res.render("form");
});

// form edit
app.put("/put/data_unit/:id", async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = {
      text: "SELECT * FROM data_unit WHERE id = $1",
      values: [userId],
    };
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.render("edit_form", { user });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get form edit
// server.js
app.get("/edit/:rowId", (req, res) => {
  const rowId = req.params.rowId;

  res.render("edit_form", { rowId });
});

// get post form edit
app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    code_number,
    hour_meter,
    date_in,
    time_in,
    time_out,
    no_WO,
    trouble,
    pic,
    duration,
  } = req.body;

  try {
    const query = {
      text: "UPDATE data_unit SET code_number = $1, hour_meter = $2, date_in = $3, time_in = $4, time_out = $5, no_WO= $6, trouble = $7, pic = $8, duration = $9 WHERE id = $10",
      values: [
        code_number,
        hour_meter,
        date_in,
        time_in,
        time_out,
        no_WO,
        trouble,
        pic,
        duration,
        id,
      ],
    };
    await pool.query(query);

    res.send("Data berhasil disunting");
  } catch (error) {
    console.error("Terjadi kesalahan saat menyunting data:", error);
    res.status(500).send("Terjadi kesalahan saat menyunting data");
  }
  res.redirect("/");
});

// menampilkan data
app.get("/", (req, res) => {
  pool.query("SELECT * FROM data_unit", (err, result) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.send("Error fetching data");
    } else {
      res.render("index", { rows: result.rows });
    }
  });
});

app.get("/data_unit", async (req, res) => {
  const data_unit = await db("data_unit").select("*");
  return res.json({ data: data_unit });
});

app.get("/data_unit/:id", async (req, res) => {
  const { id } = req.params;
  const data_unit = await db("data_unit")
    .select("*")
    .where({
      id: id,
    })
    .first();
  return res.json({ data: data_unit });
});

//submit data
app.post("/post/data_unit", async (req, res) => {
  const {
    code_number,
    hour_meter,
    date_in,
    time_in,
    time_out,
    no_WO,
    trouble,
    pic,
    duration,
  } = req.body;
  const data_unit = await db("data_unit")
    .insert({
      code_number: code_number,
      hour_meter: hour_meter,
      date_in: date_in,
      time_in: time_in,
      time_out: time_out,
      no_WO: no_WO,
      trouble: trouble,
      pic: pic,
      duration: duration,
    })
    .returning(["id"]);
  return res.json({
    message: "Data berhasil ditambahkan",
    data: {
      id: data_unit[0].id,
      code_number: code_number,
      hour_meter: hour_meter,
      date_in: date_in,
      time_in: time_in,
      time_out: time_out,
      no_WO: no_WO,
      trouble: trouble,
      pic: pic,
      duration: duration,
    },
  });
});
// edit data
// app.put("/put/data_unit/:id", async (req, res) => {
//   const { id } = req.params;
//   const {
//     code_number,
//     hour_meter,
//     date_in,
//     time_in,
//     time_out,
//     no_WO,
//     trouble,
//     pic,
//     duration,
//   } = req.body;

//   await db("data_unit")
//     .where({
//       id: id,
//     })
//     .update({
//       code_number: code_number,
//       hour_meter: hour_meter,
//       date_in: date_in,
//       time_in: time_in,
//       time_out: time_out,
//       no_WO: no_WO,
//       trouble: trouble,
//       pic: pic,
//       duration: duration,
//     });
//   return res.json({
//     messages: "Data berhasil diupdate",
//     data: {
//       id: id,
//       code_number: code_number,
//       hour_meter: hour_meter,
//       date_in: date_in,
//       time_in: time_in,
//       time_out: time_out,
//       no_WO: no_WO,
//       trouble: trouble,
//       pic: pic,
//       duration: duration,
//     },
//   });
// });

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM data_unit WHERE id = $1", [id], (err) => {
    if (err) {
      console.error("Error executing query", err.stack);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});
// server listening
app.listen(port, () => console.log(`server is running at port ${port}`));
