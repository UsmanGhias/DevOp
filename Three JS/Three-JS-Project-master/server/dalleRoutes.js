import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration,OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const key = ""

const config = new Configuration({
    organization:"org-FyWGamF06GIG8DFb88kvXUhJ",
  apiKey: key ,
})

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
    res.status(200).json({
        message: "Hello World",
    })
})

router.route('/').post(async (req, res) => {
    try {
        const {Prompt} = req.body;
        const response = await openai.createImage({
            prompt : Prompt,
            n:1,
            size:"1024x1024",
            response_format:'b64_json'
        },
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${key}`,
            },
        })

        const image = response.data.data[0].b64_json;
        console.log(image);
        res.status(200).json({
            photo: image
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
        }
})




export default router;