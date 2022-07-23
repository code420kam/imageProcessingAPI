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
//  import supertest from "supertest";
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const fileService_1 = __importDefault(require("../fileService"));
const imageProcessing_1 = __importDefault(require("../imageProcessing"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const thumbPath = yield path_1.default.resolve("./images/thumbs");
    yield fs_1.promises.mkdir(thumbPath);
}));
describe("Testing functionality", () => {
    test("Testing to get a resized Image", () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = "fjord";
        expect(fileService_1.default.getImage({
            filename: filename,
            height: "150",
            width: "150",
        })).resolves.not.toBeNull();
    }));
    test("Testing to fail a image resizing", () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = "wrongName";
        expect(fileService_1.default.getImage({
            filename: filename,
            height: "200",
            width: "200"
        })).resolves.toBeUndefined();
    }));
    test("initialize thumb folder first time", () => __awaiter(void 0, void 0, void 0, function* () {
        const thumbPath = path_1.default.resolve("./images/thumbs");
        const source = path_1.default.resolve("./images/fjord.jpg");
        const target = path_1.default.resolve(thumbPath, "fjord-500x500.jpg");
        yield expect((0, imageProcessing_1.default)({
            source: source,
            target: target,
            width: 500,
            height: 500,
        })).resolves.toBeUndefined();
    }));
    test("check if filename is available", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(fileService_1.default.validator("fjord")).resolves.toBeTruthy();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const thumbPath = yield path_1.default.resolve("./images/thumbs");
    yield fs_1.promises.rm(thumbPath, { recursive: true });
}));
