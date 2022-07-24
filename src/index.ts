import { Application } from "express";
import route from "./routes/indexRouting";
import express from "express";

const app: Application = express();
const port = 3000;

 app.use(route);
const server = app.listen(port, function() {
    // console.log(`Server listen to port ${port}`);
});
export const closeServer = async () => await server.close();

export default app;