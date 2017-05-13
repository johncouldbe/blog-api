const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const morgan = require('morgan');
const blogRouter = require('./blog-router');

app.use(morgan('common'));
app.use('/blog-posts', blogRouter);

app.listen(process.env.PORT || 8080, ()=> {
  console.log(`Your app is listening at ${process.env.PORT || 8080}`);
});
