const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
dotenv.config();
const morgan = require('morgan');
const port = process.env.PORT || 4000;
const listURL = ['http://127.0.0.1:5500', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) =>{
        if(listURL.includes(origin) !== -1 || !origin){
            callback(null, true);
        }
        else{
            callback(new Error("Not allowed by CORS"));
        }
    }
}
const route = require('./routes')
const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(morgan('dev'));
route(app);
app.listen(port, () => console.log(`App started on http://localhost:${port}`));