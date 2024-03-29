 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const middleware=require('./middleware/middleware') 
const { pool } = require('./services/database'); 
const {calculatePrice}=require('./priceCalculate/calculate')
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(middleware);
app.post('/api/price',calculatePrice);
async function startApp() {
   try {
     await pool.connect();
   } catch (error) {
     console.error('Error starting the app:', error);
   }
 }
 startApp();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
