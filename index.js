const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const db = require("./db");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
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

app.put("/put/data_unit/:id", async (req, res) => {
  const { id } = req.params;
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

  await db("data_unit")
    .where({
      id: id,
    })
    .update({
      code_number: code_number,
      hour_meter: hour_meter,
      date_in: date_in,
      time_in: time_in,
      time_out: time_out,
      no_WO: no_WO,
      trouble: trouble,
      pic: pic,
      duration: duration,
    });
  return res.json({
    messages: "Data berhasil diupdate",
    data: {
      id: id,
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

app.delete("/delete/data_unit/:id", async (req, res) => {
  const { id } = req.params;

  await db("data_unit")
    .where({
      id: id,
    })
    .del();
  return res.json({ messages: "Data unit berhasil dihapus" });
});

app.listen(port, () => console.log(`running on port ${port}`));
