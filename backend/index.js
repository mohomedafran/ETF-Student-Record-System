const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');


// MongoDB URI and Database
const uri = 'mongodb://localhost:27017/';
const dbName = 'ETF_StudentDB';

// Initialize App
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
let db;
MongoClient.connect(uri)
    .then((client) => {
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error(err));


app.use(express.static(path.join(__dirname, '../frontend')));

// 1. Insert a Student
app.post('/students', async (req, res) => {
    const student = req.body;
    try {
        const result = await db.collection('students').insertOne(student);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Show all Students
app.get('/students', async (req, res) => {
    try {
        const students = await db.collection('students').find().toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Find a Student by SID
app.get('/students/sid/:sid', async (req, res) => {
    const sid = parseInt(req.params.sid);
    try {
        const student = await db.collection('students').findOne({ SID: sid });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Find Students by First Name
app.get('/students/firstname/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const students = await db.collection('students').find({ FirstName: name }).toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Find Students by Last Name
app.get('/students/lastname/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const students = await db.collection('students').find({ LastName: name }).toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Find Students by Email
app.get('/students/email/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const students = await db.collection('students').find({ Email: email }).toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Find Students by Nearest City
app.get('/students/city/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const students = await db.collection('students').find({ NearCity: city }).toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. Find Students by Course
app.get('/students/course/:course', async (req, res) => {
    const course = req.params.course;
    try {
        const students = await db.collection('students').find({ Course: course }).toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 9. Find Students by Guardian
app.get('/students/guardian/:guardian', async (req, res) => {
    const guardian = req.params.guardian;
    try {
        const students = await db.collection('students').find({ Guardian: guardian }).toArray();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 10. Update Student by SID
app.put('/students/sid/:sid', async (req, res) => {
    const sid = parseInt(req.params.sid);
    const updates = req.body;
    try {
        const result = await db.collection('students').updateOne({ SID: sid }, { $set: updates });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 11. Update Student by First Name
app.put('/students/firstname/:name', async (req, res) => {
    const name = req.params.name;
    const updates = req.body;
    try {
        const result = await db.collection('students').updateMany({ FirstName: name }, { $set: updates });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 12. Delete Student by SID
app.delete('/students/sid/:sid', async (req, res) => {
    const sid = parseInt(req.params.sid);
    try {
        const result = await db.collection('students').deleteOne({ SID: sid });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
