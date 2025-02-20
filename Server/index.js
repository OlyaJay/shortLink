const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const linkRoutes = require('./routes/linkRoutes')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', linkRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
})