const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create({
  title: "Lost in the wild",
  content: "Today I took a walk on the wild side..",
  author: "John Brown"
});

BlogPosts.create({
  title: "What",
  content: "What the, what?!",
  author: "Tina Fey"
});

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const fields = ['title', 'content', 'author'];

  for(i=0; i<fields.length; i++){
    const field = fields[i];

    if(!(field in req.body)){
      const message = `Please make sure you have put in the ${field} field.`;
      console.log(message);
      res.status(400).send(message);
    }
  }

    console.log('Creating new post.');
    const toBePosted = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(toBePosted);
});

router.put('/:id', jsonParser, (req, res) => {
  const fields = ['title', 'content', 'author'];

  for(i=0; i<fields.length; i++){
    const field = fields[i];

    if(!(field in req.body)){
      const message = `Please make sure you have put in the ${field} field.`;
      console.log(message);
      res.status(400).send(message);
    }
  }

  if(req.body.id !== req.params.id){
    const message = `Please make sure your id's are identical in the header requst and url.`;
    console.error(message);
    res.status(400).send(message);
  }

  console.log('Updating your blog post.');
  const post = BlogPosts.update(req.body);
  res.status(204).json(post);
});

router.delete('/:id', jsonParser, (req, res) => {
  console.log(`Deleting post with id: ${req.params.id}.`);
  res.status(204).json(BlogPosts.delete(req.params.id));
});


module.exports = router;
