const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const excelRoutes = require('./routes/excelRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('yours database address');

app.use('/api', excelRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
