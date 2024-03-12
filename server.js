 require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
const port = 3000;
const cors=require('cors');


var allowlist = ['http://example1.com', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } 
  } else {
    corsOptions = { origin: false } 
  }
  callback(null, corsOptions) 
}
app.use(cors(corsOptionsDelegate))


app.use(express.json())

const url=process.env.MONGO_URL


main().catch(err => console.log(err));
async function main() {
 
  await mongoose.connect(url);
   console.log("database connected");
}




const product = require('./routes/product');
app.use("/products",product);

const auth = require('./routes/auth');
app.use("/auth",auth)


const cart = require('./routes/cart');
app.use("/cart",cart);

const user = require('./routes/user');


app.use("/users",user)


app.get('/', (req, res) => {
  res.send('Hello World!!!')
});
app.post('/', (req, res) => {
  res.send('Hello World! post ')
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



