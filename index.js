var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var manufacturers = require("./routes/manufacturers.js");
var models = require("./routes/models.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/manufacturer", manufacturers);
app.use("/model", models);
app.all("*", function(req, res){
   res.send("Wrong url");
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is listening");
});