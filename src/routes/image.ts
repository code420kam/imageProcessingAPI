import { Router } from 'express'
import express from 'express'
import { createReadStream } from 'fs'
import File from '../fileService'

const contentType = 'image/jpeg'
const images: Router = express.Router()

images.get('/', async (req: express.Request, res: express.Response) => {
    {
        const data: string | null | void = await File.getImage(req.query)
        //if data is not null so the image will be in the images folder so we can handle it
        if (data !== null && data !== undefined) {
            const stream = createReadStream(await data)
            return stream.on('open', function () {
                res.set('Content-Type', contentType)
                stream.pipe(res)
            })
        }
        //there will data be null. So the user has given a wrong query
        else {
            res.send(`please choose from the filenames below and specify it as shown in the example <br>
       ${(await File.getAvailableNamesFromFolder()).splice(1, 4, '')}<br>
       or use the right query segments like this: <br>
       <a href="/images?filename=icelandwaterfall"> localhost:3000/images?filename=icelandwaterfall.jpg</a>
       <br>
       localhost:3000/images?filename=<i><b>(here you need to give the correct filename which is above provided)</i>`)
        }
    }
})

export default images
