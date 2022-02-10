const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()
const port = 3000

/**
 * CORS
 */
// import cors
const cors = require('cors')
app.use(cors())


/**
 * Body parser
 */
// import body parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urleconded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/**
 * Router
 */
// import router
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);


// app.get('/', (req, res) => {
//     res.send('Hello World, this is my new app with express.js')
// })

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})