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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const imageProcessing_1 = __importDefault(require("./imageProcessing"));
class File {
    static validator(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathLike = path_1.default.resolve(this.filepath, `${filename}.jpg`);
            if (yield (0, fs_1.existsSync)(pathLike)) {
                return true;
            }
            else
                return false;
        });
    }
    static isThumbAvailable(reqFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathLike = path_1.default.resolve(this.thumbPath, `${reqFile.filename}-${reqFile.height}x${reqFile.width}`);
            //checking if path of requested thumb is available. If it's available so return true if not return false.
            if (yield (0, fs_1.existsSync)(pathLike)) {
                return true;
            }
            return false;
        });
    }
}
exports.default = File;
_a = File;
File.filepath = path_1.default.resolve(__dirname, '../images/');
File.thumbPath = path_1.default.resolve(__dirname, '../images/thumbs/');
//getting full filenames from folder
File.getAvailableNamesFromFolder = () => __awaiter(void 0, void 0, void 0, function* () {
    const readDirectory = yield fs_1.promises.readdir(File.filepath);
    const name = readDirectory.map((filename) => filename.split('.')[0]);
    return name;
});
File.getImage = (reqFile) => __awaiter(void 0, void 0, void 0, function* () {
    if (reqFile.filename !== undefined) {
        const validation = yield _a.validator(reqFile.filename);
        // console.log(`Validation of Filename is: ${await this.validator(reqFile.filename)}`)
        if (validation) {
            //if user query is needed to sharp
            if (reqFile.width !== undefined && reqFile.height !== undefined) {
                try {
                    //trying to acccess the thumb folder. If we can access we don't need to create it.
                    yield fs_1.promises.access(_a.thumbPath);
                    if (yield _a.isThumbAvailable(reqFile)) {
                        return `${_a.thumbPath}\\${reqFile.filename}-${reqFile.height}x${reqFile.width}.jpg`;
                    }
                    else {
                        yield (0, imageProcessing_1.default)({
                            //Resizing the image after we can access the thumb folder and save the image there
                            source: `${_a.filepath}\\${reqFile.filename}.jpg`,
                            target: `${_a.thumbPath}\\${reqFile.filename}-${reqFile.height}x${reqFile.width}.jpg`,
                            width: parseInt(reqFile.width),
                            height: parseInt(reqFile.height),
                        });
                        //call the requested image
                        return `${_a.thumbPath}\\${reqFile.filename}-${reqFile.height}x${reqFile.width}.jpg`;
                    }
                }
                catch (_b) {
                    //if there is no thumb folder here will it created
                    fs_1.promises.mkdir(_a.thumbPath);
                    //Resizing the image after we can access the thumb folder and save the image there
                    yield (0, imageProcessing_1.default)({
                        source: `${_a.filepath}\\${reqFile.filename}.jpg`,
                        target: `${_a.thumbPath}\\${reqFile.filename}-${reqFile.height}x${reqFile.width}.jpg`,
                        width: parseInt(reqFile.width),
                        height: parseInt(reqFile.height),
                    });
                    //call the requested image
                    return `${_a.thumbPath}\\${reqFile.filename}-${reqFile.height}x${reqFile.width}.jpg`;
                }
                //if there is no width and height we just need to validate the requested Image Filename and response it.
            }
            else {
                reqFile.width = undefined;
                reqFile.height = undefined;
                //returning images path with requested image
                return `${_a.filepath}\\${reqFile.filename}.jpg`;
            }
        }
    }
    //return null if validation fails so the error page will be responsed
    else
        return null;
});
