import express, { Response, Request } from "express";
import { routerPosts } from "./routes/posts";
import "dotenv/config";

const url = process.env.EXPRESS_HOST;
const port = process.env.EXPRESS_PORT;

const app = express();
const server = express.json();

app.use(server);
app.use("/posts", routerPosts);

app.listen(port, () => console.log(`${url}:${port}`));
