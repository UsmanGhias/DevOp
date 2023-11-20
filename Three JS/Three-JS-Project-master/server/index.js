import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dalleRoutes from './dalleRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome'
    });
});

app.use('/api/v1/dalle',dalleRoutes)

app.listen(8082, () => {console.log("server started");})