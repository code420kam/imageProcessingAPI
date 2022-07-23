var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { createReadStream } from 'fs';
import File from '../fileService';
const contentType = 'image/jpeg';
const images = express.Router();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        const data = yield File.getImage(req.query);
        //if data is not null so the image will be in the images folder so we can handle it
        if (data !== null && data !== undefined) {
            const stream = createReadStream(yield data);
            return stream.on('open', function () {
                res.set('Content-Type', contentType);
                stream.pipe(res);
            });
        }
        //there will data be null. So the user has given a wrong query
        else {
            res.send(`please choose from the filenames below and specify it as shown in the example <br>
       ${(yield File.getAvailableNamesFromFolder()).splice(1, 4, '')}<br>
       or use the right query segments like this: <br>
       <a href="/images?filename=icelandwaterfall"> localhost:3000/images?filename=icelandwaterfall.jpg</a>
       <br>
       localhost:3000/images?filename=<i><b>(here you need to give the correct filename which is above provided)</i>`);
        }
    }
}));
export default images;
