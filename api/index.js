const express = require('express')
const app = express()

app.use(express.json()) // This is used to parse every JSON for express usage
app.use(express.urlencoded({ extended: true }))

const cors = require('cors') // import
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:4321', // This is the origin that we are allowing access
  })
)

const saldoRoute = require('./routes/saldoRoute')

app.use('/api/saldo', saldoRoute)

app.listen(4000, () => {
  console.log(`Server is running on port 4000`)
})
