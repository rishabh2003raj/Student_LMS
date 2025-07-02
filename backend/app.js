const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


module.exports = app;