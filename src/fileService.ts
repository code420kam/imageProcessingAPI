import path from "path";
import {existsSync, promises as fs} from "fs";
import imageResize from "./imageProcessing";

interface Image{
    filename?:string,
    width?:string,
    height?:string;
}

export default class File {
    static filepath = path.resolve("./images/");  
    static thumbPath = path.resolve("./images/thumbs/");

    //getting full filenames from folder
    static getAvailableNamesFromFolder = async () => {
        const readDirectory = await fs.readdir(File.filepath);
        const name = readDirectory.map((filename) => filename.split(".")[0]);
        
        return name;
    }
    static async validator(filename: string):Promise<boolean> {
        const pathLike = path.resolve(this.filepath, `${filename}.jpg`);
        if(await existsSync(pathLike))
        {
            return true;
        }
        else return false;
    }
    static getImage =async (reqFilename: Image) :Promise<void|string|null> =>{
        if(reqFilename.filename !== undefined)
        {
            const validation = await this.validator(reqFilename.filename)
            console.log(`Validation of Filename is: ${await this.validator(reqFilename.filename)}`)
            if(validation){
                //if user query is needed to sharp
                if(reqFilename.width !== undefined && reqFilename.height !== undefined)   
                {
                    try{
                        //trying to acccess the thumb folder. If we can access we don't need to create it.
                        await fs.access(this.thumbPath)
                        //Resizing the image after we can access the thumb folder and save the image there
                        await imageResize({
    
                            source: `${ this.filepath}\\${ reqFilename.filename}.jpg`,
                            target: `${ this.thumbPath}\\${reqFilename.filename}-${ reqFilename.height}x${ reqFilename.width}.jpg`,
                            width: parseInt(reqFilename.width),
                            height: parseInt(reqFilename.height)
                        })
                        //call the requested image
                       return `${ this.thumbPath}\\${reqFilename.filename}-${ reqFilename.height}x${ reqFilename.width}.jpg`
                    }
                    catch{
                        //if there is no thumb folder here will it created
                        fs.mkdir(this.thumbPath)
                        //Resizing the image after we can access the thumb folder and save the image there
                        await imageResize({
                            source: `${ this.filepath}\\${ reqFilename.filename}.jpg`,
                            target: `${ this.thumbPath}\\${reqFilename.filename}-${ reqFilename.height}x${ reqFilename.width}.jpg`,
                            width: parseInt(reqFilename.width),
                            height: parseInt(reqFilename.height)
                        })
                        //call the requested image
                        return `${ this.thumbPath}\\${reqFilename.filename}-${ reqFilename.height}x${ reqFilename.width}.jpg`
                    }
                    //if there is no width and height we just need to validate the requested Image Filename and response it.
                }else{
                    reqFilename.width = undefined;
                    reqFilename.height=undefined;
                    //returning images path with requested image
                    return `${ this.filepath}\\${reqFilename.filename}.jpg`
                }
            }

        }
        //return null if validation fails so the error page will be responsed
        else return null;
    }
}