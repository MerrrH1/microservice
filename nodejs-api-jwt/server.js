const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/model");
const Role = db.role;
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Belajar Microservice di UNPRI" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server berjalan pada PORT ${PORT}`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "moderatorr"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}