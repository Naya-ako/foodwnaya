const express = require('express')
const morgan = require('morgan')
require('dotenv').config()     
const bodyParser = require('body-parser')
const cors = require('cors')
const accountsRoutes = require('./routes/accountroute')

const app = express()      
const PORT = process.env.PORT || 3000 
app.use(morgan('dev'))

app.use(bodyParser.json())      // used to identify the body of a request

app.use(
    cors({
        origin: ["http://127.0.0.1:5500"],
        credentials: true,
    })
)
app.use('/accounts', accountsRoutes)
 app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})