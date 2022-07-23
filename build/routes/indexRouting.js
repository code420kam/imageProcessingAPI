"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = __importDefault(require("./image"));
// import app from '../index'
const route = express_1.default.Router();
const indexPage = `Please select a image for example: <a href="/images?filename=fjord">Klick here to check the image data</a><br>
                    Please use this way to enter the images:<br>
                    <a href="/images?filename=palmtunnel">localhost:3000/images?filename=palmtunnel</a> <br>
                    or you can set your own propertys of width and height of an image just set your query like this:<br>
                    <a href="/images?filename=palmtunnel&height=1000&width=1000">localhost:3000/images?filename=palmtunnel&height=1000&width=1000</a>`;
// app.use(route);
route.use('/images', image_1.default);
route.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(indexPage);
}));
exports.default = route;
