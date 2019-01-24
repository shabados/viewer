import express from 'express'
import helmet from 'helmet'
import compression from 'compression'

import { Sources, Lines } from '@shabados/database'

console.log( '@shabados/database viewer starting' )

// Set up express app
console.log( 'Setting up express' )
const app = express()
app.use( helmet() )
app.use( compression() )
// app.use( '/api', api )
app.use( '/', express.static( 'frontend/build' ) )

// Start the server
const { PORT } = process.env
const port = PORT || 52525
app.listen( port, () => console.log( `Server running on port ${port}` ) )
