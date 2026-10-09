const express = require("express");
const app = express();

app.use(express.json());

let students = [];
let id = 1;

// GET - All students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET - Student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) return res.status(404).send("Student not found");
    res.json(student);
});

// POST - Create student
app.post("/students", (req, res) => {
    const student = { id: id++, ...req.body };
    students.push(student);
    res.status(201).json(student);
});

// PUT - Replace entire student
app.put("/students/:id", (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) return res.status(404).send("Student not found");

    students[index] = {
        ...req.body,
        id: Number(req.params.id)
    };

    res.json(students[index]);
});

// PATCH - Update selected fields
app.patch("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) return res.status(404).send("Student not found");

    Object.assign(student, req.body);
    res.json(student);
});

// DELETE - Remove student
app.delete("/students/:id", (req, res) => {
    const index = students.findIndex(
        s => s.id === Number(req.params.id)
    );

    if (index === -1) return res.status(404).send("Student not found");

    students.splice(index, 1);
    res.send("Student deleted successfully");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

/*
npm init -y
npm install express
node server.js
*/