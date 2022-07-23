import { Router, Response, Request } from 'express'
import express from 'express'
import images from './image'
// import app from '../index'


const route: Router = express.Router()
const indexPage = `Please select a image for example: <a href="/images?filename=fjord">Klick here to check the image data</a><br>
                    Please use this way to enter the images:<br>
                    <a href="/images?filename=palmtunnel">localhost:3000/images?filename=palmtunnel</a> <br>
                    or you can set your own propertys of width and height of an image just set your query like this:<br>
                    <a href="/images?filename=palmtunnel&height=1000&width=1000">localhost:3000/images?filename=palmtunnel&height=1000&width=1000</a>`
// app.use(route);
route.use('/images', images)
route.get('/', async (req: Request, res: Response):Promise<void> => {
    res.send(indexPage)
})

export default route
