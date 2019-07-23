const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex');
const db = knex({
      client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '123',
        database : 'smartbrain'
      }
    });
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// postgres.select('*').from('users'));

const app = express();

app.use(bodyParser.json());
app.use(cors());
 // app.use(bodyParser.urlencoded({extended:false}))


app.get('/', (req, res)=>{

  res.json("database.users :)");
});

//Signin
app.post('/signin', signin.handleSignin(db, bcrypt));

//Register
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
//Retrive the profile
app.get('/profile/:id', profile.handleProfileGet(db, bcrypt));

//Updating user entries
app.put('/image', image.handleImage(db, bcrypt));
app.post('/imageurl', image.handleApiCall);


app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/*
/ --> res = DataBase
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/
