var express = require("express");
var app = express();

app.use(express.static("./public"));
app.listen(8080, function() {
    console.log("babel-plugin-ui5-example is now running at http://localhost:8080/");
});
