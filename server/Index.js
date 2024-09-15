const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Model=require("./model/schema");
const cors=require("cors");
const axios = require('axios');

app.use(express.json()); 
app.use(cors())
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/fetch-tickers', async (req, res) => {
    try {
        // Fetch data from the WazirX API
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickersData = response.data;

      
        const tickersArray = Object.values(tickersData)
            .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
            .slice(0, 10); 

        await Model.deleteMany({}); 
        const insertedTickers = await Model.insertMany(tickersArray.map(ticker => ({
            name: ticker.name,
            last: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell,
            volume: ticker.volume,
            base_unit: ticker.base_unit
        })));

        res.status(200).json({
            message: 'Top 10 tickers fetched and stored in the database successfully!',
            data: insertedTickers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching or storing tickers' });
    }
});

app.get('/get-data',async (req,res)=>{
      try {
        const tickers=await Model.find({});
        res.status(200).json({
            message:"tickers data retrive succsfully",
            data:tickers});

      } catch (error) {
        console.log(error);
      }
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});