const express = require("express");
const app = express();
app.use(express.json());
const students = [ 
    { id: 1, name: "Rahul", course: "CSE" },
    { id: 2, name: "Priya", course: "ECE" }
];
app.get("/", (req, res) => { res.send("Student Management API is running!"); });
app.get("/students", (req, res) => { res.json(students); });
app.listen(3000, "0.0.0.0", () => { console.log("Server running on port 3000"); });
