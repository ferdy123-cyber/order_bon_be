const moment = require("moment/moment");
const db = require("../config");
const { v4 } = require("uuid");

const request = db.promise();

let createdAt = new Date().toLocaleString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

let updatedAt = new Date().toLocaleString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const create = async (req, res, next) => {
  try {
    const { nama } = req.body;
    const sql = `INSERT INTO pengiriman (id, nama, created_at, updated_at) VALUES ('${v4()}', '${nama}', '${createdAt}', '${updatedAt}')`;
    await request.query(sql);
    res.status(200).send({
      message: "input pengiriman berhasil",
    });
  } catch (err) {
    return next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const query = req.query;
    const limit = query.limit ? Number(query.limit) : 50;
    const offset = query.offset ? Number(query.offset) : 0;
    const data = await request.query(
      `SELECT * FROM pengiriman ORDER BY ${query.sortby} ${query.sorting} LIMIT ${limit} OFFSET ${offset}`
    );
    const total = await request.query(
      `SELECT COUNT(id) as total FROM pengiriman`
    );
    res.status(200).send({
      message: "success",
      data: data[0],
      offset: offset,
      limit: limit,
      total: total[0][0].total,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  get,
};
