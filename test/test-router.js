const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Endpoints', function(){

  before(function(){
    return runServer();
  });

  after(function(){
    return closeServer();
  });

  it('Should return blog posts on GET', function(){
    return chai.request(app)
    .get('/blog-posts')
    .then(function(res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.an('array');
      res.body.length.should.be.at.least(1);
      res.body.forEach(function(item){
        item.should.be.an('object');
        item.should.have.all.keys('id','title','author','content','publishDate');
      });
    });
  });

  it('Should create a new blog post on POST', function(){
    const newPost = {
      'title':'New Post',
      'content':"This is a new post",
      'author':"John",
      'publishDate':'07301990'
    };

    return chai.request(app)
    .post('/blog-posts')
    .send(newPost)
    .then(function(res){
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.an('object');
      res.body.should.have.all.keys('id','title','author','content','publishDate');
      res.should.not.be.null;
      res.body.should.eql(Object.assign(newPost, {id: res.body.id}));
    });
  });

  it('Should update a blog post on PUT.', function(){


    return chai.request(app)
    .get('/blog-posts')
    .then(function(res){
      const newPost = {
        'title':'New Post',
        'content':"This is a new post",
        'author':"John",
        'publishDate':'07301990',
        'id': res.body[0].id
      };
      return chai.request(app)
      .put(`/blog-posts/${res.body[0].id}`)
      .send(newPost)
      .then(function(res){
        res.should.have.status(200);
        res.body.should.have.all.keys('id', 'title', 'content', 'author', 'publishDate');
        res.body.should.an('object');
        res.should.be.json;
        res.body.should.eql(newPost);
      });
    });
  });

  it('Should remove a blog post on DELETE', function(){
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res){
        return chai.request(app)
        .delete(`/blog-posts/${res.body[0].id}`)
        .then(function(res){
          res.should.have.status(204);
        });
      });
  });
});
