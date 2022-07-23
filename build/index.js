var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import route from "./routes/indexRouting";
import express from "express";
const app = express();
const port = 3000;
app.use(route);
const server = app.listen(port, function () {
    // console.log(`Server listen to port ${port}`);
});
export const closeServer = () => __awaiter(void 0, void 0, void 0, function* () { return yield server.close(); });
export default app;
