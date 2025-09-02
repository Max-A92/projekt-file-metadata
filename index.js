const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, function() {
    console.log('Your app is listening on port ' + port);
  });
}

module.exports = app;