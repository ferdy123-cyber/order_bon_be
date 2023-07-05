const express = require("express");
const app = express();
const cors = require("cors");
const port = 8181;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "10000mb" }));
app.use(express.json({ limit: "10000mb" }));

const bon_order = require("./routes/bon_order");
const pembayaran = require("./routes/pembayaran");
const pengiriman = require("./routes/pengiriman");

app.use("/bonOrder", bon_order);
app.use("/pembayaran", pembayaran);
app.use("/pengiriman", pengiriman);

app.use((error, req, res, next) => {
  return res.status(400).send({
    status: "error",
    code: 500,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
