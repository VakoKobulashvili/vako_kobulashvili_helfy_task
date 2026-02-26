const express = require("express");
const cors = require("cors");
const routes = require("./routes/tasks.routes");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", routes);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
