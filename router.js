const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  res.send('Server is up!');
});

module.exports = router;
