const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});