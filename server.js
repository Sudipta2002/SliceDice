const express = require('express')
const rateLimit = require('express-rate-limit')
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const app = express();
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(limiter);


app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.send('Hi! Its me!')
});
const PORT = 5000;
app.listen(PORT, console.log(`Server Running Successfully on ${PORT}`));