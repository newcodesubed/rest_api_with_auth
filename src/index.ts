import express, { Router } from "express";
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import router from "./routers/index.route";

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server=http.createServer(app);

server.listen(8080,()=>{
    console.log("Server running on http://localhost:8080/");
})

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);mongoose.connection.on("connected", () => {
  console.log("Mongo connected");
});

mongoose.connection.on("error", err => {
  console.error("Mongo error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("Mongo disconnected");
});

app.use('/', router())