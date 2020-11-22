const   express     = require('express'),
        app         = express(),
        port        = process.env.PORT || 3001,
        mongoose    = require('mongoose'),
        image = require('./server/routes/Image')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/AstronomyDB')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
app.use('/image', image)

app.listen(port, () => console.log('server is up'))