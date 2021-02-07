const express = require('express');
const cors = require('cors');
const data = require('./data.js');
const app = express();
const port = 5500;
app.use(cors());
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.listen(port, () => console.log(`we runing on server ${port}`));
