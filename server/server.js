require('dotenv').config();
const express = require('express');

var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');

// Route includes
const commentsRouter = require('./routes/comments.router')
const tokenRouter = require('./routes/token.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())

/* Routes */
app.use('/api/comments', commentsRouter);
app.use('/api/token', tokenRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app; 