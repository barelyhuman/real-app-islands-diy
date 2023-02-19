import { setup } from 'goober'
import { h } from 'preact'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { withRender } from './middleware/render.js'
import setupRouter from './routes.js'
import { prefix } from 'goober/prefixer'

setup(h, prefix)

const express = require('express')
export const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static('./dist', { maxAge: 60 * 60 * 1000 }))
app.use(withRender)

const router = setupRouter(app)
app.use(router)

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
