// Create web server
// Use the express library
const express = require('express');
const app = express();
// Use the body-parser library
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Use the cors library
const cors = require('cors');
app.use(cors());
// Use the mongoose library
const mongoose = require('mongoose');
// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/comments');
// Define the Comment model
const Comment = mongoose.model('Comment', {
    username: String,
    body: String,
    date: { type: Date, default: Date.now }
});
// Get comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.send(comments);
    });
});
// Post comments
app.post('/comments', (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send(comment);
    });
});
// Listen on port 3001
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});