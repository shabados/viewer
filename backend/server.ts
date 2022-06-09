import compression from 'compression'
import express from 'express'
import helmet from 'helmet'

import api from './api'
import { updateLoop } from './db'

console.log( '@shabados/database viewer starting' )

// Set up express app
console.log( 'Setting up express' )
const app = express()
app.use( helmet() )
app.use( compression() )
app.use( api )

// Start the server
const { PORT } = process.env
const port = PORT || 52526
app.listen( port, () => console.log( `Server running on port ${port}` ) )

// Start the database update loop
void updateLoop()
