import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import getApi from './api';

const app = express();
app.use(cors());

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

const api = getApi();
app.use('/api', api);

app.listen(3000, () => {
  console.log("Your app listening on port 3000!");
});
