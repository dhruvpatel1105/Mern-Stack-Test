// paste in server.js file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace 'your_mongodb_uri' with your MongoDB connection string)
mongoose.connect('mongodb+srv://dhruvpatel6651:Dhruv-2001@cluster1.azhkzzj.mongodb.net/visualization', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          console.log("Database connected");
        })
        .catch((error) => {
          console.error("Error connecting to MongoDB:", error);
        });
        
const userSchema = new mongoose.Schema({
  end_year: { type: Number },
  intensity: { type: Number, required: true },
  sector: { type: String, required: true },
  topic: { type: String, required: true },
  insight: { type: String, required: true },
  url: { type: String },
  region: { type: String },
  start_year: { type: Number },
  impact: { type: Number },
  added: { type: Date, default: Date.now },
  published: { type: Date, default: Date.now },
  country: { type: String },
  relevance: { type: Number, required: true },
  pestle: { type: String },
  source: { type: String, required: true },
  title: { type: String, required: true },
  likelihood: { type: Number, required: true },
});

const userModel = mongoose.model('data1', userSchema);


app.get('/', async (req, res) => {
  try {
    const data = await userModel.find();
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});