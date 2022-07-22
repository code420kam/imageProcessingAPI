import express from "express";
import { Application } from "express";
import route from "./routes/indexRouting";

const app: Application = express();
const port = 3000;

app.use(route);

app.listen(port, function() {
    console.log(`Server listen to port ${port}`);
});

