import express from "express"
import path from "path";

require('dotenv').config();
var  MovieRouter = require('./src/routes/movies');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname + '/public')));


app.use('/movie',MovieRouter);

// start the express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );