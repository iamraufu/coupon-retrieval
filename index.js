const express = require('express');
const app = express();
var cors = require('cors');
const { connectDB } = require('./database/connection');

const SMSRoutes = require('./routes/SMSRoutes')
const PromoRoutes = require('./routes/PromoRoutes')

require('dotenv').config()

app.use(cors(), express.json({ limit: '50mb' }))

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
});

app.get('/health', (req, res) => {
      res.status(200).json({
            status: true,
            message: "OK"
      })
})

app.use('/api/send-sms', SMSRoutes) // SMS API
app.use('/api/promo', PromoRoutes) // SMS API

connectDB()

app.listen(port, () => {
      console.log(`MongoDB connected and production backend is running on port ${port}!`);
});