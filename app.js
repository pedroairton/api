const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

const User = require('./model/User');
const Industry = require('./model/Industry');

const userRoutes = require('./routes/user.route')
const industryRoutes = require('./routes/industry.route')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mean', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const userRoute = require('./routes/user.route');
const industryRoute = require('./routes/industry.route');
var app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/user', userRoutes);
app.use('/industry', industryRoutes);


app.get('/user', function(req, res){
  User.find({})
    .then((data) => {
      res.json({message: "<h1>Servidor rodando com ExpressJS</h1>"});
      console.log('Rota de GET Conectada com sucesso!')
    }).catch((err) => {
      console.log(err);
    });
  
  
});

app.post('/user/post', (req, res) => {
  const login = new Login({
    password: req.body.password,
    login: req.body.login,

  });
  login
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/user/delete', (req, res) => {
  Login.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/user/update', (req, res) => {
  Login.findByIdAndUpdate(req.body.id, {
    password: req.body.password,
    login: req.body.login,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});








app.listen(3000,function(){
    console.log('Listening on port 3000!');
});



