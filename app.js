const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Arnav:Arnav1234@todolist.o66gr.mongodb.net/ToDoListDB");

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const listSchema = new mongoose.Schema({
  name: String,
});

const List = mongoose.model("item", listSchema);

let item1=new List({
    name:"Welcome To Your ToDoList!!!"
})

let defaultarray = [item1];




app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let currentDay = today.toLocaleDateString("en-US", options);

  List.find({}, function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length == 0) {
        List.insertMany(defaultarray, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully added items to List");
          }
        });
      }
      res.render("list", {
        listTitle: currentDay,
        newtask: foundItems,
      });
    }
  });
});

app.post("/", (req, res) => {
    let item = new List({
      name: req.body.Task,
    });
    item.save();

    res.redirect("/");

});

app.post("/delete", (req, res) => {
  const checkItemid=req.body.checkbox;
    List.deleteOne({_id:checkItemid},(err)=>{
        if(err)
        {
            console.log(err)
        }
    })
    res.redirect('/')
});



app.listen(3000);
