const morgan = require('morgan');
const fs = require('fs')
const path = require('path')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// log all requests to access.log
app.use(morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
