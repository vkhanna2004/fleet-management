import express from "express";
import urlRouter from "./routes/url.routes.js" 
// add it
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(express.static("public"));
app.use(cookieParser())

app.use("/", urlRouter);
//add this

export default app;