//  import supertest from "supertest";
import path from "path";
import {promises as fs} from "fs";
import File from "../fileService";
import imageResize from "../imageProcessing";


beforeAll(async () => {
    const thumbPath = await  path.resolve("./images/thumbs");
    await fs.mkdir(thumbPath);
})
describe("Testing functionality", () => {

    test("Testing to get a resized Image",async () => {
        const filename = "fjord";
        expect(File.getImage({
            filename: filename,
            height: "150",
            width: "150",
        })).resolves.not.toBeNull();
    });
    test("Testing to fail a image resizing",async () => {
        const filename = "wrongName";
        expect(File.getImage({
            filename: filename,
            height: "200",
            width: "200"
        })).resolves.toBeUndefined();
    });
    test("initialize thumb folder first time",async () => {
        const thumbPath =  path.resolve("./images/thumbs")
        const source = path.resolve("./images/fjord.jpg")
        const target = path.resolve(thumbPath, "fjord-500x500.jpg")
        await expect(imageResize({
            source: source,
            target: target,
            width: 500,
            height: 500,
        })).resolves.toBeUndefined();
        });
    test("check if filename is available",async () => {
        await expect(File.validator("fjord")).resolves.toBeTruthy();
        });
    });
    afterAll(async () =>{
         const thumbPath = await path.resolve("./images/thumbs")
         await fs.rm(thumbPath, {recursive: true});
    });
