const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(process.cwd() + '/public'));

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

const listener = app.listen(port, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});