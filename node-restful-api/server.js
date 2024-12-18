const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message:"Microservice : Membuat RESTful API dengan NodeJS." });
});

require("./app/routes/post.routes")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server berjalan pada PORT ${PORT}`);
});