import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import getApi from './api';
import User from './models/User';
import getAuth from './resourses/Auth';


// ctx.models.User
const models = {
  User
}

const auth = getAuth({
  models
})


// mongoose.connect('mongodb://publicdb.mgbeta.ru/smironov');
mongoose.connect('mongodb://publicdb.mgbeta.ru/isuvorov_skb4');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(auth.parseToken);
// app.use(auth.parseUser);


app.get('/', (req, res) => {
  res.json({
    hello: "JS World"
  });
});

const secret = 'shhhhhhared-secret';

app.get('/token', (req, res) => {
  const data = {
    user: 'smironov',
    name: 'Sergey Mironov'
  };
  return res.json(jwt.sign(data, secret));
})

app.get('/protected',
  expressJwt({secret}),
  (req, res) => {
    return res.json(req.user);
  })


// const api = getApi({});
// app.use('/api', api);
app.post('/auth/signup', auth.signup);

app.listen(3000, () => {
  console.log("Your app listening on port 3000!");
});
