const express = require('express'); 
const knex = require('knex');
const app = require("./app");

const { PORT, DATABASE_URL } = require("./config");

app.get('/api', (req, res) => {
  res.json({ok: true}); 
})

app.set('db', knex({client: 'pg', connection: DATABASE_URL}));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);

  module.exports = {app}
});
