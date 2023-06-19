'use strict';
const notFoundHandler = (req, res) => {
    res.status(404).json({ error: 'Not found' });
  };
  
  module.exports = notFoundHandler;